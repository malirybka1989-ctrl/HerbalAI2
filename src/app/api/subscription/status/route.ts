export async function GET(req: Request) {
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) {
    return Response.json({ plan: 'free', status: 'trialing' });
  }
  const userId = auth.slice(7).replace('dev-token-', '');
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  const sub = await prisma.subscription.findFirst({
    where: { userId, status: 'active' },
    orderBy: { createdAt: 'desc' },
  });
  await prisma.$disconnect();
  if (!sub) {
    return Response.json({ plan: 'free', status: 'trialing' });
  }
  return Response.json({
    id: sub.id,
    user_id: sub.userId,
    plan: sub.plan,
    status: sub.status,
    current_period_end: sub.currentPeriodEnd?.toISOString(),
  });
}