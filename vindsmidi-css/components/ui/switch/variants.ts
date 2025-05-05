import { cva } from 'class-variance-authority'

/**
 * Switch component variants
 * Using Fluent UI token variables as CSS custom properties
 */
export const switchVariants = cva(
  // Base classes for all switches
  'relative inline-flex items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colorBrandStroke1)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-4 w-7',
        default: 'h-5 w-10',
        lg: 'h-6 w-12',
      },
      variant: {
        default: [
          'border border-[var(--colorNeutralStroke1)] bg-[var(--colorNeutralBackground4)]',
          'data-[checked]:bg-[var(--colorBrandBackground)] data-[checked]:border-[var(--colorBrandBackground)]',
        ],
        subtle: [
          'border border-[var(--colorNeutralStroke1)] bg-[var(--colorNeutralBackground2)]',
          'data-[checked]:bg-[var(--colorCompoundBrandBackground)] data-[checked]:border-[var(--colorCompoundBrandStroke)]',
        ],
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
)

export const switchThumbVariants = cva(
  'pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform',
  {
    variants: {
      size: {
        sm: 'h-3 w-3 data-[checked]:translate-x-3',
        default: 'h-4 w-4 data-[checked]:translate-x-5',
        lg: 'h-5 w-5 data-[checked]:translate-x-6',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

export const switchLabelVariants = cva(
  'text-[var(--colorNeutralForeground1)] font-[var(--fontFamilyBase)] select-none',
  {
    variants: {
      size: {
        sm: 'text-[var(--fontSizeBase100)] ml-2',
        default: 'text-[var(--fontSizeBase200)] ml-2',
        lg: 'text-[var(--fontSizeBase300)] ml-3',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      size: 'default',
      disabled: false,
    },
  }
)
