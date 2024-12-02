import { NextAuthConfig, DefaultSession } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

interface CustomUser {
  id: string;
  name: string;
  email: string;
  role: string;
  profile: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  token: string;
  emailVerified: Date | null;
}

declare module 'next-auth' {
  interface Session {
    user: CustomUser & DefaultSession['user'];
  }
  interface User extends CustomUser {}
}

const authConfig: NextAuthConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || ''
    }),
    CredentialProvider({
      credentials: {
        token: { label: 'Token', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.token) return null;

        try {
          const response = await fetch(
            `${process.env.NEXTAUTH_URL}/api/admin/mydata`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${credentials.token}`
              }
            }
          );

          if (!response.ok) return null;

          const { success, data } = await response.json();

          if (success) {
            return {
              ...data,
              token: credentials.token,
              emailVerified: data.emailVerified || null
            } as CustomUser;
          }
        } catch (error) {
          console.error('Authorization error:', error);
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/'
  },
  callbacks: {
    async jwt({ token, user }) {
      return user
        ? {
            ...token,
            ...user
          }
        : token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          ...token
        } as CustomUser;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url === '/' ? `${baseUrl}/dashboard` : url;
    }
  },
  trustHost: true
};

export default authConfig;
