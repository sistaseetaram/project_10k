import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import ActivityDetail from './pages/ActivityDetail';
import Logs from './pages/Logs';
import Analytics from './pages/Analytics';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';
import Archive from './pages/Archive';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'activities': return <ActivityDetail />;
      case 'logs': return <Logs />;
      case 'analytics': return <Analytics />;
      case 'achievements': return <Achievements />;
      case 'settings': return <Settings />;
      case 'archive': return <Archive />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background font-body text-on-background antialiased selection:bg-primary-container selection:text-on-primary-container">
      <Sidebar activePage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col md:ml-64 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
