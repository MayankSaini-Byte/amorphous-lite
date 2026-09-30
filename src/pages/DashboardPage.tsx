import React from 'react';
import { Compass, Calendar, CheckCircle2, Clock, Users, ArrowRight, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScientificBanner } from '../components/ScientificBanners';

export const DashboardPage: React.FC = () => {
  const { setActivePath, events, registrations, setSelectedEventId } = useApp();

  const technicalEvents = events.filter(e => e.isTechnical || e.category === 'Analytical' || e.category === 'Research' || e.category === 'Workshops').slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* HERO BANNER CARD */}
      <div className="relative w-full bg-gradient-to-r from-blue-50 via-indigo-50/50 to-blue-100/70 border border-blue-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs overflow-hidden">
        {/* Floating 3D Molecular SVGs background */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-80 hidden md:block">
          <svg className="w-full h-full" viewBox="0 0 500 300" fill="none">
            <line x1="250" y1="100" x2="380" y2="180" stroke="#93C5FD" strokeWidth="3" />
            <line x1="380" y1="180" x2="450" y2="120" stroke="#93C5FD" strokeWidth="3" />
            <line x1="380" y1="180" x2="320" y2="260" stroke="#93C5FD" strokeWidth="3" />

            <circle cx="250" cy="100" r="28" fill="#60A5FA" opacity="0.9" className="animate-float" />
            <circle cx="380" cy="180" r="36" fill="#2563EB" opacity="0.95" />
            <circle cx="450" cy="120" r="24" fill="#93C5FD" opacity="0.85" />
            <circle cx="320" cy="260" r="22" fill="#3B82F6" opacity="0.9" />
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-widest text-blue-600 uppercase">
            <span className="w-4 h-0.5 bg-blue-600" />
            <span>AMORPHUS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A5C] leading-tight tracking-tight">
            Welcome back,<br />
            <span className="text-blue-600">25119011132.</span>
          </h1>

          <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed max-w-lg">
            Dive into the world of materials. Explore events, track your registrations, and be part of something extraordinary.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setActivePath('/events')}
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full shadow-md transition-all hover:shadow-lg hover:scale-102 active:scale-98"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Events</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* STATISTICS ROW */}
        <div className="relative z-10 mt-8 pt-6 border-t border-blue-200/60 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-[#102A5C]">8</p>
              <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Open Events</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-[#102A5C]">{registrations.length}</p>
              <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Registered</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-[#102A5C]">6</p>
              <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Upcoming</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-[#102A5C]">12</p>
              <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Total Registrations</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT 2 COLUMNS: NOW OPEN Technical Sessions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] font-extrabold tracking-widest text-blue-600 uppercase">
                <span className="w-3 h-0.5 bg-blue-600" />
                <span>NOW OPEN</span>
              </div>
              <h2 className="text-xl font-extrabold text-[#102A5C]">
                Technical Sessions
              </h2>
            </div>
            <button
              onClick={() => setActivePath('/events')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {technicalEvents.map(evt => (
              <div
                key={evt.id}
                onClick={() => setSelectedEventId(evt.id)}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative">
                    <ScientificBanner type={evt.bannerType} className="h-28" />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-blue-900/80 text-white backdrop-blur-xs">
                        TECHNICAL
                      </span>
                    </div>
                    <div className="absolute top-2.5 right-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                        evt.status === 'OPEN' ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-white'
                      }`}>
                        {evt.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="text-xs font-extrabold text-[#102A5C] group-hover:text-blue-600 line-clamp-2 transition-colors">
                      {evt.title}
                    </h3>
                    <div className="space-y-1 text-[11px] text-slate-500 font-medium">
                      <p className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{evt.date}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{evt.venue}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT 1 COLUMN: Your Registrations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-[#102A5C]">
              Your Registrations
            </h2>
            <button
              onClick={() => setActivePath('/registrations')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
            >
              <span>All</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="space-y-3">
            {registrations.length > 0 ? (
              registrations.map(reg => (
                <div
                  key={reg.id}
                  onClick={() => setActivePath('/registrations')}
                  className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-300 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                      reg.status === 'CONFIRMED'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-sky-100 text-sky-700'
                    }`}>
                      {reg.status}
                    </span>
                    <h4 className="text-xs font-extrabold text-[#102A5C] group-hover:text-blue-600 transition-colors">
                      {reg.eventTitle}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{reg.eventDate}</span>
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              ))
            ) : (
              <div className="p-6 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
                No active registrations.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
