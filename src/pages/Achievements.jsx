import React from 'react';

const Achievements = () => {
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
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-2 tracking-tight font-headline">Kinetic Virtuoso</h2>
            <p className="text-on-surface-variant text-lg text-slate-500">You are in the top 5% of active members this month. Keep the momentum.</p>
          </div>
          <div className="mt-12">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider text-slate-500">Level Progress</span>
              <span className="text-lg font-bold text-primary">8,420 / 10,000 XP</span>
            </div>
            <div className="h-4 bg-surface-container-high rounded-full overflow-hidden w-full bg-slate-100">
              <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{ width: '84%' }}></div>
            </div>
            <p className="text-xs text-on-surface-variant mt-3 text-slate-400">1,580 XP until 'Kinetic Master' rank unlock.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-outline-variant flex flex-col gap-6 shadow-sm">
          <h3 className="text-lg font-bold text-on-surface tracking-tight border-b border-surface-container-high pb-4 uppercase text-xs text-slate-500">Recent Milestones</h3>
          <div className="flex flex-col gap-4 flex-grow">
            {[
              { title: 'Consistency King', desc: '30 consecutive days active', icon: 'verified', active: true },
              { title: 'First 100 Units', desc: 'Logged 100 core activities', icon: 'directions_run', active: false },
            ].map((milestone, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${milestone.active ? 'bg-primary-container/20 text-primary' : 'bg-surface-container-high text-outline bg-slate-100 text-slate-400'}`}>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: milestone.active ? "'FILL' 1" : "" }}>{milestone.icon}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-on-surface text-sm">{milestone.title}</h4>
                  <p className="text-xs text-on-surface-variant text-slate-400">{milestone.desc}</p>
                </div>
              </div>
            ))}
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
          {[
            { title: 'Pioneer', desc: 'Joined within the first year.', icon: 'workspace_premium', colors: 'from-amber-200 to-amber-500', iconColor: 'text-amber-500' },
            { title: 'Deep Flow', desc: '10 hours of uninterrupted focus.', icon: 'water_drop', colors: 'from-blue-300 to-blue-600', iconColor: 'text-blue-500' },
            { title: 'Inferno', desc: '7 day high-intensity streak.', icon: 'local_fire_department', colors: 'from-primary to-primary-container', iconColor: 'text-primary' },
            { title: 'Flawless Week', desc: 'Hit all daily targets for 7 days.', icon: 'diamond', colors: 'from-purple-400 to-purple-600', iconColor: 'text-purple-500' },
          ].map((badge) => (
            <div key={badge.title} className="group bg-white border border-outline-variant rounded-xl p-6 flex flex-col items-center text-center hover:bg-primary-container/5 transition-colors cursor-pointer relative shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none"></div>
              <div className={`w-20 h-20 mb-4 rounded-full bg-gradient-to-br ${badge.colors} p-1`}>
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <span className={`material-symbols-outlined text-4xl ${badge.iconColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>{badge.icon}</span>
                </div>
              </div>
              <h4 className="font-bold text-on-surface text-sm mb-1">{badge.title}</h4>
              <p className="text-xs text-on-surface-variant text-slate-400">{badge.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Targets */}
      <section className="bg-white border border-outline-variant rounded-xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-on-surface tracking-tight mb-8 font-headline">On The Horizon</h2>
        <div className="space-y-8">
          {[
            { title: 'Summit Scaler', desc: 'Complete 50 High-Resistance Sessions', progress: 84, icon: 'mountain_flag' },
            { title: 'Infinite Loop', desc: 'Log 1,000 total hours in any discipline', progress: 62, icon: 'all_inclusive' },
            { title: 'Community Pillar', desc: 'Participate in 20 group challenges', progress: 15, icon: 'groups' },
          ].map((target) => (
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
                <span className="text-sm font-semibold text-primary bg-primary-container/10 px-3 py-1 rounded-full">{target.progress}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden w-full ml-13">
                <div className="h-full bg-primary rounded-full" style={{ width: `${target.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Achievements;
