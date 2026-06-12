export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return Response.json({ error: 'Email and password required' }, { status: 400 });
    }
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      await prisma.$disconnect();
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    await prisma.$disconnect();
    return Response.json({
      user: { id: user.id, name: user.name, email: user.email, created_at: user.createdAt.toISOString() },
      token: 'dev-token-' + user.id,
    });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}