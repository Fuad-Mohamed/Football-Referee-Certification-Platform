import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Protection Guard
import ProtectedRoute from '../components/ProtectedRoute';

// Public Pages
import LandingPage from '../pages/LandingPage';
import PublicCertificateVerify from '../pages/PublicCertificateVerify';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import EmailVerification from '../pages/auth/EmailVerification';

// Referee Pages
import RefereeDashboard from '../pages/referee/RefereeDashboard';
import CourseCatalogue from '../pages/referee/CourseCatalogue';
import CourseLearning from '../pages/referee/CourseLearning';
import QuizPage from '../pages/referee/QuizPage';
import CertificatePage from '../pages/referee/CertificatePage';
import ContinuingEducation from '../pages/referee/ContinuingEducation';

// Instructor Pages
import InstructorDashboard from '../pages/instructor/InstructorDashboard';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/verify" element={<PublicCertificateVerify />} />
      </Route>

      {/* Auth Pages (Embedded inside Pitch Background Layout) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/email-verification" element={<EmailVerification />} />
      </Route>

      {/* Role Protected Dashboards */}
      <Route element={<ProtectedRoute allowedRoles={['referee', 'instructor', 'admin']} />}>
        <Route element={<DashboardLayout />}>
          
          {/* Referee Dashboard & Subpages */}
          <Route element={<ProtectedRoute allowedRoles={['referee']} />}>
            <Route path="/dashboard/referee" element={<RefereeDashboard />} />
            <Route path="/dashboard/referee/catalogue" element={<CourseCatalogue />} />
            <Route path="/dashboard/referee/learning/:courseId" element={<CourseLearning />} />
            <Route path="/dashboard/referee/quiz/:courseId/:moduleId" element={<QuizPage />} />
            <Route path="/dashboard/referee/certificates" element={<CertificatePage />} />
            <Route path="/dashboard/referee/continuing-education" element={<ContinuingEducation />} />
          </Route>

          {/* Instructor Board */}
          <Route element={<ProtectedRoute allowedRoles={['instructor']} />}>
            <Route path="/dashboard/instructor" element={<InstructorDashboard />} />
          </Route>

          {/* Admin Control Center */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
          </Route>

        </Route>
      </Route>

      {/* Catch-all Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
