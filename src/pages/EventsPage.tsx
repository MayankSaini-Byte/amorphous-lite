import React from 'react';
import { 
  Search, 
  LayoutGrid, 
  Code, 
  Briefcase, 
  BarChart3, 
  Atom, 
  Wrench, 
  Mic, 
  Trophy, 
  MoreHorizontal, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { CategoryType } from '../types';
import { ScientificBanner } from '../components/ScientificBanners';

export const EventsPage: React.FC = () => {
  const { 
    events, 
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    setSearchQuery, 
    sortBy, 
    setSortBy, 
    setSelectedEventId, 
    registrations, 
    registerEvent 
  } = useApp();

  const categories: { id: CategoryType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'All', label: 'All', icon: LayoutGrid },
    { id: 'Computation', label: 'Computation', icon: Code },
    { id: 'Business', label: 'Business', icon: Briefcase },
    { id: 'Analytical', label: 'Analytical', icon: BarChart3 },
    { id: 'Research', label: 'Research', icon: Atom },
    { id: 'Workshops', label: 'Workshops', icon: Wrench },
    { id: 'Talks', label: 'Talks', icon: Mic },
    { id: 'Competitions', label: 'Competitions', icon: Trophy },
    { id: 'Others', label: 'Others', icon: MoreHorizontal },
  ];

  // Filter events by Category and Search Query
  const filteredEvents = events.filter(evt => {
    const matchesCategory = activeCategory === 'All' || evt.category === activeCategory;
    const matchesSearch = 
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'A-Z') return a.title.localeCompare(b.title);
    if (sortBy === 'Newest') return b.id.localeCompare(a.id);
    return 0; // Default Upcoming order
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* HERO BANNER CARD */}
      <div className="relative w-full bg-gradient-to-r from-blue-50 via-indigo-50/40 to-blue-100/60 border border-blue-200/80 rounded-3xl p-6 sm:p-8 shadow-xs overflow-hidden">
        {/* Floating 3D Molecular SVGs background */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-70 hidden md:block">
          <svg className="w-full h-full" viewBox="0 0 500 250" fill="none">
            <line x1="200" y1="80" x2="320" y2="150" stroke="#93C5FD" strokeWidth="2.5" />
            <line x1="320" y1="150" x2="420" y2="90" stroke="#93C5FD" strokeWidth="2.5" />
            <circle cx="200" cy="80" r="22" fill="#60A5FA" opacity="0.9" />
            <circle cx="320" cy="150" r="30" fill="#2563EB" opacity="0.95" />
            <circle cx="420" cy="90" r="20" fill="#93C5FD" opacity="0.85" />
          </svg>
        </div>

        <div className="relative z-10 max-w-xl space-y-2">
          <div className="inline-flex items-center gap-2 text-[10px] font-extrabold tracking-widest text-blue-600 uppercase">
            <span className="w-3 h-0.5 bg-blue-600" />
            <span>EVENTS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#102A5C] tracking-tight">
            Explore. Learn. Build.
          </h1>

          <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
            Discover workshops, talks, competitions and more — designed to inspire, upskill and connect the material science community at NIT Bhopal.
          </p>
        </div>
      </div>

      {/* CATEGORY FILTER PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex-shrink-0 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* SEARCH AND SORT BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-2xs"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs font-semibold text-slate-400">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-slate-200/90 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 shadow-2xs cursor-pointer"
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Newest">Newest</option>
            <option value="A-Z">A-Z</option>
          </select>
        </div>
      </div>

      {/* EVENT CARDS GRID (3 Columns Desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedEvents.length > 0 ? (
          sortedEvents.map(evt => {
            const isRegistered = registrations.some(
              r => r.eventId === evt.id || r.eventTitle === evt.title
            );

            return (
              <div
                key={evt.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Category Banner Graphic */}
                  <div className="relative">
                    <ScientificBanner type={evt.bannerType} className="h-32" />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-600/90 text-white backdrop-blur-xs shadow-xs">
                        {evt.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 
                        onClick={() => setSelectedEventId(evt.id)}
                        className="text-sm font-extrabold text-[#102A5C] group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
                      >
                        {evt.title}
                      </h3>
                      <ChevronRight 
                        onClick={() => setSelectedEventId(evt.id)}
                        className="w-4 h-4 text-slate-400 group-hover:text-blue-600 cursor-pointer flex-shrink-0" 
                      />
                    </div>

                    <p className="text-xs font-medium text-slate-500 line-clamp-2 leading-relaxed">
                      {evt.description}
                    </p>

                    {/* Metadata */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        <span>{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        <span>{evt.venue}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0 flex items-center justify-between">
                  {isRegistered ? (
                    <button
                      onClick={() => setSelectedEventId(evt.id)}
                      className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600" /> Registered ✓
                    </button>
                  ) : (
                    <button
                      onClick={() => registerEvent(evt.id)}
                      className="w-full flex items-center justify-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs"
                    >
                      <span>Register</span>
                      <span>→</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
            No events found matching your filter criteria.
          </div>
        )}
      </div>

      {/* PAGINATION CONTROL */}
      <div className="flex items-center justify-center gap-2 pt-6">
        <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs shadow-xs">
          1
        </button>
        <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50">
          2
        </button>
        <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50">
          3
        </button>
        <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50">
          4
        </button>
        <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50">
          5
        </button>
        <button className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
