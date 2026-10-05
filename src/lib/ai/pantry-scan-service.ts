// ─── Pantry Scan Service ────────────────────────────────
// Shared entry point that wires the web API to the real AI
// pipeline (runPantryScan) with a deterministic fallback when
// no LLM key is configured, so the endpoint stays responsive
// in local/dev environments.

import { runPantryScan } from "./pantry-scan";
import { isAskingForMedicalAdvice } from "./compliance-guardrails";
import type { PantryScanRequest, PantryScanResponse } from "./types";

export const MANDATORY_DISCLAIMER =
  "⚠️ Disclaimer: This content is for informational and educational purposes only. It is not medical advice, diagnosis, or treatment. HerbaAI does not diagnose, cure, mitigate, treat, or prevent any disease. Always consult a qualified healthcare provider before making changes to your health regimen.";

type Suggestion = PantryScanResponse["suggestions"][number];

export type ScanResult =
  | { ok: true; response: PantryScanResponse }
  | { ok: false; status: number; error: string; code: string };

// ─── Mock/fallback knowledge base ──────────────────────
const MOCK_SUGGESTIONS: Record<string, Suggestion[]> = {
  ginger: [
    {
      title: "Warming Ginger Infusion",
      tradition: "Traditional Chinese Medicine",
      description:
        "In TCM, fresh ginger is traditionally used to warm the middle burner and support digestion.",
      instructions:
        "Steep 3-5 thin slices of fresh ginger in hot water for 10 minutes. Sip slowly while warm.",
      safety_note:
        "Avoid if you have gallstones. Consult your doctor if on blood-thinning medication.",
    },
    {
      title: "Solar Ginger Ritual",
      tradition: "Astrology",
      description:
        "Ginger is ruled by Mars and associated with fire energy, making it ideal for morning vitality rituals.",
      instructions:
        "Grate 1 tsp fresh ginger into warm water. Add a squeeze of lemon. Drink while setting a morning intention.",
      safety_note: "None.",
    },
  ],
  peppermint: [
    {
      title: "Refreshing Temple Ritual",
      tradition: "Acupressure",
      description:
        "Combine the scent of peppermint with gentle pressure points for a mid-day refresh.",
      instructions:
        "Inhale the scent of fresh peppermint while gently massaging your temples in slow circular motions for 1-2 minutes.",
      safety_note: "Avoid if you have severe acid reflux.",
    },
  ],
  turmeric: [
    {
      title: "Golden Milk Ritual",
      tradition: "Ayurveda",
      description:
        "A traditional evening ritual for grounding and vitality, used in Ayurvedic practice for centuries.",
      instructions:
        "Whisk 1/2 tsp turmeric into 1 cup of warm plant-based milk with a pinch of black pepper and a dash of cinnamon.",
      safety_note: "May stain surfaces. Avoid in medicinal amounts during pregnancy.",
    },
  ],
  chamomile: [
    {
      title: "Starlight Steep",
      tradition: "Folk Wisdom",
      description:
        "European folk wisdom has long cherished chamomile as a gentle evening companion.",
      instructions:
        "Steep 1 tbsp of dried chamomile flowers in hot water for 5 minutes before bed. Breathe deeply as you wait.",
      safety_note:
        "Avoid if you have a known allergy to ragweed or the Asteraceae family.",
    },
  ],
  cinnamon: [
    {
      title: "Solar Vitality Brew",
      tradition: "Astrology",
      description:
        "Cinnamon is ruled by the Sun and is traditionally used to invite warmth and vitality.",
      instructions:
        "Add a cinnamon stick to your morning tea or coffee. Let it steep for 3-5 minutes while setting an intention for the day.",
      safety_note: "Ceylon cinnamon is preferred for regular use. Cassia contains coumarin.",
    },
  ],
};

