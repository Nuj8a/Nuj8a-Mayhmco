'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import {
  categoryFormSchema,
  CategoryFormValues,
  CategorySchema
} from '@/shared/types/categorySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Plus, X } from 'lucide-react';
import RadioTree from './RadioTree';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ImageUpload from '@/app/dashboard/products/add/ImageUpload';
import { useDropzone } from 'react-dropzone';
import { Textarea } from '@/components/ui/textarea';
import {
  createCategory,
  updateCategory
} from '@/api/react-query/mutations/categoryMutations';
import { fetchAllCategories } from '@/api/react-query/queries/categoryQueries';
import { mapCategories } from './mapCategories';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type Category = {
  id: string;
  label: string;
  value: string;
  type?: 'file' | 'folder';
  children?: Category[];
  parentId?: null | undefined | Number | String;
  isActive?: Boolean;
  position?: Number;
};

interface PropsInterface {
  updateData?: CategorySchema;
}

const CategoryForm = ({ updateData }: PropsInterface) => {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: '',
      description: '',
      parentId: 'root',
      position: undefined,
      displayMode: 'products_description',
      banner: '',
      isActive: true,
      metaTitle: '',
      slug: '',
      metaKeyword: '',
      metaDescription: ''
    }
  });
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const route = useRouter();

  const { reset } = form;

  useEffect(() => {
    if (updateData) {
      reset({
        name: updateData.name || '',
        description: updateData.description || '',
        parentId: String(updateData.id) || 'root',
        position: Number(updateData.position) || undefined,
        displayMode: updateData.displayMode || 'products_description',
        banner: updateData.Banner || '',
        isActive: updateData.isActive ?? true,
        metaTitle: updateData.metaTitle || '',
        slug: updateData.slug || '',
        metaKeyword: updateData.metaKeyword || '',
        metaDescription: updateData.metaDescription || ''
      });
    }
  }, [updateData, reset]);

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = [
      ...uploadedImages,
      ...acceptedFiles.slice(0, 7 - uploadedImages.length)
    ];
    setUploadedImages(newFiles);
  };
  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    },
    maxFiles: 7
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const scrollUP = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const rawCategories = await fetchAllCategories();
      const structuredCategories = mapCategories(rawCategories.data);

      const rootCategory: Category = {
        id: 'root',
        label: 'Root',
        value: '',
        type: 'folder',
        children: structuredCategories
      };

      setCategories([rootCategory]);

      const initialExpanded: Record<string, boolean> = {};
      const populateExpanded = (category: Category) => {
        if (category.type === 'folder') {
          if (!updateData?.id) {
            if (category.id === 'root') {
              initialExpanded[category.id] = true;
            } else {
              initialExpanded[category.id] = false;
            }
          } else {
            initialExpanded[category.id] = true;
          }
          category.children?.forEach(populateExpanded);
        }
      };
      populateExpanded(rootCategory);

      setExpanded(initialExpanded);
    };

    fetchCategories();
  }, [updateData]);

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      const formData = {
        ...data,
        banner: uploadedImages[0]
      };

      const res = !updateData?.id
        ? await createCategory(formData)
        : await updateCategory(String(updateData?.id), {
            ...formData,
            banner: uploadedImages[0]
              ? uploadedImages[0]
              : updateData?.Banner || null,
            id: updateData?.id
          });

      if (res?.category) {
        if (!updateData?.id) {
          const newCategory = res.category;

          setCategories((prevCategories) => {
            const addCategory = (categories: Category[]): Category[] => {
              return categories.map((category) => {
                if (category.id === 'root' && newCategory.parentId === null) {
                  return {
                    ...category,
                    children: [
                      {
                        id: newCategory.id.toString(),
                        label: newCategory.name,
                        value: newCategory.name,
                        type: 'file',
                        children: [],
                        isActive: newCategory.isActive,
                        position: newCategory.position
                      },
                      ...(category.children || [])
                    ]
                  };
                }

                // Find and update parent if it exists
                if (category.id === newCategory.parentId?.toString()) {
                  // If the parent is a file, convert it to a folder
                  return {
                    ...category,
                    type: 'folder',
                    children: [
                      {
                        id: newCategory.id.toString(),
                        label: newCategory.name,
                        value: newCategory.name,
                        type: 'file',
                        children: [],
                        isActive: newCategory.isActive,
                        position: newCategory.position
                      },
                      ...(category.children || [])
                    ]
                  };
                }

                // Traverse children if necessary
                if (category.children) {
                  return {
                    ...category,
                    children: addCategory(category.children)
                  };
                }

                return category;
              });
            };

            return addCategory(prevCategories);
          });

          // Automatically expand the parent folder if needed
          if (newCategory.parentId) {
            setExpanded((prevExpanded) => ({
              ...prevExpanded,
              [newCategory.parentId.toString()]: true
            }));
          }

          toast.success('Category created successfully!');
          form.reset();
        } else {
          toast.success('Category updated successfully.');
          route.push('/dashboard/settings/category');
        }
      }
    } catch (error) {
      toast.error('Failed to create category');
    } finally {
      scrollUP();
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 "
        >
          <div className="rounded-md border bg-card p-5 pb-7">
            <CardHeader className="mb-1 p-0">
              <CardTitle className="pb-1 text-lg">Category</CardTitle>
              <Separator />
            </CardHeader>
            <FormField
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm font-medium">
                    Parent Id
                  </FormLabel>
                  <FormControl>
                    <RadioTree
                      field={field}
                      setExpanded={setExpanded}
                      expanded={expanded}
                      categories={categories}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid min-h-[200px]  grid-cols-12 gap-5">
            <div className="col-span-8 flex h-full flex-col gap-5">
              <div className="rounded-md border bg-card p-5 pb-7">
                <CardHeader className="mb-2 p-0">
                  <CardTitle className="pb-1 text-lg">General</CardTitle>
                  <Separator />
                </CardHeader>
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-sm font-medium">
                          Category Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter category name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Description
                        </FormLabel>
                        <FormControl>
                          <div className="min-h-[200px]">
                            <ReactQuill
                              theme="snow"
                              value={field.value || ''}
                              onChange={field.onChange}
                              placeholder="Enter product description"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="rounded-md border bg-card p-5 pb-7">
                <CardHeader className="mb-2 p-0">
                  <CardTitle className="pb-1 text-lg">
                    SEO (Search Engine Optimization)
                  </CardTitle>
                  <Separator />
                </CardHeader>
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="metaTitle"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-sm font-medium">
                          Meta Title
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter meta title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-sm font-medium">
                          Slug
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter slug" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="metaKeyword"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-sm font-medium">
                          Meta Keyword
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter meta keyword" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="metaDescription"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-sm font-medium">
                          Meta Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            className="resize-none"
                            placeholder="Enter meta description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-4 h-full ">
              <div className="flex flex-col gap-2 rounded-md border bg-card p-5">
                <CardHeader className="mb-1 p-0">
                  <CardTitle className="pb-1 text-lg">Settings</CardTitle>
                  <Separator />
                </CardHeader>
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm font-medium">
                        Position
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter position"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                            )
                          }
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="displayMode"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm font-medium">
                        Display Mode
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(value ? String(value) : undefined)
                          }
                          value={field.value ? String(field.value) : ''}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={'Select a display mode'}
                            />
                          </SelectTrigger>
                          <SelectContent className="z-50">
                            <SelectGroup>
                              <SelectItem
                                className="hover:bg-card"
                                value="products_description"
                              >
                                Products And Description
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-card"
                                value="products"
                              >
                                Products Only
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-card"
                                value="description"
                              >
                                Description Only
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="banner"
                  render={() => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm font-medium">
                        Banner Image
                      </FormLabel>
                      <ImageUpload
                        isDragActive={isDragActive}
                        getRootProps={getRootProps}
                        getInputProps={getInputProps}
                        uploadedImages={uploadedImages}
                        removeImage={removeImage}
                        updateData={updateData?.Banner || ''}
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3">
                      <FormControl className="mt-2">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) =>
                            field.onChange(!!checked)
                          }
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-medium">
                        Active Category
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="h-[1px] w-full border border-dashed border-border"></div>
            <div className="flex gap-5">
              <Button variant="destructive" type="reset">
                Reset <X className="ml-2 mt-[1px] h-4 w-4" />
              </Button>
              <Button
                isLoading={form.formState.isSubmitting}
                loadingText="Adding..."
                variant="default"
                type="submit"
                className="flex gap-1 text-nowrap"
              >
                {!updateData?.id ? (
                  <>
                    Add Category <Plus className="ml-2 mt-[1px] h-4 w-4" />
                  </>
                ) : (
                  <>
                    Update Category <Pencil className="ml-2 mt-[1px] h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
