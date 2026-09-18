import type { NextConfig } from "next";

// Request-specific locale sets the initial document language in the shared layout.
const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./content/blog/**/*.md"],
  },
};
export default nextConfig;
