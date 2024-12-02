'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDropzone } from 'react-dropzone';
import dynamic from 'next/dynamic';
import AdvanceForm from './AdvanceForm';
import { CheckCircle, Dot, XCircle } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DiscountInput from './discountInput';
import TagsInput from '@/components/taginput';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const productSchema = z.object({
  productName: z.string().min(1, 'Product name is required.').optional(),
  basePrice: z.string().min(1, 'Base price is required.'),
  quantity: z.string().min(1, 'Quantity is required.'),
  discountType: z.enum(['none', 'percentage', 'fixed']),
  discountValuePercentage: z.string().optional(),
  discountValueFixed: z.string().optional(),
  gender: z.enum(['bisexual', 'male', 'female']),
  status: z.enum(['Published', 'Draft']),
  category: z.enum(['Electronics', 'Apparel', 'Furniture']),
  subcategory: z.string().optional(),
  images: z.array(z.any()).max(7, 'You can upload up to 7 images.').optional(),
  tags: z.array(z.string()).optional()
});

type ProductFormValues = z.infer<typeof productSchema>;

const sizes = ['sm', 'base', 'lg', 'freesize'];
const materials = ['plastic', 'metal'];

const allPermutations = sizes.flatMap((size) =>
  materials.map((material) => ({ size, material }))
);

const subcategories = {
  Electronics: ['Laptops', 'Mobile Phones', 'Tablets'],
  Apparel: ['Shirts', 'Pants', 'Shoes'],
  Furniture: ['Chairs', 'Tables', 'Beds']
};

