import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Shield, Zap, Award, ArrowRight, Target, Users, BookOpen } from 'lucide-react';
import stadiumImg from '../assets/images/stadium.jpg';
import match1Img from '../assets/images/match1.jpg';
import match2Img from '../assets/images/match2.jpg';
import match3Img from '../assets/images/match3.jpg';

const LandingPage = () => {
  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden group bg-emerald-950">
        {/* Background Image with opacity & scale hover effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000 ease-out z-0"
          style={{ backgroundImage: `url(${stadiumImg})` }}
        ></div>
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/80 via-emerald-950/70 to-lime-950/90 z-0"></div>
        {/* Subtle field markings overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-lime-950/15 via-emerald-950/30 to-transparent pointer-events-none z-0"></div>
        
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-lime-400/10 border border-lime-400/25 text-lime-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest font-running">
            <Trophy size={14} /> Official Certification Hub
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal font-warmstreak tracking-wide leading-none text-white">
            Football Referee <br />
            <span className="text-lime-400">Curriculum Platform</span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium font-running">
            Centralise, Certify, and Elevate Officiating Standards. Access official courses, track your learning progression, and verify credentials.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="bg-lime-400 text-emerald-950 font-bold py-3 px-8 rounded-xl text-sm hover:bg-lime-300 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group font-running tracking-wide"
            >
              <span>Get Started</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="bg-emerald-900/60 border border-emerald-700/50 hover:bg-emerald-900 text-white font-bold py-3 px-8 rounded-xl text-sm transition flex items-center justify-center gap-2 font-running tracking-wide"
            >
              <BookOpen size={16} />
              <span>View Courses</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Statement & Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Problem */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest font-running">The Problem</span>
            <h2 className="text-3xl font-normal font-warmstreak text-slate-800 tracking-wide">
              Inconsistent Officiating & Fragmented Training Logs
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Aspiring football referees often lack standardized learning resources, leading to inconsistent interpretations of the Laws of the Game. In addition, tracking certification expiration dates and continuing education points is highly manual, leading to lapsed credentials and administrative overhead.
            </p>
            <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-xs text-red-900 flex items-start gap-2.5">
              <Shield className="text-red-700 shrink-0 mt-0.5" size={18} />
              <p className="font-running font-medium">Inconsistent officiating directly compromises game integrity and harms career trajectories for talented match officials.</p>
            </div>
          </div>

          {/* Solution / Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-800 rounded-lg flex items-center justify-center">
                <Zap size={20} />
              </div>
              <h3 className="font-normal font-warmstreak text-slate-800 text-base tracking-wide">Unified Curriculum</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Centralized syllabus covering FIFA laws, positioning guidelines, and VAR protocols in detail.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-10 h-10 bg-lime-50 text-lime-800 rounded-lg flex items-center justify-center">
                <Award size={20} />
              </div>
              <h3 className="font-normal font-warmstreak text-slate-800 text-base tracking-wide">Auto-Certification</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Complete modules, pass module-end quizzes, and immediately generate downloadable, verifiable certificates.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-10 h-10 bg-blue-50 text-blue-800 rounded-lg flex items-center justify-center">
                <Users size={20} />
              </div>
              <h3 className="font-normal font-warmstreak text-slate-800 text-base tracking-wide">Role Separation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dedicated dashboards for Referees (learners), Instructors (curriculum builders), and Administrators (approvers).
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-10 h-10 bg-purple-50 text-purple-800 rounded-lg flex items-center justify-center">
                <Target size={20} />
              </div>
              <h3 className="font-normal font-warmstreak text-slate-800 text-base tracking-wide">Continuing Ed Tally</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Enroll in seminars, log continuing education credits, and trigger alerts prior to certificate expiration.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Certification Path Tiers */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest font-running">Progressive Pathway</span>
            <h2 className="text-3xl font-normal font-warmstreak text-slate-800 tracking-wide">Professional Certification Tiers</h2>
            <p className="text-xs text-slate-500 max-w-xl mx-auto">
              Our curriculum is structured into progressive tiers. Aspiring officials must unlock each level sequentially by completing prerequisite modules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Regional */}
            <div className="relative overflow-hidden group rounded-2xl p-6 shadow-sm border border-emerald-950/20 bg-emerald-950 flex flex-col justify-between min-h-[260px] hover:shadow-xl hover:shadow-emerald-950/20 transition-all duration-500">
              {/* Background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-45 group-hover:scale-110 transition-all duration-700 ease-out"
                style={{ backgroundImage: `url(${match1Img})` }}
              ></div>
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/90 to-emerald-950/70 z-0"></div>
              
              <div className="relative z-10 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="bg-lime-400/20 text-lime-300 border border-lime-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-running">
                      Tier 1
                    </span>
                    <span className="text-xs font-semibold text-slate-400 font-running">Entry Level</span>
                  </div>
                  <h3 className="text-xl font-normal font-warmstreak text-white tracking-wide">Regional Referee</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-running">
                    Master the fundamental Laws of the Game, basic hand gestures, equipment inspection, positioning, and direct/indirect foul detection.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/60 mt-auto">
                  <p className="text-[11px] font-bold text-lime-400 font-running tracking-wide">Prerequisites: None</p>
                </div>
              </div>
            </div>

            {/* National */}
            <div className="relative overflow-hidden group rounded-2xl p-6 shadow-sm border border-emerald-950/20 bg-emerald-950 flex flex-col justify-between min-h-[260px] hover:shadow-xl hover:shadow-emerald-950/20 transition-all duration-500">
              {/* Background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-45 group-hover:scale-110 transition-all duration-700 ease-out"
                style={{ backgroundImage: `url(${match2Img})` }}
              ></div>
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/90 to-emerald-950/70 z-0"></div>
              
              <div className="relative z-10 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="bg-lime-400/20 text-lime-300 border border-lime-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-running">
                      Tier 2
                    </span>
                    <span className="text-xs font-semibold text-slate-400 font-running">Intermediate</span>
                  </div>
                  <h3 className="text-xl font-normal font-warmstreak text-white tracking-wide">National Referee</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-running">
                    Interpret deep offside situations, manage physical agility demands, draft official reports, and handle high-tension team confrontations.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/60 mt-auto">
                  <p className="text-[11px] font-bold text-lime-400 font-running tracking-wide">Prerequisites: Tier 1 Complete</p>
                </div>
              </div>
            </div>

            {/* International */}
            <div className="relative overflow-hidden group rounded-2xl p-6 shadow-sm border border-emerald-950/20 bg-emerald-950 flex flex-col justify-between min-h-[260px] hover:shadow-xl hover:shadow-emerald-950/20 transition-all duration-500">
              {/* Background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-45 group-hover:scale-110 transition-all duration-700 ease-out"
                style={{ backgroundImage: `url(${match3Img})` }}
              ></div>
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/90 to-emerald-950/70 z-0"></div>
              
              <div className="relative z-10 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="bg-lime-400/20 text-lime-300 border border-lime-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-running">
                      Tier 3
                    </span>
                    <span className="text-xs font-semibold text-slate-400 font-running">Elite / FIFA</span>
                  </div>
                  <h3 className="text-xl font-normal font-warmstreak text-white tracking-wide">International Referee</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-running">
                    FIFA tournament regulations, Video Assistant Referee (VAR) review protocol, media relation training, and international fixtures.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/60 mt-auto">
                  <p className="text-[11px] font-bold text-lime-400 font-running tracking-wide">Prerequisites: Tier 1 & 2 Complete</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Expected Impact Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest font-running">Platform Vision</span>
          <h2 className="text-3xl font-normal font-warmstreak text-slate-800 tracking-wide">Expected Strategic Impact</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="text-4xl font-normal font-warmstreak text-emerald-850">95%</h4>
            <p className="font-bold text-sm text-slate-700 font-running">Unified Standard Alignment</p>
            <p className="text-xs text-slate-500">Achieving a shared rules interpretation baseline across regional boundaries.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-4xl font-normal font-warmstreak text-emerald-850">-40%</h4>
            <p className="font-bold text-sm text-slate-700 font-running">Foul Interpretation Errors</p>
            <p className="text-xs text-slate-500">Decreasing key match officiating errors through video and scenario training.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-4xl font-normal font-warmstreak text-emerald-850">100%</h4>
            <p className="font-bold text-sm text-slate-700 font-running">Digital Accountability</p>
            <p className="text-xs text-slate-500">Completely auditable and transparent certification histories for federations.</p>
          </div>
        </div>

        <div className="pt-8">
          <Link
            to="/register"
            className="inline-flex items-center gap-1 bg-emerald-950 text-white font-bold py-3 px-8 rounded-xl text-sm hover:bg-emerald-900 transition shadow-md hover:shadow-lg font-running tracking-wide"
          >
            <span>Register as a Referee</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
