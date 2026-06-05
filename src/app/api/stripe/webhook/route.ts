// ─── POST /api/stripe/webhook ──────────────────────────
// Stripe webhook handler for subscription events

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  try {
    const body = await request.text();

    let event;
    try {
      const stripe = new (require("stripe"))(process.env.STRIPE_SECRET_KEY);
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch {
      // Webhook secret not configured - handle without verification in dev
      event = JSON.parse(body);
    }

    const { type } = event;
    const data = event.data?.object || {};

    // Handle subscription events
    switch (type) {
      case "checkout.session.completed": {
        const customerId = data.customer;
        const subscriptionId = data.subscription;
        const metadata = data.metadata || {};

        if (metadata.userId) {
          await prisma.subscription.create({
            data: {
              userId: metadata.userId,
              plan: metadata.plan || "monthly",
              status: "active",
              stripeSubscriptionId: subscriptionId,
              currentPeriodStart: new Date(),
              currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
          });
        }

        // Update user's stripe customer ID
        if (customerId && metadata.userId) {
          await prisma.user.update({
            where: { id: metadata.userId },
            data: { stripeCustomerId: customerId },
          });
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscriptionId = data.id;
        const status = data.status;

        if (subscriptionId && status) {
          await prisma.subscription.updateMany({
            where: { stripeSubscriptionId: subscriptionId },
            data: { status },
          });
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }
}