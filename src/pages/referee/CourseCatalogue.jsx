import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Lock, BookOpen, Clock, Award, CheckCircle } from 'lucide-react';

const CourseCatalogue = () => {
  const { courses, currentUser, enrollInCourse } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();

  const profile = currentUser?.refereeProfile || {};
  const completedCourses = profile.completedCourses || [];
  const enrolledCourses = profile.enrolledCourses || [];

  // Prerequisite check helper
  const isLocked = (course) => {
    if (course.prerequisites && course.prerequisites.length > 0) {
      // If any prerequisite is not completed
      return course.prerequisites.some(prereqId => !completedCourses.includes(prereqId));
    }
    return false;
  };

  const handleEnroll = (courseId) => {
    enrollInCourse(courseId);
  };

  const filteredCourses = activeTab === 'All' 
    ? courses.filter(c => c.status !== 'pending_approval')
    : courses.filter(c => c.tier === activeTab && c.status !== 'pending_approval');

  const getPrerequisiteTitles = (prereqIds) => {
    return prereqIds.map(id => {
      const found = courses.find(c => c.id === id);
      return found ? found.title : id;
    }).join(', ');
  };

  return (
    <div className="space-y-6 faded-bg-courses py-2 px-1">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Course Catalogue</h2>
        <p className="text-sm text-slate-500">Access official training materials. Unlock advanced modules by completing foundational tiers.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        {['All', 'Regional', 'National', 'International'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all focus:outline-none ${
              activeTab === tab 
                ? 'border-emerald-800 text-emerald-950' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const locked = isLocked(course);
          const enrolled = enrolledCourses.includes(course.id);
          const completed = completedCourses.includes(course.id);
          const progress = profile.courseProgress?.[course.id] || 0;

          return (
            <div 
              key={course.id} 
              className={`bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between transition-all duration-200 ${
                locked ? 'border-slate-200 opacity-80' : 'border-slate-200 hover:shadow-md'
              }`}
            >
              {/* Header Badge */}
              <div className="p-5 pb-0 flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  course.tier === 'Regional' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                  course.tier === 'National' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                  'bg-purple-50 text-purple-800 border-purple-200'
                }`}>
                  {course.tier}
                </span>
                
                {completed ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle size={12} /> Passed
                  </span>
                ) : enrolled ? (
                  <span className="text-[10px] font-bold text-lime-800 bg-lime-50 px-2 py-0.5 rounded-full border border-lime-200">
                    Enrolled ({progress}%)
                  </span>
                ) : null}
              </div>

              {/* Core Content */}
              <div className="p-5 flex-1 space-y-3">
                <h3 className="font-bold text-slate-800 leading-snug">{course.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{course.description}</p>
                
                {/* Specs */}
                <div className="flex gap-4 text-xs font-semibold text-slate-500 pt-2">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{course.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award size={14} />
                    <span>{course.credits} Credits</span>
                  </div>
                </div>

                {/* Prerequisites Warning */}
                {locked && (
                  <div className="bg-red-50 border border-red-100 rounded-lg p-2.5 flex items-start gap-2 mt-2">
                    <Lock size={14} className="text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold text-red-900">Tier Locked</p>
                      <p className="text-[9px] text-red-800 mt-0.5">
                        Requires: {getPrerequisiteTitles(course.prerequisites)}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="p-5 pt-0 border-t border-slate-50 mt-auto bg-slate-50/50 py-3">
                {locked ? (
                  <button
                    disabled
                    className="w-full bg-slate-200 text-slate-400 font-bold py-2 rounded-lg text-xs cursor-not-allowed flex items-center justify-center gap-1"
                  >
                    <Lock size={12} /> Course Locked
                  </button>
                ) : completed ? (
                  <button
                    onClick={() => navigate('/dashboard/referee/certificates')}
                    className="w-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold py-2 rounded-lg text-xs transition"
                  >
                    View Certificate
                  </button>
                ) : enrolled ? (
                  <button
                    onClick={() => navigate(`/dashboard/referee/learning/${course.id}`)}
                    className="w-full bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-2 rounded-lg text-xs transition shadow-sm"
                  >
                    Resume Learning
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll(course.id)}
                    className="w-full bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-2 rounded-lg text-xs transition shadow-sm"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseCatalogue;
