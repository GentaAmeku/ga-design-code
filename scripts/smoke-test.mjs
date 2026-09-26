import assert from "node:assert/strict";

const origin = process.argv[2] ?? "http://localhost:3100";
assert.ok(
  ["localhost", "127.0.0.1"].includes(new URL(origin).hostname),
  "Use a local production server",
);
const home = await fetch(origin, { redirect: "manual" });
assert.equal(home.status, 307);
assert.equal(new URL(home.headers.get("location"), origin).pathname, "/ja");

const seoFiles = await Promise.all(
  ["/robots.txt", "/sitemap.xml", "/llms.txt"].map(async (path) => {
    const response = await fetch(origin + path, { redirect: "manual" });
    assert.equal(response.status, 200, path);
    assert.equal(response.headers.get("location"), null, `${path} redirect`);
    return [path, response.headers.get("content-type"), await response.text()];
  }),
);
const seoContent = Object.fromEntries(
  seoFiles.map(([path, _contentType, content]) => [path, content]),
);
const seoContentTypes = Object.fromEntries(
  seoFiles.map(([path, contentType]) => [path, contentType]),
);
assert.match(seoContentTypes["/robots.txt"], /^text\/plain/);
assert.match(seoContentTypes["/sitemap.xml"], /^application\/xml/);
assert.match(seoContentTypes["/llms.txt"], /^text\/plain; charset=utf-8/);
assert.match(
  seoContent["/robots.txt"],
  /Sitemap: https:\/\/www\.genta-ameku\.com\/sitemap\.xml/,
);

for (const locale of ["ja", "en"]) {
  for (const path of ["", "/career", "/blog", "/blog/ai-driven-workflow"]) {
    const url = `https://www.genta-ameku.com/${locale}${path}`;
    assert.ok(seoContent["/sitemap.xml"].includes(`<loc>${url}</loc>`), url);
  }
  assert.ok(
    seoContent["/llms.txt"].includes(
      `https://www.genta-ameku.com/${locale}/blog/ai-driven-workflow`,
    ),
    `${locale} article in llms.txt`,
  );
}
for (const draft of ["ai-deck-studio", "ai-animation-with-dreamina"]) {
  assert.doesNotMatch(seoContent["/sitemap.xml"], new RegExp(draft));
  assert.doesNotMatch(seoContent["/llms.txt"], new RegExp(draft));
}
assert.doesNotMatch(seoContent["/sitemap.xml"], /<loc>[^<]*\?/);
for (const locale of ["ja", "en"]) {
  for (const path of ["", "/career", "/blog", "/blog/ai-driven-workflow"]) {
    const response = await fetch(`${origin}/${locale}${path}`);
    assert.equal(response.status, 200, `${locale}${path}`);
    const html = await response.text();
    assert.match(html, new RegExp(`<html[^>]+lang="${locale}"`));
    assert.doesNotMatch(html, /<form(?:\s|>)/);
    assert.doesNotMatch(html, /Let me introduce my favorite games/);
    if (!path) {
      for (const id of [
        "landing",
        "about",
        "career",
        "skills",
        "blog",
        "music",
        "contact",
      ])
        assert.ok(html.includes(`id="${id}"`), id);
      assert.ok(
        html.includes(
          locale === "ja"
            ? "AIを使って制作した楽曲の紹介です。よかったら聴いていってください"
            : "Music I’ve made. Stay a while and have a listen.",
        ),
      );
      assert.ok(html.includes("2026-09-18"));
      assert.doesNotMatch(
        html,
        /AIが作る資料に|Why AI-generated decks need|日本のアニメらしい映像|Japanese-anime-style video/,
      );
    }
    if (path === "/blog") {
      assert.ok(html.includes("2026-09-18"));
      assert.doesNotMatch(
        html,
        /AIが作る資料に|Why AI-generated decks need|日本のアニメらしい映像|Japanese-anime-style video/,
      );
    }
    if (path.includes("ai-driven-workflow")) {
      assert.doesNotMatch(html, /noindex/);
      assert.match(html, /<meta property="og:type" content="article"\/>/);
      assert.match(
        html,
        new RegExp(
          `<link rel="canonical" href="https://www\\.genta-ameku\\.com/${locale}/blog/ai-driven-workflow"`,
        ),
      );
      assert.match(html, /<meta name="author" content="Genta Ameku"\/>/);
      assert.ok(html.includes(locale === "ja" ? "著者" : "Author"));
      assert.ok(html.includes(`<a href="/${locale}#about">Genta Ameku</a>`));
      assert.ok(html.includes(locale === "ja" ? "作成日" : "Created"));
      assert.ok(html.includes(locale === "ja" ? "最終更新日" : "Last updated"));
      assert.ok(
        html.includes(
          locale === "ja"
            ? "日々の仕事で感じていた負担"
            : "The burden of managing daily work",
        ),
      );
      const jsonLdSource = html.match(
        /<script type="application\/ld\+json">([^<]+)<\/script>/,
      )?.[1];
      assert.ok(jsonLdSource, `${locale} JSON-LD`);
      const jsonLd = JSON.parse(jsonLdSource);
      assert.equal(jsonLd["@type"], "BlogPosting");
      assert.equal(jsonLd.author.name, "Genta Ameku");
      assert.equal(jsonLd.inLanguage, locale);
      assert.equal(jsonLd.dateModified, "2026-09-18");
      assert.equal("datePublished" in jsonLd, false);
      assert.equal(
        jsonLd.url,
        `https://www.genta-ameku.com/${locale}/blog/ai-driven-workflow`,
      );
    }
  }
}
// 書き手向けの HTML コメントを本文に出さない
for (const locale of ["ja", "en"]) {
  const html = await (
    await fetch(`${origin}/${locale}/blog/ai-handout-studio`)
  ).text();
  assert.doesNotMatch(html, /&lt;!--/, `${locale} article comment`);
}
for (const path of [
  "/preview",
  "/fr",
  "/ja/blog/not-an-article",
  "/ja/blog/ai-deck-studio",
  "/en/blog/ai-deck-studio",
  "/ja/blog/ai-animation-with-dreamina",
  "/en/blog/ai-animation-with-dreamina",
]) {
  const response = await fetch(origin + path);
  assert.equal(response.status, 404, path);
}
for (const track of [
  "fairies-on-the-line",
  "welcome-to-the-orendel",
  "amber-hour",
  "summer-timer",
]) {
  const audio = await fetch(`${origin}/audio/${track}.mp3`, {
    headers: { Range: "bytes=0-3" },
  });
  assert.equal(audio.status, 206, track);
  const bytes = Buffer.from(await audio.arrayBuffer());
  assert.equal(bytes.toString("ascii", 0, 3), "ID3", track);
  const artwork = await fetch(`${origin}/images/music/${track}.jpeg`);
  assert.equal(artwork.status, 200, track);
}
console.log(
  "PASS: SEO files, metadata, JSON-LD, locale redirects, 8 localized pages, 7 missing or draft routes, no forms, audio range delivery",
);
