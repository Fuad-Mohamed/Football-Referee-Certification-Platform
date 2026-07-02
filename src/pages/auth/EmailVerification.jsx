import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Mail, AlertTriangle } from 'lucide-react';

const EmailVerification = () => {
  const location = useLocation();
  const email = location.state?.email || 'your-email@example.com';
  const role = location.state?.role || 'referee';
  const message = location.state?.message || '';

  return (
    <div className="text-center space-y-6">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-full">
        <Mail size={32} />
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-slate-800">Verify Your Email</h3>
        <p className="text-sm text-slate-500">
          We sent a verification email to <strong>{email}</strong>.
        </p>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 p-4 rounded-xl text-sm leading-relaxed text-left flex gap-3">
        <CheckCircle className="text-emerald-700 shrink-0 mt-0.5" size={18} />
        <div>
          <p className="font-semibold text-emerald-900">Account Pre-Registered Successfully!</p>
          <p className="mt-1">{message || "Please click the link in your email to complete registration."}</p>
        </div>
      </div>

      {role === 'instructor' && (
        <div className="bg-amber-50 border border-amber-200 text-amber-950 p-4 rounded-xl text-sm leading-relaxed text-left flex gap-3">
          <AlertTriangle className="text-amber-700 shrink-0 mt-0.5" size={18} />
          <div>
            <p className="font-semibold text-amber-900">Awaiting Admin Verification</p>
            <p className="mt-1">Since you signed up as an Instructor, you will be able to log in once an Administrator approves your account.</p>
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-slate-200 space-y-3">
        <p className="text-xs text-slate-400">
          Didn't receive the email? <button className="text-emerald-800 font-bold hover:underline">Resend email</button>
        </p>
        <div>
          <Link
            to="/login"
            className="inline-block bg-emerald-950 text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-900 transition text-sm shadow-md"
          >
            Proceed to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
