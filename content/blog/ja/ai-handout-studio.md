---
title: "AIに資料を「全部」作らせるのをやめた。AI Handout Studioを開発した話"
description: "AIエージェントが作るスライド・HTML資料・質問票を、JSONの契約とテンプレートで受け取り、人がブラウザで仕上げるローカルアプリ AI Handout Studio の設計と開発の進め方を紹介します。"
order: 2
draft: true
createdAt: "2026-09-26"
image: "/images/ai-handout-studio/editor-cover.png"
---

<!--
画像の置き場: public/images/ai-handout-studio/
撮影済みの画像は下の各章に置いてある。「未撮影」と書いたものは本人が用意する(理由も書いた)。
Zenn へ転載するときは、この冒頭に原文 URL を1行書く。
-->

## はじめに

AIが作った資料

<!-- 3行の要約(何を作ったか・誰向けか・リポジトリ URL)のあとに、最初の画面としてこの1枚。 -->

![AI Handout Studio の編集画面。左にスライドの一覧、中央にキャンバス、右にプロパティ](/images/ai-handout-studio/editor-cover.png)

*エージェントが書いたスライドを、ブラウザで開いたところ。*

## AIに資料を作らせて困ったこと

<!-- 画像なし。チャットで「ここだけ直して」を繰り返したやり取りの例を、コードブロックで1つ入れる。 -->

## 「AIが全部作る」をやめた理由

<!-- 画像なし。判断基準「自分が最後に触る方が速い工程は手でやる。遅い工程だけ AI に渡す」を軸に書く。 -->

## AI Handout Studioでできること

### スライド

![本文スライドで見出しブロックを選び、右のプロパティで位置・大きさ・文言を直している](/images/ai-handout-studio/editor-selected.png)

*ブロックを選ぶと、右のパネルで座標と文言を直せる。*

### HTML資料

![HTML 資料を読むページ。要約、目次、3区分のカードが並ぶ](/images/ai-handout-studio/document-read.png)

*設計書や調査結果は、スライドではなく1枚の HTML 資料にする。*

### 質問票：エージェントが先に聞いてくる

![質問票の画面。左に質問と比較表と回答欄、右に質問一覧と進捗](/images/ai-handout-studio/sheet-read.png)

*エージェントが書き始める前に聞く質問票。推奨案と比較表を見ながら答える。*

<!-- ここは3行で。詳しくは下の「質問票」の章で書く、と誘導する。 -->

## 仕組みの全体像

![構成図。AI エージェントがスキルを読み、CLI で JSON を保存し、ローカルサーバーがテンプレートの CSS を当てて描画・編集・書き出しをする](/images/ai-handout-studio/overview.png)

*AI が書くのは JSON だけ。見た目と編集と書き出しはアプリが持つ。*

## 似たツールとの違い

<!--
画像なし。表1つ。Zenn では「Presenton と何が違う?」が最初のコメントになるので先に答える。
列: 名前 / AI が書くもの / 描画する側 / 人が直す画面 / 質問票
行: Presenton(JSON→HTML テンプレート、ドラッグ編集あり、スライドのみ) / AWS SDPM(JSON→PPTX、警告をエージェントに返す、画面なし) / Claude Code + Marp(Markdown、画面なし) / PPTX Skill(HTML→PPTX) / AI Handout Studio
違いは4点: エージェント起点(どのフォルダの会話からでも)、スライド+HTML資料+質問票、tokens→CSS で色の直書きを build が止める、PPTX は DOM の座標から再構成。
json-render(Vercel、2026-01)の「LLM にコードを書かせず、部品のカタログに縛った JSON を出させる」と同じ理由付けであることを1文添える。
-->

## 設計で決めた3つのこと

### 資料の正本はJSON1つ

![編集画面の JSON タブ。選んでいるスライドの JSON がそのまま見える](/images/ai-handout-studio/editor-json.png)

*スライド1枚は、文章・構造・座標だけの JSON。色や class は書かない。*

<!-- deck.json の抜粋をコードブロックで載せる。`[[要確認]]` の決まりもここ。 -->

### 見た目はテンプレートが持つ

![スライドのテンプレート一覧。同じ中身の見本が、テンプレートごとに違う見た目で並ぶ](/images/ai-handout-studio/templates.png)

*中身は同じで、見た目だけが違う。tokens.json から CSS を生成し、色の直書きは build が止める。*

