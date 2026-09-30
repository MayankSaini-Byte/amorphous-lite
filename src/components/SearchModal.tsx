import React, { useEffect, useState } from 'react';
import { Search, X, Calendar, ArrowRight, LayoutGrid, User, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SearchModal: React.FC = () => {
  const { searchModalOpen, setSearchModalOpen, events, setSelectedEventId, setActivePath } = useApp();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(!searchModalOpen);
      }
      if (e.key === 'Escape' && searchModalOpen) {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchModalOpen, setSearchModalOpen]);

  if (!searchModalOpen) return null;

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(query.toLowerCase()) ||
    e.category.toLowerCase().includes(query.toLowerCase()) ||
    e.description.toLowerCase().includes(query.toLowerCase())
  );

  const quickLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutGrid },
    { label: 'Events Catalog', path: '/events', icon: Calendar },
    { label: 'My Registrations', path: '/registrations', icon: Calendar },
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Notifications', path: '/notifications', icon: Bell },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Search Header Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 gap-3">
          <Search className="w-5 h-5 text-blue-600" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, workshops, or pages..."
            className="flex-1 bg-transparent text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setSearchModalOpen(false)}
            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-600"
          >
            ESC
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {query ? (
            <div>
              <h5 className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">
                Matching Events ({filteredEvents.length})
              </h5>
              {filteredEvents.length > 0 ? (
                <div className="space-y-1.5">
                  {filteredEvents.map(evt => (
                    <div
                      key={evt.id}
                      onClick={() => {
                        setSelectedEventId(evt.id);
                        setSearchModalOpen(false);
                      }}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50/80 cursor-pointer group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                          {evt.category[0]}
                        </div>
                        <div>
                          <h6 className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                            {evt.title}
                          </h6>
                          <p className="text-[11px] text-slate-500">
                            {evt.category} • {evt.date} • {evt.venue}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 py-4 text-center">No events found matching "{query}"</p>
              )}
            </div>
          ) : (
            <div>
              <h5 className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">
                Quick Navigation
              </h5>
              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setActivePath(link.path);
                        setSearchModalOpen(false);
                      }}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-100 hover:bg-blue-50/70 hover:border-blue-200 text-left text-xs font-semibold text-slate-700 transition-all"
                    >
                      <Icon className="w-4 h-4 text-blue-600" />
                      <span>{link.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
