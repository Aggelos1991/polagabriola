import React, { useState, useEffect } from 'react';
import { PhotoData, StoryState } from '../types';
import { APP_NAME, SOCIAL_LINKS } from '../constants';
import { Sparkles, X, Instagram, Info, Loader2, Mail, Copy, Check, ArrowUpRight, Send, ExternalLink, Globe, Link2 } from 'lucide-react';

interface OverlayProps {
  selectedPhoto: PhotoData | null;
  onClose: () => void;
  storyCache: Record<number, string>;
  onGenerateStory: (photo: PhotoData) => Promise<string>;
}

// Custom X (formerly Twitter) Logo Component
const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

// Custom TikTok Logo Component
const TikTokLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export const Overlay: React.FC<OverlayProps> = ({ selectedPhoto, onClose, storyCache, onGenerateStory }) => {
  const [story, setStory] = useState<StoryState>({ loading: false, content: null, error: null });
  const [showContact, setShowContact] = useState(false);
  const [copied, setCopied] = useState(false);
  const EMAIL = "ciobanu_gabriela@ymail.com";

  useEffect(() => {
    if (!selectedPhoto) {
      setStory({ loading: false, content: null, error: null });
    } else {
      document.body.style.overflow = 'hidden';
      // If we already have the story in cache, load it immediately
      if (storyCache[selectedPhoto.id]) {
        setStory({ loading: false, content: storyCache[selectedPhoto.id], error: null });
      } else {
        // Reset state so user sees "Reveal Story" button
        setStory({ loading: false, content: null, error: null });
      }
    }
    return () => {
      if (!showContact) {
        document.body.style.overflow = 'auto';
      }
    };
  }, [selectedPhoto, showContact, storyCache]);

  const handleGenerateStory = async () => {
    if (!selectedPhoto) return;
    
    setStory({ loading: true, content: null, error: null });
    
    try {
      const result = await onGenerateStory(selectedPhoto);
      setStory({ loading: false, content: result, error: null });
    } catch (err) {
      setStory({ loading: false, content: null, error: "The memory is too faint to read right now." });
    }
  };

  const scrollToStory = () => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSocialIcon = (id: string) => {
    switch(id) {
      case 'instagram': return Instagram;
      case 'tiktok': return TikTokLogo;
      case 'x': return XLogo;
      case 'website': return Globe;
      default: return Link2;
    }
  };

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[0px] pointer-events-none">
        <div className="text-white pointer-events-auto">
          <h1 className="text-2xl font-serif font-bold tracking-tight flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}>
            {APP_NAME}
          </h1>
        </div>
        <nav className="flex gap-3 pointer-events-auto">
          
          <button 
            onClick={() => setShowContact(true)}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-all font-medium shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] active:scale-95"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm">Connect</span>
          </button>

          <button 
            onClick={scrollToStory}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all backdrop-blur-md border border-white/10"
          >
            <span className="text-sm font-medium hidden sm:block">Story</span>
            <Info className="w-4 h-4 text-neutral-300 group-hover:text-white" />
          </button>

          <a 
            href="https://www.instagram.com/polagabriola/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors backdrop-blur-md border border-white/10"
            title="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </nav>
      </header>

      {/* CONTACT MODAL / LINKTREE */}
      {showContact && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300"
            onClick={() => setShowContact(false)}
          />
          
          <div className="relative w-full max-w-lg bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Decorative gradients */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] pointer-events-none" />

            <button 
              onClick={() => setShowContact(false)}
              className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-white/10 z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative z-10 text-center space-y-6">
              <div className="space-y-2">
                <span className="text-pink-500 text-xs font-bold tracking-[0.2em] uppercase">Connect</span>
                <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight">
                  Let's create something <span className="italic text-white/50">timeless.</span>
                </h2>
              </div>

              {/* Email Section */}
              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-2 flex items-center gap-2 group hover:border-white/20 transition-colors">
                  <div className="flex-1 px-4 py-2 text-left overflow-hidden">
                    <span className="block text-xs text-neutral-500 uppercase tracking-wider mb-0.5">Email</span>
                    <span className="text-white font-mono text-sm md:text-base truncate block">{EMAIL}</span>
                  </div>
                  
                  <button 
                    onClick={handleCopyEmail}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all active:scale-95 border border-white/5"
                    title="Copy Email"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>

                <a 
                  href={`mailto:${EMAIL}`}
                  className="w-full py-3 bg-white text-black rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  <span>Start a Conversation</span>
                </a>
              </div>

              {/* Divider */}
              <div className="flex items-center justify-center gap-4 text-sm text-neutral-500 py-2">
                <span className="w-12 h-[1px] bg-white/10"></span>
                <span>On the Web</span>
                <span className="w-12 h-[1px] bg-white/10"></span>
              </div>

              {/* Linktree Section */}
              <div className="flex flex-col gap-3">
                {SOCIAL_LINKS.map((link) => {
                  const Icon = getSocialIcon(link.id);
                  return (
                    <a 
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-pink-500/20 text-neutral-400 group-hover:text-pink-400 transition-colors">
                           <Icon className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <span className="block text-white font-medium text-sm leading-none mb-1">{link.label}</span>
                          <span className="block text-neutral-500 text-xs">{link.subtitle}</span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
                    </a>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* PHOTO DETAIL MODAL */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-in fade-in duration-500"
            onClick={onClose}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-5xl h-auto max-h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-500 flex flex-col md:flex-row bg-[#111] border border-white/10">
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-3/5 bg-[#0a0a0a] flex items-center justify-center p-8 md:p-16 relative overflow-hidden group">
               {/* Ambient Glow */}
               <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-pink-900/20 opacity-50"></div>
              
              {/* Actual Polaroid in Modal */}
              <div className="relative bg-white p-4 pb-16 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] transform rotate-[-1deg] transition-transform duration-700 w-full max-w-md mx-auto group-hover:rotate-0">
                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.topic}
                  className="w-full aspect-square object-cover bg-neutral-100 filter sepia-[0.1]"
                />
                 <div className="absolute bottom-6 left-0 right-0 text-center">
                  <p className="font-['Caveat'] text-4xl text-neutral-800">
                    {(selectedPhoto.caption || selectedPhoto.topic).toLowerCase()}
                  </p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-2/5 p-8 md:p-10 flex flex-col bg-neutral-900/50 backdrop-blur-sm">
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="mb-8">
                  <div className="flex justify-between items-start">
                     <div>
                        <span className="text-xs font-medium text-pink-500 uppercase tracking-[0.2em] block mb-3">
                        Memory Archive
                        </span>
                        <h2 className="text-4xl font-serif font-bold text-white mb-6 capitalize leading-tight">
                        {selectedPhoto.topic}
                        </h2>
                     </div>
                     
                     {/* Instagram Link if available */}
                     {selectedPhoto.instagramUrl && (
                       <a 
                         href={selectedPhoto.instagramUrl}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-neutral-400 hover:text-pink-500 transition-colors"
                         title="View original post on Instagram"
                       >
                         <Instagram className="w-5 h-5" />
                       </a>
                     )}
                  </div>
                  <div className="w-full h-[1px] bg-white/10 mb-6"></div>
                </div>

                <div className="min-h-[120px]">
                  {story.loading ? (
                    <div className="flex flex-col items-start justify-center py-4 text-neutral-400 gap-3">
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin text-pink-500" />
                        {/* THEMATIC LOADING TEXT */}
                        <span className="text-sm tracking-wider font-light animate-pulse">The image is slowly developing...</span>
                      </div>
                    </div>
                  ) : story.content ? (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <Sparkles className="w-6 h-6 text-yellow-500 mb-4" />
                      <p className="font-serif text-xl md:text-2xl leading-relaxed text-neutral-200 italic">
                        "{story.content}"
                      </p>
                    </div>
                  ) : (
                    <p className="text-neutral-500 leading-relaxed font-light text-lg">
                      Every snapshot freezes a heartbeat in time. Unveil the hidden poetry and forgotten whispers lingering within this frame.
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                 {!story.content && (
                    <button
                      onClick={handleGenerateStory}
                      disabled={story.loading}
                      className="w-full py-4 px-6 bg-white text-black hover:bg-neutral-200 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg"
                    >
                      <Sparkles className={`w-5 h-5 text-pink-600 ${story.loading ? 'animate-spin' : ''}`} />
                      <span>
                        Reveal Story
                      </span>
                    </button>
                 )}

                {selectedPhoto.instagramUrl && (
                  <a
                    href={selectedPhoto.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] font-medium group"
                  >
                    <Instagram className="w-4 h-4 text-neutral-400 group-hover:text-pink-400 transition-colors" />
                    <span>View on Instagram</span>
                    <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-white ml-1" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};