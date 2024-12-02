import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { validateToken } from '../middleware';
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const tokenValidationResult = await validateToken(
      req,
      async (validatedReq: any) => {
        // const { userId, role } = validatedReq.user;

        const {
          id,
          search = '',
          page = '1',
          row = '10'
        } = Object.fromEntries(req.nextUrl.searchParams.entries());

        if (id) {
          const admin = await prisma.admin.findUnique({
            where: { id: parseInt(id) }
          });
          if (!admin) {
            return NextResponse.json(
              { error: 'Admin not found' },
              { status: 404 }
            );
          }
          return NextResponse.json({ admin });
        }

        const admins = await prisma.admin.findMany({
          where: {
            OR: [
              { name: { contains: search } },
              { email: { contains: search } }
            ]
          },
          skip: (parseInt(page) - 1) * parseInt(row),
          take: parseInt(row),
          orderBy: { id: 'desc' }
        });

        const totaladmins = await prisma.admin.count({
          where: {
            OR: [
              { name: { contains: search } },
              { email: { contains: search } }
            ]
          }
        });

        return NextResponse.json({
          data: admins,
          pagination: {
            total: totaladmins,
            totalPages: Math.ceil(totaladmins / parseInt(row)),
            currentPage: parseInt(page),
            row: parseInt(row)
          }
        });
      }
    );

    if (tokenValidationResult) {
      return tokenValidationResult;
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching admin(s)' },
      { status: 500 }
    );
  }
}
