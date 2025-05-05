import { cva } from 'class-variance-authority'

/**
 * Select component variants
 * Using Fluent UI token variables as CSS custom properties
 */
export const selectVariants = cva(
  // Base classes for all selects
  'flex w-full h-10 rounded-[var(--borderRadiusMedium)] border bg-transparent px-3 py-2 text-[var(--fontSizeBase200)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colorBrandStroke1)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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

export const selectTriggerVariants = cva('flex h-full w-full items-center justify-between', {
  variants: {
    size: {
      sm: 'text-[var(--fontSizeBase100)]',
      default: 'text-[var(--fontSizeBase200)]',
      lg: 'text-[var(--fontSizeBase300)]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export const selectContentVariants = cva(
  'relative z-50 min-w-[8rem] overflow-hidden rounded-[var(--borderRadiusMedium)] border border-[var(--colorNeutralStroke1)] bg-[var(--colorNeutralBackground1)] text-[var(--colorNeutralForeground1)] shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
  {
    variants: {
      position: {
        popper:
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        item: 'p-1',
      },
    },
    defaultVariants: {
      position: 'popper',
    },
  }
)

export const selectOptionVariants = cva(
  'relative flex w-full cursor-default select-none items-center rounded-[var(--borderRadiusSmall)] py-1.5 pl-8 pr-2 text-[var(--fontSizeBase200)] outline-none focus:bg-[var(--colorNeutralBackground2)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  {
    variants: {
      state: {
        active: 'bg-[var(--colorNeutralBackground2)]',
        selected: 'bg-[var(--colorNeutralBackground2)]',
      },
    },
  }
)

export const selectWrapperVariants = cva('w-full', {
  variants: {
    state: {
      error: 'text-[var(--colorPaletteRedForeground2)]',
      success: 'text-[var(--colorPaletteGreenForeground2)]',
    },
  },
})

export const selectLabelVariants = cva(
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

export const selectMessageVariants = cva('mt-1.5 text-[var(--fontSizeBase100)]', {
  variants: {
    state: {
      error: 'text-[var(--colorPaletteRedForeground2)]',
      success: 'text-[var(--colorPaletteGreenForeground2)]',
    },
  },
})
