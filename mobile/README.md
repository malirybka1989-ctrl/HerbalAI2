# HerbaAI — Mobile App

React Native (Expo) mobile application for the HerbaAI wellness companion.

## Tech Stack

- **Framework**: React Native (Expo SDK 52)
- **Language**: TypeScript
- **Navigation**: React Navigation (native stack + bottom tabs)
- **State**: React hooks + AsyncStorage
- **Payments**: Stripe SDK
- **Notifications**: Expo Notifications
- **API**: RESTful (coordinates with Node.js backend)

## Getting Started

```bash
# Install dependencies
cd mobile
npm install

# Start the Expo dev server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

## Screen Flow

```
Onboarding → Auth → MainTabs (Home | Pantry | Explore | Profile)
                                          ↓
                                    PantryScan → ScanResults
```

## Brand Theme

- **Primary**: Sage Green (#8A9A5B)
- **Accent**: Soft Terracotta (#E2725B)
- **Background**: Cream (#F5F5DC)
- **Typography**: Cormorant Garamond (headlines), Inter (body)
- **Icon**: emoji-based for MVP phase (will be replaced with custom icons)

## Project Structure

```
mobile/
├── App.tsx                  # Entry point
├── src/
│   ├── navigation/          # React Navigation config
│   │   └── AppNavigator.tsx
│   ├── screens/             # Screen components
│   │   ├── OnboardingScreen.tsx
│   │   ├── AuthScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── PantryScreen.tsx
│   │   ├── PantryScanScreen.tsx
│   │   ├── ScanResultsScreen.tsx
│   │   ├── ExploreScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── theme/               # Design tokens
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── spacing.ts
│   ├── services/            # API client
│   │   └── api.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── constants/           # App constants
│   │   └── api.ts
│   ├── components/          # Reusable UI components
│   └── hooks/               # Custom hooks
├── app.json                 # Expo config
├── package.json
└── tsconfig.json
```

## API Integration

The app connects to the backend API at the URL specified by `EXPO_PUBLIC_API_URL` (default: `http://localhost:3000/api`).

Endpoints are organized by domain:
- `/api/auth/*` — Authentication
- `/api/pantry/*` — Pantry management + scan
- `/api/suggestions/*` — Wellness suggestions
- `/api/subscription/*` — Stripe subscription management
- `/api/practitioners/*` — Practitioner directory
- `/api/consultations/*` — Booking system
- `/api/courses/*` — Course library

## Development

1. Create a feature branch from `develop`
2. Make changes
3. Open a PR to `develop`
4. Lead reviews and merges

## Compliance

Every wellness suggestion screen must display the standard disclaimer:
> This content is for informational and educational purposes only. It is not medical advice, diagnosis, or treatment. HerbaAI does not diagnose, cure, mitigate, treat, or prevent any disease. Always consult a qualified healthcare provider.