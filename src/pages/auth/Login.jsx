import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Mail, Lock, ShieldAlert, CheckCircle } from 'lucide-react';

const Login = () => {
  const { login } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.error) {
      setError(location.state.error);
    }
    if (location.state?.message) {
      setInfoMsg(location.state.message);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setInfoMsg('');

    const res = login(email, password);
    if (res.success) {
      // Redirect based on role
      const role = res.user.role;
      navigate(`/dashboard/${role}`);
    } else {
      setError(res.message);
    }
  };

  // Quick action for demo convenience
  const handleQuickLogin = (roleEmail) => {
    setEmail(roleEmail);
    setPassword('password123');
    setError('');
    setInfoMsg('');

    const res = login(roleEmail, 'password123');
    if (res.success) {
      navigate(`/dashboard/${res.user.role}`);
    } else {
      setError(res.message);
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-slate-800">Account Login</h3>
        <p className="text-slate-500 text-sm mt-1">Enter credentials or use demo quick logins below</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg border border-red-200 mb-4 flex items-start gap-2">
          <ShieldAlert size={18} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {infoMsg && (
        <div className="bg-emerald-50 text-emerald-800 text-sm p-3 rounded-lg border border-emerald-200 mb-4 flex items-start gap-2">
          <CheckCircle size={18} className="shrink-0 mt-0.5 text-emerald-600" />
          <span>{infoMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. ref@platform.com"
              className="w-full bg-white border border-slate-300 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800"
            />
            <Mail className="absolute left-3.5 top-3 text-slate-400" size={18} />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-semibold text-slate-700">Password</label>
            <Link to="/forgot-password" className="text-xs text-emerald-800 font-semibold hover:text-emerald-950">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white border border-slate-300 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800"
            />
            <Lock className="absolute left-3.5 top-3 text-slate-400" size={18} />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-950 text-white font-bold py-2.5 rounded-lg hover:bg-emerald-900 transition shadow-md focus:outline-none"
        >
          Sign In
        </button>
      </form>

      <div className="mt-6 border-t border-slate-200 pt-6">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center mb-3">
          Quick Demo Accounts (1-Click Login)
        </p>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleQuickLogin('ref@platform.com')}
            className="text-[11px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100 py-2 rounded-lg transition"
          >
            Referee
          </button>
          <button
            onClick={() => handleQuickLogin('instructor@platform.com')}
            className="text-[11px] font-bold bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100 py-2 rounded-lg transition"
          >
            Instructor
          </button>
          <button
            onClick={() => handleQuickLogin('admin@platform.com')}
            className="text-[11px] font-bold bg-red-50 text-red-900 border border-red-200 hover:bg-red-100 py-2 rounded-lg transition"
          >
            Admin
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-slate-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-emerald-800 font-bold hover:underline">
          Register here
        </Link>
      </div>
    </div>
  );
};

export default Login;