function buildMockSuggestions(ingredients: string[]): Suggestion[] {
  const suggestions: Suggestion[] = [];
  const seen = new Set<string>();

  for (const name of ingredients) {
    const key = name.toLowerCase().trim();
    const matches = MOCK_SUGGESTIONS[key];
    if (matches) {
      for (const match of matches) {
        if (!seen.has(match.title)) {
          seen.add(match.title);
          suggestions.push(match);
        }
      }
    }
  }

  if (suggestions.length === 0) {
    suggestions.push({
      title: "Simple Herbal Infusion",
      tradition: "Folk Wisdom",
      description:
        "European folk wisdom suggests that combining herbs and spices in hot water creates a comforting daily ritual.",
      instructions: `Boil 2 cups of water. Add your ingredients (${ingredients.join(", ")}). Steep 5-10 minutes. Strain and sip slowly.`,
      safety_note:
        "Generally safe in culinary amounts. Discontinue if discomfort occurs.",
    });
  }

  return suggestions.slice(0, 5);
}

function buildMockSummary(
  ingredients: string[],
  suggestions: Suggestion[]
): string {
  return `A ${
    suggestions.length > 1 ? "collection of" : ""
  } wellness ritual${suggestions.length > 1 ? "s" : ""} inspired by ${ingredients.join(
    ", "
  )}, drawing from traditional wisdom to support your daily well-being.`;
}

function buildMockResponse(ingredients: string[]): PantryScanResponse {
  const suggestions = buildMockSuggestions(ingredients);
  return {
    summary: buildMockSummary(ingredients, suggestions),
    suggestions,
    disclaimer: MANDATORY_DISCLAIMER,
  };
}

// ─── Context normalization ──────────────────────────────
// The API contract uses snake_case (time_of_day, moon_phase,
// user_preferences); the pipeline types use camelCase. Accept
// both so the web and mobile clients are not coupled to one.
type RawContext = {
  season?: string;
  time_of_day?: string;
  timeOfDay?: string;
  moon_phase?: string;
  moonPhase?: string;
  user_preferences?: {
    focus?: string;
    allergies?: string[];
    contraindications?: string[];
  };
  preferences?: {
    focus?: string;
    allergies?: string[];
    contraindications?: string[];
  };
};

function normalizeContext(raw?: RawContext): PantryScanRequest["context"] {
  const c = raw || {};
  const prefs = c.user_preferences || c.preferences || {};
  return {
    season: c.season,
    timeOfDay: c.time_of_day || c.timeOfDay,
    moonPhase: c.moon_phase || c.moonPhase,
    preferences: {
      focus: prefs.focus,
      allergies: prefs.allergies,
      contraindications: prefs.contraindications,
    },
  };
}

// ─── Main entry point ───────────────────────────────────
export async function generatePantryScan(
  ingredients: string[],
  rawContext?: RawContext
): Promise<ScanResult> {
  const inputString = ingredients.join(" ");
  const focus = rawContext?.user_preferences?.focus || rawContext?.preferences?.focus || "";

  if (isAskingForMedicalAdvice(inputString) || isAskingForMedicalAdvice(focus)) {
    return {
      ok: false,
      status: 422,
      error:
        "Your request seems to be seeking medical advice. HerbaAI provides traditional wellness inspiration only. Please consult a healthcare professional for medical concerns.",
      code: "GUARDRAIL_VIOLATION",
    };
  }

  const hasKey =
    process.env.OPENAI_API_KEY &&
    process.env.OPENAI_API_KEY !== "your-openai-api-key";

  if (!hasKey) {
    console.warn(
      "No OPENAI_API_KEY configured — returning fallback suggestions."
    );
    return { ok: true, response: buildMockResponse(ingredients) };
  }

  try {
    const response = await runPantryScan({
      ingredients,
      context: normalizeContext(rawContext),
    });
    return { ok: true, response };
  } catch (error) {
    // Keep the endpoint responsive: fall back to curated content
    // while surfacing the failure in server logs.
    console.error("AI pipeline error — returning fallback suggestions:", error);
    return { ok: true, response: buildMockResponse(ingredients) };
  }
}
