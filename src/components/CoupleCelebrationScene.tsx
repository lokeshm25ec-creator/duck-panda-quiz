import React, { useState } from 'react';
import { DuckCharacter } from './DuckCharacter';
import { PandaCharacter } from './PandaCharacter';
import { Heart, Sparkles, Smile, Flame } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

type ActionType = 'hugging' | 'dancing' | 'high-five' | 'blushing';

export const CoupleCelebrationScene: React.FC = () => {
  const [activeAction, setActiveAction] = useState<ActionType>('hugging');

  const handleActionChange = (action: ActionType) => {
    setActiveAction(action);
    soundEffects.playPop();
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Interactive Action Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 z-20">
        <button
          onClick={() => handleActionChange('hugging')}
          className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shadow-md ${
            activeAction === 'hugging'
              ? 'bg-pink-500 text-white scale-105 shadow-pink-500/40 ring-2 ring-pink-300'
              : 'bg-purple-900/60 text-purple-200 hover:bg-purple-800/80 border border-purple-600/40'
          }`}
        >
          <Heart className="w-3.5 h-3.5 fill-current" />
          Warm Hug
        </button>

        <button
          onClick={() => handleActionChange('dancing')}
          className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shadow-md ${
            activeAction === 'dancing'
              ? 'bg-purple-500 text-white scale-105 shadow-purple-500/40 ring-2 ring-purple-300'
              : 'bg-purple-900/60 text-purple-200 hover:bg-purple-800/80 border border-purple-600/40'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Happy Dance
        </button>

        <button
          onClick={() => handleActionChange('high-five')}
          className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shadow-md ${
            activeAction === 'high-five'
              ? 'bg-amber-500 text-white scale-105 shadow-amber-500/40 ring-2 ring-amber-300'
              : 'bg-purple-900/60 text-purple-200 hover:bg-purple-800/80 border border-purple-600/40'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          High-Five!
        </button>

        <button
          onClick={() => handleActionChange('blushing')}
          className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shadow-md ${
            activeAction === 'blushing'
              ? 'bg-rose-500 text-white scale-105 shadow-rose-500/40 ring-2 ring-rose-300'
              : 'bg-purple-900/60 text-purple-200 hover:bg-purple-800/80 border border-purple-600/40'
          }`}
        >
          <Smile className="w-3.5 h-3.5" />
          Secret Blush
        </button>
      </div>

      {/* Main Duo Stage */}
      <div className="relative w-full max-w-md h-56 sm:h-64 flex items-center justify-center">
        {/* Soft radial glow behind characters */}
        <div className="absolute inset-0 bg-radial from-purple-500/30 via-pink-500/10 to-transparent blur-2xl rounded-full pointer-events-none" />

        {/* Ambient Floating Hearts */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-3 pointer-events-none z-10 animate-bounce-gentle">
          <span className="text-2xl animate-pulse-soft">💖</span>
          <span className="text-3xl text-pink-400 drop-shadow-md">✨</span>
          <span className="text-2xl animate-pulse-soft delay-150">💕</span>
        </div>

        {/* Duck and Panda positioned according to action */}
        <div className="relative flex items-center justify-center">
          {/* DUCK */}
          <div
            className={`transition-all duration-500 z-10 ${
              activeAction === 'hugging'
                ? 'translate-x-4 rotate-6 scale-105'
                : activeAction === 'dancing'
                ? '-translate-y-3 -rotate-12 animate-bounce'
                : activeAction === 'high-five'
                ? 'translate-x-1 -rotate-6'
                : 'translate-x-0 rotate-0'
            }`}
          >
            <DuckCharacter
              size="lg"
              expression={
                activeAction === 'hugging'
                  ? 'blushing'
                  : activeAction === 'dancing'
                  ? 'excited'
                  : activeAction === 'high-five'
                  ? 'happy'
                  : 'shy'
              }
            />
          </div>

          {/* Central Action Icon Burst */}
          <div className="z-20 -mx-6 flex flex-col items-center justify-center">
            {activeAction === 'hugging' && (
              <div className="w-12 h-12 rounded-full bg-pink-500/90 text-white flex items-center justify-center shadow-lg shadow-pink-500/50 animate-pulse border-2 border-white">
                <Heart className="w-6 h-6 fill-current animate-ping" />
              </div>
            )}
            {activeAction === 'dancing' && (
              <div className="w-12 h-12 rounded-full bg-purple-500/90 text-white flex items-center justify-center shadow-lg shadow-purple-500/50 animate-spin border-2 border-white">
                <Sparkles className="w-6 h-6" />
              </div>
            )}
            {activeAction === 'high-five' && (
              <div className="w-12 h-12 rounded-full bg-amber-500/90 text-white flex items-center justify-center shadow-lg shadow-amber-500/50 animate-bounce border-2 border-white">
                <span className="text-xl">👏</span>
              </div>
            )}
            {activeAction === 'blushing' && (
              <div className="w-12 h-12 rounded-full bg-rose-500/90 text-white flex items-center justify-center shadow-lg shadow-rose-500/50 animate-pulse border-2 border-white">
                <span className="text-xl">🥰</span>
              </div>
            )}
          </div>

          {/* PANDA */}
          <div
            className={`transition-all duration-500 z-10 ${
              activeAction === 'hugging'
                ? '-translate-x-4 -rotate-6 scale-105'
                : activeAction === 'dancing'
                ? 'translate-y-2 rotate-12 animate-bounce delay-100'
                : activeAction === 'high-five'
                ? '-translate-x-1 rotate-6'
                : 'translate-x-0 rotate-0'
            }`}
          >
            <PandaCharacter
              size="lg"
              expression={
                activeAction === 'hugging'
                  ? 'blushing'
                  : activeAction === 'dancing'
                  ? 'laughing'
                  : activeAction === 'high-five'
                  ? 'excited'
                  : 'blushing'
              }
            />
          </div>
        </div>
      </div>

      {/* Cute Caption for the active action */}
      <p className="text-xs sm:text-sm font-medium text-purple-200/90 text-center italic mt-1 bg-purple-900/40 px-4 py-1 rounded-full border border-purple-500/20">
        {activeAction === 'hugging' && "Duck is squishing Panda into a mega bear hug! ❤️"}
        {activeAction === 'dancing' && "Duck and Panda doing their secret victory celebration waddle! 💃🕺"}
        {activeAction === 'high-five' && "Epic team high-five for passing the couple interrogation! ✋✨"}
        {activeAction === 'blushing' && "Caught on camera being mutually obsessed with each other! 😳💖"}
      </p>
    </div>
  );
};
