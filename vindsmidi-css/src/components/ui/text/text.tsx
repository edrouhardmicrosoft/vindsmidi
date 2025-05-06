import * as React from 'react'
import { Text as FluentText } from '@fluentui/react-components'
import { cn } from '../utils'
import { textVariants } from './variants'
import type { FluentExtendedProps } from '../types'

export interface TextProps
  extends FluentExtendedProps<
    'p',
    {
      /**
       * The visual style of the text
       */
      variant?:
        | 'body'
        | 'bodySmall'
        | 'bodyLarge'
        | 'caption'
        | 'subtitle'
        | 'title'
        | 'titleLarge'
        | 'display'
        | 'largeDisplay'
        | 'heroDisplay'

      /**
       * The font weight of the text
       */
      weight?: 'regular' | 'medium' | 'semibold' | 'bold'

      /**
       * The text alignment
       */
      align?: 'left' | 'center' | 'right'

      /**
       * Whether the text should truncate with ellipsis if it overflows
       */
      truncate?: boolean

      /**
       * The content of the text
       */
      children?: React.ReactNode

      /**
       * The HTML element to render, defaults to appropriate semantic element based on variant
       */
      as?: React.ElementType
    }
  > {}

/**
 * Text component that wraps Fluent UI Text
 * with our custom Tailwind CSS styling
 */
export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    { className, variant = 'body', weight = 'regular', align = 'left', truncate = false, children, as, ...props },
    ref
  ) => {
    // Automatically select the appropriate semantic element based on variant
    // if not explicitly specified with 'as' prop
    const Element =
      as ||
      (() => {
        switch (variant) {
          case 'title':
            return 'h2'
          case 'titleLarge':
            return 'h1'
          case 'subtitle':
            return 'h3'
          case 'display':
          case 'largeDisplay':
          case 'heroDisplay':
            return 'h1'
          case 'caption':
            return 'span'
          default:
            return 'p'
        }
      })()

    // Apply our Tailwind CSS variants
    const tailwindClasses = cn(textVariants({ variant, weight, align, truncate }), className)

    return (
      <FluentText ref={ref} as={Element} className={tailwindClasses} {...props}>
        {children}
      </FluentText>
    )
  }
)

Text.displayName = 'Text'
