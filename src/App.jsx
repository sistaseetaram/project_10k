import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Landing from './pages/Landing';
import AuthScreen from './components/AuthScreen';
import Dashboard from './pages/Dashboard';
import ActivityDetail from './pages/ActivityDetail';
import Logs from './pages/Logs';
import Analytics from './pages/Analytics';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';
import Archive from './pages/Archive';
import { useAuth } from './context/AuthContext';

function Splash() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#06110b] text-[#7ef0b6]">
      <div className="animate-pulse text-lg font-semibold tracking-wide">Project 10K…</div>
    </div>
  );
}

function App() {
  // 'landing' | 'auth' — only relevant while logged out. Logged in = app shell.
  const [view, setView] = useState('landing');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { session, loading } = useAuth();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard onNavigate={setCurrentPage} />;
      case 'activities': return <ActivityDetail />;
      case 'logs': return <Logs />;
      case 'analytics': return <Analytics />;
      case 'achievements': return <Achievements />;
      case 'settings': return <Settings />;
      case 'archive': return <Archive />;
      default: return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  if (loading) return <Splash />;

  if (!session) {
    if (view === 'auth') return <AuthScreen onBack={() => setView('landing')} />;
    return <Landing onEnter={() => setView('auth')} />;
  }

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
