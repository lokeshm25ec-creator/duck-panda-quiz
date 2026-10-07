// Pure Romantic Love Theme - "The Rose" / Cinematic Kollywood Love Symphony
// Warm acoustic grand piano, soaring romantic strings ensemble, deep emotional cello,
// and delicate music-box harp chimes. Seamless zero-lag looping.

class RomanticBgmEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.32; // Comfortable, sweet romantic volume
  private mainGain: GainNode | null = null;
  private masterFilter: BiquadFilterNode | null = null;
  private reverbDelayNode: DelayNode | null = null;
  private reverbFeedbackGain: GainNode | null = null;
  private sequenceTimer: number | null = null;
  private currentStep: number = 0;

  private audioElement: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const audio = new Audio('/bgm.mp3');
        audio.loop = true;
        audio.volume = this.volume;
        this.audioElement = audio;
      } catch {
        this.audioElement = null;
      }
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
      this.ctx.resume();
    }

    if (this.ctx && !this.mainGain) {
      this.mainGain = this.ctx.createGain();
      this.mainGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      // Warm cinematic lowpass filter (removes any harsh frequencies)
      this.masterFilter = this.ctx.createBiquadFilter();
      this.masterFilter.type = 'lowpass';
      this.masterFilter.frequency.setValueAtTime(3800, this.ctx.currentTime);

      // Reverb / Stereo Hall Echo for lush, dreamy space
      this.reverbDelayNode = this.ctx.createDelay();
      this.reverbDelayNode.delayTime.setValueAtTime(0.38, this.ctx.currentTime);

      this.reverbFeedbackGain = this.ctx.createGain();
      this.reverbFeedbackGain.gain.setValueAtTime(0.26, this.ctx.currentTime);

      this.mainGain.connect(this.masterFilter);
      this.masterFilter.connect(this.reverbDelayNode);
      this.reverbDelayNode.connect(this.reverbFeedbackGain);
      this.reverbFeedbackGain.connect(this.masterFilter);
      this.masterFilter.connect(this.ctx.destination);
    }
  }

  // Soft Acoustic Piano Note (warm attack, singing sustain, gentle decay)
  private playPianoNote(freq: number, duration: number, velocity: number = 0.5, timeOffset: number = 0) {
    if (!this.ctx || !this.mainGain) return;
    const now = this.ctx.currentTime + timeOffset;

    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    const osc3 = this.ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 3, now);

    const noteGain = this.ctx.createGain();
    const peakGain = 0.25 * velocity;

    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(peakGain, now + 0.015);
    noteGain.gain.exponentialRampToValueAtTime(peakGain * 0.45, now + 0.3);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    const noteFilter = this.ctx.createBiquadFilter();
    noteFilter.type = 'lowpass';
    noteFilter.frequency.setValueAtTime(Math.min(3000, freq * 4), now);
    noteFilter.frequency.exponentialRampToValueAtTime(Math.max(500, freq * 1.4), now + duration);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    osc3.connect(noteGain);

    noteGain.connect(noteFilter);
    noteFilter.connect(this.mainGain);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    osc1.stop(now + duration + 0.08);
    osc2.stop(now + duration + 0.08);
    osc3.stop(now + duration + 0.08);
  }

  // Delicate music box / celestial bell sparkle
  private playBellChime(freq: number, duration: number, timeOffset: number = 0) {
    if (!this.ctx || !this.mainGain) return;
    const now = this.ctx.currentTime + timeOffset;

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.mainGain);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  // Soaring, Lush Romantic Strings Pad (warm ensemble swell)
  private playStringsChord(freqs: number[], duration: number, timeOffset: number = 0) {
    if (!this.ctx || !this.mainGain) return;
    const now = this.ctx.currentTime + timeOffset;

    freqs.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);

      const filter = this.ctx!.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(700, now);
      filter.frequency.linearRampToValueAtTime(1100, now + duration * 0.5);
      filter.frequency.linearRampToValueAtTime(650, now + duration);

      const gain = this.ctx!.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.045, now + 0.9);
      gain.gain.setValueAtTime(0.04, now + duration - 0.9);
      gain.gain.linearRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.mainGain!);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    });
  }

  // Deep Emotional Cello Bass Note
  private playCelloBass(freq: number, duration: number, timeOffset: number = 0) {
    if (!this.ctx || !this.mainGain) return;
    const now = this.ctx.currentTime + timeOffset;

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.16, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.mainGain);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  // The Romantic Love Melody (8-bar cyclical cinematic theme)
  // Progressions: Dm9 -> Bbmaj7 -> Cadd9 -> Am7 -> Fmaj9 -> Gm9 -> Bbmaj7 -> Dm add9
  private scheduleBar(barIndex: number) {
    if (!this.isPlaying) return;

    // Frequencies
    const D2 = 73.42, F2 = 87.31, G2 = 98.0, A2 = 110.0, Bb2 = 116.54, C3 = 130.81, D3 = 146.83;
    const E3 = 164.81, F3 = 174.61, G3 = 196.0, A3 = 220.0, Bb3 = 233.08, C4 = 261.63;
    const D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.0, A4 = 440.0, Bb4 = 466.16;
    const C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46, A5 = 880.0, B4 = 493.88;

    const barDuration = 4.2; // ~60 BPM soulful romantic tempo
    const cycle = barIndex % 8;

    if (cycle === 0) {
      // Bar 1: D Minor 9 (Tender Romantic Opening - Soft longing)
      this.playCelloBass(D2, 4.0, 0);
      this.playStringsChord([D3, F3, A3, C4], 4.1, 0);

      // Sweet piano notes
      this.playPianoNote(D3, 1.2, 0.6, 0.0);
      this.playPianoNote(A3, 1.2, 0.5, 0.3);
      this.playPianoNote(F4, 1.5, 0.65, 0.7);
      this.playPianoNote(A4, 2.4, 0.85, 1.1); // The soaring emotional high note
      this.playPianoNote(G4, 1.2, 0.6, 2.2);
      this.playPianoNote(F4, 1.4, 0.65, 2.7);
      this.playPianoNote(E4, 1.6, 0.55, 3.4);

      // Celestial sparkle
      this.playBellChime(D5, 1.5, 1.1);
      this.playBellChime(A5 || 880.0, 1.8, 2.7);
    } else if (cycle === 1) {
      // Bar 2: Bb Major 7 (Deep affection & warmth)
      this.playCelloBass(Bb2, 4.0, 0);
      this.playStringsChord([Bb2, D3, F3, A3], 4.1, 0);

      this.playPianoNote(Bb2, 1.2, 0.6, 0.0);
      this.playPianoNote(F3, 1.2, 0.5, 0.3);
      this.playPianoNote(D4, 1.5, 0.6, 0.7);
      this.playPianoNote(F4, 2.2, 0.75, 1.1);
      this.playPianoNote(D5, 2.2, 0.9, 1.9); // Passionate high note
      this.playPianoNote(C5, 1.2, 0.7, 2.8);
      this.playPianoNote(Bb4, 1.5, 0.75, 3.4);

      this.playBellChime(F5, 1.8, 1.9);
    } else if (cycle === 2) {
      // Bar 3: C add9 (Sweet romance & hope)
      this.playCelloBass(C3, 4.0, 0);
      this.playStringsChord([C3, E3, G3, D4], 4.1, 0);

      this.playPianoNote(C3, 1.2, 0.6, 0.0);
      this.playPianoNote(G3, 1.2, 0.5, 0.3);
      this.playPianoNote(E4, 1.5, 0.6, 0.7);
      this.playPianoNote(G4, 2.2, 0.8, 1.1);
      this.playPianoNote(C5, 1.8, 0.85, 2.0);
      this.playPianoNote(B4 || 493.88, 1.2, 0.65, 2.7);
      this.playPianoNote(G4, 1.4, 0.6, 3.3);

      this.playBellChime(E5, 1.8, 2.0);
    } else if (cycle === 3) {
      // Bar 4: A Minor 7 (Gentle soulful caress)
      this.playCelloBass(A2, 4.0, 0);
      this.playStringsChord([A2, C3, E3, G3], 4.1, 0);

      this.playPianoNote(A2, 1.2, 0.55, 0.0);
      this.playPianoNote(E3, 1.2, 0.5, 0.3);
      this.playPianoNote(C4, 1.5, 0.6, 0.7);
      this.playPianoNote(E4, 2.5, 0.75, 1.1);
      this.playPianoNote(F4, 1.2, 0.65, 2.2);
      this.playPianoNote(E4, 1.2, 0.6, 2.8);
      this.playPianoNote(D4, 1.8, 0.7, 3.4);
    } else if (cycle === 4) {
      // Bar 5: F Major 9 (Sweetness & pure tenderness)
      this.playCelloBass(F2, 4.0, 0);
      this.playStringsChord([F3, A3, C4, E4], 4.1, 0);

      this.playPianoNote(F3, 1.2, 0.65, 0.0);
      this.playPianoNote(C4, 1.2, 0.5, 0.3);
      this.playPianoNote(A4, 2.0, 0.85, 0.8);
      this.playPianoNote(C5, 2.2, 0.9, 1.7);
      this.playPianoNote(D5, 1.4, 0.8, 2.5);
      this.playPianoNote(C5, 1.4, 0.7, 3.2);

      this.playBellChime(C5, 2.0, 1.7);
    } else if (cycle === 5) {
      // Bar 6: G Minor 9 (Passionate swell)
      this.playCelloBass(G2, 4.0, 0);
      this.playStringsChord([G3, Bb3, D4, F4], 4.1, 0);

      this.playPianoNote(G3, 1.2, 0.65, 0.0);
      this.playPianoNote(D4, 1.2, 0.5, 0.3);
      this.playPianoNote(Bb4, 1.8, 0.8, 0.8);
      this.playPianoNote(A4, 1.4, 0.75, 1.8);
      this.playPianoNote(G4, 1.4, 0.7, 2.6);
      this.playPianoNote(F4, 1.3, 0.65, 3.3);

      this.playBellChime(D5, 1.6, 0.8);
    } else if (cycle === 6) {
      // Bar 7: Bb Major (Romantic climax with sparkling high notes)
      this.playCelloBass(Bb2, 4.0, 0);
      this.playStringsChord([Bb2, D3, F3, Bb3], 4.1, 0);

      this.playPianoNote(Bb3, 1.2, 0.65, 0.0);
      this.playPianoNote(F4, 1.5, 0.7, 0.6);
      this.playPianoNote(D5, 2.6, 0.95, 1.2);
      this.playPianoNote(E5, 1.3, 0.85, 2.5);
      this.playPianoNote(F5, 2.0, 0.9, 3.1);

      this.playBellChime(F5, 2.2, 3.1);
    } else {
      // Bar 8: A7sus4 -> Dm9 resolution (Sweet romantic homecoming)
      this.playCelloBass(A2, 4.0, 0);
      this.playStringsChord([A2, E3, G3, C4], 4.1, 0);

      this.playPianoNote(E4, 1.2, 0.6, 0.0);
      this.playPianoNote(A4, 1.4, 0.75, 0.8);
      this.playPianoNote(277.18, 1.6, 0.7, 1.8); // C#4 sweet leading tone
      this.playPianoNote(D4, 3.0, 0.85, 2.6); // D4 gentle resting home

      this.playBellChime(D5, 2.5, 2.6);
    }

    // Schedule next bar with zero latency (seamless loop)
    this.sequenceTimer = window.setTimeout(() => {
      if (this.isPlaying) {
        this.currentStep++;
        this.scheduleBar(this.currentStep);
      }
    }, barDuration * 1000 - 35);
  }

  // Play romantic background music (looped indefinitely with zero delay)
  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    if (this.audioElement) {
      const playPromise = this.audioElement.play();
      if (playPromise) {
        playPromise.catch(() => {
          this.startSynthesizer();
        });
        return;
      }
    }

    this.startSynthesizer();
  }

  private startSynthesizer() {
    this.initContext();
    this.currentStep = 0;
    this.scheduleBar(0);
  }

  stop() {
    this.isPlaying = false;
    if (this.sequenceTimer) {
      clearTimeout(this.sequenceTimer);
      this.sequenceTimer = null;
    }
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.mainGain && this.ctx) {
      this.mainGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
  }
}

export const theRoseBGM = new RomanticBgmEngine();
