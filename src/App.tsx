import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SearchModal } from './components/SearchModal';
import { EventDetailModal } from './components/EventDetailModal';

import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { EventsPage } from './pages/EventsPage';
import { MyRegistrationsPage } from './pages/MyRegistrationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotificationsPage } from './pages/NotificationsPage';
import { StudyArenaPage } from './pages/StudyArenaPage';

const AppContent: React.FC = () => {
  const { activePath } = useApp();

  const renderPage = () => {
    switch (activePath) {
      case '/':
        return <LoginPage />;
      case '/dashboard':
        return <DashboardPage />;
      case '/events':
        return <EventsPage />;
      case '/registrations':
        return <MyRegistrationsPage />;
      case '/profile':
        return <ProfilePage />;
      case '/notifications':
        return <NotificationsPage />;
      case '/study-arena':
        return <StudyArenaPage />;
      default:
        return <DashboardPage />;
    }
  };

  if (activePath === '/') {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F9FF] text-[#0F172A]">
      <Header />
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
          {renderPage()}
        </main>
      </div>

      {/* Global Modals */}
      <SearchModal />
      <EventDetailModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
