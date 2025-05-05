import { cva } from 'class-variance-authority'

/**
 * Checkbox component variants
 * Using Fluent UI token variables as CSS custom properties
 */
export const checkboxVariants = cva(
  // Base classes for all checkboxes
  'relative peer inline-flex items-center justify-center shrink-0 border rounded-[var(--borderRadiusSmall)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colorBrandStroke1)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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
          'data-[indeterminate]:bg-[var(--colorBrandBackground)] data-[indeterminate]:border-[var(--colorBrandBackground)]',
          'data-[indeterminate]:hover:bg-[var(--colorBrandBackgroundHover)] data-[indeterminate]:hover:border-[var(--colorBrandBackgroundHover)]',
        ],
        circular: [
          'rounded-full border-[var(--colorNeutralStroke1)] bg-transparent',
          'hover:border-[var(--colorBrandStroke1)]',
          'data-[checked]:bg-[var(--colorBrandBackground)] data-[checked]:border-[var(--colorBrandBackground)]',
          'data-[checked]:hover:bg-[var(--colorBrandBackgroundHover)] data-[checked]:hover:border-[var(--colorBrandBackgroundHover)]',
          'data-[indeterminate]:bg-[var(--colorBrandBackground)] data-[indeterminate]:border-[var(--colorBrandBackground)]',
          'data-[indeterminate]:hover:bg-[var(--colorBrandBackgroundHover)] data-[indeterminate]:hover:border-[var(--colorBrandBackgroundHover)]',
        ],
        subtle: [
          'border-[var(--colorNeutralStroke1)] bg-[var(--colorNeutralBackground2)]',
          'hover:border-[var(--colorBrandStroke1)] hover:bg-[var(--colorNeutralBackground2Hover)]',
          'data-[checked]:bg-[var(--colorCompoundBrandBackground)] data-[checked]:border-[var(--colorCompoundBrandStroke)]',
          'data-[checked]:hover:bg-[var(--colorCompoundBrandBackgroundHover)] data-[checked]:hover:border-[var(--colorCompoundBrandStrokeHover)]',
          'data-[indeterminate]:bg-[var(--colorCompoundBrandBackground)] data-[indeterminate]:border-[var(--colorCompoundBrandStroke)]',
          'data-[indeterminate]:hover:bg-[var(--colorCompoundBrandBackgroundHover)] data-[indeterminate]:hover:border-[var(--colorCompoundBrandStrokeHover)]',
        ],
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
)

export const checkboxIndicatorVariants = cva('absolute text-white', {
  variants: {
    size: {
      sm: 'h-2.5 w-2.5',
      default: 'h-3 w-3',
      lg: 'h-4 w-4',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export const checkboxLabelVariants = cva(
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
