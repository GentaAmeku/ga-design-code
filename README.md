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

現在はデザイン確認用のサンプルを含みます。

| 内容 | 変更場所 |
| --- | --- |
| 日英の短い文言 | `src/features/content/copy.ts` |
| 記事タイトル・本文・固定slug | `src/features/content/data.ts` |
| 公開メールアドレス | 同ファイルの `contactEmail`。未設定では例示アドレスと無効なGmailボタンを表示 |
| 音源 | 同ファイルの `previewTrack`。現在は `public/audio/preview.wav` の合成テスト音 |
| About画像 | `public/images/about.png` を暫定利用 |
| 経歴の詳細 | `src/features/career/Timeline.tsx` と `src/app/[locale]/career/page.tsx` |

本番記事の入稿・翻訳運用は後から決定します。記事ページはサンプルの間だけ `noindex` を指定しています。本番原稿の確定時にサンプル注記と一緒に見直してください。音源は220Hz・277.18Hz・329.63Hzの小音量サイン波を重ねた24秒の動作確認用で、本人の作品ではありません。

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
