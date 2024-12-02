import NextAuth from 'next-auth';
import authConfig from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req: any) => {
  if (!req.auth) {
    const url = req.url.replace(req.nextUrl.pathname, '/sign-in');
    return Response.redirect(url);
  }
});

export const config = { matcher: ['/dashboard/:path*'] };
