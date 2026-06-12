# DevKit

A personal AI platform I've been building to replace the dozen browser tabs I used to have open — ChatGPT, GitHub, Notion, and random tools scattered everywhere. Everything's in one place now.

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-0F172A?style=flat-square&logo=tailwindcss)

---

## What it does

**AI Chat** — Conversations with memory. Each session is stored in a local SQLite DB so context carries over across reloads.

**AI Tools** — Pre-built prompts for things I actually use: LinkedIn posts, code generators, SEO content, YouTube scripts, resume bullets. One click, done.

**Knowledge Hub** — Upload PDFs and docs. The platform indexes them and lets you query against your own content through the chat interface.

**RepoMind** — Point it at a GitHub repo and it generates a Mermaid architecture map of the codebase, runs a basic security scan, and gives you a file-level breakdown. Useful before touching an unfamiliar project.

**Prompts Library** — Save and reuse prompts across sessions. Stops me from retyping the same system instructions every time.

**Team & Billing** — Multi-user workspace support with Stripe subscription tracking built in.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16, App Router, Turbopack |
| Database | SQLite via Prisma ORM |
| Styling | Tailwind CSS + shadcn/ui |
| AI | Vercel AI SDK + Google Gemini |
| State | Zustand + TanStack Query |
| Auth | Mock Clerk (swap-ready for production) |

---

## Running locally

```bash
# 1. Install
cd web
npm install

# 2. Set up your .env
DATABASE_URL="file:./dev.db"
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000

# 3. Push DB schema + seed demo data
npx prisma db push
node seed.mjs

# 4. Start
npm run dev
```

Open `http://localhost:3000`. That's it.

---

## Auth & demo mode

Auth is mocked out using a local Clerk wrapper at `src/lib/mock-clerk.tsx`. It simulates a signed-in session with `demo-user-id` so you can run everything without setting up Clerk.

To switch to real auth:
1. Add your actual Clerk keys to `.env`
2. Replace `@/lib/mock-clerk` imports with `@clerk/nextjs` and `@clerk/nextjs/server`

---

## Project layout

```
web/
├── src/
│   ├── app/
│   │   ├── (marketing)/     # Landing page, features, pricing
│   │   ├── (dashboard)/     # All app pages behind auth
│   │   └── api/             # AI chat endpoint
│   ├── components/
│   │   ├── chat/            # Sidebar, ChatWindow, ChatList
│   │   └── marketing/       # Navbar, Hero, Features, Footer
│   ├── actions/             # Server actions (chat, knowledge)
│   └── lib/                 # Utilities, mock-clerk, db client
├── prisma/
│   └── schema.prisma
└── .env
```

---

Built with Next.js 16 + Turbopack. Runs entirely offline once set up.
