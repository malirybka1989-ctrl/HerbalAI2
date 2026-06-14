import OpenAI from 'openai';
import { SYSTEM_PROMPT, generatePantryScanPrompt } from './prompt-templates';
import { validateAIResponse, isAskingForMedicalAdvice } from './compliance-guardrails';
import { PantryScanRequest, PantryScanResponse } from './types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function runPantryScan(
  request: PantryScanRequest
): Promise<PantryScanResponse> {
  // 1. Pre-check for medical advice requests
  const inputString = request.ingredients.join(' ');
  if (isAskingForMedicalAdvice(inputString)) {
    throw new Error(
      'Your request seems to be seeking medical advice. HerbaAI provides traditional wellness inspiration only. Please consult a healthcare professional for medical concerns.'
    );
  }

  // 2. Generate Prompt
  const userPrompt = generatePantryScanPrompt(
    request.ingredients,
    request.context
  );

  // 3. Call LLM
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
    response_format: { type: 'json_object' },
  });

  const rawContent = response.choices[0].message.content || '{}';
  const parsedContent = JSON.parse(rawContent);

  // 4. Post-check Guardrails
  const fullTextForValidation = JSON.stringify(parsedContent);
  const { isValid, sanitizedContent, violations } = validateAIResponse(
    fullTextForValidation
  );

  // We return the parsed content but ensure it includes the disclaimer and violations if any
  return {
    ...parsedContent,
    disclaimer:
      '⚠️ Disclaimer: This content is for informational and educational purposes only. It is not medical advice, diagnosis, or treatment. HerbaAI does not diagnose, cure, mitigate, treat, or prevent any disease. Always consult a qualified healthcare provider before making changes to your health regimen.',
    violations: violations.length > 0 ? violations : undefined,
  };
}
