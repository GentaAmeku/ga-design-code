# デザインシステム

このディレクトリの HTML は、Claude Design のデザインシステムプロジェクトへ押し出す元になる。1枚で完結し、外部ファイルを読まない(Claude Design のプレビューは外部リソースを取得できない)。

正はコードであってこの HTML ではない。食い違ったらコードが勝つ([ADR-0001](../adr/0001-code-is-the-source-of-truth.md))。

## カードの分類

| 分類 | ファイル | 中身 |
| --- | --- | --- |
| Foundation | `foundation-tokens.html` | 色・文字・余白・角丸・影 |
| Layout | `layout-section.html` | セクションの骨格 |
| Components | `component-section-heading.html` | セクション見出しとリード |
| Components | `component-button.html` | ボタン |
| Components | `component-form.html` | フォーム |
| Motion | `motion-fade-in.html` | 出現アニメーション |

各ファイルの1行目に `<!-- @dsCard group="Foundation" -->` の形でマーカーを置く。Claude Design はこの行を読んでカードを分類する。マーカーがないファイルはカードにならない。

## トークンの出所

`:root` に書く値は次から転記する。**手で書き写さない。**

- 色 — [`src/styles/themes/default.css`](../../src/styles/themes/default.css)
- 角丸・影・フォント・余白の基準 — [`src/styles/variables.css`](../../src/styles/variables.css)

blue / green / pink は色替えであって別デザインではないため、プレビューは default だけを載せる([CONTEXT.md](../CONTEXT.md) の「テーマ」)。

## 押し出し

Claude Design 側のプロジェクトへは Claude Code から押し出す。コードを変えたら、対応するプレビューも同じコミットで直す。

## はみ出しの確認手順

[ADR-0002](../adr/0002-one-section-per-screen.md) の「1スクロールに1セクション、はみ出しなし」は、実装が `min-h-screen`(最小値)なので目視では守れているか分からない。セクションを足したり中身を増やしたら、必ず測る。

1. 開発サーバーを起動する
2. ブラウザの表示領域を **375×667** にする(ここが最も厳しい)
3. 次を実行し、`over` がすべて 0 以下であることを確認する

```js
[...document.querySelectorAll("section")]
  .filter((s) => s.getBoundingClientRect().height > 0)
  .map((s) => ({
    h: Math.round(s.getBoundingClientRect().height),
    over: Math.round(s.getBoundingClientRect().height - window.innerHeight),
  }));
```

2026-08 時点の実測では about が +44、skills が +249 で違反している。これは既知で、修正は別作業。**新しく違反を増やさないこと**がこの手順の目的。
