// ─── GET/POST /api/pantry/scans ────────────────────────
// List and save user's pantry scan history

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Default user ID when auth is not yet configured
const ANONYMOUS_ID = "anonymous";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || ANONYMOUS_ID;

    const { searchParams } = new URL(request.url);
    const limit = Math.min(Number(searchParams.get("limit")) || 20, 50);
    const offset = Math.max(Number(searchParams.get("offset")) || 0, 0);

    const [scans, total] = await Promise.all([
      prisma.pantryScan.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
        select: {
          id: true,
          ingredientsUsed: true,
          ritualGenerated: true,
          createdAt: true,
        },
      }),
      prisma.pantryScan.count({ where: { userId } }),
    ]);

    return NextResponse.json({
      scans,
      pagination: { total, limit, offset, hasMore: offset + limit < total },
    });
  } catch (error) {
    console.warn("Scan history error:", error);
    return NextResponse.json({ scans: [], pagination: { total: 0, limit: 20, offset: 0, hasMore: false } });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || ANONYMOUS_ID;

    const body = await request.json();
    const { ingredients, aiResponse, ritualGenerated } = body;

    if (!ingredients || !Array.isArray(ingredients)) {
      return NextResponse.json(
        { error: "Missing 'ingredients' array", code: "INVALID_INPUT" },
        { status: 400 }
      );
    }

    const scan = await prisma.pantryScan.create({
      data: {
        userId,
        ingredientsUsed: ingredients,
        aiResponse: aiResponse || {},
        ritualGenerated: ritualGenerated || false,
      },
    });

    return NextResponse.json({ scan }, { status: 201 });
  } catch (error) {
    console.warn("Save scan error:", error);
    return NextResponse.json(
      { error: "Failed to save scan", code: "DB_ERROR" },
      { status: 500 }
    );
  }
}