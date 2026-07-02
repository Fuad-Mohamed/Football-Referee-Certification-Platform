import React, { createContext, useState, useEffect } from 'react';
import { INITIAL_COURSES, INITIAL_USERS, INITIAL_CE_SEMINARS, INITIAL_STATS } from '../data/mockData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('ref_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('ref_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [ceSeminars, setCeSeminars] = useState(() => {
    const saved = localStorage.getItem('ref_ce_seminars');
    return saved ? JSON.parse(saved) : INITIAL_CE_SEMINARS;
  });

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('ref_stats');
    return saved ? JSON.parse(saved) : INITIAL_STATS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('ref_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('ref_token') || null;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('ref_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('ref_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('ref_ce_seminars', JSON.stringify(ceSeminars));
  }, [ceSeminars]);

  useEffect(() => {
    localStorage.setItem('ref_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ref_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ref_current_user');
    }
  }, [currentUser]);

  // Auth Operations
  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, message: "Invalid email or password." };
    if (user.status === 'suspended') return { success: false, message: "Your account is suspended. Contact admin." };

    const mockToken = `mock-jwt-token-xyz-${user.id}-${user.role}`;
    setToken(mockToken);
    localStorage.setItem('ref_token', mockToken);
    setCurrentUser(user);
    return { success: true, user };
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem('ref_token');
    localStorage.removeItem('ref_current_user');
  };

  const register = (name, email, role, password) => {
    const exists = users.find(u => u.email === email);
    if (exists) return { success: false, message: "Email already registered." };

    const newUser = {
      id: `u-${Date.now()}`,
      name,
      email,
      role,
      password,
      status: role === 'referee' ? 'approved' : 'pending_approval' // Instructors/Admins need approval
    };

    if (role === 'referee') {
      newUser.refereeProfile = {
        certLevel: "None (Aspiring)",
        expiryDate: null,
        ceCredits: 0,
        completedCourses: [],
        enrolledCourses: [],
        courseProgress: {},
        quizAttempts: {},
        certificates: []
      };
    }

    setUsers(prev => [...prev, newUser]);
    setStats(prev => ({ ...prev, totalUsers: prev.totalUsers + 1, referees: role === 'referee' ? prev.referees + 1 : prev.referees }));
    return { success: true, message: role === 'referee' ? "Registration successful! You can now log in." : "Registration successful! Pending admin approval." };
  };

  // Referee course activities
  const enrollInCourse = (courseId) => {
    if (!currentUser || currentUser.role !== 'referee') return;

    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        const profile = u.refereeProfile;
        if (profile.enrolledCourses.includes(courseId)) return u;

        const updatedProfile = {
          ...profile,
          enrolledCourses: [...profile.enrolledCourses, courseId],
          courseProgress: {
            ...profile.courseProgress,
            [courseId]: 0
          }
        };

        const updatedUser = { ...u, refereeProfile: updatedProfile };
        setCurrentUser(updatedUser);
        return updatedUser;
      }
      return u;
    }));
  };

  const submitQuiz = (courseId, moduleId, quizId, answers, quizQuestions) => {
    if (!currentUser || currentUser.role !== 'referee') return { success: false, score: 0, passed: false };

    // Grade Quiz
    let correctCount = 0;
    quizQuestions.forEach(q => {
      if (q.type === 'multiple') {
        if (answers[q.id] === q.correctAnswer) correctCount++;
      } else {
        // Boolean conversion check
        const userAns = String(answers[q.id]).toLowerCase();
        const correctAns = String(q.correctAnswer).toLowerCase();
        if (userAns === correctAns) correctCount++;
      }
    });

    const score = Math.round((correctCount / quizQuestions.length) * 100);
    const passed = score >= 70; // 70% threshold

    let quizState = null;
    let message = "";

    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        const profile = u.refereeProfile;
        const prevAttempt = profile.quizAttempts[quizId] || { score: 0, attempts: 0, passed: false };

        if (prevAttempt.attempts >= 3 && !prevAttempt.passed) {
          message = "This quiz is locked. Instructor review is required.";
          return u;
        }

        const newAttemptsCount = prevAttempt.attempts + 1;
        const isNowPassed = prevAttempt.passed || passed;
        const highestScore = Math.max(prevAttempt.score, score);

        const updatedAttempts = {
          ...profile.quizAttempts,
          [quizId]: {
            score: highestScore,
            attempts: newAttemptsCount,
            passed: isNowPassed,
            locked: newAttemptsCount >= 3 && !isNowPassed
          }
        };

        // Recalculate Course Progress
        const course = courses.find(c => c.id === courseId);
        let completedCount = 0;
        course.modules.forEach(m => {
          const mQuizId = m.quiz.id;
          if (updatedAttempts[mQuizId] && updatedAttempts[mQuizId].passed) {
            completedCount++;
          }
        });

        const progressPercent = Math.round((completedCount / course.modules.length) * 100);
        const updatedCourseProgress = {
          ...profile.courseProgress,
          [courseId]: progressPercent
        };

        const updatedCompletedCourses = [...profile.completedCourses];
        if (progressPercent === 100 && !updatedCompletedCourses.includes(courseId)) {
          updatedCompletedCourses.push(courseId);
        }

        const updatedProfile = {
          ...profile,
          quizAttempts: updatedAttempts,
          courseProgress: updatedCourseProgress,
          completedCourses: updatedCompletedCourses
        };

        quizState = updatedAttempts[quizId];

        const updatedUser = { ...u, refereeProfile: updatedProfile };
        setCurrentUser(updatedUser);
        return updatedUser;
      }
      return u;
    }));

    return { success: true, score, passed, attemptsLeft: Math.max(0, 3 - (quizState?.attempts || 0)), locked: quizState?.locked };
  };

  const generateCertificate = (courseId) => {
    if (!currentUser || currentUser.role !== 'referee') return null;

    const course = courses.find(c => c.id === courseId);
    if (!course) return null;

    // Check if course completed
    const progress = currentUser.refereeProfile.courseProgress[courseId];
    if (progress !== 100) return null;

    // Check if certificate already exists
    const existing = currentUser.refereeProfile.certificates.find(c => c.courseId === courseId);
    if (existing) return existing;

    const code = `REF-${course.tier.substring(0, 2).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const newCert = {
      id: `cert-${Date.now()}`,
      courseId,
      title: course.title,
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString().split('T')[0], // 2 years expiry
      verificationCode: code
    };

    // Update level based on tier
    let newCertLevel = currentUser.refereeProfile.certLevel;
    if (course.tier === 'Regional') newCertLevel = 'Regional (Tier 1)';
    if (course.tier === 'National') newCertLevel = 'National (Tier 2)';
    if (course.tier === 'International') newCertLevel = 'International (Tier 3)';

    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        const updatedProfile = {
          ...u.refereeProfile,
          certificates: [...u.refereeProfile.certificates, newCert],
          certLevel: newCertLevel,
          expiryDate: newCert.expiryDate
        };
        const updatedUser = { ...u, refereeProfile: updatedProfile };
        setCurrentUser(updatedUser);
        return updatedUser;
      }
      return u;
    }));

    setStats(prev => ({ ...prev, certificatesIssued: prev.certificatesIssued + 1 }));
    return newCert;
  };

  const verifyCertificateCode = (code) => {
    for (const user of users) {
      if (user.role === 'referee' && user.refereeProfile.certificates) {
        const cert = user.refereeProfile.certificates.find(c => c.verificationCode.toUpperCase() === code.toUpperCase());
        if (cert) {
          return {
            valid: true,
            refereeName: user.name,
            certTitle: cert.title,
            issueDate: cert.issueDate,
            expiryDate: cert.expiryDate,
            verificationCode: cert.verificationCode
          };
        }
      }
    }
    return { valid: false };
  };

  // Continuing Education
  const enrollInCeSeminar = (seminarId) => {
    if (!currentUser || currentUser.role !== 'referee') return;

    setCeSeminars(prev => prev.map(s => {
      if (s.id === seminarId) {
        return { ...s, enrolled: true };
      }
      return s;
    }));

    // Alert completion
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        const updatedUser = {
          ...u,
          refereeProfile: {
            ...u.refereeProfile,
            // Give credit simulator trigger: we will allow manual click on CE page to claim credits
          }
        };
        setCurrentUser(updatedUser);
        return updatedUser;
      }
      return u;
    }));
  };

  const claimCeCredits = (seminarId) => {
    if (!currentUser || currentUser.role !== 'referee') return;
    const seminar = ceSeminars.find(s => s.id === seminarId);
    if (!seminar || !seminar.enrolled || seminar.completed) return;

    setCeSeminars(prev => prev.map(s => {
      if (s.id === seminarId) {
        return { ...s, completed: true };
      }
      return s;
    }));

    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        const newCredits = u.refereeProfile.ceCredits + seminar.credits;
        const updatedUser = {
          ...u,
          refereeProfile: {
            ...u.refereeProfile,
            ceCredits: newCredits
          }
        };
        setCurrentUser(updatedUser);
        return updatedUser;
      }
      return u;
    }));
  };

  // Instructor Functions
  const instructorCreateCourse = (courseData) => {
    const newCourse = {
      id: `c-${Date.now()}`,
      title: courseData.title,
      description: courseData.description,
      tier: courseData.tier,
      level: courseData.tier === 'Regional' ? 1 : courseData.tier === 'National' ? 2 : 3,
      prerequisites: courseData.prerequisites || [],
      estimatedTime: courseData.estimatedTime || '4 Hours',
      credits: courseData.credits || 5,
      modules: courseData.modules || [],
      status: 'pending_approval' // requires admin approval
    };

    setCourses(prev => [...prev, newCourse]);
    setStats(prev => ({ ...prev, coursesPending: prev.coursesPending + 1 }));
    return { success: true };
  };

  const instructorUnlockQuiz = (refereeId, quizId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === refereeId && u.role === 'referee') {
        const currentAttempt = u.refereeProfile.quizAttempts[quizId];
        if (currentAttempt) {
          const updatedAttempts = {
            ...u.refereeProfile.quizAttempts,
            [quizId]: {
              ...currentAttempt,
              attempts: 0, // Reset attempts
              locked: false
            }
          };
          const updatedUser = {
            ...u,
            refereeProfile: {
              ...u.refereeProfile,
              quizAttempts: updatedAttempts
            }
          };
          if (currentUser && currentUser.id === refereeId) {
            setCurrentUser(updatedUser);
          }
          return updatedUser;
        }
      }
      return u;
    }));
    return { success: true };
  };

  // Admin Functions
  const adminApproveCourse = (courseId) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, status: 'approved' };
      }
      return c;
    }));
    setStats(prev => ({
      ...prev,
      coursesApproved: prev.coursesApproved + 1,
      coursesPending: Math.max(0, prev.coursesPending - 1)
    }));
  };

  const adminManageUser = (userId, action, details = {}) => {
    // action: 'suspend' | 'approve' | 'delete' | 'change_role'
    if (action === 'delete') {
      setUsers(prev => prev.filter(u => u.id !== userId));
      setStats(prev => ({
        ...prev,
        totalUsers: Math.max(0, prev.totalUsers - 1),
        referees: prev.referees - (users.find(u => u.id === userId)?.role === 'referee' ? 1 : 0)
      }));
    } else {
      setUsers(prev => prev.map(u => {
        if (u.id === userId) {
          let updatedUser = { ...u };
          if (action === 'suspend') updatedUser.status = 'suspended';
          if (action === 'approve') updatedUser.status = 'approved';
          if (action === 'change_role') updatedUser.role = details.role;
          return updatedUser;
        }
        return u;
      }));
    }
  };

  return (
    <AppContext.Provider value={{
      users,
      courses,
      ceSeminars,
      stats,
      currentUser,
      token,
      login,
      logout,
      register,
      enrollInCourse,
      submitQuiz,
      generateCertificate,
      verifyCertificateCode,
      enrollInCeSeminar,
      claimCeCredits,
      instructorCreateCourse,
      instructorUnlockQuiz,
      adminApproveCourse,
      adminManageUser
    }}>
      {children}
    </AppContext.Provider>
  );
};
