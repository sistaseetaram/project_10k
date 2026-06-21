import React from 'react';
import { useAuth } from '../context/AuthContext';

const TopBar = () => {
  const { user, signOut } = useAuth();
  const email = user?.email || '';
  const initial = (email[0] || '?').toUpperCase();
  return (
    <header className="bg-surface text-primary font-headline sticky top-0 z-40 border-b border-outline-variant flex justify-between items-center h-16 px-6 w-full shrink-0">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-on-surface-variant hover:text-primary p-2 -ml-2 rounded-lg hover:bg-surface-container-low transition-colors">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <span className="text-xl font-bold tracking-tight text-primary md:hidden">Project 10k</span>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <div className="relative hidden sm:block w-64">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
          <input
            className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm text-on-surface focus:ring-1 focus:ring-primary placeholder-on-surface-variant transition-all focus:bg-surface"
            placeholder="Search entries..."
            type="text"
          />
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full active:scale-95 duration-150 relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full active:scale-95 duration-150">
            <span className="material-symbols-outlined">help</span>
          </button>
        </div>

        <div className="ml-2 pl-4 border-l border-outline-variant flex items-center gap-3">
          <div
            title={email}
            className="grid w-8 h-8 place-items-center rounded-full bg-primary-container text-on-primary-container text-sm font-bold border border-outline-variant select-none"
          >
            {initial}
          </div>
          <button
            onClick={signOut}
            title="Sign out"
            className="p-2 text-on-surface-variant hover:bg-surface-container-low hover:text-error transition-colors rounded-full active:scale-95 duration-150"
          >
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
