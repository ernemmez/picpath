export { default } from "next-auth/middleware";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path.startsWith("/login") || path.startsWith("/signin")) {
    return NextResponse.redirect(new URL("/auth?redirect=signin", request.url));
  }

  if (path.startsWith("/register") || path.startsWith("/signup")) {
    return NextResponse.redirect(new URL("/auth?redirect=signup", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/login/:path*",
    "/register/:path*",
    "/signin/:path*",
    "/signup/:path*",
  ],
};
