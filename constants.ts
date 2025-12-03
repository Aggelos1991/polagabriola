import { PhotoData } from './types';

// The specific image provided by the user for the Hero section. 
export const OWNER_IMAGE = "https://res.cloudinary.com/dhktmpywq/image/upload/v1764754143/Screenshot_3-12-2025_11144_www.instagram.com_urgipv.jpg"; 

// The specific image provided by the user for the Story/Behind the Lens section.
export const STORY_IMAGE = "https://res.cloudinary.com/dhktmpywq/image/upload/v1764755175/Screenshot_3-12-2025_11144_www.instagram.com-removebg-preview_zyxase.png";

// Using the main profile as a placeholder for specific posts. 
// You can replace 'https://www.instagram.com/polagabriola/' with specific post URLs like 'https://www.instagram.com/p/Cz12345/'
const INSTA_BASE = "https://www.instagram.com/polagabriola/";

export const SOCIAL_LINKS = [
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/polagabriola/', subtitle: 'The Visual Diary' },
  { id: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/@polagabriola?_r=1&_t=ZT-91v5SviCgRR', subtitle: 'Behind the Scenes' },
];

export const PHOTOS: PhotoData[] = [
  { id: 1, url: 'https://images.unsplash.com/photo-1520052205864-92d242b3a76b?w=600&h=600&fit=crop', topic: 'Golden hour river', caption: 'Golden Hour', width: 3, height: 3.5, rotation: -0.1, position: [-2, 1, 0], instagramUrl: INSTA_BASE },
  { id: 2, url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=600&fit=crop', topic: 'Swiss mountains fog', caption: 'The Alps', width: 3, height: 3.5, rotation: 0.2, position: [2, 0, -1], instagramUrl: INSTA_BASE },
  { id: 3, url: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=600&h=600&fit=crop', topic: 'Rainy window mood', caption: 'Rainy Days', width: 3, height: 3.5, rotation: -0.3, position: [-1.5, -2, 1], instagramUrl: INSTA_BASE },
  { id: 4, url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&h=600&fit=crop', topic: 'Loyal companion', caption: 'My Best Friend', width: 3, height: 3.5, rotation: 0.15, position: [3, 2, -2] },
  { id: 5, url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=600&fit=crop', topic: 'Starry alpine night', caption: 'Starry Night', width: 3, height: 3.5, rotation: 0.4, position: [0, 0, 2], instagramUrl: INSTA_BASE },
  { id: 6, url: 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=600&h=600&fit=crop', topic: 'Fireworks celebration', caption: 'July 4th', width: 3, height: 3.5, rotation: -0.2, position: [-3, 3, -1] },
  { id: 7, url: 'https://images.unsplash.com/photo-1555169062-013468b47731?w=600&h=600&fit=crop', topic: 'Parrot feathers', caption: 'Colors of Rio', width: 3, height: 3.5, rotation: 0.05, position: [1.5, -2.5, 0], instagramUrl: INSTA_BASE },
  { id: 8, url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=600&fit=crop', topic: 'Seashells on beach', caption: 'Ocean treasures', width: 3, height: 3.5, rotation: -0.15, position: [4, -1, 1], instagramUrl: INSTA_BASE },
];

export const APP_NAME = "polagabriola";