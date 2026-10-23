# CLAUDE.md — AI Short Video Generator (ShortAI)

This file gives full context for continuing this project. Read it fully before helping.

---

## 1. Who I am and how you should help me (MOST IMPORTANT)

- I'm **Saksham Verma**, a final-year (4th year) B.Tech IT student (GGSIPU, India), preparing for placements as a **Full-Stack / Software Developer**.
- I'm building this project for **two reasons**: to put it honestly on my CV, and to **genuinely learn the skills**. Learning matters more than speed.
- I know **JavaScript, React, Node.js, Express, MongoDB, Tailwind** (from past MERN projects like TalkNest, an Expense Tracker). I **do not know anything technical about AI** yet. I'm new to Next.js App Router, PostgreSQL, Drizzle, Gemini, TTS and Remotion.

### Teaching style I want (keep doing exactly this)
- **Claude does all the work** (changed 2026-10-21; before that I typed the code myself). Create/edit files, install packages, run commands and test things yourself — then **tell me every detail properly**: which files changed, what each command did, and why.
- Things only I can do (signing in to websites, creating API keys, pasting secrets into `.env.local`) — give me exact click-by-click instructions and wait for me.
- **Go slowly, step by step** (added 2026-10-21): do only one small piece of work at a time, then stop and teach it before doing the next piece. Teach **every single line of code** — what it does, what is happening behind the scenes when it runs, and **why** it is needed (what would break without it). Same for every command run and every file changed.
- **Keep messages easy to read** (added 2026-10-23): I found long, dense replies hard to follow. Use short sentences, simple words, small chunks; one idea at a time; avoid huge tables and walls of text. Teach in depth, but spread it over several short messages instead of one giant one.
- Go **one small step at a time**. After each step, give me a checklist of what was done/verified and **wait for me to confirm** ("done") before moving on.
- For every step, explain:
  1. **The concept first** — what it is and **why** we need it, in simple words, with real-life analogies.
  2. **What every new term means** (I'm a beginner in AI/backend concepts).
  3. **Line-by-line explanation** of the code.
  4. Connect new ideas to things I already know (Express → API routes, Mongoose → Drizzle, React Context → ClerkProvider, etc.).
- End each step with **"🎯 Interview questions you can now answer"** (2–4 questions with model answers).
- End each step with the **git commit commands** and a meaningful commit message (commit only when I say so).
- When an error happens: explain **what the error means in plain words**, the **likely cause**, then the fix, and teach me the general lesson (e.g., EADDRINUSE = port already in use).
- Remember: `npm run dev` must be **restarted after changing `.env.local`**.
- **Never ask me to paste secret keys, and never read/print them.** Debug safely (e.g. print only the first few characters).

---

## 2. My environment

- **Windows**, using **PowerShell** (VS Code integrated terminal). Give PowerShell commands, not bash.
- Browser: **Chrome** (Windows default; VS Code `workbench.externalBrowser` set to `chrome`).
- Project path: `C:\Users\saksh\practice\ai-short-video`
- Node **v24.20.0**, npm **11.19.0**, Git **2.55.0**
- **Next.js 16.4.2** (Turbopack). Middleware file is called **`proxy.js`** (Next 16 renamed `middleware.js`).
- **JavaScript, NOT TypeScript.** App Router, Tailwind, ESLint, no `src/` dir, default `@/*` import alias, no React Compiler, no Cache Components.
- VS Code with Prettier (format on save) working.
- My internet is sometimes slow; I configured npm: `fetch-retries 5`, `fetch-retry-maxtimeout 120000`, `fetch-timeout 600000`.
- Code is on GitHub (public repo: `ai-short-video-generator`), branch `main`.

---

## 3. What the app does

User logs in → types a topic (e.g. "facts about black holes") + picks style/length →
1. **Gemini** (LLM) writes a script split into 4–6 scenes (narration text + image search term per scene), returned as **structured JSON**.
2. **Google Cloud Text-to-Speech** turns each scene's narration into audio.
3. **Pexels API** (free stock photos) supplies an image per scene (Gemini provides the search term).
4. **Remotion** combines images + voiceover + captions into a video, previewed in the browser (Remotion Player), later exported as MP4.
5. **Clerk** handles auth; **Neon PostgreSQL + Drizzle** stores users and videos.
6. **Credits system**: each user starts with 5 credits; 1 credit per video (because AI calls cost money).

Captions plan: derive captions from each scene's narration text, timed to that scene's audio duration (no extra speech-to-text API).

---

## 4. Tech stack (decided)

| Purpose | Tool |
|---|---|
| Framework | Next.js 16 (App Router, JavaScript) + React + Tailwind |
| Auth | Clerk (`@clerk/nextjs`) |
| Database | Neon (serverless PostgreSQL), region AWS Singapore |
| ORM | Drizzle (`drizzle-orm`, `@neondatabase/serverless`; dev: `drizzle-kit`, `dotenv`) |
| LLM | Gemini via `@google/genai` (v2.30), model alias `gemini-flash-lite-latest` (switched 2026-10-23: `gemini-flash-latest` was overloaded — 503s / 60s+ waits; lite answered in ~1s) |
| Voice | Google Cloud Text-to-Speech (needs billing account attached; free tier) |
| Audio storage | Vercel Blob |
| Images | Pexels API |
| Video | Remotion (`@remotion/player`, later rendering) |
| Deploy | Vercel |

---

## 5. Roadmap & progress

| Phase | Content | Status |
|---|---|---|
| 1 | Next.js setup, Clerk login, protected `/dashboard`, push to GitHub | ✅ Done |
| 2 | Neon DB + Drizzle schema (users, videos), sync Clerk user to DB, show credits | ✅ Done |
| 3 | Gemini: Step 1 = first test call (`/api/test-ai`); Step 2 = prompt engineering → structured JSON script + "Create video" form | 🔄 **IN PROGRESS** — Step 1: SDK installed + route created; waiting for me to add `GEMINI_API_KEY` to `.env.local`, then test |
| 4 | Google TTS route → audio per scene → upload to Vercel Blob | ⏳ |
| 5 | Pexels images per scene | ⏳ |
| 6 | Remotion composition (images + audio + captions + transitions), preview with Player | ⏳ |
| 7 | Dashboard listing user's saved videos | ⏳ |
| 8 | MP4 download/export, loading states, error handling, deduct credits | ⏳ |
| 9 | Deploy on Vercel, README, add live link to CV | ⏳ |

Estimated total: ~40–55 hours at learning pace. A working demo after Phases 1–6 is enough to show in interviews.

**NEXT ACTION:** Once the key is in `.env.local`, restart dev server and verify `http://localhost:3000/api/test-ai` returns a Gemini answer. Then Phase 3 Step 2: teach prompt engineering (role, task, constraints, output format, examples), use Gemini **structured output** (`config: { responseMimeType: "application/json", responseSchema: ... }`) to return `{ title, scenes: [{ text, imageQuery }] }`; build a `POST /api/generate-script` route (check Clerk auth + credits) and a "Create video" form page (client component with `"use client"`, explain server vs client components); save the video row with status. Delete `/api/test-ai` before deploying (it's unprotected).

---

## 6. Current code in the project

### `.env.local` (git-ignored — variable NAMES only)
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
DATABASE_URL=postgresql://...   (Neon connection string)
GEMINI_API_KEY=...              (from Google AI Studio)
```

### `package.json` scripts (added)
```json
"db:push": "drizzle-kit push",
"db:studio": "drizzle-kit studio"
```

### `proxy.js` (root)
Clerk middleware; `createRouteMatcher(["/dashboard(.*)"])` → `auth.protect()`. Standard Clerk matcher config (skips `_next` + static files, always runs on `/(api|trpc)(.*)`).

### `app/layout.js`
Wraps app in `<ClerkProvider>`, dark theme (`bg-gray-950 text-white`), header with "🎬 ShortAI" link to `/`. Uses `const { userId } = await auth()` (server-side) to show either `<Link href="/dashboard">Dashboard</Link>` + `<UserButton />` or `<SignInButton mode="modal">` with a custom button. (Avoided `SignedIn`/`SignedOut` components.)

### `app/page.js`
Simple centered heading "My AI Video Generator 🎬".

### `app/dashboard/page.js`
Server component: `const user = await getOrCreateUser();` shows "Welcome, {user?.name} 👋" and a card with `{user?.credits}` "credits left".

### `db/schema.js`
`users` (id serial PK, clerkId unique, name, email, imageUrl, credits default 5, createdAt) and `videos` (id, userId FK → users.id cascade, topic, style, scenes jsonb `[{ text, imageQuery, imageUrl, audioUrl, duration }]`, status default "pending" → generating → completed / failed, createdAt).

### `db/index.js`
`neon(process.env.DATABASE_URL)` + `drizzle({ client: sql })` from `drizzle-orm/neon-http`; exports `db`.

### `drizzle.config.js` (root)
Loads `.env.local` via dotenv; schema `./db/schema.js`, out `./drizzle`, dialect postgresql.

### `lib/user.js`
`getOrCreateUser()` — lazy sync: `currentUser()` from Clerk → select from `users` where `clerkId` matches → return, else insert with `.returning()`. (Webhooks discussed as production alternative.)

### `app/api/test-ai/route.js`
`GET` handler: module-level `new GoogleGenAI({ apiKey })`, calls `ai.models.generateContent({ model: "gemini-flash-latest", contents: "..." })`, returns `{ answer: response.text }`; try/catch → 500 with `error.message`.

---

## 7. Concepts already taught (don't re-explain in depth, just reference)

Next.js vs React (frontend + backend in one), App Router (folders = routes, `page.js` vs `route.js`), dev server/localhost/ports, hot reload, authentication vs authorization, cookies/sessions, Clerk publishable vs secret keys, environment variables & `NEXT_PUBLIC_` rule & `.gitignore`, proxy/middleware & route matcher, ClerkProvider, `auth()` vs `currentUser()`, optional chaining, Git/GitHub/commit/push/remote/branch, SQL vs NoSQL, PostgreSQL & Neon, ORM (Drizzle ≈ Mongoose), schema, column types & constraints, primary/foreign keys, cascade delete, JSONB, drizzle-kit push & Studio, dev dependencies (`-D`), npm scripts, `@/` alias, `lib/` folder & DRY, select/insert/where/eq/returning with SQL equivalents, array destructuring, Server Components querying DB directly, `next/link` vs `<a>`, lazy sync vs webhooks, credits system reasoning, how LLMs work (next-token prediction, hallucination, non-determinism), model/prompt/token/rate limit, Flash vs Pro, API routes (≈ Express), SDKs, try/catch & HTTP status codes, API keys / Google AI Studio, module-level SDK client reuse.

## 8. Errors I've hit (and lessons)
- `EIDLETIMEOUT` during `create-next-app` → slow internet; fixed with npm retry/timeout config.
- Accidentally chose "recommended defaults" (TypeScript) → recreated with "No, customize settings".
- Clerk "Publishable key not valid" → bad copy in `.env.local`; fixed using Clerk's Quick Copy.
- Drizzle Studio "Invalid URL" → malformed `DATABASE_URL` from Neon snippet; fixed.
- `EADDRINUSE 127.0.0.1:4983` → old Drizzle Studio still running; stopped it.
