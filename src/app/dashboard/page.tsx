// ─── Dashboard Home ────────────────────────────────────
// Daily suggestion card, quick scan button, recent scans

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Scan, Sparkles, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardHome() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold">{greeting}, Wellness Seeker</h1>
        <p className="mt-1 text-muted-foreground">
          Your daily wellness companion. What shall we explore today?
        </p>
      </div>

      {/* Quick scan CTA */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-500 to-moon-600 p-8 text-white shadow-lg">
        <div className="herb-pattern pointer-events-none absolute inset-0 opacity-10" />
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium text-brand-100">AI-Powered</span>
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold">
            Scan Your Pantry
          </h2>
          <p className="mt-2 max-w-md text-brand-100">
            Tell us what ingredients you have, and we&apos;ll create personalized wellness rituals inspired by traditional wisdom.
          </p>
          <div className="mt-6 flex gap-4">
            <Link href="/dashboard/scan">
              <Button className="bg-white text-brand-700 hover:bg-brand-50">
                <Scan className="mr-2 h-4 w-4" />
                Start Scan
              </Button>
            </Link>
            <Link href="/dashboard/pantry">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                My Pantry
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Link href="/dashboard/scan" className="group rounded-2xl border border-border p-6 transition-all hover:border-brand-200 hover:shadow-sm">
          <Scan className="h-8 w-8 text-brand-600" />
          <h3 className="mt-3 font-display text-lg font-semibold">New Scan</h3>
          <p className="mt-1 text-sm text-muted-foreground">Enter ingredients for a wellness ritual</p>
        </Link>
        <Link href="/dashboard/pantry" className="group rounded-2xl border border-border p-6 transition-all hover:border-brand-200 hover:shadow-sm">
          <Clock className="h-8 w-8 text-moon-600" />
          <h3 className="mt-3 font-display text-lg font-semibold">My Pantry</h3>
          <p className="mt-1 text-sm text-muted-foreground">Manage your ingredient collection</p>
        </Link>
        <Link href="/dashboard/history" className="group rounded-2xl border border-border p-6 transition-all hover:border-brand-200 hover:shadow-sm">
          <ArrowRight className="h-8 w-8 text-sunset-600" />
          <h3 className="mt-3 font-display text-lg font-semibold">History</h3>
          <p className="mt-1 text-sm text-muted-foreground">Browse past scan results</p>
        </Link>
      </div>

      {/* Subscription upsell */}
      <div className="rounded-2xl border border-moon-200 bg-moon-50/50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold">Free Plan</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              3 scans per month.{" "}
              <Link href="/dashboard/subscription" className="text-brand-600 underline underline-offset-2 hover:text-brand-700">
                Upgrade for unlimited scans
              </Link>
            </p>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <span className="text-2xl font-bold text-foreground">3</span> / 3 remaining
          </div>
        </div>
      </div>
    </div>
  );
}