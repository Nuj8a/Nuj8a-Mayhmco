// @ts-nocheck

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
    isActive = '',
    parentId = ''
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

    if (parentId) {
      filters.parentId = parseInt(parentId);
    }

    const categories =
      row === '0'
        ? await prisma.category.findMany({
            where: filters,
            orderBy: { id: 'desc' }
          })
        : await prisma.category.findMany({
            where: filters,
            skip: offset,
            take: parseInt(row),
            orderBy: { id: 'desc' }
          });

    const totalCategories = await prisma.category.count({
      where: filters
    });

    return NextResponse.json({
      data: categories,
      pagination: {
        total: totalCategories,
        totalPages:
          row === '0' ? 1 : Math.ceil(totalCategories / parseInt(row)),
        currentPage: row === '0' ? 1 : parseInt(page),
        row: parseInt(row)
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching categories' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const position = parseInt(formData.get('position') as string);
    const parentId = formData.get('parentId') as string | null;
    const isActive = formData.get('isActive') === 'true';
    const displayMode = formData.get('displayMode') as string;
    const description = formData.get('description') as string;
    const metaTitle = formData.get('metaTitle') as string;
    const slug = formData.get('slug') || undefined;
    const metaKeyword = formData.get('metaKeyword') || undefined;
    const metaDescription = formData.get('metaDescription') || undefined;

    if (
      !name ||
      isNaN(position) ||
      !displayMode ||
      !metaTitle ||
      !description
    ) {
      return NextResponse.json(
        {
          error:
            'Name, position, displayMode, metaTitle, and description are required'
        },
        { status: 400 }
      );
    }

    const validDisplayModes = [
      'products_description',
      'products',
      'description'
    ];
    if (!validDisplayModes.includes(displayMode)) {
      return NextResponse.json(
        {
          error: `Invalid displayMode. Must be one of: ${validDisplayModes.join(
            ', '
          )}`
        },
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

    const newCategory = await prisma.category.create({
      data: {
        name,
        position,
        isActive,
        displayMode,
        description,
        metaTitle,
        slug,
        metaKeyword,
        metaDescription,
        Banner: bannerUrl ? String(bannerUrl) : null,
        parent: parentId
          ? {
              connect: { id: Number(parentId) }
            }
          : undefined
      }
    });

    const allCategories = await prisma.category.findMany();

    return NextResponse.json({
      message: 'Category created successfully',
      category: newCategory,
      allCategories
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
    const formData = await req.formData();

    const id = formData.get('id');
    const name = formData.get('name') as string;
    const position = parseInt(formData.get('position') as string);
    const parentId = formData.get('parentId') as string | null;
    const isActive = formData.get('isActive') === 'true';
    const displayMode = formData.get('displayMode') as string;
    const description = formData.get('description') as string;
    const metaTitle = formData.get('metaTitle') as string;
    const slug = formData.get('slug') || undefined;
    const metaKeyword = formData.get('metaKeyword') || undefined;
    const metaDescription = formData.get('metaDescription') || undefined;

    if (
      !id ||
      !name ||
      isNaN(position) ||
      !displayMode ||
      !metaTitle ||
      !description
    ) {
      return NextResponse.json(
        {
          error:
            'ID, Name, position, displayMode, metaTitle, and description are required'
        },
        { status: 400 }
      );
    }

    const validDisplayModes = [
      'products_description',
      'products',
      'description'
    ];
    if (!validDisplayModes.includes(displayMode)) {
      return NextResponse.json(
        {
          error: `Invalid displayMode. Must be one of: ${validDisplayModes.join(
            ', '
          )}`
        },
        { status: 400 }
      );
    }

    const banner = formData.get('banner');
    let bannerUrl: string | null = null;

    const existingCategory = await prisma.category.findUnique({
      where: { id: Number(id) }
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    if (typeof banner === 'string') {
      // If `banner` is a string, retain the previous banner URL
      bannerUrl = banner;
    } else if (banner instanceof File) {
      // If `banner` is a File, upload it and replace the existing banner
      bannerUrl = await handleFileUpload(banner, {
        allowedTypes: ALLOWED_FILE_TYPES,
        maxSizeMB: MAX_FILE_SIZE_MB,
        uploadDirectory: UPLOAD_DIRECTORY
      });

      if (existingCategory.Banner) {
        const oldBannerPath = path.join(
          UPLOAD_DIRECTORY,
          path.basename(existingCategory.Banner)
        );
        await fs.unlink(oldBannerPath).catch(() => {
          // console.warn(`Failed to remove old banner: ${oldBannerPath}`);
        });
      }
    }

    const updatedCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: {
        name,
        position,
        isActive,
        displayMode,
        description,
        metaTitle,
        slug,
        metaKeyword,
        metaDescription,
        Banner: bannerUrl,
        parent: parentId
          ? {
              connect: { id: Number(parentId) }
            }
          : undefined
      }
    });

    const allCategories = await prisma.category.findMany();

    return NextResponse.json({
      message: 'Category updated successfully',
      category: updatedCategory,
      allCategories
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
    const deletedCategory = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { deletedAt: new Date(), isActive: false }
    });

    return NextResponse.json({
      message: 'Category marked as deleted',
      category: deletedCategory
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error deleting category' },
      { status: 500 }
    );
  }
}
