import React, { useRef, useState } from 'react';

export default function Landing({ onEnter }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
    setPlaying(true);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#06110b] font-body text-[#eafff4]">
      {/* atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(820px 620px at 50% 8%, rgba(26,209,127,0.16), rgba(6,17,11,0) 70%), radial-gradient(1200px 900px at 82% 100%, rgba(15,122,77,0.14), rgba(6,17,11,0) 72%)',
        }}
      />

      {/* nav */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#1ad17f] to-[#0f7a4d] shadow-[0_0_24px_rgba(26,209,127,0.45)]">
            <span style={{ width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderBottom: '11px solid #06110b' }} />
          </div>
          <span className="text-lg font-bold tracking-tight">Project 10K</span>
        </div>
        <button
          onClick={onEnter}
          className="rounded-full border border-[#1ad17f]/30 px-5 py-2 text-sm font-semibold text-[#7ef0b6] transition hover:bg-[#1ad17f]/10"
        >
          Open app →
        </button>
      </header>

      {/* hero */}
      <main className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-6 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#1ad17f]/25 bg-[#1ad17f]/5 px-4 py-1.5 text-xs font-semibold tracking-[0.25em] text-[#7ef0b6]">
          THE 10,000-HOUR TRACKER
        </div>

        <h1 className="max-w-3xl text-balance text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
          Turn <span className="text-[#1ad17f]">10,000 hours</span> into momentum you can see.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-[#9db5a8] md:text-xl">
          Mastery isn’t a moment — it’s ten thousand of them. Project 10K tracks every rep, session and hour,
          turning the grind into a transparent, shared pursuit of excellence.
        </p>

        {/* video — click to play, with sound */}
        <div className="group relative mt-12 w-full max-w-4xl overflow-hidden rounded-2xl border border-[#1ad17f]/20 shadow-[0_30px_120px_-30px_rgba(26,209,127,0.55)]">
          <video
            ref={videoRef}
            className="block aspect-video w-full bg-black"
            poster="/hero-poster.jpg"
            preload="metadata"
            controls={playing}
            playsInline
            src="/hero.mp4"
            onEnded={() => setPlaying(false)}
          />
          {!playing && (
            <button
              onClick={play}
              aria-label="Play the film, 27 seconds, sound on"
              className="absolute inset-0 grid place-items-center bg-gradient-to-t from-[#06110b]/70 via-[#06110b]/10 to-transparent"
            >
              <span className="grid h-20 w-20 place-items-center rounded-full bg-[#1ad17f] shadow-[0_0_50px_rgba(26,209,127,0.6)] transition duration-300 group-hover:scale-110">
                <svg width="26" height="30" viewBox="0 0 28 32" fill="#06110b" aria-hidden>
                  <path d="M2 2.5v27l24-13.5z" />
                </svg>
              </span>
              <span className="absolute bottom-5 text-sm font-medium text-[#cfeede]">
                Watch the film · 0:27 · sound on
              </span>
            </button>
          )}
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <button
            onClick={onEnter}
            className="rounded-full bg-gradient-to-r from-[#7ef0b6] to-[#1ad17f] px-8 py-4 text-base font-bold text-[#04130c] shadow-[0_0_50px_rgba(26,209,127,0.45)] transition hover:brightness-110"
          >
            Start your journey →
          </button>
          <span className="text-sm text-[#6f8a7d]">Jump straight into the dashboard — no sign-up to explore.</span>
        </div>

        {/* proof strip */}
        <div className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-6 border-t border-[#1ad17f]/10 pt-10 sm:grid-cols-3">
          {[
            ['Track reps', 'Log every session and watch the hours compound.'],
            ['See momentum', 'Streaks, analytics and a live path to mastery.'],
            ['Stay accountable', 'A transparent, shared pursuit — not a dark grind.'],
          ].map(([t, d]) => (
            <div key={t} className="text-left">
              <div className="text-sm font-bold text-[#7ef0b6]">{t}</div>
              <div className="mt-1 text-sm leading-relaxed text-[#8fae9f]">{d}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
