import type { Metadata } from "next";
import NotFound from "@/components/NotFound";
import SiteShell from "@/components/SiteShell";
import { SITE_NAME } from "@/constants/site";
import "@/styles/global.css";

export const metadata: Metadata = {
  title: `404 | ${SITE_NAME}`,
  robots: { index: false },
};

// どのルートにも当たらない URL の 404。ルートレイアウトが [locale] にあるため、骨格ごと描く
export default function GlobalNotFound() {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <SiteShell>
          <NotFound />
        </SiteShell>
      </body>
    </html>
  );
}
