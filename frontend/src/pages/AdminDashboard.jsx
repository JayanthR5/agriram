import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, UserPlus, Settings, ShieldAlert, CheckCircle, XCircle, Search } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [batches, setBatches] = useState([]);
  const [qas, setQas] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchBatches();
  }, []);

  const fetchUsers = async () => {
    try {
      // For demo, we might need an admin user list endpoint
      const { data } = await axios.get('/api/auth/users'); // Mock or actual
      setUsers(data);
      setQas(data.filter(u => u.role === 'QA'));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBatches = async () => {
    try {
      const { data } = await axios.get('/api/batch/all');
      setBatches(data);
    } catch (err) {
      console.error(err);
    }
  };

  const assignQA = async (batchId, qaId) => {
    try {
        // Need an assignment endpoint
        await axios.post(`/api/batch/assign/${batchId}`, { qaId });
        fetchBatches();
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-orange-50 flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <div className="bg-orange-100 p-4 rounded-2xl">
                <ShieldAlert className="h-8 w-8 text-orange-600" />
            </div>
            <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">System Administration</h1>
                <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mt-1">Global Control Center • AgriQCert v1.0</p>
            </div>
        </div>
        <div className="flex space-x-3">
            <button className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"><Settings className="h-6 w-6 text-gray-400" /></button>
            <button className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"><Users className="h-6 w-6 text-gray-400" /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 h-fit">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-gray-800">Pending QA Approvals</h2>
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-black">2 PENDING</span>
          </div>
          <div className="space-y-4">
            {users.filter(u => u.role === 'QA' && !u.isApproved).map(user => (
              <div key={user._id} className="flex items-center justify-between p-5 bg-gray-50 rounded-3xl border border-gray-100 group hover:border-orange-200 transition-all">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-orange-500 shadow-sm">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{user.name}</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase">{user.email}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 bg-green-500 text-white rounded-xl hover:bg-green-600 shadow-lg shadow-green-100 transition-all"><CheckCircle className="h-5 w-5" /></button>
                  <button className="p-2 bg-white text-gray-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all"><XCircle className="h-5 w-5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
           <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-gray-800">Batch Assignments</h2>
            <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input className="pl-9 pr-4 py-2 bg-gray-50 rounded-xl text-sm border-none outline-none focus:ring-1 focus:ring-orange-200" placeholder="Search batches..." />
            </div>
          </div>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {batches.map(batch => (
                <div key={batch._id} className="p-6 bg-white border border-gray-100 rounded-3xl hover:shadow-lg transition-all">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-black text-gray-300 tracking-tighter decoration-gray-200 underline">#{batch._id.slice(-8)}</span>
                        <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${
                            batch.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
                        }`}>{batch.status}</span>
                    </div>
                    <h4 className="text-lg font-black text-gray-800 mb-1">{batch.productType}</h4>
                    <p className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest">{batch.exporter?.name || 'Anonymous Exporter'}</p>
                    
                    <div className="flex items-center space-x-2">
                        <select 
                            className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-600 focus:ring-2 focus:ring-orange-200 outline-none"
                            onChange={(e) => assignQA(batch._id, e.target.value)}
                            value={batch.assignedQA?._id || ''}
                        >
                            <option value="">Assign QA Agency...</option>
                            {qas.filter(q => q.isApproved).map(q => (
                                <option key={q._id} value={q._id}>{q.name}</option>
                            ))}
                        </select>
                        <button className="bg-orange-500 p-3 rounded-xl text-white shadow-lg shadow-orange-100 hover:scale-105 transition-transform">
                            <UserPlus className="h-5 w-5 font-black" />
                        </button>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
