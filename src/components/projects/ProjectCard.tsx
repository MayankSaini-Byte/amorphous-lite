import React from 'react';
import { Users, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { MotifOpenProject } from '../../types/MotifTypes';
import { StatusBadge } from './StatusBadge';
import { UI_COPY } from '../../constants/uiCopy';

interface ProjectCardProps {
  project: MotifOpenProject;
  onOpenDetails: (project: MotifOpenProject) => void;
  onOpenSubmission: (project: MotifOpenProject) => void;
  isSubmitted?: boolean;
}

/**
 * Format deadline date to readable string (e.g. "30 Oct 2026")
 */
function formatDeadline(dateStr?: string): { formatted: string; isPast: boolean } {
  if (!dateStr) return { formatted: '', isPast: false };
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return { formatted: dateStr, isPast: false };
    
    const now = new Date();
    const isPast = d < now;
    const formatted = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    return { formatted, isPast };
  } catch {
    return { formatted: dateStr, isPast: false };
  }
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenDetails,
  onOpenSubmission,
  isSubmitted
}) => {
  // Derive contributor count safely
  const contributorCount = Array.isArray(project.contributors)
    ? project.contributors.length
    : typeof project.contributors === 'number'
      ? project.contributors
      : 0;

  const maxSpots = project.maxContributors || 0;
  const isFull = maxSpots > 0 && contributorCount >= maxSpots;

  const { formatted: deadlineFormatted, isPast: isDeadlinePast } = formatDeadline(project.deadline);
  
  const normStatus = (project.status || 'open').toLowerCase();
  const isClosed = normStatus === 'closed' || isDeadlinePast;
  const isComingSoon = normStatus === 'coming_soon' || normStatus === 'coming-soon';
  const canContribute = !isClosed && !isComingSoon && !isFull && !isSubmitted;

  // Format contributor line text
  let contributorText = UI_COPY.projects.noContributors;
  if (maxSpots > 0) {
    contributorText = UI_COPY.projects.spotsFilled(contributorCount, maxSpots);
  } else if (contributorCount === 1) {
    contributorText = UI_COPY.projects.singularContributor;
  } else if (contributorCount > 1) {
    contributorText = UI_COPY.projects.pluralContributors(contributorCount);
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpenDetails(project);
    }
  };

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
      onClick={() => onOpenDetails(project)}
      onKeyDown={handleKeyDown}
      className={`group rounded-3xl border p-6 transition-all duration-300 flex flex-col justify-between space-y-5 cursor-pointer relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
        isClosed
          ? 'bg-slate-50/80 border-slate-200/80 opacity-75 grayscale-[0.25] hover:border-slate-300'
          : 'bg-white border-slate-200/80 hover:border-blue-300 hover:shadow-xl hover:-translate-y-0.5'
      }`}
    >
      {/* Top Header Row */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
            {project.domain || 'Open Project'}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500 border border-slate-200 px-2.5 py-0.5 rounded-full bg-slate-50">
              {project.difficulty || 'Intermediate'}
            </span>
            <StatusBadge status={isClosed ? 'closed' : project.status} isFull={isFull && !isClosed} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-black text-[#102A5C] group-hover:text-blue-600 transition-colors leading-snug">
            {project.title}
          </h3>
          <p className="text-xs font-medium text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>

      {/* Meta info: Contributors & Deadline */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Users className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span>{contributorText}</span>
          </div>

          {deadlineFormatted && (
            <div className={`flex items-center gap-1.5 ${isDeadlinePast ? 'text-slate-400' : 'text-slate-600'}`}>
              <Clock className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
              <span>{isDeadlinePast ? UI_COPY.projects.closedDeadline : UI_COPY.projects.closesDate(deadlineFormatted)}</span>
            </div>
          )}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {(project.technologies || []).map((tech, i) => (
            <span key={i} className="text-[10px] font-extrabold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-2 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(project);
          }}
          className="text-xs font-extrabold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1"
        >
          <span>{UI_COPY.projects.viewDetails}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {isSubmitted ? (
          <span className="px-4 py-2 bg-emerald-100 text-emerald-800 font-black text-xs rounded-xl inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{UI_COPY.projects.alreadySubmitted}</span>
          </span>
        ) : canContribute ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenSubmission(project);
            }}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs rounded-xl shadow-md transition-all hover:scale-105 active:scale-95"
          >
            {UI_COPY.projects.contributeNow}
          </button>
        ) : null}
      </div>
    </div>
  );
};
