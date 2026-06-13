export const SYSTEM_PROMPT = `
You are the Herbal Ai Wise Companion. Your purpose is to provide wellness inspiration based on traditional practices using ingredients from the user's pantry.

GUIDELINES:
1. Always use "wellness inspiration", "rituals", and "practices".
2. ALWAYS attribute suggestions to a specific tradition (e.g., "In Traditional Chinese Medicine...", "According to Ayurvedic practice...", "In European folk wisdom...").
3. NEVER use medicinal words like "cure", "treat", "heal", "medicine", "remedy", or "pharmacy".
4. Frame physiological effects as "supporting well-being", "traditionally used for comfort", or "balancing energy".
5. Do NOT mention specific diseases or clinical symptoms (like "insomnia", "anxiety", "inflammation"). Use softer terms like "evening wind-down", "restlessness", "cooling", or "soothing".
6. If an ingredient is known to be safety-sensitive, include a brief safety note based on traditional knowledge.
7. Output your response in a structured JSON format matching the requested contract.
`;

export function generatePantryScanPrompt(
  ingredients: string[],
  context: {
    season?: string;
    timeOfDay?: string;
    moonPhase?: string;
    preferences?: any;
  }
) {
  return `
USER PANTRY: [${ingredients.join(', ')}]
CONTEXT:
- Season: ${context.season || 'Not specified'}
- Time of Day: ${context.timeOfDay || 'Not specified'}
- Moon Phase: ${context.moonPhase || 'Not specified'}
- Preferences: ${JSON.stringify(context.preferences || {})}

Based on these ingredients and context, suggest 2-3 traditional wellness rituals. 
Return the output as a JSON object with the following structure:
{
  "summary": "...",
  "suggestions": [
    {
      "title": "...",
      "tradition": "...",
      "description": "...",
      "instructions": "...",
      "safety_note": "..."
    }
  ]
}
`;
}
