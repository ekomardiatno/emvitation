# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EMVITE — a React Native mobile app for creating and managing wedding invitations. Supports guest management, RSVP tracking, event scheduling, gift registries, wish lists, and QR-code-based invitation sharing.

## Commands

```bash
npm start                # Start Metro bundler (with --reset-cache)
npm run android          # Run on Android device/emulator
npm run android:release  # Run Android release build
npm run ios              # Run on iOS simulator
npm run ios:release      # Run iOS release build
npm run lint             # ESLint check
npm test                 # Run Jest tests
npm run android:aab      # Build Android AAB (release)
npm run android:apk      # Build Android APK (release)
npm run pod:ios          # Install iOS CocoaPods
npm run assets           # Link native assets (fonts/images)
```

## Tech Stack

- React Native 0.79, React 19, TypeScript 5
- Navigation: React Navigation v7 (native-stack + bottom-tabs)
- State: Redux Toolkit + redux-persist (AsyncStorage)
- Forms: react-hook-form + yup validation
- HTTP: Axios with interceptors (auto token refresh, 401 queue)
- Maps: react-native-maps + Google Places API
- Styling: Theme system (light/dark) via AppProvider context

## Architecture

### Source Layout (`src/`)

- `components/core/` — Reusable UI primitives (Button, Input, Typography, Modal, Card, DatePicker, SelectPicker, etc.) and the `AppProvider` theme context
- `components/{Otp,Profile,Toast}Provider/` — Context-based providers wrapping specific feature logic
- `screens/` — Screen components; complex screens use a folder with `index.tsx`
- `services/` — API layer; each domain has its own file, all use the shared Axios instance from `common.ts`
- `redux/reducers/` — Redux Toolkit slices (auth, profile, wedding, event, guest, vendor, giftInfo, rsvp, wish, template)
- `redux/store/` — Store config with persisted reducers and `resetAppState()` for logout
- `hooks/` — Custom hooks: `useAppDispatch`, `useAppSelector`, `useAppNavigation`, `useTheme`, `useToast`, `useOtp`, `useWindowHeightOnKeyboard`
- `constants/` — Theme colors (Tailwind-like palette), spacing, radius, and typography definitions
- `types/` — TypeScript interfaces for all domains and navigation params
- `config/` — Environment config (reads from `@env`)
- `RootNavigator/` — Navigation setup: `AuthStack` (Login, Registration, AccountRecovery, ResetPassword) and `AppStack` (Home, MyWedding, WeddingDetail, WeddingForm, ManageGuest, EventForm, GiftInfoForm, Template, RsvpList, WishList, Profile, ChangePassword)

### Key Patterns

- **Auth flow**: `RootNavigator` renders `AuthStack` or `AppStack` based on `isAuthenticated` from Redux auth state
- **API layer** (`services/common.ts`): Axios interceptors handle Bearer token injection, automatic 401 token refresh with request queuing, and full logout on refresh failure
- **Token management**: In-memory `tokenService` synced with Redux on app startup via `syncTokensFromStore()`
- **Redux persistence**: Each slice uses `redux-persist` with AsyncStorage; auth persists tokens, profile persists user data
- **Theme**: `AppProvider` detects system appearance and provides light/dark colors via `useTheme()` hook; colors use semantic keys like `bg-app`, `text-primary`, `primary-bg`
- **Screen pattern**: Screens use `ScreenLayout` wrapper, connect to Redux via typed hooks, use `react-hook-form` for forms with `yup` schemas
- **Logout**: `resetAppState()` dispatches reset actions across all 10 slices

## Code Conventions

- Functional components only (no class components)
- Single quotes, trailing commas, no bracket spacing, arrow parens avoided (Prettier config)
- Inline styles are permitted (ESLint rule disabled)
- `StyleSheet.create()` used alongside inline theme-dependent styles
- Environment variables accessed via `import { VAR } from '@env'`
- Date formatting uses `moment` with Indonesian locale
- Navigation types defined in `src/types/navigation-type.ts`

## Environment

Copy `.env.example` to `.env` with these variables:
- `API_URL` — Backend API base URL
- `GOOGLE_MAPS_API_KEY` — Google Maps API key
- `API_NOAUTH_TOKEN` — Token for unauthenticated API calls
- `SPA_URL` — Web SPA URL for invitation links

## Backend Reference

The backend lives in a separate repo: `https://github.com/ekomardiatno/emvite-node.git`

- **Stack**: Express.js v5, TypeScript, PostgreSQL + Sequelize ORM
- **Base URL**: Configured via `API_URL` env var (default `http://localhost:5001/api`)
- **Auth**: JWT Bearer tokens; access token + refresh token pair
- **API response wrapper**: `{ success: boolean, data: any, message?: string }`; the mobile Axios interceptor unwraps `data` and `message` from this
- **Validation**: Zod schemas; errors returned as `{ field, message }[]`
- **File serving**: `GET /api/file?filePath=<path>` streams uploaded images
- **Key endpoints used by this app**:
  - `POST /api/user` (register), `POST /api/user/login`, `GET /api/user/find-my-profile`
  - `POST /api/token/refresh`, `GET /api/token/send-no-auth-token`
  - `POST /api/otp-request` (requires no-auth token)
  - `POST /api/wedding/create`, `GET /api/wedding/my-list`, `POST /api/wedding/update/:id`
  - CRUD for `/api/guest`, `/api/event`, `/api/gift-info`, `/api/vendor`, `/api/wish`, `/api/rsvp`
  - `/api/template` (list/create/update)
  - `/api/public/wedding/invitation/:id`, `/api/public/wedding/guest/:guestId`
  - `/api/google/search-places`

## CI/CD

GitHub Actions workflow (`.github/workflows/android-release.yml`) triggers on `v*.*.*` tags. Validates tag matches `package.json` version, builds AAB + APK with ProGuard, and creates a GitHub Release with artifacts.
