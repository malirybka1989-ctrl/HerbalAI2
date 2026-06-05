// ─── POST /api/pantry/scan ─────────────────────────────
// AI-powered pantry scan endpoint with compliance guardrails

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateWellnessSuggestions, getCurrentSeason, getCurrentMoonPhase } from "@/lib/ai";
import { applyGuardrails } from "@/lib/guardrails";
import { PantryScanRequest, PantryScanResponse, ApiError, AiContext } from "@/lib/types";

// ─── Request Validation ────────────────────────────────

function validateRequest(body: unknown): {
  valid: boolean;
  error?: ApiError;
  data?: PantryScanRequest;
} {
  if (!body || typeof body !== "object") {
    return {
      valid: false,
      error: { error: "Invalid request body", code: "INVALID_BODY" },
    };
  }

  const req = body as Record<string, unknown>;

  if (!req.ingredients || !Array.isArray(req.ingredients)) {
    return {
      valid: false,
      error: {
        error: "Missing or invalid 'ingredients' field",
        code: "MISSING_INGREDIENTS",
      },
    };
  }

  if (req.ingredients.length === 0) {
    return {
      valid: false,
      error: {
        error: "At least one ingredient is required",
        code: "EMPTY_INGREDIENTS",
      },
    };
  }

  if (req.ingredients.length > 20) {
    return {
      valid: false,
      error: {
        error: "Maximum 20 ingredients per scan",
        code: "TOO_MANY_INGREDIENTS",
      },
    };
  }

  // Validate ingredient names are strings
  const allStrings = (req.ingredients as unknown[]).every(
    (i) => typeof i === "string" && i.trim().length > 0
  );
  if (!allStrings) {
    return {
      valid: false,
      error: {
        error: "All ingredients must be non-empty strings",
        code: "INVALID_INGREDIENT_FORMAT",
      },
    };
  }

  return {
    valid: true,
    data: {
      ingredients: (req.ingredients as string[]).map((i) => i.trim()),
      goals: Array.isArray(req.goals) ? (req.goals as string[]) : [],
      season:
        typeof req.season === "string" ? req.season : getCurrentSeason(),
      moonPhase:
        typeof req.moonPhase === "string"
          ? req.moonPhase
          : getCurrentMoonPhase(),
      contraindications: Array.isArray(req.contraindications)
        ? (req.contraindications as string[])
        : [],
    },
  };
}

// ─── Route Handler ─────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate
    const validation = validateRequest(body);
    if (!validation.valid || !validation.data) {
      return NextResponse.json(validation.error, { status: 400 });
    }

    const { ingredients, goals, season, moonPhase, contraindications } =
      validation.data;

    // Look up ingredients in database
    const dbIngredients = await prisma.ingredient.findMany({
      where: {
        name: {
          in: ingredients,
          mode: "insensitive",
        },
      },
    });

    // Map to IngredientInfo format, using DB data or creating basic entries
    const ingredientInfos = ingredients.map((name) => {
      const dbIngredient = dbIngredients.find(
        (db) => db.name.toLowerCase() === name.toLowerCase()
      );
      if (dbIngredient) {
        return {
          name: dbIngredient.name,
          scientificName: dbIngredient.scientificName || undefined,
          category: dbIngredient.category,
          tcmProperties: dbIngredient.tcmProperties as any,
          ayurvedicProperties: dbIngredient.ayurvedicProperties as any,
          folkWisdom: dbIngredient.folkWisdom || undefined,
          astrologicalAssoc: dbIngredient.astrologicalAssoc || undefined,
          safetyNotes: dbIngredient.safetyNotes || undefined,
          contraindications: (dbIngredient.contraindications as string[]) || [],
        };
      }
      return {
        name,
        safetyNotes: `"${name}" is not in our ingredient database. Please verify it is safe for your use.`,
        contraindications: [],
      };
    });

    // Build AI context
    const aiContext: AiContext = {
      season: season || getCurrentSeason(),
      moonPhase: moonPhase || getCurrentMoonPhase(),
      goals: goals || [],
      contraindications: contraindications || [],
    };

    // Generate AI suggestions
    const aiResult = await generateWellnessSuggestions(ingredientInfos, aiContext);

    // Apply compliance guardrails
    const fullText = `${aiResult.essence}\n\n${aiResult.rituals.map((r) => `${r.title}: ${r.description}`).join("\n")}\n\n${aiResult.safetyNote}`;
    const userContext = [...ingredients, ...contraindications].join(" ");

    const { safeResponse, warnings, needsReview } = applyGuardrails(
      fullText,
      userContext
    );

    // Create a scan record in the database (if user is authenticated)
    let scanId = `scan_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    try {
      const scan = await prisma.pantryScan.create({
        data: {
          id: scanId,
          userId: "anonymous", // Will be replaced with actual user ID when auth is implemented
          ingredientsUsed: ingredients,
          aiResponse: {
            essence: aiResult.essence,
            rituals: aiResult.rituals,
            safetyNote: aiResult.safetyNote,
            warnings,
            needsReview,
          },
          ritualGenerated: aiResult.rituals.length > 0,
        },
      });
      scanId = scan.id;
    } catch (dbError) {
      // If DB is not available (no PostgreSQL), still return the response
      console.warn("Could not save scan to database:", dbError);
    }

    // Build response
    const response: PantryScanResponse = {
      id: scanId,
      essence: aiResult.essence,
      rituals: aiResult.rituals,
      ingredientsUsed: ingredients,
      safetyNote: aiResult.safetyNote,
      disclaimer:
        "⚠️ **Disclaimer**: This content is for informational and educational purposes only. It is not medical advice, diagnosis, or treatment. HerbaAI does not diagnose, cure, mitigate, treat, or prevent any disease. Always consult a qualified healthcare provider before making changes to your health regimen.",
    };

    // If under review, add a warning
    if (needsReview) {
      (response as any).reviewWarning =
        "This response was flagged for review due to potentially restricted terminology.";
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Pantry scan error:", error);

    return NextResponse.json(
      {
        error: "An unexpected error occurred",
        code: "INTERNAL_ERROR",
        details:
          process.env.NODE_ENV === "development"
            ? String(error)
            : undefined,
      } satisfies ApiError,
      { status: 500 }
    );
  }
}

// ─── Health Check ──────────────────────────────────────

export async function GET() {
  return NextResponse.json({
    status: "ok",
    version: "1.0.0",
    endpoint: "HerbaAI Pantry Scan API",
  });
}