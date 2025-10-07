import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.username === "admin" &&
          credentials?.password === "SecurityThroughObscurity!"
        ) {
          return { id: "1", name: "Admin", role: "admin" };
        }
        if (
          credentials?.username === "user" &&
          credentials?.password === "lubosjehot"
        ) {
          return { id: "2", name: "User", role: "user" };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role; // store role in JWT
      return token;
    },
    async session({ session, token }) {
      if (token) session.user.role = token.role; // expose role in session
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
