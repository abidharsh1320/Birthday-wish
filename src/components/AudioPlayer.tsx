"use client";

import React, { useEffect, useRef, useState } from "react";
import { Music, Play, Pause, Volume2, VolumeX, ListMusic } from "lucide-react";
import { motion } from "framer-motion";

interface Track {
  id: string;
  name: string;
  url: string;
  description: string;
}

const TRACKS: Track[] = [
  {
    id: "bombay",
    name: "Bombay Theme BGM",
    url: "https://archive.org/download/BombayThemeTune/Bombay_Theme_Tune.mp3",
    description: "A.R. Rahman - Flute & Violin"
  },
  {
    id: "newyork",
    name: "New York Nagaram",
    url: "https://archive.org/download/NewYorkNagaramSillunuOruKadhal/New%20York%20Nagaram%20-%20Sillunu%20Oru%20Kadhal.mp3",
    description: "A.R. Rahman - Sillunu Oru Kadhal"
  },
  {
    id: "malare",
    name: "Malare Ninne BGM",
    url: "https://archive.org/download/PremamMalareNinneKanathirunnalSongFullKaraokeOriginal/Premam%20-%20Malare%20Ninne%20Kanathirunnal%20song%20Full%20Karaoke%20Original.mp3",
    description: "Premam - Acoustic Instrumental"
  }
];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [notes, setNotes] = useState<{ id: number; left: number }[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load preferences on mount
  useEffect(() => {
    const savedVolume = localStorage.getItem("birthday_vol");
    const savedMuted = localStorage.getItem("birthday_muted");
    const savedTrackId = localStorage.getItem("birthday_track_id");

    if (savedVolume !== null) {
      setVolume(parseFloat(savedVolume));
    }
    if (savedMuted !== null) {
      setIsMuted(savedMuted === "true");
    }
    if (savedTrackId !== null) {
      const idx = TRACKS.findIndex(t => t.id === savedTrackId);
      if (idx !== -1) {
        setCurrentTrackIndex(idx);
      }
    }
  }, []);

  // Sync volume & mute states to Audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Generate floating music notes when playing
  useEffect(() => {
    if (!isPlaying) {
      setNotes([]);
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      setNotes((prev) => [
        ...prev.filter(n => now - n.id < 2500),
        { id: now, left: Math.random() * 120 + 20 },
      ]);
    }, 700);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handle track changing with smooth volume fade-in
  useEffect(() => {
    // Save selection
    localStorage.setItem("birthday_track_id", TRACKS[currentTrackIndex].id);

    const wasPlaying = isPlaying;
    
    // Stop old audio if any
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Initialize new audio
    const audio = new Audio(TRACKS[currentTrackIndex].url);
    audio.loop = true;
    audio.volume = 0; // Start at 0 for fade-in
    audioRef.current = audio;

    let fadeInterval: ReturnType<typeof setInterval>;

    if (wasPlaying) {
      audio.play().then(() => {
        // Fade in volume over 1.5s (30 steps, 50ms each)
        let currentVol = 0;
        const targetVol = isMuted ? 0 : volume;
        const step = targetVol / 30;

        fadeInterval = setInterval(() => {
          if (audioRef.current && currentVol < targetVol) {
            currentVol = Math.min(targetVol, currentVol + step);
            audioRef.current.volume = currentVol;
          } else {
            clearInterval(fadeInterval);
          }
        }, 50);
      }).catch(err => {
        console.error("Autoplay failed on track change:", err);
        setIsPlaying(false);
      });
    }

    return () => {
      audio.pause();
      if (fadeInterval) clearInterval(fadeInterval);
    };
  }, [currentTrackIndex]);

  const handleTogglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Playback failed:", err);
      });
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    localStorage.setItem("birthday_vol", newVolume.toString());
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    localStorage.setItem("birthday_muted", nextMuted.toString());
  };

  const handleSelectTrack = (idx: number) => {
    setCurrentTrackIndex(idx);
    setShowPlaylist(false);
  };

  const currentTrack = TRACKS[currentTrackIndex];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Floating Music Notes */}
      {isPlaying &&
        notes.map((note) => (
          <motion.span
            key={note.id}
            initial={{ y: 0, opacity: 0, scale: 0.5 }}
            animate={{
              y: -80,
              opacity: [0, 0.9, 0.9, 0],
              scale: [0.6, 1.2, 1.2, 0.8],
              x: [0, (note.id % 2 === 0 ? 15 : -15), 0],
            }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            className="absolute text-rose-300 pointer-events-none select-none text-[11px] font-bold z-10"
            style={{
              right: `${note.left}px`,
              bottom: "45px",
              textShadow: "0 0 8px rgba(244, 63, 94, 0.6)",
            }}
          >
            {["♪", "♫", "♬", "♩"][Math.floor(note.id % 4)]}
          </motion.span>
        ))}

      {/* Playlist Dropdown */}
      {showPlaylist && (
        <div className="w-64 p-3 rounded-2xl glass-panel border border-rose-500/20 shadow-xl animate-fade-in duration-200 mb-2">
          <div className="text-xs font-semibold text-rose-300/80 mb-2 px-1">Choose Romantic Track</div>
          <div className="flex flex-col gap-1">
            {TRACKS.map((track, idx) => (
              <button
                key={track.id}
                onClick={() => handleSelectTrack(idx)}
                className={`w-full text-left p-2 rounded-xl text-xs transition-colors flex flex-col ${
                  idx === currentTrackIndex
                    ? "bg-rose-500/20 text-rose-200 border border-rose-500/30"
                    : "hover:bg-white/5 text-rose-300/70"
                }`}
              >
                <span className="font-medium">{track.name}</span>
                <span className="text-[10px] opacity-75">{track.description}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Player Bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-full glass-panel border border-rose-500/20 shadow-lg">
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

        <div className="flex items-center gap-2">
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

          <span className="text-[10px] text-rose-400/80 font-mono flex items-center gap-1 max-w-[120px] truncate">
            <Music size={10} className={isPlaying ? "animate-spin" : ""} style={{ animationDuration: '4s' }} />
            {currentTrack.name}
          </span>

          <button
            onClick={() => setShowPlaylist(!showPlaylist)}
            className={`p-1.5 rounded-full hover:bg-white/5 transition-colors focus:outline-none ${
              showPlaylist ? "text-rose-300" : "text-rose-400"
            }`}
            aria-label="Toggle playlist"
          >
            <ListMusic size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
