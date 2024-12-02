import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id || isNaN(parseInt(id))) {
    return NextResponse.json(
      { error: 'A valid highlight ID is required' },
      { status: 400 }
    );
  }

  const isDeleted = req.nextUrl.searchParams.get('isdeleted') === 'true';

  try {
    const highlight = await prisma.highlight.findFirst({
      where: {
        id: parseInt(id),
        deletedAt: isDeleted ? { not: null } : null
      }
    });

    if (!highlight) {
      return NextResponse.json(
        { error: `Highlight with ID ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: highlight });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error fetching highlight' },
      { status: 500 }
    );
  }
}
