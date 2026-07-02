import React, { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { 
  GraduationCap, BookOpen, Users, ClipboardCheck, Plus, 
  Trash2, ShieldCheck, CheckCircle2, Lock, Unlock, AlertCircle 
} from 'lucide-react';

const InstructorDashboard = () => {
  const { 
    courses, users, stats, instructorCreateCourse, instructorUnlockQuiz 
  } = useContext(AppContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  // State for Course Creator Form
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDesc, setCourseDesc] = useState('');
  const [courseTier, setCourseTier] = useState('Regional');
  const [courseTime, setCourseTime] = useState('6 Hours');
  const [courseCredits, setCourseCredits] = useState(5);
  const [modules, setModules] = useState([]);
  
  // Single Module builder state
  const [modTitle, setModTitle] = useState('');
  const [modVideo, setModVideo] = useState('');
  const [modReading, setModReading] = useState('');
  const [questions, setQuestions] = useState([]);

  // Question builder state
  const [qText, setQText] = useState('');
  const [qType, setQType] = useState('multiple');
  const [qCorrect, setQCorrect] = useState('');
  const [qOptions, setQOptions] = useState(['', '', '', '']);

  const [successMsg, setSuccessMsg] = useState('');

  // Filtering Referees
  const referees = users.filter(u => u.role === 'referee');

  // Identify locked quizzes
  const lockedAttempts = [];
  referees.forEach(ref => {
    const attempts = ref.refereeProfile?.quizAttempts || {};
    Object.entries(attempts).forEach(([quizId, data]) => {
      if (data.locked) {
        // Find course name and module name
        let foundCourse = null;
        let foundModule = null;
        courses.forEach(c => {
          c.modules.forEach(m => {
            if (m.quiz.id === quizId) {
              foundCourse = c;
              foundModule = m;
            }
          });
        });

        lockedAttempts.push({
          refereeId: ref.id,
          refereeName: ref.name,
          quizId,
          courseTitle: foundCourse ? foundCourse.title : 'Course',
          moduleTitle: foundModule ? foundModule.title : 'Module',
          attempts: data.attempts,
          score: data.score
        });
      }
    });
  });

  const handleAddQuestion = () => {
    if (!qText || !qCorrect) return;
    const newQ = {
      id: `q-${Date.now()}-${questions.length}`,
      type: qType,
      question: qText,
      correctAnswer: qCorrect,
    };
    if (qType === 'multiple') {
      newQ.options = qOptions.filter(o => o.trim() !== '');
    }
    setQuestions(prev => [...prev, newQ]);
    
    // Clear question creator
    setQText('');
    setQCorrect('');
    setQOptions(['', '', '', '']);
  };

  const handleAddModule = () => {
    if (!modTitle || !modReading) return;
    const newMod = {
      id: `m-${Date.now()}-${modules.length}`,
      title: modTitle,
      videoUrl: modVideo || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      readingMaterial: modReading,
      quiz: {
        id: `q-${Date.now()}-${modules.length}-quiz`,
        title: `${modTitle} Assessment`,
        questions
      }
    };
    setModules(prev => [...prev, newMod]);
    
    // Clear module creator
    setModTitle('');
    setModVideo('');
    setModReading('');
    setQuestions([]);
  };

  const handlePublishCourse = (e) => {
    e.preventDefault();
    if (!courseTitle || !courseDesc || modules.length === 0) return;

    const courseData = {
      title: courseTitle,
      description: courseDesc,
      tier: courseTier,
      estimatedTime: courseTime,
      credits: parseInt(courseCredits),
      modules
    };

    instructorCreateCourse(courseData);
    setSuccessMsg('Course drafted and submitted for administrative approval!');
    
    // Reset Form
    setCourseTitle('');
    setCourseDesc('');
    setCourseTier('Regional');
    setCourseTime('6 Hours');
    setCourseCredits(5);
    setModules([]);
    
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const handleUnlock = (refereeId, quizId) => {
    instructorUnlockQuiz(refereeId, quizId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Instructor Board</h2>
        <p className="text-sm text-slate-500">Design curriculum courses, evaluate referee learners, and manage quiz lock exceptions.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setSearchParams({ tab: 'overview' })}
          className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all focus:outline-none ${
            activeTab === 'overview' ? 'border-emerald-800 text-emerald-950' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setSearchParams({ tab: 'builder' })}
          className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all focus:outline-none ${
            activeTab === 'builder' ? 'border-emerald-800 text-emerald-950' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Course Creator
        </button>
        <button
          onClick={() => setSearchParams({ tab: 'courses' })}
          className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all focus:outline-none ${
            activeTab === 'courses' ? 'border-emerald-800 text-emerald-950' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          My Courses ({courses.length})
        </button>
        <button
          onClick={() => setSearchParams({ tab: 'locks' })}
          className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all focus:outline-none ${
            activeTab === 'locks' ? 'border-emerald-800 text-emerald-950' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Locked Attempts ({lockedAttempts.length})
        </button>
      </div>

      {/* Overview Panel */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Drafted Courses</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">
                {courses.filter(c => c.status === 'pending_approval').length} Pending
              </h3>
            </div>
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Referees Enrolled</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{referees.length}</h3>
            </div>
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Lock Issues</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1 text-red-600">{lockedAttempts.length} Referees</h3>
            </div>
          </div>

          {/* Referees Table */}
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm mb-4">Referee Learner Progress</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold">
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Tier Level</th>
                    <th className="pb-2">Enrolled Courses</th>
                    <th className="pb-2 text-right">CE Credits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {referees.map(ref => {
                    const prof = ref.refereeProfile || {};
                    return (
                      <tr key={ref.id} className="hover:bg-slate-50">
                        <td className="py-3 font-semibold text-slate-800">{ref.name}</td>
                        <td className="py-3 text-slate-600">{prof.certLevel}</td>
                        <td className="py-3">
                          <div className="flex flex-wrap gap-1">
                            {prof.enrolledCourses?.map(cid => {
                              const prog = prof.courseProgress?.[cid] || 0;
                              return (
                                <span key={cid} className="bg-slate-100 text-[10px] font-bold px-1.5 py-0.5 rounded border border-slate-200">
                                  {cid.toUpperCase()} ({prog}%)
                                </span>
                              );
                            })}
                          </div>
                        </td>
                        <td className="py-3 text-right font-bold text-slate-800">{prof.ceCredits}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Course Creator Form */}
      {activeTab === 'builder' && (
        <div className="bg-white border rounded-xl p-6 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">Add New Referee Course</h3>
            <p className="text-xs text-slate-500 mt-0.5">Design structure, attach reference guides, and establish quiz questions.</p>
          </div>

          {successMsg && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-xs font-bold flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handlePublishCourse} className="space-y-6">
            
            {/* Meta Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Course Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. National Assistant Refereeing Techniques"
                  value={courseTitle} 
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-emerald-800"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Tier</label>
                  <select 
                    value={courseTier} 
                    onChange={(e) => setCourseTier(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2"
                  >
                    <option value="Regional">Regional</option>
                    <option value="National">National</option>
                    <option value="International">International</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Est. Time</label>
                  <input 
                    type="text" 
                    value={courseTime} 
                    onChange={(e) => setCourseTime(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Credits</label>
                  <input 
                    type="number" 
                    value={courseCredits} 
                    onChange={(e) => setCourseCredits(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase">Course Description</label>
              <textarea 
                required
                rows={3}
                placeholder="Give a summary of what learning material this course delivers..."
                value={courseDesc} 
                onChange={(e) => setCourseDesc(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-emerald-800"
              />
            </div>

            {/* Added Modules */}
            {modules.length > 0 && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <h4 className="font-bold text-slate-800 text-xs uppercase">Constructed Modules ({modules.length})</h4>
                <div className="divide-y divide-slate-100 text-xs">
                  {modules.map((m, idx) => (
                    <div key={m.id} className="py-2 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-800">Module {idx + 1}: {m.title}</p>
                        <p className="text-[10px] text-slate-400">Questions configured: {m.quiz.questions.length}</p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setModules(prev => prev.filter(mod => mod.id !== m.id))}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add Module Builder Subform */}
            <div className="border border-dashed border-slate-300 rounded-xl p-5 bg-slate-50/50 space-y-4">
              <h4 className="font-bold text-slate-800 text-xs uppercase flex items-center gap-1">
                <Plus size={16} /> Add Module to Course
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-600 uppercase">Module Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Module 1: Assistant positioning"
                    value={modTitle} 
                    onChange={(e) => setModTitle(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-600 uppercase">YouTube Embedded Video Link</label>
                  <input 
                    type="text" 
                    placeholder="e.g. https://www.youtube.com/embed/dQw4w9WgXcQ"
                    value={modVideo} 
                    onChange={(e) => setModVideo(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-600 uppercase">Reading Material (HTML/Text)</label>
                <textarea 
                  rows={4}
                  placeholder="Enter module reading text here..."
                  value={modReading} 
                  onChange={(e) => setModReading(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs"
                />
              </div>

              {/* Inline Quiz Question Builder */}
              <div className="bg-white border rounded-lg p-4 space-y-3">
                <h5 className="font-bold text-slate-700 text-[11px] uppercase">Configure Module Quiz</h5>
                
                {questions.length > 0 && (
                  <div className="space-y-1 pb-2 divide-y divide-slate-100 text-[11px]">
                    {questions.map((q, idx) => (
                      <div key={q.id} className="py-1.5 flex justify-between text-slate-600">
                        <span>Q{idx+1}: {q.question} (Ans: {q.correctAnswer})</span>
                        <button 
                          type="button"
                          onClick={() => setQuestions(prev => prev.filter(ques => ques.id !== q.id))}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-slate-50 p-3 rounded space-y-3 text-xs">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2 space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Question Text</label>
                      <input 
                        type="text" 
                        value={qText} 
                        onChange={(e) => setQText(e.target.value)}
                        placeholder="Is the handball deliberate?"
                        className="w-full bg-white border p-1 rounded"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Type</label>
                      <select 
                        value={qType} 
                        onChange={(e) => setQType(e.target.value)}
                        className="w-full bg-white border p-1 rounded"
                      >
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True/False</option>
                      </select>
                    </div>
                  </div>

                  {qType === 'multiple' ? (
                    <div className="grid grid-cols-2 gap-2">
                      {qOptions.map((opt, idx) => (
                        <div key={idx} className="space-y-1">
                          <label className="text-[9px] text-slate-400">Option {idx+1}</label>
                          <input 
                            type="text" 
                            value={opt} 
                            onChange={(e) => {
                              const newOpts = [...qOptions];
                              newOpts[idx] = e.target.value;
                              setQOptions(newOpts);
                            }}
                            placeholder={`Option ${idx+1}`}
                            className="w-full bg-white border p-1 rounded"
                          />
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase">Correct Answer</label>
                    <input 
                      type="text" 
                      value={qCorrect} 
                      onChange={(e) => setQCorrect(e.target.value)}
                      placeholder={qType === 'boolean' ? 'True or False' : 'Enter the exact matching text option'}
                      className="w-full bg-white border p-1 rounded"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-1 px-3 rounded text-[10px]"
                  >
                    Add Question to Quiz
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddModule}
                className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold py-2 px-4 rounded text-xs"
              >
                Save and Add Module
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={modules.length === 0}
                className={`font-bold py-2.5 px-6 rounded-lg text-xs shadow-sm transition
                  ${modules.length === 0 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                    : 'bg-emerald-950 hover:bg-emerald-900 text-white'
                  }
                `}
              >
                Publish & Request Approval
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Courses List */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map(course => (
            <div key={course.id} className="bg-white border rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    course.status === 'approved' 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {course.status === 'approved' ? 'Approved & Live' : 'Pending Approval'}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{course.tier}</span>
                </div>
                <h4 className="font-bold text-slate-800 mt-2 leading-snug">{course.title}</h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-3">{course.description}</p>
              </div>
              <div className="border-t border-slate-50 pt-3 mt-4 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                <span>Modules: {course.modules.length}</span>
                <span>Time: {course.estimatedTime}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Locked Attempts Manager */}
      {activeTab === 'locks' && (
        <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 text-sm">Failed Quiz Block Exceptions</h3>
            <p className="text-xs text-slate-500">Referees who reached 3 failed attempts can be manually unlocked by resetting their attempts.</p>
          </div>

          {lockedAttempts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold">
                    <th className="pb-2">Referee Name</th>
                    <th className="pb-2">Course Name</th>
                    <th className="pb-2">Module Quiz</th>
                    <th className="pb-2 text-center">Score</th>
                    <th className="pb-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lockedAttempts.map((lock, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-3 font-semibold text-slate-800">{lock.refereeName}</td>
                      <td className="py-3 text-slate-600 truncate max-w-[150px]">{lock.courseTitle}</td>
                      <td className="py-3 text-slate-600">{lock.moduleTitle}</td>
                      <td className="py-3 text-center text-red-600 font-bold">{lock.score}%</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleUnlock(lock.refereeId, lock.quizId)}
                          className="inline-flex items-center gap-1 bg-lime-400 hover:bg-lime-300 text-emerald-950 font-bold py-1.5 px-3 rounded-lg text-[10px] transition shadow-sm"
                        >
                          <Unlock size={12} />
                          <span>Reset & Unlock</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6 text-slate-500">
              <CheckCircle2 size={36} className="mx-auto text-emerald-600 mb-1" />
              <p className="font-semibold text-xs text-slate-700">No Locked Attempts</p>
              <p className="text-[10px] text-slate-400 mt-0.5">All active referees currently have quiz attempts available.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;
