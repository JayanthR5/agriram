import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Plus, ClipboardList, CheckCircle, Clock, AlertCircle, QrCode } from 'lucide-react';

const ExporterDashboard = () => {
  const [batches, setBatches] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [showQR, setShowQR] = useState(null);
  const [newBatch, setNewBatch] = useState({

    productType: '',
    quantity: '',
    origin: '',
    destination: '',
    harvestDate: '',
  });

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const { data } = await axios.get('/api/batch/all');
      setBatches(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/batch/upload', newBatch);
      setShowUpload(false);
      fetchBatches();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'In Inspection': return <ClipboardList className="h-5 w-5 text-blue-500" />;
      case 'Certified': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Rejected': return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-green-50">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Exporter Portal</h1>
          <p className="text-gray-500 mt-1 font-medium">Manage your crop batches and certifications</p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-lg shadow-green-100 transition-all active:scale-95"
        >
          <Plus className="h-5 w-5" />
          <span>Upload New Batch</span>
        </button>
      </div>

      {showUpload && (
        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-green-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 font-display">New Batch Details</h2>
          <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 ml-1">Product Type</label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition-all bg-gray-50/50"
                placeholder="e.g. Organic Basmati Rice"
                value={newBatch.productType}
                onChange={(e) => setNewBatch({ ...newBatch, productType: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 ml-1">Quantity</label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition-all bg-gray-50/50"
                placeholder="e.g. 500 Metric Tons"
                value={newBatch.quantity}
                onChange={(e) => setNewBatch({ ...newBatch, quantity: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 ml-1">Origin Location</label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition-all bg-gray-50/50"
                placeholder="e.g. Punjab, India"
                value={newBatch.origin}
                onChange={(e) => setNewBatch({ ...newBatch, origin: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 ml-1">Destination Country</label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition-all bg-gray-50/50"
                placeholder="e.g. United Arab Emirates"
                value={newBatch.destination}
                onChange={(e) => setNewBatch({ ...newBatch, destination: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 ml-1">Harvest Date</label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition-all bg-gray-50/50"
                value={newBatch.harvestDate}
                onChange={(e) => setNewBatch({ ...newBatch, harvestDate: e.target.value })}
                required
              />
            </div>
            <div className="md:col-span-2 flex space-x-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all"
              >
                Submit for Inspection
              </button>
              <button
                type="button"
                onClick={() => setShowUpload(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-4 rounded-xl transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <h2 className="text-xl font-bold text-gray-800 ml-2">Recent Batches</h2>
        {batches.map((batch) => (
          <div key={batch._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow group">
            <div className="flex items-center space-x-4">
              <div className="bg-green-50 p-3 rounded-xl group-hover:bg-green-100 transition-colors">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{batch.productType}</h3>
                <p className="text-sm text-gray-500 font-medium">{batch.quantity} • From {batch.origin} to {batch.destination}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-1 mb-1">
                  {getStatusIcon(batch.status)}
                  <span className="text-sm font-bold text-gray-700">{batch.status}</span>
                </div>
                <span className="text-xs text-gray-400 font-medium">Updated 2h ago</span>
              </div>
              {batch.status === 'Certified' && (
                <button 
                  onClick={() => setShowQR(batch)}
                  className="bg-green-50 p-2 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <QrCode className="h-6 w-6 text-green-600" />
                </button>
              )}
            </div>
          </div>
        ))}

        {showQR && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white p-8 rounded-[2.5rem] max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95">
                <h3 className="text-2xl font-black text-gray-800 mb-2">Digital passport QR</h3>
                <p className="text-gray-500 text-sm font-bold mb-6 uppercase tracking-widest">{showQR.productType}</p>
                <div className="bg-gray-50 p-6 rounded-3xl mb-6 border-2 border-dashed border-gray-100">
                    {/* In a real app, fetch the actual QR URL from /api/qr/generate */}
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://localhost:3000/verify/${showQR._id}`} alt="QR Code" className="mx-auto" />
                </div>
                <button 
                    onClick={() => setShowQR(null)}
                    className="w-full bg-gray-900 text-white font-black py-4 rounded-2xl hover:bg-black transition-all"
                >
                    Close
                </button>
            </div>
          </div>
        )}

        {batches.length === 0 && (
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium text-lg">No batches uploaded yet. Start by clicking 'Upload New Batch'.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExporterDashboard;
