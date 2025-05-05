import * as React from 'react';
import { Button as FluentButton } from '@fluentui/react-components';
import { cn } from '../utils';
import { buttonVariants } from './variants';
import type { FluentExtendedProps } from '../types';

export interface ButtonProps extends FluentExtendedProps<'button', {
  /**
   * The visual style of the button
   */
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link';
  
  /**
   * The size of the button
   */
  size?: 'sm' | 'default' | 'lg' | 'icon';
  
  /**
   * The content of the button
   */
  children?: React.ReactNode;
}> {}

/**
 * Button component that wraps Fluent UI Button
 * with our custom Tailwind CSS styling
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'default',
    size = 'default',
    disabled = false,
    children,
    ...props
  }, ref) => {
    // Apply our Tailwind CSS variants
    const tailwindClasses = cn(
      buttonVariants({ variant, size, disabled }),
      className
    );
    
    return (
      <FluentButton
        ref={ref}
        className={tailwindClasses}
        disabled={disabled}
        {...props}
      >
        {children}
      </FluentButton>
    );
  }
);

Button.displayName = 'Button';

/**
 * Framework-agnostic implementation notes:
 *
 * For non-React frameworks:
 * 1. Vue: Use a <template> with v-bind to apply the classes
 * 2. Svelte: Use class:directive to conditionally apply classes
 * 3. Web Components: Use setAttribute to apply the classes
 * 4. Solid: Similar to React with solid-js patterns
 *
 * The core styling (buttonVariants) remains the same across all frameworks
 * Only the implementation pattern changes
 */