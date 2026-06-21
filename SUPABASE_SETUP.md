# Supabase Setup — Project 10K Multi-User

The app code is done. To turn on login + per-user data, do these 5 steps (~10 min).

## 1. Create a Supabase project
- Go to https://supabase.com → New project. Pick a name + region close to you.
- Wait for it to provision.

## 2. Get your keys
- Project → **Settings → API**.
- Copy **Project URL** and the **anon / public** key (NOT service_role).

## 3. Put keys in `.env`
Edit `/Users/sistaseetaram/Desktop/Claude/claude_projects/project_10k/.env`:
```
VITE_SUPABASE_URL=https://YOUR-REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR-ANON-KEY
```
(The anon key is meant to be public — Row Level Security protects the data. Never paste the service_role key here.)

## 4. Create the database
- Supabase → **SQL Editor → New query**.
- Paste the entire contents of `supabase/schema.sql` → **Run**.
- This creates `profiles`, `disciplines`, `sessions`, RLS policies, and the signup trigger.

## 5. Configure Auth
- **Auth → Providers → Email**: enabled. For first testing, turn **OFF** "Confirm email" (Auth → Providers → Email → uncheck confirm) so you can sign in immediately. Re-enable before public launch.
- **Auth → Providers → Google**: enable, paste a Google OAuth client ID + secret (from Google Cloud Console → Credentials → OAuth client → Web). Add Supabase's callback URL (shown in the Google provider panel) to the Google client's authorized redirect URIs.
- **Auth → URL Configuration**:
  - Site URL: `https://sistaseetaram.github.io/project_10k/`
  - Additional Redirect URLs: add both
    - `https://sistaseetaram.github.io/project_10k/`
    - `http://localhost:5173/project_10k/`

## Then tell me "keys are in"
I'll rebuild, deploy, and verify the full flow: sign up → create a discipline → log a session → watch hours/streak update, and confirm a second account can't see your data.

---

### Notes
- Free tier: 50k monthly active users, 500MB DB. **Projects pause after ~1 week idle** — first request after a pause wakes it (a few seconds).
- Email/password works without Google. Google is optional; skip step-5-Google if you only want email for now.
- Local dev: `npm run dev` → http://localhost:5173/project_10k/ . Env vars are read at build/dev start — restart the dev server after editing `.env`.
