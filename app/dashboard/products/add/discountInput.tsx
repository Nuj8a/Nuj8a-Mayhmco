import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const DiscountInput = ({ control, errors }: any) => {
  const { setValue, watch } = useFormContext();
  const discountType = watch('discountType');

  // Reset discount values when discountType changes
  useEffect(() => {
    if (discountType === 'none') {
      setValue('discountValuePercentage', '');
      setValue('discountValueFixed', '');
    } else if (discountType === 'percentage') {
      setValue('discountValueFixed', '');
    } else if (discountType === 'fixed') {
      setValue('discountValuePercentage', '');
    }
  }, [discountType, setValue]);

  return (
    <FormField
      control={control}
      name="discountType"
      render={({ field }) => (
        <FormItem>
          <label className="text-sm font-medium">Discount Type</label>
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="mt-2 grid w-full grid-cols-1 md:grid-cols-2 md:space-x-4 lg:grid-cols-3"
          >
            {[
              { value: 'none', label: 'No Discount' },
              { value: 'percentage', label: 'Percentage %' },
              { value: 'fixed', label: 'Fixed Price' }
            ].map((option) => (
              <div key={option.value}>
                <Label
                  htmlFor={option.value}
                  className={`flex min-h-[110px] cursor-pointer flex-col gap-3 rounded border border-dashed p-4 pt-5 hover:border-primary ${
                    field.value === option.value
                      ? 'border-primary bg-card'
                      : 'border-border'
                  }`}
                >
                  <div className="flex gap-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>

                  {option.value !== 'none' ? (
                    <>
                      <FormField
                        control={control}
                        name={
                          option.value === 'percentage'
                            ? 'discountValuePercentage'
                            : 'discountValueFixed'
                        }
                        render={({ field: discountValueField }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Enter discount value"
                                {...discountValueField}
                                type="number"
                                disabled={field.value !== option.value}
                              />
                            </FormControl>
                            <FormMessage>
                              {option.value === 'percentage'
                                ? errors.discountValuePercentage?.message
                                : errors.discountValueFixed?.message}
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                    </>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <h2 className="text-sm font-semibold text-muted-foreground">
                        No Discounts for This Product
                      </h2>
                      <p className="text-xs text-muted">- Fixed price</p>
                    </div>
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <FormMessage>{errors.discountType?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default DiscountInput;
