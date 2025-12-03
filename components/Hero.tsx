import React from 'react';
import { ArrowDown } from 'lucide-react';
import { OWNER_IMAGE } from '../constants';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20 pb-10">
      
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12 z-10">
        
        {/* Left: Typography */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <div className="inline-block animate-in slide-in-from-bottom-8 duration-700 delay-100 fade-in">
             <span className="text-pink-500 tracking-[0.2em] text-sm font-semibold uppercase mb-2 block">
              The Digital Collection
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9]">
              Capturing <br/>
              <span className="italic text-white/50">fleeting</span> moments.
            </h1>
          </div>
          
          <p className="text-neutral-400 max-w-lg text-base sm:text-lg md:text-xl font-light leading-relaxed mx-auto md:mx-0 animate-in slide-in-from-bottom-8 duration-700 delay-300 fade-in">
            Welcome to <span className="text-white font-medium">Polagabriola</span>. 
            A curated space where analog nostalgia meets digital storytelling, powered by imagination.
          </p>

          <div className="pt-8 animate-in slide-in-from-bottom-8 duration-700 delay-500 fade-in">
             <button 
                onClick={() => document.getElementById('gallery')?.scrollIntoView()}
                className="group flex items-center gap-3 text-white border border-white/20 px-6 py-3 rounded-full hover:bg-white/10 transition-colors mx-auto md:mx-0"
              >
               <span>Explore Gallery</span>
               <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
             </button>
          </div>
        </div>

        {/* Right: Owner Image - Polaroid Style */}
        <div className="flex-1 w-full flex justify-center md:justify-end perspective-[1500px]">
          <div 
            className="relative group animate-float" 
            style={{ '--tw-rotate': '3deg' } as React.CSSProperties}
          >
             {/* Tape Effect */}
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-10 bg-white/20 backdrop-blur-sm rotate-[-2deg] z-20 shadow-sm border-x border-white/10 opacity-80"></div>

             {/* Polaroid Frame */}
             <div className="relative bg-white p-4 pb-16 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transform transition-transform duration-700 hover:scale-105 hover:rotate-0">
                <div className="aspect-[4/5] w-[260px] sm:w-[280px] md:w-[320px] bg-neutral-100 overflow-hidden filter sepia-[0.2] contrast-[0.9]">
                  <img 
                    src={OWNER_IMAGE} 
                    alt="Gabriola" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Handwritten Title */}
                <div className="absolute bottom-5 left-0 right-0 text-center">
                  <p className="font-['Caveat'] text-5xl text-neutral-800">gabriola</p>
                </div>
                
                {/* Texture overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
             </div>
             
             {/* Glow behind */}
             <div className="absolute -inset-10 bg-pink-500/20 rounded-full blur-3xl -z-10 group-hover:bg-pink-500/30 transition-colors"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/30 hidden md:block">
        <ArrowDown className="w-6 h-6" />
      </div>
    </section>
  );
};