export async function GET(req: Request) {
  const auth = req.headers.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const token = auth.slice(7);
  const userId = token.replace('dev-token-', '');
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    await prisma.$disconnect();
    return Response.json({ error: 'User not found' }, { status: 404 });
  }
  await prisma.$disconnect();
  return Response.json({
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.createdAt.toISOString(),
  });
}