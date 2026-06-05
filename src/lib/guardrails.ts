// ─── Compliance Guardrails ──────────────────────────────
// Implements Level A (prompt injection) and Level B (output scanning)
// based on design/GUARDRAILS.md

// ─── Forbidden Keywords ────────────────────────────────

const FORBIDDEN_KEYWORDS: Record<string, string[]> = {
  medicinal: [
    "cure",
    "treat",
    "heal",
    "medicine",
    "remedy",
    "pharmacy",
    "medication",
  ],
  actions: ["prevents", "diagnoses", "mitigates", "prescribes"],
  symptoms: [
    "anxiety",
    "insomnia",
    "inflammation",
    "nausea",
    "headache",
    "flu",
    "cold",
  ],
  claims: [
    "boosts immune system",
    "lowers blood pressure",
    "kills bacteria",
    "fights infection",
    "eliminates toxins",
  ],
};

const FORBIDDEN_REGEX = new RegExp(
  `\\b(${[...Object.values(FORBIDDEN_KEYWORDS)].flat().join("|")})\\b`,
  "gi"
);

// ─── Mandatory Disclaimer ──────────────────────────────

export const MANDATORY_DISCLAIMER =
  "⚠️ **Disclaimer**: This content is for informational and educational purposes only. It is not medical advice, diagnosis, or treatment. HerbaAI does not diagnose, cure, mitigate, treat, or prevent any disease. Always consult a qualified healthcare provider before making changes to your health regimen.";

// ─── Tradition Attribution Templates ───────────────────

export const TRADITION_PHRASES: Record<string, string> = {
  TCM: "In Traditional Chinese Medicine",
  Ayurveda: "According to Ayurvedic practice",
  Folk: "European folk wisdom suggests",
  Astrology: "In astrological tradition",
  Acupressure: "In acupressure practice",
};

// ─── Guardrail Functions ──────────────────────────────

/**
 * Check if text contains forbidden keywords.
 * Returns array of matched forbidden terms.
 */
export function scanForbiddenKeywords(text: string): string[] {
  const matches = new Set<string>();
  let match;
  const regex = new RegExp(FORBIDDEN_REGEX.source, "gi");
  while ((match = regex.exec(text)) !== null) {
    matches.add(match[0].toLowerCase());
  }
  return Array.from(matches);
}

/**
 * Validate that a suggestion has proper tradition attribution.
 * Returns true if at least one tradition phrase is found.
 */
export function hasTraditionAttribution(text: string): boolean {
  return Object.values(TRADITION_PHRASES).some((phrase) =>
    text.toLowerCase().includes(phrase.toLowerCase())
  );
}

/**
 * Check if user input mentions sensitive health topics.
 * Used to add extra safety warnings.
 */
export function hasSensitiveContext(text: string): boolean {
  const sensitiveTerms = [
    "pregnant",
    "pregnancy",
    "medication",
    "pill",
    "drug",
    "prescription",
    "blood thinner",
    "warfarin",
    "aspirin",
    "chemotherapy",
    "surgery",
  ];
  return sensitiveTerms.some((term) =>
    text.toLowerCase().includes(term.toLowerCase())
  );
}

/**
 * Generate extra safety warning for sensitive contexts.
 */
export function getSensitiveWarning(context: string): string | null {
  if (hasSensitiveContext(context)) {
    return "⚠️ **Important**: Because you mentioned something related to medication, pregnancy, or a medical condition, it is especially important to consult your doctor before trying any new herbal rituals, as some ingredients may not be suitable for your situation.";
  }
  return null;
}

/**
 * Replace forbidden words with approved alternatives in text.
 * Note: This is a simple replacement. For production, Level C
 * semantic guardrails should also be applied.
 */
export function sanitizeResponse(text: string): string {
  let sanitized = text;

  // Replace common forbidden patterns with approved alternatives
  const replacements: [RegExp, string][] = [
    [/\bcure\b/gi, "traditional comfort"],
    [/\btreat\b/gi, "support"],
    [/\bheal\b/gi, "nourish"],
    [/\bremedy\b/gi, "ritual"],
    [/\bmedicine\b/gi, "wellness practice"],
    [/\bprevents\b/gi, "traditionally supports"],
    [/\bdiagnoses\b/gi, "identifies imbalances in"],
    [/\bmitigates\b/gi, "soothes"],
    [/\bprescribes\b/gi, "suggests"],
    [/\banxiety\b/gi, "restlessness"],
    [/\binsomnia\b/gi, "evening restlessness"],
    [/\binflammation\b/gi, "warmth or tension"],
    [/\bnausea\b/gi, "digestive discomfort"],
    [/\bheadache\b/gi, "tension or pressure"],
    [/\bflu\b/gi, "seasonal imbalance"],
    [/\bcold\b/gi, "seasonal shift"],
    [/\bboosts immune system\b/gi, "supports seasonal wellness"],
    [/\blowers blood pressure\b/gi, "traditionally associated with heart health"],
    [/\bkills bacteria\b/gi, "traditional preservation"],
  ];

  for (const [pattern, replacement] of replacements) {
    sanitized = sanitized.replace(pattern, replacement);
  }

  return sanitized;
}

/**
 * Full guardrail pipeline: scan, sanitize, validate, append disclaimer.
 */
export function applyGuardrails(
  response: string,
  userContext?: string
): {
  safeResponse: string;
  warnings: string[];
  needsReview: boolean;
} {
  const warnings: string[] = [];

  // Level B: Scan for forbidden keywords
  const forbiddenFound = scanForbiddenKeywords(response);
  if (forbiddenFound.length > 0) {
    warnings.push(
      `Found potentially restricted terms: ${forbiddenFound.join(", ")}`
    );
  }

  // Sanitize response
  let safeResponse = sanitizeResponse(response);

  // Validate tradition attribution
  if (!hasTraditionAttribution(safeResponse)) {
    warnings.push("Response missing tradition attribution");
  }

  // Check for sensitive user context
  if (userContext) {
    const sensitiveWarning = getSensitiveWarning(userContext);
    if (sensitiveWarning) {
      safeResponse = safeResponse + "\n\n" + sensitiveWarning;
    }
  }

  // Ensure disclaimer is present
  if (!safeResponse.includes(MANDATORY_DISCLAIMER)) {
    safeResponse = safeResponse + "\n\n" + MANDATORY_DISCLAIMER;
  }

  return {
    safeResponse,
    warnings,
    needsReview: forbiddenFound.length > 0,
  };
}