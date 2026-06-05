// ─── Shared Types for HerbaAI ──────────────────────────

export type Tradition =
  | "TCM"
  | "Ayurveda"
  | "Folk"
  | "Astrology"
  | "Acupressure";

export interface WellnessSuggestion {
  tradition: Tradition;
  title: string;
  description: string;
  instructions: string;
  safetyDisclaimer?: string;
}

export interface IngredientInfo {
  name: string;
  scientificName?: string;
  category?: string;
  tcmProperties?: {
    nature?: string;
    taste?: string;
    meridians?: string[];
  };
  ayurvedicProperties?: {
    dosha?: string;
    guna?: string;
  };
  folkWisdom?: string;
  astrologicalAssoc?: string;
  safetyNotes?: string;
  contraindications?: string[];
}

export interface PantryScanRequest {
  ingredients: string[];
  goals?: string[];
  season?: string;
  moonPhase?: string;
  contraindications?: string[];
}

export interface PantryScanResponse {
  id: string;
  essence: string;
  rituals: WellnessSuggestion[];
  ingredientsUsed: string[];
  safetyNote: string;
  disclaimer: string;
}

export interface AiContext {
  season: string;
  moonPhase: string;
  goals: string[];
  contraindications: string[];
}

// ─── API Error Response ────────────────────────────────

export interface ApiError {
  error: string;
  code: string;
  details?: string;
}