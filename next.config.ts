import type { NextConfig } from "next";

// The root layout lives in app/[locale], so every page is prerendered per locale.
const nextConfig: NextConfig = {
  experimental: {
    // Unmatched URLs have no single root layout to render a 404 inside.
    globalNotFound: true,
  },
  outputFileTracingIncludes: {
    "/*": ["./content/blog/**/*.md"],
  },
  async redirects() {
    return [{ source: "/", destination: "/ja", permanent: true }];
  },
};
export default nextConfig;
