import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import handleFileUpload from '../utils/handleFileUpload';
import path from 'path';
import fs from 'fs/promises';

const prisma = new PrismaClient();

const UPLOAD_DIRECTORY = 'highlight';
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_FILE_SIZE_MB = 4;
const MAX_IMAGES = 7;

const manageMultipleFileUploads = async (
  files: File[] | null,
  existingFiles?: string[]
) => {
  const uploadedFiles: string[] = existingFiles || [];

  if (files) {
    for (const file of files) {
      const filePath = await handleFileUpload(file, {
        allowedTypes: ALLOWED_FILE_TYPES,
        maxSizeMB: MAX_FILE_SIZE_MB,
        uploadDirectory: UPLOAD_DIRECTORY
      });
      uploadedFiles.push(String(filePath));
    }
  }

  if (uploadedFiles.length > MAX_IMAGES) {
    throw new Error(`Cannot upload more than ${MAX_IMAGES} images.`);
  }

  return uploadedFiles;
};

export async function GET(req: NextRequest) {
  const {
    page = '1',
    row = '10',
    search = '',
    showDeleted = 'false'
  } = Object.fromEntries(req.nextUrl.searchParams.entries());

  const offset = (parseInt(page) - 1) * parseInt(row);

  try {
    const filters = {
      deletedAt: showDeleted === 'true' ? { not: null } : null,
      name: { contains: search }
    };

    const [highlights, total] = await Promise.all([
      prisma.highlight.findMany({
        where: filters,
        skip: offset,
        take: parseInt(row),
        orderBy: { id: 'desc' }
      }),
      prisma.highlight.count({ where: filters })
    ]);

    return NextResponse.json({
      data: highlights,
      pagination: {
        total,
        totalPages: Math.ceil(total / parseInt(row)),
        currentPage: parseInt(page),
        row: parseInt(row)
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching highlights' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const position = parseInt(formData.get('position') as string);
    const isActive = formData.get('isActive') === 'true';

    if (!name || isNaN(position)) {
      return NextResponse.json(
        { error: 'Name and position are required' },
        { status: 400 }
      );
    }

    const highlightFiles = formData.getAll('highlight') as File[];
    const highlightUrls = await manageMultipleFileUploads(highlightFiles);

    const newHighlight = await prisma.highlight.create({
      data: {
        name,
        position,
        isActive,
        highlight: highlightUrls.join(',')
      }
    });

    return NextResponse.json({
      message: 'Highlight created successfully',
      highlight: newHighlight
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id } = Object.fromEntries(req.nextUrl.searchParams.entries());
    if (!id)
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const existingHighlight = await prisma.highlight.findUnique({
      where: { id: parseInt(id) }
    });
    if (!existingHighlight)
      return NextResponse.json(
        { error: 'Highlight not found' },
        { status: 404 }
      );

    const formData = await req.formData();
    const name = (formData.get('name') as string) || existingHighlight.name;
    const position = formData.get('position')
      ? parseInt(formData.get('position') as string)
      : existingHighlight.position;
    const isActive =
      formData.get('isActive') !== undefined
        ? formData.get('isActive') === 'true'
        : existingHighlight.isActive;

    const highlightEntries = formData.getAll('highlight');
    let highlightUrls: string[] = [];

    if (highlightEntries.length > 0) {
      const hasFile = highlightEntries.some((entry) => entry instanceof File);

      if (hasFile) {
        const existingFiles = existingHighlight.highlight.split(',');

        for (const filePath of existingFiles) {
          const absolutePath = path.join(process.cwd(), 'public', filePath);
          await fs.unlink(absolutePath).catch(() => {
            console.error(`Failed to delete old file: ${filePath}`);
          });
        }

        const highlightFiles = highlightEntries.filter(
          (entry) => entry instanceof File
        ) as File[];
        highlightUrls = await manageMultipleFileUploads(highlightFiles);
      } else if (highlightEntries.length === 1 && highlightEntries[0] === '') {
        const existingFiles = existingHighlight.highlight.split(',');

        for (const filePath of existingFiles) {
          const absolutePath = path.join(process.cwd(), 'public', filePath);
          await fs.unlink(absolutePath).catch(() => {
            console.error(`Failed to delete old file: ${filePath}`);
          });
        }

        highlightUrls = [];
      } else {
        return NextResponse.json(
          { error: 'Invalid highlight data provided' },
          { status: 400 }
        );
      }
    } else {
      highlightUrls = existingHighlight.highlight.split(',');
    }

    const updatedHighlight = await prisma.highlight.update({
      where: { id: parseInt(id) },
      data: {
        name,
        position,
        isActive,
        highlight: highlightUrls.join(',')
      }
    });

    return NextResponse.json({
      message: 'Highlight updated successfully',
      highlight: updatedHighlight
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = Object.fromEntries(req.nextUrl.searchParams.entries());
  if (!id)
    return NextResponse.json({ error: 'ID is required.' }, { status: 400 });

  try {
    const existingHighlight = await prisma.highlight.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingHighlight || existingHighlight.deletedAt) {
      return NextResponse.json(
        { error: 'Highlight not found.' },
        { status: 404 }
      );
    }

    const deletedHighlight = await prisma.highlight.update({
      where: { id: parseInt(id) },
      data: { deletedAt: new Date(), isActive: false }
    });

    return NextResponse.json({
      message: 'Highlight marked as deleted.',
      highlight: deletedHighlight
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error deleting highlight.' },
      { status: 500 }
    );
  }
}
