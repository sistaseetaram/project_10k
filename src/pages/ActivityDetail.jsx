import React, { useEffect, useMemo, useState } from 'react';
import { useDisciplines } from '../hooks/useDisciplines';
import { useSessions } from '../hooks/useSessions';

function fmt(n) {
  return Math.round(n).toLocaleString();
}

function relDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

const INTENSITY_STARS = { low: 1, medium: 2, high: 3 };

const ActivityDetail = () => {
  const { disciplines, loading: dLoading } = useDisciplines();
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (!selectedId && disciplines.length > 0) {
      setSelectedId(disciplines[0].id);
    }
  }, [disciplines, selectedId]);

  const { sessions, loading: sLoading } = useSessions({ disciplineId: selectedId });
  const selected = disciplines.find((d) => d.id === selectedId);

  const totalHours = useMemo(
    () => sessions.reduce((sum, s) => sum + Number(s.duration_hours || 0), 0),
    [sessions]
  );
  const target = selected?.target_hours || 10000;
  const pct = target ? (totalHours / target) * 100 : 0;

  // Group sessions by sub_category for the unit breakdown.
  const breakdown = useMemo(() => {
    const groups = {};
    for (const s of sessions) {
      const key = s.sub_category || 'Uncategorized';
      groups[key] = (groups[key] || 0) + Number(s.duration_hours || 0);
    }
    return Object.entries(groups)
      .map(([name, hours]) => ({ name, hours, pct: totalHours ? (hours / totalHours) * 100 : 0 }))
      .sort((a, b) => b.hours - a.hours);
  }, [sessions, totalHours]);

  if (dLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="animate-pulse space-y-6">
          <div className="h-16 rounded-xl bg-surface-container-high" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="h-48 rounded-xl bg-surface-container-high" />
            <div className="lg:col-span-2 h-48 rounded-xl bg-surface-container-high" />
          </div>
          <div className="h-64 rounded-xl bg-surface-container-high" />
        </div>
      </div>
    );
  }

  if (disciplines.length === 0) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl border border-outline-variant p-16 text-center shadow-sm">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant text-slate-300 mb-4">folder_off</span>
          <h2 className="text-2xl font-bold text-on-surface mb-2 font-headline">No disciplines yet</h2>
          <p className="text-on-surface-variant text-slate-500">Create a discipline first to track its detail.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-gutter space-y-6">
      {/* Discipline Picker */}
      <div className="flex flex-wrap gap-2">
        {disciplines.map((d) => (
          <button
            key={d.id}
            onClick={() => setSelectedId(d.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${d.id === selectedId ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high bg-slate-100 text-slate-500'}`}
          >
            {d.name}
          </button>
        ))}
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm font-label text-outline uppercase tracking-wider text-slate-500 font-semibold">
            <span className="material-symbols-outlined text-[18px]">folder_special</span>
            <span>{selected?.category || 'Coordinated Activity'}</span>
          </div>
          <h2 className="text-4xl font-display font-bold text-on-surface tracking-tight leading-tight">{selected?.name || 'Activity'}</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg border border-outline-variant text-on-surface font-label text-sm hover:bg-surface-container transition-colors flex items-center gap-2 font-medium">
            <span className="material-symbols-outlined text-sm">edit</span> Edit
          </button>
          <button className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label text-sm hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center gap-2 shadow-sm font-semibold">
            <span className="material-symbols-outlined text-sm">play_arrow</span> Log Session
          </button>
        </div>
      </div>

      {sLoading ? (
        <div className="animate-pulse grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-48 rounded-xl bg-surface-container-high" />
          <div className="lg:col-span-2 h-48 rounded-xl bg-surface-container-high" />
        </div>
      ) : sessions.length === 0 ? (
        <div className="bg-white rounded-xl border border-outline-variant p-16 text-center shadow-sm">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant text-slate-300 mb-4">history_toggle_off</span>
          <h2 className="text-xl font-bold text-on-surface mb-2 font-headline">No sessions logged yet</h2>
          <p className="text-on-surface-variant text-slate-500">Log a session for {selected?.name || 'this discipline'} to see its breakdown here.</p>
        </div>
      ) : (
        <>
          {/* Bento Grid: Stats & Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Mastery Progress Card */}
            <div className="col-span-1 bg-white rounded-xl border border-outline-variant p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <div>
                <h3 className="font-label font-semibold text-on-surface-variant uppercase tracking-widest text-xs mb-6">Total Mastery</h3>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-6xl font-display font-bold text-primary tracking-tighter">{pct.toFixed(0)}<span className="text-3xl text-primary/70">%</span></span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-label text-outline mb-2 text-slate-500">
                  <span>{fmt(totalHours)} Hours Logged</span>
                  <span>{fmt(target)} Goal</span>
                </div>
                <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{ width: `${Math.max(pct, 0.5)}%` }}></div>
                </div>
              </div>
            </div>

            {/* Unit Breakdown Card */}
            <div className="col-span-1 lg:col-span-2 bg-white rounded-xl border border-outline-variant p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-label font-semibold text-on-surface-variant uppercase tracking-widest text-xs">Unit Breakdown</h3>
                <button className="text-primary text-sm font-label hover:underline font-medium">View Details</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {breakdown.map((unit) => (
                  <div key={unit.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-body text-sm font-medium text-on-surface">{unit.name}</span>
                      <span className="font-label text-xs font-bold text-primary">{fmt(unit.hours)} hrs</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${Math.max(unit.pct, 0.5)}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Sessions Table */}
          <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
            <div className="p-6 border-b border-outline-variant flex items-center justify-between bg-surface-bright">
              <h3 className="font-label font-semibold text-on-surface-variant uppercase tracking-widest text-xs">Recent Sessions</h3>
              <span className="px-3 py-1 bg-surface-container rounded-full text-xs font-label text-on-surface-variant">{sessions.length} total</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-lowest border-b border-outline-variant">
                    <th className="px-6 py-4 font-label text-xs font-semibold text-outline tracking-wider w-32 text-slate-400 uppercase">Date</th>
                    <th className="px-6 py-4 font-label text-xs font-semibold text-outline tracking-wider text-slate-400 uppercase">Focus Area</th>
                    <th className="px-6 py-4 font-label text-xs font-semibold text-outline tracking-wider w-32 text-slate-400 uppercase">Duration</th>
                    <th className="px-6 py-4 font-label text-xs font-semibold text-outline tracking-wider w-24 text-slate-400 uppercase">Intensity</th>
                  </tr>
                </thead>
                <tbody className="font-body text-sm text-on-surface divide-y divide-surface-container-highest">
                  {sessions.map((session) => {
                    const stars = INTENSITY_STARS[session.intensity] || 0;
                    return (
                      <tr key={session.id} className="hover:bg-surface-container-low transition-colors group">
                        <td className="px-6 py-4 text-on-surface-variant">{relDate(session.session_date)}</td>
                        <td className="px-6 py-4">{session.sub_category || '—'}</td>
                        <td className="px-6 py-4 font-label font-medium">{Number(session.duration_hours)} hrs</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1 text-primary">
                            {[...Array(3)].map((_, starIndex) => (
                              <span key={starIndex} className={`material-symbols-outlined text-[16px] ${starIndex >= stars ? 'text-surface-container-highest' : ''}`} style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-outline-variant bg-surface-bright flex justify-center">
              <button className="text-primary text-sm font-label font-medium hover:text-primary-container transition-colors">View All Sessions</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ActivityDetail;
