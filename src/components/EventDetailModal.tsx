import React from 'react';
import { X, Calendar, MapPin, Clock, UserCheck, BookOpen, CheckCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScientificBanner } from './ScientificBanners';

export const EventDetailModal: React.FC = () => {
  const { selectedEventId, setSelectedEventId, events, registrations, registerEvent, cancelRegistration } = useApp();

  if (!selectedEventId) return null;

  const event = events.find(e => e.id === selectedEventId);
  if (!event) return null;

  const isRegistered = registrations.some(
    r => r.eventId === event.id || r.eventTitle === event.title
  );
  const existingReg = registrations.find(
    r => r.eventId === event.id || r.eventTitle === event.title
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in duration-200">
        {/* Banner Graphic */}
        <div className="relative">
          <ScientificBanner type={event.bannerType} className="h-44" />
          <button
            onClick={() => setSelectedEventId(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-blue-600 text-white shadow-md">
              {event.category}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-[#102A5C] tracking-tight">
              {event.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-blue-50/60 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2.5 text-slate-700">
              <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Date</p>
                <p className="text-xs font-semibold">{event.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Time</p>
                <p className="text-xs font-semibold">{event.time || '10:00 AM'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Venue</p>
                <p className="text-xs font-semibold">{event.venue}</p>
              </div>
            </div>
          </div>

          {/* Speaker & Organizer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {event.speaker && (
              <div className="p-3 border border-slate-200 rounded-xl bg-slate-50/50">
                <p className="font-bold text-slate-400 uppercase text-[10px] flex items-center gap-1 mb-1">
                  <UserCheck className="w-3.5 h-3.5 text-blue-600" /> Speaker / Instructor
                </p>
                <p className="font-semibold text-slate-800">{event.speaker}</p>
              </div>
            )}
            {event.organizer && (
              <div className="p-3 border border-slate-200 rounded-xl bg-slate-50/50">
                <p className="font-bold text-slate-400 uppercase text-[10px] flex items-center gap-1 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Organizer
                </p>
                <p className="font-semibold text-slate-800">{event.organizer}</p>
              </div>
            )}
          </div>

          {/* What You'll Learn */}
          {event.learnings && event.learnings.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" /> What You'll Learn
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {event.learnings.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-slate-500">Eligibility:</span>
              <span className="ml-1 text-xs font-semibold text-slate-700">{event.eligibility || 'Open to all NIT Bhopal Students'}</span>
            </div>

            {isRegistered ? (
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Registered ✓
                </span>
                {existingReg && (
                  <button
                    onClick={() => cancelRegistration(existingReg.id)}
                    className="text-xs text-red-500 hover:text-red-700 font-medium underline"
                  >
                    Cancel
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => registerEvent(event.id)}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-transform hover:scale-102 active:scale-98"
              >
                Register Now →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
