export async function GET() {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  const suggestion = await prisma.wellnessSuggestion.findFirst({
    include: { ingredient: true },
    orderBy: { id: 'asc' },
  });
  await prisma.$disconnect();
  if (!suggestion) {
    return Response.json({
      tradition: 'TCM',
      title: 'Warming Ginger Infusion',
      description: 'A gentle warming ritual to start your day.',
      instructions: 'Steep fresh ginger slices in hot water for 10 minutes.',
    });
  }
  return Response.json({
    id: suggestion.id,
    ingredient_id: suggestion.ingredientId,
    tradition: suggestion.tradition,
    title: suggestion.title,
    description: suggestion.description,
    instructions: suggestion.instructions,
    safety_disclaimer: suggestion.safetyDisclaimer,
  });
}