import React from 'react';
import { AmorphousLogo } from '../components/AmorphousLogo';
import { useApp } from '../context/AppContext';

export const LoginPage: React.FC = () => {
  const { setActivePath } = useApp();

  const handleSignIn = () => {
    setActivePath('/dashboard');
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-white selection:bg-blue-500 selection:text-white">
      {/* LEFT SIDE: Slogan & Abstract Molecular Graphics */}
      <div className="relative w-full md:w-1/2 bg-gradient-to-br from-white via-blue-50/60 to-blue-100/50 p-8 lg:p-14 flex flex-col justify-between overflow-hidden min-h-[500px] md:min-h-screen border-b md:border-b-0 md:border-r border-slate-200">
        
        {/* Logo Top Left */}
        <div className="relative z-10">
          <AmorphousLogo size="md" showSubtitle={true} />
        </div>

        {/* Molecular Network Background SVG Art */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 800 800" fill="none">
          {/* Subtle grid network */}
          <line x1="200" y1="500" x2="350" y2="650" stroke="#3B82F6" strokeWidth="1.5" />
          <line x1="350" y1="650" x2="500" y2="550" stroke="#3B82F6" strokeWidth="1.5" />
          <line x1="500" y1="550" x2="600" y2="700" stroke="#3B82F6" strokeWidth="1.5" />
          <line x1="350" y1="650" x2="300" y2="750" stroke="#3B82F6" strokeWidth="1.5" />

          {/* Molecular 3D spheres */}
          <circle cx="200" cy="500" r="18" fill="url(#blue-grad-1)" className="animate-pulse" />
          <circle cx="350" cy="650" r="28" fill="url(#blue-grad-2)" />
          <circle cx="500" cy="550" r="22" fill="url(#blue-grad-1)" />
          <circle cx="600" cy="700" r="24" fill="url(#blue-grad-2)" />
          <circle cx="300" cy="750" r="16" fill="url(#blue-grad-1)" />

          <defs>
            <radialGradient id="blue-grad-1" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#93C5FD" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </radialGradient>
            <radialGradient id="blue-grad-2" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#BFDBFE" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </radialGradient>
          </defs>
        </svg>

        {/* Hero Slogan Text */}
        <div className="relative z-10 my-12 max-w-lg">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#102A5C] leading-none tracking-tight">
            Materials.<br />
            Data.<br />
            Computation.<br />
            <span className="text-blue-600">AI.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg font-medium text-slate-600 leading-relaxed max-w-sm">
            Learn, build and explore the future of materials science.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-200/80 flex items-center gap-3 text-xs font-bold tracking-widest text-slate-500 uppercase">
            <span>MATERIALS</span>
            <span>•</span>
            <span>COMPUTATION</span>
            <span>•</span>
            <span>AI</span>
          </div>
        </div>

        {/* Empty Footer spacing alignment */}
        <div className="relative z-10 text-[11px] text-slate-400"></div>
      </div>

      {/* RIGHT SIDE: Clean Sign In Form */}
      <div className="w-full md:w-1/2 bg-white p-8 lg:p-14 flex flex-col justify-between items-center text-center min-h-[450px] md:min-h-screen">
        <div className="w-full"></div>

        <div className="w-full max-w-sm space-y-6">
          <div>
            <h2 className="text-3xl font-extrabold text-[#102A5C] tracking-tight">
              Sign in to continue
            </h2>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Use your official NIT Bhopal student account.
            </p>
          </div>

          {/* Continue with Google Mock Button */}
          <button
            onClick={handleSignIn}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl shadow-sm text-slate-800 font-semibold text-sm transition-all hover:shadow-md hover:border-slate-300 active:scale-98"
          >
            {/* Google Icon SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          <p className="text-xs text-slate-400">
            By signing in, you agree to the{' '}
            <a href="#" className="text-blue-600 hover:underline">society guidelines</a>.
          </p>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-slate-100 w-full max-w-xs text-center">
          <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
            AMORPHUS <span className="mx-1">•</span> NIT BHOPAL
          </p>
        </div>
      </div>
    </div>
  );
};
