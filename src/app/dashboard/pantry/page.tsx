// ─── Dashboard Pantry ─────────────────────────────────
// My ingredients list with add/remove

"use client";

import { useState } from "react";
import { Plus, X, Search, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const COMMON_INGREDIENTS = [
  "Ginger", "Turmeric", "Cinnamon", "Peppermint", "Chamomile",
  "Honey", "Lemon", "Garlic", "Rosemary", "Thyme",
  "Lavender", "Eucalyptus", "Clove", "Cardamom", "Fennel",
  "Nettle", "Dandelion", "Echinacea", "Elderberry", "Sage",
];

export default function PantryPage() {
  const [pantryItems, setPantryItems] = useState<string[]>([
    "Ginger",
    "Turmeric",
    "Honey",
    "Lemon",
    "Cinnamon",
  ]);
  const [search, setSearch] = useState("");

  const filteredCommon = COMMON_INGREDIENTS.filter(
    (i) =>
      i.toLowerCase().includes(search.toLowerCase()) &&
      !pantryItems.includes(i)
  );

  const addItem = (item: string) => {
    if (!pantryItems.includes(item)) {
      setPantryItems([...pantryItems, item]);
    }
    setSearch("");
  };

  const removeItem = (item: string) => {
    setPantryItems(pantryItems.filter((i) => i !== item));
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">My Pantry</h1>
        <p className="mt-1 text-muted-foreground">
          Your personal ingredient collection. Add ingredients you have at home.
        </p>
      </div>

      {/* Search/add ingredients */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search ingredients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-border bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      {/* Current pantry */}
      <div>
        <h2 className="font-display text-xl font-semibold">
          Your Ingredients ({pantryItems.length})
        </h2>
        {pantryItems.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-border p-12 text-center">
            <Package className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-3 text-muted-foreground">
              Your pantry is empty. Add ingredients above!
            </p>
          </div>
        ) : (
          <div className="mt-4 flex flex-wrap gap-2">
            {pantryItems.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-800"
              >
                {item}
                <button
                  onClick={() => removeItem(item)}
                  className="rounded-full p-0.5 text-brand-400 hover:bg-brand-200 hover:text-brand-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Quick add suggestions */}
      {search && filteredCommon.length > 0 && (
        <div>
          <h2 className="font-display text-xl font-semibold">Suggestions</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {filteredCommon.map((item) => (
              <button
                key={item}
                onClick={() => addItem(item)}
                className="inline-flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                <Plus className="h-3 w-3" />
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Common ingredients */}
      {!search && (
        <div>
          <h2 className="font-display text-xl font-semibold">
            Common Ingredients
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Click to add common ingredients to your pantry.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {COMMON_INGREDIENTS.filter((i) => !pantryItems.includes(i)).map(
              (item) => (
                <button
                  key={item}
                  onClick={() => addItem(item)}
                  className="inline-flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-brand-300 hover:text-brand-700"
                >
                  <Plus className="h-3 w-3" />
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button>Save Pantry</Button>
      </div>
    </div>
  );
}