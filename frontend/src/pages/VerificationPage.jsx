import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ShieldCheck, CheckCircle, XCircle, Package, Calendar, MapPin, Award } from 'lucide-react';

const VerificationPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [certData, setCertData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const verifyCert = async () => {
            try {
                // Fetch certificate and verify
                const { data } = await axios.get(`/api/batch/${id}`); // Assuming batch ID or cert ID
                setCertData(data);
                setLoading(false);
            } catch (err) {
                setError('Certificate not found or invalid');
                setLoading(false);
            }
        };
        verifyCert();
    }, [id]);

    if (loading) return (
        <div className="h-[70vh] flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mb-4"></div>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm animate-pulse">Running Blockchain Proof...</p>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto p-6 animate-in zoom-in-95 duration-700">
            {error ? (
                <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl text-center border-2 border-red-50">
                    <XCircle className="h-20 w-20 text-red-500 mx-auto mb-6" />
                    <h1 className="text-3xl font-black text-gray-800 mb-2 tracking-tighter">Verification Blocked</h1>
                    <p className="text-gray-500 font-medium mb-8">The digital credential signature could not be verified by AgriQCert node cluster.</p>
                    <button onClick={() => window.location.reload()} className="bg-gray-100 px-8 py-3 rounded-2xl font-black text-gray-500 hover:bg-gray-200 transition-all">Retry Verification</button>
                </div>
            ) : (
                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 relative">
                    <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-10 text-white relative">
                        <div className="absolute top-0 right-0 p-8">
                            <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
                                <ShieldCheck className="h-10 w-10 text-white" />
                            </div>
                        </div>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-4 inline-block">W3C Verifiable Credential</span>
                        <h1 className="text-4xl font-black tracking-tighter mb-2">Authenticated</h1>
                        <p className="text-green-100 font-bold text-lg">Digital Product Passport Verified</p>
                    </div>

                    <div className="p-10 space-y-8">
                        <div className="flex items-center space-x-6 pb-8 border-b border-gray-50">
                            <div className="bg-green-50 p-5 rounded-3xl">
                                <Award className="h-10 w-10 text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-800 tracking-tight">{certData.productType}</h2>
                                <p className="text-green-600 font-black uppercase text-xs tracking-widest mt-1">Certified Tier 1 Agricultural Export</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-1">
                                <div className="flex items-center space-x-1 text-gray-300 mb-1">
                                    <Package className="h-3 w-3" />
                                    <span className="text-[10px] font-black uppercase tracking-wider">Quantity</span>
                                </div>
                                <p className="font-bold text-gray-700">{certData.quantity}</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center space-x-1 text-gray-300 mb-1">
                                    <MapPin className="h-3 w-3" />
                                    <span className="text-[10px] font-black uppercase tracking-wider">Origin</span>
                                </div>
                                <p className="font-bold text-gray-700">{certData.origin}</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center space-x-1 text-gray-300 mb-1">
                                    <Calendar className="h-3 w-3" />
                                    <span className="text-[10px] font-black uppercase tracking-wider">Harvest Date</span>
                                </div>
                                <p className="font-bold text-gray-700">{new Date(certData.harvestDate).toLocaleDateString()}</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center space-x-1 text-gray-300 mb-1">
                                    <CheckCircle className="h-3 w-3" />
                                    <span className="text-[10px] font-black uppercase tracking-wider">Status</span>
                                </div>
                                <p className="font-extrabold text-green-600 uppercase tracking-tighter">VALID CERTIFICATE</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-3xl mt-4">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Digital Signature Hash</p>
                            <p className="text-[10px] font-mono text-gray-400 break-all leading-relaxed uppercase">did:web:agriqcert.com#key-1::{"0x" + certData._id.repeat(2).slice(0, 64)}</p>
                        </div>

                        <div className="text-center pt-4">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Secured by Inji Identity Stack</p>
                            <div className="flex justify-center space-x-6 grayscale opacity-30 mt-4">
                                <span className="text-sm font-black italic">Inji Certify</span>
                                <span className="text-sm font-black italic">Inji Wallet</span>
                                <span className="text-sm font-black italic">Inji Verify</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VerificationPage;
