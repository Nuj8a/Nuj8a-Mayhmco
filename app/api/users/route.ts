import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const {
      id,
      search = '',
      page = '1',
      row = '10'
    } = Object.fromEntries(req.nextUrl.searchParams.entries());

    if (id) {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) }
      });
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json({ user });
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [{ name: { contains: search } }, { email: { contains: search } }]
      },
      skip: (parseInt(page) - 1) * parseInt(row),
      take: parseInt(row),
      orderBy: { id: 'desc' }
    });

    const totalUsers = await prisma.user.count({
      where: {
        OR: [{ name: { contains: search } }, { email: { contains: search } }]
      }
    });

    return NextResponse.json({
      data: users,
      pagination: {
        total: totalUsers,
        totalPages: Math.ceil(totalUsers / parseInt(row)),
        currentPage: parseInt(page),
        row: parseInt(row)
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching user(s)' },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    const newUser = await prisma.user.create({
      data: { name, email }
    });

    return NextResponse.json({ message: 'User added', user: newUser });
  } catch (error) {
    return NextResponse.json({ error: 'Error adding user' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id } = Object.fromEntries(req.nextUrl.searchParams.entries());
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const body = await req.json();
    const { name, email } = body;

    const oldUser = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });

    if (!oldUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name: name || oldUser.name,
        email: email || oldUser.email
      }
    });

    return NextResponse.json({ message: 'User updated', user: updatedUser });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = Object.fromEntries(req.nextUrl.searchParams.entries());
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const user = await prisma.user.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: 'User deleted', user });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
}
