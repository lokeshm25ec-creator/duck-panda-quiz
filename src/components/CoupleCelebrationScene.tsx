import React, { useState } from 'react';
import {
  DUO_IMAGE,
  HUG_IMAGE,
  DANCE_IMAGE,
  HIGHFIVE_IMAGE,
  BLUSH_IMAGE
} from '../assets/characters';
import { Heart, Sparkles, Smile, Flame, Camera } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

type ActionType = 'portrait' | 'hugging' | 'dancing' | 'high-five' | 'blushing';

export const CoupleCelebrationScene: React.FC = () => {
  const [activeAction, setActiveAction] = useState<ActionType>('portrait');

  const handleActionChange = (action: ActionType) => {
    setActiveAction(action);
    soundEffects.playPop();
  };

  // Get current active scene image and metadata
  const getSceneDetails = () => {
    switch (activeAction) {
      case 'hugging':
        return {
          image: HUG_IMAGE,
          title: 'Warm Bear Hug ❤️',
          alt: 'Real Warm Hug between Panda and Vaathu with squished cheeks',
          borderColor: 'border-pink-400/90 shadow-pink-500/40',
          badgeBg: 'bg-pink-900/80 text-pink-200 border-pink-400/40',
          animationClass: 'animate-pulse-soft',
          caption: 'Vaathu and Panda wrapped in a tight, cozy bear hug with squished cheeks! ❤️🫂'
        };
      case 'dancing':
        return {
          image: DANCE_IMAGE,
          title: 'Happy Victory Dance 💃🕺',
          alt: 'Real Happy Dance of Panda and Vaathu celebrating joyfully',
          borderColor: 'border-purple-400/90 shadow-purple-500/40',
          badgeBg: 'bg-purple-900/80 text-purple-200 border-purple-400/40',
          animationClass: 'animate-bounce-gentle',
          caption: 'Panda and Vaathu jumping joyfully and doing their secret victory dance! 💃🕺✨'
        };
      case 'high-five':
        return {
          image: HIGHFIVE_IMAGE,
          title: 'Team High-Five! 👏',
          alt: 'Real High-Five between Vaathu wing and Panda paw',
          borderColor: 'border-amber-400/90 shadow-amber-500/40',
          badgeBg: 'bg-amber-900/80 text-amber-200 border-amber-400/40',
          animationClass: 'hover:scale-105',
          caption: 'Yellow wing meets black fluffy paw: an epic celebratory couple high-five! 👏⚡'
        };
      case 'blushing':
        return {
          image: BLUSH_IMAGE,
          title: 'Secret Blush 🥰',
          alt: 'Real Secret Blush between Panda and Vaathu looking shyly at each other',
          borderColor: 'border-rose-400/90 shadow-rose-500/40',
          badgeBg: 'bg-rose-900/80 text-rose-200 border-rose-400/40',
          animationClass: 'animate-pulse-soft',
          caption: 'Rosy pink cheeks and sweet sideways glances... caught being deeply in love! 😳💖'
        };
      case 'portrait':
      default:
        return {
          image: DUO_IMAGE,
          title: 'Official Couple Portrait 📸',
          alt: 'Official Panda & Vaathu Couple Portrait',
          borderColor: 'border-amber-400/90 shadow-amber-500/40',
          badgeBg: 'bg-purple-900/80 text-amber-200 border-amber-400/40',
          animationClass: '',
          caption: 'The official heartwarming Panda & Vaathu couple memory! 📸✨'
        };
    }
  };

  const current = getSceneDetails();

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Interactive Action Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-5 z-20">
        <button
          onClick={() => handleActionChange('portrait')}
          className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shadow-md cursor-pointer ${
            activeAction === 'portrait'
              ? 'bg-amber-500 text-amber-950 scale-105 shadow-amber-500/40 ring-2 ring-amber-300 font-bold'
              : 'bg-purple-900/60 text-purple-200 hover:bg-purple-800/80 border border-purple-600/40'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          Couple Portrait
        </button>

        <button
          onClick={() => handleActionChange('hugging')}
          className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shadow-md cursor-pointer ${
            activeAction === 'hugging'
              ? 'bg-pink-500 text-white scale-105 shadow-pink-500/40 ring-2 ring-pink-300 font-bold'
              : 'bg-purple-900/60 text-purple-200 hover:bg-purple-800/80 border border-purple-600/40'
          }`}
        >
          <Heart className="w-3.5 h-3.5 fill-current" />
          Warm Hug
        </button>

        <button
          onClick={() => handleActionChange('dancing')}
          className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shadow-md cursor-pointer ${
            activeAction === 'dancing'
              ? 'bg-purple-500 text-white scale-105 shadow-purple-500/40 ring-2 ring-purple-300 font-bold'
              : 'bg-purple-900/60 text-purple-200 hover:bg-purple-800/80 border border-purple-600/40'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Happy Dance
        </button>

        <button
          onClick={() => handleActionChange('high-five')}
          className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shadow-md cursor-pointer ${
            activeAction === 'high-five'
              ? 'bg-amber-600 text-white scale-105 shadow-amber-500/40 ring-2 ring-amber-300 font-bold'
              : 'bg-purple-900/60 text-purple-200 hover:bg-purple-800/80 border border-purple-600/40'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          High-Five!
        </button>

        <button
          onClick={() => handleActionChange('blushing')}
          className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shadow-md cursor-pointer ${
            activeAction === 'blushing'
              ? 'bg-rose-500 text-white scale-105 shadow-rose-500/40 ring-2 ring-rose-300 font-bold'
              : 'bg-purple-900/60 text-purple-200 hover:bg-purple-800/80 border border-purple-600/40'
          }`}
        >
          <Smile className="w-3.5 h-3.5" />
          Secret Blush
        </button>
      </div>

      {/* Main Duo Stage */}
      <div className="relative w-full max-w-md h-56 sm:h-64 flex items-center justify-center">
        {/* Soft radial glow behind scene */}
        <div className="absolute inset-0 bg-radial from-pink-500/25 via-purple-500/15 to-transparent blur-2xl rounded-full pointer-events-none" />

        {/* Ambient Floating Hearts & Sparkles */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-3 pointer-events-none z-10 animate-bounce-gentle">
          <span className="text-2xl animate-pulse-soft">💖</span>
          <span className="text-3xl text-pink-400 drop-shadow-md">✨</span>
          <span className="text-2xl animate-pulse-soft delay-150">💕</span>
        </div>

        {/* Dedicated Scene Artwork Card */}
        <div
          key={activeAction}
          className={`relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-3 shadow-2xl transition-all duration-500 group animate-fadeIn ${current.borderColor} ${current.animationClass}`}
        >
          <img
            src={current.image}
            alt={current.alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />

          {/* Bottom subtle shadow gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950/70 via-transparent to-transparent pointer-events-none" />

          {/* Active Action Badge */}
          <div
            className={`absolute bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full border text-[11px] font-bold shadow-lg whitespace-nowrap ${current.badgeBg}`}
          >
            {current.title}
          </div>
        </div>
      </div>

      {/* Dynamic Action Caption */}
      <p className="text-xs sm:text-sm font-medium text-purple-200/90 text-center italic mt-2 bg-purple-900/40 px-4 py-1.5 rounded-full border border-purple-500/20">
        {current.caption}
      </p>
    </div>
  );
};
