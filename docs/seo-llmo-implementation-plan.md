# SEO・AI検索向け基盤の実装計画

作成日: 2026-09-19  
対象: G.A Design & Code — https://www.genta-ameku.com/  
リポジトリ: `/Users/gameku/Documents/ghq/ga-design-code`  
状態: 実装前。別エージェントへの引き継ぎ用。

## 目的と依頼範囲

ポートフォリオと記事を検索エンジン・AI検索が発見し、内容と著者を理解できる基盤を、小規模な変更で整える。既存のMarkdownを正本とし、記事を追加して通常のデプロイを行えば各出力にも反映される構成にする。

実装対象は、サイトマップ、robots.txt、ページ別メタ情報、記事の構造化データと著者表示、llms.txt。検索順位・インデックス登録・AI回答への引用そのものを実装完了条件にはしない。

この文書の作成依頼は実装・公開の実行依頼ではない。受け取ったエージェントは、ユーザーからの実装依頼と対象環境の規約に従って着手する。本番公開・外部サービス設定変更の権限は、引き継ぎ時の依頼範囲を確認する。

## 着手時に確認するもの

1. 適用されるAGENTS.md、作業ツリーの差分、現在のブランチとデプロイ方法を確認する。他の作業の差分を混ぜない。
2. 以下の現状をコードで再確認する。記載内容は作成時点の観測であり、変更されている場合は現行コードを優先する。
3. 本人に関する新しい掲載文が必要なら、`~/Documents/ghq/context-core/core.md` から関係資料だけを読む。サイトで公開済みの情報を優先し、私的な資料にある事実を自動的に公開情報へ追加しない。

| 対象ファイル | 作成時点の観測 |
| --- | --- |
| `src/app/layout.tsx` | metadataBaseは本番ドメイン。共通レイアウトあり |
| `src/constants/metadata.ts` | canonical・日英のalternatesあり。説明文はaboutLead、画像とOG種別は共通 |
| `src/features/blog/content.ts` | Markdownを読み、draftを公開一覧から除外。createdAt・updatedAtを保持 |
| `src/app/[locale]/blog/[slug]/page.tsx` | 記事のdescriptionは固有。OGPは共通設定を継承。下書きと不明slugはnotFound |
| `content/blog/{ja,en}/*.md` | 記事の正本。AI駆動開発記事は公開扱い、他の2題材は下書き |
| `src/proxy.ts` | `/`を`/ja`へリダイレクト。matcherはルート・日英パス |
| `scripts/smoke-test.mjs` | ローカル本番サーバー用。既存ページ・下書き404等を確認 |

作成時点ではサイトマップ、robots.txt、llms.txt、JSON-LDの実装は見当たらなかった。

## 実装仕様

### 1. 公開URLと記事データの共通利用

- 正式なoriginは `https://www.genta-ameku.com`。canonical、サイトマップ、llms.txt、JSON-LDで同じ定義を使う。
- 既存の記事読み込み処理を利用する。公開判定や記事一覧の別管理を増やさない。
- URLに一覧への戻り先などのクエリを含めない。
- キャッシュする場合も、記事の公開・更新・非公開化が次のデプロイで反映されるようにする。

### 2. sitemap.xml

候補ファイル: `src/app/sitemap.ts`。

- 日英それぞれのトップ、career、blog一覧、公開記事を掲載する。
- `/`は日英トップへの入口なので、リダイレクト先の正規URLを掲載する。
- 下書き、存在しない翻訳、404、プレビュー用URLを含めない。
- 記事のlastModifiedは実際の更新日を使う。根拠のない日時や毎回のビルド日時を入れない。固定ページで日付が不明なら省略する。
- 日英の対応を出力する場合は、実在する公開済みの対応ページだけを対象にする。

### 3. robots.txt

候補ファイル: `src/app/robots.ts`。

- 公開コンテンツの検索クロールを許可し、本番のsitemap.xmlを案内する。
- Googlebot、Bingbot、OAI-SearchBot、PerplexityBotを意図せず遮断しない。重複する個別ルールは必要な場合だけ追加する。
- 検索利用とAI学習利用は別の判断として扱う。既存の学習用Botポリシーがあれば保持する。新規の拒否・許可方針は推測で追加せず、既存方針が不明なら未決事項として報告する。
- 下書きは既存の公開制御と404で保護する。robots.txtをアクセス制御の代わりにしない。

### 4. メタ情報と記事の著者表示

候補ファイル: `src/constants/metadata.ts`、各ページのgenerateMetadata、記事ページ。

- トップ・career・blog一覧に、そのページの内容を説明する日英のdescriptionを設定する。公開済みの紹介内容を基にし、経歴や実績を補わない。
- 記事ではタイトル・descriptionを通常のmeta、OGP、Twitterカードで一致させ、OG種別をarticleにする。
- 記事画像を指定できる任意フィールドを必要に応じて追加し、OGPとJSON-LDで共通利用する。既存の適切な画像を使い、指定がない場合のフォールバックを定義する。画像制作は今回の範囲外。
- canonicalは各言語の自己URLを維持する。hreflangは公開されている翻訳だけを相互に示す。
- 記事に著者名と既存のプロフィール箇所へのリンクを表示する。大幅なレイアウト変更や新しいプロフィールページは不要。

### 5. 記事の構造化データ

