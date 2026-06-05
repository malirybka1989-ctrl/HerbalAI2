// ─── POST /api/ai/pantry-scan ──────────────────────────
// AI-powered pantry scan - shell ready for AI pipeline integration
// Follows contract in /home/team/shared/ai-api-contract.md

import { NextRequest, NextResponse } from "next/server";

const MANDATORY_DISCLAIMER =
  "⚠️ **Disclaimer**: This content is for informational and educational purposes only. It is not medical advice, diagnosis, or treatment. HerbaAI does not diagnose, cure, mitigate, treat, or prevent any disease. Always consult a qualified healthcare provider before making changes to your health regimen.";

// Mock data for development until AI pipeline is integrated
const MOCK_SUGGESTIONS: Record<string, any[]> = {
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
      safety_note: "None for culinary amounts.",
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
      safety_note:
        "May stain surfaces. Avoid in medicinal amounts during pregnancy.",
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
      safety_note:
        "Ceylon cinnamon is preferred for regular use. Cassia contains coumarin.",
    },
  ],
};

function getMockSuggestions(ingredients: string[]): any[] {
  const suggestions: any[] = [];
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

function generateSummary(ingredients: string[], suggestions: any[]): string {
  return `A ${suggestions.length > 1 ? "collection of" : ""} wellness ritual${suggestions.length > 1 ? "s" : ""} inspired by ${ingredients.join(", ")}, drawing from traditional wisdom to support your daily well-being.`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ingredients, context } = body || {};

    // Validate
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid 'ingredients' array", code: "INVALID_INPUT" },
        { status: 400 }
      );
    }

    if (ingredients.length > 20) {
      return NextResponse.json(
        { error: "Maximum 20 ingredients per scan", code: "TOO_MANY_INGREDIENTS" },
        { status: 400 }
      );
    }

    // Check for forbidden requests
    const forbiddenTerms = ["cure", "treat", "heal", "medicine", "diagnose"];
    const userText = ingredients.join(" ").toLowerCase();
    if (context?.user_preferences?.focus) {
      const focus = context.user_preferences.focus.toLowerCase();
      if (forbiddenTerms.some((t) => focus.includes(t))) {
        return NextResponse.json(
          {
            error: "Request contains restricted health claims",
            code: "GUARDRAIL_VIOLATION",
          },
          { status: 422 }
        );
      }
    }

    // Generate suggestions (mock until AI pipeline is ready)
    const suggestions = getMockSuggestions(ingredients);
    const summary = generateSummary(ingredients, suggestions);

    const response = {
      summary,
      suggestions: suggestions.map((s) => ({
        ...s,
        safety_note: s.safety_note || "Generally safe in culinary amounts.",
      })),
      disclaimer: MANDATORY_DISCLAIMER,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Pantry scan error:", error);
    return NextResponse.json(
      { error: "Internal server error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    version: "1.0.0",
    endpoint: "HerbaAI Pantry Scan API",
  });
}