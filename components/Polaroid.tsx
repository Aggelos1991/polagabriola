import React, { useRef, useState } from "react";
import { PhotoData } from "../types";
import {
  Instagram,
  Plus,
  Loader2,
  Sparkles,
  Link as LinkIcon,
  Pencil,
  Check,
  Trash2,
} from "lucide-react";

interface PolaroidProps {
  data: PhotoData;
  onClick: (data: PhotoData) => void;
  className?: string;
  style?: React.CSSProperties;
  isAdmin?: boolean;
  onUpdate?: (data: PhotoData) => void;
  onDelete?: (photoId: number) => void;
  onViewStory?: (data: PhotoData) => void;
}

export const Polaroid: React.FC<PolaroidProps> = ({
  data,
  onClick,
  className = "",
  style: propStyle,
  isAdmin = false,
  onUpdate,
  onDelete,
  onViewStory,
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isEditing) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdate) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ ...data, url: reader.result as string });
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const toggleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (
      onDelete &&
      window.confirm(
        "Are you sure you want to delete this memory? This cannot be undone."
      )
    ) {
      onDelete(data.id);
    }
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onUpdate) onUpdate({ ...data, caption: e.target.value });
  };

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onUpdate) onUpdate({ ...data, topic: e.target.value });
  };

  const handleInstagramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onUpdate) onUpdate({ ...data, instagramUrl: e.target.value });
  };

  const triggerViewStory = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onViewStory) onViewStory(data);
  };

  const transformString =
    isHovered && !isEditing
      ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.1) translateY(-10px) rotateZ(0deg)`
      : `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0px) rotateZ(${
          data.rotation * 10
        }deg)`;

  return (
    <div
      className={`relative group w-full max-w-[280px] mx-auto ${className}`}
      style={propStyle}
    >
      <div
        ref={containerRef}
        onClick={() => !isEditing && onClick(data)}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ transform: transformString }}
        className={`
          relative bg-white p-3 shadow-md
          will-change-transform transition-all duration-500
          ${
            isHovered || isEditing
              ? "z-50 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]"
              : ""
          }
          ${isEditing ? "cursor-default pb-6" : "cursor-pointer pb-12"}
        `}
      >
        {isAdmin && (
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
          />
        )}

        {isAdmin && !isEditing && (
          <button
            type="button"
            onClick={toggleEdit}
            className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-pink-50 text-neutral-500 hover:text-pink-600 rounded-full transition-all shadow-sm opacity-0 group-hover:opacity-100 z-30"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        )}

        <div className="relative w-full aspect-square overflow-hidden bg-neutral-100 mb-4">
          <img
            src={data.url}
            alt={data.topic}
            className={`w-full h-full object-cover ${
              isUploading ? "opacity-50" : ""
            }`}
          />

          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
            </div>
          )}

          {!isAdmin && !isEditing && onViewStory && (
            <button
              type="button"
              onClick={triggerViewStory}
              className="absolute top-2 left-2 p-2 bg-white/80 hover:bg-pink-500 hover:text-white text-neutral-600 rounded-full opacity-0 group-hover:opacity-100 z-20"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="text-center">
          {isEditing ? (
            <div className="flex flex-col gap-2 pt-1">
              <input
                type="text"
                value={data.caption || data.topic}
                onChange={handleCaptionChange}
                className="w-full text-center font-['Caveat'] text-2xl bg-pink-50/50 border-b border-pink-200 focus:border-pink-400 px-1 py-1"
              />

              <input
                type="text"
                value={data.topic}
                onChange={handleTopicChange}
                className="w-full text-center text-[11px] bg-neutral-50 border-b border-neutral-200 focus:border-pink-300 py-2"
              />

              <div className="relative w-full">
                <LinkIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-400" />
                <input
                  type="text"
                  value={data.instagramUrl || ""}
                  onChange={handleInstagramChange}
                  className="w-full pl-7 text-center text-[10px] bg-neutral-50 border-b border-neutral-200 focus:border-pink-300 py-2"
                  placeholder="Instagram Link..."
                />
              </div>

              <div className="mt-3 flex items-center justify-center gap-2">
                {onDelete && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="p-2 bg-neutral-100 hover:bg-red-50 text-neutral-400 hover:text-red-500 rounded-full"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={toggleEdit}
                  className="px-3 py-1.5 bg-neutral-900 text-white text-[10px] rounded-full hover:bg-pink-600 shadow-md"
                >
                  <Check className="w-3 h-3 inline-block" /> Save
                </button>
              </div>
            </div>
          ) : (
            <p className="font-['Caveat'] text-2xl text-neutral-800">
              {(data.caption || data.topic).toLowerCase()}
            </p>
          )}
        </div>

        {/* ⭐ NEW INSTAGRAM ICON — always visible on hover, safe click */}
        {!isAdmin && !isEditing && (
          <a
            href={data.instagramUrl || undefined}
            target="_blank"
            onClick={(e) => {
              if (!data.instagramUrl) e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          >
            <Instagram className="w-4 h-4 text-black" />
          </a>
        )}
      </div>
    </div>
  );
};
