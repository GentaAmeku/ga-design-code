"use client";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { copy } from "@/features/content/copy";
import { tracks } from "@/features/content/data";
import type { LyricLine } from "@/lib/lrc";
import { parseLRC } from "@/lib/lrc";
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
      aria-label={`${player.playing ? t.pause : t.play}: ${player.track.title}`}
      title={`${player.playing ? t.playing : t.paused}: ${player.track.title}`}
    >
      <PlayingIcon playing={player.playing} />
      <span className="truncate">{player.track.title}</span>
    </button>
  );
}

export default function Player() {
  const player = useAudio();
  const t = copy[useLocale()];
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);

  const loadLRC = useCallback(async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) return;
      const text = await res.text();
      setLyrics(parseLRC(text));
    } catch {
      setLyrics([]);
    }
  }, []);

  useEffect(() => {
    if (player.track.lrcUrl) {
      loadLRC(player.track.lrcUrl);
    } else {
      setLyrics([]);
    }
  }, [player.track.lrcUrl, loadLRC]);

  const activeIndex = lyrics.findIndex((line, i) => {
    const next = lyrics[i + 1];
    return player.current >= line.time && (!next || player.current < next.time);
  });

  return (
    <div className="music-content">
      <div className="music-row">
        <div className="music-art">
          <Image
            key={player.track.id}
            src={player.track.artwork}
            alt={`${player.track.title} artwork`}
            fill
            sizes="200px"
            className="object-cover"
            priority
          />
        </div>
        <div className="music-controls">
          <h3 className="text-xl font-semibold">
            <span className="marker-line">{player.track.title}</span>
          </h3>
          {player.track.special && (
            <p className="special-note mt-3">{t.seasonalSpecial}</p>
          )}
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
          {lyrics.length > 0 && (
            <div className="lyrics-volume-row">
              <div className="lyrics">
                <div
                  className="lyrics-track"
                  style={{
                    transform: `translateY(${(1 - Math.max(0, activeIndex)) * 28}px)`,
                  }}
                >
                  {lyrics.map((line, index) => (
                    <p
                      key={line.time}
                      className="lyrics-line"
                      data-active={index === activeIndex}
                    >
                      {line.text}
                    </p>
                  ))}
                </div>
              </div>
              <div className="volume-controls">
                <button
                  type="button"
                  className="icon-link"
                  onClick={player.toggleMute}
                  aria-label={player.muted ? t.unmute : t.mute}
                  aria-pressed={player.muted}
                >
                  {player.muted || player.volume === 0 ? (
                    <VolumeX size={20} />
                  ) : (
                    <Volume2 size={20} />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={Math.round(player.volume * 100)}
                  aria-label={t.volume}
                  aria-valuetext={`${Math.round(player.volume * 100)}%`}
                  onChange={(event) =>
                    player.setVolume(Number(event.target.value) / 100)
                  }
                />
                <span className="playback-time">
                  {player.muted ? 0 : Math.round(player.volume * 100)}%
                </span>
              </div>
            </div>
          )}
          {lyrics.length === 0 && player.track.intro && (
            <div className="lyrics-volume-row">
              <div className="track-intro">
                <p className="track-intro-bpm">{player.track.intro}</p>
              </div>
              <div className="volume-controls">
                <button
                  type="button"
                  className="icon-link"
                  onClick={player.toggleMute}
                  aria-label={player.muted ? t.unmute : t.mute}
                  aria-pressed={player.muted}
                >
                  {player.muted || player.volume === 0 ? (
                    <VolumeX size={20} />
                  ) : (
                    <Volume2 size={20} />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={Math.round(player.volume * 100)}
                  aria-label={t.volume}
                  aria-valuetext={`${Math.round(player.volume * 100)}%`}
                  onChange={(event) =>
                    player.setVolume(Number(event.target.value) / 100)
                  }
                />
                <span className="playback-time">
                  {player.muted ? 0 : Math.round(player.volume * 100)}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <ul className="track-list" aria-label={t.trackList}>
        {tracks.map((track, index) => {
          const isCurrent = index === player.trackIndex;
          return (
            <li key={track.id}>
              <button
                type="button"
                className="track-item"
                data-current={isCurrent}
                aria-current={isCurrent}
                aria-label={`${t.selectTrack}: ${track.title}`}
                onClick={() => player.selectTrack(index)}
              >
                <span className="track-thumb">
                  <Image
                    src={track.artwork}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </span>
                <span className="track-title">{track.title}</span>
                {track.special && (
                  <span className="special-note">{t.seasonalSpecial}</span>
                )}
                {isCurrent && player.selected && (
                  <PlayingIcon playing={player.playing} />
                )}
              </button>
            </li>
          );
        })}
      </ul>
      <p role="status" className="text-sm mt-2 min-h-5">
        {player.error ? t.audioError : ""}
      </p>
    </div>
  );
}
