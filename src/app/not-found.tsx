"use client";
import Link from "next/link";
import { copy } from "@/features/content/copy";
import { useLocale } from "@/lib/useLocale";
export default function NotFound() {
  const locale = useLocale();
  const t = copy[locale];
  return (
    <div className="reading-page text-center">
      <h1>404</h1>
      <p className="my-8">{t.missing}</p>
      <Link className="text-link" href={`/${locale}`}>
        {t.backHome}
      </Link>
    </div>
  );
}
