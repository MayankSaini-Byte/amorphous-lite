import React, { useState } from 'react';
import { Ticket, Calendar, MapPin, ArrowRight, LayoutGrid, ListFilter, Trash2, Download, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UI_COPY } from '../constants/uiCopy';

export const MyRegistrationsPage: React.FC = () => {
  const { registrations, cancelRegistration, setActivePath } = useApp();
  const [viewMode, setViewMode] = useState<'cards' | 'timeline'>('cards');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleDownloadPass = (eventTitle: string) => {
    setDownloadNotice(UI_COPY.registrations.downloadingPass(eventTitle));
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-extrabold tracking-widest text-blue-600 uppercase">
            <span className="w-3 h-0.5 bg-blue-600" />
            <span>YOUR REGISTRATIONS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A5C]">
            My registrations
          </h1>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Track confirmed entries, manage your participation, and keep up with upcoming events.
          </p>
        </div>

        {/* View Controls & CTA */}
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'cards' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'timeline' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Timeline</span>
            </button>
          </div>

          <button
            onClick={() => setActivePath('/events')}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
          >
            <span>Find events</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {downloadNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* REGISTRATION LIST OR EMPTY STATE */}
      {registrations.length > 0 ? (
        viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {registrations.map(reg => (
              <div
                key={reg.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
                      {reg.category}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      reg.status === 'CONFIRMED'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-sky-100 text-sky-700'
                    }`}>
                      {reg.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-[#102A5C]">
                      {reg.eventTitle}
                    </h3>
                    <p className="text-xs font-medium text-slate-400 mt-0.5">
                      Registered on {reg.registeredDate}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">Event Date</p>
                        <p className="font-semibold text-[11px]">{reg.eventDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">Venue</p>
                        <p className="font-semibold text-[11px]">{reg.venue}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button 
                    onClick={() => handleDownloadPass(reg.eventTitle)}
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download e-Pass</span>
                  </button>

                  <button
                    onClick={() => cancelRegistration(reg.id)}
                    className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* TIMELINE VIEW */
          <div className="relative border-l-2 border-blue-200 ml-4 pl-6 space-y-8 py-2">
            {registrations.map(reg => (
              <div key={reg.id} className="relative group">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-100" />
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600">{reg.eventDate}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      reg.status === 'CONFIRMED'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-sky-100 text-sky-700'
                    }`}>
                      {reg.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-[#102A5C] mt-1">{reg.eventTitle}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{reg.venue} • {reg.category}</p>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* EMPTY STATE */
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-4 max-w-lg mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Ticket className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[#102A5C]">
              No registrations yet
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              You haven't registered for any Amorphus events yet. Explore what's open and reserve your place.
            </p>
          </div>
          <button
            onClick={() => setActivePath('/events')}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            <span>Explore events</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
