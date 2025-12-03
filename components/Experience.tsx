import React from 'react';
import { Polaroid } from './Polaroid';
import { AddPolaroid } from './AddPolaroid';
import { PhotoData } from '../types';
import { Trash2 } from 'lucide-react';

interface ExperienceProps {
  onPhotoSelect: (photo: PhotoData) => void;
  photos: PhotoData[];
  onAddPhoto: (photo: PhotoData) => void;
  onUpdatePhoto: (photo: PhotoData) => void;
  onDeletePhoto: (photoId: number) => void;
  onClearAll?: () => void;
  onViewStory: (photo: PhotoData) => void;
  isAdmin: boolean;
}

export const Experience: React.FC<ExperienceProps> = ({ 
  onPhotoSelect, 
  photos, 
  onAddPhoto, 
  onUpdatePhoto, 
  onDeletePhoto,
  onClearAll,
  onViewStory,
  isAdmin 
}) => {
  return (
    <div id="gallery" className="container mx-auto px-4 py-24 relative z-10">
      
      <div className="text-center mb-20 relative max-w-4xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">The Collection</h2>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"></div>
        
        {/* Clear Gallery Button - Only for Admin */}
        {isAdmin && photos.length > 0 && (
          <div className="absolute top-1/2 -translate-y-1/2 right-0 hidden md:block">
            <button 
              onClick={() => {
                if(window.confirm("Are you sure you want to delete ALL photos? This cannot be undone.")) {
                  onClearAll?.();
                }
              }}
              className="flex items-center gap-2 px-3 py-1.5 text-red-400 hover:text-red-300 text-[10px] font-bold uppercase tracking-widest border border-red-500/20 rounded-full hover:bg-red-500/10 transition-colors"
              title="Remove all photos"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Gallery</span>
            </button>
          </div>
        )}
        
        {/* Mobile version of Clear Gallery Button */}
        {isAdmin && photos.length > 0 && (
           <div className="mt-6 md:hidden">
              <button 
                onClick={() => {
                  if(window.confirm("Are you sure you want to delete ALL photos? This cannot be undone.")) {
                    onClearAll?.();
                  }
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-red-400 text-[10px] font-bold uppercase tracking-widest border border-red-500/20 rounded-full bg-red-900/10"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Gallery</span>
              </button>
           </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-24 perspective-[2000px]">
        {/* Add Polaroid Card - Only visible to Admin */}
        {isAdmin && (
          <div className="flex justify-center h-full">
             <AddPolaroid 
                onAdd={onAddPhoto}
                className="animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-backwards"
                style={{ animationDelay: '0ms' }}
             />
          </div>
        )}

        {/* Existing Photos */}
        {photos.map((photo, index) => (
          <div key={photo.id} className="flex justify-center h-full">
            <Polaroid 
              data={photo} 
              onClick={onPhotoSelect}
              isAdmin={isAdmin}
              onUpdate={onUpdatePhoto}
              onDelete={onDeletePhoto}
              onViewStory={onViewStory}
              className={`animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-backwards`}
              // Stagger animation based on index
              style={{ animationDelay: `${(index + 1) * 150}ms` } as React.CSSProperties}
            />
          </div>
        ))}
        
        {/* Empty State Message */}
        {photos.length === 0 && !isAdmin && (
          <div className="col-span-full text-center py-20 text-neutral-500 font-serif italic">
            The gallery is currently empty.
          </div>
        )}
      </div>
    </div>
  );
};