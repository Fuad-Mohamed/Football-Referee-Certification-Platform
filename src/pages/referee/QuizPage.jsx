import React, { useContext, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { HelpCircle, AlertCircle, RefreshCw, CheckCircle, ArrowLeft, Lock } from 'lucide-react';

const QuizPage = () => {
  const { courseId, moduleId } = useParams();
  const { courses, currentUser, submitQuiz } = useContext(AppContext);
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const course = courses.find(c => c.id === courseId);
  const moduleObj = course?.modules.find(m => m.id === moduleId);
  const quiz = moduleObj?.quiz;

  const profile = currentUser?.refereeProfile || {};
  const quizState = profile.quizAttempts?.[quiz?.id] || { score: 0, attempts: 0, passed: false, locked: false };

  if (!course || !moduleObj || !quiz) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
        <p className="text-slate-500 font-semibold">Quiz not found.</p>
        <Link to="/dashboard/referee" className="text-emerald-800 underline font-bold mt-2 inline-block">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  const handleOptionChange = (questionId, option) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Check that all questions are answered
    const unanswered = quiz.questions.filter(q => !answers[q.id]);
    if (unanswered.length > 0) {
      setErrorMsg('Please answer all questions before submitting.');
      return;
    }

    const res = submitQuiz(course.id, moduleObj.id, quiz.id, answers, quiz.questions);
    setResult(res);
  };

  const handleRetry = () => {
    setAnswers({});
    setResult(null);
    setErrorMsg('');
  };

  const isLocked = quizState.locked || (quizState.attempts >= 3 && !quizState.passed);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back Header */}
      <div className="flex items-center gap-3">
        <Link 
          to={`/dashboard/referee/learning/${course.id}`} 
          className="text-slate-500 hover:text-slate-800 transition p-1.5 hover:bg-slate-200 rounded-lg"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-slate-800">{quiz.title}</h2>
          <p className="text-xs text-slate-500">{course.title} • {moduleObj.title}</p>
        </div>
      </div>

      {/* Warning banner if quiz is locked */}
      {isLocked && (
        <div className="bg-red-50 border border-red-200 text-red-950 p-4 rounded-xl flex gap-3 shadow-sm">
          <Lock className="text-red-700 shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="font-bold text-red-950">Quiz Locked</h4>
            <p className="text-xs text-red-800 mt-1">
              You have used all <strong>3 attempts</strong> and scored below the 70% passing threshold. 
              <strong> Instructor review is required</strong> before you can retake this assessment. Please contact your course instructor.
            </p>
            <div className="mt-3">
              <Link 
                to={`/dashboard/referee/learning/${course.id}`}
                className="bg-red-950 text-white text-xs font-bold py-1.5 px-3 rounded-lg hover:bg-red-900 transition inline-block"
              >
                Back to Learning Page
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Result Card */}
      {result && (
        <div className={`p-6 rounded-xl border shadow-sm ${
          result.passed 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
            : 'bg-amber-50 border-amber-200 text-amber-950'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            {result.passed ? (
              <CheckCircle className="text-emerald-700" size={32} />
            ) : (
              <AlertCircle className="text-amber-700" size={32} />
            )}
            <div>
              <h3 className="text-lg font-bold">
                {result.passed ? 'Assessment Passed!' : 'Assessment Failed'}
              </h3>
              <p className="text-xs text-slate-500">
                Passing score: 70% • Your score: <strong>{result.score}%</strong>
              </p>
            </div>
          </div>

          <div className="text-sm space-y-2 mb-4 leading-relaxed">
            {result.passed ? (
              <p>Congratulations! You have successfully passed this module assessment. You can now proceed with the curriculum.</p>
            ) : (
              <p>
                You did not reach the passing threshold of 70%. You have <strong>{result.attemptsLeft} attempts remaining</strong>. 
                {result.attemptsLeft === 0 && " This quiz is now locked."}
              </p>
            )}
          </div>

          <div className="flex gap-4 pt-2">
            {result.passed ? (
              <Link
                to={`/dashboard/referee/learning/${course.id}`}
                className="bg-emerald-950 text-white font-bold py-2 px-5 rounded-lg hover:bg-emerald-900 transition text-xs shadow-sm"
              >
                Continue Curriculum
              </Link>
            ) : result.locked ? (
              <Link
                to={`/dashboard/referee/learning/${course.id}`}
                className="bg-red-950 text-white font-bold py-2 px-5 rounded-lg hover:bg-red-900 transition text-xs shadow-sm"
              >
                Contact Instructor
              </Link>
            ) : (
              <>
                <button
                  onClick={handleRetry}
                  className="bg-amber-950 text-white font-bold py-2 px-5 rounded-lg hover:bg-amber-900 transition text-xs shadow-sm flex items-center gap-1.5"
                >
                  <RefreshCw size={14} />
                  <span>Try Again</span>
                </button>
                <Link
                  to={`/dashboard/referee/learning/${course.id}`}
                  className="bg-transparent border border-slate-300 text-slate-700 font-bold py-2 px-5 rounded-lg hover:bg-slate-100 transition text-xs"
                >
                  Review Module
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Quiz Form */}
      {!result && !isLocked && (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase">Assessment Details</span>
            <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-100">
              Attempts: {quizState.attempts} / 3
            </span>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-6">
            {quiz.questions.map((q, idx) => (
              <div key={q.id} className="space-y-3">
                <p className="text-sm font-semibold text-slate-800">
                  {idx + 1}. {q.question}
                </p>

                {q.type === 'multiple' ? (
                  <div className="space-y-2 pl-3">
                    {q.options.map((opt) => (
                      <label 
                        key={opt} 
                        className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition ${
                          answers[q.id] === opt 
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950' 
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={opt}
                          checked={answers[q.id] === opt}
                          onChange={() => handleOptionChange(q.id, opt)}
                          className="text-emerald-800 focus:ring-emerald-800"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-4 pl-3">
                    {['True', 'False'].map((opt) => (
                      <label 
                        key={opt} 
                        className={`flex items-center gap-2.5 p-2.5 px-6 rounded-lg border text-xs font-medium cursor-pointer transition ${
                          answers[q.id] === opt 
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950' 
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={opt}
                          checked={answers[q.id] === opt}
                          onChange={() => handleOptionChange(q.id, opt)}
                          className="text-emerald-800 focus:ring-emerald-800"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              to={`/dashboard/referee/learning/${course.id}`}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 transition"
            >
              Cancel & Go Back
            </Link>
            <button
              type="submit"
              className="bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-2 px-6 rounded-lg text-xs transition shadow-md"
            >
              Submit Answers
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default QuizPage;
