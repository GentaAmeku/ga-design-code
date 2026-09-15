# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

G.A Design & Code — 個人ポートフォリオサイト。Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 で構築。Vercel にデプロイ。

## Commands

```bash
pnpm dev          # 開発サーバー起動
pnpm build        # プロダクションビルド
pnpm lint         # Biome による lint + 自動修正 (biome check --write)
pnpm format       # Biome による自動フォーマット (biome format --write)
```

テストフレームワークは未導入。

## Architecture

### ディレクトリ構成 (`src/`)

- `app/[locale]/` — ja/enのトップ、経歴詳細、記事一覧・本文。`proxy.ts`で初期言語とリクエストの言語を処理する。
- `features/content/` — 仮コンテンツと日英の文言。本文・音源・公開メールアドレスは今後本人と確定する。
- `features/music/` — ルートに保持する共通音声状態、セクションのプレイヤー、固定ヘッダーの再生表示。
- `features/` — landing / about / career / skills / writing / music / contact。
- `components/` — 共通UI。Sectionはトップ専用、読むページはreading-pageを使う。
- `stores/ThemeProvider.tsx` — 白を保つ4色のテーマ。ダークテーマは追加しない。
- `styles/` — テーマ色・基本値・画面の骨格。対応する `docs/design-system/` も更新する。

問い合わせのServer Actions、Resend、Upstash Redis、旧ゲーム紹介のルートは撤去済み。秘密の環境変数を読む必要はない。

### 検証

`pnpm check`、`pnpm typecheck`、`pnpm build`。ローカルのproductionサーバーに対して `node scripts/smoke-test.mjs`。デザイン確認には375×667とデスクトップを用いる。

## Code Style

- **Biome** で lint + format（スペース2、推奨ルール有効）。
- **lefthook** による pre-commit フック: staged ファイルに対して `biome check` を実行。
- import の自動整理は Biome の `organizeImports` で管理。

## 注意事項

- `.env` / `.env.*` ファイルを読み込まないこと。機密情報（APIキー・トークン等）が含まれるため、内容の閲覧・表示・参照を行わない。

## 言語

常に日本語で回答してください。
