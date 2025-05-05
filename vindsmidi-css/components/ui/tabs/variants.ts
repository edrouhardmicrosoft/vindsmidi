import { cva } from 'class-variance-authority'

export const tabListVariants = cva('flex border-b border-[var(--colorNeutralStroke1)]', {
  variants: {
    appearance: {
      default: 'bg-[var(--colorNeutralBackground1)]',
      subtle: 'bg-[var(--colorNeutralBackground2)]',
      transparent: 'bg-transparent border-none',
    },
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col border-b-0 border-r border-[var(--colorNeutralStroke1)]',
    },
    size: {
      sm: 'gap-1',
      md: 'gap-2',
    },
  },
  defaultVariants: {
    appearance: 'default',
    orientation: 'horizontal',
    size: 'md',
  },
})

export const tabVariants = cva(
  'relative px-4 py-2 font-medium text-[var(--colorNeutralForeground1)] cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colorBrandStroke1)]',
  {
    variants: {
      selected: {
        true: 'text-[var(--colorBrandForeground1)] border-b-2 border-[var(--colorBrandStroke1)]',
        false:
          'border-b-2 border-transparent hover:text-[var(--colorBrandForeground1)] hover:border-[var(--colorBrandStroke1)]',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
      size: {
        sm: 'text-[var(--fontSizeBase200)]',
        md: 'text-[var(--fontSizeBase300)]',
      },
    },
    defaultVariants: {
      selected: false,
      disabled: false,
      size: 'md',
    },
  }
)
