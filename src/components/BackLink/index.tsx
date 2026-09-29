"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { copy } from "@/features/content/copy";
import type { Locale } from "@/lib/locale";

interface BackLinkProps {
  locale: Locale;
  className?: string;
}

function BackLinkTo({
  locale,
  className,
  fromHome,
}: BackLinkProps & { fromHome: boolean }) {
  const t = copy[locale];
  return (
    <Link
      className={className}
      href={fromHome ? `/${locale}#blog` : `/${locale}/blog`}
    >
      ← {fromHome ? t.backHome : t.backWriting}
    </Link>
  );
}

function BackLinkFromQuery(props: BackLinkProps) {
  const fromHome = useSearchParams().get("from") === "home";
  return <BackLinkTo {...props} fromHome={fromHome} />;
}

// 記事の戻り先。トップから来たときはトップの Blog 節、それ以外は記事一覧。
// 静的な HTML には一覧への戻りを出し、表示後にクエリを見て切り替える
export default function BackLink(props: BackLinkProps) {
  return (
    <Suspense fallback={<BackLinkTo {...props} fromHome={false} />}>
      <BackLinkFromQuery {...props} />
    </Suspense>
  );
}
