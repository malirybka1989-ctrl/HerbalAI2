export interface PantryScanRequest {
  ingredients: string[];
  context: {
    season?: string;
    timeOfDay?: string;
    moonPhase?: string;
    preferences?: {
      focus?: string;
      allergies?: string[];
      contraindications?: string[];
    };
  };
}

export interface PantryScanResponse {
  summary: string;
  suggestions: {
    title: string;
    tradition: string;
    description: string;
    instructions: string;
    safety_note: string;
  }[];
  disclaimer: string;
  violations?: string[];
}
