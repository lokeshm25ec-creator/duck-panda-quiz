// "The Rose" BGM from DC (Tamil Movie) - Composed by Anirudh Ravichander
// Realistic cinematic Web Audio synthesis featuring emotive acoustic piano,
// warm cello sub-bass, and lush Kollywood strings pad.

export class TheRoseBgmEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.65;
  private mainGain: GainNode | null = null;
  private masterFilter: BiquadFilterNode | null = null;
  private delayNode: DelayNode | null = null;
  private delayGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private sequenceTimer: number | null = null;
  private currentStep: number = 0;

  // Custom audio file support (if user uploads or provides MP3)
  private customAudio: HTMLAudioElement | null = null;
  private customSourceNode: MediaElementAudioSourceNode | null = null;
  private customAudioUrl: string | null = null;

  // Listeners
  private listeners: ((playing: boolean) => void)[] = [];

  constructor() {
    // Lazy init context on user interaction
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.ctx && !this.mainGain) {
      // Main Gain
      this.mainGain = this.ctx.createGain();
      this.mainGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      // Warm cinematic lowpass filter
      this.masterFilter = this.ctx.createBiquadFilter();
      this.masterFilter.type = 'lowpass';
      this.masterFilter.frequency.setValueAtTime(4200, this.ctx.currentTime);

      // Reverb / Stereo Hall Echo
      this.delayNode = this.ctx.createDelay();
      this.delayNode.delayTime.setValueAtTime(0.36, this.ctx.currentTime);

      this.delayGain = this.ctx.createGain();
      this.delayGain.gain.setValueAtTime(0.28, this.ctx.currentTime);

      // Analyser for visualizer
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;

      // Connect graph
      this.mainGain.connect(this.masterFilter);
      this.masterFilter.connect(this.delayNode);
      this.delayNode.connect(this.delayGain);
      this.delayGain.connect(this.masterFilter); // feedback loop

      this.masterFilter.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
  }

  // Piano Note synthesis (gentle acoustic piano hammer physics)
  private playPianoNote(freq: number, duration: number, velocity: number = 0.5, timeOffset: number = 0) {
    if (!this.ctx || !this.mainGain) return;
    const now = this.ctx.currentTime + timeOffset;

    // Fundamental sine
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Warm triangle harmonic for piano body
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    // Subtle sparkle overtones
    const osc3 = this.ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 3, now);

    const noteGain = this.ctx.createGain();
    const peakGain = 0.35 * velocity;

    // Fast piano attack, expressive decay
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(peakGain, now + 0.012);
    noteGain.gain.exponentialRampToValueAtTime(peakGain * 0.45, now + 0.25);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Filter to tame brightness like a grand piano
    const noteFilter = this.ctx.createBiquadFilter();
    noteFilter.type = 'lowpass';
    noteFilter.frequency.setValueAtTime(Math.min(3600, freq * 4), now);
    noteFilter.frequency.exponentialRampToValueAtTime(Math.max(600, freq * 1.5), now + duration);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    osc3.connect(noteGain);

    noteGain.connect(noteFilter);
    noteFilter.connect(this.mainGain);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    osc1.stop(now + duration + 0.05);
    osc2.stop(now + duration + 0.05);
    osc3.stop(now + duration + 0.05);
  }

  // Lush Kollywood Strings Pad (warm violin/viola/cello chord swell)
  private playStringsChord(freqs: number[], duration: number, timeOffset: number = 0) {
    if (!this.ctx || !this.mainGain) return;
    const now = this.ctx.currentTime + timeOffset;

    freqs.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);
      // Gentle detune for chorus warmth
      osc.detune.setValueAtTime((Math.random() - 0.5) * 12, now);

      const filter = this.ctx!.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.linearRampToValueAtTime(1400, now + duration * 0.5);
      filter.frequency.linearRampToValueAtTime(700, now + duration);

      const gain = this.ctx!.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.07, now + 0.8); // slow cello/strings attack
      gain.gain.setValueAtTime(0.06, now + duration - 0.8);
      gain.gain.linearRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.mainGain!);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    });
  }

  // Deep Cello Bass Note
  private playCelloBass(freq: number, duration: number, timeOffset: number = 0) {
    if (!this.ctx || !this.mainGain) return;
    const now = this.ctx.currentTime + timeOffset;

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.24, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.mainGain);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  // "The Rose" BGM Theme progression & melody (Anirudh Ravichander romantic motif)
  // Dm - Bb - C - Am - Dm progression at ~66 BPM
  private scheduleBar(barIndex: number) {
    if (!this.isPlaying) return;

    // Note frequencies (Hz)
    const D2 = 73.42, F2 = 87.31, A2 = 110.0, Bb2 = 116.54, C3 = 130.81, D3 = 146.83;
    const E3 = 164.81, F3 = 174.61, G3 = 196.0, A3 = 220.0, Bb3 = 233.08, C4 = 261.63;
    const D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.0, A4 = 440.0, Bb4 = 466.16;
    const C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46;

    const barDuration = 4.0; // 4 seconds per bar (~60-66 BPM romantic tempo)
    const cycle = barIndex % 8;

    if (cycle === 0) {
      // Bar 1: D Minor (The iconic Rose opening motif)
      this.playCelloBass(D2, 3.8, 0);
      this.playStringsChord([D3, F3, A3], 3.9, 0);

      // Acoustic Piano arpeggio & melody
      this.playPianoNote(D3, 1.2, 0.7, 0.0);
      this.playPianoNote(A3, 1.2, 0.5, 0.3);
      this.playPianoNote(F4, 1.5, 0.6, 0.6);
      this.playPianoNote(A4, 2.2, 0.85, 0.9); // The emotive Rose high note
      this.playPianoNote(G4, 1.0, 0.65, 2.0);
      this.playPianoNote(F4, 1.2, 0.7, 2.5);
      this.playPianoNote(E4, 1.4, 0.6, 3.2);
    } else if (cycle === 1) {
      // Bar 2: Bb Major 7 (Sweet heart-wrenching resolve)
      this.playCelloBass(Bb2, 3.8, 0);
      this.playStringsChord([Bb2, D3, F3, A3], 3.9, 0);

      this.playPianoNote(Bb2, 1.2, 0.7, 0.0);
      this.playPianoNote(F3, 1.2, 0.5, 0.3);
      this.playPianoNote(D4, 1.5, 0.6, 0.6);
      this.playPianoNote(F4, 2.2, 0.8, 0.9);
      this.playPianoNote(D5, 1.8, 0.9, 1.8); // High emotional peak
      this.playPianoNote(C5, 1.2, 0.7, 2.6);
      this.playPianoNote(Bb4, 1.4, 0.75, 3.2);
    } else if (cycle === 2) {
      // Bar 3: C Major / C add9 (Yearning Kollywood melody)
      this.playCelloBass(C3, 3.8, 0);
      this.playStringsChord([C3, E3, G3, D4], 3.9, 0);

      this.playPianoNote(C3, 1.2, 0.65, 0.0);
      this.playPianoNote(G3, 1.2, 0.5, 0.3);
      this.playPianoNote(E4, 1.5, 0.6, 0.6);
      this.playPianoNote(G4, 2.0, 0.8, 0.9);
      this.playPianoNote(A4, 1.2, 0.75, 1.8);
      this.playPianoNote(G4, 1.2, 0.7, 2.4);
      this.playPianoNote(F4, 1.4, 0.65, 3.0);
    } else if (cycle === 3) {
      // Bar 4: A Minor 7 / Dm9 resolve
      this.playCelloBass(A2, 3.8, 0);
      this.playStringsChord([A2, C3, E3, G3], 3.9, 0);

      this.playPianoNote(A2, 1.2, 0.6, 0.0);
      this.playPianoNote(E3, 1.2, 0.5, 0.3);
      this.playPianoNote(C4, 1.5, 0.6, 0.6);
      this.playPianoNote(E4, 2.4, 0.8, 0.9);
      this.playPianoNote(F4, 1.2, 0.7, 2.2);
      this.playPianoNote(E4, 1.2, 0.6, 2.8);
      this.playPianoNote(D4, 1.6, 0.7, 3.4);
    } else if (cycle === 4) {
      // Bar 5: F Major (Soulful romantic theme variation)
      this.playCelloBass(F2, 3.8, 0);
      this.playStringsChord([F3, A3, C4], 3.9, 0);

      this.playPianoNote(F3, 1.2, 0.7, 0.0);
      this.playPianoNote(C4, 1.2, 0.5, 0.3);
      this.playPianoNote(A4, 1.8, 0.85, 0.8);
      this.playPianoNote(C5, 2.0, 0.9, 1.6);
      this.playPianoNote(D5, 1.2, 0.85, 2.4);
      this.playPianoNote(C5, 1.2, 0.7, 3.0);
    } else if (cycle === 5) {
      // Bar 6: G Minor 9 (Dramatic cello & violin swell)
      this.playCelloBass(G3, 3.8, 0);
      this.playStringsChord([G3, Bb3, D4, F4], 3.9, 0);

      this.playPianoNote(G3, 1.2, 0.7, 0.0);
      this.playPianoNote(D4, 1.2, 0.5, 0.3);
      this.playPianoNote(Bb4, 1.6, 0.8, 0.8);
      this.playPianoNote(A4, 1.4, 0.75, 1.8);
      this.playPianoNote(G4, 1.4, 0.7, 2.6);
      this.playPianoNote(F4, 1.2, 0.65, 3.2);
    } else if (cycle === 6) {
      // Bar 7: Bb Major (Climax with high bell notes)
      this.playCelloBass(Bb2, 3.8, 0);
      this.playStringsChord([Bb2, D3, F3, Bb3], 3.9, 0);

      this.playPianoNote(Bb3, 1.2, 0.7, 0.0);
      this.playPianoNote(F4, 1.5, 0.7, 0.6);
      this.playPianoNote(D5, 2.4, 0.95, 1.2); // Bell-like sparkle
      this.playPianoNote(E5, 1.2, 0.8, 2.4);
      this.playPianoNote(F5, 1.8, 0.9, 3.0);
    } else {
      // Bar 8: A7sus4 -> Dm delicate romantic closure
      this.playCelloBass(A2, 3.8, 0);
      this.playStringsChord([A2, E3, G3, C4], 3.9, 0);

      this.playPianoNote(E4, 1.2, 0.65, 0.0);
      this.playPianoNote(A4, 1.4, 0.75, 0.8);
      this.playPianoNote(277.18, 1.6, 0.7, 1.8);
      this.playPianoNote(D4, 2.8, 0.85, 2.6); // Return home to D minor
    }

    // Schedule next bar
    this.sequenceTimer = window.setTimeout(() => {
      if (this.isPlaying) {
        this.currentStep++;
        this.scheduleBar(this.currentStep);
      }
    }, barDuration * 1000 - 40);
  }

  // Play "The Rose" BGM
  play() {
    this.initContext();

    if (this.customAudio) {
      this.customAudio.play().catch((err) => console.log('Audio autoplay prevented:', err));
      this.isPlaying = true;
      this.notifyListeners(true);
      return;
    }

    if (this.isPlaying) return;
    this.isPlaying = true;
    this.currentStep = 0;
    this.scheduleBar(0);
    this.notifyListeners(true);
  }

  // Pause BGM
  pause() {
    this.isPlaying = false;
    if (this.sequenceTimer) {
      clearTimeout(this.sequenceTimer);
      this.sequenceTimer = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.notifyListeners(false);
  }

  // Toggle Play / Pause
  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  // Set Master Volume (0.0 to 1.0)
  setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.mainGain && this.ctx) {
      this.mainGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  getVolume(): number {
    return this.volume;
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Audio frequency data for live dancing visualizer bars
  getFrequencyData(): Uint8Array {
    if (!this.analyser) return new Uint8Array(32);
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  // Allow user to upload their own audio file for "The Rose"
  setCustomAudioFile(file: File) {
    if (this.customAudioUrl) {
      URL.revokeObjectURL(this.customAudioUrl);
    }
    this.pause();
    this.customAudioUrl = URL.createObjectURL(file);
    this.customAudio = new Audio(this.customAudioUrl);
    this.customAudio.loop = true;
    this.customAudio.volume = this.volume;
    this.play();
  }

  resetToSynthesizer() {
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }
    if (this.customAudioUrl) {
      URL.revokeObjectURL(this.customAudioUrl);
      this.customAudioUrl = null;
    }
    this.pause();
    this.play();
  }

  subscribe(listener: (playing: boolean) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners(playing: boolean) {
    this.listeners.forEach((l) => l(playing));
  }
}

export const theRoseBGM = new TheRoseBgmEngine();
