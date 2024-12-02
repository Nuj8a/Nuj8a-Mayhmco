// components/Stepper.tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface StepperProps {
  steps: (string | Step)[];
  activeStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, activeStep }) => {
  return (
    <div className="mb-8 flex items-center justify-between">
      {steps.map((step, index) => {
        const isSimpleStep = typeof step === 'string';
        const label = isSimpleStep ? step : step.label;
        const description = !isSimpleStep && step.description;
        const icon = !isSimpleStep && step.icon;

        return (
          <>
            <div
              key={isSimpleStep ? index : step.id}
              className="flex flex-1 flex-col items-center text-center"
            >
              <div
                className={cn(
                  'mb-2 flex h-10 w-10 items-center justify-center rounded-full',
                  index <= activeStep
                    ? 'bg-primary text-white'
                    : 'bg-gray-300 text-gray-700'
                )}
              >
                {icon || index + 1}
              </div>
              <span className="font-semibold">{label}</span>
              {description && (
                <span className="text-sm text-gray-500">{description}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'h-1 w-full flex-1 bg-gray-200',
                  index < activeStep ? 'bg-primary' : 'bg-gray-300'
                )}
              />
            )}
          </>
        );
      })}
    </div>
  );
};

export default Stepper;
