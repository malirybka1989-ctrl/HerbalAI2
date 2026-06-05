import { Providers } from "./providers";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HerbaAI — Your Wellness Companion",
    template: "%s | HerbaAI",
  },
  description:
    "Turn what you already have at home into personalized holistic wellness rituals. HerbaAI combines Traditional Chinese Medicine, astrology, folk wisdom, and more.",
  keywords: [
    "wellness", "herbal", "traditional chinese medicine", "ayurveda",
    "holistic health", "natural remedies",
  ],
  openGraph: {
    title: "HerbaAI — Your Wellness Companion",
    description: "Turn pantry ingredients into personalized wellness rituals. AI-powered holistic guidance.",
    url: "https://herbaai.com",
    siteName: "HerbaAI",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-gradient-to-b from-white via-brand-50/30 to-moon-50/20 font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}