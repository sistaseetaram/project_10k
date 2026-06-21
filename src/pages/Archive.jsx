import React, { useMemo, useState } from 'react';
import { useDisciplines } from '../hooks/useDisciplines';
import { useSessions } from '../hooks/useSessions';

function fmt(n) {
  return Math.round(n).toLocaleString();
}

const Archive = () => {
  const { disciplines, loading: dLoading, setArchived } = useDisciplines({ includeArchived: true });
  const { sessions, loading: sLoading } = useSessions();
  const loading = dLoading || sLoading;

  const [busyId, setBusyId] = useState(null);

  const hoursById = useMemo(() => {
    const map = {};
    for (const s of sessions) {
      map[s.discipline_id] = (map[s.discipline_id] || 0) + Number(s.duration_hours || 0);
    }
    return map;
  }, [sessions]);

  const archived = disciplines.filter((d) => d.archived === true);

  const restore = async (id) => {
    setBusyId(id);
    try {
      await setArchived(id, false);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full pb-10">
      {/* Page Header */}
      <header className="mb-[48px]">
        <h2 className="text-[48px] font-[700] leading-[1.1] font-display text-on-surface tracking-[-0.02em] mb-4 text-5xl">Archived Journeys</h2>
        <p className="text-[18px] font-[400] leading-[1.6] font-body text-on-surface-variant max-w-2xl text-slate-500">
          Review past paths. Some journeys are completed, others paused, and some reset to maintain the integrity of the 10,000-hour discipline.
        </p>
      </header>

      {loading ? (
        <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
          <div className="h-64 rounded-xl bg-surface-container-high" />
          <div className="h-64 rounded-xl bg-surface-container-high" />
        </div>
      ) : archived.length === 0 ? (
        <div className="bg-white border border-surface-variant rounded-xl p-16 text-center shadow-sm border-slate-200">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant text-slate-300 mb-4">inventory_2</span>
          <h3 className="text-2xl font-bold text-on-surface mb-2 font-headline">No archived journeys.</h3>
          <p className="text-on-surface-variant text-slate-500">Disciplines you archive will appear here, ready to be restored.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
          {archived.map((d) => {
            const hours = hoursById[d.id] || 0;
            const target = d.target_hours || 10000;
            const pct = target ? (hours / target) * 100 : 0;
            return (
              <article key={d.id} className="bg-white border border-surface-variant rounded-xl p-[32px] flex flex-col hover:bg-surface-bright transition-colors duration-300 relative overflow-hidden group shadow-sm border-slate-200">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-[24px]">{d.icon || 'inventory_2'}</span>
                    </div>
                    <div>
                      <h3 className="text-[24px] font-[600] leading-[1.3] font-headline text-on-surface text-xl">{d.name}</h3>
                      <p className="font-body text-[14px] text-on-surface-variant text-slate-400 text-sm">{d.category || 'Archived'}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-on-surface-variant font-label font-[600] text-[12px] uppercase tracking-[0.05em] text-xs">
                    Archived
                  </span>
                </div>
                <div className="mb-8 relative z-10 flex-1">
                  <div className="flex justify-between font-label font-[600] text-[14px] text-on-surface mb-2 uppercase tracking-[0.05em] text-xs">
                    <span>Hours Logged</span>
                    <span>{fmt(hours)} / 10k</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-surface-variant rounded-full bg-slate-300" style={{ width: `${Math.max(pct, 0.5)}%` }}></div>
                  </div>
                  {d.focus && (
                    <p className="mt-4 font-body text-[14px] text-on-surface-variant leading-relaxed text-sm text-slate-500">
                      Focus: {d.focus}
                    </p>
                  )}
                </div>
                <div className="flex gap-4 mt-auto relative z-10">
                  <button
                    onClick={() => restore(d.id)}
                    disabled={busyId === d.id}
                    className="flex-1 bg-primary hover:opacity-90 text-on-primary font-label font-[600] text-[14px] py-3 rounded-lg transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60"
                  >
                    <span className="material-symbols-outlined text-[18px]">unarchive</span>
                    {busyId === d.id ? 'Restoring…' : 'Restore'}
                  </button>
                  <button className="flex-1 bg-transparent border border-outline-variant hover:bg-slate-50 text-on-surface font-label font-[600] text-[14px] py-3 rounded-lg transition-all flex items-center justify-center gap-2 border-slate-200 text-sm">
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                    View Logs
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Archive;
