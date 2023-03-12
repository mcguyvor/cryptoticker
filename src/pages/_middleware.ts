import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === request.nextUrl.pathname.toLocaleUpperCase())
    return NextResponse.next();
  return NextResponse.redirect(
    `${request.nextUrl.origin}${request.nextUrl.pathname.toLocaleUpperCase()}`
  );
}
