import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-xl max-w-7xl mx-auto pb-section">
      <header className="mb-xl">
        <h2 className="font-headline text-headline-lg text-on-surface text-3xl font-bold">Dashboard</h2>
        <p className="font-body text-body-md text-on-surface-variant mt-1 text-lg">Your kinetic momentum across all active disciplines.</p>
      </header>

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
              3,240 <span className="text-headline-md text-outline text-2xl font-normal text-slate-400">/ 10,000 hrs</span>
            </div>
          </div>
          <div className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full font-label text-label-sm flex items-center gap-2 self-start md:self-auto border border-outline-variant/30 text-xs font-medium">
            <span className="material-symbols-outlined text-[16px]">trending_up</span> Top 5% Global Pace
          </div>
        </div>
        <div className="relative z-10 mt-8">
          <div className="w-full h-6 bg-surface-container-high rounded-full overflow-hidden border border-outline-variant/50">
            <div className="h-full bg-primary rounded-full relative transition-all duration-1000 ease-out" style={{ width: '32.4%' }}>
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
          <button className="text-primary font-label text-label-sm uppercase tracking-wide hover:underline flex items-center gap-1 text-xs font-semibold">
            View All <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-outline-variant rounded-xl p-6 hover:border-primary/50 hover:bg-surface-container-low transition-all duration-300 group cursor-pointer shadow-sm">
            <div className="flex items-start justify-between mb-8">
              <div className="w-12 h-12 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed-variant flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
                <span className="material-symbols-outlined text-[24px]">music_note</span>
              </div>
              <span className="font-label text-[10px] font-bold uppercase tracking-wider text-on-surface-variant bg-surface-variant px-2 py-1 rounded">Arts</span>
            </div>
            <h4 className="font-headline text-[20px] font-semibold text-on-surface mb-1 text-xl">Violin Mastery</h4>
            <p className="font-body text-sm text-outline mb-6 text-slate-500">Focus: Technical Etudes</p>
            <div className="flex justify-between items-end mb-2">
              <span className="font-label text-label-sm text-on-surface-variant text-xs">1,200 hrs</span>
              <span className="font-label text-[10px] text-primary font-bold">12%</span>
            </div>
            <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full group-hover:bg-inverse-primary transition-colors" style={{ width: '12%' }}></div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white border border-outline-variant rounded-xl p-6 hover:border-primary/50 hover:bg-surface-container-low transition-all duration-300 group cursor-pointer shadow-sm">
            <div className="flex items-start justify-between mb-8">
              <div className="w-12 h-12 rounded-lg bg-secondary-fixed text-on-secondary-fixed-variant flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
                <span className="material-symbols-outlined text-[24px]">design_services</span>
              </div>
              <span className="font-label text-[10px] font-bold uppercase tracking-wider text-on-surface-variant bg-surface-variant px-2 py-1 rounded">Career</span>
            </div>
            <h4 className="font-headline text-[20px] font-semibold text-on-surface mb-1 text-xl">UI/UX Design</h4>
            <p className="font-body text-sm text-outline mb-6 text-slate-500">Focus: Design Systems</p>
            <div className="flex justify-between items-end mb-2">
              <span className="font-label text-label-sm text-on-surface-variant text-xs">1,850 hrs</span>
              <span className="font-label text-[10px] text-primary font-bold">18.5%</span>
            </div>
            <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full group-hover:bg-inverse-primary transition-colors" style={{ width: '18.5%' }}></div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white border border-outline-variant rounded-xl p-6 hover:border-primary/50 hover:bg-surface-container-low transition-all duration-300 group cursor-pointer shadow-sm">
            <div className="flex items-start justify-between mb-8">
              <div className="w-12 h-12 rounded-lg bg-primary-fixed-dim text-on-primary-fixed-variant flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
                <span className="material-symbols-outlined text-[24px]">directions_run</span>
              </div>
              <span className="font-label text-[10px] font-bold uppercase tracking-wider text-on-surface-variant bg-surface-variant px-2 py-1 rounded">Health</span>
            </div>
            <h4 className="font-headline text-[20px] font-semibold text-on-surface mb-1 text-xl">Physical Fitness</h4>
            <p className="font-body text-sm text-outline mb-6 text-slate-500">Focus: Endurance</p>
            <div className="flex justify-between items-end mb-2">
              <span className="font-label text-label-sm text-on-surface-variant text-xs">190 hrs</span>
              <span className="font-label text-[10px] text-primary font-bold">1.9%</span>
            </div>
            <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full group-hover:bg-inverse-primary transition-colors" style={{ width: '1.9%' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Row: Streak & Consistency */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Streak Component */}
        <div className="lg:col-span-4 bg-white border border-outline-variant rounded-xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-error-container via-error to-error-container"></div>
          <div className="w-20 h-20 rounded-full bg-error-container text-on-error-container flex items-center justify-center mb-6 mt-4 ring-8 ring-error-container/30">
            <span className="material-symbols-outlined text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
          </div>
          <div className="font-display text-[64px] font-bold tracking-[-0.02em] text-on-surface leading-none mb-2 text-6xl">14</div>
          <h4 className="font-label text-label-bold text-outline uppercase tracking-widest text-sm font-semibold text-slate-500">Day Streak</h4>
          <p className="font-body text-sm text-on-surface-variant mt-4 bg-surface-container px-4 py-2 rounded-full text-xs">Personal Best: 42 days</p>
        </div>
        {/* Consistency Heatmap */}
        <div className="lg:col-span-8 bg-white border border-outline-variant rounded-xl p-8 flex flex-col shadow-sm">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h4 className="font-headline text-[20px] font-semibold text-on-surface text-xl">Consistency Map</h4>
              <p className="font-body text-sm text-outline mt-1 text-slate-500">Activity over the last 30 days</p>
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
          {/* Simulated Heatmap Grid */}
          <div className="flex-1 flex items-center justify-center bg-surface-bright border border-surface-variant rounded-lg p-6">
            <div className="flex gap-1 overflow-x-auto w-full max-w-full no-scrollbar pb-2">
              {[...Array(7)].map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {[...Array(7)].map((_, dayIndex) => {
                    const colors = ['bg-surface-container-high', 'bg-primary-fixed-dim', 'bg-secondary-fixed', 'bg-primary'];
                    const color = weekIndex === 6 && dayIndex === 4
                      ? 'bg-primary-fixed-dim ring-2 ring-primary ring-offset-1 ring-offset-surface'
                      : (weekIndex === 6 && dayIndex > 4 ? 'bg-surface-container-lowest border border-dashed border-outline-variant' : colors[Math.floor(Math.random() * colors.length)]);
                    return (
                      <div key={dayIndex} className={`w-4 h-4 sm:w-6 sm:h-6 rounded-[3px] ${color}`}></div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
