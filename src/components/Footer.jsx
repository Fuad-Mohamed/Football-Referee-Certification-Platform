import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-emerald-950 text-white border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Panel */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-wide">
              <Trophy className="text-lime-400" size={28} />
              <span>FRCP</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Elevating and standardizing football officiating. Access regional, national, and international courses, manage certifications, and track physical stats.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-lime-400 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link to="/verify" className="hover:text-lime-400 transition">Verify Certificates</Link></li>
              <li><a href="#" className="hover:text-lime-400 transition">FIFA Laws of the Game</a></li>
              <li><a href="#" className="hover:text-lime-400 transition">Fitness Guidelines</a></li>
              <li><a href="#" className="hover:text-lime-400 transition">Continuing Ed Seminars</a></li>
            </ul>
          </div>

          {/* User Guides */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-lime-400 mb-4">Portals</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link to="/login" className="hover:text-lime-400 transition">Referee Login</Link></li>
              <li><Link to="/register" className="hover:text-lime-400 transition">Join as Referee</Link></li>
              <li><Link to="/login" className="hover:text-lime-400 transition">Instructor Portal</Link></li>
              <li><Link to="/login" className="hover:text-lime-400 transition">Admin Console</Link></li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-lime-400 mb-4">Contact Support</h3>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Mail size={16} className="text-lime-400" />
              <span>support@frcp.jhub.africa</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Phone size={16} className="text-lime-400" />
              <span>+254 700 000 000</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <MapPin size={16} className="text-lime-400" />
              <span>JHUB Africa HQ, Nairobi, Kenya</span>
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-900 mt-8 pt-8 text-center text-xs text-slate-400 flex flex-col sm:flex-row justify-between gap-4">
          <p>© 2026 Football Referee Curriculum Platform (FRCP). All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-lime-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-lime-400 transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
