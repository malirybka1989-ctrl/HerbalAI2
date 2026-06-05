import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Leaf, Sparkles, Moon, Star, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-brand-600" />
            <span className="font-display text-xl font-bold">HerbaAI</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/signin" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Sign In
            </Link>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative isolate flex min-h-screen flex-col items-center justify-center px-4 pt-24">
        <div className="herb-pattern pointer-events-none absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-brand-50/30 to-moon-50/20" />

        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm text-brand-700">
            <Sparkles className="h-4 w-4" />
            AI-Powered Wellness Companion
          </div>
          <h1 className="font-display text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Turn What You Have Into{" "}
            <span className="gradient-heading">Wellness Rituals</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Your personal AI guide that transforms everyday ingredients into
            holistic wellness practices. Combining Traditional Chinese Medicine,
            astrology, folk wisdom, and acupressure.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="w-full sm:w-auto">
              Start Your Wellness Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              See How It Works
            </Button>
          </div>
        </div>

        {/* Feature preview cards */}
        <div className="mx-auto mt-20 grid max-w-5xl gap-6 px-4 sm:grid-cols-3">
          {[
            {
              icon: Leaf,
              title: "Pantry Scan",
              desc: "Tell us what ingredients you have, and we'll suggest personalized wellness rituals.",
            },
            {
              icon: Moon,
              title: "Seasonal Wisdom",
              desc: "Recommendations aligned with seasons, moon phases, and traditional calendars.",
            },
            {
              icon: Star,
              title: "Multi-Tradition",
              desc: "Drawing from TCM, Ayurveda, astrology, European folk wisdom, and acupressure.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="glass-card rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-md"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-bold">
              Everything You Need for{" "}
              <span className="gradient-heading">Holistic Wellness</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              No expensive kits. No guessing. Just your ingredients, your
              traditions, and your AI companion.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "300+ Ingredients",
                desc: "Comprehensive database of herbs, spices, and household items with traditional wellness knowledge.",
              },
              {
                title: "AI Ritual Generator",
                desc: "Get step-by-step wellness rituals based on what's already in your kitchen.",
              },
              {
                title: "Personalization",
                desc: "Tailored to your wellness goals, season, moon phase, and health considerations.",
              },
              {
                title: "Compliance Safe",
                desc: "Every suggestion is validated against EU/CZ wellness regulations with clear disclaimers.",
              },
              {
                title: "Expert Consultations",
                desc: "Book 1:1 sessions with certified TCM practitioners, herbalists, and astrologers.",
              },
              {
                title: "Digital Courses",
                desc: "Deep dive into herbalism, moon phase wellness, acupressure, and more.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-border p-6 transition-all duration-300 hover:border-brand-200 hover:shadow-md"
              >
                <h3 className="font-display text-lg font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gradient-to-b from-white to-brand-50/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-bold">
              How It <span className="gradient-heading">Works</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Three simple steps to transform your pantry into a wellness sanctuary.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Scan Your Pantry",
                desc: "Enter what ingredients, herbs, and spices you have at home. Even common household items count.",
              },
              {
                step: "02",
                title: "AI Analyzes",
                desc: "Our engine maps your ingredients to traditional wellness knowledge from TCM, Ayurveda, and folk wisdom.",
              },
              {
                step: "03",
                title: "Get Rituals",
                desc: "Receive personalized wellness rituals with step-by-step instructions and safety guidance.",
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 font-display text-2xl font-bold text-brand-600">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-3 text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-bold">
              Simple,{" "}
              <span className="gradient-heading">Transparent Pricing</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start with our AI companion. Upgrade when you're ready for more.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {/* Free */}
            <div className="rounded-2xl border border-border p-8">
              <h3 className="font-display text-xl font-semibold">Starter</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Dip your toes in
              </p>
              <div className="mt-6">
                <span className="text-4xl font-bold">Free</span>
              </div>
              <ul className="mt-8 space-y-4">
                {[
                  "3 pantry scans per month",
                  "Basic ingredient database",
                  "5 wellness rituals",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 text-brand-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="mt-8 w-full">
                Get Started
              </Button>
            </div>

            {/* Monthly */}
            <div className="relative rounded-2xl border-2 border-brand-500 bg-white p-8 shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-4 py-1 text-xs font-semibold text-white">
                Most Popular
              </div>
              <h3 className="font-display text-xl font-semibold">Monthly</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                For daily wellness explorers
              </p>
              <div className="mt-6">
                <span className="text-4xl font-bold">€9.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="mt-8 space-y-4">
                {[
                  "Unlimited pantry scans",
                  "Full ingredient database (300+)",
                  "Personalized daily recommendations",
                  "Seasonal & moon phase alignment",
                  "Save & favorite rituals",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 text-brand-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8 w-full">Subscribe Monthly</Button>
            </div>

            {/* Yearly */}
            <div className="rounded-2xl border border-border p-8">
              <h3 className="font-display text-xl font-semibold">Yearly</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Best value for committed wellness
              </p>
              <div className="mt-6">
                <span className="text-4xl font-bold">€79.99</span>
                <span className="text-muted-foreground">/year</span>
              </div>
              <div className="mt-1 text-sm text-brand-600">
                Save 33% — €6.67/month
              </div>
              <ul className="mt-8 space-y-4">
                {[
                  "Everything in Monthly",
                  "2 free consultation credits",
                  "Exclusive course discounts (20% off)",
                  "Priority AI processing",
                  "Early access to new features",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 text-brand-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8 w-full">Subscribe Yearly</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-brand-600" />
              <span className="font-display text-lg font-bold">HerbaAI</span>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              ⚠️ Disclaimer: This content is for informational and educational
              purposes only. It is not medical advice, diagnosis, or treatment.
              HerbaAI does not diagnose, cure, mitigate, treat, or prevent any
              disease. Always consult a qualified healthcare provider before
              making changes to your health regimen.
            </p>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} HerbaAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}