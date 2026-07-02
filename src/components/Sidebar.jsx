import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  Trophy, X, Home, BookOpen, GraduationCap, Award, 
  Settings, Users, ClipboardCheck, Calendar, ShieldCheck 
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { currentUser } = useContext(AppContext);

  const getLinks = () => {
    if (!currentUser) return [];

    switch (currentUser.role) {
      case 'referee':
        return [
          { name: 'Dashboard', path: '/dashboard/referee', icon: Home },
          { name: 'Course Catalogue', path: '/dashboard/referee/catalogue', icon: BookOpen },
          { name: 'Continuing Education', path: '/dashboard/referee/continuing-education', icon: Calendar },
          { name: 'My Certificates', path: '/dashboard/referee/certificates', icon: Award }
        ];
      case 'instructor':
        return [
          { name: 'Instructor Board', path: '/dashboard/instructor', icon: GraduationCap },
          { name: 'Manage Courses', path: '/dashboard/instructor?tab=courses', icon: BookOpen },
          { name: 'Locked Attempts', path: '/dashboard/instructor?tab=locks', icon: ClipboardCheck }
        ];
      case 'admin':
        return [
          { name: 'Admin Dashboard', path: '/dashboard/admin', icon: ShieldCheck },
          { name: 'Manage Users', path: '/dashboard/admin?tab=users', icon: Users },
          { name: 'Course Approvals', path: '/dashboard/admin?tab=courses', icon: ClipboardCheck }
        ];
      default:
        return [];
    }
  };

  const navLinks = getLinks();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm lg:hidden z-20"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 bg-emerald-950 text-white w-64 transform lg:transform-none lg:static transition-transform duration-300 ease-in-out z-30 flex flex-col h-full
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-emerald-900">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-wide text-white">
            <Trophy className="text-lime-400" size={24} />
            <span>FRCP Portal</span>
          </Link>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-slate-300 hover:text-white focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Info Quick Tally */}
        <div className="p-4 border-b border-emerald-900/60 bg-emerald-900/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-base shadow-inner">
              {currentUser?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold truncate text-white">{currentUser?.name}</p>
              <p className="text-xs text-lime-400 capitalize">{currentUser?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-lime-400 text-emerald-950 font-bold shadow-md' 
                    : 'text-slate-300 hover:bg-emerald-900 hover:text-white'
                  }
                `}
              >
                <Icon size={18} />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="p-6 border-t border-emerald-900 text-center">
          <Link 
            to="/" 
            className="text-xs text-slate-400 hover:text-lime-400 transition"
          >
            Back to Public Site
          </Link>
          <p className="text-[10px] text-slate-500 mt-1">© 2026 FRCP Platform</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
