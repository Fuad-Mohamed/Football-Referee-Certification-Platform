import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ShieldCheck, Search, CheckCircle, XCircle, Award } from 'lucide-react';

const PublicCertificateVerify = () => {
  const { verifyCertificateCode } = useContext(AppContext);
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!code) return;
    const res = verifyCertificateCode(code);
    setResult(res);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-full">
          <ShieldCheck size={24} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Public Credential Verification</h2>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          League organizers, club admins, and matches coordinators can verify official credentials.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase">Certificate Verification Code</label>
            <div className="relative">
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. REF-C1-879E3"
                className="w-full bg-white border border-slate-300 rounded-xl py-3 pl-10 pr-4 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800"
              />
              <Search className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-950 text-white font-bold py-3 rounded-xl text-sm hover:bg-emerald-900 transition shadow-md"
          >
            Check Registry Database
          </button>
        </form>

        {result && (
          <div className="pt-2">
            {result.valid ? (
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl text-emerald-950 space-y-4">
                <div className="flex items-center gap-2 font-bold text-emerald-800 text-sm">
                  <CheckCircle size={18} />
                  <span>Credential Successfully Verified</span>
                </div>
                
                <div className="divide-y divide-emerald-100/60 text-xs">
                  <div className="py-2.5 flex justify-between">
                    <span className="text-slate-500 font-semibold">Referee Name:</span>
                    <span className="font-bold text-slate-800">{result.refereeName}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-slate-500 font-semibold">Certification Level:</span>
                    <span className="font-bold text-slate-800">{result.certTitle}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-slate-500 font-semibold">Issue Date:</span>
                    <span className="font-bold text-slate-800">{result.issueDate}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-slate-500 font-semibold">Expiration Date:</span>
                    <span className="font-bold text-slate-800">{result.expiryDate}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-slate-500 font-semibold">Verification Code:</span>
                    <span className="font-mono font-bold text-emerald-950">{result.verificationCode}</span>
                  </div>
                </div>

                <div className="bg-emerald-100/40 p-3 rounded-lg text-[10px] text-emerald-900 leading-relaxed flex gap-2">
                  <Award size={16} className="shrink-0 mt-0.5" />
                  <p>This certificate represents a legally binding refereeing credential issued by the Football Referee Curriculum Platform (FRCP).</p>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 p-5 rounded-xl text-red-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-red-800 text-sm">
                  <XCircle size={18} />
                  <span>Credential Verification Failed</span>
                </div>
                <p className="text-xs text-red-800 leading-relaxed">
                  The verification code <strong>{code}</strong> does not match any active credentials in the database. Ensure the code is correct, including hyphens, or request the referee to present their digital dashboard code.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicCertificateVerify;
