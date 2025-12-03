import React, { useState, useEffect } from 'react';
import { OWNER_IMAGE, STORY_IMAGE } from '../constants';
import { PhotoData } from '../types';
import { Camera, Heart, Coffee, Sparkles, Loader2, ArrowLeft } from 'lucide-react';

interface StoryProps {
  activePhoto?: PhotoData | null;
  onReset?: () => void;
  storyCache: Record<number, string>;
  onGenerateStory: (photo: PhotoData) => Promise<string>;
}

export const Story: React.FC<StoryProps> = ({ activePhoto, onReset, storyCache, onGenerateStory }) => {
  const [aiStory, setAiStory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activePhoto) {
      const fetchStory = async () => {
        // If cached, use it immediately
        if (storyCache[activePhoto.id]) {
          setAiStory(storyCache[activePhoto.id]);
          return;
        }

        // Otherwise generate
        setLoading(true);
        setAiStory(null);
        try {
          const story = await onGenerateStory(activePhoto);
          setAiStory(story);
        } catch (e) {
          setAiStory("The memory is too distant to recall...");
        } finally {
          setLoading(false);
        }
      };
      fetchStory();
    } else {
      setAiStory(null);
    }
  }, [activePhoto, storyCache, onGenerateStory]);

  // Determine background image
  // Use STORY_IMAGE for the creator bio ("Behind the Lens")
  // Use activePhoto.url when a specific polaroid story is active
  const bgImage = activePhoto ? activePhoto.url : STORY_IMAGE;

  return (
    <section id="story" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24 transition-all duration-1000">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat md:bg-fixed transition-all duration-1000 ease-in-out"
        style={{ 
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: 'center 30%',
          // Faded cinematic look: Visible but moody. 
          // grayscale(0.8) keeps it mostly B&W but allows subtle warmth.
          // brightness(0.4) makes it dark enough for text but clearly visible.
          filter: activePhoto ? 'sepia(0.2) contrast(1.1)' : 'grayscale(0.8) brightness(0.4) contrast(1.1)'
        }}
      />
      
      {/* Cinematic Overlay - lighter for owner view to let image show through more, darker for AI story */}
      <div className={`absolute inset-0 z-0 transition-colors duration-1000 ${activePhoto ? 'bg-black/80' : 'bg-black/20'}`} />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          
          {activePhoto ? (
            // DYNAMIC PHOTO STORY VIEW
            <div className="animate-in fade-in zoom-in-95 duration-700">
              <button 
                onClick={onReset}
                className="mb-8 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center gap-2 mx-auto transition-colors backdrop-blur-md"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Creator</span>
              </button>

              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 text-xs tracking-[0.3em] text-pink-400 uppercase backdrop-blur-md">
                   Hidden Poetry
                </span>
                <h2 className="font-serif text-5xl md:text-7xl text-white capitalize">
                  {activePhoto.topic}
                </h2>
              </div>

              <div className="mt-12 bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 to-purple-500/5 group-hover:opacity-100 transition-opacity"></div>
                
                {loading ? (
                  <div className="flex flex-col items-center gap-4 py-8">
                     <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
                     <p className="text-neutral-400 font-serif italic">Listening to the memory...</p>
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Sparkles className="w-8 h-8 text-yellow-500 mx-auto mb-6" />
                    <p className="font-serif text-xl md:text-3xl leading-relaxed text-neutral-100 italic">
                      "{aiStory}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // DEFAULT OWNER STORY VIEW
            <>
              {/* Header */}
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <span className="inline-block px-3 py-1 rounded-full border border-white/20 bg-white/5 text-xs tracking-[0.3em] text-pink-400 uppercase backdrop-blur-md">
                  The Creator
                </span>
                <h2 className="font-serif text-5xl md:text-7xl text-white">
                  Behind the <br/>
                  <span className="italic text-white/50">Lens</span>
                </h2>
              </div>

              {/* Glass Card Text */}
              <div className="bg-black/60 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-2xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 hover:bg-black/70 transition-colors">
                
                <p className="font-serif text-xl md:text-2xl leading-relaxed text-neutral-200 italic mb-8">
                  "Polagabriola isn't just about taking pictures. It's about freezing a feeling, a scent, a whisper of time that would otherwise fade away."
                </p>
                
                <div className="font-light text-neutral-300 space-y-6 text-lg leading-relaxed text-justify md:text-center">
                  <p>
                    Hi, I'm <span className="text-white font-medium">Gabriola</span>. I started this journey with a vintage Polaroid camera found in a dusty attic and a desire to make the digital world feel a little more tangible.
                  </p>
                  <p>
                    In an era of infinite scroll and perfect pixels, I fell in love with the imperfections—the light leaks, the soft focus, and the anticipation of watching a memory develop in the palm of my hand. This gallery is my digital diary, reimagined for you.
                  </p>
                </div>

                {/* Signature / Icons */}
                <div className="mt-10 flex justify-center gap-8 text-white/50">
                  <div className="flex flex-col items-center gap-2 group">
                    <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                      <Camera className="w-5 h-5" />
                    </div>
                    <span className="text-xs uppercase tracking-widest">Capture</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 group">
                    <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                      <Heart className="w-5 h-5" />
                    </div>
                    <span className="text-xs uppercase tracking-widest">Feel</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 group">
                     <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                      <Coffee className="w-5 h-5" />
                    </div>
                    <span className="text-xs uppercase tracking-widest">Create</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};