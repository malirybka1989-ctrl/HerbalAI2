const FORBIDDEN_KEYWORDS = [
  'cure',
  'treat',
  'heal',
  'medicine',
  'remedy',
  'pharmacy',
  'medication',
  'prevents',
  'diagnoses',
  'mitigates',
  'prescribes',
  'anxiety',
  'insomnia',
  'inflammation',
  'nausea',
  'headache',
  'flu',
  'cold',
  'boosts immune system',
  'lowers blood pressure',
  'kills bacteria',
];

const MANDATORY_DISCLAIMER =
  '⚠️ Disclaimer: This content is for informational and educational purposes only. It is not medical advice, diagnosis, or treatment. HerbaAI does not diagnose, cure, mitigate, treat, or prevent any disease. Always consult a qualified healthcare provider before making changes to your health regimen.';

/**
 * Validates that the AI response does not contain forbidden medical claims
 * and includes the mandatory disclaimer.
 */
export function validateAIResponse(content: string): {
  isValid: boolean;
  sanitizedContent: string;
  violations: string[];
} {
  const violations: string[] = [];
  const lowerContent = content.toLowerCase();

  FORBIDDEN_KEYWORDS.forEach((keyword) => {
    if (lowerContent.includes(keyword)) {
      violations.push(keyword);
    }
  });

  let sanitizedContent = content;

  // Ensure disclaimer is present
  if (!content.includes(MANDATORY_DISCLAIMER)) {
    sanitizedContent += `\n\n${MANDATORY_DISCLAIMER}`;
  }

  return {
    isValid: violations.length === 0,
    sanitizedContent,
    violations,
  };
}

/**
 * Checks if the user input is asking for medical advice.
 */
export function isAskingForMedicalAdvice(input: string): boolean {
  const medicalTriggers = [
    'how to cure',
    'treat my',
    'medicine for',
    'diagnose',
    'prescription',
    'is this a remedy for',
  ];
  const lowerInput = input.toLowerCase();
  return medicalTriggers.some((trigger) => lowerInput.includes(trigger));
}
