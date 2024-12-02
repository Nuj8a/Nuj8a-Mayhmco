import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: 'banner ID is required' },
      { status: 400 }
    );
  }

  const isDeleted = req.nextUrl.searchParams.get('isdeleted') === 'true';

  try {
    const banner = await prisma.banner.findFirst({
      where: {
        id: parseInt(id),
        deletedAt: isDeleted ? { not: null } : null
      }
    });

    if (!banner) {
      return NextResponse.json(
        { error: `banner with ID ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: banner });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching banner' },
      { status: 500 }
    );
  }
}
