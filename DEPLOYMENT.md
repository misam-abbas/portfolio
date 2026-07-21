# Deployment Checklist — Vercel

## 1. Repository
- [ ] Push this project to a GitHub repository
- [ ] Confirm `.env.local` is **not** committed (it's git-ignored by default)

## 2. Import to Vercel
- [ ] Go to [vercel.com/new](https://vercel.com/new) and import the repository
- [ ] Framework preset: **Next.js** (auto-detected)
- [ ] Build command: `next build` (default — no change needed)
- [ ] Output: handled automatically by the Next.js Vercel adapter

## 3. Environment variables
Add each of these in **Project Settings → Environment Variables** (Production,
Preview, and Development as appropriate):

- [ ] `NEXT_PUBLIC_SITE_URL` — your real production domain, e.g. `https://misamabbas.dev`
- [ ] `RESEND_API_KEY`
- [ ] `CONTACT_EMAIL_TO`
- [ ] `CONTACT_EMAIL_FROM` (must be a verified sender/domain in Resend)
- [ ] `GEMINI_API_KEY`
- [ ] `GEMINI_MODEL` (defaults to `gemini-2.5-flash` if unset)
- [ ] `GITHUB_USERNAME`
- [ ] `GITHUB_TOKEN`
- [ ] `UPSTASH_REDIS_REST_URL`
- [ ] `UPSTASH_REDIS_REST_TOKEN`

## 4. Third-party service setup
- [ ] **Resend**: verify your sending domain (or use their test domain while developing) at [resend.com/domains](https://resend.com/domains)
- [ ] **Gemini**: create a free API key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey) — no billing required for the free tier
- [ ] **GitHub token**: classic personal access token with `public_repo` and `read:user` scopes
- [ ] **Upstash**: create a Redis database (the free tier is enough for a portfolio's traffic)

## 5. Before going live
- [ ] Replace `public/resume/misam-abbas-resume.pdf` with your real resume
- [ ] Replace placeholder project/blog/certificate images in `public/images/`
- [ ] Update social links in `constants/data.ts` (`SOCIAL_LINKS`) to your real profiles
- [ ] Update `content/blog/posts.ts` with real posts (or remove the section)
- [ ] Point your custom domain at the Vercel project (**Project Settings → Domains**)
- [ ] Re-check `NEXT_PUBLIC_SITE_URL` matches the final domain exactly (used in the sitemap, canonical URLs, and JSON-LD)

## 6. After deploying
- [ ] Submit `https://yourdomain.com/sitemap.xml` to Google Search Console
- [ ] Run a Lighthouse audit on the live URL (throttled results will differ from local dev)
- [ ] Test the contact form end-to-end (a real email should arrive)
- [ ] Test the AI assistant with a couple of questions
- [ ] Test on a real mobile device — check the bottom-right assistant button doesn't overlap other floating UI
