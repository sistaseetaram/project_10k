import React from 'react';

const Analytics = () => {
  return (
    <div className="max-w-[1200px] mx-auto w-full pb-section">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-2 font-headline tracking-tight">Coordinated Analytics</h1>
        <p className="text-lg text-on-surface-variant max-w-2xl text-slate-500">Tracking momentum, distribution, and the clear path toward mastery.</p>

        <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-surface-variant pb-2">
          <div className="flex flex-wrap gap-2">
            {['Global Overview', 'Violin Mastery', 'UI/UX Design', 'Physical Fitness'].map((tab, i) => (
              <button key={tab} className={`px-6 py-2.5 text-sm font-medium transition-all border-b-2 active:scale-95 ${i === 0 ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-primary hover:bg-primary/5'}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="relative flex-1 max-w-sm">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">search</span>
              <input className="w-full pl-10 pr-10 py-2 bg-surface-container-low border border-surface-variant rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-slate-100" placeholder="Search activities..." type="text" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-surface-variant rounded flex items-center">
                <span className="material-symbols-outlined text-on-surface-variant text-xl">filter_list</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card: Global Mastery Progress */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-white border border-surface-variant rounded-xl p-8 hover:bg-primary-container/5 transition-colors duration-300 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider text-slate-500">Global Mastery Progress</h2>
              <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-semibold tracking-wide uppercase">PRACTITIONER</span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-bold text-primary">1,248</span>
              <span className="text-lg text-on-surface-variant text-slate-400">/ 10,000 units</span>
            </div>
            <p className="text-sm text-on-surface-variant mb-8 text-slate-500">You are currently in the crucial phase of habit crystallization. Maintain consistent daily volume to breach the next tier.</p>
          </div>
          <div>
            <div className="flex justify-between text-xs text-on-surface-variant mb-2 text-slate-400">
              <span>0</span>
              <span className="font-medium text-primary">12.48%</span>
              <span>10k</span>
            </div>
            <div className="w-full bg-surface-container h-4 rounded-full overflow-hidden flex bg-slate-100">
              <div className="bg-primary h-full rounded-full transition-all duration-1000 ease-out" style={{ width: '12.48%' }}></div>
            </div>
          </div>
        </div>

        {/* Card: Current Streak */}
        <div className="col-span-1 bg-white border border-surface-variant rounded-xl p-8 hover:bg-primary-container/5 transition-colors duration-300 flex flex-col justify-center items-center text-center shadow-sm">
          <h2 className="text-sm font-bold text-on-surface-variant mb-6 w-full text-left uppercase tracking-wider text-slate-500">Current Streak</h2>
          <div className="w-24 h-24 rounded-full bg-primary-container/20 flex items-center justify-center mb-6 border-4 border-primary-container/40">
            <span className="material-symbols-outlined text-primary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold text-on-surface tracking-tight">14</span>
            <span className="text-lg text-on-surface-variant text-slate-500">Days consecutive</span>
          </div>
          <div className="mt-8 w-full">
            <div className="flex justify-between text-xs text-on-surface-variant mb-2 text-slate-400">
              <span>Personal Best</span>
              <span className="font-bold text-on-surface">22 Days</span>
            </div>
            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden bg-slate-100">
              <div className="bg-secondary h-full rounded-full" style={{ width: '63%' }}></div>
            </div>
          </div>
        </div>

        {/* Card: Skill Distribution */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-white border border-surface-variant rounded-xl p-8 hover:bg-primary-container/5 transition-colors duration-300 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider text-slate-500">Skill Distribution</h2>
            <span className="material-symbols-outlined text-on-surface-variant">bar_chart</span>
          </div>
          <div className="space-y-6">
            {[
              { label: 'Deep Work (Focus)', hours: 520, percent: 52, color: 'bg-primary' },
              { label: 'Active Practice', hours: 410, percent: 41, color: 'bg-secondary' },
              { label: 'Theoretical Study', hours: 205, percent: 20, color: 'bg-tertiary' },
              { label: 'Review & Planning', hours: 113, percent: 11, color: 'bg-outline' },
            ].map((skill) => (
              <div key={skill.label}>
                <div className="flex justify-between text-xs text-on-surface mb-2 font-medium">
                  <span>{skill.label}</span>
                  <span>{skill.hours} hrs</span>
                </div>
                <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden bg-slate-100">
                  <div className={`${skill.color} h-full rounded-full`} style={{ width: `${skill.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card: Roadmap to Master (Timeline) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-white border border-surface-variant rounded-xl p-8 hover:bg-primary-container/5 transition-colors duration-300 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider text-slate-500">Roadmap to Master</h2>
            <span className="material-symbols-outlined text-on-surface-variant">timeline</span>
          </div>
          <div className="relative ml-4 md:ml-8 mt-4">
            <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-surface-container bg-slate-100"></div>
            <div className="absolute left-[7px] top-2 h-[45%] w-[2px] bg-primary"></div>

            {[
              { title: 'Novice Phase', desc: '0 - 100 Hours. Initial friction overcome. Baseline routines established.', status: 'done' },
              { title: 'Apprentice Level', desc: '101 - 1,000 Hours. Consistent execution. Core mechanics understood.', status: 'done' },
              { title: 'Practitioner Tier', desc: '1,001 - 5,000 Hours. Autonomy developed. Complex problem solving begins.', status: 'current' },
              { title: 'Expert Domain', desc: '5,001 - 9,000 Hours. Intuitive grasp of the field. Innovation over repetition.', status: 'upcoming' },
              { title: 'Mastery Achieved', desc: '10,000 Hours. Unconscious competence. The kinetic light is fully realized.', status: 'final' },
            ].map((milestone, i) => (
              <div key={i} className={`relative flex items-start mb-10 group ${milestone.status === 'upcoming' ? 'opacity-60' : milestone.status === 'final' ? 'opacity-40' : ''}`}>
                {milestone.status === 'current' ? (
                  <div className="absolute -left-[9px] top-0 w-6 h-6 rounded-full bg-white border-4 border-primary z-10 shadow-sm flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                ) : (
                  <div className={`absolute -left-[5px] top-1 w-4 h-4 rounded-full border-2 border-surface-container-lowest z-10 shadow-sm ${milestone.status === 'done' ? 'bg-primary' : milestone.status === 'final' ? 'bg-white border-outline-variant border-dashed' : 'bg-white border-outline'}`}></div>
                )}

                <div className={`ml-8 ${milestone.status === 'current' ? 'bg-surface-container-low p-4 rounded-lg border border-primary/20 bg-slate-50' : ''}`}>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className={`text-xl font-bold ${milestone.status === 'current' ? 'text-primary' : 'text-on-surface'}`}>{milestone.title}</h3>
                    {milestone.status === 'current' && <span className="text-xs font-bold text-primary bg-primary-container/20 px-2 py-0.5 rounded uppercase">CURRENT</span>}
                  </div>
                  <p className="text-sm text-on-surface-variant text-slate-500">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
