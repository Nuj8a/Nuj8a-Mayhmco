import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import handleFileUpload from '../utils/handleFileUpload';
import path from 'path';
import fs from 'fs/promises';
const prisma = new PrismaClient();

const UPLOAD_DIRECTORY = 'banner';
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_FILE_SIZE_MB = 4;

export async function GET(req: NextRequest) {
  const {
    page = '1',
    row = '10',
    search = '',
    showDeleted = 'false',
    isActive = ''
  } = Object.fromEntries(req.nextUrl.searchParams.entries());

  const offset = (parseInt(page) - 1) * parseInt(row);

  try {
    const filters: any = {
      deletedAt: showDeleted === 'true' ? { not: null } : null,
      name: { contains: search }
    };

    if (isActive !== '') {
      filters.isActive = isActive === 'true';
    }

    const banners =
      row === '0'
        ? await prisma.banner.findMany({
            where: filters,
            orderBy: { id: 'desc' }
          })
        : await prisma.banner.findMany({
            where: filters,
            skip: offset,
            take: parseInt(row),
            orderBy: { id: 'desc' }
          });

    const totalBanners = await prisma.banner.count({
      where: filters
    });

    return NextResponse.json({
      data: banners,
      pagination: {
        total: totalBanners,
        totalPages: row === '0' ? 1 : Math.ceil(totalBanners / parseInt(row)),
        currentPage: row === '0' ? 1 : parseInt(page),
        row: parseInt(row)
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching banners' },
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
    const displayMode = formData.get('displayMode') as string;
    const description = formData.get('description') as string;

    if (!name || isNaN(position) || !displayMode || !description) {
      return NextResponse.json(
        { error: 'Name, position, displayMode, and description are required' },
        { status: 400 }
      );
    }

    const banner = formData.get('banner') as File | null;
    const bannerUrl = banner
      ? await handleFileUpload(banner, {
          allowedTypes: ALLOWED_FILE_TYPES,
          maxSizeMB: MAX_FILE_SIZE_MB,
          uploadDirectory: UPLOAD_DIRECTORY
        })
      : null;

    const newBanner = await prisma.banner.create({
      data: {
        name,
        position,
        isActive,
        displayMode,
        description,
        banner: bannerUrl
      }
    });

    return NextResponse.json({
      message: 'Banner created successfully',
      banner: newBanner
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

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const formData = await req.formData();

    const existingBanner = await prisma.banner.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingBanner) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 });
    }

    const name = (formData.get('name') as string) || existingBanner.name;
    const position = formData.get('position')
      ? parseInt(formData.get('position') as string)
      : existingBanner.position;
    const isActive =
      formData.get('isActive') !== undefined
        ? formData.get('isActive') === 'true'
        : existingBanner.isActive;
    const displayMode =
      (formData.get('displayMode') as string) || existingBanner.displayMode;
    const description =
      (formData.get('description') as string) || existingBanner.description;

    const banner = formData.get('banner');
    let bannerUrl: string | null = existingBanner.banner;

    if (typeof banner === 'string') {
      bannerUrl = banner;
    } else if (banner instanceof File) {
      bannerUrl = await handleFileUpload(banner, {
        allowedTypes: ALLOWED_FILE_TYPES,
        maxSizeMB: MAX_FILE_SIZE_MB,
        uploadDirectory: UPLOAD_DIRECTORY
      });

      if (existingBanner.banner) {
        const oldBannerPath = path.join(
          UPLOAD_DIRECTORY,
          path.basename(existingBanner.banner)
        );
        await fs.unlink(oldBannerPath).catch(() => {});
      }
    }

    const updatedBanner = await prisma.banner.update({
      where: { id: parseInt(id) },
      data: {
        name,
        position,
        isActive,
        displayMode,
        description,
        banner: bannerUrl
      }
    });

    return NextResponse.json({
      message: 'Banner updated successfully',
      banner: updatedBanner
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

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const existingBanner = await prisma.banner.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingBanner) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 });
    }

    if (existingBanner.deletedAt) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 });
    }

    const deletedBanner = await prisma.banner.update({
      where: { id: parseInt(id) },
      data: { deletedAt: new Date(), isActive: false }
    });

    return NextResponse.json({
      message: 'Banner marked as deleted',
      banner: deletedBanner
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error deleting banner' },
      { status: 500 }
    );
  }
}
