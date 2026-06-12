/**
 * Core Pantry Scan Endpoint
 *
 * Accepts a list of ingredient names, looks them up in the DB,
 * and returns AI-style wellness suggestions based on traditional wisdom.
 * In production, this calls an LLM (OpenAI/Claude); for MVP it returns
 * pre-computed suggestions from the ingredient database.
 */

export async function POST(req: Request) {
  try {
    const { ingredients } = await req.json();
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return Response.json({ error: 'At least one ingredient required' }, { status: 400 });
    }

    // Get auth token for user context
    const auth = req.headers.get('authorization');
    let userId: string | null = null;
    if (auth?.startsWith('Bearer ')) {
      userId = auth.slice(7).replace('dev-token-', '');
    }

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    // Look up ingredients (case-insensitive) with their wellness suggestions
    const allIngredients = await prisma.ingredient.findMany({
      include: { wellnessSuggestions: true },
    });
    const inputLower = ingredients.map((i: string) => i.toLowerCase().trim());
    const ingredientRecords = allIngredients.filter((ing: any) =>
      inputLower.includes(ing.name.toLowerCase())
    );

    // Build AI response from ingredient data + traditions
    const traditions: Record<string, any[]> = {};
    const usedIngredients: string[] = [];

    for (const ing of ingredientRecords) {
      usedIngredients.push(ing.name);
      for (const sug of ing.wellnessSuggestions) {
        if (!traditions[sug.tradition]) traditions[sug.tradition] = [];
        traditions[sug.tradition].push({
          ingredient: ing.name,
          title: sug.title,
          description: sug.description,
          instructions: sug.instructions,
        });
      }
    }

    // Format response as structured wellness suggestions
    const suggestions = Object.entries(traditions).map(([tradition, items]) => ({
      tradition,
      items,
    }));

    // Save scan record
    let scanRecord = null;
    if (userId) {
      scanRecord = await prisma.pantryScan.create({
        data: {
          userId,
          ingredientsUsed: JSON.stringify(usedIngredients),
          aiResponse: JSON.stringify({ suggestions }),
          ritualGenerated: suggestions.length > 0,
        },
      });
    }

    await prisma.$disconnect();

    return Response.json({
      id: scanRecord?.id || 'mock-' + Date.now(),
      ingredients_used: usedIngredients,
      created_at: new Date().toISOString(),
      ai_response: {
        essence: usedIngredients.length > 0
          ? `Wellness inspiration from your ${usedIngredients.join(', ')}`
          : 'Add some ingredients to discover wellness rituals',
        suggestions,
        traditions_used: Object.keys(traditions),
        safety_note: 'Always consult a qualified healthcare provider before trying new wellness practices.',
      },
    });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}