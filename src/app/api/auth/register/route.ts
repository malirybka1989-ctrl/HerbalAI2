export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();
    if (!email || !password || !name) {
      return Response.json({ error: 'Email, password, and name required' }, { status: 400 });
    }
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      await prisma.$disconnect();
      return Response.json({ error: 'Email already registered' }, { status: 409 });
    }
    const user = await prisma.user.create({
      data: { name, email, emailVerified: new Date() },
    });
    await prisma.$disconnect();
    return Response.json({
      user: { id: user.id, name: user.name, email: user.email, created_at: user.createdAt.toISOString() },
      token: 'dev-token-' + user.id,
    });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}