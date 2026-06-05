// ─── Dashboard Subscription ────────────────────────────
// Subscription settings page with Stripe checkout

"use client";

import { useState } from "react";
import { Check, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "€0",
    period: "forever",
    features: [
      "3 pantry scans per month",
      "Basic ingredient database",
      "5 wellness rituals",
      "Standard AI suggestions",
    ],
    cta: "Current Plan",
    popular: false,
  },
  {
    id: "monthly",
    name: "Monthly",
    price: "€9.99",
    period: "per month",
    features: [
      "Unlimited pantry scans",
      "Full ingredient database (300+)",
      "Personalized daily recommendations",
      "Seasonal & moon phase alignment",
      "Save & favorite rituals",
      "Priority support",
    ],
    cta: "Subscribe Monthly",
    popular: true,
  },
  {
    id: "yearly",
    name: "Yearly",
    price: "€79.99",
    period: "per year",
    features: [
      "Everything in Monthly",
      "2 free consultation credits",
      "Exclusive course discounts (20% off)",
      "Priority AI processing",
      "Early access to new features",
    ],
    cta: "Subscribe Yearly",
    popular: false,
    badge: "Save 33%",
  },
];

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (planId: string) => {
    if (planId === "free") return;

    setLoading(true);
    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Subscription error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold">Subscription</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Choose the plan that fits your wellness journey.
        </p>
      </div>

      {/* Plan comparison */}
      <div className="grid gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl border-2 p-6 transition-all ${
              selectedPlan === plan.id
                ? plan.popular
                  ? "border-brand-500 shadow-lg"
                  : "border-brand-300"
                : "border-border"
            } ${plan.popular ? "bg-white shadow-sm" : "bg-white/60"}`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-4 py-1 text-xs font-semibold text-white">
                {plan.badge}
              </div>
            )}
            {plan.popular && !plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-4 py-1 text-xs font-semibold text-white">
                Most Popular
              </div>
            )}

            <div className="text-center">
              <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="ml-1 text-sm text-muted-foreground">
                  /{plan.period}
                </span>
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className="mt-8 w-full"
              variant={selectedPlan === plan.id && plan.id !== "free" ? "default" : "outline"}
              onClick={() => {
                setSelectedPlan(plan.id);
                if (plan.id !== "free") {
                  handleSubscribe(plan.id);
                }
              }}
              disabled={loading || plan.id === "free"}
            >
              {loading && selectedPlan === plan.id ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                plan.cta
              )}
            </Button>
          </div>
        ))}
      </div>

      {/* Current plan info */}
      <div className="rounded-2xl border border-moon-200 bg-moon-50/50 p-6">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-moon-600" />
          <div>
            <h3 className="font-medium">Free Plan — 3 scans remaining this month</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Upgrade to Monthly or Yearly for unlimited scans and full features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}