import React, { useState } from 'react';
import { X, Lock, Send, Check } from 'lucide-react';
import Button from './UI/Button';

interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  title?: string;
  description?: string;
}

export const AuthPromptModal: React.FC<AuthPromptModalProps> = ({ 
  isOpen, 
  onClose, 
  onLoginClick,
  title = "Member Access Required",
  description = "To ensure the quality of our network, you must be logged in to access this feature."
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl animate-fadeInUp">
        <button onClick={onClose} className="absolute top-4 right-4 text-ink/50 hover:text-retro-orange transition-colors">
          <X className="w-6 h-6" />
        </button>
        <div className="w-16 h-16 bg-bone rounded-full flex items-center justify-center mb-6 text-retro-orange mx-auto">
             <Lock className="w-8 h-8" />
        </div>
        <h3 className="font-serif font-bold text-2xl text-med-teal text-center mb-2">{title}</h3>
        <p className="font-sans text-center text-ink/60 mb-8 leading-relaxed">
          {description}
        </p>
        <div className="space-y-3">
          <Button onClick={onLoginClick} className="w-full justify-center">Log In or Sign Up</Button>
          <button onClick={onClose} className="w-full py-3 text-sm font-bold font-tech text-ink/50 hover:text-ink transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

interface ContactSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplierName: string;
}

export const ContactSupplierModal: React.FC<ContactSupplierModalProps> = ({ isOpen, onClose, supplierName }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log(`Message sent to ${supplierName}`);
    setStep('success');
    setTimeout(() => {
        setStep('form');
        onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="absolute inset-0 bg-med-teal/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-fadeInUp overflow-hidden">
        {step === 'form' ? (
            <>
                <div className="p-6 border-b border-med-teal/10 flex justify-between items-center bg-bone/30">
                    <div>
                        <span className="text-xs font-bold font-tech text-retro-orange uppercase tracking-wider">New Message</span>
                        <h3 className="font-serif font-bold text-xl text-med-teal mt-1">Contact {supplierName}</h3>
                    </div>
                    <button onClick={onClose} className="text-ink/40 hover:text-ink transition-colors"><X className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold font-tech text-med-teal uppercase mb-2">Subject</label>
                        <select className="w-full p-3 bg-bone/30 border border-med-teal/10 rounded-lg outline-none focus:border-retro-orange text-sm">
                            <option>Request for Quote (RFQ)</option>
                            <option>General Inquiry</option>
                            <option>Partnership Proposal</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold font-tech text-med-teal uppercase mb-2">Message</label>
                        <textarea 
                            rows={4} 
                            className="w-full p-3 bg-bone/30 border border-med-teal/10 rounded-lg outline-none focus:border-retro-orange text-sm resize-none"
                            placeholder={`Hi, I'm interested in your services for...`}
                            required
                        ></textarea>
                    </div>
                    <div className="pt-2">
                         <Button type="submit" className="w-full justify-center">Send Message <Send className="w-4 h-4 ml-2" /></Button>
                         <p className="text-center text-[10px] text-ink/40 mt-3">Replies will be sent to your registered email address.</p>
                    </div>
                </form>
            </>
        ) : (
            <div className="p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-[bounce_0.5s_ease-out]">
                    <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-med-teal mb-2">Message Sent!</h3>
                <p className="text-ink/60">Your inquiry has been delivered to {supplierName}.</p>
            </div>
        )}
      </div>
    </div>
  );
};