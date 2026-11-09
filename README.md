# Lavish Gamers

Lavish Gamers is a tracker for games, microtransactions, subscriptions, and other gaming expenses. It can also help users compare regional prices by converting them into one currency.

For example, users can compare an item costing EUR 5 in Europe with the same item costing JPY 600(~€3.5) in Japan.

## Live app

https://mobile-applications-project.vercel.app/

## Test account

Account registration is not implemented yet. Use this test account to log in:

```text
Email: testuser@example.com
Password: testing
```

## Target audience

- Players who purchase games or in-game content.
- Players with subscriptions or battle passes.
- Budget-conscious players who want to understand their spending.
- Players who compare prices between regional stores.

## Current version

- Public homepage, spending overview, and game catalogue.
- Search and genre filters.
- Game images from Supabase Storage.
- Supabase authentication and hosted database.
- English and Dutch translations.
- Light and dark themes.
- Installable PWA.

## Roadmap

- [x] Build the homepage, Overview, Games, and Login screens.
- [x] Add the shared game catalogue, search, genres, and images.
- [x] Add Supabase authentication and database security.
- [x] Add translations, themes, and PWA support.
- [ ] Create, edit, and delete purchases.
- [ ] Compare regional prices and currencies.
- [ ] Add real spending statistics and charts.
- [ ] Complete detail screens and mobile releases.

## Competitors

- Steam purchase history: limited to Steam purchases.
- PlayStation and Xbox histories: limited to their own platforms.
- Spendee and Wallet: general expense trackers without gaming-specific statistics, regional price comparisons.

Lavish Gamers focuses on gaming expenses across games, platforms, stores, regions, and currencies.

## Setup

Requirements: Node.js 20 or newer, npm, and Git.

```bash
git clone https://github.com/BryanPaoUCLL/MobileApplicationsProject.git
cd MobileApplicationsProject
npm install
```

Copy the example environment file:

```bash
cp .env.example .env.local
```

On Windows PowerShell, use `Copy-Item .env.example .env.local` instead. Then replace the publishable-key placeholder in `.env.local`:

```env
EXPO_PUBLIC_SUPABASE_URL=https://ifxqlzkptuhewqqfqqng.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Start development mode:

```bash
npx expo start --web --clear
```

Build and test the PWA:

```bash
npx expo export --platform web
npx expo serve
```

## Database

The hosted Supabase database is available at `https://ifxqlzkptuhewqqfqqng.supabase.co`. Database changes are stored in `supabase/migrations`.

## Author

Bryan Pao — Mobile Applications, UCLL
