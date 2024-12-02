// app/global.d.ts

declare global {
  interface Request {
    user?: { userId: string; role: string };
  }
}

export {};
