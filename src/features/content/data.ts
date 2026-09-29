export type Track = {
  id: string;
  title: string;
  src: string;
  artwork: string;
  // 秒。音声は再生を押すまで読み込まないので、再生前の長さの表示にはこの値を使う
  duration: number;
  special?: boolean;
  lrcUrl?: string;
  intro?: string;
};
// Set an approved address here; never use a placeholder as a real mail destination.
export const contactEmail: string | null = "genta.ameku.work@gmail.com";

// Display order: Fairies on the Line, Welcome to the Orendel, Amber Hour, Summer Timer (seasonal special last).
export const tracks: Track[] = [
  {
    id: "fairies-on-the-line",
    title: "Fairies on the Line",
    src: "/audio/fairies-on-the-line.mp3",
    duration: 149.52,
    artwork: "/images/music/fairies-on-the-line.png",
    intro: "112 BPM / Flute, Pizzicato Strings, Electric Piano, Synth Bass",
  },
  {
    id: "welcome-to-the-orendel",
    title: "Welcome to the Orendel",
    src: "/audio/welcome-to-the-orendel.mp3",
    duration: 139.2,
    artwork: "/images/music/welcome-to-the-orendel.png",
    intro:
      "102 BPM / Tin Whistle, Wooden Flute, Strings, Harp, Acoustic Guitar",
  },
  {
    id: "amber-hour",
    title: "Amber Hour",
    src: "/audio/amber-hour.mp3",
    duration: 183.648,
    artwork: "/images/music/amber-hour.jpeg",
    intro:
      "90 BPM / Felt Piano, Wooden Flute, Pizzicato Strings, Electric Piano, Acoustic Bass",
  },
  {
    id: "summer-timer",
    title: "Summer Timer",
    src: "/audio/summer-timer.mp3",
    duration: 193.704,
    artwork: "/images/music/summer-timer.png",
    special: true,
    lrcUrl: "/audio/summer-timer.lrc",
  },
];
