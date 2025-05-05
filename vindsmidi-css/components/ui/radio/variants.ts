import { cva } from 'class-variance-authority'

/**
 * Radio component variants
 * Using Fluent UI token variables as CSS custom properties
 */
export const radioGroupVariants = cva(
  // Base classes for radio groups
  'flex gap-2',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row items-center',
        vertical: 'flex-col items-start',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  }
)

export const radioVariants = cva(
  // Base classes for all radio buttons
  'relative peer inline-flex items-center justify-center shrink-0 border rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colorBrandStroke1)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        default: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
      variant: {
        default: [
          'border-[var(--colorNeutralStroke1)] bg-transparent',
          'hover:border-[var(--colorBrandStroke1)]',
          'data-[checked]:bg-[var(--colorBrandBackground)] data-[checked]:border-[var(--colorBrandBackground)]',
          'data-[checked]:hover:bg-[var(--colorBrandBackgroundHover)] data-[checked]:hover:border-[var(--colorBrandBackgroundHover)]',
        ],
        subtle: [
          'border-[var(--colorNeutralStroke1)] bg-[var(--colorNeutralBackground2)]',
          'hover:border-[var(--colorBrandStroke1)] hover:bg-[var(--colorNeutralBackground2Hover)]',
          'data-[checked]:bg-[var(--colorCompoundBrandBackground)] data-[checked]:border-[var(--colorCompoundBrandStroke)]',
          'data-[checked]:hover:bg-[var(--colorCompoundBrandBackgroundHover)] data-[checked]:hover:border-[var(--colorCompoundBrandStrokeHover)]',
        ],
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
)

export const radioIndicatorVariants = cva('absolute rounded-full bg-white', {
  variants: {
    size: {
      sm: 'h-1.5 w-1.5',
      default: 'h-2 w-2',
      lg: 'h-3 w-3',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export const radioLabelVariants = cva(
  'text-[var(--colorNeutralForeground1)] font-[var(--fontFamilyBase)] select-none',
  {
    variants: {
      size: {
        sm: 'text-[var(--fontSizeBase100)] pl-2',
        default: 'text-[var(--fontSizeBase200)] pl-2',
        lg: 'text-[var(--fontSizeBase300)] pl-3',
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
