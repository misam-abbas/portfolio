# Misam Abbas — Developer Portfolio

A production-grade developer portfolio built with Next.js 15, React 19, TypeScript,
Tailwind CSS 4, Framer Motion, GSAP, Three.js / React Three Fiber, and Lenis smooth
scroll — with a streaming AI assistant, a working contact form, live GitHub stats,
and a full SEO/accessibility/performance setup.

## ✨ What's included

- **Design system**: dark-only theme, purple/cyan/blue gradient accents, glassmorphism, Geist/Inter/JetBrains Mono
- **Loading screen**: canvas particle text that assembles into initials on load
- **Custom cursor**: magnetic hover states + click ripple (desktop only)
- **Floating glass navbar**: scroll progress bar, hide-on-scroll-down, active-section indicator
- **Hero**: aurora background, mouse-reactive gradients, typing animation across roles
- **About**: animated counters, glass profile card
- **Skills**: filterable, 3D-tilt animated skill cards by category
- **Tech Orbit**: interactive 3D orbiting tech stack (React Three Fiber)
- **Projects**: tilt cards → fullscreen modal with gallery, features, challenges/solutions
- **Experience**: animated vertical timeline
- **GitHub Activity**: live stats + contribution graph + recent repos (server-rendered)
- **Services**: 6-card service grid
- **Certificates**: animated carousel with a preview modal
- **Blog**: search + category filtering, individual post pages with dynamic metadata
- **Contact**: validated form (Zod + React Hook Form) → Resend email via a React Email template
- **AI Assistant**: floating chat widget, streams responses from the Gemini API (free tier), rate-limited
- **Easter eggs**: styled console message, Konami code, ⌘K / Ctrl+K command palette
- **SEO**: per-page metadata, `sitemap.xml`, `robots.txt`, JSON-LD, dynamically generated OG/Twitter/favicon images
- **Accessibility**: skip link, focus states, `prefers-reduced-motion` support, semantic landmarks
- **Security headers**: configured in `next.config.ts`

## 🧱 Tech stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4 · Framer Motion
· GSAP · Three.js / React Three Fiber / Drei · Lenis · Lucide + React Icons · React Email
+ Resend · Google Gemini API · Upstash Redis (rate limiting) · Zod · React Hook Form · Vercel
Analytics + Speed Insights

## 📁 Project structure

```
app/                    App Router pages, layouts, API routes, SEO conventions
  api/contact/          Contact form → Resend
  api/chat/             Streaming AI assistant → Gemini
  blog/                 Blog list + [slug] post pages
  icon.tsx              Dynamically generated favicon
  opengraph-image.tsx   Dynamically generated OG/Twitter share image
  sitemap.ts robots.ts manifest.ts
components/
  layout/               Navbar, Footer, Providers, AppShell
  sections/             One file per homepage section
  shared/                Cursor, loading screen, command palette, AI assistant, etc.
  three/                 React Three Fiber scene(s)
constants/              Site copy, skills, projects, experience, services (edit here!)
content/blog/           Blog post content
emails/                 React Email templates
hooks/                  useLenis, useTilt
lib/                    env validation, GitHub client, rate limiting, utils, validations
types/                  Shared TypeScript interfaces
public/                 Images, resume PDF, manifest icon
```

## 🚀 Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values you have
npm run dev
```

Open http://localhost:3000.

> **Note on fonts**: this project uses `next/font/google` for Geist, Inter, and
> JetBrains Mono. Those fonts are fetched from Google Fonts **at build time**, so
> `npm run dev` / `npm run build` need an internet connection the first time (Next
> caches them afterward). This is normal for `next/font/google` and works out of the
> box on Vercel.

## ✏️ Editing content

Almost everything on the site is data-driven from **`constants/data.ts`**:
name, role, bio, skills, tech orbit items, projects, experience, services, and
certificates. Blog posts live in **`content/blog/posts.ts`**. Update these files
first before touching any component.

Replace the placeholder assets before shipping:
- `public/resume/misam-abbas-resume.pdf` — a minimal placeholder PDF. Replace with your real resume.
- `public/images/projects/*.svg`, `public/images/blog/*.svg`, `public/images/certificates/*.svg` — generated placeholder covers. Swap in real screenshots/photos (keep the same filenames, or update the paths in `constants/data.ts` / `content/blog/posts.ts`).

## 🔑 Environment variables

See `.env.example` for the full list. Summary of what each integration needs:

| Variable | Used for | Where to get it |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, JSON-LD | Your production domain |
| `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM` | Contact form emails | [resend.com/api-keys](https://resend.com/api-keys) |
| `GEMINI_API_KEY`, `GEMINI_MODEL` | AI assistant chat | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |
| `GITHUB_USERNAME`, `GITHUB_TOKEN` | Live GitHub stats/repos section | [github.com/settings/tokens](https://github.com/settings/tokens) (classic token, `public_repo` + `read:user`) |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Rate limiting `/api/chat` and `/api/contact` | [console.upstash.com](https://console.upstash.com) |

Every integration degrades gracefully if its keys are missing: the contact form
returns a clear error instead of crashing, the AI assistant tells the visitor it
isn't configured yet, the GitHub section shows a "connect your account" message,
and rate limiting is simply skipped (not enforced) without Upstash configured.
**For a real production deployment, set all of these.**

## 🩺 Quality checks

```bash
npm run lint      # ESLint (flat config, next/core-web-vitals + next/typescript)
npm run format    # Prettier, with prettier-plugin-tailwindcss for class sorting
npx tsc --noEmit  # Strict TypeScript check
npm run build     # Production build
```

This project currently type-checks and lints clean with **zero errors and zero
warnings**.

## ☁️ Deploying to Vercel

See `DEPLOYMENT.md` for the full checklist. Short version:

1. Push this repo to GitHub.
2. Import it into Vercel.
3. Add every environment variable from `.env.example` in Project Settings → Environment Variables.
4. Deploy. No further configuration is required — `next.config.ts`, security headers, image domains, and the sitemap/robots routes are already set up.

## ♿ Accessibility & performance notes

- All interactive elements are keyboard-reachable; the custom cursor never replaces default focus outlines (`:focus-visible` is styled explicitly).
- `prefers-reduced-motion` disables Lenis smooth scroll and shortens/removes CSS animations.
- The 3D tech orbit and loading-screen canvas are loaded client-side only and lazily, so they don't block first paint or add to the server bundle.
- Images use `next/image` with explicit `sizes` for correct responsive loading.
- Run a Lighthouse pass after you swap in your real content/images — placeholder SVGs are intentionally lightweight, but real photography should be optimized (WebP/AVIF, reasonable dimensions) to keep scores high.
