import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticate } from "services/auth";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = await authenticate({
          email,
          password,
        });

        // If no error and we have user data, return it
        if (user) return { id: user.uid, ...user };
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth?redirect=signin",
    error: "/auth?redirect=error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user) {
        return true;
      } else {
        // Return false to display a default error message
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session, user, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.accessToken = user.id;
        token.user = user;
      }
      return token;
    },
  },
});
