import React from 'react';

const Archive = () => {
  return (
    <div className="max-w-[1200px] mx-auto w-full pb-10">
      {/* Page Header */}
      <header className="mb-[48px]">
        <h2 className="text-[48px] font-[700] leading-[1.1] font-display text-on-surface tracking-[-0.02em] mb-4 text-5xl">Archived Journeys</h2>
        <p className="text-[18px] font-[400] leading-[1.6] font-body text-on-surface-variant max-w-2xl text-slate-500">
          Review past paths. Some journeys are completed, others paused, and some reset to maintain the integrity of the 10,000-hour discipline.
        </p>
      </header>

      {/* Archived Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
        {/* Card 1: Penalty Reset */}
        <article className="bg-white border border-surface-variant rounded-xl p-[32px] flex flex-col hover:bg-surface-bright transition-colors duration-300 relative overflow-hidden group shadow-sm border-slate-200">
          <div className="absolute top-0 right-0 w-32 h-32 bg-error/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[24px]">architecture</span>
              </div>
              <div>
                <h3 className="text-[24px] font-[600] leading-[1.3] font-headline text-on-surface text-xl">Frontend Architecture</h3>
                <p className="font-body text-[14px] text-on-surface-variant text-slate-400 text-sm">Started Oct 2022</p>
              </div>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-error-container text-on-error-container font-label font-[600] text-[12px] uppercase tracking-[0.05em] text-xs">
              Penalty Reset
            </span>
          </div>
          <div className="mb-8 relative z-10 flex-1">
            <div className="flex justify-between font-label font-[600] text-[14px] text-on-surface mb-2 uppercase tracking-[0.05em] text-xs">
              <span>Hours Logged</span>
              <span>420 / 10k</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-surface-variant w-[4.2%] rounded-full bg-slate-300"></div>
            </div>
            <p className="mt-4 font-body text-[14px] text-on-surface-variant leading-relaxed text-sm text-slate-500">
              Archived due to excessive consecutive missed days. The discipline requires consistent momentum. Reset recommended to rebuild foundational habits.
            </p>
          </div>
          <div className="flex gap-4 mt-auto relative z-10">
            <button className="flex-1 bg-slate-50 border border-outline-variant hover:border-primary hover:text-primary text-on-surface font-label font-[600] text-[14px] py-3 rounded-lg transition-all flex items-center justify-center gap-2 border-slate-200 text-sm">
              <span className="material-symbols-outlined text-[18px]">restart_alt</span>
              Restart Zero
            </button>
            <button className="flex-1 bg-transparent border border-outline-variant hover:bg-slate-50 text-on-surface font-label font-[600] text-[14px] py-3 rounded-lg transition-all flex items-center justify-center gap-2 border-slate-200 text-sm">
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              View Logs
            </button>
          </div>
        </article>

        {/* Card 2: Paused */}
        <article className="bg-white border border-surface-variant rounded-xl p-[32px] flex flex-col hover:bg-surface-bright transition-colors duration-300 relative overflow-hidden group shadow-sm border-slate-200">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[24px]">piano</span>
              </div>
              <div>
                <h3 className="text-[24px] font-[600] leading-[1.3] font-headline text-on-surface text-xl">Classical Piano</h3>
                <p className="font-body text-[14px] text-on-surface-variant text-slate-400 text-sm">Started Jan 2021</p>
              </div>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-on-surface-variant font-label font-[600] text-[12px] uppercase tracking-[0.05em] text-xs">
              Goal Shift
            </span>
          </div>
          <div className="mb-8 relative z-10 flex-1">
            <div className="flex justify-between font-label font-[600] text-[14px] text-on-surface mb-2 uppercase tracking-[0.05em] text-xs">
              <span>Hours Logged</span>
              <span>1,250 / 10k</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-surface-variant w-[12.5%] rounded-full bg-slate-300"></div>
            </div>
            <p className="mt-4 font-body text-[14px] text-on-surface-variant leading-relaxed text-sm text-slate-500">
              Intentionally paused to allocate focus bandwidth to primary career objectives. Foundation is solid; ready to be resumed when capacity allows.
            </p>
          </div>
          <div className="flex gap-4 mt-auto relative z-10">
            <button className="flex-1 bg-primary hover:opacity-90 text-on-primary font-label font-[600] text-[14px] py-3 rounded-lg transition-all flex items-center justify-center gap-2 text-sm">
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
              Resume
            </button>
            <button className="flex-1 bg-transparent border border-outline-variant hover:bg-slate-50 text-on-surface font-label font-[600] text-[14px] py-3 rounded-lg transition-all flex items-center justify-center gap-2 border-slate-200 text-sm">
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              View Logs
            </button>
          </div>
        </article>

        {/* Card 3: Completed / Evolved */}
        <article className="bg-white border border-surface-variant rounded-xl p-[32px] flex flex-col hover:bg-surface-bright transition-colors duration-300 relative overflow-hidden group lg:col-span-2 shadow-sm border-slate-200">
          <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary/5 rounded-bl-full -mr-32 -mt-32 transition-transform group-hover:scale-105"></div>
          <div className="flex flex-col md:flex-row gap-8 relative z-10">
            <div className="flex-1">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-[24px]">memory</span>
                  </div>
                  <div>
                    <h3 className="text-[24px] font-[600] leading-[1.3] font-headline text-on-surface text-xl">Machine Learning</h3>
                    <p className="font-body text-[14px] text-on-surface-variant text-slate-400 text-sm">Started Mar 2020</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container font-label font-[600] text-[12px] uppercase tracking-[0.05em] text-xs">
                  Evolved
                </span>
              </div>
              <p className="font-body text-[16px] text-on-surface-variant leading-relaxed max-w-lg mb-6 text-sm text-slate-500">
                Journey naturally evolved into practical application rather than pure study. The foundational 3,000 hours established the necessary competence for current project integration.
              </p>
              <div className="flex gap-4">
                <button className="bg-slate-50 border border-outline-variant hover:border-primary hover:text-primary text-on-surface font-label font-[600] text-[14px] py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 border-slate-200 text-sm">
                  <span className="material-symbols-outlined text-[18px]">unarchive</span>
                  Reactivate
                </button>
              </div>
            </div>
            <div className="flex-1 md:border-l md:border-surface-variant md:pl-8 flex flex-col justify-center">
              <div className="mb-4">
                <div className="flex justify-between font-label font-[600] text-[14px] text-on-surface mb-2 uppercase tracking-[0.05em] text-xs">
                  <span>Hours Logged</span>
                  <span>3,450 / 10k</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary w-[34.5%] rounded-full"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="font-label text-[12px] text-on-surface-variant uppercase tracking-[0.05em] mb-1 text-xs text-slate-400">Consistency</p>
                  <p className="font-display text-[24px] font-bold text-on-surface text-xl">82%</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="font-label text-[12px] text-on-surface-variant uppercase tracking-[0.05em] mb-1 text-xs text-slate-400">Deep Work</p>
                  <p className="font-display text-[24px] font-bold text-on-surface text-xl">2.1k<span className="text-[14px] font-body font-normal text-on-surface-variant ml-1 text-sm">hrs</span></p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Archive;
