import React from 'react';
import { CharacterExpression } from '../types';
import { PANDA_IMAGE } from '../assets/characters';

interface PandaCharacterProps {
  expression?: CharacterExpression;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isAnswering?: boolean;
  className?: string;
  onClick?: () => void;
}

export const PandaCharacter: React.FC<PandaCharacterProps> = ({
  expression = 'happy',
  size = 'md',
  isAnswering = false,
  className = '',
  onClick
}) => {
  const sizeMap = {
    sm: 'w-16 h-16 sm:w-20 sm:h-20',
    md: 'w-28 h-28 sm:w-32 sm:h-32',
    lg: 'w-36 h-36 sm:w-44 sm:h-44',
    xl: 'w-48 h-48 sm:w-56 sm:h-56'
  };

  const getExpressionClass = () => {
    switch (expression) {
      case 'excited':
        return 'animate-bounce';
      case 'shocked':
        return 'animate-pulse scale-105';
      case 'angry-but-cute':
        return 'rotate-[3deg] scale-102';
      case 'shy':
      case 'blushing':
        return 'rotate-[-2deg]';
      case 'laughing':
        return 'animate-bounce-gentle';
      default:
        return '';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none transition-all duration-300 ${sizeMap[size]} ${className} ${
        isAnswering ? 'animate-bounce-gentle scale-105' : 'hover:scale-105 active:scale-95'
      }`}
      title="Panda 🐼 (The official cute panda holding bamboo!)"
    >
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500/30 via-purple-400/20 to-indigo-500/30 blur-sm scale-105 pointer-events-none" />

      {/* Main Official Artwork Container */}
      <div
        className={`relative w-full h-full rounded-full overflow-hidden border-2 sm:border-3 border-purple-300/80 shadow-xl shadow-purple-500/20 bg-[#1e1035] ${getExpressionClass()}`}
      >
        <img
          src={PANDA_IMAGE}
          alt="Official Panda holding bamboo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-110 transition-transform duration-500"
        />

        {/* Dynamic Expression Overlays */}
        {(expression === 'blushing' || expression === 'shy') && (
          <div className="absolute inset-0 bg-pink-500/20 mix-blend-color-dodge pointer-events-none transition-opacity" />
        )}

        {expression === 'angry-but-cute' && (
          <div className="absolute inset-0 bg-rose-500/15 mix-blend-overlay pointer-events-none" />
        )}
      </div>

      {/* Expression Badges / Floating Micro-Interactions */}
      {expression === 'blushing' && (
        <span className="absolute -top-1.5 -left-1 text-base sm:text-lg animate-pulse pointer-events-none">
          🥰
        </span>
      )}

      {expression === 'shy' && (
        <span className="absolute -top-1.5 -left-1 text-sm sm:text-base animate-bounce-gentle pointer-events-none">
          🙈
        </span>
      )}

      {expression === 'shocked' && (
        <span className="absolute -top-2 -left-1 text-base sm:text-lg animate-bounce pointer-events-none">
          😱
        </span>
      )}

      {expression === 'confused' && (
        <span className="absolute -top-2 -left-1 text-base sm:text-lg animate-pulse pointer-events-none">
          💭
        </span>
      )}

      {expression === 'angry-but-cute' && (
        <span className="absolute -top-2 -left-1 text-base sm:text-lg pointer-events-none animate-pulse">
          😤
        </span>
      )}

      {expression === 'laughing' && (
        <span className="absolute -top-1.5 -left-1 text-base sm:text-lg animate-bounce pointer-events-none">
          🤣
        </span>
      )}

      {expression === 'excited' && (
        <span className="absolute -top-2 -left-1 text-base sm:text-lg animate-spin pointer-events-none">
          🎋
        </span>
      )}

      {expression === 'embarrassed' && (
        <span className="absolute -top-1.5 -left-1 text-base sm:text-lg pointer-events-none animate-pulse">
          😳
        </span>
      )}

      {/* Bamboo badge when Panda is actively answering */}
      {isAnswering && (
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow-md ring-2 ring-purple-950">
          🎋
        </div>
      )}
    </div>
  );
};
