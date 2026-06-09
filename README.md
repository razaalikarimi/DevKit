# 🌌 Aura AI - Next-Generation AI SaaS Platform

Aura AI is a premium, enterprise-grade SaaS platform designed to streamline AI workflows, generate high-converting content, manage knowledge bases, map code repository architectures, and optimize developer prompts.

---

## ✨ Key Features

- **🚀 Overview Dashboard**: Keep track of token usage, active chat sessions, system health, storage, and recent platform logs.
- **⚡ AI Tools Marketplace**: Access specialized tools like LinkedIn Post Creators, AI Code Generators, YouTube Script Writers, SEO Optimizers, Resume Builders, and Image Prompt Generators.
- **📂 Knowledge Base**: Upload files (PDFs, docs) to construct an intelligent context-aware knowledge base.
- **🌿 RepoMind AI**: Link GitHub/local repositories to index files, visualize code layouts through **Mermaid architecture maps**, and perform security checks.
- **⭐ Prompt Engineering**: Save, manage, and share reusable prompts templates.
- **👥 Workspace & Team Management**: Collaboration capabilities built directly into workspaces.
- **💳 Billing & Subscription**: Stripe subscription tier tracking.

---

## 🛠️ Technology Stack

- **Framework**: Next.js (App Router, Turbopack enabled)
- **Database**: SQLite (Local database, powered by Prisma ORM)
- **Styling & UI**: Tailwind CSS, shadcn/ui, Framer Motion, Lucide icons
- **State & Data Fetching**: Zustand, TanStack React Query
- **AI Integrations**: Vercel AI SDK, Google Gemini / OpenAI (optional)
- **Authentication**: Localized Mock Clerk Wrapper (for seamless offline-first experience)

---

## 🚀 Getting Started

Follow these steps to run the application locally on your machine.

### 1. Install Dependencies

Navigate to the `web/` directory and install the required packages:
```bash
cd web
npm install
```

### 2. Configure Environment Variables

Create or update your `.env` file inside the `web/` directory:
```env
# Database (SQLite)
DATABASE_URL="file:./dev.db"

# Authentication (Mock credentials are used by default)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bHVja3ktbW91c2UtMTIuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_53423789423984723894723894723894

# AI Credentials (Optional: add your key to enable live AI responses)
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key_here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Database Migrations & Seeding

Sync the Prisma schema to compile the SQLite database, and run the seed script to create initial mockup data:
```bash
npx prisma db push
node seed.mjs
```

### 4. Run Development Server

Start the local server using:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.

---

## 🔒 Authentication & Demo Mode

To allow a fast, configuration-free demo experience, the project features a **mocked Clerk auth module** located at [mock-clerk.tsx](file:///e:/Try%20Project/AI%20SaaS%20platform/web/src/lib/mock-clerk.tsx).

- **How it works**: Client-side components and server-side operations are resolved locally using a simulated user session with the ID `demo-user-id`.
- **To switch to production Clerk**:
  1. Set your actual Clerk `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` in `.env`.
  2. Change references in the codebase from `@/lib/mock-clerk` back to `@clerk/nextjs` and `@clerk/nextjs/server`.
