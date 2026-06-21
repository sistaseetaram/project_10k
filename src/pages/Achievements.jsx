import React, { useMemo } from 'react';
import { useDisciplines } from '../hooks/useDisciplines';
import { useSessions } from '../hooks/useSessions';
import { computeMetrics } from '../hooks/useMetrics';

function fmt(n) {
  return Math.round(n).toLocaleString();
}

function rankFor(totalHours) {
  if (totalHours < 100) return 'Novice';
  if (totalHours < 1000) return 'Apprentice';
  if (totalHours < 2500) return 'Journeyman';
  if (totalHours < 5000) return 'Craftsman';
  if (totalHours < 10000) return 'Virtuoso';
  return 'Master';
}

const Achievements = () => {
  const { disciplines, loading: dLoading } = useDisciplines();
  const { sessions, loading: sLoading } = useSessions();
  const loading = dLoading || sLoading;
  const m = useMemo(() => computeMetrics(disciplines, sessions), [disciplines, sessions]);

  const rank = rankFor(m.totalHours);
  const xpTarget = 10000;
  const xpPct = Math.min(100, (m.xp / xpTarget) * 100);
  const xpToNext = Math.max(0, xpTarget - m.xp);

  // Badge definitions: earned/unearned derived from real thresholds.
  const badges = useMemo(() => [
    { title: 'First Session', desc: 'Log your first session.', icon: 'flag', colors: 'from-amber-200 to-amber-500', iconColor: 'text-amber-500', earned: m.sessionCount >= 1, value: m.sessionCount, target: 1, unit: 'sessions' },
    { title: '10 Hours', desc: 'Log 10 total hours.', icon: 'water_drop', colors: 'from-blue-300 to-blue-600', iconColor: 'text-blue-500', earned: m.totalHours >= 10, value: m.totalHours, target: 10, unit: 'hrs' },
    { title: '100 Hours', desc: 'Log 100 total hours.', icon: 'workspace_premium', colors: 'from-emerald-300 to-emerald-600', iconColor: 'text-emerald-500', earned: m.totalHours >= 100, value: m.totalHours, target: 100, unit: 'hrs' },
    { title: '7-Day Streak', desc: 'Practice 7 consecutive days.', icon: 'local_fire_department', colors: 'from-primary to-primary-container', iconColor: 'text-primary', earned: m.bestStreak >= 7, value: m.bestStreak, target: 7, unit: 'days' },
    { title: '30-Day Streak', desc: 'Practice 30 consecutive days.', icon: 'diamond', colors: 'from-purple-400 to-purple-600', iconColor: 'text-purple-500', earned: m.bestStreak >= 30, value: m.bestStreak, target: 30, unit: 'days' },
    { title: '1000 Hours', desc: 'Log 1,000 total hours.', icon: 'military_tech', colors: 'from-rose-300 to-rose-600', iconColor: 'text-rose-500', earned: m.totalHours >= 1000, value: m.totalHours, target: 1000, unit: 'hrs' },
  ], [m]);

  const earnedBadges = badges.filter((b) => b.earned);
  const upcoming = badges.filter((b) => !b.earned);
  const recentMilestones = earnedBadges.slice(-2).reverse();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="animate-pulse grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-72 rounded-xl bg-surface-container-high" />
          <div className="h-72 rounded-xl bg-surface-container-high" />
        </div>
        <div className="animate-pulse grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => <div key={i} className="h-48 rounded-xl bg-surface-container-high" />)}
        </div>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border border-outline-variant rounded-xl p-16 text-center shadow-sm">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant text-slate-300 mb-4">emoji_events</span>
          <h2 className="text-2xl font-bold text-on-surface mb-2 font-headline">No achievements yet</h2>
          <p className="text-on-surface-variant text-slate-500">Log sessions to start earning badges and ranking up.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-16">
      {/* Hero/Mastery Overview */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        <div className="col-span-1 lg:col-span-2 bg-white rounded-xl p-8 border border-outline-variant flex flex-col justify-between relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-wider uppercase mb-4">
              <span className="material-symbols-outlined text-[14px]">stars</span>
              Current Mastery
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-2 tracking-tight font-headline">{rank}</h2>
            <p className="text-on-surface-variant text-lg text-slate-500">You have earned {earnedBadges.length} of {badges.length} badges. Keep the momentum.</p>
          </div>
          <div className="mt-12">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider text-slate-500">Level Progress</span>
              <span className="text-lg font-bold text-primary">{fmt(m.xp)} / {fmt(xpTarget)} XP</span>
            </div>
            <div className="h-4 bg-surface-container-high rounded-full overflow-hidden w-full bg-slate-100">
              <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{ width: `${Math.max(xpPct, 0.5)}%` }}></div>
            </div>
            <p className="text-xs text-on-surface-variant mt-3 text-slate-400">{fmt(xpToNext)} XP until 'Master' rank unlock.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-outline-variant flex flex-col gap-6 shadow-sm">
          <h3 className="text-lg font-bold text-on-surface tracking-tight border-b border-surface-container-high pb-4 uppercase text-xs text-slate-500">Recent Milestones</h3>
          <div className="flex flex-col gap-4 flex-grow">
            {recentMilestones.length === 0 ? (
              <p className="text-sm text-on-surface-variant text-slate-400">No milestones earned yet — keep logging.</p>
            ) : (
              recentMilestones.map((milestone, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-primary-container/20 text-primary">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{milestone.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-on-surface text-sm">{milestone.title}</h4>
                    <p className="text-xs text-on-surface-variant text-slate-400">{milestone.desc}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <button className="w-full py-3 px-4 border border-outline text-on-surface-variant rounded-lg font-semibold text-sm hover:bg-surface-container-low transition-colors text-center mt-auto text-slate-500 border-slate-200">
            View Log History
          </button>
        </div>
      </section>

      {/* Unlocked Badges Gallery */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-on-surface tracking-tight font-headline">Trophy Cabinet</h2>
            <p className="text-on-surface-variant mt-1 text-slate-500">Badges earned through dedicated practice.</p>
          </div>
          <div className="hidden sm:flex gap-2">
            {['All', 'Rare', 'Epic'].map((filter, i) => (
              <button key={filter} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${i === 0 ? 'bg-surface-container-high text-on-surface bg-slate-200' : 'text-on-surface-variant hover:bg-surface-container text-slate-500'}`}>
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {badges.map((badge) => (
            <div key={badge.title} className={`group bg-white border border-outline-variant rounded-xl p-6 flex flex-col items-center text-center hover:bg-primary-container/5 transition-colors cursor-pointer relative shadow-sm ${badge.earned ? '' : 'opacity-60'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none"></div>
              <div className={`w-20 h-20 mb-4 rounded-full bg-gradient-to-br ${badge.earned ? badge.colors : 'from-slate-200 to-slate-300'} p-1`}>
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <span className={`material-symbols-outlined text-4xl ${badge.earned ? badge.iconColor : 'text-slate-400'}`} style={{ fontVariationSettings: badge.earned ? "'FILL' 1" : '' }}>{badge.earned ? badge.icon : 'lock'}</span>
                </div>
              </div>
              <h4 className="font-bold text-on-surface text-sm mb-1">{badge.title}</h4>
              <p className="text-xs text-on-surface-variant text-slate-400">{badge.desc}</p>
              {!badge.earned && (
                <div className="w-full mt-3">
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden w-full">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${Math.max(Math.min(100, (badge.value / badge.target) * 100), 0.5)}%` }}></div>
                  </div>
                  <p className="text-[10px] text-on-surface-variant text-slate-400 mt-1">{fmt(badge.value)} / {fmt(badge.target)} {badge.unit}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Targets */}
      <section className="bg-white border border-outline-variant rounded-xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-on-surface tracking-tight mb-8 font-headline">On The Horizon</h2>
        <div className="space-y-8">
          {upcoming.length === 0 ? (
            <p className="text-on-surface-variant text-slate-500">Every badge earned. You are unstoppable.</p>
          ) : (
            upcoming.map((target) => {
              const progress = Math.min(100, (target.value / target.target) * 100);
              return (
                <div key={target.title}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-on-surface-variant text-slate-400">
                        <span className="material-symbols-outlined">{target.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-on-surface text-sm">{target.title}</h4>
                        <p className="text-xs text-on-surface-variant text-slate-400">{target.desc}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-primary bg-primary-container/10 px-3 py-1 rounded-full">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden w-full ml-13">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${Math.max(progress, 0.5)}%` }}></div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

export default Achievements;
