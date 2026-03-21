import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Database, CheckCircle2, AlertCircle, RefreshCcw } from 'lucide-react';

const TestConnection = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkConnection = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      // Direct call to port 5000 (Pure Node.js Server)
      const res = await axios.get('http://localhost:5000/api/test');
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to connect to backend');
      console.error('Connection Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-[2rem] shadow-2xl border border-gray-100 text-center animate-in zoom-in-95 duration-500">
      <div className="bg-green-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <Database className={`h-10 w-10 ${loading ? 'text-gray-400 animate-spin' : 'text-green-600'}`} />
      </div>

      <h2 className="text-2xl font-black text-gray-800 mb-2">Backend Connection Test</h2>
      <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-8">Pure Node.js • Manual Routing • CORS Test</p>

      {loading && (
        <div className="py-6 space-y-3">
          <div className="h-4 bg-gray-100 rounded-full w-48 mx-auto animate-pulse"></div>
          <p className="text-gray-400 text-sm font-black italic">Probing AgriQCert Cluster...</p>
        </div>
      )}

      {data && (
        <div className="bg-green-50 p-6 rounded-3xl border-2 border-green-200 animate-in fade-in duration-700">
          <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <p className="text-green-800 font-extrabold text-lg">{data.message}</p>
          <div className="mt-4 flex justify-center items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
            <span className="text-[10px] font-black text-green-700 uppercase">Live Port 5000</span>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 p-6 rounded-3xl border-2 border-red-200 animate-in shake duration-500">
          <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-3" />
          <p className="text-red-700 font-extrabold">{error}</p>
          <p className="text-xs text-red-400 mt-2">Ensure the pure Node.js server is running on port 5000</p>
        </div>
      )}

      <button
        onClick={checkConnection}
        disabled={loading}
        className="mt-8 flex items-center justify-center space-x-2 w-full bg-gray-900 hover:bg-black text-white font-black py-4 rounded-2xl shadow-xl shadow-gray-200 transition-all active:scale-95 group"
      >
        <RefreshCcw className={`h-5 w-5 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
        <span>Retry Connection</span>
      </button>

      <div className="mt-6 flex flex-col space-y-1">
          <span className="text-[10px] font-black text-gray-300 uppercase tracking-tighter italic">Secured by Pure Node Stack</span>
          <div className="h-[1px] bg-gray-50 w-full"></div>
      </div>
    </div>
  );
};

export default TestConnection;
