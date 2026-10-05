# AI API Contract — Pantry Scan

This document defines the API contract between the client (Mobile/Web) and the AI Engine for the "Pantry Scan" feature.

## 1. Endpoint: `/api/ai/pantry-scan` (POST)

Submits a list of ingredients and user context to the AI engine to generate personalized wellness rituals.

### Request Body
```json
{
  "ingredients": ["Ginger", "Lemon", "Honey"],
  "context": {
    "season": "Winter",
    "time_of_day": "Morning",
    "moon_phase": "Waxing",
    "user_preferences": {
      "focus": "Grounding",
      "allergies": ["Nuts"],
      "contraindications": ["High Blood Pressure"]
    }
  }
}
```

### Response Body
```json
{
  "summary": "A warming morning ritual to support your middle burner and invite vitality during the winter season.",
  "suggestions": [
    {
      "title": "Warming Ginger & Honey Elixir",
      "tradition": "Traditional Chinese Medicine",
      "description": "In TCM, fresh ginger is traditionally used to warm the middle burner and support digestion.",
      "instructions": "Steep 3 slices of ginger in hot water. Add honey once cooled slightly. Sip while warm.",
      "safety_note": "Avoid if you have gallstones. Consult your doctor if on blood-thinning medication."
    },
    {
      "title": "Zesty Solar Inhalation",
      "tradition": "Astrology",
      "description": "Lemon is associated with cleansing and the Sun. A morning citrus ritual can help invite solar energy.",
      "instructions": "Inhale the scent of fresh lemon zest while setting a grounding intention for your day.",
      "safety_note": "None."
    }
  ],
  "disclaimer": "⚠️ Disclaimer: This content is for informational and educational purposes only. It is not medical advice, diagnosis, or treatment. HerbaAI does not diagnose, cure, mitigate, treat, or prevent any disease. Always consult a qualified healthcare provider before making changes to your health regimen."
}
```

## 2. Error Responses

- **400 Bad Request**: Invalid ingredient list or missing context.
- **422 Unprocessable Entity**: User input violates safety guardrails (e.g., asking for a "cure" for a serious disease).
- **500 Internal Server Error**: AI engine failure or connectivity issue.
