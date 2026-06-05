// ─── AI Engine for HerbaAI Pantry Scan ──────────────────
// Based on design/AI_ENGINE.md - Multi-layered prompt strategy

import { WellnessSuggestion, IngredientInfo, AiContext } from "./types";

// ─── System Prompt (Layer 1 + 2) ────────────────────────

const SYSTEM_PROMPT = `You are the HerbaAI Wise Companion, a knowledgeable, warm, and supportive holistic wellness guide.

YOUR PURPOSE:
Provide wellness inspiration based on traditional practices using ingredients from the user's pantry.

CORE GUIDELINES:
1. NEVER use these forbidden words: cure, treat, heal, medicine, remedy, pharmacy, medication, prevents, diagnoses, mitigates, prescribes
2. INSTEAD use: ritual, practice, inspiration, wisdom, tradition, supports, encourages, traditionally used for
3. Every suggestion MUST be attributed to a specific tradition using phrases like:
   - "In Traditional Chinese Medicine..."
   - "According to Ayurvedic practice..."
   - "European folk wisdom suggests..."
   - "In astrological tradition..."
   - "In acupressure practice..."
4. NEVER make medical claims, guarantees, or promises. Frame benefits as "traditionally used for comfort" or "supports well-being".
5. Include safety notes when relevant (allergies, pregnancy, medication interactions).
6. Keep responses concise and actionable — provide clear step-by-step instructions.

OUTPUT FORMAT - Return ONLY valid JSON with this exact structure:
{
  "essence": "A warm, 2-3 sentence overview of how the ingredients work together traditionally",
  "rituals": [
    {
      "tradition": "TCM",
      "title": "Name of the ritual",
      "description": "Why this ritual is performed and what tradition it comes from",
      "instructions": "Step-by-step preparation and execution instructions",
      "safetyDisclaimer": "Any specific safety notes for this ritual (optional)"
    }
  ],
  "safetyNote": "General safety note about these ingredients"
}

Generate 1-3 rituals depending on the number of ingredients provided.`;

// ─── Build User Prompt (Layer 3 - Contextual) ──────────

