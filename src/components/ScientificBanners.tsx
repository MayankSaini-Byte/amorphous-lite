import React from 'react';

interface BannerProps {
  type: 'computation' | 'business' | 'analytical' | 'research' | 'workshops' | 'talks' | 'technical';
  className?: string;
}

export const ScientificBanner: React.FC<BannerProps> = ({ type, className = '' }) => {
  switch (type) {
    case 'computation':
      return (
        <div className={`relative w-full h-36 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 overflow-hidden flex items-center justify-center ${className}`}>
          {/* Circuit pattern overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid-comp" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#60A5FA" strokeWidth="0.8" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-comp)" />
          </svg>
          
          {/* Code window abstraction */}
          <div className="relative z-10 border-2 border-blue-400/40 bg-blue-950/60 backdrop-blur-md rounded-xl px-6 py-3 shadow-lg flex items-center gap-2">
            <span className="text-blue-300 font-mono text-xl font-bold tracking-wider">&lt;/&gt;</span>
          </div>

          {/* Glowing nodes */}
          <div className="absolute top-4 right-10 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_12px_#60A5FA]" />
          <div className="absolute bottom-6 left-12 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_16px_#67E8F9]" />
        </div>
      );

    case 'business':
      return (
        <div className={`relative w-full h-36 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-950 overflow-hidden flex items-center justify-center ${className}`}>
          <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120 Q 150 40, 300 80 T 600 20" fill="none" stroke="#C084FC" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

          {/* Bar Chart & Arrow illustration */}
          <div className="relative z-10 flex items-end gap-2.5 h-16 px-4 py-2 border border-purple-400/30 bg-purple-950/50 backdrop-blur-md rounded-xl shadow-lg">
            <div className="w-3.5 bg-purple-400/50 rounded-t h-6" />
            <div className="w-3.5 bg-purple-400/80 rounded-t h-10" />
            <div className="w-3.5 bg-purple-300 rounded-t h-14" />
            <div className="w-3.5 bg-purple-200 rounded-t h-12" />
            {/* Arrow up icon */}
            <svg className="w-6 h-6 text-purple-200 -mt-8 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      );

    case 'analytical':
      return (
        <div className={`relative w-full h-36 bg-gradient-to-r from-teal-950 via-teal-900 to-emerald-950 overflow-hidden flex items-center justify-center ${className}`}>
          {/* Waveform graph overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 70 Q 50 10, 100 70 T 200 70 T 300 10 T 400 90" fill="none" stroke="#2DD4BF" strokeWidth="2" />
          </svg>

          {/* Microscope SVG icon */}
          <div className="relative z-10 p-3 rounded-full border border-teal-400/40 bg-teal-950/60 backdrop-blur-md text-teal-300 shadow-lg">
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 18h12M12 18v-4M9 14h6M12 10a3 3 0 100-6 3 3 0 000 6z" />
              <path d="M12 4V2M15 7l2-2M9 7L7 5" />
            </svg>
          </div>
        </div>
      );

    case 'research':
      return (
        <div className={`relative w-full h-36 bg-gradient-to-r from-amber-900 via-orange-900 to-red-950 overflow-hidden flex items-center justify-center ${className}`}>
          {/* Molecular network grid */}
          <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
            <line x1="30" y1="30" x2="120" y2="80" stroke="#FDBA74" strokeWidth="1.5" />
            <line x1="120" y1="80" x2="220" y2="40" stroke="#FDBA74" strokeWidth="1.5" />
            <circle cx="30" cy="30" r="6" fill="#FB923C" />
            <circle cx="120" cy="80" r="8" fill="#FDBA74" />
            <circle cx="220" cy="40" r="7" fill="#F97316" />
          </svg>

          {/* Document / Paper icon abstraction */}
          <div className="relative z-10 border border-orange-400/40 bg-orange-950/60 backdrop-blur-md rounded-xl p-3 text-orange-200 shadow-lg">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
      );

    case 'workshops':
      return (
        <div className={`relative w-full h-36 bg-gradient-to-r from-slate-900 via-cyan-950 to-teal-950 overflow-hidden flex items-center justify-center ${className}`}>
          {/* Gears pattern */}
          <div className="relative z-10 flex items-center gap-3 p-3 border border-cyan-400/40 bg-slate-950/60 backdrop-blur-md rounded-xl text-cyan-300 shadow-lg">
            <svg className="w-9 h-9 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
      );

    case 'talks':
      return (
        <div className={`relative w-full h-36 bg-gradient-to-r from-blue-950 via-indigo-900 to-blue-900 overflow-hidden flex items-center justify-center ${className}`}>
          {/* Soundwaves */}
          <div className="relative z-10 border border-blue-400/40 bg-blue-950/60 backdrop-blur-md rounded-xl p-3 text-blue-300 flex items-center gap-3 shadow-lg">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <div className="flex items-center gap-1">
              <span className="w-1 h-4 bg-blue-400 rounded animate-pulse" />
              <span className="w-1 h-7 bg-blue-300 rounded animate-pulse" />
              <span className="w-1 h-5 bg-blue-400 rounded animate-pulse" />
            </div>
          </div>
        </div>
      );

    case 'technical':
    default:
      return (
        <div className={`relative w-full h-36 bg-gradient-to-r from-blue-950 via-blue-900 to-cyan-950 overflow-hidden flex items-center justify-center ${className}`}>
          <div className="relative z-10 flex items-center gap-4 px-5 py-3 border border-blue-400/40 bg-blue-950/60 backdrop-blur-md rounded-xl text-blue-300 shadow-lg">
            {/* Beaker Flask */}
            <svg className="w-8 h-8 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.6 15.12a2 2 0 00-1.022.547l-1.168 1.168a2 2 0 00-.586 1.414V20a2 2 0 002 2h14a2 2 0 002-2v-1.75a2 2 0 00-.586-1.414l-1.168-1.168z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 2h6v4L9 6V2z" />
            </svg>
            <span className="text-sm font-semibold text-blue-200">Lab Analysis & Structure</span>
          </div>
        </div>
      );
  }
};
