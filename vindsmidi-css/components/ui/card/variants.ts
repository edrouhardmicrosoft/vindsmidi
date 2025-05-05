import { cva } from 'class-variance-authority'

/**
 * Card component variants
 * Using Fluent UI token variables as CSS custom properties
 */
export const cardVariants = cva(
  // Base classes for all cards
  'rounded-[var(--borderRadiusMedium)] overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-[var(--colorNeutralBackground1)] border border-[var(--colorNeutralStroke1)]',
        filled: 'bg-[var(--colorNeutralBackground2)]',
        outline: 'bg-transparent border border-[var(--colorNeutralStroke1)]',
        subtle: 'bg-[var(--colorNeutralBackground1Hover)]',
        branded: 'bg-[var(--colorBrandBackground3Static)] border border-[var(--colorBrandStroke1)]',
      },
      size: {
        sm: 'p-3',
        default: 'p-5',
        lg: 'p-7',
      },
      shadow: {
        none: '',
        sm: 'shadow-sm',
        default: 'shadow',
        lg: 'shadow-lg',
      },
      interactive: {
        true: 'cursor-pointer transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colorBrandStroke1)] focus-visible:ring-offset-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shadow: 'default',
      interactive: false,
    },
  }
)

export const cardHeaderVariants = cva('flex flex-col space-y-1.5 p-5', {
  variants: {
    variant: {
      default: 'border-b border-[var(--colorNeutralStroke1)]',
      filled: 'border-b border-[var(--colorNeutralStroke2)]',
      outline: 'border-b border-[var(--colorNeutralStroke1)]',
      subtle: 'border-b border-[var(--colorNeutralStroke1Hover)]',
      branded: 'border-b border-[var(--colorBrandStroke1)]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const cardContentVariants = cva('p-5 pt-0', {
  variants: {
    padded: {
      true: 'pt-5',
    },
  },
  defaultVariants: {
    padded: false,
  },
})

export const cardFooterVariants = cva('flex items-center p-5 pt-0', {
  variants: {
    variant: {
      default: 'border-t border-[var(--colorNeutralStroke1)]',
      filled: 'border-t border-[var(--colorNeutralStroke2)]',
      outline: 'border-t border-[var(--colorNeutralStroke1)]',
      subtle: 'border-t border-[var(--colorNeutralStroke1Hover)]',
      branded: 'border-t border-[var(--colorBrandStroke1)]',
    },
    align: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
  },
  defaultVariants: {
    variant: 'default',
    align: 'between',
  },
})
