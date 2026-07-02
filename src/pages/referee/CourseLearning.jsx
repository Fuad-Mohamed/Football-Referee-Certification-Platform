import React, { useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { PlayCircle, FileText, CheckCircle2, Lock, ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';

const CourseLearning = () => {
  const { courseId } = useParams();
  const { courses, currentUser } = useContext(AppContext);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const navigate = useNavigate();

  const course = courses.find(c => c.id === courseId);
  const profile = currentUser?.refereeProfile || {};

  if (!course) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
        <p className="text-slate-500 font-semibold">Course not found.</p>
        <Link to="/dashboard/referee/catalogue" className="text-emerald-800 underline font-bold mt-2 inline-block">
          Return to Catalogue
        </Link>
      </div>
    );
  }

  const activeModule = course.modules[activeModuleIndex];
  const quizAttempts = profile.quizAttempts || {};

  // Check if a specific module quiz is passed
  const isModulePassed = (module) => {
    const attempt = quizAttempts[module.quiz.id];
    return attempt ? attempt.passed : false;
  };

  const isModuleAttempted = (module) => {
    const attempt = quizAttempts[module.quiz.id];
    return attempt ? attempt.attempts > 0 : false;
  };

  const isModuleLocked = (index) => {
    // A module is locked if the previous module's quiz is not passed
    if (index === 0) return false;
    const prevModule = course.modules[index - 1];
    return !isModulePassed(prevModule);
  };

  const handleNext = () => {
    if (activeModuleIndex < course.modules.length - 1) {
      if (!isModulePassed(activeModule)) {
        // Locked gate
        return;
      }
      setActiveModuleIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (activeModuleIndex > 0) {
      setActiveModuleIndex(prev => prev - 1);
    }
  };

  const allModulesPassed = course.modules.every(m => isModulePassed(m));

  return (
    <div className="space-y-6">
      {/* Back Header */}
      <div className="flex items-center gap-3">
        <Link 
          to="/dashboard/referee/catalogue" 
          className="text-slate-500 hover:text-slate-800 transition p-1.5 hover:bg-slate-200 rounded-lg"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-slate-800">{course.title}</h2>
          <p className="text-xs text-slate-500">Tier: {course.tier} • {course.modules.length} Modules</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Modules Sidebar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm lg:col-span-1 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Course Modules</h3>
          <nav className="space-y-1">
            {course.modules.map((mod, idx) => {
              const locked = isModuleLocked(idx);
              const active = idx === activeModuleIndex;
              const passed = isModulePassed(mod);

              return (
                <button
                  key={mod.id}
                  disabled={locked}
                  onClick={() => setActiveModuleIndex(idx)}
                  className={`
                    w-full flex items-center justify-between text-left p-3 rounded-lg text-xs font-semibold transition-all
                    ${active 
                      ? 'bg-emerald-950 text-white shadow-sm' 
                      : locked
                        ? 'text-slate-300 cursor-not-allowed bg-slate-50/50'
                        : 'text-slate-600 hover:bg-slate-100'
                    }
                  `}
                >
                  <div className="flex items-center gap-2 truncate">
                    {passed ? (
                      <CheckCircle2 size={16} className={active ? 'text-lime-400' : 'text-emerald-600'} />
                    ) : locked ? (
                      <Lock size={14} className="text-slate-300" />
                    ) : (
                      <PlayCircle size={16} className={active ? 'text-lime-400' : 'text-slate-400'} />
                    )}
                    <span className="truncate">{mod.title.replace(/Module \d+: /, '')}</span>
                  </div>
                  {passed && !active && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">Pass</span>
                  )}
                </button>
              );
            })}
          </nav>

          {allModulesPassed && (
            <div className="pt-2">
              <Link
                to={`/dashboard/referee/certificates`}
                className="w-full bg-lime-400 hover:bg-lime-300 text-emerald-950 text-xs font-bold py-2.5 px-3 rounded-lg transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Award size={16} />
                <span>Claim Certificate</span>
              </Link>
            </div>
          )}
        </div>

        {/* Core Lesson Screen */}
        <div className="lg:col-span-3 space-y-6">
          {/* Video Player */}
          <div className="bg-black aspect-video rounded-xl overflow-hidden shadow-md border border-slate-900 relative">
            {activeModule.videoUrl ? (
              <iframe
                title={activeModule.title}
                src={activeModule.videoUrl}
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-slate-950">
                <PlayCircle size={48} className="text-slate-700 animate-pulse" />
                <p className="mt-2 text-sm font-semibold">Video training unavailable</p>
              </div>
            )}
          </div>

          {/* Reading Material */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-2">
              <FileText className="text-emerald-800" size={20} />
              <span>Study Notes & Reference Material</span>
            </h3>
            
            <div 
              className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600 space-y-3"
              dangerouslySetInnerHTML={{ __html: activeModule.readingMaterial }}
            />
          </div>

          {/* Controls Footer & Quiz Call */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                disabled={activeModuleIndex === 0}
                onClick={handlePrevious}
                className={`
                  flex items-center gap-1 text-xs font-bold py-2 px-4 rounded-lg border transition w-1/2 sm:w-auto justify-center
                  ${activeModuleIndex === 0 
                    ? 'border-slate-200 text-slate-300 cursor-not-allowed' 
                    : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                  }
                `}
              >
                <ArrowLeft size={14} />
                <span>Prev Module</span>
              </button>

              <button
                disabled={activeModuleIndex === course.modules.length - 1 || !isModulePassed(activeModule)}
                onClick={handleNext}
                className={`
                  flex items-center gap-1 text-xs font-bold py-2 px-4 rounded-lg border transition w-1/2 sm:w-auto justify-center
                  ${(activeModuleIndex === course.modules.length - 1 || !isModulePassed(activeModule))
                    ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50/50' 
                    : 'border-emerald-800 text-emerald-950 hover:bg-slate-50'
                  }
                `}
              >
                <span>Next Module</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Assessment Panel */}
            <div className="w-full sm:w-auto">
              {isModulePassed(activeModule) ? (
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-lg border border-emerald-200 text-xs font-bold">
                  <CheckCircle2 size={16} />
                  <span>Module Assessment Passed!</span>
                </div>
              ) : (
                <Link
                  to={`/dashboard/referee/quiz/${course.id}/${activeModule.id}`}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-2 px-4 rounded-lg transition text-xs shadow-sm"
                >
                  <HelpCircle size={16} />
                  <span>
                    {isModuleAttempted(activeModule) ? 'Retake Quiz' : 'Take Module Quiz'}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearning;
