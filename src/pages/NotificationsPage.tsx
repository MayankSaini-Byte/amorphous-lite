import React from 'react';
import { Bell, CheckCheck, Trash2, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead, clearAllNotifications } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-3xl">
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-extrabold tracking-widest text-blue-600 uppercase">
            <span className="w-3 h-0.5 bg-blue-600" />
            <span>UPDATES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A5C]">
            Notifications
          </h1>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Important announcements, event reminders, and registration updates.
          </p>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={clearAllNotifications}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      {/* NOTIFICATION CARDS LIST */}
      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map(n => (
            <div
              key={n.id}
              onClick={() => markNotificationAsRead(n.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                n.read
                  ? 'bg-white border-slate-200/70 opacity-75'
                  : 'bg-blue-50/60 border-blue-200 shadow-xs'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-white border border-slate-100 shadow-2xs mt-0.5">
                {n.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                {n.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
                {n.type === 'alert' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-[#102A5C]">
                    {n.title}
                  </h4>
                  <span className="text-[10px] font-semibold text-slate-400">
                    {n.date}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {n.message}
                </p>
              </div>

              {!n.read && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markNotificationAsRead(n.id);
                  }}
                  title="Mark as read"
                  className="p-1 text-blue-600 hover:text-blue-800"
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Bell className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-extrabold text-[#102A5C]">
            All caught up!
          </h3>
          <p className="text-xs text-slate-400">
            You have no unread notifications at this time.
          </p>
        </div>
      )}
    </div>
  );
};
