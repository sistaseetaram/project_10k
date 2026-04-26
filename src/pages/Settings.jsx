import React from 'react';

const Settings = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      {/* Page Header */}
      <div>
        <h2 className="font-headline text-[32px] font-semibold tracking-tight text-on-surface text-3xl">Settings</h2>
        <p className="text-on-surface-variant font-body text-[16px] mt-1 text-slate-500">Manage your account details and progress rules.</p>
      </div>

      {/* Warning Banner */}
      <div className="bg-error-container border border-[#ffb4ab] rounded-xl p-5 flex items-start gap-4 shadow-sm">
        <span className="material-symbols-outlined text-[#93000a] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
        <div>
          <h3 className="font-label text-[14px] font-bold text-on-error-container tracking-wider uppercase mb-1 text-sm font-semibold">Strict Mode Active</h3>
          <p className="font-body text-[14px] text-on-error-container/90 leading-relaxed text-sm">Inactivity penalties are currently enforced. Missing a logged session for more than your designated grace period will result in automated hour deductions to maintain kinetic momentum.</p>
        </div>
      </div>

      {/* Bento Grid Layout for Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Profile Information Card */}
        <section className="bg-white border border-surface-variant rounded-[1.5rem] p-8 flex flex-col shadow-sm">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-surface-variant/50">
            <span className="material-symbols-outlined text-primary">person</span>
            <h3 className="font-label text-[14px] font-bold text-on-surface uppercase tracking-wider text-sm font-semibold">Profile Information</h3>
          </div>
          <div className="flex items-center gap-6 mb-8">
            <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-slate-100">
              <img
                alt="Profile Avatar"
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAubR8xt3BclBC3Z4GLCmxYyNxup3OrozKL-iqDeGoVSWOi6emkJ1ii1G8of_i8L4KHqSekgSPew5hYRhnneqCMPCOovXXpm_kAaHcv4cMHQ2_4lB0kvzST7Ud9UzaY50QtM9PtDgQo4kVj060MmYrDbHSj1gZG8vvK2V0XsjSrYu-ClIBAo0QMsIuezIY528-UoFW7EYaroJNyDD06frtf27hnnAf5_WcreZK60I23E2mj0-0AuYLyfTMAmsu_ADZmKlhdHAXBKLA"
              />
            </div>
            <div>
              <button className="bg-white text-on-surface border border-outline-variant hover:bg-slate-50 px-4 py-2 rounded-lg font-label text-[12px] font-semibold transition-colors border-slate-200 text-xs">
                Change Avatar
              </button>
              <p className="text-on-surface-variant text-[12px] mt-2 text-slate-400 text-xs">JPG, GIF or PNG. Max size of 800K</p>
            </div>
          </div>
          <div className="space-y-5 flex-1">
            <div>
              <label className="block font-label text-[12px] font-semibold text-on-surface-variant mb-2 text-slate-500 text-xs uppercase">Display Name</label>
              <input className="w-full bg-slate-50 border border-outline-variant text-on-surface text-[16px] rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow border-slate-200" type="text" defaultValue="Alex Mercer" />
            </div>
            <div>
              <label className="block font-label text-[12px] font-semibold text-on-surface-variant mb-2 text-slate-500 text-xs uppercase">Email Address</label>
              <input className="w-full bg-slate-50 border border-outline-variant text-on-surface text-[16px] rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow border-slate-200" type="email" defaultValue="alex.m@kinetic.io" />
            </div>
            <div>
              <label className="block font-label text-[12px] font-semibold text-on-surface-variant mb-2 text-slate-500 text-xs uppercase">Primary Focus Area</label>
              <div className="relative">
                <select className="w-full bg-slate-50 border border-outline-variant text-on-surface text-[16px] rounded-lg px-4 py-3 appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow cursor-pointer border-slate-200">
                  <option>UI/UX Design Mastery</option>
                  <option>Frontend Architecture</option>
                  <option>Creative Coding</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-surface-variant/50 flex justify-end">
            <button className="bg-primary hover:bg-primary/90 text-on-primary font-label text-[14px] font-semibold px-6 py-3 rounded-lg transition-transform hover:scale-[0.98]">
              Save Profile
            </button>
          </div>
        </section>

        {/* Mastery Rules Card */}
        <section className="bg-white border border-surface-variant rounded-[1.5rem] p-8 flex flex-col shadow-sm">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-surface-variant/50">
            <span className="material-symbols-outlined text-primary">rule_folder</span>
            <h3 className="font-label text-[14px] font-bold text-on-surface uppercase tracking-wider text-sm font-semibold">Mastery Rules</h3>
          </div>
          <div className="space-y-8 flex-1">
            {/* Inactivity Toggle */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-headline text-[16px] font-semibold text-on-surface mb-1 text-base">Inactivity Penalty</h4>
                <p className="font-body text-[14px] text-on-surface-variant leading-relaxed text-sm text-slate-500">Automatically deduct progress hours if no activity is logged within the defined grace period.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input defaultChecked className="sr-only peer" type="checkbox" value="" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            {/* Grace Period Dropdown */}
            <div className="bg-slate-50 rounded-xl p-5 border border-surface-variant border-slate-200">
              <label className="block font-label text-[12px] font-semibold text-on-surface-variant mb-3 flex justify-between items-center text-xs text-slate-500 uppercase">
                Grace Period Window
                <span className="material-symbols-outlined text-[16px] text-primary" title="Time before penalty applies">info</span>
              </label>
              <div className="relative">
                <select className="w-full bg-white border border-outline-variant text-on-surface text-[16px] rounded-lg px-4 py-3 appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow cursor-pointer font-medium border-slate-200">
                  <option>24 Hours (Aggressive)</option>
                  <option defaultValue="">48 Hours (Standard)</option>
                  <option>72 Hours (Lenient)</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">unfold_more</span>
              </div>
            </div>
            {/* Weekly Target */}
            <div>
              <label className="block font-label text-[12px] font-semibold text-on-surface-variant mb-2 text-xs text-slate-500 uppercase">Weekly Hour Target</label>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <input className="w-full bg-slate-50 border border-outline-variant text-on-surface text-[18px] font-bold rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow border-slate-200" type="number" defaultValue="20" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-label text-[14px] text-slate-400">hrs</span>
                </div>
                <div className="bg-secondary-container text-on-secondary-container px-4 py-3 rounded-lg font-label text-[12px] font-bold flex items-center gap-2 text-xs uppercase">
                  <span className="material-symbols-outlined text-[18px]">trending_up</span>
                  On Track
                </div>
              </div>
              <div className="mt-4 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-[65%]"></div>
              </div>
              <p className="text-on-surface-variant text-[12px] mt-2 text-right text-xs text-slate-400">Current pace: 13/20 hrs</p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-surface-variant/50 flex justify-end">
            <button className="bg-white text-primary border border-primary hover:bg-primary/5 font-label text-[14px] font-semibold px-6 py-3 rounded-lg transition-colors text-sm">
              Update Rules
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
