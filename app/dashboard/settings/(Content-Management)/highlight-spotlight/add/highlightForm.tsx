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
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import {
  highlightFormSchema,
  highlightFormValues,
  highlightSchema
} from '@/shared/types/highlightSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Plus, X } from 'lucide-react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ImageUpload from '@/app/dashboard/products/add/ImageUpload';
import { useDropzone } from 'react-dropzone';
import {
  createhighlight,
  updatehighlight
} from '@/api/react-query/mutations/highlightMutations';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface PropsInterface {
  updateData?: highlightSchema;
}

const HighlightForm = ({ updateData }: PropsInterface) => {
  const form = useForm<highlightFormValues>({
    resolver: zodResolver(highlightFormSchema),
    defaultValues: {
      name: '',
      position: undefined,
      highlight: '',
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
        position: Number(updateData.position) || undefined,
        highlight: updateData.highlight || '',
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

  const onSubmit = async (data: highlightFormValues) => {
    try {
      const formData = {
        ...data,
        highlight: uploadedImages
      };

      const res = !updateData?.id
        ? await createhighlight(formData)
        : await updatehighlight(String(updateData?.id), {
            ...formData,
            highlight: uploadedImages
              ? uploadedImages
              : updateData?.highlight || null,
            id: updateData?.id
          });

      if (res?.highlight) {
        if (!updateData?.id) {
          // const newhighlight = res.highlight;

          toast.success('highlight created successfully!');
          form.reset();
        } else {
          toast.success('highlight updated successfully.');
          route.push('/dashboard/settings/highlight-spotlight');
        }
      }
    } catch (error) {
      toast.error('Failed to create highlight');
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
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-sm font-medium">
                          Highlight Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter highlight name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                          Active highlight
                        </FormLabel>
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
                  name="highlight"
                  render={() => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm font-medium">
                        Highlight Image
                      </FormLabel>
                      <ImageUpload
                        isDragActive={isDragActive}
                        getRootProps={getRootProps}
                        getInputProps={getInputProps}
                        uploadedImages={uploadedImages}
                        removeImage={removeImage}
                        updateData={updateData?.highlight?.split(',') || ''}
                      />
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
                  !updateData?.id
                    ? `Adding highlight...`
                    : `Updating highlight...`
                }
                variant="default"
                type="submit"
                className="flex gap-1 text-nowrap"
              >
                {!updateData?.id ? (
                  <>
                    Add Highlight <Plus className="ml-2 mt-[1px] h-4 w-4" />
                  </>
                ) : (
                  <>
                    Update highlight{' '}
                    <Pencil className="ml-2 mt-[1px] h-4 w-4" />
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

export default HighlightForm;
