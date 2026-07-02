import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { 
  ShieldCheck, Users, BookOpen, Award, CheckCircle, 
  Trash2, ShieldAlert, AlertCircle, RefreshCw, Eye 
} from 'lucide-react';

const AdminDashboard = () => {
  const { 
    users, courses, stats, adminApproveCourse, adminManageUser 
  } = useContext(AppContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  // Filter pending courses
  const pendingCourses = courses.filter(c => c.status === 'pending_approval');
  const approvedCourses = courses.filter(c => c.status === 'approved');

  const handleUserAction = (userId, action, details = {}) => {
    adminManageUser(userId, action, details);
  };

  const handleRoleChange = (userId, newRole) => {
    handleUserAction(userId, 'change_role', { role: newRole });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Admin Control Center</h2>
        <p className="text-sm text-slate-500">Oversee users, approve curriculum materials, and track platform metrics.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setSearchParams({ tab: 'overview' })}
          className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all focus:outline-none ${
            activeTab === 'overview' ? 'border-emerald-800 text-emerald-950' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Overview Stats
        </button>
        <button
          onClick={() => setSearchParams({ tab: 'users' })}
          className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all focus:outline-none ${
            activeTab === 'users' ? 'border-emerald-800 text-emerald-950' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          User Management ({users.length})
        </button>
        <button
          onClick={() => setSearchParams({ tab: 'courses' })}
          className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all focus:outline-none ${
            activeTab === 'courses' ? 'border-emerald-800 text-emerald-950' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Course Approvals ({pendingCourses.length})
        </button>
      </div>

      {/* KPI Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Total Users */}
            <div className="bg-white border rounded-xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute right-3 top-3 bg-slate-50 text-slate-700 p-1.5 rounded-lg">
                <Users size={16} />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Registered Users</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.totalUsers}</h3>
              <p className="text-[10px] text-slate-400 mt-1">{stats.referees} Referees • {stats.instructors} Instructors</p>
            </div>

            {/* Approved Courses */}
            <div className="bg-white border rounded-xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute right-3 top-3 bg-emerald-50 text-emerald-800 p-1.5 rounded-lg">
                <BookOpen size={16} />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Live Courses</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{approvedCourses.length}</h3>
              <p className="text-[10px] text-slate-400 mt-1">{pendingCourses.length} pending administrative approval</p>
            </div>

            {/* Certificates Issued */}
            <div className="bg-white border rounded-xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute right-3 top-3 bg-lime-50 text-lime-900 p-1.5 rounded-lg">
                <Award size={16} />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Certificates Issued</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.certificatesIssued}</h3>
              <p className="text-[10px] text-emerald-800 font-bold mt-1">100% Verified Credentials</p>
            </div>

            {/* Renewals Pending */}
            <div className="bg-white border rounded-xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute right-3 top-3 bg-red-50 text-red-800 p-1.5 rounded-lg">
                <ShieldAlert size={16} />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Renewals Due</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1 text-amber-600">{stats.renewalsDue}</h3>
              <p className="text-[10px] text-slate-400 mt-1">Referees within 6-months expiry</p>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border rounded-xl p-5 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 text-sm">System Logs</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-50 text-slate-600">
                  <span>New Referee registered: John Whistle</span>
                  <span className="text-[10px] text-slate-400">10 mins ago</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50 text-slate-600">
                  <span>Instructor Sarah Pitch uploaded a course draft</span>
                  <span className="text-[10px] text-slate-400">1 hour ago</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50 text-slate-600">
                  <span>Certificate ID REF-C1-879E3 verified by user</span>
                  <span className="text-[10px] text-slate-400">3 hours ago</span>
                </div>
              </div>
            </div>
            
            <div className="bg-emerald-950 border border-emerald-900 rounded-xl p-5 shadow-sm text-white space-y-3">
              <h3 className="font-bold text-lime-400 text-sm">Platform Health Status</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                All services are fully operational. Sync is active via browser local storage configuration. Database handles referee profiles and attempts verification.
              </p>
              <div className="flex gap-4 text-xs font-semibold pt-1">
                <span className="flex items-center gap-1 text-lime-400">
                  <CheckCircle size={14} /> Database Online
                </span>
                <span className="flex items-center gap-1 text-lime-400">
                  <CheckCircle size={14} /> Mailer Queue Running
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Management Tab */}
      {activeTab === 'users' && (
        <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800 text-sm pb-2 border-b border-slate-100">Registered Platform Users</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold">
                  <th className="pb-2">ID</th>
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Email</th>
                  <th className="pb-2">Role</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="py-3 text-slate-500 font-mono text-[10px]">{u.id}</td>
                    <td className="py-3 font-semibold text-slate-800">{u.name}</td>
                    <td className="py-3 text-slate-600">{u.email}</td>
                    <td className="py-3">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="bg-slate-100 border rounded py-1 px-1.5 font-semibold text-slate-700 focus:outline-none"
                      >
                        <option value="referee">Referee</option>
                        <option value="instructor">Instructor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="py-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        u.status === 'suspended' ? 'bg-red-50 text-red-800 border-red-200' :
                        u.status === 'pending_approval' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                        'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}>
                        {u.status || 'approved'}
                      </span>
                    </td>
                    <td className="py-3 text-right space-x-2">
                      {u.status === 'suspended' ? (
                        <button
                          onClick={() => handleUserAction(u.id, 'approve')}
                          className="bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 font-bold py-1 px-2.5 rounded transition text-[10px]"
                        >
                          Activate
                        </button>
                      ) : u.status === 'pending_approval' ? (
                        <button
                          onClick={() => handleUserAction(u.id, 'approve')}
                          className="bg-emerald-800 text-white hover:bg-emerald-900 font-bold py-1 px-2.5 rounded transition text-[10px]"
                        >
                          Approve Account
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUserAction(u.id, 'suspend')}
                          className="bg-transparent border border-red-200 text-red-700 hover:bg-red-50 font-bold py-1 px-2.5 rounded transition text-[10px]"
                        >
                          Suspend
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleUserAction(u.id, 'delete')}
                        className="bg-red-150 text-red-900 hover:bg-red-100 p-1 rounded inline-flex"
                      >
                        <Trash2 size={14} className="text-red-700" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Course Approvals Tab */}
      {activeTab === 'courses' && (
        <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800 text-sm pb-2 border-b border-slate-100">Pending Course Approvals</h3>
          
          {pendingCourses.length > 0 ? (
            <div className="space-y-4">
              {pendingCourses.map(course => (
                <div key={course.id} className="border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-800">{course.title}</h4>
                      <span className="bg-slate-100 text-[10px] font-bold px-1.5 py-0.5 rounded border border-slate-200">{course.tier}</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">{course.description}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">
                      Modules: {course.modules.length} • Est Time: {course.estimatedTime} • CE Credits: {course.credits}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <button
                      onClick={() => adminApproveCourse(course.id)}
                      className="bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-2 px-4 rounded-lg text-xs transition shadow-sm"
                    >
                      Approve & Publish Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <CheckCircle size={40} className="mx-auto text-emerald-600 mb-2" />
              <p className="font-semibold text-slate-700">All Clear!</p>
              <p className="text-xs text-slate-400 mt-1">There are no courses currently awaiting administrative approval.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
