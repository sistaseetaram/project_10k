import React, { useState } from 'react';
import { useDisciplines } from '../hooks/useDisciplines';
import { useSessions } from '../hooks/useSessions';
import { computeMetrics } from '../hooks/useMetrics';

const ICON_BY_CATEGORY = {
  Arts: 'music_note',
  Career: 'design_services',
  Health: 'directions_run',
  Mind: 'psychology',
  Craft: 'build',
};
const CARD_ACCENTS = [
  'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  'bg-secondary-fixed text-on-secondary-fixed-variant',
  'bg-primary-fixed-dim text-on-primary-fixed-variant',
];

function fmt(n) {
  return Math.round(n).toLocaleString();
}

function CreateDisciplineForm({ onCreate }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Career');
  const [focus, setFocus] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    setErr('');
    try {
      await onCreate({ name: name.trim(), category, focus: focus.trim() || null, icon: ICON_BY_CATEGORY[category] });
      setName('');
      setFocus('');
    } catch (e2) {
      setErr(e2.message || 'Could not create.');
    } finally {
      setBusy(false);
    }
  };

  const inputCls =
    'w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary';

  return (
    <form onSubmit={submit} className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm max-w-xl">
      <h4 className="font-headline text-xl font-semibold text-on-surface mb-1">Create your first discipline</h4>
      <p className="font-body text-sm text-slate-500 mb-4">A skill you'll pursue to 10,000 hours. You can add more later.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className={inputCls} placeholder="Name (e.g. Violin Mastery)" value={name} onChange={(e) => setName(e.target.value)} required />
        <select className={inputCls} value={category} onChange={(e) => setCategory(e.target.value)}>
          {Object.keys(ICON_BY_CATEGORY).map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input className={`${inputCls} sm:col-span-2`} placeholder="Focus (optional, e.g. Technical Etudes)" value={focus} onChange={(e) => setFocus(e.target.value)} />
      </div>
      {err && <p className="text-sm text-error mt-3">{err}</p>}
      <button type="submit" disabled={busy} className="mt-4 rounded-full bg-primary text-on-primary px-6 py-2.5 font-semibold hover:brightness-110 transition disabled:opacity-60">
        {busy ? 'Creating…' : 'Create discipline'}
      </button>
    </form>
  );
}

