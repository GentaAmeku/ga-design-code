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

[ADR-0002](../adr/0002-one-section-per-screen.md) の「1スクロールに1セクション、はみ出しなし」は、実装が `min-height: 100svh`(最小値)なので目視では守れているか分からない。セクションを足したり中身を増やしたら、必ず測る。

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

2026-08 時点の実測では全セクションが 0 以下（余裕は landing 587 / about 42 / skills 55 / games 52 / contact 111）。**新しく違反を増やさないこと**がこの手順の目的。

`over` が 0 でも安心しない。`min-height: 100svh` は中身が画面より低ければ画面ぴったりに見せるため、**0 は「収まった」としか言わず、あとどれだけ余裕があるかを教えない**。余裕を知るには中身の高さを測る。

```js
[...document.querySelectorAll("section")]
  .filter((s) => s.getBoundingClientRect().height > 0)
  .map((s) => {
    const content = [...s.children].reduce(
      (a, c) => a + Math.round(c.getBoundingClientRect().height),
      0,
    );
    return { content, margin: window.innerHeight - content };
  });
```

折り返しの余りも見る。項目を横に並べる箇所では、行の右端が残り数 px しかないと、端末のフォントが少し違うだけで1行増えて破れる。**1行増えても収まるだけの余裕（skills なら 40px）を残す。**

2026-09-15の変更：固定ヘッダー64px、トップの骨格は `.portfolio-section` と `.section-content`。読み物は `.reading-page`。旧フォームのプレビューは撤去。ヘッダーの再生状態は黒い縦線3本の動きで表し、再生時の発光は行わない。

## 2026-09-15 デザイン反映の検証

ローカルproductionビルドで、375×667の日英トップは7セクションすべて高さ667px、横幅375px以内。1280×720でも7セクションは高さ720px以内。音楽の再生時間を読み込み済み音源から復元する処理も確認した。

記事遷移・日英切替をまたぐ音楽再生、ヘッダーからの一時停止と再生中アイコンの停止、Contactのコピー成功を確認。固定ヘッダーはスクロール位置にかかわらず上端0px。4テーマの白背景と既存マーカー色はソース定義を確認し、今回の変更では色値を変えていない。

検証用画像は `output/playwright/` に保存（Git対象外）。再生アイコンの停止はメディアイベント後の描画完了を待って確認する。

## 2026-09-15 本人フィードバックによる改訂

上記の初回検証以降、本人指定のAbout全文と画像付きWritingを反映。About / Career / Writingは最大幅1000px、Careerは左右2列、Writingは画像と要約の2列。375pxでは縦積みにし、指定全文と画像の可読性を優先して必要な高さまで伸長する。これらは従来の1画面制約の例外とし、横はみ出しや内容の重なりを検査する。音量は初期30%、ミュートボタンとスライダーで調整する。

改訂後の375×667日本語版は横幅375px。About 896px、Career 873px、Writing 1117px、残り4セクション667px。音量55%への変更とミュートを実ブラウザで確認し、JA→EN→JA後も保持。英語About全文の縦積み表示も確認した。

表記・装飾の追記：Blog / Music / Contactのリードにはマーカーを付けず、Contactのメールアドレスに付ける。テキストリンクはinline-flexの中央揃えと下端の罫線で、文字とアイコンの間にも連続した下線を表示する。
