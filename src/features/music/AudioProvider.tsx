"use client";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { tracks } from "@/features/content/data";

type AudioState = {
  playing: boolean;
  selected: boolean;
  current: number;
  duration: number;
  error: boolean;
  volume: number;
  muted: boolean;
  trackIndex: number;
  track: (typeof tracks)[number];
  selectTrack: (index: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
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
  const [volume, updateVolume] = useState(0.3);
  const [muted, setMuted] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const autoplayOnChange = useRef(false);
  const track = tracks[trackIndex] ?? tracks[0];
  const setVolume = (value: number) => {
    if (!Number.isFinite(value)) return;
    const next = Math.min(1, Math.max(0, value));
    if (audio.current) {
      audio.current.volume = next;
      audio.current.muted = false;
    }
    updateVolume(next);
    setMuted(false);
  };
  const toggleMute = () => {
    if (audio.current) audio.current.muted = !muted;
    setMuted(!muted);
  };
  // Metadata can arrive before React attaches media handlers during hydration.
  useEffect(() => {
    const element = audio.current;
    if (element) element.volume = 0.3;
    if (element && Number.isFinite(element.duration))
      setDuration(element.duration);
  }, []);
  // When the track changes via the list, start playback of the new source.
  // biome-ignore lint/correctness/useExhaustiveDependencies: playback must restart when the track source changes
  useEffect(() => {
    const element = audio.current;
    if (!element || !autoplayOnChange.current) return;
    autoplayOnChange.current = false;
    setCurrent(0);
    setError(false);
    void element.play().catch(() => {
      setError(true);
      setPlaying(false);
    });
  }, [track.src]);
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
  const selectTrack = (index: number) => {
    if (!Number.isInteger(index) || index < 0 || index >= tracks.length) return;
    if (index === trackIndex) {
      toggle();
      return;
    }
    setTrackIndex(index);
    setSelected(true);
    setCurrent(0);
    setDuration(0);
    setError(false);
    autoplayOnChange.current = true;
  };
  const seek = (time: number) => {
    if (!audio.current || !Number.isFinite(duration) || duration <= 0) return;
    audio.current.currentTime = Math.min(duration, Math.max(0, time));
    setCurrent(audio.current.currentTime);
  };
  return (
    <AudioContext.Provider
      value={{
        playing,
        selected,
        current,
        duration,
        error,
        toggle,
        seek,
        volume,
        muted,
        setVolume,
        toggleMute,
        trackIndex,
        track,
        selectTrack,
      }}
    >
      {children}
      {/* Original instrumental tracks: no speech or lyric captions are needed. */}
      {/* biome-ignore lint/a11y/useMediaCaption: instrumental audio has no speech */}
      <audio
        ref={audio}
        src={track.src}
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
