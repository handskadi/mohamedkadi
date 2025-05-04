// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Redirect `/resume` → `/cv-builder`
  if (pathname === "/resume") {
    url.pathname = "/tools/cv-builder";
    return NextResponse.redirect(url);
  }

  // Redirect `/mk-2023-cv-webdev.pdf` → `/`
  if (pathname === "/mk-2023-cv-webdev.pdf") {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/resume", "/mk-2023-cv-webdev.pdf"],
};
