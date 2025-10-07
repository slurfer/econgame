import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // Custom middleware logic
  function middleware(req) {
    const role = req.nextauth.token?.role;
    console.log(role);

    // Example: only allow admins to access /api routes
    if (req.nextUrl.pathname.startsWith("/api/admin") && role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // must be logged in
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/api/admin/:path*"], // apply to all /api routes
};
