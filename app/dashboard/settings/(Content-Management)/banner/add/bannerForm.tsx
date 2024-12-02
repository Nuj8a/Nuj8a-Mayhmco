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
  bannerFormSchema,
  bannerFormValues,
  bannerSchema
} from '@/shared/types/bannerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Plus, X } from 'lucide-react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ImageUpload from '@/app/dashboard/products/add/ImageUpload';
import { useDropzone } from 'react-dropzone';
import {
  createbanner,
  updatebanner
} from '@/api/react-query/mutations/bannerMutations';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface PropsInterface {
  updateData?: bannerSchema;
}

const BannerForm = ({ updateData }: PropsInterface) => {
  const form = useForm<bannerFormValues>({
    resolver: zodResolver(bannerFormSchema),
    defaultValues: {
      name: '',
      description: '',
      position: undefined,
      displayMode: 'products_description',
      banner: '',
      isActive: true
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
        position: Number(updateData.position) || undefined,
        displayMode: updateData.displayMode || 'products_description',
        banner: updateData.banner || '',
        isActive: updateData.isActive ?? true
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

  const scrollUP = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const onSubmit = async (data: bannerFormValues) => {
    try {
      const formData = {
        ...data,
        banner: uploadedImages[0]
      };

      const res = !updateData?.id
        ? await createbanner(formData)
        : await updatebanner(String(updateData?.id), {
            ...formData,
            banner: uploadedImages[0]
              ? uploadedImages[0]
              : updateData?.banner || null,
            id: updateData?.id
          });

      if (res?.banner) {
        if (!updateData?.id) {
          // const newbanner = res.banner;

          toast.success('Banner created successfully!');
          form.reset();
        } else {
          toast.success('Banner updated successfully.');
          route.push('/dashboard/settings/banner');
        }
      }
    } catch (error) {
      toast.error('Failed to create banner');
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
                          Banner Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter banner name" {...field} />
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
                        updateData={updateData?.banner || ''}
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
                        Active banner
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
                loadingText={
                  !updateData?.id ? `Adding Banner...` : `Updating Banner...`
                }
                variant="default"
                type="submit"
                className="flex gap-1 text-nowrap"
              >
                {!updateData?.id ? (
                  <>
                    Add Banner <Plus className="ml-2 mt-[1px] h-4 w-4" />
                  </>
                ) : (
                  <>
                    Update Banner <Pencil className="ml-2 mt-[1px] h-4 w-4" />
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

export default BannerForm;
