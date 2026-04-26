import React from 'react';

const ActivityDetail = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-gutter space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm font-label text-outline uppercase tracking-wider text-slate-500 font-semibold">
            <span className="material-symbols-outlined text-[18px]">folder_special</span>
            <span>Coordinated Activity</span>
          </div>
          <h2 className="text-4xl font-display font-bold text-on-surface tracking-tight leading-tight">Front-End Architecture</h2>
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

      {/* Momentum Warning Banner */}
      <div className="bg-error-container text-on-error-container rounded-lg p-4 flex items-start gap-3 border border-red-200 shadow-sm">
        <span className="material-symbols-outlined mt-0.5 text-on-error-container">warning</span>
        <div>
          <h4 className="font-label font-bold text-sm mb-1">Momentum Warning</h4>
          <p className="text-sm font-body opacity-90 leading-relaxed">It has been 6 days since your last focused session in this domain. Consistent, spaced repetition is critical for maintaining complex mental models like application state routing.</p>
        </div>
      </div>

      {/* Bento Grid: Stats & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mastery Progress Card */}
        <div className="col-span-1 bg-white rounded-xl border border-outline-variant p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <div>
            <h3 className="font-label font-semibold text-on-surface-variant uppercase tracking-widest text-xs mb-6">Total Mastery</h3>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-6xl font-display font-bold text-primary tracking-tighter">34<span className="text-3xl text-primary/70">%</span></span>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs font-label text-outline mb-2 text-slate-500">
              <span>3,400 Hours Logged</span>
              <span>10,000 Goal</span>
            </div>
            <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{ width: '34%' }}></div>
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
            {/* Unit 1 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-body text-sm font-medium text-on-surface">Core Principles & Patterns</span>
                <span className="font-label text-xs font-bold text-primary">85%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            {/* Unit 2 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-body text-sm font-medium text-on-surface">State Management (Redux/Zustand)</span>
                <span className="font-label text-xs font-bold text-primary">42%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            {/* Unit 3 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-body text-sm font-medium text-on-surface">Performance Optimization</span>
                <span className="font-label text-xs font-bold text-outline text-slate-400">12%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-secondary-container rounded-full" style={{ width: '12%' }}></div>
              </div>
            </div>
            {/* Unit 4 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-body text-sm font-medium text-on-surface">System Design & Scalability</span>
                <span className="font-label text-xs font-bold text-outline text-slate-400">5%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-secondary-container rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Sessions Table */}
      <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="p-6 border-b border-outline-variant flex items-center justify-between bg-surface-bright">
          <h3 className="font-label font-semibold text-on-surface-variant uppercase tracking-widest text-xs">Recent Sessions</h3>
          <span className="px-3 py-1 bg-surface-container rounded-full text-xs font-label text-on-surface-variant">Last 30 Days</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant">
                <th className="px-6 py-4 font-label text-xs font-semibold text-outline tracking-wider w-32 text-slate-400 uppercase">Date</th>
                <th className="px-6 py-4 font-label text-xs font-semibold text-outline tracking-wider w-32 text-slate-400 uppercase">Duration</th>
                <th className="px-6 py-4 font-label text-xs font-semibold text-outline tracking-wider text-slate-400 uppercase">Focus Area</th>
                <th className="px-6 py-4 font-label text-xs font-semibold text-outline tracking-wider w-24 text-slate-400 uppercase">Quality</th>
              </tr>
            </thead>
            <tbody className="font-body text-sm text-on-surface divide-y divide-surface-container-highest">
              {[
                { date: 'Oct 12', duration: '3.5 hrs', focus: 'Refactoring global state to Zustand, isolated component re-renders.', quality: 3 },
                { date: 'Oct 10', duration: '2.0 hrs', focus: 'Reading: "Clean Architecture" applied to React directory structures.', quality: 2 },
                { date: 'Oct 08', duration: '4.0 hrs', focus: 'Deep dive into custom hooks for complex business logic extraction.', quality: 3 },
              ].map((session, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-6 py-4 text-on-surface-variant">{session.date}</td>
                  <td className="px-6 py-4 font-label font-medium">{session.duration}</td>
                  <td className="px-6 py-4">{session.focus}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 text-primary">
                      {[...Array(3)].map((_, starIndex) => (
                        <span key={starIndex} className={`material-symbols-outlined text-[16px] ${starIndex >= session.quality ? 'text-surface-container-highest' : ''}`} style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-outline-variant bg-surface-bright flex justify-center">
          <button className="text-primary text-sm font-label font-medium hover:text-primary-container transition-colors">View All Sessions</button>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
