export interface PhotoData {
  id: number;
  url: string;
  topic: string; // Used for AI prompting and Overlay Title
  caption?: string; // Text displayed on the Polaroid card (Handwritten)
  width: number;
  height: number;
  rotation: number;
  position: [number, number, number];
  instagramUrl?: string; // Link to specific Instagram post
}

export interface StoryState {
  loading: boolean;
  content: string | null;
  error: string | null;
}