export async function GET(req: Request) {
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = auth.slice(7).replace('dev-token-', '');
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  const items = await prisma.userPantry.findMany({
    where: { userId },
    include: { ingredient: true },
    orderBy: { addedAt: 'desc' },
  });
  await prisma.$disconnect();
  return Response.json(
    items.map((i: any) => ({
      id: i.id,
      user_id: i.userId,
      ingredient_id: i.ingredientId,
      quantity: i.quantity,
      added_at: i.addedAt.toISOString(),
      ingredient: {
        id: i.ingredient.id,
        name: i.ingredient.name,
        category: i.ingredient.category,
        folk_wisdom: i.ingredient.folkWisdom,
        safety_notes: i.ingredient.safetyNotes,
      },
    }))
  );
}

export async function POST(req: Request) {
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = auth.slice(7).replace('dev-token-', '');
  const { ingredient_id, quantity } = await req.json();
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  const item = await prisma.userPantry.create({
    data: { userId, ingredientId: ingredient_id, quantity },
    include: { ingredient: true },
  });
  await prisma.$disconnect();
  return Response.json({
    id: item.id,
    user_id: item.userId,
    ingredient_id: item.ingredientId,
    quantity: item.quantity,
    added_at: item.addedAt.toISOString(),
  });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  await prisma.userPantry.delete({ where: { id } });
  await prisma.$disconnect();
  return Response.json({ success: true });
}