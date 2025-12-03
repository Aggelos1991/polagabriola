import React, { useRef, useState, ChangeEvent } from 'react';
import { PhotoData } from '../types';
import { Plus, Image as ImageIcon, Check, Loader2, Upload, Link as LinkIcon } from 'lucide-react';

interface AddPolaroidProps {
  onAdd: (photo: PhotoData) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const AddPolaroid: React.FC<AddPolaroidProps> = ({ onAdd, className = '', style: propStyle }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [topic, setTopic] = useState('');
  const [caption, setCaption] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12; 
    const rotateY = ((x - centerX) / centerX) * 12;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setIsProcessing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent re-triggering file input if bubbling
    if (imagePreview && topic && caption) {
      const newPhoto: PhotoData = {
        id: Date.now(),
        url: imagePreview,
        topic: topic,
        caption: caption,
        instagramUrl: instagramUrl || undefined,
        width: 3,
        height: 3.5,
        rotation: (Math.random() * 0.4) - 0.2, // Random slight rotation
        position: [0, 0, 0],
      };
      onAdd(newPhoto);
      
      // Reset form
      setImagePreview(null);
      setTopic('');
      setCaption('');
      setInstagramUrl('');
    }
  };

  const triggerUpload = () => {
    if (!imagePreview) {
      fileInputRef.current?.click();
    }
  };

  const transformString = isHovered
    ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.05) rotateZ(0deg)`
    : `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) rotateZ(0deg)`;

  return (
    <div 
      className={`relative group w-full max-w-[280px] mx-auto ${className}`}
      style={propStyle}
    >
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={triggerUpload}
        style={{ transform: transformString }}
        className="
          relative 
          bg-white p-3 pb-6 
          shadow-md 
          will-change-transform
          transition-all duration-300 ease-out
          group-hover:z-50
          group-hover:shadow-2xl
          cursor-pointer
        "
      >
        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
        />

        {/* Image Area / Dropzone */}
        <div className={`
          relative w-full aspect-square overflow-hidden mb-4 
          transition-all duration-300
          ${imagePreview ? 'bg-neutral-100' : 'bg-neutral-50 border-2 border-dashed border-neutral-300 hover:border-pink-300 hover:bg-pink-50'}
        `}>
          {imagePreview ? (
            <>
              <img 
                src={imagePreview} 
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button 
                onClick={(e) => {
                   e.stopPropagation();
                   setImagePreview(null);
                }}
                className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                title="Remove image"
              >
                 <Upload className="w-3 h-3" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-neutral-400 gap-2">
              {isProcessing ? (
                <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
              ) : (
                <>
                  <Plus className="w-10 h-10 group-hover:text-pink-500 transition-colors" />
                  <span className="text-sm font-medium">Add Memory</span>
                </>
              )}
            </div>
          )}
          
          {/* Shine effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay"
            style={{
              transform: `translateX(${rotation.y * 2}%) translateY(${rotation.x * 2}%)`
            }}
          />
        </div>

        {/* Caption / Input Area */}
        <div className="text-center relative px-2 space-y-2">
          {imagePreview ? (
            <div onClick={(e) => e.stopPropagation()}>
               {/* 1. Card Text (Handwritten) */}
               <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Card Label..."
                className="w-full text-center font-['Caveat'] text-2xl text-neutral-800 placeholder-neutral-300 border-b border-transparent focus:border-pink-300 focus:outline-none bg-transparent mb-1"
                autoFocus
              />
              
              {/* 2. Topic/Subtitle (Context for AI) */}
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Context (for AI story)..."
                className="w-full text-center font-sans text-xs text-neutral-500 placeholder-neutral-300 border-b border-transparent focus:border-pink-300 focus:outline-none bg-transparent"
              />

              {/* 3. Instagram URL Input */}
              <div className="relative w-full">
                <LinkIcon className="absolute left-1 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-300" />
                <input 
                  type="text"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  className="w-full pl-5 text-center font-sans text-[10px] text-neutral-500 placeholder-neutral-300 border-b border-transparent focus:border-pink-300 focus:outline-none bg-transparent"
                  placeholder="Instagram Link (Optional)..."
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!topic || !caption}
                className={`
                  mt-4 w-full py-2 rounded-md font-sans text-xs font-bold uppercase tracking-wider
                  transition-all duration-200 flex items-center justify-center gap-2
                  ${(topic && caption) 
                    ? 'bg-neutral-900 text-white hover:bg-pink-600 shadow-lg hover:shadow-pink-500/30' 
                    : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'}
                `}
              >
                <Check className="w-3 h-3" />
                Save Memory
              </button>
            </div>
          ) : (
             <p className="font-['Caveat'] text-2xl text-neutral-300 leading-none">
              ...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};