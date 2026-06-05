// ─── GET /api/ingredients ──────────────────────────────
// Returns ingredients for autocomplete/search in the pantry UI

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim().toLowerCase() || "";
    const category = searchParams.get("category")?.trim().toLowerCase() || "";
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 100);
    const offset = Math.max(Number(searchParams.get("offset")) || 0, 0);

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { scientificName: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
      ];
    }

    if (category) {
      where.category = { equals: category, mode: "insensitive" };
    }

    const [ingredients, total] = await Promise.all([
      prisma.ingredient.findMany({
        where,
        select: {
          id: true,
          name: true,
          scientificName: true,
          category: true,
          tcmProperties: true,
          ayurvedicProperties: true,
          folkWisdom: true,
          astrologicalAssoc: true,
          safetyNotes: true,
          contraindications: true,
        },
        take: limit,
        skip: offset,
        orderBy: { name: "asc" },
      }),
      prisma.ingredient.count({ where }),
    ]);

    return NextResponse.json({
      ingredients,
      pagination: { total, limit, offset, hasMore: offset + limit < total },
    });
  } catch (error) {
    // Return empty list on DB error (e.g., no PostgreSQL connected)
    console.warn("Ingredients DB error, returning empty:", error);
    return NextResponse.json({ ingredients: [], pagination: { total: 0, limit: 20, offset: 0, hasMore: false } });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const names: string[] = Array.isArray(body.names) ? body.names : [];

    if (names.length === 0 || names.length > 50) {
      return NextResponse.json(
        { error: names.length === 0 ? "Missing 'names' array" : "Maximum 50 names", code: "INVALID_INPUT" },
        { status: 400 }
      );
    }

    const ingredients = await prisma.ingredient.findMany({
      where: { name: { in: names, mode: "insensitive" } },
    });

    return NextResponse.json({ ingredients });
  } catch (error) {
    console.warn("Ingredients lookup error:", error);
    return NextResponse.json({ ingredients: [] });
  }
}