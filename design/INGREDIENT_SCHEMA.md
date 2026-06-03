# Ingredient Knowledge Base Schema — Herbal Ai

The Ingredient Knowledge Base is a structured database of 300+ ingredients, providing the foundational data for the AI engine to generate personalized and compliant suggestions.

## 1. Ingredient Table Schema

| Field | Type | Description |
|---|---|---|
| `id` | UUID | Primary Key |
| `name` | String | Common name (e.g., Ginger) |
| `scientific_name` | String | Latin/Scientific name (e.g., Zingiber officinale) |
| `category` | Enum | Spice, Herb, Fruit, Household, etc. |
| `tcm_properties` | JSON | Thermal nature (warm/cool), Taste, Meridians |
| `ayurvedic_properties` | JSON | Dosha impact (Vata/Pitta/Kapha), Guna |
| `folk_wisdom` | Text | General traditional uses from various cultures |
| `astrological_assoc` | String | Ruling planet/sign |
| `safety_notes` | Text | General safety information |
| `contraindications` | JSON | List of conditions/medications to avoid |
| `vector_embedding` | Vector | For similarity search (pgvector) |

## 2. Wellness Suggestion Mapping

Each ingredient can be mapped to one or more "Rituals".

| Field | Type | Description |
|---|---|---|
| `id` | UUID | Primary Key |
| `ingredient_id` | UUID | Foreign Key to ingredients |
| `tradition` | Enum | TCM, Ayurveda, Folk, Astrology, Acupressure |
| `title` | String | Name of the ritual (e.g., "The Morning Glow Tea") |
| `description` | Text | Why this ritual is performed |
| `instructions` | Text | Step-by-step preparation/execution |
| `safety_disclaimer`| Text | Specific safety notes for this ritual |

## 3. Example Ingredient Entry: Ginger

```json
{
  "name": "Ginger",
  "scientific_name": "Zingiber officinale",
  "category": "Spice",
  "tcm_properties": {
    "nature": "Warm",
    "taste": "Pungent",
    "meridians": ["Lung", "Spleen", "Stomach"]
  },
  "ayurvedic_properties": {
    "dosha": "Balances Vata and Kapha, may increase Pitta",
    "guna": "Dry/Light (Fresh), Heavy/Oily (Dry)"
  },
  "folk_wisdom": "Traditionally used in many cultures as a warming digestive support and for seasonal comfort.",
  "astrological_assoc": "Mars",
  "safety_notes": "Generally safe in culinary amounts.",
  "contraindications": ["Blood-thinning medication", "Gallstones (consult doctor)"],
  "rituals": [
    {
      "tradition": "TCM",
      "title": "Warming Ginger Infusion",
      "description": "In TCM, fresh ginger is used to 'release the exterior' and warm the middle burner.",
      "instructions": "Slice 3 pieces of fresh ginger. Steep in hot water for 5-10 minutes. Sip slowly while warm."
    }
  ]
}
```

## 4. Personalization Logic

The AI uses the schema to filter suggestions:
- **Seasonality**: Suggest "Warming" ingredients in Winter, "Cooling" in Summer.
- **Contraindications**: If user profile has "High Blood Pressure", the engine flags/removes ingredients that are contraindicated.
- **Goals**: If user goal is "Focus", the engine prioritizes ingredients associated with "Mental Clarity" in traditional lore.
