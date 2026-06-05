// ─── Dashboard Scan Results ────────────────────────────
// Display AI suggestions with tradition attribution, instructions, safety notes, disclaimer

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowLeft, Bookmark, BookmarkCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Suggestion {
  title: string;
  tradition: string;
  description: string;
  instructions: string;
  safety_note?: string;
}

interface ScanResult {
  summary: string;
  suggestions: Suggestion[];
  disclaimer: string;
}

const traditionColors: Record<string, string> = {
  "Traditional Chinese Medicine": "bg-red-100 text-red-800 border-red-200",
  Ayurveda: "bg-amber-100 text-amber-800 border-amber-200",
  "Folk Wisdom": "bg-green-100 text-green-800 border-green-200",
  Astrology: "bg-purple-100 text-purple-800 border-purple-200",
  Acupressure: "bg-blue-100 text-blue-800 border-blue-200",
  "Folk": "bg-green-100 text-green-800 border-green-200",
};

export default function ScanResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const ingredientsStr = sessionStorage.getItem("scanIngredients");
    if (!ingredientsStr) {
      router.push("/dashboard/scan");
      return;
    }

    const ingredients = JSON.parse(ingredientsStr);

    // Call the AI API
    fetch("/api/ai/pantry-scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setResult(data);
        }
      })
      .catch(() => setError("Failed to scan. Please try again."))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Sparkles className="mx-auto h-12 w-12 animate-pulse text-brand-500" />
          <p className="mt-4 font-display text-xl font-semibold">Consulting ancient wisdom...</p>
          <p className="mt-2 text-muted-foreground">Our AI is analyzing your ingredients</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
        <h2 className="mt-4 font-display text-2xl font-bold">Scan Error</h2>
        <p className="mt-2 text-muted-foreground">{error}</p>
        <Button className="mt-6" onClick={() => router.push("/dashboard/scan")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Try Again
        </Button>
      </div>
    );
  }

  if (!result) return null;

  const suggestions = result.suggestions || [];
  const ingredients = JSON.parse(sessionStorage.getItem("scanIngredients") || "[]");

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => router.push("/dashboard/scan")}
            className="mb-2 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Scan
          </button>
          <h1 className="font-display text-3xl font-bold">Your Wellness Rituals</h1>
          <p className="mt-1 text-muted-foreground">
            For: <span className="font-medium text-foreground">{ingredients.join(", ")}</span>
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setSaved(!saved)}
          className={saved ? "text-brand-600" : ""}
        >
          {saved ? (
            <><BookmarkCheck className="mr-2 h-4 w-4" /> Saved</>
          ) : (
            <><Bookmark className="mr-2 h-4 w-4" /> Save</>
          )}
        </Button>
      </div>

      {/* Summary */}
      <div className="rounded-2xl bg-gradient-to-br from-brand-50 to-moon-50 p-6">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-1 h-5 w-5 text-brand-600" />
          <div>
            <h2 className="font-display text-lg font-semibold">The Essence</h2>
            <p className="mt-1 text-muted-foreground">{result.summary}</p>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No suggestions found for these ingredients.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <span
                    className={`inline-block rounded-full border px-3 py-0.5 text-xs font-medium ${
                      traditionColors[suggestion.tradition] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {suggestion.tradition}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold">
                    {suggestion.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {suggestion.description}
                  </p>

                  {/* Instructions */}
                  <div className="mt-4 rounded-xl bg-muted/50 p-4">
                    <h4 className="text-sm font-semibold text-foreground">How to practice:</h4>
                    <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
                      {suggestion.instructions}
                    </p>
                  </div>

                  {/* Safety note */}
                  {suggestion.safety_note && suggestion.safety_note !== "None." && (
                    <div className="mt-3 flex items-start gap-2 text-sm text-amber-700">
                      <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>{suggestion.safety_note}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 text-sm text-amber-800">
        {result.disclaimer}
      </div>
    </div>
  );
}