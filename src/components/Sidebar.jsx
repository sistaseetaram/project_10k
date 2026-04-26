import React from 'react';

const Sidebar = ({ activePage, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'activities', label: 'Activities', icon: 'fitness_center' },
    { id: 'logs', label: 'Logs', icon: 'history_edu' },
    { id: 'analytics', label: 'Analytics', icon: 'monitoring' },
    { id: 'achievements', label: 'Achievements', icon: 'military_tech' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
    { id: 'archive', label: 'Archive', icon: 'archive' },
  ];

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 border-r border-outline-variant bg-surface py-6 space-y-2 z-40">
      <div className="px-6 pb-6 mb-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-on-primary">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>change_history</span>
        </div>
        <div>
          <h1 className="font-headline text-lg font-bold text-primary tracking-tight">Kinetic Light</h1>
          <p className="font-label text-[10px] uppercase tracking-wider text-on-surface-variant">10,000 Hour Journey</p>
        </div>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all border-l-4 ${
              activePage === item.id
                ? 'bg-secondary-container text-on-secondary-container border-primary'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container border-transparent hover:border-outline-variant'
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: activePage === item.id ? "'FILL' 1" : "" }}>
              {item.icon}
            </span>
            <span className={`font-label text-[14px] ${activePage === item.id ? 'font-semibold' : 'font-medium'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
      <div className="px-4 mt-auto">
        <button className="w-full bg-primary text-on-primary py-3 rounded-lg font-label font-semibold text-[14px] hover:scale-[0.98] transition-transform shadow-sm flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Activity
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
