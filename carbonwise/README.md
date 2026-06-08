<div align="center">
  <img src="./public/logo-light.png" alt="Trace Logo" width="300" />
  <h1>Trace</h1>
  <p><b>Every choice leaves a trace.</b></p>
  <p>AI-powered environmental intelligence platform that helps individuals understand, track, and reduce their carbon footprint through immersive storytelling, AI coaching, and intelligent environmental insights.</p>

  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-Auth_&_DB-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
  [![Google Gemini](https://img.shields.io/badge/Gemini-AI_Coach-4285F4?style=for-the-badge&logo=google)](https://deepmind.google/technologies/gemini/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
  [![GitHub stars](https://img.shields.io/github/stars/Yashraj2050/Trace?style=for-the-badge)](https://github.com/Yashraj2050/Trace/stargazers)
</div>

---

## 🔗 Live Demo
- **Production URL:** [trace-app.vercel.app](#) *(Placeholder)*
- **Demo Video:** [Watch on YouTube](#) *(Placeholder)*
- **LinkedIn Showcase:** [View Post](#) *(Placeholder)*

---

## 🌍 Introduction

**The Problem**
Traditional carbon tracking tools fail because they feel like tedious accounting software. They present users with overwhelming spreadsheets, dry statistics, and generic advice that lacks personal relevance. This friction prevents meaningful, long-term behavior change.

**The Solution: Trace**
Trace reimagines environmental responsibility as a compelling, premium experience. Positioned as a cutting-edge environmental intelligence platform rather than a simple calculator, Trace leverages Google Gemini AI, advanced OCR, and immersive 3D web technologies to make carbon tracking intuitive, engaging, and highly personalized. By combining intelligent receipt analysis with cinematic storytelling, Trace provides users with real-time, context-aware coaching that transforms overwhelming climate anxiety into actionable, everyday empowerment.

---

## ✨ Why Trace?

Trace completely breaks the mold of traditional sustainability tools by delivering a premium, engaging user experience:

- 🎬 **Cinematic Storytelling:** Immersive 3D environments (React Three Fiber) that make environmental impact visually stunning and emotionally resonant.
- 🧠 **AI-Powered Guidance:** A Gemini-powered AI Coach that understands your unique lifestyle and provides context-aware, achievable recommendations.
- 📄 **Intelligent OCR Extraction:** Simply upload a utility bill or receipt; our OCR engine automatically extracts usage data and calculates your exact footprint.
- 📊 **Interactive Visualizations:** A sleek, glassmorphism "Mission Control" dashboard that brings your data to life.
- 🎯 **Personalized Recommendations:** Actionable insights tailored specifically to your habits, maximizing your personal impact.
- 💎 **Premium User Experience:** Modern, frictionless UI design focused on conversion and retention.

---

## 📸 Feature Showcase

| Feature | Description | Screenshot |
|---|---|---|
| **Immersive Hero** | Cinematic 3D Earth UI providing an interactive landing experience. | !["Hero"](./screenshots/hero.png) |
| **Sleek HUD Dashboard** | A transparent, glassmorphism "Mission Control" interface for high-level analytics. | !["Dashboard"](./screenshots/dashboard.png) |
| **Smart AI Coach** | Google Gemini-powered environmental advice and lifestyle coaching. | !["AI Coach"](./screenshots/coach.png) |
| **OCR Bill Scanner** | Instant carbon calculation from uploaded utility bills and receipts. | !["OCR Scanner"](./screenshots/ocr.png) |
| **Carbon Calculator** | Intuitive, interactive tools to log daily transport, energy, and food footprint. | !["Calculator"](./screenshots/calculator.png) |
| **Dynamic PDF Reports** | Download branded, professional monthly footprint analyses. | !["PDF Report"](./screenshots/report.png) |

---

## 🏗 Architecture

Trace is built on a scalable, production-grade modern stack.

### Tech Stack
- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, Framer Motion, GSAP, React Three Fiber
- **Backend:** Supabase Auth, PostgreSQL, Row Level Security (RLS)
- **AI Layer:** Gemini AI Coach, Gemini OCR Processing
- **Infrastructure:** Vercel Edge Delivery

### Architecture Diagram

```mermaid
graph TD
    Client[Next.js Frontend\nReact Three Fiber, Tailwind, Framer] -->|Next.js Server Actions| Server[Next.js API Routes]
    
    Server -->|Auth & DB Queries| Supabase[(Supabase PostgreSQL\n+ Row Level Security)]
    Server -->|Multimodal Processing| Gemini[Google Gemini AI\nCoach & OCR]
    
    subgraph Infrastructure
    Vercel[Vercel Edge Network] --> Client
    end
```

---

## 🗄 Database Architecture

```mermaid
erDiagram
    PROFILES ||--o{ CARBON_LOGS : "has many"
    PROFILES ||--o{ HABITS : "tracks"
    PROFILES ||--o{ ACHIEVEMENTS : "unlocks"
    PROFILES ||--o{ REPORTS : "generates"
    PROFILES ||--|| LEADERBOARD : "ranks on"
    
    PROFILES {
        uuid id PK
        string email
        string display_name
        int total_points
        timestamp created_at
    }
    
    CARBON_LOGS {
        uuid id PK
        uuid user_id FK
        string category
        float co2_amount
        string source_type
        timestamp logged_at
    }
    
    HABITS {
        uuid id PK
        uuid user_id FK
        string habit_name
        int streak_days
        boolean active
    }
    
    ACHIEVEMENTS {
        uuid id PK
        uuid user_id FK
        string badge_name
        timestamp unlocked_at
    }
    
    LEADERBOARD {
        uuid user_id PK
        int rank
        int weekly_points
    }
```

---

## 🧠 AI Workflow

How Trace translates user data into actionable environmental intelligence:

```mermaid
flowchart LR
    A[User Action / Upload] --> B[Gemini OCR Processing]
    B --> C[Carbon Footprint Analysis]
    C --> D[AI Contextual Interpretation]
    D --> E[Personalized Recommendations]
    E --> F[Dashboard Insights Update]
```

---

## ⚡ Performance Optimization

Trace is engineered for blazing-fast performance without compromising visual fidelity:
- **Responsive Design & Mobile Optimization:** Fluid layouts that adapt beautifully to any device.
- **Lazy Loading & Suspense:** Strategic code-splitting ensures instant initial page loads.
- **Three.js Performance:** Optimized geometry, compressed textures, and efficient render loops for smooth 60fps 3D graphics.
- **Error Boundaries:** Robust client-side error handling prevents total application crashes.
- **SEO Implementation:** Next.js metadata API utilization for strong search engine visibility.

---

## 🛡 Security Posture

Production-grade security is baked in from day one:
- **Authentication:** Powered by Supabase Auth with secure JWT session management.
- **Row Level Security (RLS):** Strict PostgreSQL policies ensure users can only access their own data.
- **Environment Protection:** Rigorous separation of client and server secrets.
- **Secure API Routes:** Server-side validation of all Gemini AI and database requests.

---

## 🏆 PromptWars 2026 Submission

**Challenge:** Carbon Footprint Awareness Platform

**Objective:** Help individuals understand, track, and reduce their carbon footprint through simple actions and personalized insights.

**How Trace Fulfills the Challenge:**
Trace goes beyond basic data entry by incorporating multimodal AI (Gemini OCR) for frictionless logging, and generative AI for personalized coaching. The premium, cinematic UI keeps users engaged, effectively turning sustainability from an obligation into an interactive journey. Trace hits every requirement of the prompt while elevating the UX to startup-grade standards.

---

## 🚀 Future Roadmap

- **Q3 2026:** Advanced Carbon Forecasting & Predictive AI Models
- **Q4 2026:** Team & Enterprise Sustainability Challenges
- **Q1 2027:** Social Community Impact Metrics & Leaderboards
- **Q2 2027:** React Native Mobile App Release
