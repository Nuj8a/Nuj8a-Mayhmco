import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface UserSession extends DefaultSession['user'] {
    id: number;
    name: string;
    email: string;
    role: string;
    profile: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    token: string;
  }

  interface Session {
    user: UserSession;
  }

  interface CredentialsInputs {
    name: string;
    password: string;
  }
}
