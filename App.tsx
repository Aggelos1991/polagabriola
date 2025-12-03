import React, { useState } from "react";
import { Hero } from "./components/Hero";
import { Story } from "./components/Story";
import { Experience } from "./components/Experience";
import { Overlay } from "./components/Overlay";
import { LoginModal } from "./components/LoginModal";
import { BackgroundVisuals } from "./components/BackgroundVisuals";
import { PhotoData } from "./types";
import { PHOTOS } from "./constants";
import { Lock, Unlock } from "lucide-react";
import { generatePhotoStory } from "./services/storyService";

function App() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoData | null>(null);
  const [photos, setPhotos] = useState<PhotoData[]>(PHOTOS);

  // Story Section State
  const [activeStoryPhoto, setActiveStoryPhoto] = useState<PhotoData | null>(
    null
  );

  // Cache for AI Stories (in-memory)
  const [storyCache, setStoryCache] = useState<Record<number, string>>({});

  // Admin Mode
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleAddPhoto = (newPhoto: PhotoData) => {
    setPhotos((prev) => [newPhoto, ...prev]);
  };

  const handleUpdatePhoto = (updatedPhoto: PhotoData) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === updatedPhoto.id ? updatedPhoto : p))
    );
  };

  const handleDeletePhoto = (photoId: number) => {
    setPhotos((prev) => prev.filter((p) => p.id !== photoId));

    if (selectedPhoto?.id === photoId) setSelectedPhoto(null);
    if (activeStoryPhoto?.id === photoId) setActiveStoryPhoto(null);
  };

  const handleClearAll = () => {
    setPhotos([]);
    setSelectedPhoto(null);
    setActiveStoryPhoto(null);
  };

  const handleAdminLogin = (success: boolean) => {
    if (success) setIsAdmin(true);
  };

  const handleViewStory = (photo: PhotoData) => {
    setActiveStoryPhoto(photo);

    const storyElement = document.getElementById("story");
    if (storyElement) {
      storyElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // ---------------------------------------------------------
  // 🔥 FINAL STORY GENERATION LOGIC — ONE API CALL PER CARD
  // ---------------------------------------------------------
  const handleGenerateStory = async (photo: PhotoData): Promise<string> => {
    const key = `story_${photo.id}`;

    // 1️⃣ Load from LOCAL STORAGE (survives refresh)
    const stored = localStorage.getItem(key);
    if (stored) {
      console.log("Loaded story from localStorage:", key);
      return stored;
    }

    // 2️⃣ Load from React in-memory cache
    if (storyCache[photo.id]) {
      console.log("Loaded story from React cache:", key);
      return storyCache[photo.id];
    }

    // 3️⃣ First EVER API call for this card
    try {
      const story = await generatePhotoStory(photo.topic);

      // Save everywhere
      localStorage.setItem(key, story);
      setStoryCache((prev) => ({ ...prev, [photo.id]: story }));

      return story;
    } catch (error) {
      console.error("Story generation failed", error);
      return "the memory is too hazy right now.";
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] font-sans selection:bg-pink-500 selection:text-white overflow-x-hidden text-neutral-200">
      {/* Background Visual Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <BackgroundVisuals />

        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-purple-900/5 rounded-full blur-[100px] animate-[pulse_12s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-rose-900/5 rounded-full blur-[100px] animate-[pulse_15s_ease-in-out_infinite_reverse]" />

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none mix-blend-overlay" />
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Story
          activePhoto={activeStoryPhoto}
          onReset={() => setActiveStoryPhoto(null)}
          storyCache={storyCache}
          onGenerateStory={handleGenerateStory}
        />
        <Experience
          onPhotoSelect={setSelectedPhoto}
          photos={photos}
          onAddPhoto={handleAddPhoto}
          onUpdatePhoto={handleUpdatePhoto}
          onDeletePhoto={handleDeletePhoto}
          onClearAll={handleClearAll}
          onViewStory={handleViewStory}
          isAdmin={isAdmin}
        />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12 text-center text-neutral-500 font-serif italic bg-black/50">
        <div className="flex flex-col items-center gap-4">
          <p>Created for Polagabriola © {new Date().getFullYear()}</p>

          <button
            onClick={() => (isAdmin ? setIsAdmin(false) : setShowLogin(true))}
            className="p-2 rounded-full hover:bg-white/5 text-neutral-700 hover:text-neutral-400 transition-colors"
          >
            {isAdmin ? (
              <Unlock className="w-3 h-3" />
            ) : (
              <Lock className="w-3 h-3" />
            )}
          </button>
        </div>
      </footer>

      {/* Story Modal */}
      <Overlay
        selectedPhoto={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        storyCache={storyCache}
        onGenerateStory={handleGenerateStory}
      />

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleAdminLogin}
      />
    </div>
  );
}

export default App;
