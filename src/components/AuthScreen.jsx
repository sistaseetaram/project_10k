import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthScreen({ onBack }) {
  const { signUp, signInWithPassword, signInWithGoogle, configured } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setNotice('');
    if (!configured) {
      setError('Backend not configured yet. Add Supabase keys to .env.');
      return;
    }
    setBusy(true);
    try {
      if (mode === 'signup') {
        const { data, error } = await signUp(email, password, displayName);
        if (error) throw error;
        // If email confirmation is on, there's no session yet.
        if (!data.session) {
          setNotice('Check your email to confirm your account, then sign in.');
          setMode('login');
        }
      } else {
        const { error } = await signInWithPassword(email, password);
        if (error) throw error;
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setError('');
    if (!configured) {
      setError('Backend not configured yet. Add Supabase keys to .env.');
      return;
    }
    const { error } = await signInWithGoogle();
    if (error) setError(error.message);
  };

  const inputCls =
    'w-full rounded-xl border border-[#1ad17f]/20 bg-[#0b1a12] px-4 py-3 text-[#eafff4] placeholder-[#6f8a7d] outline-none transition focus:border-[#1ad17f]/60 focus:ring-1 focus:ring-[#1ad17f]/40';

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#06110b] px-6 font-body text-[#eafff4]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(820px 620px at 50% 8%, rgba(26,209,127,0.16), rgba(6,17,11,0) 70%), radial-gradient(1200px 900px at 82% 100%, rgba(15,122,77,0.14), rgba(6,17,11,0) 72%)',
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-sm text-[#9db5a8] transition hover:text-[#7ef0b6]"
        >
          ← Back
        </button>

        <div className="rounded-2xl border border-[#1ad17f]/15 bg-[#08160f]/80 p-8 shadow-[0_30px_120px_-30px_rgba(26,209,127,0.45)] backdrop-blur">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#1ad17f] to-[#0f7a4d] shadow-[0_0_24px_rgba(26,209,127,0.45)]">
              <span
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '7px solid transparent',
                  borderRight: '7px solid transparent',
                  borderBottom: '11px solid #06110b',
                }}
              />
            </div>
            <span className="text-lg font-bold tracking-tight">Project 10K</span>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight">
            {mode === 'login' ? 'Welcome back' : 'Start your 10,000 hours'}
          </h1>
          <p className="mt-1 text-sm text-[#9db5a8]">
            {mode === 'login'
              ? 'Log in to track your journey.'
              : 'Create an account to log the work and own the outcome.'}
          </p>

          <button
            onClick={google}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-[#1ad17f]/25 bg-[#0b1a12] px-4 py-3 font-semibold text-[#eafff4] transition hover:bg-[#1ad17f]/10"
          >
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.5-8 19.5-20 0-1.3-.1-2.3-.4-3.5z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35 26.7 36 24 36c-5.3 0-9.7-2.6-11.3-7l-6.5 5C9.6 39.6 16.2 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.3 5.3C41.9 36.5 44 30.9 44 24c0-1.3-.1-2.3-.4-3.5z"/>
            </svg>
            Continue with Google
          </button>

          <div className="my-5 flex items-center gap-3 text-xs text-[#6f8a7d]">
            <span className="h-px flex-1 bg-[#1ad17f]/15" />
            or
            <span className="h-px flex-1 bg-[#1ad17f]/15" />
          </div>

          <form onSubmit={submit} className="space-y-3">
            {mode === 'signup' && (
              <input
                className={inputCls}
                type="text"
                placeholder="Display name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                autoComplete="name"
              />
            )}
            <input
              className={inputCls}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
            <input
              className={inputCls}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              minLength={6}
              required
            />

            {error && <p className="text-sm text-red-400">{error}</p>}
            {notice && <p className="text-sm text-[#7ef0b6]">{notice}</p>}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-xl bg-gradient-to-r from-[#7ef0b6] to-[#1ad17f] px-4 py-3 font-bold text-[#04130c] shadow-[0_0_40px_rgba(26,209,127,0.4)] transition hover:brightness-110 disabled:opacity-60"
            >
              {busy ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-[#9db5a8]">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError('');
                setNotice('');
              }}
              className="font-semibold text-[#7ef0b6] hover:underline"
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>

        {!configured && (
          <p className="mt-4 text-center text-xs text-[#6f8a7d]">
            Backend not connected yet — add Supabase keys to <code>.env</code> and rebuild.
          </p>
        )}
      </div>
    </div>
  );
}
