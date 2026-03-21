import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipboardList, Play, CheckCircle2, FlaskConical, Beaker, ShieldCheck } from 'lucide-react';

const QADashboard = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [results, setResults] = useState({
    moisture: '',
    pesticideLevels: 'None Detected',
    organicStatus: false,
    isoCompliance: false,
    results: 'Pass',
    comments: ''
  });

  useEffect(() => {
    fetchAssignedBatches();
  }, []);

  const fetchAssignedBatches = async () => {
    try {
      const { data } = await axios.get('/api/batch/all');
      setBatches(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStart = async (batchId) => {
    try {
      await axios.post('/api/inspection/start', { batchId });
      fetchAssignedBatches();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/inspection/submit', { 
        batchId: selectedBatch._id,
        ...results
      });
      setSelectedBatch(null);
      fetchAssignedBatches();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-50">
        <h1 className="text-3xl font-extrabold text-gray-900">QA Agency Workspace</h1>
        <p className="text-gray-500 mt-1 font-medium">Review and certify agricultural batches</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-bold text-gray-800 ml-2">Inspection Queue</h2>
          {batches.map((batch) => (
            <div 
              key={batch._id} 
              onClick={() => batch.status === 'In Inspection' && setSelectedBatch(batch)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                selectedBatch?._id === batch._id 
                  ? 'bg-blue-50 border-blue-200 shadow-md ring-2 ring-blue-100' 
                  : 'bg-white border-gray-100 hover:border-blue-200'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-lg font-bold text-gray-800">{batch.productType}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  batch.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                  batch.status === 'In Inspection' ? 'bg-blue-100 text-blue-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {batch.status}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-bold mb-4 uppercase tracking-wider">{batch._id.slice(-8)}</p>
              
              {batch.status === 'Pending' && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleStart(batch._id); }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-blue-50"
                >
                  <Play className="h-4 w-4" />
                  <span>Start Inspection</span>
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="lg:col-span-2">
          {selectedBatch ? (
            <div className="bg-white p-8 rounded-3xl border border-blue-100 shadow-xl">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-blue-100 p-4 rounded-2xl">
                  <FlaskConical className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Inspection Data Entry</h2>
                  <p className="text-gray-500 font-medium">Batch: {selectedBatch.productType} ({selectedBatch._id.slice(-8)})</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 flex items-center space-x-1">
                      <Beaker className="h-4 w-4" />
                      <span>Moisture Percentage (%)</span>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50"
                      value={results.moisture}
                      onChange={(e) => setResults({ ...results, moisture: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 flex items-center space-x-1">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Pesticide Levels</span>
                    </label>
                    <input
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50"
                      value={results.pesticideLevels}
                      onChange={(e) => setResults({ ...results, pesticideLevels: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 py-4">
                  <label className="flex items-center space-x-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100 cursor-pointer hover:bg-green-50 transition-colors">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-green-600"
                      checked={results.organicStatus}
                      onChange={(e) => setResults({ ...results, organicStatus: e.target.checked })}
                    />
                    <span className="font-bold text-gray-700">Organic Status</span>
                  </label>
                  <label className="flex items-center space-x-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-blue-600"
                      checked={results.isoCompliance}
                      onChange={(e) => setResults({ ...results, isoCompliance: e.target.checked })}
                    />
                    <span className="font-bold text-gray-700">ISO Compliance</span>
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600">Final Verification Result</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setResults({ ...results, results: 'Pass' })}
                      className={`py-4 rounded-xl font-bold border-2 transition-all ${
                        results.results === 'Pass' 
                        ? 'bg-green-50 border-green-500 text-green-700' 
                        : 'bg-white border-gray-200 text-gray-400 opacity-60'
                      }`}
                    >
                      PASS
                    </button>
                    <button
                      type="button"
                      onClick={() => setResults({ ...results, results: 'Fail' })}
                      className={`py-4 rounded-xl font-bold border-2 transition-all ${
                        results.results === 'Fail' 
                        ? 'bg-red-50 border-red-500 text-red-700' 
                        : 'bg-white border-gray-200 text-gray-400 opacity-60'
                      }`}
                    >
                      FAIL
                    </button>
                  </div>
                </div>

                <div className="pt-4 space-y-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-5 rounded-2xl shadow-xl shadow-blue-100 transition-all flex items-center justify-center space-x-2"
                  >
                    <CheckCircle2 className="h-6 w-6" />
                    <span>Submit & Issue Certification</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedBatch(null)}
                    className="w-full text-gray-400 font-bold hover:text-gray-600 transition-colors"
                  >
                    Discard Changes
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-12 h-full flex flex-col items-center justify-center text-center">
              <ClipboardList className="h-16 w-16 text-gray-200 mb-6" />
              <h3 className="text-xl font-bold text-gray-400">Select a batch from the 'In Inspection' queue to record data</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QADashboard;
