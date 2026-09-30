import React, { useState } from 'react';
import { User, Mail, School, Award, Save, CheckCircle2, ChevronRight, ChevronLeft, ExternalLink, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RECRUITMENT_ANNOUNCEMENTS } from '../data/arenaMockData';

export const ProfilePage: React.FC = () => {
  const { userProfile, updateUserProfile, openMotifArena, isMotifWarping } = useApp();

  const [department, setDepartment] = useState(userProfile.department);
  const [batch, setBatch] = useState(userProfile.batch);
  const [bio, setBio] = useState(userProfile.bio);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Recruitment slider state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentAnnouncement = RECRUITMENT_ANNOUNCEMENTS[currentSlideIndex];

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % RECRUITMENT_ANNOUNCEMENTS.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + RECRUITMENT_ANNOUNCEMENTS.length) % RECRUITMENT_ANNOUNCEMENTS.length);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ department, batch, bio });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl relative">

      {/* PORTAL WARP ANIMATION OVERLAY */}
      {isMotifWarping && (
        <div className="fixed inset-0 z-50 bg-blue-950 flex flex-col items-center justify-center space-y-6 text-white animate-in fade-in zoom-in duration-500">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-blue-400 border-t-transparent animate-spin" />
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_50px_#2563EB] animate-pulse">
              <Zap className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black tracking-widest uppercase text-cyan-300">
              WARPING TO MOTIF STUDY ARENA...
            </h2>
            <p className="text-xs text-blue-200 font-medium">Entering interactive lectures, achievements & leaderboard</p>
          </div>
        </div>
      )}

      {/* HEADER SECTION WITH MOTIF BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-extrabold tracking-widest text-blue-600 uppercase">
            <span className="w-3 h-0.5 bg-blue-600" />
            <span>ACCOUNT PROFILE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A5C]">
            My Profile
          </h1>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Official student account details, society status, and Motif Study Arena portal.
          </p>
        </div>

        {/* MOTIF BUTTON WITH ANIMATION TRIGGER */}
        <button
          onClick={openMotifArena}
          className="relative group overflow-hidden px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-black text-xs rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-2.5"
        >
          <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
          <Zap className="w-4 h-4 text-cyan-300 animate-bounce" />
          <span className="tracking-wider uppercase">Motif Study Arena</span>
          <ChevronRight className="w-4 h-4 text-cyan-300 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* RECRUITMENT STATUS ANNOUNCEMENT SLIDER BAR */}
      <div className="relative bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-6 text-white border border-blue-800/50 shadow-md overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold tracking-widest text-cyan-400 uppercase">
              RECRUITMENT & DRIVES ANNOUNCEMENT
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
              currentAnnouncement.status === 'OPEN' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
            }`}>
              {currentAnnouncement.status === 'OPEN' ? 'RECRUITMENT OPEN' : 'RECRUITMENT CLOSED'}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevSlide}
              className="p-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[10px] font-bold px-1 text-slate-300">
              {currentSlideIndex + 1} / {RECRUITMENT_ANNOUNCEMENTS.length}
            </span>
            <button
              onClick={handleNextSlide}
              className="p-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="py-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-white">
              {currentAnnouncement.title}
            </h3>
            <span className="text-xs font-semibold text-cyan-300">
              Deadline: {currentAnnouncement.deadline}
            </span>
          </div>
          <p className="text-xs text-slate-300 font-medium">
            {currentAnnouncement.description}
          </p>

          {/* Join Buttons */}
          <div className="pt-3 flex flex-wrap items-center gap-2.5">
            {currentAnnouncement.joinLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : '_self'}
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  link.type === 'primary'
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xs'
                    : link.type === 'whatsapp'
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-blue-200 border border-white/10'
                }`}
              >
                <span>{link.label}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* READONLY IDENTITY CARD */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-lg space-y-6 relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-blue-300 shadow-inner">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-wide">
              {userProfile.studentId}
            </h2>
            <p className="text-xs text-blue-200 font-medium mt-0.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>{userProfile.email}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2.5">
            <School className="w-4 h-4 text-blue-400" />
            <div>
              <p className="text-[10px] text-blue-300 uppercase font-bold">Institution</p>
              <p className="font-semibold text-white">{userProfile.institution}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Award className="w-4 h-4 text-blue-400" />
            <div>
              <p className="text-[10px] text-blue-300 uppercase font-bold">Society</p>
              <p className="font-semibold text-white">{userProfile.society}</p>
            </div>
          </div>
        </div>
      </div>

      {/* EDITABLE DETAILS FORM */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-5 shadow-xs">
        <h3 className="text-sm font-extrabold text-[#102A5C] uppercase tracking-wider">
          Academic Information & Bio
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Batch / Academic Year</label>
            <input
              type="text"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Bio & Research Interests</label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
            </span>
          ) : (
            <span />
          )}

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};
