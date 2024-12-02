import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle GET request to fetch a single category by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: 'Category ID is required' },
      { status: 400 }
    );
  }

  const isDeleted = req.nextUrl.searchParams.get('isdeleted') === 'true';

  try {
    const category = await prisma.category.findFirst({
      where: {
        id: parseInt(id),
        deletedAt: isDeleted ? { not: null } : null
      },
      include: { parent: true, children: true } // Include relationships if needed
    });

    if (!category) {
      return NextResponse.json(
        { error: `Category with ID ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: category });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching category' },
      { status: 500 }
    );
  }
}
