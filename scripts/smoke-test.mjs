import assert from "node:assert/strict";

const origin = process.argv[2] ?? "http://localhost:3100";
assert.ok(
  ["localhost", "127.0.0.1"].includes(new URL(origin).hostname),
  "Use a local production server",
);
const home = await fetch(origin, { redirect: "manual" });
assert.equal(home.status, 308);
assert.equal(new URL(home.headers.get("location"), origin).pathname, "/ja");

const seoFiles = await Promise.all(
  [
    "/robots.txt",
    "/sitemap.xml",
    "/llms.txt",
    "/ja/feed.xml",
    "/en/feed.xml",
  ].map(async (path) => {
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
for (const locale of ["ja", "en"]) {
  const feed = seoContent[`/${locale}/feed.xml`];
  assert.match(
    seoContentTypes[`/${locale}/feed.xml`],
    /^application\/rss\+xml/,
  );
  assert.match(
    feed,
    /^<\?xml version="1\.0" encoding="UTF-8"\?>\n<rss version="2\.0"/,
  );
  assert.ok(
    feed.includes(
      `<link>https://www.genta-ameku.com/${locale}/blog/ai-driven-workflow</link>`,
    ),
    `${locale} feed item`,
  );
  assert.match(feed, /<pubDate>[A-Z][a-z]{2}, \d{2} [A-Z][a-z]{2} \d{4}/);
}
assert.match(
  seoContent["/sitemap.xml"],
  /hreflang="x-default" href="https:\/\/www\.genta-ameku\.com\/ja\/blog\/ai-driven-workflow"/,
);
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
  for (const path of [
    "/sitemap.xml",
    "/llms.txt",
    "/ja/feed.xml",
    "/en/feed.xml",
  ])
    assert.doesNotMatch(
      seoContent[path],
      new RegExp(draft),
      `${draft} in ${path}`,
    );
}
assert.doesNotMatch(seoContent["/sitemap.xml"], /<loc>[^<]*\?/);
for (const locale of ["ja", "en"]) {
  for (const path of ["", "/career", "/blog", "/blog/ai-driven-workflow"]) {
    const response = await fetch(`${origin}/${locale}${path}`);
    assert.equal(response.status, 200, `${locale}${path}`);
    const html = await response.text();
    assert.match(html, new RegExp(`<html[^>]+lang="${locale}"`));
    // 題・説明・canonical・hreflang・RSS は、JS を実行しない取得でも読める <head> に置く
    const head = html.slice(0, html.indexOf("</head>"));
    for (const tag of [
      /<title>/,
      /<meta name="description"/,
      /<link rel="canonical"/,
      /<link rel="alternate" hrefLang="x-default"/,
      /<link rel="alternate" type="application\/rss\+xml"/,
      /<meta property="og:site_name" content="G\.A Design &amp; Code"\/>/,
    ])
      assert.match(head, tag, `${locale}${path} ${tag}`);
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
      assert.match(head, /<title>Genta Ameku — /);
      const homeJsonLd = JSON.parse(
        html.match(
          /<script type="application\/ld\+json">([^<]+)<\/script>/,
        )?.[1],
      );
      const types = homeJsonLd["@graph"].map((node) => node["@type"]);
      assert.deepEqual(types, ["WebSite", "Person", "ProfilePage"]);
      const person = homeJsonLd["@graph"][1];
      assert.equal(person.name, "Genta Ameku");
      assert.ok(person.sameAs.includes("https://github.com/GentaAmeku"));
    }
    if (path === "/blog") {
      assert.match(html, /<h1>Blog<\/h1>/);
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
      assert.equal(jsonLd.datePublished, "2026-09-18");
      assert.ok(jsonLd.author.sameAs.includes("https://github.com/GentaAmeku"));
      assert.equal(jsonLd.publisher.name, "Genta Ameku");
      assert.match(
        head,
        /<meta property="article:published_time" content="2026-09-18"\/>/,
      );
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
  "PASS: SEO files, RSS feeds, metadata in <head>, JSON-LD, locale redirects, 8 localized pages, 7 missing or draft routes, no forms, audio range delivery",
);
