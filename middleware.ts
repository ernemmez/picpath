import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith("/login") || path.startsWith("/signin")) {
    return NextResponse.redirect(new URL("/auth?redirect=signin", request.url));
  }

  if (path.startsWith("/register") || path.startsWith("/signup")) {
    return NextResponse.redirect(new URL("/auth?redirect=signup", request.url));
  }

  if (path === "/") {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return NextResponse.redirect(
        new URL("/auth?redirect=signin", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login/:path*",
    "/register/:path*",
    "/signin/:path*",
    "/signup/:path*",
  ],
};
