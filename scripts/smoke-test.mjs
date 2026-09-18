import assert from "node:assert/strict";

const origin = process.argv[2] ?? "http://localhost:3100";
assert.ok(
  ["localhost", "127.0.0.1"].includes(new URL(origin).hostname),
  "Use a local production server",
);
const home = await fetch(origin, { redirect: "manual" });
assert.equal(home.status, 307);
assert.equal(new URL(home.headers.get("location"), origin).pathname, "/ja");
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
        /AIが作る資料に|Why AI-generated decks need|1枚のキャラクター資料|From one character sheet/,
      );
    }
    if (path === "/blog") {
      assert.ok(html.includes("2026-09-18"));
      assert.doesNotMatch(
        html,
        /AIが作る資料に|Why AI-generated decks need|1枚のキャラクター資料|From one character sheet/,
      );
    }
    if (path.includes("ai-driven-workflow")) {
      assert.doesNotMatch(html, /noindex/);
      assert.ok(html.includes(locale === "ja" ? "作成日" : "Created"));
      assert.ok(html.includes(locale === "ja" ? "最終更新日" : "Last updated"));
      assert.ok(
        html.includes(
          locale === "ja"
            ? "日々の仕事で感じていた負担"
            : "The burden of managing daily work",
        ),
      );
    }
  }
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
  "PASS: locale redirects, 8 localized pages, 7 missing or draft routes, no forms, audio range delivery",
);
