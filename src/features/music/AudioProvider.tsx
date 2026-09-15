"use client";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { previewTrack } from "@/features/content/data";

type AudioState = {
  playing: boolean;
  selected: boolean;
  current: number;
  duration: number;
  error: boolean;
  toggle: () => void;
  seek: (time: number) => void;
};
const AudioContext = createContext<AudioState | null>(null);
export const useAudio = () => {
  const state = useContext(AudioContext);
  if (!state) throw new Error("AudioProvider is required");
  return state;
};
export default function AudioProvider({ children }: { children: ReactNode }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);
  // Metadata can arrive before React attaches media handlers during hydration.
  useEffect(() => {
    const element = audio.current;
    if (element && Number.isFinite(element.duration))
      setDuration(element.duration);
  }, []);
  const toggle = () => {
    const element = audio.current;
    if (!element) return;
    if (!element.paused) {
      element.pause();
      return;
    }
    setSelected(true);
    setError(false);
    if (element.error) element.load();
    void element.play().catch(() => {
      setError(true);
      setPlaying(false);
    });
  };
  const seek = (time: number) => {
    if (!audio.current || !Number.isFinite(duration) || duration <= 0) return;
    audio.current.currentTime = Math.min(duration, Math.max(0, time));
    setCurrent(audio.current.currentTime);
  };
  return (
    <AudioContext.Provider
      value={{ playing, selected, current, duration, error, toggle, seek }}
    >
      {children}
      {/* Synthetic instrumental preview: no speech or lyric captions are needed. */}
      {/* biome-ignore lint/a11y/useMediaCaption: instrumental test audio has no speech */}
      <audio
        ref={audio}
        src={previewTrack.src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(event) => setCurrent(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onError={() => {
          setError(true);
          setPlaying(false);
        }}
      />
    </AudioContext.Provider>
  );
}
