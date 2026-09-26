interface ArticleVideoProps {
  src: string;
  label?: string;
  loop?: boolean;
}

const videoPattern = /\.mp4$/i;

export const isVideoSrc = (src: unknown): src is string =>
  typeof src === "string" && videoPattern.test(src);

// 本文の ![説明](/videos/xxx.mp4) を動画にする。同じ場所の xxx.jpg を先頭の絵に使う。
// タイトルに "loop" を書くと、GIF のように無音で自動再生を繰り返す
export default function ArticleVideo({ src, label, loop }: ArticleVideoProps) {
  return (
    <video
      className="article-video"
      src={src}
      poster={src.replace(videoPattern, ".jpg")}
      aria-label={label || undefined}
      controls
      playsInline
      preload={loop ? "auto" : "metadata"}
      autoPlay={loop}
      muted={loop}
      loop={loop}
    />
  );
}
