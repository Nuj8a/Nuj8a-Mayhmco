// import { NextAuthConfig, DefaultSession } from 'next-auth';
// import CredentialProvider from 'next-auth/providers/credentials';
// import GithubProvider from 'next-auth/providers/github';

// interface CustomUser {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   profile: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
//   token: string;
// }

// declare module 'next-auth' {
//   interface Session {
//     user: CustomUser & DefaultSession['user'];
//   }

//   interface User extends CustomUser {}
// }

// const authConfig: NextAuthConfig = {
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID ?? '',
//       clientSecret: process.env.GITHUB_SECRET ?? ''
//     }),
//     CredentialProvider({
//       credentials: {
//         token: { label: 'token', type: 'token' }
//       },
//       async authorize(credentials) {
//         if (credentials) {
//           const data = await fetch(
//             `${process.env.NEXTAUTH_URL}/api/admin/mydata`,
//             {
//               method: 'GET',
//               headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${credentials.token}`
//               }
//             }
//           );

//           const result = await data.json();

//           if (result.success) {
//             const user: CustomUser = {
//               id: result.data?.id || '',
//               name: result.data?.name || '',
//               email: result.data?.email || '',
//               role: result.data?.role || '',
//               profile: result.data?.profile || '',
//               status: result.data?.status || '',
//               createdAt: result.data?.createdAt || '',
//               updatedAt: result.data?.updatedAt || '',
//               token: result.data?.token || ''
//             };
//             return user;
//           }
//         }
//         return null;
//       }
//     })
//   ],
//   pages: {
//     signIn: '/'
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.email = user.email;
//         token.role = user.role;
//         token.profile = user.profile;
//         token.status = user.status;
//         token.createdAt = user.createdAt;
//         token.updatedAt = user.updatedAt;
//         token.token = user.token;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id as string;
//         session.user.name = token.name as string;
//         session.user.email = token.email as string;
//         session.user.role = token.role as string;
//         session.user.profile = token.profile as string;
//         session.user.status = token.status as string;
//         session.user.createdAt = token.createdAt as string;
//         session.user.updatedAt = token.updatedAt as string;
//         session.user.token = token.token as string;
//       }
//       return session;
//     },
//     async redirect({ url, baseUrl }) {
//       return url === '/' ? `${baseUrl}/dashboard` : url;
//     }
//   },
//   trustHost: true
// };

// export default authConfig;
