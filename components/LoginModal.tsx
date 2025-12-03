import React, { useState } from 'react';
import { X, Lock, ArrowRight } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (success: boolean) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple client-side check. In a real app, this would verify against a backend.
    if (password.toLowerCase() === 'gabriola') { 
      onLogin(true);
      onClose();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal */}
      <div className="relative bg-[#111] border border-white/10 p-8 rounded-2xl w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-500 ring-1 ring-white/10">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-serif text-white tracking-wide">Creator Access</h3>
          <p className="text-neutral-500 text-sm mt-2">Enter passcode to manage gallery</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passcode"
              className={`
                w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-neutral-500 
                focus:outline-none focus:ring-1 focus:ring-pink-500/50 transition-all
                ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-pink-500/50'}
              `}
              autoFocus
            />
          </div>
          
          {error && (
            <p className="text-red-400 text-xs text-center animate-in slide-in-from-top-1">
              Incorrect passcode. Try again!.
            </p>
          )}

          <button 
            type="submit" 
            className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <span>Unlock</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
