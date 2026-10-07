import React from 'react';
import { CharacterExpression } from '../types';

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
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-44 h-44',
    xl: 'w-56 h-56'
  };

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none transition-transform duration-300 ${sizeMap[size]} ${className} ${
        isAnswering ? 'animate-bounce-gentle' : 'hover:scale-105 active:scale-95'
      }`}
      title="Panda (Answering the questions!)"
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-xl overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pandaBodyWhite" x1="100" y1="50" x2="100" y2="190" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.85" stopColor="#F1F5F9" />
            <stop offset="1" stopColor="#E2E8F0" />
          </linearGradient>
          <linearGradient id="pandaBlack" x1="50" y1="20" x2="150" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#27272A" />
            <stop offset="1" stopColor="#18181B" />
          </linearGradient>
          <linearGradient id="bambooGrad" x1="0" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#86EFAC" />
            <stop offset="1" stopColor="#22C55E" />
          </linearGradient>
        </defs>

        {/* PANDA EARS (Distinctive Black Round Panda Ears) */}
        <g className="transition-transform duration-300">
          {/* Left Panda Ear */}
          <ellipse
            cx="48"
            cy="46"
            rx="24"
            ry="24"
            fill="url(#pandaBlack)"
            stroke="#09090B"
            strokeWidth="2.5"
            className={expression === 'shocked' ? '-translate-y-2' : ''}
          />
          {/* Inner left ear shading */}
          <ellipse cx="48" cy="46" rx="14" ry="14" fill="#3F3F46" opacity="0.6" />

          {/* Right Panda Ear */}
          <ellipse
            cx="152"
            cy="46"
            rx="24"
            ry="24"
            fill="url(#pandaBlack)"
            stroke="#09090B"
            strokeWidth="2.5"
            className={expression === 'shocked' ? '-translate-y-2' : ''}
          />
          {/* Inner right ear shading */}
          <ellipse cx="152" cy="46" rx="14" ry="14" fill="#3F3F46" opacity="0.6" />
        </g>

        {/* PANDA BODY (Round Chubby White Body with Black Shoulders) */}
        {/* Black shoulder band behind white head */}
        <path
          d="M 38 135 C 38 120 70 115 100 115 C 130 115 162 120 162 135 C 168 165 160 185 100 185 C 40 185 32 165 38 135 Z"
          fill="url(#pandaBlack)"
          stroke="#09090B"
          strokeWidth="2.5"
        />

        {/* PANDA WHITE HEAD (Signature Round Panda Face) */}
        <ellipse
          cx="100"
          cy="104"
          rx="66"
          ry="58"
          fill="url(#pandaBodyWhite)"
          stroke="#CBD5E1"
          strokeWidth="2.5"
        />

        {/* White Belly Patch */}
        <ellipse cx="100" cy="162" rx="36" ry="22" fill="#FFFFFF" opacity="0.95" />

        {/* Black Panda Paws / Feet */}
        <ellipse cx="68" cy="184" rx="17" ry="10" fill="url(#pandaBlack)" stroke="#09090B" strokeWidth="2" />
        <ellipse cx="132" cy="184" rx="17" ry="10" fill="url(#pandaBlack)" stroke="#09090B" strokeWidth="2" />
        {/* Foot pads */}
        <circle cx="68" cy="184" r="5" fill="#52525B" />
        <circle cx="132" cy="184" r="5" fill="#52525B" />

        {/* SIGNATURE PANDA EYE PATCHES (Distinctive Tilted Black Patches) */}
        {/* Left Eye Patch */}
        <g transform="rotate(-18 68 96)">
          <ellipse cx="68" cy="96" rx="18" ry="24" fill="url(#pandaBlack)" />
        </g>
        {/* Right Eye Patch */}
        <g transform="rotate(18 132 96)">
          <ellipse cx="132" cy="96" rx="18" ry="24" fill="url(#pandaBlack)" />
        </g>

        {/* ROSY BLUSH CHEEKS */}
        {(expression === 'blushing' || expression === 'shy' || expression === 'happy' || expression === 'laughing' || expression === 'embarrassed' || expression === 'excited') && (
          <>
            <ellipse cx="48" cy="120" rx={expression === 'blushing' ? '14' : '10'} ry={expression === 'blushing' ? '10' : '7'} fill="#FB7185" opacity={expression === 'blushing' ? '0.85' : '0.6'} />
            <ellipse cx="152" cy="120" rx={expression === 'blushing' ? '14' : '10'} ry={expression === 'blushing' ? '10' : '7'} fill="#FB7185" opacity={expression === 'blushing' ? '0.85' : '0.6'} />
          </>
        )}

        {/* PANDA EYES INSIDE BLACK PATCHES */}
        {expression === 'happy' && (
          <>
            {/* Happy curved eyes (^ ^) */}
            <path d="M 60 96 Q 68 86 76 96" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 124 96 Q 132 86 140 96" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />
          </>
        )}

        {expression === 'laughing' && (
          <>
            {/* Laughing eyes (> <) */}
            <path d="M 59 95 Q 68 88 77 95" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path d="M 123 95 Q 132 88 141 95" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            {/* Sparkle tears */}
            <circle cx="50" cy="100" r="3.5" fill="#38BDF8" />
            <circle cx="150" cy="100" r="3.5" fill="#38BDF8" />
          </>
        )}

        {expression === 'blushing' && (
          <>
            {/* Giant cute anime eyes inside patches */}
            <circle cx="68" cy="96" r="11" fill="#FFFFFF" />
            <circle cx="132" cy="96" r="11" fill="#FFFFFF" />
            <circle cx="68" cy="96" r="7.5" fill="#18181B" />
            <circle cx="132" cy="96" r="7.5" fill="#18181B" />
            <circle cx="66" cy="93" r="3" fill="#FFFFFF" />
            <circle cx="130" cy="93" r="3" fill="#FFFFFF" />
            <circle cx="71" cy="99" r="1.5" fill="#FFFFFF" />
            <circle cx="135" cy="99" r="1.5" fill="#FFFFFF" />
          </>
        )}

        {expression === 'shocked' && (
          <>
            {/* Shocked white rings inside black patch */}
            <circle cx="68" cy="96" r="12" fill="#FFFFFF" stroke="#09090B" strokeWidth="2" />
            <circle cx="132" cy="96" r="12" fill="#FFFFFF" stroke="#09090B" strokeWidth="2" />
            <circle cx="68" cy="96" r="4" fill="#09090B" />
            <circle cx="132" cy="96" r="4" fill="#09090B" />
            {/* Sweat bead */}
            <path d="M 38 68 C 34 74 44 80 44 74 Z" fill="#38BDF8" />
          </>
        )}

        {expression === 'confused' && (
          <>
            {/* One eye round, one eye winky/curved */}
            <circle cx="68" cy="96" r="9" fill="#FFFFFF" />
            <circle cx="68" cy="96" r="5" fill="#18181B" />
            <circle cx="66" cy="94" r="2" fill="#FFFFFF" />
            <path d="M 124 97 Q 132 90 140 97" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <text x="146" y="70" fill="#E879F9" fontSize="20" fontWeight="bold">💭</text>
          </>
        )}

        {expression === 'angry-but-cute' && (
          <>
            {/* Angled cute brows */}
            <path d="M 60 92 L 76 98" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
            <path d="M 140 92 L 124 98" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
            <circle cx="69" cy="99" r="5" fill="#FFFFFF" />
            <circle cx="131" cy="99" r="5" fill="#FFFFFF" />
          </>
        )}

        {expression === 'embarrassed' && (
          <>
            {/* Squiggly shy eyes */}
            <path d="M 60 97 Q 68 103 76 97" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 124 97 Q 132 103 140 97" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </>
        )}

        {expression === 'excited' && (
          <>
            {/* Star sparkling eyes */}
            <circle cx="68" cy="96" r="10" fill="#FFFFFF" />
            <circle cx="132" cy="96" r="10" fill="#FFFFFF" />
            <text x="60" y="103" fontSize="14" fill="#F59E0B">✨</text>
            <text x="124" y="103" fontSize="14" fill="#F59E0B">✨</text>
          </>
        )}

        {expression === 'shy' && (
          <>
            {/* Shy doe eyes looking sideways */}
            <circle cx="68" cy="96" r="9" fill="#FFFFFF" />
            <circle cx="132" cy="96" r="9" fill="#FFFFFF" />
            <circle cx="71" cy="96" r="5" fill="#18181B" />
            <circle cx="135" cy="96" r="5" fill="#18181B" />
            <circle cx="69" cy="94" r="2" fill="#FFFFFF" />
            <circle cx="133" cy="94" r="2" fill="#FFFFFF" />
          </>
        )}

        {/* PANDA NOSE & MOUTH */}
        {/* Cute black triangle/oval nose */}
        <path d="M 94 112 C 94 109 106 109 106 112 C 106 116 100 119 100 119 C 100 119 94 116 94 112 Z" fill="#18181B" />

        {/* MOUTH according to expression */}
        {expression === 'shocked' ? (
          <ellipse cx="100" cy="128" rx="8" ry="10" fill="#18181B" />
        ) : expression === 'laughing' || expression === 'excited' ? (
          <g>
            <path d="M 90 120 Q 100 138 110 120 Z" fill="#EF4444" stroke="#18181B" strokeWidth="2" />
            <path d="M 94 126 Q 100 123 106 126" stroke="#FECDD3" strokeWidth="2" fill="none" />
          </g>
        ) : expression === 'angry-but-cute' ? (
          <path d="M 92 126 Q 100 120 108 126" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        ) : (
          // Sweet panda double-curve smile
          <g>
            <path d="M 100 119 L 100 123" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
            <path d="M 91 124 Q 96 128 100 123 Q 104 128 109 124" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        )}

        {/* PANDA PAWS & ARMS */}
        {expression === 'excited' ? (
          <g>
            {/* Paws raised in celebration */}
            <ellipse cx="38" cy="115" rx="14" ry="20" fill="url(#pandaBlack)" stroke="#09090B" strokeWidth="2" transform="rotate(-30 38 115)" />
            <ellipse cx="162" cy="115" rx="14" ry="20" fill="url(#pandaBlack)" stroke="#09090B" strokeWidth="2" transform="rotate(30 162 115)" />
          </g>
        ) : expression === 'embarrassed' ? (
          <g>
            {/* Paws shyly touching cheeks */}
            <circle cx="56" cy="122" r="14" fill="url(#pandaBlack)" stroke="#09090B" strokeWidth="2" />
            <circle cx="144" cy="122" r="14" fill="url(#pandaBlack)" stroke="#09090B" strokeWidth="2" />
          </g>
        ) : expression === 'shy' || expression === 'blushing' ? (
          <g>
            {/* Holding a little cute heart */}
            <ellipse cx="80" cy="148" rx="12" ry="15" fill="url(#pandaBlack)" stroke="#09090B" strokeWidth="1.5" />
            <ellipse cx="120" cy="148" rx="12" ry="15" fill="url(#pandaBlack)" stroke="#09090B" strokeWidth="1.5" />
            <path
              d="M 100 148 C 96 142 88 144 88 150 C 88 156 100 164 100 164 C 100 164 112 156 112 150 C 112 144 104 142 100 148 Z"
              fill="#F43F5E"
            />
          </g>
        ) : (
          <g>
            {/* Relaxed cute panda paws */}
            <ellipse cx="50" cy="146" rx="15" ry="18" fill="url(#pandaBlack)" stroke="#09090B" strokeWidth="2" transform="rotate(15 50 146)" />
            <ellipse cx="150" cy="146" rx="15" ry="18" fill="url(#pandaBlack)" stroke="#09090B" strokeWidth="2" transform="rotate(-15 150 146)" />
          </g>
        )}

        {/* Little bamboo sprout accessory */}
        {isAnswering && (
          <g className="animate-pulse-soft">
            <path d="M 148 40 Q 155 30 165 32 Q 158 44 148 40 Z" fill="url(#bambooGrad)" />
            <path d="M 148 40 Q 146 25 152 20 Q 153 32 148 40 Z" fill="url(#bambooGrad)" />
          </g>
        )}
      </svg>
    </div>
  );
};
