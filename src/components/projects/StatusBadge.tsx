import React from 'react';
import type { ProjectStatus } from '../../types/MotifTypes';
import { UI_COPY } from '../../constants/uiCopy';

interface StatusBadgeProps {
  status: ProjectStatus | string;
  isFull?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, isFull }) => {
  const normStatus = (status || 'open').toLowerCase();

  if (isFull) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        <span>{UI_COPY.projects.submissionsFull}</span>
      </span>
    );
  }

  if (normStatus === 'open') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>{UI_COPY.projects.statusOpen}</span>
      </span>
    );
  }

  if (normStatus === 'coming_soon' || normStatus === 'coming-soon') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <span>{UI_COPY.projects.statusComingSoon}</span>
      </span>
    );
  }

  // Closed
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
      <span>{UI_COPY.projects.statusClosed}</span>
    </span>
  );
};
