// ─── POST /api/stripe/create-checkout ──────────────────
// Create Stripe Checkout session for subscription

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const STRIPE_MONTHLY_PRICE_ID = process.env.STRIPE_MONTHLY_PRICE_ID || "price_monthly";
const STRIPE_YEARLY_PRICE_ID = process.env.STRIPE_YEARLY_PRICE_ID || "price_yearly";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required", code: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { plan } = body; // "monthly" | "yearly"

    if (!plan || !["monthly", "yearly"].includes(plan)) {
      return NextResponse.json(
        { error: "Invalid plan. Must be 'monthly' or 'yearly'", code: "INVALID_PLAN" },
        { status: 400 }
      );
    }

    const priceId = plan === "monthly" ? STRIPE_MONTHLY_PRICE_ID : STRIPE_YEARLY_PRICE_ID;

    try {
      const stripe = new (require("stripe"))(process.env.STRIPE_SECRET_KEY);

      // Get or create customer
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      });

      let customerId = user?.stripeCustomerId;

      if (!customerId) {
        const customer = await stripe.customers.create({
          email: session.user.email,
          name: session.user.name,
          metadata: { userId: session.user.id },
        });
        customerId = customer.id;

        await prisma.user.update({
          where: { id: session.user.id },
          data: { stripeCustomerId: customerId },
        });
      }

      // Create checkout session
      const checkout = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/subscription?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/subscription?canceled=true`,
        metadata: { userId: session.user.id, plan },
      });

      return NextResponse.json({ url: checkout.url, sessionId: checkout.id });
    } catch (stripeError) {
      // Stripe not configured - return mock URL for development
      console.warn("Stripe not configured, returning mock checkout:", stripeError);
      return NextResponse.json({
        url: `/dashboard/subscription?plan=${plan}&mock=true`,
        sessionId: `mock_${Date.now()}`,
        mock: true,
      });
    }
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Internal server error", code: "INTERNAL_ERROR" }, { status: 500 });
  }
}