"use client";

import React, { useEffect, useRef, useState } from "react";
import { Music, Play, Pause, Volume2, VolumeX } from "lucide-react";

class AmbientSynth {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private isPlaying = false;
  private timerIds: number[] = [];
  private currentVolume = 0.5;

  constructor() {}

  start(volume: number) {
    if (this.isPlaying) return;
    
    // Create AudioContext on user interaction
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioContextClass();
    this.masterGain = this.ctx.createGain();
    this.filterNode = this.ctx.createBiquadFilter();

    this.currentVolume = volume;
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(this.currentVolume * 0.4, this.ctx.currentTime + 3.0); // Fade in gently

    this.filterNode.type = "lowpass";
    this.filterNode.frequency.setValueAtTime(600, this.ctx.currentTime);

    // Connections
    this.filterNode.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);

    this.isPlaying = true;
    this.playLoop();
  }

  setVolume(volume: number) {
    this.currentVolume = volume;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(volume * 0.4, this.ctx.currentTime + 0.5);
    }
  }

  stop() {
    this.isPlaying = false;
    this.timerIds.forEach(id => clearTimeout(id));
    this.timerIds = [];

    if (this.masterGain && this.ctx) {
      const currentVal = this.masterGain.gain.value;
      this.masterGain.gain.setValueAtTime(currentVal, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.5); // Fade out gently
      
      const ctxToClose = this.ctx;
      setTimeout(() => {
        if (!this.isPlaying && ctxToClose.state !== "closed") {
          ctxToClose.close();
        }
      }, 1600);
    }
  }

  private playTone(freq: number, startTime: number, duration: number, type: OscillatorType = "sine", gainVal = 0.1) {
    if (!this.ctx || !this.filterNode || !this.isPlaying) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0, startTime);
    // Soft attack
    gain.gain.linearRampToValueAtTime(gainVal, startTime + duration * 0.3);
    // Exponential decay
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.filterNode);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  private playLoop = () => {
    if (!this.isPlaying || !this.ctx) return;

    // Ambient chord progression in C Major
    const progressions = [
      // Cmaj7 (C3, E3, G3, B3, E4)
      [130.81, 164.81, 196.00, 246.94, 329.63],
      // Fmaj7 (F3, A3, C4, E4, G4)
      [174.61, 220.00, 261.63, 329.63, 392.00],
      // Am7 (A2, C3, E3, G3, C4)
      [110.00, 130.81, 164.81, 196.00, 261.63],
      // G (G2, D3, G3, B3, D4)
      [98.00, 146.83, 196.00, 246.94, 293.66]
    ];

    let chordIndex = 0;

    const scheduleNextChord = () => {
      if (!this.isPlaying || !this.ctx) return;

      const chordNow = this.ctx.currentTime;
      const notes = progressions[chordIndex];

      // Play pad notes
      notes.forEach((freq, i) => {
        const delay = i * 0.15 + Math.random() * 0.1;
        this.playTone(freq, chordNow + delay, 9.5, "triangle", 0.08);
      });

      // Play recognizable Tamil melody ("Munbe Vaa" theme) in pentatonic bells
      // on Chords 1 and 3, and random sparkles on others
      if (chordIndex === 0 || chordIndex === 2) {
        const munbeVaaNotes = [
          659.25, // E5
          587.33, // D5
          523.25, // C5
          587.33, // D5
          659.25, // E5
          783.99, // G5
          880.00, // A5
          783.99, // G5
          659.25, // E5
          587.33, // D5
          523.25, // C5
          587.33, // D5
          523.25  // C5
        ];
        munbeVaaNotes.forEach((freq, idx) => {
          const noteTime = chordNow + 1.2 + idx * 0.48;
          this.playTone(freq, noteTime, 0.9, "sine", 0.035);
        });
      } else {
        const melodyPitches = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
        const randMelody1 = melodyPitches[Math.floor(Math.random() * melodyPitches.length)];
        const randMelody2 = melodyPitches[Math.floor(Math.random() * melodyPitches.length)];
        this.playTone(randMelody1, chordNow + 2.0 + Math.random(), 3.0, "sine", 0.03);
        this.playTone(randMelody2, chordNow + 5.0 + Math.random(), 2.5, "sine", 0.03);
      }

      chordIndex = (chordIndex + 1) % progressions.length;

      // Schedule next chord in 10 seconds
      const timeoutId = window.setTimeout(scheduleNextChord, 10000);
      this.timerIds.push(timeoutId);
    };

    scheduleNextChord();
  };
}

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const synthRef = useRef<AmbientSynth | null>(null);

  // Initialize synth and load volume preference
  useEffect(() => {
    const savedVolume = localStorage.getItem("birthday_vol");
    const savedMuted = localStorage.getItem("birthday_muted");

    if (savedVolume !== null) {
      setVolume(parseFloat(savedVolume));
    }
    if (savedMuted !== null) {
      setIsMuted(savedMuted === "true");
    }

    synthRef.current = new AmbientSynth();

    return () => {
      if (synthRef.current) {
        synthRef.current.stop();
      }
    };
  }, []);

  const handleTogglePlay = () => {
    if (!synthRef.current) return;

    if (isPlaying) {
      synthRef.current.stop();
      setIsPlaying(false);
    } else {
      const activeVolume = isMuted ? 0 : volume;
      synthRef.current.start(activeVolume);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    localStorage.setItem("birthday_vol", newVolume.toString());

    if (isPlaying && synthRef.current) {
      synthRef.current.setVolume(isMuted ? 0 : newVolume);
    }
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    localStorage.setItem("birthday_muted", nextMuted.toString());

    if (isPlaying && synthRef.current) {
      synthRef.current.setVolume(nextMuted ? 0 : volume);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-2.5 rounded-full glass-panel border border-rose-500/20 shadow-lg">
      <button
        onClick={handleTogglePlay}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 transition-colors focus:outline-none"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <Pause size={18} className="animate-pulse" />
        ) : (
          <Play size={18} className="translate-x-[1px]" />
        )}
      </button>

      {isPlaying && (
        <div className="flex items-center gap-2 animate-fade-in duration-300">
          <button
            onClick={handleToggleMute}
            className="text-rose-400 hover:text-rose-300 transition-colors focus:outline-none"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16 md:w-20 accent-rose-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer focus:outline-none"
            aria-label="Volume slider"
          />

          <span className="text-[10px] text-rose-400/80 font-mono flex items-center gap-1">
            <Music size={10} className="animate-spin" style={{ animationDuration: '4s' }} /> Munbe Vaa Theme
          </span>
        </div>
      )}
    </div>
  );
}
