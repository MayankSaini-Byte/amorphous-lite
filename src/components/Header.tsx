import React from 'react';
import { Search, Moon, Sun, Bell, User, LogOut, ChevronDown } from 'lucide-react';
import { AmorphousLogo } from './AmorphousLogo';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const {
    activePath,
    setActivePath,
    userProfile,
    notifications,
    setSearchModalOpen,
    theme,
    toggleTheme,
    searchQuery
  } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  if (activePath === '/') return null; // Don't render top header on split-screen login page

  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 flex items-center justify-between transition-colors">
      {/* Left: Brand logo */}
      <div 
        className="flex items-center cursor-pointer"
        onClick={() => setActivePath('/dashboard')}
      >
        <AmorphousLogo size="sm" showSubtitle={true} />
      </div>

      {/* Center: Quick Search Trigger */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div 
          onClick={() => setSearchModalOpen(true)}
          className="w-full flex items-center gap-2.5 px-3.5 py-1.5 bg-slate-100/90 hover:bg-slate-200/70 border border-slate-200/80 rounded-xl text-slate-500 text-xs font-medium cursor-pointer transition-all shadow-inner"
        >
          <Search className="w-4 h-4 text-slate-400" />
          <span className="flex-1 truncate">
            {searchQuery || "Search events, workshops, or keywords..."}
          </span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-mono text-slate-500 shadow-xs">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title="Toggle color theme"
          className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Notifications Icon with Badge */}
        <button
          onClick={() => setActivePath('/notifications')}
          className="relative p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4 text-slate-600" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
          )}
        </button>

        {/* User Account Pill */}
        <div 
          onClick={() => setActivePath('/profile')}
          className="flex items-center gap-2.5 px-3 py-1 bg-slate-100/80 hover:bg-blue-50 border border-slate-200/70 rounded-full cursor-pointer transition-all"
        >
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <User className="w-3.5 h-3.5" />
          </div>
          <div className="hidden lg:flex flex-col text-left leading-tight">
            <span className="text-[11px] font-bold text-[#102A5C] truncate max-w-[150px]">
              {userProfile.email}
            </span>
            <span className="text-[9px] font-semibold text-slate-500">
              {userProfile.institution}
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Logout / Exit */}
        <button
          onClick={() => setActivePath('/')}
          className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors ml-1"
          title="Log out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
