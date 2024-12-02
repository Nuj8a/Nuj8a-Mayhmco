import React from 'react';
import { Controller } from 'react-hook-form';
import TagsInput from '@/components/taginput';
import { Button } from '@/components/ui/button';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Plus, Trash } from 'lucide-react';

const AdvanceForm = ({
  control,
  errors,
  addProductType,
  productTypes,
  removeProductType,
  handleSizeChange,
  handleMaterialChange,
  getAvailablePermutations,
  isLastProductTypeFilled,
  handleQuantityChange,
  handleColorChange
}: any) => {
  return (
    <div>
      {productTypes.map((type: any) => {
        const finalUnique = getAvailablePermutations(type.id)
          .filter(
            (option: any) => option.material === type.material || !type.material
          )
          .filter(
            (value: any, index: any, self: any) =>
              self.findIndex((t: any) => t.size === value.size) === index
          )
          .map((option: any) => ({
            size: option.size,
            material: option.material
          }));

        return (
          <div key={type.id} className="mb-4 border-b pb-4">
            {/* Header with Add and Remove Buttons */}
            <div className="my-4 mt-5 flex justify-between">
              <div className="text-xl font-semibold">
                Type product{' '}
                {type.size && type.material
                  ? `(${type.size}, ${type.material})`
                  : `(${type.id})`}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={addProductType}
                  disabled={!isLastProductTypeFilled()}
                >
                  <Plus size={14} />
                </Button>
                {productTypes.length > 1 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeProductType(type.id)}
                  >
                    <Trash size={14} />
                  </Button>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <FormField
                control={control}
                name={`size_${type.id}`}
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel className="text-sm font-medium">
                      Select Size
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleSizeChange(type.id, value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {finalUnique.map(({ size }: any, index: number) => {
                          return (
                            <SelectItem
                              key={`${type.id}_${size}_${index}`}
                              value={size}
                            >
                              {size === 'sm'
                                ? 'Small'
                                : size === 'base'
                                ? 'Base'
                                : size === 'lg'
                                ? 'Large'
                                : 'Free size'}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage>
                      {errors[`size_${type.id}`]?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Material Selector */}
              <FormField
                control={control}
                name={`material_${type.id}`}
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel className="text-sm font-medium">
                      Select Body Material
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleMaterialChange(type.id, value);
                      }}
                      value={field.value}
                      disabled={!type.size}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Material" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {getAvailablePermutations(type.id)
                          .filter(
                            (option: any) =>
                              option.size === type.size || !type.size
                          )
                          .map(({ material }: any, index: number) => (
                            <SelectItem
                              key={`${type.id}_${material}_${index}`}
                              value={material}
                            >
                              {material === 'plastic' ? 'Plastic' : 'Metal'}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage>
                      {errors[`material_${type.id}`]?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            {/* Quantity Input */}
            <div className="mt-4 flex gap-4">
              <FormField
                control={control}
                name={`quantity_${type.id}`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm font-medium">
                      Product Quantity
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        onChange={(e) => {
                          const value = e.target.value;
                          handleQuantityChange(type.id, value);
                          field.onChange(value);
                        }}
                        value={field.value}
                        placeholder="Enter product quantity"
                      />
                    </FormControl>
                    <FormMessage>
                      {errors[`quantity_${type.id}`]?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4 flex gap-4">
              <Controller
                control={control}
                name={`color_${type.id}`}
                render={({ field }) => (
                  <div className="w-full">
                    <FormLabel className="text-sm font-medium">
                      Product Color
                    </FormLabel>
                    <TagsInput
                      value={field.value || []}
                      onChange={(newTags) => {
                        field.onChange(newTags);
                        handleColorChange(type.id, newTags);
                      }}
                    />
                  </div>
                )}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdvanceForm;
