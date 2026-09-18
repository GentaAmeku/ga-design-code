export type LyricLine = {
  time: number;
  text: string;
};

export function parseLRC(lrc: string): LyricLine[] {
  const lines = lrc.split("\n");
  const result: LyricLine[] = [];
  const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

  for (const line of lines) {
    const match = line.match(timeRegex);
    if (!match) continue;

    const minutes = Number.parseInt(match[1], 10);
    const seconds = Number.parseInt(match[2], 10);
    let centiseconds = Number.parseInt(match[3], 10);
    if (match[3].length === 2) centiseconds *= 10;

    const time = minutes * 60 + seconds + centiseconds / 1000;
    const text = line.replace(timeRegex, "").trim();
    if (text) result.push({ time, text });
  }

  return result.sort((a, b) => a.time - b.time);
}

export function formatTimeToLRC(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 100);
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;
}

export function linesToLRC(lines: LyricLine[]): string {
  return lines
    .map((line) => `[${formatTimeToLRC(line.time)}]${line.text}`)
    .join("\n");
}