function buildUserPrompt(
  ingredients: IngredientInfo[],
  context: AiContext
): string {
  const ingredientDetails = ingredients
    .map(
      (ing) =>
        `- ${ing.name}${ing.scientificName ? ` (${ing.scientificName})` : ""}` +
        `${
          ing.tcmProperties
            ? `\n  TCM: ${ing.tcmProperties.nature || "?"}, ${ing.tcmProperties.taste || "?"}, meridians: ${(ing.tcmProperties.meridians || []).join(", ")}`
            : ""
        }` +
        `${
          ing.ayurvedicProperties
            ? `\n  Ayurveda: ${ing.ayurvedicProperties.dosha || "?"}`
            : ""
        }` +
        `${
          ing.folkWisdom
            ? `\n  Folk wisdom: ${ing.folkWisdom.substring(0, 100)}`
            : ""
        }` +
        `${
          ing.astrologicalAssoc
            ? `\n  Astrological association: ${ing.astrologicalAssoc}`
            : ""
        }` +
        `${
          ing.safetyNotes ? `\n  Safety: ${ing.safetyNotes}` : ""
        }` +
        `${
          ing.contraindications && ing.contraindications.length > 0
            ? `\n  Contraindications: ${ing.contraindications.join(", ")}`
            : ""
        }`
    )
    .join("\n\n");

  const contextInfo = [
    context.season ? `Current season: ${context.season}` : "",
    context.moonPhase ? `Current moon phase: ${context.moonPhase}` : "",
    context.goals.length > 0
      ? `Wellness goals: ${context.goals.join(", ")}`
      : "",
    context.contraindications.length > 0
      ? `User contraindications: ${context.contraindications.join(", ")}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  return `Please create wellness ritual suggestions for these ingredients:

${ingredientDetails}

${contextInfo ? `\nContext:\n${contextInfo}` : ""}

Generate 1-3 rituals based on traditional knowledge. Return ONLY valid JSON.`;
}

// ─── Parse AI Response ─────────────────────────────────

function parseAiResponse(
  rawResponse: string
): { essence: string; rituals: WellnessSuggestion[]; safetyNote: string } | null {
  try {
    // Try direct JSON parse
    const parsed = JSON.parse(rawResponse);
    if (parsed.essence && parsed.rituals && Array.isArray(parsed.rituals)) {
      return parsed;
    }
    return null;
  } catch {
    // Try to extract JSON from markdown code blocks
    const jsonMatch = rawResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[1].trim());
        if (parsed.essence && parsed.rituals && Array.isArray(parsed.rituals)) {
          return parsed;
        }
      } catch {
        return null;
      }
    }
    return null;
  }
}

// ─── Build Fallback Response ───────────────────────────

function buildFallbackResponse(
  ingredients: IngredientInfo[]
): { essence: string; rituals: WellnessSuggestion[]; safetyNote: string } {
  const names = ingredients.map((i) => i.name).join(", ");
  return {
    essence: `The combination of ${names} offers a wonderful opportunity for a simple wellness ritual. Each ingredient brings its own traditional wisdom and warmth.`,
    rituals: [
      {
        tradition: "Folk",
        title: "Simple Herbal Infusion",
        description:
          "European folk wisdom suggests that combining herbs and spices in hot water creates a comforting daily ritual.",
        instructions: `1. Boil 2 cups of fresh water\n2. Add your chosen ingredients (${names})\n3. Steep for 5-10 minutes\n4. Strain and sip slowly while breathing deeply`,
        safetyDisclaimer:
          "If you are pregnant, nursing, or have any medical conditions, please consult your healthcare provider before trying new herbal preparations.",
      },
    ],
    safetyNote:
      "Generally safe in culinary amounts. Discontinue use if any discomfort occurs.",
  };
}

// ─── Main AI Function ──────────────────────────────────

export async function generateWellnessSuggestions(
  ingredients: IngredientInfo[],
  context: AiContext
): Promise<{
  essence: string;
  rituals: WellnessSuggestion[];
  safetyNote: string;
  rawResponse?: string;
}> {
  const apiKey = process.env.OPENAI_API_KEY;

  // If no API key configured, return fallback response
  if (!apiKey || apiKey === "your-openai-api-key") {
    console.warn(
      "No OPENAI_API_KEY configured. Using fallback response."
    );
    return buildFallbackResponse(ingredients);
  }

  const userPrompt = buildUserPrompt(ingredients, context);

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // Cost-effective model for structured output
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 1500,
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", response.status, errorText);
      return buildFallbackResponse(ingredients);
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || "";

    const parsed = parseAiResponse(rawContent);
    if (parsed) {
      return { ...parsed, rawResponse: rawContent };
    }

    // If parsing failed, return fallback
    console.warn("Failed to parse AI response, using fallback");
    return { ...buildFallbackResponse(ingredients), rawResponse: rawContent };
  } catch (error) {
    console.error("AI engine error:", error);
    return buildFallbackResponse(ingredients);
  }
}

// ─── Get Season from Date ──────────────────────────────

export function getCurrentSeason(): string {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "Spring";
  if (month >= 5 && month <= 7) return "Summer";
  if (month >= 8 && month <= 10) return "Autumn";
  return "Winter";
}

// ─── Get Moon Phase (simplified) ───────────────────────

export function getCurrentMoonPhase(): string {
  // Simplified - in production use a moon phase API
  const phaseNames = [
    "New Moon",
    "Waxing Crescent",
    "First Quarter",
    "Waxing Gibbous",
    "Full Moon",
    "Waning Gibbous",
    "Last Quarter",
    "Waning Crescent",
  ];
  // Rough calculation based on days since known new moon (Jan 1, 2024)
  const knownNewMoon = new Date("2024-01-11").getTime();
  const now = Date.now();
  const daysSince = (now - knownNewMoon) / (1000 * 60 * 60 * 24);
  const phaseIndex = Math.floor(daysSince % 29.53 / 29.53 * 8) % 8;
  return phaseNames[phaseIndex];
}