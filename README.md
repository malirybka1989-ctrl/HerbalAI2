# HerbaAI — AI Wellness Companion

Turn what you already have at home into personalized holistic wellness rituals.

Combines Traditional Chinese Medicine, astrology, shamanism, meditation, acupressure, and folk wisdom into one intelligent AI assistant.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Auth**: NextAuth.js
- **Payments**: Stripe
- **AI**: OpenAI / Claude (LLM)

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and API keys

# Run database migrations
npx prisma migrate dev --name init

# Seed the ingredient database
npm run db:seed

# Start development server
npm run dev
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/                # API routes
│   ├── auth/               # Auth pages
│   ├── dashboard/          # User dashboard
│   ├── scan/               # Pantry scan feature
│   └── layout.tsx          # Root layout
├── components/             # Shared components
│   └── ui/                 # Base UI components
└── lib/                    # Utilities
    ├── prisma.ts           # Prisma client
    ├── auth.ts             # NextAuth config
    └── utils.ts            # Helper functions
prisma/
├── schema.prisma           # Database schema
└── seed.ts                 # Ingredient seeder
data/
└── sample_ingredients.json # Sample ingredient data
design/
├── AI_ENGINE.md            # AI engine design
├── GUARDRAILS.md           # Compliance guardrails
└── INGREDIENT_SCHEMA.md    # Ingredient schema
```

## Features

- **Pantry Scan**: AI-powered analysis of your ingredients
- **Wellness Rituals**: Personalized recommendations from multiple traditions
- **Consultations**: Book 1:1 with practitioners
- **Courses**: Digital learning library
- **Subscription**: Monthly/yearly plans via Stripe