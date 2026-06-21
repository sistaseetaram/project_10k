# Project 10K — Handoff

## Multi-user (2026-06-20) — CODE COMPLETE, awaiting Supabase keys
- Stack added: Supabase (auth + Postgres + RLS), `@supabase/supabase-js`. Client-side, stays on GitHub Pages.
- Repo moved to `~/Desktop/Claude/claude_projects/project_10k`.
- Auth: email/password + Google. Landing CTA → AuthScreen → app (gated on session).
- New: `src/lib/supabaseClient.js`, `src/context/AuthContext.jsx`, `src/components/AuthScreen.jsx`, `src/hooks/{useProfile,useDisciplines,useSessions,useMetrics}.js`, `supabase/schema.sql`.
- All 7 pages wired to per-user data; every metric computed from `sessions` (single source of truth). Hardcoded "Alex Mercer" etc. gone.
- **TO GO LIVE:** follow `SUPABASE_SETUP.md` (create project, paste keys into `.env`, run `schema.sql`, set redirect URLs). Then rebuild + redeploy. Until keys exist, auth screen shows "backend not configured" — so the auth build is NOT deployed yet (current live site = pre-auth hero/landing).
- Hero video now Brian (ElevenLabs) at 1.2x, 18s, deployed.

---

# Project 10K — Handoff (2026-06-16)

## Live site
https://sistaseetaram.github.io/project_10k/

## Repo
https://github.com/sistaseetaram/project_10k (branch: master)
Local: /Users/sistaseetaram/Desktop/project_10k_work/

## Done
- [x] Landing page (src/pages/Landing.jsx) — dark cinematic, click-to-play hero video
- [x] Hero video (public/hero.mp4) — 27s H.264+AAC, Kokoro bm_george VO + synthesized music, -15.2 LUFS
- [x] Hero poster (public/hero-poster.jpg)
- [x] App.jsx — landing as default view, CTA → dashboard
- [x] vite.config.js — base: '/project_10k/' for Pages
- [x] GitHub Pages deployed via gh-pages branch

## Still to do

### Android APK (easiest path first)
Option A — PWABuilder TWA (no SDK needed):
  Go to https://www.pwabuilder.com → enter https://sistaseetaram.github.io/project_10k/ → download Android package

Option B — Capacitor (native):
  npm install @capacitor/core @capacitor/cli @capacitor/android
  npx cap init "Project 10K" com.project10k.app
  npx cap add android
  npx cap sync
  → open Android Studio → build APK

### CI auto-deploy (GitHub Actions)
Run once in terminal: gh auth refresh -h github.com -s workflow
Then tell Claude to push .github/workflows/deploy.yml — already written, just needs the scope

### Better voice (ElevenLabs voice clone)
Add key to: /Users/sistaseetaram/Desktop/Claude/claude_projects/VideoEditorHyperframes/video-use/.env
Format: ELEVENLABS_API_KEY=sk_...
Tell Claude: "re-do the hero VO with ElevenLabs, clone Goggins/Hormozi"

### App bug fixes (audit findings)
- Mobile hamburger nav has no onClick handler (Sidebar.jsx)
- "New Activity" button has no onClick
- All data is hardcoded/no persistence
- Hours display inconsistent (3,240 vs 1,248 across pages)

## Voice re-generation (if needed)
Kokoro models at: /Users/sistaseetaram/Desktop/Claude/claude_projects/VideoEditorHyperframes/
Files: kokoro-v1.0.onnx (321MB), voices-v1.0.bin (27MB)
Run from video-use dir with: uv run python3 <kokoro script>
Voice: bm_george, speed ~0.90, gap 0.2s between lines → stretch to 27s → ffmpeg mix
