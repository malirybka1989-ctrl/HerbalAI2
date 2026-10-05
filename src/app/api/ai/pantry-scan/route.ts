// ─── POST /api/ai/pantry-scan ──────────────────────────
// Canonical pantry scan endpoint (per design/API_CONTRACT.md).
// Wires the web app to the real AI pipeline with compliance
// guardrails and a deterministic fallback.

import { NextRequest, NextResponse } from "next/server";
import { generatePantryScan } from "@/lib/ai/pantry-scan-service";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body", code: "INVALID_BODY" },
      { status: 400 }
    );
  }

  const { ingredients, context } = (body || {}) as {
    ingredients?: unknown;
    context?: Parameters<typeof generatePantryScan>[1];
  };

  if (!ingredients || !Array.isArray(ingredients)) {
    return NextResponse.json(
      { error: "Missing or invalid 'ingredients' array", code: "INVALID_INPUT" },
      { status: 400 }
    );
  }

  const trimmed = ingredients
    .filter((i): i is string => typeof i === "string" && i.trim().length > 0)
    .map((i) => i.trim());

  if (trimmed.length === 0) {
    return NextResponse.json(
      { error: "At least one ingredient is required", code: "EMPTY_INGREDIENTS" },
      { status: 400 }
    );
  }

  if (trimmed.length > 20) {
    return NextResponse.json(
      { error: "Maximum 20 ingredients per scan", code: "TOO_MANY_INGREDIENTS" },
      { status: 400 }
    );
  }

  const result = await generatePantryScan(trimmed, context);

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error, code: result.code },
      { status: result.status }
    );
  }

  return NextResponse.json(result.response, { status: 200 });
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    version: "1.0.0",
    endpoint: "HerbaAI Pantry Scan API",
  });
}
