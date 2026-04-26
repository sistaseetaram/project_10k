import React from 'react';

const Logs = () => {
  return (
    <div className="flex-1 overflow-y-auto w-full max-w-[1200px] mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-bold text-on-surface tracking-tight">Record Session</h1>
        <p className="text-on-surface-variant mt-2 text-sm max-w-2xl text-slate-500">Log your focused hours and detail your progress. Every entry builds momentum.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Form Area */}
        <div className="lg:col-span-8 space-y-6">
          <form className="bg-white rounded-xl border border-outline-variant p-6 lg:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6 border-b border-outline-variant pb-4">
              <span className="material-symbols-outlined text-primary">edit_document</span>
              <h2 className="font-label font-bold text-on-surface uppercase tracking-wider text-sm font-semibold">Session Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Activity Focus */}
              <div className="space-y-2 md:col-span-2">
                <label className="block font-label text-sm font-semibold text-on-surface-variant text-slate-600" htmlFor="focus">Activity Focus</label>
                <select className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary-container transition-all appearance-none cursor-pointer" id="focus">
                  <option disabled defaultValue="" value="">Select primary activity area...</option>
                  <option value="coding">Software Development</option>
                  <option value="design">UI/UX Design</option>
                  <option value="writing">Technical Writing</option>
                  <option value="research">Research & Strategy</option>
                </select>
              </div>

              {/* Sub-Category */}
              <div className="space-y-2">
                <label className="block font-label text-sm font-semibold text-on-surface-variant text-slate-600" htmlFor="subcategory">Sub-Category</label>
                <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary-container transition-all placeholder-outline" id="subcategory" placeholder="e.g. Component Architecture" type="text" />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="block font-label text-sm font-semibold text-on-surface-variant text-slate-600" htmlFor="date">Date</label>
                <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary-container transition-all" id="date" type="date" />
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <label className="block font-label text-sm font-semibold text-on-surface-variant text-slate-600" htmlFor="duration">Duration (Hours)</label>
                <div className="relative">
                  <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary-container transition-all pr-12 font-headline text-lg" id="duration" min="0.5" placeholder="0.0" step="0.5" type="number" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-label text-sm">hrs</span>
                </div>
              </div>

              {/* Intensity */}
              <div className="space-y-2">
                <label className="block font-label text-sm font-semibold text-on-surface-variant mb-1 text-slate-600">Perceived Intensity</label>
                <div className="flex bg-surface-container-low p-1 rounded-lg border border-outline-variant h-[50px] bg-slate-100">
                  <label className="flex-1 cursor-pointer">
                    <input className="peer sr-only" name="intensity" type="radio" value="low" />
                    <div className="h-full flex items-center justify-center rounded-md text-sm font-medium text-on-surface-variant peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm transition-all">Low</div>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input defaultChecked className="peer sr-only" name="intensity" type="radio" value="medium" />
                    <div className="h-full flex items-center justify-center rounded-md text-sm font-medium text-on-surface-variant peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm transition-all">Medium</div>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input className="peer sr-only" name="intensity" type="radio" value="high" />
                    <div className="h-full flex items-center justify-center rounded-md text-sm font-medium text-on-surface-variant peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm transition-all">High</div>
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2 md:col-span-2 mt-2">
                <label className="block font-label text-sm font-semibold text-on-surface-variant text-slate-600" htmlFor="notes">Session Notes & Reflections</label>
                <textarea className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary-container transition-all placeholder-outline resize-y" id="notes" placeholder="What were the key breakthroughs or challenges?" rows="4"></textarea>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-end gap-4 border-t border-outline-variant pt-6">
              <button className="px-6 py-2.5 rounded-lg font-label font-semibold text-on-surface-variant hover:bg-surface-container transition-colors text-slate-500" type="button">Cancel</button>
              <button className="px-8 py-2.5 bg-primary text-on-primary rounded-lg font-label font-semibold hover:opacity-90 active:scale-95 transition-all shadow-sm flex items-center gap-2" type="submit">
                <span className="material-symbols-outlined text-sm">save</span>
                Log Session
              </button>
            </div>
          </form>
        </div>

        {/* Contextual Widgets Side Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Current Streak Widget */}
          <div className="bg-white rounded-xl border border-outline-variant p-6 flex items-center gap-5 relative overflow-hidden group shadow-sm">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary-container opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity"></div>
            <div className="w-14 h-14 rounded-full bg-secondary-container text-primary flex items-center justify-center shrink-0 z-10">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            </div>
            <div className="z-10">
              <p className="font-label text-sm text-on-surface-variant font-semibold uppercase tracking-wider mb-1 text-slate-500">Current Streak</p>
              <div className="flex items-baseline gap-1">
                <span className="font-headline text-3xl font-bold text-on-surface">14</span>
                <span className="text-on-surface-variant font-medium text-slate-500">Days</span>
              </div>
            </div>
          </div>

          {/* Projected Mastery Widget */}
          <div className="bg-white rounded-xl border border-outline-variant p-6 shadow-sm">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="font-label text-sm text-on-surface-variant font-semibold uppercase tracking-wider mb-1 text-slate-500">Projected Mastery</p>
                <h3 className="font-headline text-2xl font-bold text-on-surface">3,240 <span className="text-sm font-normal text-on-surface-variant text-slate-400">/ 10k hrs</span></h3>
              </div>
              <div className="bg-primary-container/20 text-primary px-3 py-1 rounded-full text-xs font-bold">
                32.4%
              </div>
            </div>
            <div className="w-full bg-surface-container-high rounded-full h-3 mb-2 overflow-hidden bg-slate-100">
              <div className="bg-primary h-full rounded-full relative" style={{ width: '32.4%' }}>
                <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/30 rounded-r-full"></div>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant text-right text-slate-400">On track for Q4 2026</p>
          </div>

          {/* Recent Activity Mini-List */}
          <div className="bg-white rounded-xl border border-outline-variant p-6 shadow-sm">
            <h4 className="font-label font-bold text-sm text-on-surface-variant uppercase tracking-wider mb-4 border-b border-outline-variant pb-2 text-slate-500">Recent Logs</h4>
            <ul className="space-y-4">
              {[
                { title: 'UI Component Library', time: 'Yesterday • 4.5 hrs', active: true },
                { title: 'System Architecture', time: 'Oct 12 • 2.0 hrs', active: false },
                { title: 'Algorithm Optimization', time: 'Oct 10 • 3.5 hrs', active: false },
              ].map((log, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${log.active ? 'bg-primary' : 'bg-outline-variant'}`}></div>
                  <div>
                    <p className="text-sm font-semibold text-on-surface">{log.title}</p>
                    <p className="text-xs text-on-surface-variant text-slate-400">{log.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;
