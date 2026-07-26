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

- React Native 0.86, React 19.2, TypeScript 5
- Navigation: React Navigation v7 (native-stack + bottom-tabs)
- State: Redux Toolkit + redux-persist (AsyncStorage)
- Auth: `@react-native-google-signin/google-signin` (Google Sign-In)
- Forms: react-hook-form + yup validation
- HTTP: Axios with interceptors (auto token refresh, 401 queue)
- Maps: react-native-maps + Google Places API
- Styling: Theme system (light/dark) via AppProvider context

## Architecture

### Source Layout (`src/`)

- `components/core/` — Reusable UI primitives (Button, Input, Typography, Modal, Card, DatePicker, SelectPicker, etc.) and the `AppProvider` theme context
- `components/{Profile,Toast}Provider/` — Context-based providers wrapping specific feature logic
- `screens/` — Screen components; complex screens use a folder with `index.tsx`
- `services/` — API layer; each domain has its own file, all use the shared Axios instance from `common.ts`
- `redux/reducers/` — Redux Toolkit slices (auth, profile, wedding, event, guest, vendor, giftInfo, rsvp, wish, template)
- `redux/store/` — Store config with persisted reducers and `resetAppState()` for logout
- `hooks/` — Custom hooks: `useAppDispatch`, `useAppSelector`, `useAppNavigation`, `useTheme`, `useToast`
- `utils/` — Utility functions (`cleanAddress`, `capitalizeFirstText`, `getHiddenText`)
- `constants/` — Theme colors (Tailwind-like palette), spacing, radius, and typography definitions
- `types/` — TypeScript interfaces for all domains and navigation params
- `config/` — Environment config (reads from `@env`)
- `RootNavigator/` — Navigation setup: `AuthStack` (Login) and `AppStack` (Home, MyWedding, WeddingDetail, WeddingForm, ManageGuest, EventForm, LocationPicker, GiftInfoForm, Template, RsvpList, WishList, Profile)

### Key Patterns

- **Auth flow**: Google Sign-In via `@react-native-google-signin/google-signin`; `GoogleSignin.configure()` called at module level in `App.tsx` with `webClientId`; Login screen calls `GoogleSignin.signIn()` → sends `idToken` to `POST /api/user/google-sign-in` → backend verifies with `google-auth-library`, finds/creates user by `googleId`/`email`, returns JWT pair → `loginSuccess` dispatch. `RootNavigator` renders `AuthStack` or `AppStack` based on `isAuthenticated` from Redux auth state
- **API layer** (`services/common.ts`): Axios interceptors handle Bearer token injection, automatic 401 token refresh with request queuing, and full logout on refresh failure
- **Token management**: In-memory `tokenService` synced with Redux on app startup via `syncTokensFromStore()`
- **Redux persistence**: Each slice uses `redux-persist` with AsyncStorage; auth persists tokens, profile persists user data
- **Theme**: `AppProvider` detects system appearance and provides light/dark colors via `useTheme()` hook; colors use semantic keys like `bg-app`, `text-primary`, `primary-bg`
- **Screen pattern**: Screens use `ScreenLayout` wrapper (handles header, scroll, keyboard avoidance, safe areas), connect to Redux via typed hooks, use `react-hook-form` for forms with `yup` schemas. `ScreenLayout` renders children directly inside ScrollView's `contentContainerStyle` (no inner wrapper View) so content scrolls properly when keyboard opens
- **Splash screen**: `react-native-bootsplash` with native `BootTheme` on MainActivity; supports light/dark via `values/colors.xml` and `values-night/colors.xml`; hidden with fade after auth state loads
- **Location picker**: Full-screen `LocationPicker` screen with MapView, overlay search bar, reverse geocoding, and bottom card; returns data to calling screen via `CommonActions.reset` with merged params
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
- `SPA_URL` — Web SPA URL for invitation links
- `GOOGLE_WEB_CLIENT_ID` — Google OAuth Web Client ID (from Google Cloud Console; same value as backend `GOOGLE_CLIENT_ID`)
- `CLEARTEXT_HOSTS` — Comma-separated list of domains/IPs to allow cleartext HTTP in release builds (e.g. `192.168.1.214,10.0.2.2,localhost`). Empty = HTTPS only. Generated into `network_security_config.xml` by Gradle at build time. Debug builds allow all cleartext regardless.

## Backend Reference

The backend lives in a separate repo: `https://github.com/ekomardiatno/emvite-node.git`

- **Stack**: Express.js v5, TypeScript, PostgreSQL + Sequelize ORM
- **Base URL**: Configured via `API_URL` env var (default `http://localhost:5001/api`)
- **Auth**: Google Sign-In; backend verifies Google ID tokens via `google-auth-library`, issues JWT access + refresh token pair. Users are identified by `email`/`googleId` (no passwords)
- **API response wrapper**: `{ success: boolean, data: any, message?: string }`; the mobile Axios interceptor unwraps `data` and `message` from this
- **Validation**: Zod schemas; errors returned as `{ field, message }[]`
- **File serving**: `GET /api/file?filePath=<path>` streams uploaded images
- **Key endpoints used by this app**:
  - `POST /api/user/google-sign-in`, `GET /api/user/find-my-profile`
  - `POST /api/token/refresh`
  - `POST /api/wedding/create`, `GET /api/wedding/my-list`, `POST /api/wedding/update/:id`
  - CRUD for `/api/guest`, `/api/event`, `/api/gift-info`, `/api/vendor`, `/api/wish`, `/api/rsvp`
  - `/api/template` (list/create/update)
  - `/api/public/wedding/invitation/:id`, `/api/public/wedding/guest/:guestId`, `GET /api/public/templates`
  - `/api/google/search-places`
- **Backend env**: Requires `GOOGLE_CLIENT_ID` (same Web Client ID used by frontend)
- **Local JWT for testing**: `node -e "console.log(require('jsonwebtoken').sign({name:'Test',email:'your@gmail.com',loginAt:new Date()},'jwtsecret',{expiresIn:'1d'}))"`

## Versioning

Version is managed in `package.json` only. The Android `build.gradle` reads it automatically:
- `versionName` = `package.json` version string
- `versionCode` = `major * 10000 + minor * 100 + patch` (e.g. `1.2.5` → `10205`)

## CI/CD

GitHub Actions workflow (`.github/workflows/android-release.yml`) triggers when a GitHub Release is published. Validates tag matches `package.json` version, builds AAB + APK with ProGuard, and uploads artifacts to the existing release.

### Deploying

1. Bump version: `npm version patch --no-git-tag-version`
2. Commit and push the version bump
3. Create a GitHub release: `gh release create v<version> --title "v<version>" --notes "..."`
4. The CI workflow builds and attaches APK/AAB artifacts to the release

## Related Repos

- **Backend**: `https://github.com/ekomardiatno/emvite-node.git` — Express.js API server consumed by this app
- **SPA**: `https://github.com/ekomardiatno/ekomardiatno.github.io.git` — React SPA for rendering wedding invitation templates (guest-facing)
