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
  for (const path of ["", "/career", "/writing", "/writing/creating-with-ai"]) {
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
        "writing",
        "music",
        "contact",
      ])
        assert.ok(html.includes(`id="${id}"`), id);
      assert.ok(
        html.includes(
          locale === "ja"
            ? "日々に、音を添える。"
            : "A soundtrack for everyday moments.",
        ),
      );
    }
    if (path.includes("creating-with-ai")) assert.match(html, /noindex/);
  }
}
for (const path of ["/preview", "/fr", "/ja/writing/not-an-article"]) {
  const response = await fetch(origin + path);
  assert.equal(response.status, 404, path);
}
const audio = await fetch(`${origin}/audio/preview.wav`, {
  headers: { Range: "bytes=0-43" },
});
assert.equal(audio.status, 206);
const bytes = Buffer.from(await audio.arrayBuffer());
assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
assert.equal(bytes.toString("ascii", 8, 12), "WAVE");
console.log(
  "PASS: locale redirects, 8 localized pages, 3 missing routes, no forms, audio range delivery",
);
