import { cva } from 'class-variance-authority'

/**
 * Text component variants
 * Using Fluent UI token variables as CSS custom properties
 */
export const textVariants = cva(
  // Base classes for all text elements
  'text-[var(--colorNeutralForeground1)] font-[var(--fontFamilyBase)]',
  {
    variants: {
      variant: {
        body: 'text-[var(--fontSizeBase300)]',
        bodySmall: 'text-[var(--fontSizeBase200)]',
        bodyLarge: 'text-[var(--fontSizeBase400)]',
        caption: 'text-[var(--fontSizeBase100)] text-[var(--colorNeutralForeground2)]',
        subtitle: 'text-[var(--fontSizeBase400)] font-[var(--fontWeightSemibold)]',
        title: 'text-[var(--fontSizeBase500)] font-[var(--fontWeightSemibold)]',
        titleLarge: 'text-[var(--fontSizeBase600)] font-[var(--fontWeightSemibold)]',
        display: 'text-[var(--fontSizeHero700)] font-[var(--fontWeightSemibold)]',
        largeDisplay: 'text-[var(--fontSizeHero800)] font-[var(--fontWeightSemibold)]',
        heroDisplay: 'text-[var(--fontSizeHero900)] font-[var(--fontWeightSemibold)]',
      },
      weight: {
        regular: 'font-[var(--fontWeightRegular)]',
        medium: 'font-[var(--fontWeightMedium)]',
        semibold: 'font-[var(--fontWeightSemibold)]',
        bold: 'font-[var(--fontWeightBold)]',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
      truncate: {
        true: 'truncate',
      },
    },
    defaultVariants: {
      variant: 'body',
      weight: 'regular',
      align: 'left',
      truncate: false,
    },
  }
)
