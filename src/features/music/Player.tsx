"use client";
import { Pause, Play } from "lucide-react";
import { copy } from "@/features/content/copy";
import { previewTrack } from "@/features/content/data";
import { useLocale } from "@/lib/useLocale";
import { useAudio } from "./AudioProvider";
export const formatTime = (seconds: number) => {
  const value = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
};
export function PlayingIcon({ playing }: { playing: boolean }) {
  return (
    <span className="playing-icon" data-playing={playing} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}
export function HeaderPlayer() {
  const player = useAudio();
  const t = copy[useLocale()];
  if (!player.selected) return null;
  return (
    <button
      type="button"
      className="header-player"
      onClick={player.toggle}
      aria-label={`${player.playing ? t.pause : t.play}: ${previewTrack.title}`}
      title={`${player.playing ? t.playing : t.paused}: ${previewTrack.title}`}
    >
      <PlayingIcon playing={player.playing} />
      <span className="truncate">{previewTrack.title}</span>
    </button>
  );
}
export default function Player() {
  const player = useAudio();
  const t = copy[useLocale()];
  return (
    <div className="music-content">
      <div className="music-row">
        <div className="record-art" role="img" aria-label={t.artNote}>
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="music-controls">
          <h3 className="text-xl font-semibold">{previewTrack.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{t.trackNote}</p>
          <div className="playback-row">
            <button
              type="button"
              className="play-button"
              onClick={player.toggle}
              aria-label={player.playing ? t.pause : t.play}
            >
              {player.playing ? (
                <Pause size={20} fill="currentColor" />
              ) : (
                <Play size={20} fill="currentColor" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={player.duration || 0}
              step={0.1}
              value={player.current}
              disabled={!player.duration}
              aria-label={t.seek}
              aria-valuetext={`${formatTime(player.current)} / ${formatTime(player.duration)}`}
              onChange={(event) => player.seek(Number(event.target.value))}
            />
            <span className="playback-time">
              {formatTime(player.current)} / {formatTime(player.duration)}
            </span>
          </div>
        </div>
      </div>
      <p className="sample-note mt-5">{t.artNote}</p>
      <p role="status" className="text-sm mt-2 min-h-5">
        {player.error ? t.audioError : ""}
      </p>
    </div>
  );
}
