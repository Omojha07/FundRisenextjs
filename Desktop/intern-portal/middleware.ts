import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if user is trying to access protected routes
  const protectedPaths = ["/dashboard", "/rewards", "/leaderboard"]
  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  if (isProtectedPath) {
    // Check for auth token in cookies
    const authToken = request.cookies.get("auth-token")

    if (!authToken || authToken.value !== "authenticated") {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/rewards/:path*", "/leaderboard/:path*"],
}
