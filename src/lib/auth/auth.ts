import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("🔐 signIn callback:", {
        user,
        account,
        profile,
        email,
        credentials,
      });
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log("➡️ redirect callback:", { url, baseUrl });
      return url;
    },
    async session({ session, token, user }) {
      console.log("📦 session callback:", { session, token, user });
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("🧪 jwt callback:", {
        token,
        user,
        account,
        profile,
        isNewUser,
      });
      return token;
    },
  },
};
