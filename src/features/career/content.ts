import { copy } from "@/features/content/copy";
import type { Locale } from "@/lib/locale";

export const careerEntries = (locale: Locale) => {
  const t = copy[locale];
  const projects =
    locale === "ja"
      ? [
          {
            period: "2025.04 — 2026.04",
            title: "カラオケアプリのリニューアル",
            role: "テックリード",
            body: "基本設計から参画し、Next.jsを用いたフロントエンドの設計と共通開発基盤を構築。デザインシステム、認証、データ取得・状態管理の設計を担当しました。コードレビューや開発ルールの整備に加え、GitHub Copilot・Claude CodeなどのAIツールをチームの開発フローへ導入しました。",
            tools:
              "Next.js / TypeScript / Tailwind CSS / TanStack Query / AWS Cognito",
          },
          {
            period: "2019.02 — 2025.02",
            title: "データセンター管理画面の開発",
            role: "テクニカルリードの一人として参画",
            body: "Reactを中心とした画面設計・実装と、開発基盤の改善を担当。Storybookを用いたデザインシステムの構築、大規模なリファクタリング、ライブラリの選定・導入を進めました。遅延読み込みやコード分割による性能改善にも取り組みました。",
            tools: "React / TypeScript / React Query / Storybook / Emotion",
          },
          {
            period: "2016 — 2019",
            title: "Web・アプリ開発の経験",
            role: "フロントエンドエンジニア",
            body: "端末向けUI、社内チャット、ハイブリッドアプリ、労務管理サービスなどの開発・保守を経験。Angular・Vue・IonicからReactへと扱う技術を広げ、要件定義から実装・テスト、コードレビューや開発環境の整備に取り組みました。",
            tools: "Angular / Vue / Ionic / React / TypeScript",
          },
        ]
      : [
          {
            period: "2025.04 — 2026.04",
            title: "Karaoke app renewal",
            role: "Tech Lead",
            body: "Joined at the system design stage and built the frontend architecture and shared development foundation with Next.js. Designed the design system, authentication, data fetching, and state management. Alongside code reviews and development standards, introduced AI tools such as GitHub Copilot and Claude Code into the team's workflow.",
            tools:
              "Next.js / TypeScript / Tailwind CSS / TanStack Query / AWS Cognito",
          },
          {
            period: "2019.02 — 2025.02",
            title: "Data center administration console",
            role: "One of the Technical Leads",
            body: "Designed and implemented React interfaces and improved the development foundation. Built a Storybook-based design system, led large refactoring efforts, and evaluated and introduced libraries. Improved performance through lazy loading and code splitting.",
            tools: "React / TypeScript / React Query / Storybook / Emotion",
          },
          {
            period: "2016 — 2019",
            title: "Web and application development",
            role: "Frontend Engineer",
            body: "Developed and maintained device interfaces, an internal chat app, hybrid apps, and a workforce management service. Expanded from Angular, Vue, and Ionic to React, working across requirements, implementation, testing, code reviews, and development tooling.",
            tools: "Angular / Vue / Ionic / React / TypeScript",
          },
        ];
  return [
    {
      period: t.now,
      title: t.currentRole,
      role: locale === "ja" ? "イネーブリングチーム" : "Enablement Team",
      body:
        locale === "ja"
          ? "企業の生成AI導入とAI駆動開発を支援しています。AI駆動開発を推進すべくAIエージェントのハーネス設計、人間の認知負荷を軽減を目的とした施策、日々の業務の生産性向上に関する自動化を行っています。"
          : "I help companies adopt generative AI and drive AI-driven development. To advance AI-driven development, I design AI agent harnesses, run initiatives to reduce people's cognitive load, and automate everyday work to improve productivity.",
      tools:
        locale === "ja"
          ? "Claude / Codex / Cursor / Next.js / Rails / Docker"
          : "Claude / Codex / Cursor / Next.js / Rails / Docker",
    },
    ...projects,
    {
      period: t.beforeEngineering,
      title: t.qaRole,
      role: "",
      body: t.qaBody,
      tools: "",
    },
  ];
};