function Heatmap({ hoursByDay }) {
  // last 49 days as 7 columns x 7 rows, oldest -> newest
  const cells = [];
  const today = new Date();
  for (let i = 48; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const hrs = hoursByDay[key] || 0;
    let color = 'bg-surface-container-high';
    if (hrs > 0 && hrs < 1) color = 'bg-primary-fixed-dim';
    else if (hrs >= 1 && hrs < 3) color = 'bg-secondary-fixed';
    else if (hrs >= 3) color = 'bg-primary';
    cells.push({ key, color, isToday: i === 0 });
  }
  const columns = [];
  for (let c = 0; c < 7; c++) columns.push(cells.slice(c * 7, c * 7 + 7));

  return (
    <div className="flex-1 flex items-center justify-center bg-surface-bright border border-surface-variant rounded-lg p-6">
      <div className="flex gap-1 overflow-x-auto w-full max-w-full no-scrollbar pb-2">
        {columns.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-1">
            {col.map((cell) => (
              <div
                key={cell.key}
                title={cell.key}
                className={`w-4 h-4 sm:w-6 sm:h-6 rounded-[3px] ${cell.color} ${cell.isToday ? 'ring-2 ring-primary ring-offset-1 ring-offset-surface' : ''}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const Dashboard = ({ onNavigate }) => {
  const { disciplines, loading: dLoading, addDiscipline } = useDisciplines();
  const { sessions, loading: sLoading } = useSessions();
  const loading = dLoading || sLoading;
  const m = computeMetrics(disciplines, sessions);

  return (
    <div className="flex flex-col gap-xl max-w-7xl mx-auto pb-section">
      <header className="mb-xl">
        <h2 className="font-headline text-headline-lg text-on-surface text-3xl font-bold">Dashboard</h2>
        <p className="font-body text-body-md text-on-surface-variant mt-1 text-lg">Your kinetic momentum across all active disciplines.</p>
      </header>

      {loading ? (
        <div className="animate-pulse space-y-6">
          <div className="h-48 rounded-[24px] bg-surface-container-high" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-44 rounded-xl bg-surface-container-high" />
            <div className="h-44 rounded-xl bg-surface-container-high" />
            <div className="h-44 rounded-xl bg-surface-container-high" />
          </div>
        </div>
      ) : (
        <>
          {/* Hero: Total Mastery Unit */}
          <section className="bg-surface border border-outline-variant rounded-[24px] p-xl relative overflow-hidden group mb-10 p-8 bg-white shadow-sm">
            <div className="absolute -right-32 -top-32 w-96 h-96 bg-primary-fixed blur-[100px] opacity-20 rounded-full pointer-events-none group-hover:opacity-30 transition-opacity duration-700"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-lg mb-lg">
              <div>
                <h3 className="font-label text-label-bold text-primary uppercase mb-3 flex items-center gap-2 font-semibold tracking-wider text-sm">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                  Global Mastery Progress
                </h3>
                <div className="font-display text-display-xl text-on-surface flex items-baseline gap-2 text-5xl font-bold">
                  {fmt(m.totalHours)} <span className="text-headline-md text-outline text-2xl font-normal text-slate-400">/ 10,000 hrs</span>
                </div>
              </div>
              <div className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full font-label text-label-sm flex items-center gap-2 self-start md:self-auto border border-outline-variant/30 text-xs font-medium">
                <span className="material-symbols-outlined text-[16px]">trending_up</span> {m.globalPct.toFixed(1)}% to mastery
              </div>
            </div>
            <div className="relative z-10 mt-8">
              <div className="w-full h-6 bg-surface-container-high rounded-full overflow-hidden border border-outline-variant/50">
                <div className="h-full bg-primary rounded-full relative transition-all duration-1000 ease-out" style={{ width: `${Math.max(m.globalPct, 0.5)}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-[200%] animate-pulse"></div>
                </div>
              </div>
              <div className="flex justify-between mt-3 font-label text-label-sm text-outline uppercase tracking-wider text-[10px]">
                <span>Novice</span>
                <span className="text-primary font-semibold">Journeyman</span>
                <span>Master</span>
              </div>
            </div>
          </section>

          {/* Active Journeys Grid */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline text-headline-md text-on-surface text-2xl font-bold">Active Disciplines</h3>
              {disciplines.length > 0 && onNavigate && (
                <button onClick={() => onNavigate('logs')} className="text-primary font-label text-label-sm uppercase tracking-wide hover:underline flex items-center gap-1 text-xs font-semibold">
                  Log a session <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              )}
            </div>

            {disciplines.length === 0 ? (
              <CreateDisciplineForm onCreate={addDiscipline} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {m.disciplinesWithHours.map((d, i) => (
                  <div key={d.id} className="bg-white border border-outline-variant rounded-xl p-6 hover:border-primary/50 hover:bg-surface-container-low transition-all duration-300 group cursor-pointer shadow-sm">
                    <div className="flex items-start justify-between mb-8">
                      <div className={`w-12 h-12 rounded-lg ${CARD_ACCENTS[i % CARD_ACCENTS.length]} flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300`}>
                        <span className="material-symbols-outlined text-[24px]">{d.icon || 'bolt'}</span>
                      </div>
                      {d.category && <span className="font-label text-[10px] font-bold uppercase tracking-wider text-on-surface-variant bg-surface-variant px-2 py-1 rounded">{d.category}</span>}
                    </div>
                    <h4 className="font-headline text-[20px] font-semibold text-on-surface mb-1 text-xl">{d.name}</h4>
                    <p className="font-body text-sm text-outline mb-6 text-slate-500">{d.focus ? `Focus: ${d.focus}` : ' '}</p>
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-label text-label-sm text-on-surface-variant text-xs">{fmt(d.hours)} hrs</span>
                      <span className="font-label text-[10px] text-primary font-bold">{d.pct.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full group-hover:bg-inverse-primary transition-colors" style={{ width: `${Math.max(d.pct, 0.5)}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Bottom Row: Streak & Consistency */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 bg-white border border-outline-variant rounded-xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-error-container via-error to-error-container"></div>
              <div className="w-20 h-20 rounded-full bg-error-container text-on-error-container flex items-center justify-center mb-6 mt-4 ring-8 ring-error-container/30">
                <span className="material-symbols-outlined text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
              </div>
              <div className="font-display text-[64px] font-bold tracking-[-0.02em] text-on-surface leading-none mb-2 text-6xl">{m.currentStreak}</div>
              <h4 className="font-label text-label-bold text-outline uppercase tracking-widest text-sm font-semibold text-slate-500">Day Streak</h4>
              <p className="font-body text-sm text-on-surface-variant mt-4 bg-surface-container px-4 py-2 rounded-full text-xs">Personal Best: {m.bestStreak} days</p>
            </div>
            <div className="lg:col-span-8 bg-white border border-outline-variant rounded-xl p-8 flex flex-col shadow-sm">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h4 className="font-headline text-[20px] font-semibold text-on-surface text-xl">Consistency Map</h4>
                  <p className="font-body text-sm text-outline mt-1 text-slate-500">Activity over the last 7 weeks</p>
                </div>
                <div className="flex items-center gap-2 font-label text-[10px] uppercase text-outline text-[10px]">
                  Less
                  <div className="w-3 h-3 rounded-[2px] bg-surface-container-high"></div>
                  <div className="w-3 h-3 rounded-[2px] bg-secondary-fixed"></div>
                  <div className="w-3 h-3 rounded-[2px] bg-primary-fixed-dim"></div>
                  <div className="w-3 h-3 rounded-[2px] bg-primary"></div>
                  More
                </div>
              </div>
              <Heatmap hoursByDay={m.hoursByDay} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
