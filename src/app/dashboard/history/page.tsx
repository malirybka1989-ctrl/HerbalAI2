// ─── Dashboard History ─────────────────────────────────
// Past scan results

"use client";

import { useState, useEffect } from "react";
import { Clock, Scan, ChevronRight } from "lucide-react";
import Link from "next/link";

interface ScanItem {
  id: string;
  ingredientsUsed: string[];
  ritualGenerated: boolean;
  createdAt: string;
}

export default function HistoryPage() {
  const [scans, setScans] = useState<ScanItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pantry/scans")
      .then((res) => res.json())
      .then((data) => setScans(data.scans || []))
      .catch(() => setScans([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Scan History</h1>
        <p className="mt-1 text-muted-foreground">
          Your past pantry scans and wellness rituals.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
        </div>
      ) : scans.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-16 text-center">
          <Clock className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 font-display text-xl font-semibold">No scans yet</h3>
          <p className="mt-2 text-muted-foreground">
            Your first scan will appear here. Start by scanning your pantry!
          </p>
          <Link
            href="/dashboard/scan"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-medium text-white hover:bg-brand-700"
          >
            <Scan className="h-4 w-4" />
            Scan Now
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {scans.map((scan) => (
            <div
              key={scan.id}
              className="flex items-center justify-between rounded-2xl border border-border bg-white p-5 transition-all hover:shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-brand-100 p-3">
                  <Scan className="h-5 w-5 text-brand-600" />
                </div>
                <div>
                  <div className="flex flex-wrap gap-1.5">
                    {((scan.ingredientsUsed as string[]) || []).map(
                      (ing: string) => (
                        <span
                          key={ing}
                          className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700"
                        >
                          {ing}
                        </span>
                      )
                    )}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {new Date(scan.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}