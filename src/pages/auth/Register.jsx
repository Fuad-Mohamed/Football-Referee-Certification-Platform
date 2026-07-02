import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { User, Mail, Lock, UserCheck, ShieldAlert } from 'lucide-react';

const Register = () => {
  const { register } = useContext(AppContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('referee');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = register(name, email, role, password);
    if (res.success) {
      navigate('/email-verification', { 
        state: { 
          email, 
          role, 
          message: res.message 
        } 
      });
    } else {
      setError(res.message);
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-slate-800">Create Account</h3>
        <p className="text-slate-500 text-sm mt-1">Join the Referee Curriculum Platform</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg border border-red-200 mb-4 flex items-start gap-2">
          <ShieldAlert size={18} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
          <div className="relative">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Whistle"
              className="w-full bg-white border border-slate-300 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800"
            />
            <User className="absolute left-3.5 top-3 text-slate-400" size={18} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. name@domain.com"
              className="w-full bg-white border border-slate-300 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800"
            />
            <Mail className="absolute left-3.5 top-3 text-slate-400" size={18} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Account Role</label>
          <div className="relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800 appearance-none"
            >
              <option value="referee">Referee (Aspiring / Active)</option>
              <option value="instructor">Instructor (Course Builder)</option>
            </select>
            <UserCheck className="absolute left-3.5 top-3 text-slate-400" size={18} />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          {role === 'instructor' && (
            <p className="text-[11px] text-amber-600 mt-1 font-medium">
              Note: Instructor accounts require administrative approval before activation.
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              minLength={8}
              className="w-full bg-white border border-slate-300 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800"
            />
            <Lock className="absolute left-3.5 top-3 text-slate-400" size={18} />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-950 text-white font-bold py-2.5 rounded-lg hover:bg-emerald-900 transition shadow-md focus:outline-none"
        >
          Create Account
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-600 border-t border-slate-200 pt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-emerald-800 font-bold hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Register;
