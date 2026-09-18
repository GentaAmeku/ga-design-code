# G.A Design & Code

白と余白を基調とした個人ポートフォリオ。Next.js / TypeScript / Tailwind CSSで構築しています。

[公開サイト](https://www.genta-ameku.com) · [デザイン方針](docs/renewal-direction.md)

## 開発

```sh
pnpm install --frozen-lockfile
pnpm dev
```

`/` は日本語の `/ja` へ移動します。英語は `/en`。ヘッダーで同じページの言語を切り替えられます。

## 今回のデザイン反映

- Landing / About Me / Career / Skills / Writing / Music / Contact。
- 経歴詳細、記事一覧、記事本文。共通の幅と余白を保ち、本文は自然に縦へ流れます。
- 固定ヘッダーの曲名と再生中表示。記事・言語の切替中も音楽を継続し、ヘッダーから一時停止できます。
- 白を保った4色のアクセントテーマ。再生に伴う発光はありません。
- メールアドレスのコピーとGmail作成画面へのリンク。旧問い合わせフォーム・送信処理は撤去済み。
- 旧「好きなゲーム紹介」は撤去。自作ゲーム紹介は完成後の別工程です。

## 本文・素材を決めるとき

未完成のBlog記事は`draft: true`で保持し、画面と検索エンジンには公開しません。

| 内容 | 変更場所 |
| --- | --- |
| 日英の短い文言 | `src/features/content/copy.ts` |
| Blog記事 | `content/blog/<locale>/<slug>.md` |
| 公開メールアドレス | `src/features/content/data.ts` の `contactEmail`。未設定では例示アドレスと無効なGmailボタンを表示 |
| 音源 | 同ファイルの `previewTrack`。現在は `public/audio/preview.wav` の合成テスト音 |
| About画像 | `public/images/about.png` を暫定利用 |
| 経歴の詳細 | `src/features/career/Timeline.tsx` と `src/app/[locale]/career/page.tsx` |

Blog記事のファイル名がURLのslugになります。日本語は `content/blog/ja/`、英語は `content/blog/en/` に同じslugで置きます。記事の先頭には次のfront matterを記載します。

```md
---
title: "記事タイトル"
description: "一覧と記事冒頭に表示する概要"
order: 1
draft: true
createdAt: "2026-09-18"
updatedAt: "2026-09-18"
---

## 最初の見出し
```

`order`は一覧の表示順です。`createdAt`は必須で、トップ・記事一覧・記事詳細に`YYYY-MM-DD`形式で表示します。`updatedAt`は任意で、記事詳細だけに最終更新日として表示します。

`draft: true`の記事はトップ・記事一覧・静的生成から除外され、直接URLも404になります。原稿が完成したら`draft: false`に変更してください。

音源は本人の制作物を使用しています。

## 検証

```sh
pnpm check
pnpm typecheck
pnpm build
pnpm start --port 3100
# 別のターミナル
node scripts/smoke-test.mjs
```

表示の測定手順は [デザインシステム](docs/design-system/README.md) を参照。音源・アドレスを確定するまで、メールの実送信は確認対象にしません。

Vercel AnalyticsはVercel上だけで読み込みます。ローカルmainへのマージと本番公開は別工程です。
