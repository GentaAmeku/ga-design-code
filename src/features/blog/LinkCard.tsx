import type { LinkCard as LinkCardData } from "@/features/blog/link-cards";

interface LinkCardProps {
  card: LinkCardData;
}

// 本文に貼った URL を、題名・説明・画像・サイト名のカードで描く
export default function LinkCard({ card }: LinkCardProps) {
  return (
    <a
      className="link-card"
      href={card.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="link-card-body">
        <span className="link-card-title">{card.title}</span>
        {card.description ? (
          <span className="link-card-description">{card.description}</span>
        ) : null}
        <span className="link-card-site">{card.siteName}</span>
      </span>
      {card.image ? (
        <span className="link-card-image">
          {/* biome-ignore lint/performance/noImgElement: OGP 画像は外部ドメインで、寸法も事前に分からない */}
          <img src={card.image} alt="" loading="lazy" />
        </span>
      ) : null}
    </a>
  );
}
