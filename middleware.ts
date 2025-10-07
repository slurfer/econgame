import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role;

    // Not logged in
    if (!req.nextauth.token) {
      // If it's an API route, return 401 instead of redirecting
      if (req.nextUrl.pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      // Otherwise, redirect to login (for pages)
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Role-based check for admin routes
    if (req.nextUrl.pathname.startsWith("/api/admin") && role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // always run middleware logic above
    },
  }
);

export const config = {
  matcher: ["/api/admin/:path*"],
};
