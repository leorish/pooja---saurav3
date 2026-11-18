/**
 * Soft romantic instrumental piano & warm strings engine using Web Audio API.
 * Starts strictly after user interaction and supports optional external audioUrl.
 */
class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private audioEl: HTMLAudioElement | null = null;
  private playing = false;
  private step = 0;

  // Gentle romantic chord arpeggios (frequencies in Hz)
  private readonly chords: number[][] = [
    [261.63, 329.63, 392.0, 493.88, 523.25], // Cmaj7
    [246.94, 293.66, 392.0, 493.88, 587.33], // G/B
    [220.0, 261.63, 329.63, 392.0, 523.25],  // Am7
    [174.61, 220.0, 261.63, 329.63, 440.0],  // Fmaj7
    [146.83, 220.0, 261.63, 349.23, 440.0],  // Dm7
    [196.0, 261.63, 293.66, 392.0, 493.88],  // G6/Gsus4
  ];

  private readonly arpeggioPattern = [0, 1, 2, 3, 4, 3, 2, 1];

  public isPlaying(): boolean {
    return this.playing;
  }

  public start(externalUrl?: string | null): void {
    if (this.playing) return;

    if (externalUrl) {
      if (!this.audioEl) {
        this.audioEl = new Audio(externalUrl);
        this.audioEl.loop = true;
        this.audioEl.volume = 0.28;
      }
      this.audioEl
        .play()
        .then(() => {
          this.playing = true;
        })
        .catch(() => {
          // Fallback to gentle Web Audio instrument if external stream fails
          this.startSynthesized();
        });
      return;
    }

    this.startSynthesized();
  }

  private startSynthesized(): void {
    if (typeof window === 'undefined') return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }

    if (this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(Math.max(0.0001, this.masterGain.gain.value), now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.16, now + 1.4);
    }

    this.playing = true;
    this.step = 0;

    // Trigger first chord softly right away
    this.playTick();
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
    }
    this.timerId = window.setInterval(() => {
      if (this.playing) {
        this.playTick();
      }
    }, 640);
  }

  private playTick(): void {
    if (!this.ctx || !this.masterGain) return;
    const chordIdx = Math.floor(this.step / 8) % this.chords.length;
    const noteInBar = this.step % 8;
    const chord = this.chords[chordIdx];

    // Warm string pad on downbeat of each chord
    if (noteInBar === 0) {
      this.playPadNote(chord[0] * 0.5, 4.6, 0.09);
      this.playPadNote(chord[2], 4.6, 0.05);
    }

    // Soft felt-piano arpeggio note
    const freq = chord[this.arpeggioPattern[noteInBar]];
    this.playPianoNote(freq, 2.2, 0.22);

    this.step += 1;
  }

  private playPianoNote(freq: number, duration: number, peakGain: number): void {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const oscOver = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const env = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    oscOver.type = 'sine';
    oscOver.frequency.setValueAtTime(freq * 2, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(980, now);
    filter.frequency.exponentialRampToValueAtTime(340, now + duration);

    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(peakGain, now + 0.035);
    env.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    const overGain = this.ctx.createGain();
    overGain.gain.setValueAtTime(0.18, now);

    osc.connect(filter);
    oscOver.connect(overGain);
    overGain.connect(filter);
    filter.connect(env);
    env.connect(this.masterGain);

    osc.start(now);
    oscOver.start(now);
    osc.stop(now + duration + 0.05);
    oscOver.stop(now + duration + 0.05);
  }

  private playPadNote(freq: number, duration: number, peakGain: number): void {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const env = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(520, now);

    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(peakGain, now + 1.2);
    env.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(env);
    env.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  public pause(): void {
    this.playing = false;
    if (this.audioEl) {
      this.audioEl.pause();
    }
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(Math.max(0.0001, this.masterGain.gain.value), now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
    }
  }
}

export const romanticAudio = new RomanticAudioEngine();
