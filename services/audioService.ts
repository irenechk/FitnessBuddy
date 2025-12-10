export class AudioService {
  private audioContext: AudioContext | null = null;
  private synth: SpeechSynthesis;
  private gainNode: GainNode | null = null;

  constructor() {
    this.synth = window.speechSynthesis;
    // AudioContext is initialized on user interaction to comply with browser policies
  }

  private initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.value = 0.3; // Volume
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  public speak(text: string) {
    if (this.synth.speaking) {
      this.synth.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Try to find a good voice
    const voices = this.synth.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Samantha'));
    if (preferredVoice) utterance.voice = preferredVoice;

    this.synth.speak(utterance);
  }

  public playBeep(frequency: number = 800, duration: number = 0.1, type: OscillatorType = 'sine') {
    this.initAudioContext();
    if (!this.audioContext || !this.gainNode) return;

    const oscillator = this.audioContext.createOscillator();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    oscillator.connect(this.gainNode);
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  public playCountDown() {
    this.playBeep(600, 0.1, 'sine');
  }

  public playStart() {
    this.playBeep(1200, 0.4, 'triangle');
  }

  public playComplete() {
    this.initAudioContext();
    if (!this.audioContext || !this.gainNode) return;
    
    // A little arpeggio
    const now = this.audioContext.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = this.audioContext!.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        osc.connect(this.gainNode!);
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.2);
    });
  }
}

export const audioService = new AudioService();