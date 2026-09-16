"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { copy } from "@/features/content/copy";
import { HeaderPlayer } from "@/features/music/Player";
import { localizePath } from "@/lib/locale";
import { useLocale } from "@/lib/useLocale";
import CustomizeMenu from "./components/CustomizeMenu";
import GithubLink from "./components/GithubLink";
export default function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const fromHome = useSearchParams().get("from") === "home";
  const sourceQuery = fromHome ? "?from=home" : "";
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return (
    <>
      <a className="skip-link" href="#main-content">
        {copy[locale].skip}
      </a>
      <header className="site-header">
        <div className="header-inner">
          <HeaderPlayer />
          <nav aria-label="Language" className="language-toggle">
            <Link
              href={localizePath(pathname, "ja") + sourceQuery}
              scroll={false}
              hrefLang="ja"
              lang="ja"
              aria-current={locale === "ja" ? "page" : undefined}
            >
              JA
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={localizePath(pathname, "en") + sourceQuery}
              scroll={false}
              hrefLang="en"
              lang="en"
              aria-current={locale === "en" ? "page" : undefined}
            >
              EN
            </Link>
          </nav>
          <CustomizeMenu />
          <GithubLink />
        </div>
      </header>
    </>
  );
}
