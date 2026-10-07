import React from 'react';
import { CharacterExpression } from '../types';

interface DuckCharacterProps {
  expression?: CharacterExpression;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isSpeaking?: boolean;
  className?: string;
  onClick?: () => void;
}

export const DuckCharacter: React.FC<DuckCharacterProps> = ({
  expression = 'happy',
  size = 'md',
  isSpeaking = false,
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
        isSpeaking ? 'animate-bounce-gentle' : 'hover:scale-105 active:scale-95'
      }`}
      title="Duck (Asking the questions!)"
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-xl overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="duckBodyGrad" x1="50" y1="30" x2="150" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE047" />
            <stop offset="0.6" stopColor="#FACC15" />
            <stop offset="1" stopColor="#EAB308" />
          </linearGradient>
          <linearGradient id="duckBeakGrad" x1="70" y1="100" x2="130" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FB923C" />
            <stop offset="1" stopColor="#EA580C" />
          </linearGradient>
          <linearGradient id="duckBellyGrad" x1="100" y1="110" x2="100" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEF08A" />
            <stop offset="1" stopColor="#FDE047" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Head Feathers / Cute Hair Sprout */}
        <path
          d="M 100 35 C 92 18 84 22 88 10 C 95 18 103 26 102 35 Z"
          fill="#FACC15"
          className="transition-transform duration-300 origin-bottom"
        />
        <path
          d="M 104 35 C 112 18 122 22 118 12 C 110 20 102 27 104 35 Z"
          fill="#EAB308"
        />
        <circle cx="102" cy="11" r="4.5" fill="#F43F5E" />

        {/* Duck Body */}
        <ellipse cx="100" cy="120" rx="68" ry="62" fill="url(#duckBodyGrad)" stroke="#CA8A04" strokeWidth="3" />

        {/* Lighter belly patch */}
        <ellipse cx="100" cy="132" rx="46" ry="40" fill="url(#duckBellyGrad)" opacity="0.8" />

        {/* Left Wing */}
        <g className={`transition-transform duration-300 origin-[40px_110px] ${
          expression === 'excited' ? '-rotate-45 -translate-y-4' :
          expression === 'angry-but-cute' ? '-rotate-12 translate-x-2' : ''
        }`}>
          <path
            d="M 34 110 C 20 120 18 145 35 152 C 48 156 55 135 52 118 C 48 108 38 106 34 110 Z"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="2.5"
          />
        </g>

        {/* Right Wing */}
        <g className={`transition-transform duration-300 origin-[160px_110px] ${
          expression === 'excited' ? 'rotate-45 -translate-y-4' :
          expression === 'shy' ? '-rotate-35 -translate-x-5' : ''
        }`}>
          <path
            d="M 166 110 C 180 120 182 145 165 152 C 152 156 145 135 148 118 C 152 108 162 106 166 110 Z"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="2.5"
          />
        </g>

        {/* Little Webbed Feet */}
        <ellipse cx="78" cy="180" rx="15" ry="7" fill="#F97316" stroke="#EA580C" strokeWidth="2" />
        <ellipse cx="122" cy="180" rx="15" ry="7" fill="#F97316" stroke="#EA580C" strokeWidth="2" />

        {/* Blushing Cheeks */}
        {(expression === 'blushing' || expression === 'shy' || expression === 'happy' || expression === 'laughing' || expression === 'excited') && (
          <>
            <circle cx="56" cy="106" r={expression === 'blushing' ? '14' : '10'} fill="#FB7185" opacity={expression === 'blushing' ? '0.85' : '0.6'} />
            <circle cx="144" cy="106" r={expression === 'blushing' ? '14' : '10'} fill="#FB7185" opacity={expression === 'blushing' ? '0.85' : '0.6'} />
          </>
        )}

        {/* EYES according to expression */}
        {expression === 'happy' && (
          <>
            {/* Curved joyful eyes ^ ^ */}
            <path d="M 64 88 Q 76 74 88 88" stroke="#1F2937" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M 112 88 Q 124 74 136 88" stroke="#1F2937" strokeWidth="5" strokeLinecap="round" fill="none" />
          </>
        )}

        {expression === 'laughing' && (
          <>
            {/* Laughing closed eyes > < with joy tears */}
            <path d="M 64 86 Q 76 76 88 86" stroke="#1F2937" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            <path d="M 112 86 Q 124 76 136 86" stroke="#1F2937" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            {/* Tears */}
            <path d="M 52 82 C 48 88 56 94 58 88 Z" fill="#60A5FA" />
            <path d="M 148 82 C 152 88 144 94 142 88 Z" fill="#60A5FA" />
          </>
        )}

        {expression === 'blushing' && (
          <>
            {/* Big starry anime eyes */}
            <circle cx="75" cy="85" r="14" fill="#1E1B4B" />
            <circle cx="125" cy="85" r="14" fill="#1E1B4B" />
            {/* Sparkles in eyes */}
            <circle cx="71" cy="80" r="5" fill="#FFFFFF" />
            <circle cx="79" cy="90" r="2.5" fill="#FFFFFF" />
            <circle cx="121" cy="80" r="5" fill="#FFFFFF" />
            <circle cx="129" cy="90" r="2.5" fill="#FFFFFF" />
            {/* Shy eyebrow */}
            <path d="M 66 70 Q 76 66 84 72" stroke="#713F12" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 134 70 Q 124 66 116 72" stroke="#713F12" strokeWidth="3" strokeLinecap="round" fill="none" />
          </>
        )}

        {expression === 'shocked' && (
          <>
            {/* Wide shocked eyes with tiny pupils */}
            <circle cx="74" cy="83" r="15" fill="#FFFFFF" stroke="#1F2937" strokeWidth="3" />
            <circle cx="126" cy="83" r="15" fill="#FFFFFF" stroke="#1F2937" strokeWidth="3" />
            <circle cx="74" cy="83" r="4.5" fill="#1F2937" />
            <circle cx="126" cy="83" r="4.5" fill="#1F2937" />
            {/* Sweat drop */}
            <path d="M 152 64 C 158 56 166 68 158 74 C 154 74 150 70 152 64 Z" fill="#38BDF8" />
          </>
        )}

        {expression === 'confused' && (
          <>
            {/* One eye big, one eye raised */}
            <circle cx="73" cy="83" r="12" fill="#1F2937" />
            <circle cx="70" cy="80" r="4" fill="#FFFFFF" />
            <path d="M 116 84 Q 126 78 136 84" stroke="#1F2937" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            {/* Raised eyebrow */}
            <path d="M 114 70 Q 126 62 138 72" stroke="#713F12" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            {/* Question mark floating */}
            <text x="150" y="65" fill="#C084FC" fontSize="22" fontWeight="bold">❓</text>
          </>
        )}

        {expression === 'angry-but-cute' && (
          <>
            {/* Cute grumpy angled eyes */}
            <path d="M 64 78 L 86 86" stroke="#1F2937" strokeWidth="5" strokeLinecap="round" />
            <path d="M 136 78 L 114 86" stroke="#1F2937" strokeWidth="5" strokeLinecap="round" />
            <circle cx="76" cy="89" r="6" fill="#1F2937" />
            <circle cx="124" cy="89" r="6" fill="#1F2937" />
            {/* Little steam puffs */}
            <path d="M 44 60 Q 40 52 48 48 Q 54 44 46 38" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" fill="none" />
          </>
        )}

        {expression === 'embarrassed' && (
          <>
            {/* Flustered wobbly eyes */}
            <path d="M 64 85 Q 75 92 86 85" stroke="#1F2937" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path d="M 114 85 Q 125 92 136 85" stroke="#1F2937" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            {/* Embarrassed sweat lines */}
            <path d="M 88 58 L 94 68" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 96 56 L 102 66" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 104 58 L 110 68" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}

        {expression === 'excited' && (
          <>
            {/* Big star eyes */}
            <g transform="translate(74, 84)">
              <polygon points="0,-12 3,-3 12,0 3,3 0,12 -3,3 -12,0 -3,-3" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
              <circle cx="0" cy="0" r="3" fill="#FFF" />
            </g>
            <g transform="translate(126, 84)">
              <polygon points="0,-12 3,-3 12,0 3,3 0,12 -3,3 -12,0 -3,-3" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
              <circle cx="0" cy="0" r="3" fill="#FFF" />
            </g>
          </>
        )}

        {expression === 'shy' && (
          <>
            <circle cx="76" cy="86" r="10" fill="#1F2937" />
            <circle cx="124" cy="86" r="10" fill="#1F2937" />
            <circle cx="73" cy="83" r="3" fill="#FFFFFF" />
            <circle cx="121" cy="83" r="3" fill="#FFFFFF" />
            {/* Shy tilted eyes */}
            <path d="M 68 74 Q 76 72 84 76" stroke="#713F12" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 132 74 Q 124 72 116 76" stroke="#713F12" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        )}

        {/* BEAK according to expression */}
        {expression === 'shocked' ? (
          <ellipse cx="100" cy="115" rx="16" ry="15" fill="url(#duckBeakGrad)" stroke="#C2410C" strokeWidth="2.5" />
        ) : expression === 'laughing' || expression === 'excited' ? (
          <g>
            {/* Wide happy open beak */}
            <path
              d="M 76 106 Q 100 96 124 106 Q 130 128 100 134 Q 70 128 76 106 Z"
              fill="url(#duckBeakGrad)"
              stroke="#C2410C"
              strokeWidth="2.5"
            />
            {/* Inner mouth & tongue */}
            <path d="M 85 112 Q 100 110 115 112 Q 100 128 85 112 Z" fill="#991B1B" />
            <circle cx="100" cy="122" r="6" fill="#F43F5E" />
          </g>
        ) : expression === 'angry-but-cute' ? (
          <g>
            {/* Pouting beak */}
            <ellipse cx="100" cy="108" rx="22" ry="12" fill="url(#duckBeakGrad)" stroke="#C2410C" strokeWidth="2.5" />
            <path d="M 88 111 Q 100 106 112 111" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>
        ) : (
          <g>
            {/* Cute classic beak */}
            <ellipse cx="100" cy="109" rx="24" ry="14" fill="url(#duckBeakGrad)" stroke="#C2410C" strokeWidth="2.5" />
            <path d="M 86 109 Q 100 115 114 109" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Tiny nostrils */}
            <circle cx="95" cy="104" r="1.5" fill="#9A3412" />
            <circle cx="105" cy="104" r="1.5" fill="#9A3412" />
          </g>
        )}

        {/* Small microphone or notebook when speaking */}
        {isSpeaking && (
          <g className="animate-pulse-soft">
            <rect x="145" y="125" width="8" height="24" rx="4" fill="#4B5563" />
            <circle cx="149" cy="122" r="7" fill="#6B7280" stroke="#374151" strokeWidth="1.5" />
            <path d="M 143 122 Q 149 130 155 122" stroke="#E5E7EB" strokeWidth="1" fill="none" />
          </g>
        )}
      </svg>
    </div>
  );
};
