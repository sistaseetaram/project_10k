import React, { useMemo, useState } from 'react';
import { useDisciplines } from '../hooks/useDisciplines';
import { useSessions } from '../hooks/useSessions';
import { computeMetrics } from '../hooks/useMetrics';

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function relDate(dateStr) {
  const today = todayStr();
  if (dateStr === today) return 'Today';
  const d = new Date(dateStr + 'T00:00:00');
  const t = new Date(today + 'T00:00:00');
  const diff = Math.round((t - d) / 86400000);
  if (diff === 1) return 'Yesterday';
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

const Logs = () => {
  const { disciplines, loading: dLoading } = useDisciplines();
  const { sessions, addSession } = useSessions();

  const [disciplineId, setDisciplineId] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [date, setDate] = useState(todayStr());
  const [duration, setDuration] = useState('');
  const [intensity, setIntensity] = useState('medium');
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const m = useMemo(() => computeMetrics(disciplines, sessions), [disciplines, sessions]);

  const reset = () => {
    setSubCategory('');
    setDuration('');
    setIntensity('medium');
    setNotes('');
    setDate(todayStr());
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setToast('');
    if (!disciplineId) return setError('Pick an activity focus.');
    const dur = parseFloat(duration);
    if (!dur || dur <= 0) return setError('Enter a duration greater than 0.');
    if (!date) return setError('Pick a date.');

    setBusy(true);
    try {
      await addSession({
        discipline_id: disciplineId,
        sub_category: subCategory.trim() || null,
        session_date: date,
        duration_hours: dur,
        intensity,
        notes: notes.trim() || null,
      });
      reset();
      setToast('Session logged.');
    } catch (e2) {
      setError(e2.message || 'Could not save session.');
    } finally {
      setBusy(false);
    }
  };

  const noDisciplines = !dLoading && disciplines.length === 0;
  const recent = sessions.slice(0, 4);
  const discName = (id) => disciplines.find((d) => d.id === id)?.name || 'Session';

  return (
    <div className="flex-1 overflow-y-auto w-full max-w-[1200px] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-bold text-on-surface tracking-tight">Record Session</h1>
        <p className="text-on-surface-variant mt-2 text-sm max-w-2xl text-slate-500">Log your focused hours and detail your progress. Every entry builds momentum.</p>
      </div>

      {noDisciplines && (
        <div className="mb-6 rounded-xl border border-primary/30 bg-primary-container/20 px-5 py-4 text-sm text-on-surface">
          You don't have any disciplines yet. Head to the <span className="font-semibold">Dashboard</span> to create your first one, then come back to log sessions.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={submit} className="bg-white rounded-xl border border-outline-variant p-6 lg:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6 border-b border-outline-variant pb-4">
              <span className="material-symbols-outlined text-primary">edit_document</span>
              <h2 className="font-label font-bold text-on-surface uppercase tracking-wider text-sm font-semibold">Session Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="block font-label text-sm font-semibold text-on-surface-variant text-slate-600" htmlFor="focus">Activity Focus</label>
                <select
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary-container transition-all appearance-none cursor-pointer"
                  id="focus"
                  value={disciplineId}
                  onChange={(e) => setDisciplineId(e.target.value)}
                >
                  <option disabled value="">{noDisciplines ? 'Create a discipline first…' : 'Select primary activity area...'}</option>
                  {disciplines.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block font-label text-sm font-semibold text-on-surface-variant text-slate-600" htmlFor="subcategory">Sub-Category</label>
                <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary-container transition-all placeholder-outline" id="subcategory" placeholder="e.g. Component Architecture" type="text" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="block font-label text-sm font-semibold text-on-surface-variant text-slate-600" htmlFor="date">Date</label>
                <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary-container transition-all" id="date" type="date" max={todayStr()} value={date} onChange={(e) => setDate(e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="block font-label text-sm font-semibold text-on-surface-variant text-slate-600" htmlFor="duration">Duration (Hours)</label>
                <div className="relative">
                  <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary-container transition-all pr-12 font-headline text-lg" id="duration" min="0.5" placeholder="0.0" step="0.5" type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-label text-sm">hrs</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-label text-sm font-semibold text-on-surface-variant mb-1 text-slate-600">Perceived Intensity</label>
                <div className="flex bg-surface-container-low p-1 rounded-lg border border-outline-variant h-[50px] bg-slate-100">
                  {['low', 'medium', 'high'].map((lvl) => (
                    <label key={lvl} className="flex-1 cursor-pointer">
                      <input className="peer sr-only" name="intensity" type="radio" value={lvl} checked={intensity === lvl} onChange={() => setIntensity(lvl)} />
                      <div className="h-full flex items-center justify-center rounded-md text-sm font-medium text-on-surface-variant peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm transition-all capitalize">{lvl}</div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2 md:col-span-2 mt-2">
                <label className="block font-label text-sm font-semibold text-on-surface-variant text-slate-600" htmlFor="notes">Session Notes & Reflections</label>
                <textarea className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary-container transition-all placeholder-outline resize-y" id="notes" placeholder="What were the key breakthroughs or challenges?" rows="4" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
              </div>
            </div>

            {error && <p className="mt-4 text-sm text-error">{error}</p>}
            {toast && <p className="mt-4 text-sm text-primary font-semibold">{toast}</p>}

            <div className="mt-8 flex items-center justify-end gap-4 border-t border-outline-variant pt-6">
              <button className="px-6 py-2.5 rounded-lg font-label font-semibold text-on-surface-variant hover:bg-surface-container transition-colors text-slate-500" type="button" onClick={reset}>Clear</button>
              <button disabled={busy || noDisciplines} className="px-8 py-2.5 bg-primary text-on-primary rounded-lg font-label font-semibold hover:opacity-90 active:scale-95 transition-all shadow-sm flex items-center gap-2 disabled:opacity-50" type="submit">
                <span className="material-symbols-outlined text-sm">save</span>
                {busy ? 'Saving…' : 'Log Session'}
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl border border-outline-variant p-6 flex items-center gap-5 relative overflow-hidden group shadow-sm">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary-container opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity"></div>
            <div className="w-14 h-14 rounded-full bg-secondary-container text-primary flex items-center justify-center shrink-0 z-10">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            </div>
            <div className="z-10">
              <p className="font-label text-sm text-on-surface-variant font-semibold uppercase tracking-wider mb-1 text-slate-500">Current Streak</p>
              <div className="flex items-baseline gap-1">
                <span className="font-headline text-3xl font-bold text-on-surface">{m.currentStreak}</span>
                <span className="text-on-surface-variant font-medium text-slate-500">Days</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-outline-variant p-6 shadow-sm">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="font-label text-sm text-on-surface-variant font-semibold uppercase tracking-wider mb-1 text-slate-500">Projected Mastery</p>
                <h3 className="font-headline text-2xl font-bold text-on-surface">{Math.round(m.totalHours).toLocaleString()} <span className="text-sm font-normal text-on-surface-variant text-slate-400">/ 10k hrs</span></h3>
              </div>
              <div className="bg-primary-container/20 text-primary px-3 py-1 rounded-full text-xs font-bold">
                {m.globalPct.toFixed(1)}%
              </div>
            </div>
            <div className="w-full bg-surface-container-high rounded-full h-3 mb-2 overflow-hidden bg-slate-100">
              <div className="bg-primary h-full rounded-full relative" style={{ width: `${Math.max(m.globalPct, 0.5)}%` }}>
                <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/30 rounded-r-full"></div>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant text-right text-slate-400">{m.weeklyPace.toFixed(1)} / {m.weeklyTarget} hrs this week</p>
          </div>

          <div className="bg-white rounded-xl border border-outline-variant p-6 shadow-sm">
            <h4 className="font-label font-bold text-sm text-on-surface-variant uppercase tracking-wider mb-4 border-b border-outline-variant pb-2 text-slate-500">Recent Logs</h4>
            {recent.length === 0 ? (
              <p className="text-sm text-slate-400">No sessions yet — log your first above.</p>
            ) : (
              <ul className="space-y-4">
                {recent.map((log, i) => (
                  <li key={log.id} className="flex items-start gap-3">
                    <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${i === 0 ? 'bg-primary' : 'bg-outline-variant'}`}></div>
                    <div>
                      <p className="text-sm font-semibold text-on-surface">{log.sub_category || discName(log.discipline_id)}</p>
                      <p className="text-xs text-on-surface-variant text-slate-400">{relDate(log.session_date)} • {Number(log.duration_hours)} hrs</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;
