<div align="center">
  <img src="public/trace-logo-dark.svg" alt="Trace Logo" width="180" />
  <h1>Trace — Every Choice Leaves a Trace</h1>
  <p>An AI-powered carbon footprint tracker that makes sustainable living measurable, rewarding, and social.</p>
  <br/>
  <img src="https://img.shields.io/badge/Next.js-16.2.7-black?logo=next.js" />
  <img src="https://img.shields.io/badge/Supabase-Backend-green?logo=supabase" />
  <img src="https://img.shields.io/badge/Gemini-AI-blue?logo=google" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss" />
</div>

---

## Overview

**Trace** is a full-stack sustainability platform that helps individuals understand, reduce, and take action on their carbon footprint. It combines AI-powered activity logging, smart document scanning, community accountability, and personalized behavioral insights into one elegant, cohesive experience.

Built for **PromptWars** — a competition demonstrating the highest-quality AI-assisted software engineering.

---

## Features

### 🌿 Carbon Logging
- Log individual activities (transport, food, energy, shopping)
- Automatic CO₂ calculation per category
- Real-time dashboard with impact visualization
- Supabase-backed persistence across devices

### 🔍 AI Smart Scan
- Upload electricity bills, shopping receipts, and travel documents
- Gemini Vision OCR extracts items and quantities automatically
- Translates real-world documents into carbon impact scores

### 🧠 AI Insights Engine
- Personalized morning briefings powered by Gemini
- Commitment tracking ("Commit to this goal")
- Weekly impact trend analysis
- Actionable next steps per user

### 🏆 Achievements & Streaks
- Unlock achievements for milestones (first log, 7-day streak, etc.)
- Daily streak counter backed by database RPC
- Sustainability score (0–100) tracked per user

### 👥 Community Feed
- Activity feed showing what others are doing
- Kudos system for cheering each other on
- Global leaderboard
- Challenges to participate in together

### 👤 Profile & Progress
- Full profile page with streak, score, and recent activity
- Achievement showcase
- Sign out with full session invalidation

### 🌐 Landing Page
- Cinematic animated landing page
- Bento grid feature showcase
- 3D Earth canvas
- Video backgrounds

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.7 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui + Radix UI |
| Animation | Framer Motion, GSAP, Lenis |
| 3D | Three.js + React Three Fiber |
| Backend | Supabase (PostgreSQL + Auth + RLS) |
| AI | Google Gemini 1.5 Flash |
| Deployment | Vercel |

---

## Prerequisites

- Node.js 18+ (tested on v20)
- npm 10+
- A [Supabase](https://supabase.com) project
- A [Google Gemini API Key](https://aistudio.google.com)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/trace.git
cd trace
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your values (see [Environment Variables](#environment-variables)).

### 4. Apply Database Migrations

Ensure the Supabase CLI is authenticated:

```bash
npx supabase login
npx supabase link --project-ref <your-project-ref>
npx supabase db push
```

### 5. Run Locally

```bash
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Copy `.env.example` to `.env.local` and populate:

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous (public) API key | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) | ✅ |
| `GEMINI_API_KEY` | Google Gemini API key for AI features | ✅ |
| `NEXT_PUBLIC_APP_URL` | Your app's public URL | ✅ |
| `NEXT_PUBLIC_APP_NAME` | Display name (default: Trace) | ✅ |

---

## Database Schema

Trace uses the following Supabase tables:

- `profiles` — User profile, streak, sustainability score
- `carbon_logs` — Individual activity logs with CO₂ values
- `achievements` — Achievement definitions
- `commitments` — Goals committed to by users
- `kudos` — Community encouragement system
- `leaderboard` — Cross-user ranking data

Migration files are in `supabase/migrations/`.

---

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Add all environment variables in Vercel's project settings.
4. Deploy. Vercel auto-detects Next.js and configures the build.

Alternatively, use the Vercel CLI:

```bash
npx vercel --prod
```

---

## Screenshots

> Screenshots are taken from the live app.

| Landing Page | Dashboard | Insights |
|---|---|---|
| ![Landing](public/og-image.png) | *See /dashboard* | *See /insights* |

---

## Application Routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/login` | Authentication |
| `/signup` | Registration |
| `/onboarding` | First-time setup wizard |
| `/dashboard` | Main activity dashboard |
| `/log` | Log carbon activities |
| `/upload` | AI Smart Scan for bills/receipts |
| `/insights` | Personalized AI insights |
| `/profile` | User profile and achievements |
| `/community` | Community feed and leaderboard |
| `/habits` | Habit tracking |
| `/achievements` | Badge collection |
| `/report` | Carbon reports |

---

## PromptWars Submission

Trace was built as a PromptWars submission demonstrating:

- **AI-assisted development** using Gemini API
- **Production-grade architecture** with Next.js App Router and Supabase
- **Complete vertical integration**: landing page → onboarding → dashboard → insights → community
- **Real database persistence** with Row Level Security
- **Secure API routes** with Zod validation and rate limiting

---

## License

MIT © Yashraj Kuyate
