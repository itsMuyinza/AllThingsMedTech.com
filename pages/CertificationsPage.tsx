import React, { useState, useRef } from 'react';
import { ShieldCheck, Upload, FileText, X, Loader2, Calendar, Building2, Check, AlertCircle, Clock, ChevronLeft } from 'lucide-react';
import Button from '../components/UI/Button';
import NeuralBackground from '../components/NeuralBackground';

interface Certification {
    id: string;
    type: string;
    issuingBody: string;
    expiryDate: string;
    status: 'Pending' | 'Active' | 'Expired';
    fileName: string;
}

const CertificationsPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
    const [certs, setCerts] = useState<Certification[]>([
        { id: '1', type: 'ISO 13485', issuingBody: 'TUV SUD', expiryDate: '2025-10-12', status: 'Active', fileName: 'iso_13485_cert.pdf' }
    ]);
    
    // Form State
    const [type, setType] = useState('ISO 13485 (Quality Management - Medical Devices)');
    const [customType, setCustomType] = useState('');
    const [issuingBody, setIssuingBody] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.size <= 5 * 1024 * 1024) {
            setFile(droppedFile);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.size <= 5 * 1024 * 1024) {
            setFile(selectedFile);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !expiryDate || !issuingBody) return;

        setIsUploading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1200));

        const newCert: Certification = {
            id: Math.random().toString(36).substr(2, 9),
            type: type === 'Other' ? customType : type,
            issuingBody,
            expiryDate,
            status: 'Pending',
            fileName: file.name
        };

        setCerts(prev => [newCert, ...prev]);
        setIsUploading(false);
        setShowSuccessToast(true);
        
        // Reset form
        setType('ISO 13485 (Quality Management - Medical Devices)');
        setCustomType('');
        setIssuingBody('');
        setExpiryDate('');
        setFile(null);

        setTimeout(() => setShowSuccessToast(false), 3000);
    };

    return (
        <div className="min-h-screen bg-bone pt-24 pb-20 relative overflow-hidden">
            {/* Subtle background */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <NeuralBackground />
            </div>

            {/* Success Toast */}
            {showSuccessToast && (
                <div className="fixed top-28 right-8 z-[100] bg-med-teal text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-[slideInRight_0.4s_cubic-bezier(0.16,1,0.3,1)]">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="font-bold text-sm">Certification submitted!</p>
                        <p className="text-[10px] opacity-70 uppercase font-tech font-bold">Awaiting verification (24-48 hrs)</p>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <button 
                    onClick={() => onNavigate('dashboard')} 
                    className="flex items-center text-ink/40 hover:text-med-teal transition-colors font-tech text-xs font-bold uppercase tracking-widest mb-8"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back to Dashboard
                </button>

                <header className="mb-12">
                    <h1 className="font-serif font-black text-4xl md:text-5xl text-med-teal mb-4">Company Certifications</h1>
                    <p className="font-sans text-lg text-ink/60 max-w-2xl leading-relaxed">
                        Upload valid certificates to earn <span className="text-med-teal font-bold">'Verified'</span> badges and boost your company's search ranking by up to 40%.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    
                    {/* LEFT COLUMN: LIST */}
                    <div className="lg:col-span-2 space-y-6">
                        {certs.length === 0 ? (
                            <div className="bg-white/40 backdrop-blur-md rounded-3xl border-2 border-dashed border-med-teal/10 p-20 text-center flex flex-col items-center justify-center">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                                    <ShieldCheck className="w-10 h-10 text-med-teal/20" />
                                </div>
                                <h3 className="font-serif font-bold text-2xl text-med-teal mb-2">No certifications added yet</h3>
                                <p className="font-sans text-ink/40 mb-8 max-w-sm">
                                    Adding ISO standards and FDA registrations is the fastest way to build trust with potential partners.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {certs.map(cert => (
                                    <div key={cert.id} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-med-teal/5 shadow-sm group hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-med-teal/[0.02] rounded-bl-full pointer-events-none"></div>
                                        
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-10 h-10 bg-med-teal/5 rounded-xl flex items-center justify-center text-med-teal">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <span className={`text-[10px] font-bold font-tech px-2.5 py-1 rounded-full uppercase tracking-wider ${
                                                cert.status === 'Active' ? 'bg-green-50 text-green-600 border border-green-100' :
                                                cert.status === 'Pending' ? 'bg-mustard/10 text-mustard border border-mustard/20' :
                                                'bg-retro-orange/10 text-retro-orange border border-retro-orange/20'
                                            }`}>
                                                {cert.status === 'Active' ? <><Check className="w-2.5 h-2.5 inline mr-1" /> Verified</> : cert.status}
                                            </span>
                                        </div>

                                        <h3 className="font-serif font-bold text-xl text-ink mb-1">{cert.type}</h3>
                                        <p className="text-xs font-bold font-tech text-ink/40 uppercase mb-6 flex items-center gap-2">
                                            <Building2 className="w-3.5 h-3.5" /> Issued by: {cert.issuingBody}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-med-teal/5">
                                            <div className="flex items-center gap-2 text-xs font-tech text-ink/60">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>Exp: {new Date(cert.expiryDate).toLocaleDateString()}</span>
                                            </div>
                                            <button className="text-[10px] font-bold text-med-teal/40 hover:text-retro-orange uppercase transition-colors">
                                                View Document
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: STICKY FORM */}
                    <div className="lg:col-span-1 sticky top-32">
                        <div className="bg-white rounded-3xl shadow-xl border border-med-teal/10 overflow-hidden">
                            <div className="bg-med-teal p-6 text-white">
                                <h3 className="font-serif font-bold text-xl">Add Certification</h3>
                                <p className="text-white/60 text-xs mt-1">Strengthen your profile authority</p>
                            </div>
                            
                            <form onSubmit={handleSave} className="p-6 space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold font-tech text-med-teal/50 uppercase mb-2">Certification Type</label>
                                    <select 
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        className="w-full bg-bone/50 border border-med-teal/10 rounded-xl px-4 py-3 outline-none focus:border-retro-orange transition-colors text-sm font-sans"
                                    >
                                        <option>ISO 13485 (Quality Management - Medical Devices)</option>
                                        <option>ISO 9001 (General Quality)</option>
                                        <option>FDA Registration</option>
                                        <option>CE Mark (MDR)</option>
                                        <option>UL / CSA Safety</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                {type === 'Other' && (
                                    <div className="animate-[fadeIn_0.3s]">
                                        <label className="block text-[10px] font-bold font-tech text-med-teal/50 uppercase mb-2">Specify Certification</label>
                                        <input 
                                            required
                                            type="text" 
                                            value={customType}
                                            onChange={(e) => setCustomType(e.target.value)}
                                            className="w-full bg-bone/50 border border-med-teal/10 rounded-xl px-4 py-3 outline-none focus:border-retro-orange transition-colors text-sm"
                                            placeholder="e.g. MDSAP, ISO 11135"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-[10px] font-bold font-tech text-med-teal/50 uppercase mb-2">Issuing Body</label>
                                    <input 
                                        required
                                        type="text" 
                                        value={issuingBody}
                                        onChange={(e) => setIssuingBody(e.target.value)}
                                        className="w-full bg-bone/50 border border-med-teal/10 rounded-xl px-4 py-3 outline-none focus:border-retro-orange transition-colors text-sm"
                                        placeholder="e.g. BSI, SGS, Intertek"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold font-tech text-med-teal/50 uppercase mb-2">Expiry Date</label>
                                    <input 
                                        required
                                        type="date" 
                                        value={expiryDate}
                                        onChange={(e) => setExpiryDate(e.target.value)}
                                        className="w-full bg-bone/50 border border-med-teal/10 rounded-xl px-4 py-3 outline-none focus:border-retro-orange transition-colors text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold font-tech text-med-teal/50 uppercase mb-2">Document Proof</label>
                                    {!file ? (
                                        <div 
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={handleFileDrop}
                                            onClick={() => fileInputRef.current?.click()}
                                            className="border-2 border-dashed border-med-teal/10 rounded-2xl p-8 text-center cursor-pointer hover:bg-bone/50 hover:border-med-teal/30 transition-all group"
                                        >
                                            <Upload className="w-6 h-6 text-med-teal/20 mx-auto mb-2 group-hover:text-retro-orange group-hover:scale-110 transition-all" />
                                            <p className="text-[10px] font-bold font-tech text-ink/40 uppercase">Drag certificate here</p>
                                            <p className="text-[9px] text-ink/30 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                                            <input 
                                                ref={fileInputRef}
                                                type="file" 
                                                className="hidden" 
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={handleFileSelect}
                                            />
                                        </div>
                                    ) : (
                                        <div className="bg-med-teal/5 rounded-2xl p-4 flex items-center justify-between border border-med-teal/10">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-retro-orange shrink-0">
                                                    <FileText className="w-4 h-4" />
                                                </div>
                                                <div className="overflow-hidden">
                                                    <p className="text-xs font-bold text-med-teal truncate">{file.name}</p>
                                                    <p className="text-[9px] text-ink/30 font-tech uppercase">Ready for upload</p>
                                                </div>
                                            </div>
                                            <button 
                                                type="button"
                                                onClick={() => setFile(null)}
                                                className="p-1 hover:bg-retro-orange/10 rounded-full text-retro-orange transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <Button 
                                    className="w-full py-4 shadow-lg disabled:opacity-50" 
                                    type="submit" 
                                    disabled={isUploading || !file || !expiryDate}
                                >
                                    {isUploading ? (
                                        <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Uploading...</>
                                    ) : (
                                        <>Save Certification</>
                                    )}
                                </Button>

                                <div className="flex items-start gap-2 pt-2 text-[9px] text-ink/30 italic">
                                    <AlertCircle className="w-3 h-3 shrink-0" />
                                    <span>All submissions are verified by our audit team. False claims may result in listing suspension.</span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificationsPage;