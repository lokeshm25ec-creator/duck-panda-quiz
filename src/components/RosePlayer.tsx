import React, { useState, useEffect, useRef } from 'react';
import { theRoseBGM } from '../utils/theRoseAudio';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music,
  Disc3,
  Upload,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';

export const RosePlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.65);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [visualizerHeights, setVisualizerHeights] = useState<number[]>([4, 8, 12, 8, 4, 10, 6, 12]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Listen to play state changes
    const unsubscribe = theRoseBGM.subscribe((playing) => {
      setIsPlaying(playing);
    });

    // Visualizer loop
    let animId: number;
    const updateVisualizer = () => {
      if (theRoseBGM.getIsPlaying()) {
        const freqData = theRoseBGM.getFrequencyData();
        if (freqData && freqData.length > 0) {
          const sample = [
            Math.max(4, (freqData[1] || 20) / 10),
            Math.max(4, (freqData[3] || 40) / 10),
            Math.max(4, (freqData[5] || 60) / 10),
            Math.max(4, (freqData[7] || 80) / 10),
            Math.max(4, (freqData[9] || 70) / 10),
            Math.max(4, (freqData[11] || 50) / 10),
            Math.max(4, (freqData[13] || 35) / 10),
            Math.max(4, (freqData[15] || 25) / 10)
          ];
          setVisualizerHeights(sample);
        }
      } else {
        setVisualizerHeights([4, 6, 5, 7, 4, 6, 5, 4]);
      }
      animId = requestAnimationFrame(updateVisualizer);
    };

    animId = requestAnimationFrame(updateVisualizer);

    return () => {
      unsubscribe();
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleTogglePlay = () => {
    theRoseBGM.toggle();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
      theRoseBGM.setVolume(0);
    } else {
      setIsMuted(false);
      theRoseBGM.setVolume(val);
    }
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      theRoseBGM.setVolume(volume || 0.6);
    } else {
      setIsMuted(true);
      theRoseBGM.setVolume(0);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      theRoseBGM.setCustomAudioFile(file);
    }
  };

  return (
    <>
      {/* Floating Rose Petals when playing */}
      {isPlaying && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-1/4 left-[8%] text-rose-400/30 text-2xl animate-float-slow">🌹</div>
          <div className="absolute top-2/3 right-[10%] text-rose-400/30 text-3xl animate-float-reverse">🥀</div>
          <div className="absolute bottom-1/4 left-[20%] text-pink-400/25 text-2xl animate-float-slow delay-300">🌸</div>
          <div className="absolute top-1/3 right-[25%] text-rose-400/25 text-xl animate-float-reverse delay-500">🌹</div>
        </div>
      )}

      {/* Floating Mini Player Widget at bottom-right */}
      <div className="fixed bottom-4 right-4 z-40 max-w-sm w-[92vw] sm:w-auto">
        <div className="bg-gradient-to-r from-[#2c0b46]/95 via-[#1e0a35]/95 to-[#24083a]/95 backdrop-blur-xl border border-rose-500/40 rounded-2xl p-3 shadow-2xl shadow-rose-950/50 text-purple-100 transition-all duration-300">
          <div className="flex items-center gap-3">
            {/* Spinning Disc / Rose Icon */}
            <button
              onClick={handleTogglePlay}
              className={`relative w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-gradient-to-br from-rose-500 to-pink-600 border-rose-300 shadow-lg shadow-rose-500/40'
                  : 'bg-purple-900/80 border-purple-500/40 text-purple-300 hover:text-white'
              }`}
              title={isPlaying ? 'Pause The Rose BGM' : 'Play The Rose BGM (DC Movie)'}
            >
              <Disc3
                className={`w-6 h-6 text-white ${isPlaying ? 'animate-spin' : ''}`}
                style={{ animationDuration: '4s' }}
              />
              <span className="absolute -top-1 -right-1 text-xs">🌹</span>
            </button>

            {/* Track Info */}
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  DC Movie BGM
                </span>
                {isPlaying && (
                  <span className="flex items-center gap-0.5 text-[10px] text-pink-300 font-semibold animate-pulse">
                    <Sparkles className="w-2.5 h-2.5" />
                    Now Playing
                  </span>
                )}
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                The Rose (Instrumental)
              </h4>
              <p className="text-[10px] text-purple-300/80 truncate">
                Anirudh Ravichander &bull; Tamil Cinema
              </p>
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={handleTogglePlay}
              className="w-8 h-8 rounded-full bg-rose-500 hover:bg-rose-400 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            {/* Expand / Collapse details */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg text-purple-300 hover:text-white hover:bg-purple-800/40 transition-colors shrink-0"
              title={isExpanded ? 'Collapse audio player' : 'Expand audio player controls'}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>

          {/* Equalizer Visualizer Bars */}
          <div className="flex items-end gap-1 h-3 mt-2 px-1">
            {visualizerHeights.map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-rose-500 to-pink-400 rounded-full transition-all duration-75"
                style={{ height: `${Math.min(14, Math.max(3, h))}px`, opacity: isPlaying ? 0.9 : 0.3 }}
              />
            ))}
          </div>

          {/* Expanded Controls: Volume Slider & Custom MP3 Upload */}
          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-purple-500/20 space-y-2.5 text-xs animate-fadeIn">
              {/* Volume Slider */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleMute}
                  className="text-purple-300 hover:text-white transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full accent-rose-500 h-1.5 bg-purple-900 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-purple-300 font-mono w-7 text-right">
                  {Math.round((isMuted ? 0 : volume) * 100)}%
                </span>
              </div>

              {/* Upload Custom Audio File (Optional for MP3) */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-[11px] text-purple-200 hover:text-white border border-purple-600/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Upload className="w-3 h-3 text-rose-300" />
                  <span>Use Local Audio File</span>
                </button>

                <button
                  onClick={() => theRoseBGM.resetToSynthesizer()}
                  className="text-[10px] text-purple-400 hover:text-rose-300 underline cursor-pointer"
                >
                  Reset to Synth
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              <p className="text-[9px] text-purple-300/60 leading-tight">
                Synthesized live using Web Audio API: acoustic piano &amp; cinematic strings from Anirudh&apos;s &ldquo;The Rose&rdquo; theme (DC Movie).
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
