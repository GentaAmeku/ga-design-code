import type { NextConfig } from "next";

// Next.js 16 では MCP(Server側) / Devtools が標準で有効化されます。
// 追加の experimental フラグは不要ですが、将来的に個別設定したい場合はここに追記してください。
// 例: 画像最適化設定や cache 戦略など。
const nextConfig: NextConfig = {
  // Cache Components を有効化: 'use cache' 指令で Server Component の結果をキャッシュ。
  cacheComponents: true,
};

export default nextConfig;
