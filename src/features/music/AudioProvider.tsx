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
// 言語を切り替えると [locale] のルートレイアウトごと作り直される。
// 再生を止めないよう、音声要素と選曲はモジュールに置いて次の Provider へ引き継ぐ。
// 音声は数 MB あるので、再生か位置の変更を頼まれるまで読み込まない(preload="none")
type SharedAudio = {
  element: HTMLAudioElement;
  trackIndex: number;
  selected: boolean;
};
let shared: SharedAudio | null = null;
const sharedAudio = (): SharedAudio => {
  if (!shared) {
    const element = new Audio();
    element.preload = "none";
    element.volume = 0.3;
    shared = { element, trackIndex: 0, selected: false };
  }
  return shared;
};
const finiteOr = (value: number | undefined, fallback: number) =>
  value !== undefined && Number.isFinite(value) ? value : fallback;
export default function AudioProvider({ children }: { children: ReactNode }) {
  const audio = useRef<HTMLAudioElement>(null);
  // 初回の読み込み(hydration)では shared が無いので、サーバーの描画と同じ初期値になる
  const [playing, setPlaying] = useState(() =>
    shared ? !shared.element.paused : false,
  );
  const [selected, setSelected] = useState(() => shared?.selected ?? false);
  const [current, setCurrent] = useState(() =>
    finiteOr(shared?.element.currentTime, 0),
  );
  const [duration, setDuration] = useState(() =>
    finiteOr(
      shared?.element.duration,
      (tracks[shared?.trackIndex ?? 0] ?? tracks[0]).duration,
    ),
  );
  const [error, setError] = useState(false);
  const [volume, updateVolume] = useState(() => shared?.element.volume ?? 0.3);
  const [muted, setMuted] = useState(() => shared?.element.muted ?? false);
  const [trackIndex, setTrackIndex] = useState(() => shared?.trackIndex ?? 0);
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
  useEffect(() => {
    const element = sharedAudio().element;
    audio.current = element;
    // 曲を差し替えた直後は長さが NaN になるので、分かっている長さを残す
    const syncDuration = () => {
      if (Number.isFinite(element.duration)) setDuration(element.duration);
    };
    const listeners: [keyof HTMLMediaElementEventMap, () => void][] = [
      ["play", () => setPlaying(true)],
      ["pause", () => setPlaying(false)],
      ["ended", () => setPlaying(false)],
      ["timeupdate", () => setCurrent(element.currentTime)],
      ["loadedmetadata", syncDuration],
      ["durationchange", syncDuration],
      [
        "error",
        () => {
          setError(true);
          setPlaying(false);
        },
      ],
    ];
    for (const [type, listener] of listeners)
      element.addEventListener(type, listener);
    // Metadata can arrive before the listeners are attached.
    if (Number.isFinite(element.duration)) setDuration(element.duration);
    return () => {
      for (const [type, listener] of listeners)
        element.removeEventListener(type, listener);
    };
  }, []);
  useEffect(() => {
    const state = sharedAudio();
    state.trackIndex = trackIndex;
    state.selected = selected;
  }, [trackIndex, selected]);
  // When the track changes via the list, start playback of the new source.
  useEffect(() => {
    const element = audio.current;
    if (!element || !autoplayOnChange.current) return;
    autoplayOnChange.current = false;
    element.src = track.src;
    setCurrent(0);
    setError(false);
    void element.play().catch(() => {
      setError(true);
      setPlaying(false);
    });
  }, [track.src]);
  // まだ読み込んでいなければ、今の曲を音声要素に渡す
  const loadTrack = (element: HTMLAudioElement) => {
    if (element.getAttribute("src") !== track.src) element.src = track.src;
  };
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
    loadTrack(element);
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
    setDuration(tracks[index].duration);
    setError(false);
    autoplayOnChange.current = true;
  };
  const seek = (time: number) => {
    const element = audio.current;
    if (!element || !Number.isFinite(duration) || duration <= 0) return;
    // 再生前に動かした位置は、読み込んだあとの再生開始位置になる
    loadTrack(element);
    const next = Math.min(duration, Math.max(0, time));
    element.currentTime = next;
    setCurrent(next);
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
    </AudioContext.Provider>
  );
}
