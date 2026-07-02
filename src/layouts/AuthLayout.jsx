import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen pitch-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 text-white font-normal font-warmstreak text-3xl tracking-wider">
          <Trophy className="text-lime-400" size={32} />
          <span>FRCP</span>
        </Link>
        <h2 className="mt-2 text-center text-xs font-semibold text-lime-400 uppercase tracking-widest font-running">
          Football Referee Curriculum Platform
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="glass-card shadow-xl rounded-2xl py-8 px-6 sm:px-10 border border-slate-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
