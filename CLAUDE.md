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

- **`app/`** — Next.js App Router。単一ページ構成（`page.tsx`）で、各セクションを feature から import。`@modal/` は parallel route（Intercepting Routes）。
- **`features/`** — ドメイン単位のモジュール群（`landing`, `about`, `skills`, `games`, `contact`）。各 feature は `components/`, 必要に応じて `actions/`, `hooks/`, `schema/`, `constants/`, `types/` を持つ。
- **`components/`** — 共通 UI コンポーネント。`ui/` は shadcn/ui（new-york スタイル）で生成されたもの。
- **`lib/`** — ユーティリティ（`utils.ts` = clsx + tailwind-merge, `radis.ts` = Upstash Redis クライアント, `motion/` = アニメーション設定）。
- **`stores/`** — ThemeProvider（next-themes）。
- **`constants/`**, **`types/`** — グローバル定数・型定義。
- **`styles/`** — `global.css`（Tailwind CSS v4 + shadcn CSS 変数）。

### 主要な技術的特徴

- **Server Actions**: `contact` と `games` feature が Server Actions（`actions/`）を使用。コンタクトフォームは Conform + Zod でバリデーション、Resend でメール送信、Upstash Redis でレートリミット。
- **shadcn/ui**: `pnpm dlx shadcn@latest add <component>` でコンポーネント追加。パス alias は `@/components/ui`。
- **Motion**: アニメーションライブラリとして motion (Framer Motion 後継) を使用。
- **パス alias**: `@/*` → `./src/*`

## Code Style

- **Biome** で lint + format（スペース2、推奨ルール有効）。
- **lefthook** による pre-commit フック: staged ファイルに対して `biome check` を実行。
- import の自動整理は Biome の `organizeImports` で管理。

## 注意事項

- `.env` / `.env.*` ファイルを読み込まないこと。機密情報（APIキー・トークン等）が含まれるため、内容の閲覧・表示・参照を行わない。

## 言語

常に日本語で回答してください。