const AddForm = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [editorContent, setEditorContent] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const formMethods = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: '',
      status: 'Draft',
      discountType: 'none',
      gender: 'bisexual',
      tags: [],
      quantity: '0',
      basePrice: '0',
      category: 'Electronics'
    }
  });

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = formMethods;

  const onSubmit = (data: ProductFormValues) => {
    const finalProductTypes = productTypes.filter(
      (productType) =>
        productType.size &&
        productType.material &&
        productType.quantity &&
        productType.color &&
        productType.color.length > 0
    );

    const formData = {
      ...data,
      productTypes: finalProductTypes,
      description: editorContent,
      images: uploadedImages
    };
    // eslint-disable-next-line no-console
    console.log(formData);
  };

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = [
      ...uploadedImages,
      ...acceptedFiles.slice(0, 7 - uploadedImages.length)
    ];
    setUploadedImages(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    },
    maxFiles: 7
  });

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const descriptionChange = (content: string) => {
    setEditorContent(content);
    setDescriptionError(
      content.length < 5
        ? 'Product description must be greater than 5 characters'
        : ''
    );
  };

  const [productTypes, setProductTypes] = useState([
    { id: uuidv4(), size: '', material: '', quantity: '', color: '' }
  ]);

  const isLastProductTypeFilled = () => {
    const lastProduct = productTypes[productTypes.length - 1];
    return lastProduct.size && lastProduct.material;
  };

  // Add a new product type only if the last one is filled
  const addProductType = () => {
    if (isLastProductTypeFilled()) {
      setProductTypes((p: any) => [
        ...p,
        { id: uuidv4(), size: '', material: '', quantity: '', color: [] }
      ]);
    }
  };

  // Remove a product type by id
  const removeProductType = (id: string) => {
    setProductTypes(productTypes.filter((type) => type.id !== id));
  };

  // Update size and reset material if size changes
  const handleSizeChange = (id: string, size: string) => {
    setProductTypes(
      productTypes.map((type) =>
        type.id === id ? { ...type, size, material: '' } : type
      )
    );
  };
  const handleQuantityChange = (id: string, quantity: string) => {
    setProductTypes(
      productTypes.map((type) =>
        type.id === id ? { ...type, quantity } : type
      )
    );
  };
  const handleColorChange = (id: string, colors: string[]) => {
    setProductTypes((prevProductTypes: any) =>
      prevProductTypes.map((type: any) =>
        type.id === id ? { ...type, color: colors } : type
      )
    );
  };

  // Update material for a specific product type
  const handleMaterialChange = (id: string, material: string) => {
    setProductTypes(
      productTypes.map((type) =>
        type.id === id ? { ...type, material } : type
      )
    );
  };

  // Get currently selected pairs in the form of "size-material"
  const selectedPairs = productTypes
    .map((type) => `${type.size}-${type.material}`)
    .filter((pair) => pair !== '-');

  // Get available permutations not yet selected
  const getAvailablePermutations = (currentId: string) => {
    return allPermutations.filter(({ size, material }) => {
      const pair = `${size}-${material}`;
      const currentType = productTypes.find((type) => type.id === currentId);
      const isCurrentSelection =
        `${currentType?.size}-${currentType?.material}` === pair;
      return !selectedPairs.includes(pair) || isCurrentSelection;
    });
  };

  return (
    <div className="pb-10">
      <Form {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="absolute right-0 top-0 flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant="destructive"
                className="flex items-center justify-center gap-1"
                type="reset"
              >
                Cancel
                <XCircle size={16} />
              </Button>
              <Button
                variant="default"
                className="flex items-center justify-center gap-1"
                type="submit"
              >
                Add Product
                <CheckCircle size={16} />
              </Button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 md:gap-3 lg:gap-6">
            <div className="space-y-6">
              <ImageUpload
                isDragActive={isDragActive}
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                uploadedImages={uploadedImages}
                removeImage={removeImage}
              />

              <div className="flex flex-col gap-2 rounded-lg border p-4 pb-5 pt-3">
                <div className="flex justify-between">
                  <h2 className="text-xl font-semibold">Status</h2>
                  <Dot size={30} className="scale-125 text-green-400" />
                </div>
                <Separator />
                <FormField
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Set Status
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Published">Published</SelectItem>
                          <SelectItem value="Draft">Draft</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage>{errors.status?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-2 rounded-lg border p-4 pb-5 pt-3">
                <div className="flex justify-between">
                  <h2 className="text-xl font-semibold">Category</h2>
                  <Dot size={30} className="scale-125 text-green-400" />
                </div>
                <Separator />
                <FormField
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Category
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedCategory(value);
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Electronics">
                            Electronics
                          </SelectItem>
                          <SelectItem value="Apparel">Apparel</SelectItem>
                          <SelectItem value="Furniture">Furniture</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage>{errors.category?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                {/* Subcategory (conditionally displayed based on selected category) */}
                {selectedCategory && (
                  <FormField
                    control={control}
                    name="subcategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Subcategory
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select subcategory" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subcategories[
                              selectedCategory as keyof typeof subcategories
                            ]?.map((subcat) => (
                              <SelectItem key={subcat} value={subcat}>
                                {subcat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage>{errors.subcategory?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Product Quantity
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter product name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{errors.quantity?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-2 space-y-6">
              <Tabs defaultValue="general">
                <TabsList>
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="advance">Advance</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold">
                      Product Information
                    </h2>
                    {/* Product Name */}
                    <FormField
                      control={control}
                      name="productName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Product Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter product name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage>
                            {errors.productName?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />

                    {/* Description (Rich Text Editor) */}
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Description
                      </FormLabel>
                      <FormControl>
                        <div className="min-h-[200px]">
                          <ReactQuill
                            theme="snow"
                            value={editorContent}
                            onChange={descriptionChange}
                            placeholder="Enter product description"
                          />
                        </div>
                      </FormControl>
                      {descriptionError.length > 0 && (
                        <FormMessage>{descriptionError}</FormMessage>
                      )}
                    </FormItem>

                    {/* Pricing */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={control}
                        name="basePrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Base Price
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="$0.00" {...field} />
                            </FormControl>
                            <FormMessage>
                              {errors.basePrice?.message}
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Select Gender
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="bisexual">
                                  Bisexual
                                </SelectItem>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage>{errors.gender?.message}</FormMessage>
                          </FormItem>
                        )}
                      />
                    </div>
                    <DiscountInput control={control} errors={errors} />
                    <Controller
                      control={control}
                      name="tags"
                      render={({ field }) => (
                        <div>
                          <FormLabel
                            htmlFor="tagInput"
                            className="mb-1 text-sm font-medium"
                          >
                            Product Tags
                          </FormLabel>
                          <TagsInput
                            value={field.value || []}
                            onChange={field.onChange}
                          />
                        </div>
                      )}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="advance">
                  <AdvanceForm
                    productTypes={productTypes}
                    addProductType={addProductType}
                    removeProductType={removeProductType}
                    handleSizeChange={handleSizeChange}
                    handleMaterialChange={handleMaterialChange}
                    control={control}
                    errors={errors}
                    getAvailablePermutations={getAvailablePermutations}
                    isLastProductTypeFilled={isLastProductTypeFilled}
                    handleQuantityChange={handleQuantityChange}
                    handleColorChange={handleColorChange}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddForm;