### 人が直す場所を省略しない

![パーツのパネル。見出し・本文・箇条書き・カード列など10種の部品を足せる](/images/ai-handout-studio/editor-parts.png)

*選択・移動・リサイズ・挿入・削除・テキスト編集は、画面で人がやる。*

<!-- 未撮影: はみ出し検査の結果が出ている画面。わざと長い文を入れた資料を用意して、検査の表示を撮る。 -->

## 質問票：エージェントが書く前に聞いてくる

<!--
この記事のもう一つの主役。「AI に全部作らせない」の入口側(作る前)にあたる。
書く順: なぜ聞かせるのか(推測で作られた資料の直しが一番高い) → AskUserQuestion では足りなかったこと → 質問票の JSON → 回答の戻し方 → スマホ → 記録として残る。
-->

### AskUserQuestion では足りなかったこと

<!--
画像なし。Claude Code の AskUserQuestion(選択肢を1問ずつ出す)は速いが、比較表・図・根拠を見ながら6問まとめて答えるには狭い。Codex でも同じ形で聞きたかった。
「1〜2件の即答は会話や AskUserQuestion、読み比べが要るときは質問票」という線引きを書く。
-->

### 質問はJSON、見た目はテンプレート

![回答済みの質問票。本文の下に比較表と情報の枠、その下に選択肢と回答文の欄](/images/ai-handout-studio/sheet-answered.png)

*質問ごとに「何を比べて決めるか」を持たせる。比較表・図・注意は本文の下、回答欄はその下。*

<!-- questions.json の抜粋(1問分: title / summary / detail / options / recommended / visual.comparison)をコードブロックで。推奨は recommended で示し、画面が「（推奨）」を付ける決まりも。 -->

### 回答はMarkdownでコピーして会話へ貼る

![最後の質問の画面。次へ進むボタンの位置に「回答をコピー」がある](/images/ai-handout-studio/sheet-copy.png)

*答え終わると「回答をコピー」が出る。Markdown になった回答を会話へ貼ると、エージェントが続きを進める。*

<!--
回答サーバーを立てない理由(URL 1本で済む、待つプロセスが無い、資料一覧が記録になる)。
Anthropic の Thariq Shihipar が 2026-05-20 の記事「The Unreasonable Effectiveness of HTML」で「UI の最後は copy as prompt で Claude Code に貼り戻す」と書いている。同じ型だと1文添える(先か後かは言わない)。
-->

### スマートフォンから答える

![同じ質問票をスマートフォンの幅で開いたところ](/images/ai-handout-studio/sheet-phone.png)

*同じ Wi-Fi のスマートフォンからも開ける。机を離れて答え、戻ってから貼る。*

### 回答も資料として残る

<!-- 画像なし。貼られた回答を `sheet answers` で同じ資料に残すので、あとから開くと答えた状態で出る。決めたことの記録になる(この記事の方針も質問票で決めた、と書けると強い)。 -->

## エージェントとの接点はスキルとCLI

<!-- 画像なし。SKILL.md の抜粋(表の部分)と、CLI のコマンド一覧をコードブロックで載せる。 -->

## PDF・PNG・PPTXへの書き出し

![編集画面の上部にある PNG・HTML・PPTX・PDF の書き出しボタン](/images/ai-handout-studio/export-bar.png)

<!-- 未撮影: 書き出した PPTX を PowerPoint か Keynote で開き、図形とテキストが編集できる状態を撮る(スクショ貼り付けでないことを見せる)。本人の環境で撮る。 -->

## 開発の進め方：設計書を先に書き、AIエージェントに実装させた

### チケットと計画書で進める

<!-- 未撮影: GitHub の PR 一覧か、before/after のスクショが付いた PR の画面。公開リポジトリのものを本人が撮る。 -->

### セットアップをゲームブックにした

<!-- 画像なし。`ai-handout-studio doctor` の出力をコードブロックで載せる。 -->

## うまくいかなかったこと

<!-- 画像なし。質問票の回答サーバー(serve)をやめてコピー方式にした話、レイアウト型のタブの作り直し、deck-studio からの改名。 -->

## 使ってみるには

![資料一覧。エージェントが作った資料がカードで並ぶ](/images/ai-handout-studio/list.jpg)

<!-- clone して /studio-setup の3行と、要件(Node 24、Claude Code か Codex CLI)。 -->

## これから
