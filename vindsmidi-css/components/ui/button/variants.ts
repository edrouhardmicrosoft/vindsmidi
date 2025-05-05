import { cva } from 'class-variance-authority';

/**
 * Button component variants
 * Using Fluent UI token variables as CSS custom properties
 */
export const buttonVariants = cva(
  // Base classes for all buttons
  'inline-flex items-center justify-center rounded-[var(--borderRadiusMedium)] font-[var(--fontWeightSemibold)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colorBrandStroke1)] focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-[var(--colorBrandBackground)] text-white hover:bg-[var(--colorBrandBackgroundHover)] active:bg-[var(--colorBrandBackgroundPressed)]',
        secondary: 'bg-[var(--colorNeutralBackground2)] text-[var(--colorNeutralForeground1)] hover:bg-[var(--colorNeutralBackground2Hover)] active:bg-[var(--colorNeutralBackground2Pressed)]',
        outline: 'border border-[var(--colorBrandStroke1)] bg-transparent text-[var(--colorBrandForeground1)] hover:bg-[var(--colorNeutralBackground1Hover)] active:bg-[var(--colorNeutralBackground1Pressed)]',
        ghost: 'bg-transparent text-[var(--colorBrandForeground1)] hover:bg-[var(--colorNeutralBackground2)] active:bg-[var(--colorNeutralBackground2Pressed)]',
        link: 'bg-transparent text-[var(--colorBrandForegroundLink)] hover:text-[var(--colorBrandForegroundLinkHover)] hover:underline p-0 h-auto',
      },
      size: {
        sm: 'h-8 text-[var(--fontSizeBase100)] px-3 py-1',
        default: 'h-10 text-[var(--fontSizeBase200)] px-4 py-2',
        lg: 'h-12 text-[var(--fontSizeBase300)] px-6 py-3',
        icon: 'h-10 w-10 p-2',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      disabled: false,
    },
  }
);