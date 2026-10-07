import React, { useState } from 'react';
import { DuckCharacter } from './DuckCharacter';
import { PandaCharacter } from './PandaCharacter';
import { DUO_IMAGE } from '../assets/characters';
import { Heart, Sparkles, Smile, Flame, Camera } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

type ActionType = 'hugging' | 'dancing' | 'high-five' | 'blushing' | 'portrait';

export const CoupleCelebrationScene: React.FC = () => {
  const [activeAction, setActiveAction] = useState<ActionType>('portrait');

  const handleActionChange = (action: ActionType) => {
    setActiveAction(action);
    soundEffects.playPop();
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Interactive Action Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 z-20">
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
        {/* Soft radial glow behind characters */}
        <div className="absolute inset-0 bg-radial from-purple-500/30 via-pink-500/10 to-transparent blur-2xl rounded-full pointer-events-none" />

        {/* Ambient Floating Hearts */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-3 pointer-events-none z-10 animate-bounce-gentle">
          <span className="text-2xl animate-pulse-soft">💖</span>
          <span className="text-3xl text-pink-400 drop-shadow-md">✨</span>
          <span className="text-2xl animate-pulse-soft delay-150">💕</span>
        </div>

        {/* Action Display: Portrait Mode OR Split Animated Character Mode */}
        {activeAction === 'portrait' ? (
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-3 border-pink-400/80 shadow-2xl shadow-pink-500/30 group animate-fadeIn">
            <img
              src={DUO_IMAGE}
              alt="Official Duck & Panda Couple Portrait"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-purple-900/80 border border-purple-400/40 text-[11px] font-bold text-pink-200 shadow whitespace-nowrap">
              Panda &amp; Vaathu Official ❤️
            </div>
          </div>
        ) : (
          <div className="relative flex items-center justify-center">
            {/* VAATHU */}
            <div
              className={`transition-all duration-500 z-10 ${
                activeAction === 'hugging'
                  ? 'translate-x-3 rotate-6 scale-105'
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
            <div className="z-20 -mx-4 sm:-mx-6 flex flex-col items-center justify-center">
              {activeAction === 'hugging' && (
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-pink-500/90 text-white flex items-center justify-center shadow-lg shadow-pink-500/50 animate-pulse border-2 border-white">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-current animate-ping" />
                </div>
              )}
              {activeAction === 'dancing' && (
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-purple-500/90 text-white flex items-center justify-center shadow-lg shadow-purple-500/50 animate-spin border-2 border-white">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              )}
              {activeAction === 'high-five' && (
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-amber-500/90 text-white flex items-center justify-center shadow-lg shadow-amber-500/50 animate-bounce border-2 border-white">
                  <span className="text-lg sm:text-xl">👏</span>
                </div>
              )}
              {activeAction === 'blushing' && (
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-rose-500/90 text-white flex items-center justify-center shadow-lg shadow-rose-500/50 animate-pulse border-2 border-white">
                  <span className="text-lg sm:text-xl">🥰</span>
                </div>
              )}
            </div>

            {/* PANDA */}
            <div
              className={`transition-all duration-500 z-10 ${
                activeAction === 'hugging'
                  ? '-translate-x-3 -rotate-6 scale-105'
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
        )}
      </div>

      {/* Cute Caption for the active action */}
      <p className="text-xs sm:text-sm font-medium text-purple-200/90 text-center italic mt-1 bg-purple-900/40 px-4 py-1 rounded-full border border-purple-500/20">
        {activeAction === 'portrait' && "The official heartwarming Panda & Vaathu couple memory! 📸✨"}
        {activeAction === 'hugging' && "Vaathu is squishing Panda into a mega bear hug! ❤️"}
        {activeAction === 'dancing' && "Panda and Vaathu doing their secret victory celebration waddle! 💃🕺"}
        {activeAction === 'high-five' && "Epic team high-five for passing the couple interrogation! ✋✨"}
        {activeAction === 'blushing' && "Caught on camera being mutually obsessed with each other! 😳💖"}
      </p>
    </div>
  );
};
