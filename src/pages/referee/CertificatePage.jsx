import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Award, Download, CheckCircle, Search, Calendar, ShieldCheck, XCircle } from 'lucide-react';

const CertificatePage = () => {
  const { currentUser, courses, generateCertificate, verifyCertificateCode } = useContext(AppContext);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  const profile = currentUser?.refereeProfile || {};
  const certificates = profile.certificates || [];
  const completedCourses = profile.completedCourses || [];

  // Find courses that are 100% completed but don't have a certificate generated yet
  const pendingCertCourses = courses.filter(c => {
    const progress = profile.courseProgress?.[c.id];
    const alreadyHasCert = certificates.some(cert => cert.courseId === c.id);
    return progress === 100 && !alreadyHasCert;
  });

  const handleGenerate = (courseId) => {
    generateCertificate(courseId);
  };

  const handleDownload = (certId) => {
    setDownloadingId(certId);
    setTimeout(() => {
      setDownloadingId(null);
      // Trigger a print window or show a mock alert
      const printContents = document.getElementById(`cert-card-${certId}`).innerHTML;
      const originalContents = document.body.innerHTML;
      
      const popupWin = window.open('', '_blank', 'width=800,height=600');
      popupWin.document.open();
      popupWin.document.write(`
        <html>
          <head>
            <title>Download Certificate</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              body { font-family: sans-serif; }
            </style>
          </head>
          <body onload="window.print();window.close()">
            <div class="p-8 flex justify-center items-center h-screen bg-slate-100">
              <div class="w-[750px] border-8 border-emerald-950 p-10 bg-white shadow-xl relative text-center">
                ${printContents}
              </div>
            </div>
          </body>
        </html>
      `);
      popupWin.document.close();
    }, 1500);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (!verificationCode) return;
    const result = verifyCertificateCode(verificationCode);
    setVerificationResult(result);
  };

  return (
    <div className="space-y-8 faded-bg-certificates py-2 px-1">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">My Certificates & Credential Verification</h2>
        <p className="text-sm text-slate-500">View and print your earned certificates or verify credentials publicly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: My Certificates */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Claim Pending Certificates */}
          {pendingCertCourses.length > 0 && (
            <div className="bg-lime-50 border border-lime-200 p-5 rounded-xl space-y-3 shadow-sm">
              <h3 className="font-bold text-lime-900 flex items-center gap-1.5 text-sm">
                <CheckCircle size={18} />
                <span>Pending Certificates Ready to Claim!</span>
              </h3>
              <p className="text-xs text-lime-800">
                You have completed courses that qualify you for certification. Click below to generate your unique credentials.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {pendingCertCourses.map(course => (
                  <button
                    key={course.id}
                    onClick={() => handleGenerate(course.id)}
                    className="bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-2 px-4 rounded-lg text-xs transition shadow-sm"
                  >
                    Generate {course.tier} Certificate
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* List of Earned Certificates */}
          <div className="space-y-6">
            {certificates.length > 0 ? (
              certificates.map((cert) => (
                <div key={cert.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  
                  {/* Preview Title */}
                  <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <Award size={14} className="text-emerald-800" />
                      <span>Earned Cert: {cert.title}</span>
                    </span>
                    
                    <button
                      onClick={() => handleDownload(cert.id)}
                      disabled={downloadingId === cert.id}
                      className="inline-flex items-center gap-1 bg-emerald-950 text-white font-bold py-1.5 px-3 rounded-lg hover:bg-emerald-900 transition text-xs shadow-sm"
                    >
                      {downloadingId === cert.id ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Preparing...</span>
                        </>
                      ) : (
                        <>
                          <Download size={14} />
                          <span>PDF / Print</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* HTML Certificate Layout */}
                  <div className="p-6 sm:p-10 flex justify-center bg-slate-100 border-b border-slate-100">
                    <div 
                      id={`cert-card-${cert.id}`}
                      className="w-full max-w-2xl border-[10px] border-emerald-950 p-6 sm:p-10 bg-white relative text-center shadow-md select-none"
                    >
                      {/* Decorative elements */}
                      <div className="absolute top-2 left-2 right-2 bottom-2 border border-lime-500/30"></div>
                      
                      <div className="space-y-4">
                        {/* Stamp Icon */}
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-lime-50 border border-lime-300 rounded-full text-emerald-900">
                          <Award size={36} />
                        </div>
                        
                        <div className="space-y-1">
                          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-emerald-950 tracking-wider">CERTIFICATE OF ACHIEVEMENT</h2>
                          <p className="text-[10px] text-lime-600 font-bold uppercase tracking-widest">Football Referee Curriculum Platform</p>
                        </div>

                        <div className="py-2">
                          <p className="text-xs text-slate-500 italic">This certifies that</p>
                          <h1 className="font-serif text-xl sm:text-2xl font-bold text-slate-800 border-b border-slate-300 inline-block px-8 py-1 mt-1">
                            {currentUser?.name}
                          </h1>
                        </div>

                        <div className="space-y-1 max-w-md mx-auto text-xs text-slate-600">
                          <p>has successfully completed all academic and practical training modules for the</p>
                          <p className="font-bold text-emerald-900 text-sm">{cert.title}</p>
                          <p>and is authorized to officiate relevant fixtures in accordance with the Laws of the Game.</p>
                        </div>

                        {/* Signatures */}
                        <div className="grid grid-cols-2 gap-4 pt-6 text-[10px] text-slate-500 max-w-md mx-auto">
                          <div className="border-t border-slate-300 pt-1">
                            <p className="font-serif italic text-slate-700">Sarah Pitch</p>
                            <p className="font-bold uppercase tracking-wider text-[8px]">Chief Instructor</p>
                          </div>
                          <div className="border-t border-slate-300 pt-1">
                            <p className="font-serif italic text-slate-700">Alex Ferguson</p>
                            <p className="font-bold uppercase tracking-wider text-[8px]">Platform Admin</p>
                          </div>
                        </div>

                        {/* Footer Code */}
                        <div className="pt-4 flex justify-between items-center text-[8px] text-slate-400 font-mono">
                          <div>Issued: {cert.issueDate} • Expires: {cert.expiryDate}</div>
                          <div className="font-bold text-emerald-950 bg-emerald-50 px-2 py-0.5 border border-emerald-100 rounded">
                            ID: {cert.verificationCode}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              ))
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 shadow-sm">
                <Award size={48} className="mx-auto text-slate-300 mb-2" />
                <p className="font-semibold text-slate-700">No Certificates Earned Yet</p>
                <p className="text-xs text-slate-400 mt-1">Certificates will be issued once you complete 100% of a course's curriculum.</p>
              </div>
            )}
          </div>

        </div>

        {/* Right Col: Public Verification Form */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 sticky top-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <ShieldCheck className="text-emerald-800" size={20} />
              <h3 className="font-bold text-slate-800 text-sm">Credential Verification</h3>
            </div>
            
            <p className="text-xs text-slate-500 leading-relaxed">
              Verify the authenticity of any referee credential issued by the platform. Input the certificate's unique verification code.
            </p>

            <form onSubmit={handleVerify} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Verification Code</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="e.g. REF-C1-879E3"
                    className="w-full bg-white border border-slate-300 rounded-lg py-2 pl-8 pr-4 text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                  <Search className="absolute left-2.5 top-2.5 text-slate-400" size={14} />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-950 text-white font-bold py-2 rounded-lg text-xs hover:bg-emerald-900 transition shadow-sm"
              >
                Verify Credential
              </button>
            </form>

            {/* Results Block */}
            {verificationResult && (
              <div className="pt-3">
                {verificationResult.valid ? (
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-emerald-950 text-xs space-y-2">
                    <div className="flex items-center gap-1 font-bold text-emerald-800">
                      <CheckCircle size={14} />
                      <span>Credential Verified</span>
                    </div>
                    <div className="divide-y divide-emerald-100/60 font-medium">
                      <div className="py-1 flex justify-between">
                        <span className="text-slate-400 text-[10px]">Referee:</span>
                        <span>{verificationResult.refereeName}</span>
                      </div>
                      <div className="py-1 flex justify-between">
                        <span className="text-slate-400 text-[10px]">Level:</span>
                        <span className="text-right truncate max-w-[120px]">{verificationResult.certTitle}</span>
                      </div>
                      <div className="py-1 flex justify-between">
                        <span className="text-slate-400 text-[10px]">Issued:</span>
                        <span>{verificationResult.issueDate}</span>
                      </div>
                      <div className="py-1 flex justify-between">
                        <span className="text-slate-400 text-[10px]">Expires:</span>
                        <span>{verificationResult.expiryDate}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 p-3 rounded-lg text-red-950 text-xs space-y-2">
                    <div className="flex items-center gap-1 font-bold text-red-800">
                      <XCircle size={14} />
                      <span>Invalid Credential</span>
                    </div>
                    <p className="text-[10px] text-red-800">
                      No certificate found matching the code <strong>{verificationCode}</strong>. Please check characters and try again.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CertificatePage;
