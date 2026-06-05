// ─── Dashboard Scan ────────────────────────────────────
// Input ingredients and trigger scan

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Scan, Plus, X, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const SUGGESTED = [
  "Ginger", "Turmeric", "Cinnamon", "Peppermint", "Chamomile",
  "Honey", "Lemon", "Garlic", "Rosemary", "Lavender",
];

export default function ScanPage() {
  const router = useRouter();
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [isScanning, setIsScanning] = useState(false);

  const updateIngredient = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addRow = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeRow = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const addSuggested = (item: string) => {
    if (!ingredients.includes(item)) {
      const emptyIndex = ingredients.findIndex((i) => i.trim() === "");
      if (emptyIndex >= 0) {
        updateIngredient(emptyIndex, item);
      } else {
        setIngredients([...ingredients, item]);
      }
    }
  };

  const handleScan = async () => {
    const valid = ingredients.filter((i) => i.trim());
    if (valid.length === 0) return;

    setIsScanning(true);

    // Store ingredients for results page
    sessionStorage.setItem("scanIngredients", JSON.stringify(valid));

    // Redirect to results page
    router.push("/dashboard/scan/results");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Pantry Scan</h1>
        <p className="mt-1 text-muted-foreground">
          Enter the ingredients you have at home, and we&apos;ll create personalized wellness rituals.
        </p>
      </div>

      {/* Ingredient input */}
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <div className="space-y-3">
          {ingredients.map((ing, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={ing}
                onChange={(e) => updateIngredient(index, e.target.value)}
                placeholder={`Ingredient ${index + 1} (e.g., Ginger)`}
                className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
              />
              {ingredients.length > 1 && (
                <button
                  onClick={() => removeRow(index)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-accent"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4">
          <Button variant="outline" onClick={addRow}>
            <Plus className="mr-2 h-4 w-4" />
            Add Ingredient
          </Button>
        </div>
      </div>

      {/* Quick add suggestions */}
      <div>
        <h2 className="font-display text-lg font-semibold">
          <Sparkles className="mr-2 inline h-5 w-5 text-brand-500" />
          Quick Add
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Click to add common ingredients:
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTED.map((item) => (
            <button
              key={item}
              onClick={() => addSuggested(item)}
              className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              + {item}
            </button>
          ))}
        </div>
      </div>

      {/* Scan button */}
      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleScan}
          disabled={ingredients.every((i) => !i.trim()) || isScanning}
          className="w-full max-w-md"
        >
          {isScanning ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Scan className="mr-2 h-5 w-5" />
              Scan My Ingredients
            </>
          )}
        </Button>
      </div>
    </div>
  );
}