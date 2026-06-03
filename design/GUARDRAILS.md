# Compliance Guardrails — Herbal Ai

This document defines the automated and semi-automated validation steps to ensure all AI-generated content adheres to EU and Czech Republic wellness regulations.

## 1. Forbidden Keywords & Phrases

The system must filter or flag the following terms:

| Category | Forbidden Terms (Do NOT use) | Approved Alternatives |
|---|---|---|
| **Medicinal** | cure, treat, heal, medicine, remedy, pharmacy, medication | ritual, practice, inspiration, pantry, wisdom, tradition |
| **Actions** | prevents, diagnoses, mitigates, prescribes | supports, encourages, inspires, traditionally used for |
| **Symptoms** | anxiety, insomnia, inflammation, nausea, headache, flu, cold | restlessness, evening wind-down, cooling, digestive comfort, seasonal support |
| **Claims** | boosts immune system, lowers blood pressure, kills bacteria | seasonal wellness ritual, traditionally associated with heart health, traditional preservation |

## 2. Mandatory Attribution Rules

Every wellness suggestion MUST be attributed to at least one tradition.

- **Acceptable**: "In Traditional Chinese Medicine...", "According to Ayurvedic practice...", "European folk wisdom suggests..."
- **Unacceptable**: "It is a fact that...", "Science shows...", "This will work for you because..."

## 3. The Mandatory Disclaimer

The following disclaimer must be appended to every AI response:

> ⚠️ **Disclaimer**: This content is for informational and educational purposes only. It is not medical advice, diagnosis, or treatment. HerbaAI does not diagnose, cure, mitigate, treat, or prevent any disease. Always consult a qualified healthcare provider before making changes to your health regimen.

## 4. Guardrail Implementation Strategy

### Level A: System Prompt Constraints
Hard-coding the "forbidden words" and "required phrasing" into the LLM's system prompt.

### Level B: Output Regex/Keyword Scanning
A post-generation step that scans the response for any forbidden keywords. If found, the response is either:
1. Re-generated with a corrective prompt.
2. Flagged for human review (if in a semi-automated content pipeline).
3. Blocked and replaced with a safe fallback.

### Level C: Semantic Guardrails (e.g., NeMo Guardrails)
Using semantic similarity to detect if the AI is making a medical claim, even if it avoids specific forbidden words.

## 5. Risk Scenarios

### User asks for a "cure"
- **Detected**: "cure", "headache"
- **Response**: Re-frame as "traditional comfort" and provide disclaimer.
- **Example**: "While we don't offer medical treatments for headaches, some folk traditions suggest a cooling peppermint ritual for relaxation..."

### User mentions pregnancy/medication
- **Detected**: "pregnant", "medication", "pill"
- **Action**: Add an extra-strong safety warning.
- **Example**: "Note: Because you mentioned pregnancy, it is especially important to consult your doctor before trying any new herbal rituals, as some ingredients may not be suitable."
