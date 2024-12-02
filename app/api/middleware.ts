import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function validateToken(req: Request, next: Function) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Please log in or register' },
      { status: 400 }
    );
  }

  try {
    const decoded: any = jwt.decode(token);

    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    const userId = decoded.userId;
    const role = decoded.role;

    if (!userId || !role) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized: Missing user info or role' },
        { status: 401 }
      );
    }

    req.user = { userId, role };

    return next(req);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized: Please log in or register' },
      { status: 401 }
    );
  }
}
