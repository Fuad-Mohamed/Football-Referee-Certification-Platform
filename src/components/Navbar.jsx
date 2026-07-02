import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Trophy, Menu, X, LogIn, User } from 'lucide-react';

const Navbar = () => {
  const { currentUser, logout } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-emerald-950 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 font-normal font-warmstreak text-2xl tracking-wider text-white">
              <Trophy className="text-lime-400" size={28} />
              <span>FRCP</span>
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-slate-200 hover:text-lime-400 transition font-medium">Home</Link>
            <Link to="/verify" className="text-slate-200 hover:text-lime-400 transition font-medium">Verify Certificate</Link>
            
            {currentUser ? (
              <>
                <Link 
                  to={`/dashboard/${currentUser.role}`} 
                  className="bg-emerald-800 text-white border border-emerald-700 px-4 py-1.5 rounded-lg hover:bg-emerald-700 hover:border-emerald-600 transition flex items-center gap-1.5 font-semibold"
                >
                  <User size={16} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-transparent hover:text-red-400 border border-transparent hover:border-red-900/30 px-3 py-1.5 rounded-lg transition font-medium text-slate-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-200 hover:text-lime-400 transition font-medium flex items-center gap-1">
                  <LogIn size={16} />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="bg-lime-400 text-emerald-950 px-4 py-2 rounded-lg font-bold hover:bg-lime-300 transition shadow-sm hover:shadow-md"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-200 hover:text-white p-2 rounded-lg hover:bg-emerald-900/60 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="md:hidden bg-emerald-900 border-t border-emerald-800 px-2 pt-2 pb-4 space-y-1">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-emerald-800 hover:text-lime-400"
          >
            Home
          </Link>
          <Link
            to="/verify"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-emerald-800 hover:text-lime-400"
          >
            Verify Certificate
          </Link>

          <div className="border-t border-emerald-800 my-2 pt-2">
            {currentUser ? (
              <>
                <Link
                  to={`/dashboard/${currentUser.role}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-lime-400 hover:bg-emerald-800"
                >
                  Dashboard ({currentUser.role})
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-emerald-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2 px-3">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-2 rounded-md text-base font-semibold border border-emerald-700 hover:bg-emerald-800 text-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-2 rounded-md text-base font-semibold bg-lime-400 text-emerald-950 hover:bg-lime-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