- 記事に `BlogPosting` のJSON-LDを出力する。
- headline、description、urlまたはmainEntityOfPage、inLanguage、author（PersonとプロフィールURL）、適切な画像と確認できた日付を設定する。
- 著者・日付・画像は画面や公開情報と整合させる。Organizationや実績・資格を推測で作らない。
- 公開日には必要に応じて任意のpublishedAtを追加する。createdAtを初回公開日と自動的に同一視しない。根拠を確認できなければdatePublishedは省略し、残事項として報告する。
- dateModifiedは実際の更新日を使用する。日付値は実在する日付か検証し、時刻が不明なら架空の時刻を補わない。
- JSON-LDをHTMLへ埋め込む際は、本文やタイトル中の`<`等でscript境界を破れないよう安全にシリアライズする。

### 6. llms.txt

候補ファイル: `src/app/llms.txt/route.ts`。

- `/llms.txt`を200で返す。Markdown形式の内容をUTF-8のtext/plainで配信し、言語リダイレクトの対象にしない。
- H1にサイト名、引用ブロックに短い概要、H2以下にプロフィール・日英のBlogと記事への案内を置く。
- 記事一覧は公開記事データからタイトル・説明・絶対URLを自動生成し、日英で整理する。
- 概要はサイトの公開情報だけを使う。内部の運用情報や非公開の本人情報は含めない。
- 下書きはURLだけでなくタイトルと説明も除外する。非公開化した記事も次のデプロイで消えること。
- 初回は通常のHTMLページへのリンクを使用する。llms.txtの提案仕様はMarkdown版へのリンクを推奨するが、今回の小規模な試作では記事全文の別エンドポイントやllms-full.txtは作らない。
- 記事タイトル等にMarkdownの記号や改行が含まれても案内の構造が壊れないようにする。

## 公開サイトの429について

2026-09-19に本番ルートへ自動HTTPアクセスしたところ、429、`server: Vercel`、`x-vercel-mitigated: challenge`を確認した。ブラウザー検索ツールでも取得できなかった。この観測だけでは、実際の検索Botも遮断されているとは判断できない。

実装と別に、利用権限がある場合はVercelのFirewall/Bot関連ログとGoogle Search ConsoleのURL検査を確認する。User-Agentを名乗るだけのアクセス成功を、正規Botが取得できる証拠にはしない。制限調整が必要な場合は対象と影響を特定し、許可された範囲で最小変更を行う。全体の防御機能を一律に無効化しない。

管理画面を確認できない場合もコードの実装・ローカル検証は進め、本番アクセスの検証を残事項として報告する。

## 検証と完了条件

実装時のpackage.jsonと既存スクリプトを確認し、check、typecheck、buildを実行する。ローカル本番サーバーで既存スモークテストを実行し、必要な範囲だけ次の確認を追加する。

| 確認項目 | 合格条件 |
| --- | --- |
| 配信 | 3ファイルが200、適切なContent-Type。`/llms.txt`等が`/ja`へ転送されない |
| URL整合 | 正規originを使用し、掲載先が公開ページ。クエリ付きURLや404を含まない |
| 公開制御 | 下書きの名前・説明・URLがサイトマップとllms.txtから除外される |
| 更新追従 | 公開記事の追加・更新・非公開化を一時fixture等で検証し、出力へ反映される。検証用コンテンツは残さない |
| 翻訳 | 片方の言語だけ公開した場合、未公開側へのhreflangを出さない |
| メタ情報 | 日英の記事でタイトル・description・OGP・canonicalが仕様どおり |
| JSON-LD | JSONとして解析でき、著者・日付・画像が表示内容と一致。特殊文字も安全 |
| 表示 | 著者表示とリンクを日英・モバイル幅で確認し、既存レイアウトが崩れない |
| 回帰 | 既存ページ、記事、下書き404が従来どおり動く |

公開後の検証が依頼範囲に含まれる場合は、本番の3ファイル、代表記事、JSON-LDを再確認する。Search Console/Bingへの登録は権限と依頼範囲に従う。既存スモークテストはローカル専用なので、そのまま本番URLを渡さず別途確認する。

実装完了と本番確認完了を分けて報告する。429等で本番を検証できない場合は、その状態を明示する。Googleへの登録やAI引用の発生を待ち続ける必要はない。

## 今回の対象外

- 記事本文の代筆・全面改稿、下書きの公開、サイト全体のデザイン変更。
- llms-full.txt、記事全文Markdown配信、新しいCMSやSEOライブラリの導入。
- AI学習用Botの方針変更、ホスティング防御設定の一律解除。
- 有料SEOサービス、定期監視、計測基盤の追加、大量の記事生成。

## 納品時に残す情報

- 変更ファイルと、記事の画像・公開日を指定する方法。
- 実行した検証と結果、既存の警告があればその区別。
- commit・反映先・デプロイの状態（実施した範囲）。
- 本番の3ファイルのURL、429の調査結果、権限不足等による残事項。
- 記事の通常の追加・デプロイ以外に、更新作業が不要かどうか。

## 参考資料

技術的な仕様は実装時にも必要な箇所を確認する。llms.txtは提案仕様であり、設置による順位やAI引用の向上は未検証として扱う。

- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Google: Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google: Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [OpenAI: Crawlers](https://developers.openai.com/api/docs/bots)
- [Perplexity: Crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- [llms.txt proposal](https://llmstxt.org/)
