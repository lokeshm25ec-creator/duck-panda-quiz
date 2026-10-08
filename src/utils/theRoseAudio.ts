// Seamless Gapless Romantic Background Music Engine
// Plays the uploaded romantic audio file continuously with zero lag, zero delay, and seamless looping.
// Uses Web Audio API sample-accurate buffer looping with HTML5 Audio fallback.

class RomanticBgmEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  public isMuted: boolean = false;
  private volume: number = 0.22; // Soft, pleasant, cozy romantic background volume
  private masterGain: GainNode | null = null;

  // Web Audio buffer for sample-accurate gapless looping (0.000ms delay)
  private audioBuffer: AudioBuffer | null = null;
  private currentSourceNode: AudioBufferSourceNode | null = null;
  private isBufferLoading: boolean = false;

  // HTML5 audio element backup
  private audioElement: HTMLAudioElement | null = null;
  private hasHtmlAudioStarted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initHtmlAudio();
      // Preload the audio file into memory for instant gapless playback
      this.preloadAudioBuffer();
    }
  }

  private initHtmlAudio() {
    try {
      const audio = new Audio('/bgm.mp3');
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = this.volume;

      // Ensure seamless loop without any browser hitch
      audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      });

      this.audioElement = audio;
    } catch {
      this.audioElement = null;
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    if (this.ctx && !this.masterGain) {
      this.masterGain = this.ctx.createGain();
      const currentGain = this.isMuted ? 0 : this.volume;
      this.masterGain.gain.setValueAtTime(currentGain, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  // Preload and decode the 48s MP3 for 100% gapless, sample-accurate looping
  private async preloadAudioBuffer() {
    if (this.isBufferLoading || this.audioBuffer) return;
    this.isBufferLoading = true;

    try {
      const response = await fetch('/bgm.mp3');
      if (!response.ok) throw new Error('Failed to fetch /bgm.mp3');
      const arrayBuffer = await response.arrayBuffer();

      this.initContext();
      if (this.ctx) {
        this.audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
        // If play() was already requested while loading, start the seamless buffer immediately
        if (this.isPlaying && !this.currentSourceNode) {
          this.startBufferPlayback();
        }
      }
    } catch {
      // Fallback to HTML5 audio element
      this.audioBuffer = null;
    } finally {
      this.isBufferLoading = false;
    }
  }

  private startBufferPlayback() {
    if (!this.ctx || !this.audioBuffer || !this.masterGain) return;

    try {
      // Stop previous node if any
      if (this.currentSourceNode) {
        try {
          this.currentSourceNode.stop();
          this.currentSourceNode.disconnect();
        } catch {
          // ignore
        }
      }

      const source = this.ctx.createBufferSource();
      source.buffer = this.audioBuffer;
      source.loop = true; // Web Audio sample-accurate gapless continuous loop!
      source.connect(this.masterGain);
      source.start(0);

      this.currentSourceNode = source;

      // Pause HTML5 audio since Web Audio is handling the seamless playback
      if (this.audioElement && this.hasHtmlAudioStarted) {
        this.audioElement.pause();
        this.hasHtmlAudioStarted = false;
      }
    } catch {
      // If Web Audio source fails, fallback to HTML5 Audio
      this.playHtmlAudio();
    }
  }

  private playHtmlAudio() {
    if (!this.audioElement) return;
    this.audioElement.volume = this.isMuted ? 0 : this.volume;
    this.audioElement.currentTime = 0;
    const p = this.audioElement.play();
    if (p) {
      p.then(() => {
        this.hasHtmlAudioStarted = true;
      }).catch(() => {});
    }
  }

  // Play romantic background music (seamless loop with 0ms delay)
  play() {
    this.isPlaying = true;
    this.initContext();

    if (this.audioBuffer) {
      this.startBufferPlayback();
    } else {
      // If buffer is still loading, start HTML5 audio first, then transition seamlessly
      this.playHtmlAudio();
      this.preloadAudioBuffer();
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.currentSourceNode) {
      try {
        this.currentSourceNode.stop();
        this.currentSourceNode.disconnect();
      } catch {
        // ignore
      }
      this.currentSourceNode = null;
    }
    if (this.audioElement) {
      this.audioElement.pause();
      this.hasHtmlAudioStarted = false;
    }
  }

  setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    const target = this.isMuted ? 0 : this.volume;

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(target, this.ctx.currentTime);
    }
    if (this.audioElement) {
      this.audioElement.volume = target;
    }
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
    const target = muted ? 0 : this.volume;

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(target, this.ctx.currentTime);
    }
    if (this.audioElement) {
      this.audioElement.volume = target;
      if (muted) {
        this.audioElement.pause();
      } else if (this.isPlaying && !this.currentSourceNode) {
        this.audioElement.play().catch(() => {});
      }
    }
  }
}

export const theRoseBGM = new RomanticBgmEngine();
