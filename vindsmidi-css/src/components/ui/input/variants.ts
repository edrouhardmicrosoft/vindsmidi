import { cva } from 'class-variance-authority'

/**
 * Input component variants
 * Using Fluent UI token variables as CSS custom properties
 */
export const inputVariants = cva(
  // Base classes for all inputs
  'flex w-full rounded-[var(--borderRadiusMedium)] border bg-transparent px-3 py-2 text-[var(--fontSizeBase200)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--colorNeutralForeground3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colorBrandStroke1)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-[var(--colorNeutralStroke1)] hover:border-[var(--colorNeutralStroke1Hover)]',
        outline: 'border-[var(--colorNeutralStroke1)] hover:border-[var(--colorBrandStroke1)]',
        filled: 'border-transparent bg-[var(--colorNeutralBackground2)] hover:bg-[var(--colorNeutralBackground2Hover)]',
        branded: 'border-[var(--colorBrandStroke1)] hover:border-[var(--colorBrandStroke2)]',
      },
      size: {
        sm: 'h-8 text-[var(--fontSizeBase100)]',
        default: 'h-10',
        lg: 'h-12 text-[var(--fontSizeBase300)]',
      },
      state: {
        error: 'border-[var(--colorPaletteRedBorderActive)] focus-visible:ring-[var(--colorPaletteRedBorderActive)]',
        success:
          'border-[var(--colorPaletteGreenBorderActive)] focus-visible:ring-[var(--colorPaletteGreenBorderActive)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export const inputWrapperVariants = cva('w-full', {
  variants: {
    state: {
      error: 'text-[var(--colorPaletteRedForeground2)]',
      success: 'text-[var(--colorPaletteGreenForeground2)]',
    },
  },
})

export const inputLabelVariants = cva(
  'block text-[var(--fontSizeBase200)] font-[var(--fontWeightMedium)] leading-none mb-2 text-[var(--colorNeutralForeground1)]',
  {
    variants: {
      state: {
        error: 'text-[var(--colorPaletteRedForeground2)]',
        success: 'text-[var(--colorPaletteGreenForeground2)]',
      },
      required: {
        true: 'after:content-["*"] after:ml-0.5 after:text-[var(--colorPaletteRedForeground2)]',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      required: false,
      disabled: false,
    },
  }
)

export const inputMessageVariants = cva('mt-1.5 text-[var(--fontSizeBase100)]', {
  variants: {
    state: {
      error: 'text-[var(--colorPaletteRedForeground2)]',
      success: 'text-[var(--colorPaletteGreenForeground2)]',
    },
  },
})
