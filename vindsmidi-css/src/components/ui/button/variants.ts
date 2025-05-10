import { cva } from 'class-variance-authority'

/**
 * Button component variants
 * Using Fluent UI token variables as CSS custom properties with --fluent- prefix
 */
export const buttonVariants = cva(
  // Base classes for all buttons
  'inline-flex items-center justify-center rounded-[var(--fluent-radius-md)] font-[var(--fluent-font-weight-semibold)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fluent-color-brand-stroke-1)] focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          '!bg-[var(--fluent-color-brand-background)] !text-white hover:!bg-[var(--fluent-color-brand-background-hover)] active:!bg-[var(--fluent-color-brand-background-pressed)]',
        primary:
          '!bg-red-500 !text-white hover:!bg-[var(--fluent-color-brand-background-hover)] active:!bg-[var(--fluent-color-brand-background-pressed)]',
        secondary:
          '!bg-[var(--fluent-color-neutral-background-2)] !text-[var(--fluent-color-neutral-foreground-1)] hover:!bg-[var(--fluent-color-neutral-background-2-hover)] active:!bg-[var(--fluent-color-neutral-background-2-pressed)]',
        outline:
          '!border !border-[var(--fluent-color-brand-stroke-1)] !bg-transparent !text-[var(--fluent-color-brand-foreground-1)] hover:!bg-[var(--fluent-color-neutral-background-1-hover)] active:!bg-[var(--fluent-color-neutral-background-1-pressed)]',
        ghost:
          '!bg-transparent !text-[var(--fluent-color-brand-foreground-1)] hover:!bg-[var(--fluent-color-neutral-background-2)] active:!bg-[var(--fluent-color-neutral-background-2-pressed)]',
        subtle:
          '!bg-transparent !text-[var(--fluent-color-brand-foreground-1)] hover:!bg-[var(--fluent-color-neutral-background-2)] active:!bg-[var(--fluent-color-neutral-background-2-pressed)]',
        transparent:
          '!bg-transparent !text-[var(--fluent-color-brand-foreground-1)] hover:!bg-[var(--fluent-color-neutral-background-2)] active:!bg-[var(--fluent-color-neutral-background-2-pressed)]',
        link: '!bg-transparent !text-[var(--fluent-color-brand-foreground-link)] hover:!text-[var(--fluent-color-brand-foreground-link-hover)] hover:underline p-0 h-auto',
      },
      size: {
        sm: 'h-8 text-[var(--fluent-font-size-xs)] px-3 py-1',
        default: 'h-10 text-[var(--fluent-font-size-sm)] px-4 py-2',
        lg: 'h-12 text-[var(--fluent-font-size-base)] px-6 py-3',
        icon: 'h-10 w-10 p-2',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      disabled: false,
    },
  }
)