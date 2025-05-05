import { cva } from 'class-variance-authority';

/**
 * This is a template for creating component variants
 * using Fluent UI tokens through our CSS variables
 */
export const componentVariants = cva(
  // Base classes applied to all variants - use Fluent UI token variables
  'rounded-[var(--borderRadiusMedium)] transition-all duration-[var(--durationNormal)]',
  {
    variants: {
      // Visual variants
      variant: {
        default: 'bg-[var(--colorBrandBackground)] text-white hover:bg-[var(--colorBrandBackgroundHover)]',
        secondary: 'bg-[var(--colorNeutralBackground2)] text-[var(--colorNeutralForeground1)] hover:bg-[var(--colorNeutralBackground2Hover)]',
        outline: 'border border-[var(--colorBrandStroke1)] bg-transparent text-[var(--colorBrandForeground1)] hover:bg-[var(--colorNeutralBackground1Hover)]',
        ghost: 'bg-transparent text-[var(--colorBrandForeground1)] hover:bg-[var(--colorNeutralBackground2)]',
      },
      // Size variants
      size: {
        sm: 'text-[var(--fontSizeBase100)] py-1 px-2',
        default: 'text-[var(--fontSizeBase200)] py-2 px-4',
        lg: 'text-[var(--fontSizeBase300)] py-3 px-6',
      },
      // State variants
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
      }
    },
    // Default variant values when not specified
    defaultVariants: {
      variant: 'default',
      size: 'default',
      disabled: false,
    },
  }
);

/**
 * Framework-agnostic note:
 *
 * These variants defined with Tailwind CSS classes and Fluent UI tokens
 * can be used across any framework as they're just CSS classes.
 * The implementation method will vary by framework, but the classes remain the same.
 */