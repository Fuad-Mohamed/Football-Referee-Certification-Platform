import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-slate-800">Reset Password</h3>
        <p className="text-slate-500 text-sm mt-1">We will send you instructions to reset your password</p>
      </div>

      {submitted ? (
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-full mb-2">
            <CheckCircle size={24} />
          </div>
          <p className="text-sm text-slate-600">
            A password reset link has been dispatched to <strong>{email}</strong>. Please check your inbox and spam folders.
          </p>
          <div className="pt-4">
            <Link to="/login" className="bg-emerald-950 text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-900 transition text-sm">
              Return to Login
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            className="w-full bg-emerald-950 text-white font-bold py-2.5 rounded-lg hover:bg-emerald-900 transition shadow-md focus:outline-none"
          >
            Send Reset Link
          </button>

          <div className="flex justify-center pt-2">
            <Link to="/login" className="flex items-center gap-1 text-sm font-semibold text-emerald-800 hover:text-emerald-950">
              <ArrowLeft size={16} /> Back to Login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
