import React, { useState } from 'react';
import axios from 'axios';
import { Search, ShieldCheck, QrCode, FileCheck, AlertCircle, ExternalLink } from 'lucide-react';

const ImporterDashboard = () => {
  const [vcInput, setVcInput] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVerificationResult(null);
    try {
      // For demo, we expect full VC JSON or a specific mock ID
      let vcToVerify;
      try {
        vcToVerify = JSON.parse(vcInput);
      } catch {
        // If not JSON, assume it's an ID and fetch or use mock
        vcToVerify = { id: vcInput, proof: { jws: 'mock_signature' } }; 
      }

      const { data } = await axios.post('/api/vc/verify', { vc: vcToVerify });
      setVerificationResult(data);
    } catch (err) {
      setVerificationResult({ valid: false, message: 'Verification API Error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in zoom-in-95 duration-500">
      <div className="text-center p-8 bg-gradient-to-r from-green-600 to-green-700 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <ShieldCheck className="h-16 w-16 mx-auto mb-4 text-green-200" />
        <h1 className="text-4xl font-black mb-2">Verification Portal</h1>
        <p className="text-green-100 font-medium">Verify the authenticity of digital agricultural certificates</p>
      </div>

      <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="relative">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <QrCode className="h-6 w-6 text-green-600" />
              <span>Input Digital Passport (VC)</span>
            </h3>
            <textarea
              className="w-full h-48 px-6 py-4 rounded-3xl border-2 border-gray-100 focus:border-green-500 focus:ring-0 outline-none transition-all bg-gray-50/50 font-mono text-sm resize-none"
              placeholder='Paste VC JSON content here or enter Credential ID...'
              value={vcInput}
              onChange={(e) => setVcInput(e.target.value)}
              required
            ></textarea>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 hover:bg-green-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-green-100 transition-all transform active:scale-[0.98] flex items-center justify-center space-x-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : (
              <>
                <Search className="h-6 w-6" />
                <span>Verify Credential Authenticity</span>
              </>
            )}
          </button>
        </form>

        {verificationResult && (
          <div className={`mt-10 p-8 rounded-3xl border-2 animate-in fade-in slide-in-from-top-4 duration-500 ${
            verificationResult.valid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center space-x-4 mb-6">
              {verificationResult.valid ? (
                <FileCheck className="h-12 w-12 text-green-600" />
              ) : (
                <AlertCircle className="h-12 w-12 text-red-600" />
              )}
              <div>
                <h2 className={`text-2xl font-black ${verificationResult.valid ? 'text-green-800' : 'text-red-800'}`}>
                  {verificationResult.valid ? 'Certificate Verified' : 'Verification Failed'}
                </h2>
                <p className="text-gray-600 font-bold">{verificationResult.message || 'Authenticity Confirmed by Inji Verify'}</p>
              </div>
            </div>

            {verificationResult.valid && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white/60 p-5 rounded-2xl">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Product</span>
                  <p className="text-lg font-bold text-gray-800">{verificationResult.credentialSubject.productType}</p>
                </div>
                <div className="bg-white/60 p-5 rounded-2xl">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Status</span>
                  <p className="text-lg font-bold text-green-600">CERTIFIED ORGANIC</p>
                </div>
                <div className="bg-white/60 p-5 rounded-2xl">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Issuer</span>
                  <p className="text-sm font-bold text-gray-700">{verificationResult.issuer}</p>
                </div>
                <div className="bg-white/60 p-5 rounded-2xl">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Issue Date</span>
                  <p className="text-sm font-bold text-gray-700">{new Date(verificationResult.issuanceDate).toLocaleDateString()}</p>
                </div>
                <div className="md:col-span-2 pt-4">
                   <button className="flex items-center space-x-2 text-green-700 font-black hover:text-green-900 transition-colors">
                     <span>View Blockchain Proof</span>
                     <ExternalLink className="h-4 w-4" />
                   </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImporterDashboard;
