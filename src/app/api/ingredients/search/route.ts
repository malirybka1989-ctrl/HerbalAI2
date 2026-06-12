export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get('q') || '';
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  const ingredients = await prisma.ingredient.findMany({
    where: q ? { name: { contains: q } } : {},
    take: 50,
    orderBy: { name: 'asc' },
  });
  await prisma.$disconnect();
  return Response.json(
    ingredients.map((i: any) => ({
      id: i.id,
      name: i.name,
      category: i.category,
      scientific_name: i.scientificName,
    }))
  );
}