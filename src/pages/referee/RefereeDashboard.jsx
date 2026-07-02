import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { 
  Award, BookOpen, Calendar, ShieldAlert, CheckCircle, 
  ArrowRight, ShieldCheck, HelpCircle 
} from 'lucide-react';

const RefereeDashboard = () => {
  const { currentUser, courses } = useContext(AppContext);
  const profile = currentUser?.refereeProfile || {};

  // Calculate days until certificate expiry
  const checkExpiryWarning = () => {
    if (!profile.expiryDate) return false;
    const expiry = new Date(profile.expiryDate);
    const today = new Date("2026-06-23"); // Setting reference current date
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 180; // Warning if within 6 months (180 days)
  };

  const isRenewalUrgent = checkExpiryWarning();

  // Find enrolled courses detailed data
  const enrolledCoursesData = courses.filter(c => profile.enrolledCourses?.includes(c.id));

  return (
    <div className="space-y-6 faded-bg-dashboard py-2 px-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Welcome back, {currentUser?.name}!</h2>
          <p className="text-sm text-slate-500">Track your progress, earn continuing education credits, and maintain your certifications.</p>
        </div>
        <Link
          to="/dashboard/referee/catalogue"
          className="inline-flex items-center gap-2 bg-emerald-950 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-emerald-900 transition text-sm shadow-md"
        >
          <BookOpen size={18} /> Browse Catalogue
        </Link>
      </div>

      {/* Expiry / Renewal Alert */}
      {isRenewalUrgent && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl flex items-start gap-3 shadow-sm animate-pulse-lime">
          <ShieldAlert className="text-amber-600 shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="text-sm font-bold text-amber-900">Certification Renewal Required</h4>
            <p className="text-xs text-amber-800 mt-1">
              Your <strong>{profile.certLevel}</strong> expires on <strong>{profile.expiryDate}</strong> (within 6 months). 
              You need at least <strong>6 CE Credits</strong> to renew. You currently have <strong>{profile.ceCredits} credits</strong>.
            </p>
            <div className="mt-2.5 flex gap-4">
              <Link 
                to="/dashboard/referee/continuing-education" 
                className="text-xs font-bold text-amber-950 underline hover:text-amber-900"
              >
                Earn CE Credits
              </Link>
              <button className="text-xs font-bold text-amber-950 underline hover:text-amber-900">
                Submit Renewal Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tier level */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute right-3 top-3 bg-emerald-50 text-emerald-800 p-2 rounded-lg">
            <Award size={20} />
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Certification Level</p>
          <h3 className="text-xl font-bold text-slate-800 mt-2">{profile.certLevel || 'None'}</h3>
          <p className="text-xs text-slate-500 mt-1">
            {profile.expiryDate ? `Expires ${profile.expiryDate}` : 'No active certification'}
          </p>
        </div>

        {/* CE Credits */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute right-3 top-3 bg-blue-50 text-blue-800 p-2 rounded-lg">
            <Calendar size={20} />
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">CE Credits Earned</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-2">{profile.ceCredits} <span className="text-xs font-normal text-slate-500">/ 6 required</span></h3>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3">
            <div 
              className="bg-blue-600 h-1.5 rounded-full" 
              style={{ width: `${Math.min(100, (profile.ceCredits / 6) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Completed Courses */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute right-3 top-3 bg-lime-50 text-lime-800 p-2 rounded-lg">
            <ShieldCheck size={20} />
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Completed Tiers</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-2">{profile.completedCourses?.length || 0}</h3>
          <p className="text-xs text-slate-500 mt-1">Out of 3 core certifications</p>
        </div>

        {/* Overall Average Quiz Score */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute right-3 top-3 bg-purple-50 text-purple-800 p-2 rounded-lg">
            <HelpCircle size={20} />
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Passed Quizzes</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-2">
            {Object.values(profile.quizAttempts || {}).filter(q => q.passed).length}
          </h3>
          <p className="text-xs text-slate-500 mt-1">Quiz attempts logged: {Object.keys(profile.quizAttempts || {}).length}</p>
        </div>
      </div>

      {/* Enrolled Courses Progress */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">My Enrolled Courses</h3>
          <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
            {enrolledCoursesData.length} Course(s)
          </span>
        </div>

        <div className="p-5 divide-y divide-slate-100">
          {enrolledCoursesData.length > 0 ? (
            enrolledCoursesData.map((course) => {
              const progress = profile.courseProgress[course.id] || 0;
              const isCompleted = progress === 100;
              
              return (
                <div key={course.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-800 hover:text-emerald-950">{course.title}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        course.tier === 'Regional' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                        course.tier === 'National' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                        'bg-purple-50 text-purple-800 border-purple-200'
                      }`}>
                        {course.tier}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">{course.description}</p>
                  </div>

                  <div className="flex items-center gap-6 self-end md:self-auto">
                    {/* Progress Bar */}
                    <div className="text-right w-36">
                      <div className="flex items-center justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-500">Progress</span>
                        <span className="text-slate-800">{progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${isCompleted ? 'bg-emerald-600' : 'bg-lime-500'}`} 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Actions */}
                    {isCompleted ? (
                      <Link
                        to={`/dashboard/referee/certificates`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 border border-emerald-200 py-1.5 px-3 rounded-lg hover:bg-emerald-100 transition"
                      >
                        <Award size={14} /> Certificate
                      </Link>
                    ) : (
                      <Link
                        to={`/dashboard/referee/learning/${course.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-white bg-emerald-950 hover:bg-emerald-900 py-1.5 px-3 rounded-lg transition"
                      >
                        <span>Resume</span>
                        <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-slate-500">
              <BookOpen size={40} className="mx-auto text-slate-300 mb-2" />
              <p className="font-semibold">No active enrollments</p>
              <p className="text-xs text-slate-400 mt-1">Enroll in courses from the Course Catalogue to get started.</p>
            </div>
          )}
        </div>
      </div>

      {/* Quiz Log */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
        <h3 className="font-bold text-slate-800 mb-4">Quiz History & Score Logs</h3>
        {Object.keys(profile.quizAttempts || {}).length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold">
                  <th className="pb-2">Quiz Name</th>
                  <th className="pb-2">Score</th>
                  <th className="pb-2">Attempts Used</th>
                  <th className="pb-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Object.entries(profile.quizAttempts).map(([quizId, data]) => {
                  return (
                    <tr key={quizId} className="hover:bg-slate-50">
                      <td className="py-3 font-semibold text-slate-800">
                        {quizId.replace('q-', 'Module ').replace('-', ' ').toUpperCase()}
                      </td>
                      <td className="py-3 font-bold text-slate-700">{data.score}%</td>
                      <td className="py-3 text-slate-500">{data.attempts} / 3</td>
                      <td className="py-3 text-center">
                        {data.passed ? (
                          <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                            PASSED
                          </span>
                        ) : data.locked ? (
                          <span className="bg-red-100 text-red-800 border border-red-200 px-2 py-0.5 rounded-full font-bold">
                            LOCKED (Review req.)
                          </span>
                        ) : (
                          <span className="bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-bold">
                            FAILED (Retake)
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-500 text-center py-4">No quiz attempts logged yet.</p>
        )}
      </div>
    </div>
  );
};

export default RefereeDashboard;
