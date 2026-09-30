import React from 'react';
import { LayoutGrid, Calendar, CheckSquare, User, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { activePath, setActivePath, notifications } = useApp();

  if (activePath === '/') return null; // Don't render sidebar on login page

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { section: 'STUDENT PORTAL', items: [
      { id: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
      { id: '/events', label: 'Events', icon: Calendar },
      { id: '/registrations', label: 'My Registrations', icon: CheckSquare },
    ]},
    { section: 'ACCOUNT', items: [
      { id: '/profile', label: 'Profile', icon: User },
      { id: '/notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
    ]}
  ];

  return (
    <aside className="w-64 flex-shrink-0 min-h-[calc(100vh-4rem)] bg-white border-r border-slate-200/80 p-5 flex flex-col justify-between hidden md:flex">
      <div className="space-y-6">
        {navItems.map((group, idx) => (
          <div key={idx} className="space-y-2">
            <h4 className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase px-3">
              {group.section}
            </h4>
            <nav className="space-y-1">
              {group.items.map(item => {
                const Icon = item.icon;
                const isActive = activePath === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActivePath(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                      isActive
                        ? 'bg-blue-50/90 text-[#102A5C] font-semibold border-l-4 border-blue-600 shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && item.badge > 0 ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white">
                        {item.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Footer Branding & Social Icons */}
      <div className="pt-6 border-t border-slate-100 flex flex-col items-center text-center space-y-3">
        <div className="space-y-1">
          <p className="text-[10px] font-semibold text-slate-400 tracking-wider">
            Explore <span className="mx-1">•</span> Learn <span className="mx-1">•</span> Build
          </p>
          <p className="text-[11px] font-medium text-slate-500">
            Materials for a Better Tomorrow
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3 pt-1 text-slate-400">
          <a href="#" className="hover:text-blue-600 transition-colors" title="Instagram">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors" title="LinkedIn">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors" title="YouTube">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
          </a>
        </div>
      </div>
    </aside>
  );
};
