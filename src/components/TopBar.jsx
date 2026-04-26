import React from 'react';

const TopBar = () => {
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

        <div className="ml-2 pl-4 border-l border-outline-variant">
          <img
            alt="User profile"
            className="w-8 h-8 rounded-full object-cover border border-outline-variant cursor-pointer hover:ring-2 hover:ring-primary-container transition-all"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeC_WMXptWFKSKiwDg71SU7oNfI7kKZii_Ci01irp154kEDOJLEU1WgZNs-ugIyrWJIB_AGNbvpfmPiU7W9osymqvAlgvvGZg3RqJyWJlnCWmIMviBcHfBulCpPviefJqbjTVmPgvUELS2P3amgeeOMDcMyDxO_1F73V4_LIJN8MDLCQJ9Ye8C7Bzn_jDxl9QVbhm37gHFzoA7Nrj6ogGiZ6zkvvqRahwHOtbuk4EawKfGIB9m7PZp23VBxUedUyHRnoPtPCT9EkM"
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
