// ─── Dashboard Layout ──────────────────────────────────
// Shared layout for all dashboard pages

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Home, Grid3X3, Scan, History, CreditCard, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/pantry", label: "My Pantry", icon: Grid3X3 },
  { href: "/dashboard/scan", label: "Scan", icon: Scan },
  { href: "/dashboard/history", label: "History", icon: History },
  { href: "/dashboard/subscription", label: "Subscription", icon: CreditCard },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-white via-brand-50/20 to-moon-50/10">
      {/* Sidebar (desktop) */}
      <aside className="hidden w-64 flex-col border-r border-border bg-white/60 backdrop-blur-sm lg:flex">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <Leaf className="h-6 w-6 text-brand-600" />
          <span className="font-display text-lg font-bold">HerbaAI</span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand-100 text-brand-800"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent"
          >
            <LogOut className="h-4 w-4" />
            Home
          </Link>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-white/80 px-4 backdrop-blur-sm lg:px-8">
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
          <div className="flex items-center gap-2 lg:hidden">
            <Leaf className="h-5 w-5 text-brand-600" />
            <span className="font-display text-base font-bold">HerbaAI</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Free Plan</span>
          </div>
        </header>

        {/* Mobile nav overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-black/20 lg:hidden" onClick={() => setMobileOpen(false)}>
            <div
              className="w-64 bg-white p-4 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center gap-2 px-2">
                <Leaf className="h-6 w-6 text-brand-600" />
                <span className="font-display text-lg font-bold">HerbaAI</span>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-brand-100 text-brand-800"
                          : "text-muted-foreground hover:bg-accent"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}