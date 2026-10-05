// ─── POST /api/pantry/scan ─────────────────────────────
// Mobile-facing pantry scan endpoint. Delegates to the same
// real AI pipeline as /api/ai/pantry-scan and additionally
// persists the scan record when the database is available.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generatePantryScan } from "@/lib/ai/pantry-scan-service";

const ANONYMOUS_ID = "anonymous";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body", code: "INVALID_BODY" },
      { status: 400 }
    );
  }

  const { ingredients, context } = (body || {}) as {
    ingredients?: unknown;
    context?: Parameters<typeof generatePantryScan>[1];
  };

  if (!ingredients || !Array.isArray(ingredients)) {
    return NextResponse.json(
      { error: "Missing or invalid 'ingredients' array", code: "MISSING_INGREDIENTS" },
      { status: 400 }
    );
  }

  const trimmed = ingredients
    .filter((i): i is string => typeof i === "string" && i.trim().length > 0)
    .map((i) => i.trim());

  if (trimmed.length === 0) {
    return NextResponse.json(
      { error: "At least one ingredient is required", code: "EMPTY_INGREDIENTS" },
      { status: 400 }
    );
  }

  if (trimmed.length > 20) {
    return NextResponse.json(
      { error: "Maximum 20 ingredients per scan", code: "TOO_MANY_INGREDIENTS" },
      { status: 400 }
    );
  }

  const result = await generatePantryScan(trimmed, context);

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error, code: result.code },
      { status: result.status }
    );
  }

  // Persist the scan when possible (non-fatal if DB is unavailable).
  let scanId: string | undefined;
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || ANONYMOUS_ID;
    const scan = await prisma.pantryScan.create({
      data: {
        userId,
        ingredientsUsed: trimmed,
        aiResponse: {
          summary: result.response.summary,
          suggestions: result.response.suggestions,
        },
        ritualGenerated: result.response.suggestions.length > 0,
      },
    });
    scanId = scan.id;
  } catch (dbError) {
    console.warn("Could not persist scan to database:", dbError);
  }

  return NextResponse.json(
    { ...result.response, id: scanId },
    { status: 200 }
  );
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    version: "1.0.0",
    endpoint: "HerbaAI Pantry Scan API",
  });
}
