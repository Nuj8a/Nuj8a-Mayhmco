import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import handleFileUpload from '../../utils/handleFileUpload';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || '';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get('name')?.toString();
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    const profileFile = formData.get('profile') as File | null;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and password are required.' },
        { status: 400 }
      );
    }

    const existingAdmin = await prisma.admin.findUnique({ where: { email } });
    if (existingAdmin) {
      return NextResponse.json(
        { success: false, message: 'Email already registered.' },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const profilePath = await handleFileUpload(profileFile, {
      maxFiles: 1,
      allowedTypes: ['image/jpeg', 'image/png'],
      maxSizeMB: 2,
      uploadDirectory: 'admin/profile'
    });

    const newAdmin = await prisma.admin.create({
      data: {
        name,
        email,
        passwordHash,
        role: 1,
        profile: profilePath,
        status: 'active',
        verified: false
      }
    });

    const token = jwt.sign(
      { userId: newAdmin.id, role: newAdmin.role },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    return NextResponse.json({
      success: true,
      message: 'Registration successful. Please verify your account.',
      token,
      data: {
        id: newAdmin.id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
        profile: newAdmin.profile,
        status: newAdmin.status,
        createdAt: newAdmin.createdAt,
        updatedAt: newAdmin.updatedAt
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'An error occurred during registration.' },
      { status: 500 }
    );
  }
}
