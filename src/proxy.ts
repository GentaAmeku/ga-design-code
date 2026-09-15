import { type NextRequest, NextResponse } from "next/server";
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path === "/") return NextResponse.redirect(new URL("/ja", request.url));
  const headers = new Headers(request.headers);
  headers.set("x-site-locale", path.split("/")[1] === "en" ? "en" : "ja");
  return NextResponse.next({ request: { headers } });
}
export const config = { matcher: ["/", "/ja/:path*", "/en/:path*"] };
