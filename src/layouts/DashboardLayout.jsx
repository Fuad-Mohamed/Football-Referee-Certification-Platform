import React, { useState, useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Sidebar from '../components/Sidebar';
import { Menu, Bell, User, LogOut, Shield } from 'lucide-react';

const DashboardLayout = () => {
  const { currentUser, logout } = useContext(AppContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'instructor':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-lime-100 text-lime-900 border-lime-200';
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-bold text-slate-800 hidden sm:block">
              Referee Portal
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Icon */}
            <button className="text-slate-500 hover:text-slate-700 relative p-1 rounded-full hover:bg-slate-100">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 text-slate-700 hover:text-slate-900 focus:outline-none p-1 rounded-lg hover:bg-slate-50"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
                  {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-xs font-semibold">{currentUser?.name}</p>
                  <span className={`text-[10px] uppercase font-bold border px-1.5 rounded-full ${getRoleBadge(currentUser?.role)}`}>
                    {currentUser?.role}
                  </span>
                </div>
              </button>

              {isProfileOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsProfileOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-md shadow-lg py-1 z-20">
                    <div className="px-4 py-2 border-b border-slate-100 lg:hidden">
                      <p className="text-sm font-semibold">{currentUser?.name}</p>
                      <p className="text-xs text-slate-500 truncate">{currentUser?.email}</p>
                    </div>
                    <Link
                      to={`/dashboard/${currentUser?.role}`}
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    >
                      <User size={16} /> My Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-slate-100 text-left"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
