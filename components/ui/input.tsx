import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, startContent = null, endContent = null, ...props },
    ref
  ) => {
    return (
      <div className="relative flex w-full items-center">
        {startContent && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 transform">
            {startContent}
          </span>
        )}

        <input
          type={type}
          className={cn(
            `flex h-9 w-full rounded-md border border-input bg-transparent py-1   ${
              startContent ? 'pl-10' : 'pl-3'
            } ${
              endContent ? 'pr-10' : 'pr-3'
            } text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`,
            className
          )}
          ref={ref}
          {...props}
        />

        {endContent && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 transform ">
            {endContent}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
