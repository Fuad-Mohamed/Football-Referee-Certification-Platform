import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Calendar, Award, CheckCircle, Clock, User, AlertCircle } from 'lucide-react';

const ContinuingEducation = () => {
  const { ceSeminars, currentUser, enrollInCeSeminar, claimCeCredits } = useContext(AppContext);
  
  const profile = currentUser?.refereeProfile || {};
  const currentCredits = profile.ceCredits || 0;

  // Filter lists
  const availableSeminars = ceSeminars.filter(s => !s.completed);
  const completedSeminars = ceSeminars.filter(s => s.completed);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Continuing Education (CE) Credits</h2>
          <p className="text-sm text-slate-500">Active referees must earn 6 CE credits annually to renew credentials.</p>
        </div>
        <div className="bg-emerald-950 text-white px-5 py-3 rounded-xl border border-emerald-900 shadow-sm flex items-center gap-3">
          <Award className="text-lime-400" size={28} />
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">My Earned Credits</p>
            <p className="text-xl font-bold text-white">{currentCredits} / 6 Credits</p>
          </div>
        </div>
      </div>

      {/* Credit Progress Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex justify-between items-center text-xs font-semibold mb-2">
          <span className="text-slate-500">Yearly Renewal Requirement Progress</span>
          <span className="text-slate-800 font-bold">{Math.round(Math.min(100, (currentCredits / 6) * 100))}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div 
            className="bg-emerald-800 h-2 rounded-full transition-all"
            style={{ width: `${Math.min(100, (currentCredits / 6) * 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Seminars */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-slate-800 text-base">Upcoming Seminars & Courses</h3>
          
          {availableSeminars.length > 0 ? (
            availableSeminars.map((seminar) => (
              <div 
                key={seminar.id} 
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3 hover:border-slate-300 transition"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 leading-snug">{seminar.title}</h4>
                    <p className="text-xs text-slate-500">{seminar.description}</p>
                  </div>
                  <span className="bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold px-2 py-0.5 rounded shrink-0">
                    +{seminar.credits} CE Credits
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-[11px] font-semibold text-slate-500 pt-1">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-emerald-800" />
                    <span>{seminar.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-emerald-800" />
                    <span>{seminar.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={14} className="text-emerald-800" />
                    <span>Instructor: {seminar.instructor}</span>
                  </div>
                </div>

                <div className="border-t border-slate-50 pt-3 flex justify-end">
                  {seminar.enrolled ? (
                    <button
                      onClick={() => claimCeCredits(seminar.id)}
                      className="bg-lime-400 hover:bg-lime-300 text-emerald-950 font-bold py-2 px-5 rounded-lg text-xs transition shadow-sm flex items-center gap-1.5"
                    >
                      <CheckCircle size={14} />
                      <span>Simulate Completion & Claim Credits</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => enrollInCeSeminar(seminar.id)}
                      className="bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-2 px-5 rounded-lg text-xs transition shadow-sm"
                    >
                      Enroll in Seminar
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500 py-6 text-center">No upcoming seminars available.</p>
          )}
        </div>

        {/* Right Col: Seminar History */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-bold text-slate-800 text-base">Completed Seminars</h3>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            {completedSeminars.length > 0 ? (
              completedSeminars.map((seminar) => (
                <div key={seminar.id} className="text-xs border-b border-slate-100 last:border-b-0 pb-3 last:pb-0 space-y-1.5">
                  <div className="flex items-start justify-between gap-1">
                    <p className="font-bold text-slate-800 line-clamp-1">{seminar.title}</p>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded shrink-0">
                      +{seminar.credits}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[10px]">Completed on: {seminar.date}</p>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-slate-500">
                <AlertCircle size={24} className="mx-auto text-slate-300 mb-1" />
                <p className="font-semibold text-xs">No Completed Seminars</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Your seminar credits history will show here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinuingEducation;
