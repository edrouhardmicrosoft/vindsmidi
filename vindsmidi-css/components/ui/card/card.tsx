import * as React from 'react'
import { Card as FluentCard } from '@fluentui/react-components'
import { cn } from '../utils'
import { cardVariants, cardHeaderVariants, cardContentVariants, cardFooterVariants } from './variants'
import type { FluentExtendedProps } from '../types'

/* === Card === */
export interface CardProps
  extends FluentExtendedProps<
    'div',
    {
      /**
       * The visual style of the card
       */
      variant?: 'default' | 'filled' | 'outline' | 'subtle' | 'branded'

      /**
       * The size of the card padding
       */
      size?: 'sm' | 'default' | 'lg'

      /**
       * The shadow level of the card
       */
      shadow?: 'none' | 'sm' | 'default' | 'lg'

      /**
       * If true, adds hover and focus styles for interactive cards
       */
      interactive?: boolean

      /**
       * The content of the card
       */
      children?: React.ReactNode
    }
  > {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant = 'default', size = 'default', shadow = 'default', interactive = false, children, ...props },
    ref
  ) => {
    // Apply our Tailwind CSS variants
    const tailwindClasses = cn(cardVariants({ variant, size, shadow, interactive }), className)

    return (
      <FluentCard ref={ref} className={tailwindClasses} {...props} tabIndex={interactive ? 0 : undefined}>
        {children}
      </FluentCard>
    )
  }
)

Card.displayName = 'Card'

/* === Card Header === */
export interface CardHeaderProps
  extends FluentExtendedProps<
    'div',
    {
      /**
       * The visual style of the card header (should match parent card)
       */
      variant?: 'default' | 'filled' | 'outline' | 'subtle' | 'branded'

      /**
       * The content of the card header
       */
      children?: React.ReactNode
    }
  > {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    // Apply our Tailwind CSS variants
    const tailwindClasses = cn(cardHeaderVariants({ variant }), className)

    return (
      <div ref={ref} className={tailwindClasses} {...props}>
        {children}
      </div>
    )
  }
)

CardHeader.displayName = 'CardHeader'

/* === Card Content === */
export interface CardContentProps
  extends FluentExtendedProps<
    'div',
    {
      /**
       * If true, adds padding to the top of the content
       */
      padded?: boolean

      /**
       * The content of the card content
       */
      children?: React.ReactNode
    }
  > {}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, padded = false, children, ...props }, ref) => {
    // Apply our Tailwind CSS variants
    const tailwindClasses = cn(cardContentVariants({ padded }), className)

    return (
      <div ref={ref} className={tailwindClasses} {...props}>
        {children}
      </div>
    )
  }
)

CardContent.displayName = 'CardContent'

/* === Card Footer === */
export interface CardFooterProps
  extends FluentExtendedProps<
    'div',
    {
      /**
       * The visual style of the card footer (should match parent card)
       */
      variant?: 'default' | 'filled' | 'outline' | 'subtle' | 'branded'

      /**
       * The alignment of the footer content
       */
      align?: 'start' | 'center' | 'end' | 'between'

      /**
       * The content of the card footer
       */
      children?: React.ReactNode
    }
  > {}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, variant = 'default', align = 'between', children, ...props }, ref) => {
    // Apply our Tailwind CSS variants
    const tailwindClasses = cn(cardFooterVariants({ variant, align }), className)

    return (
      <div ref={ref} className={tailwindClasses} {...props}>
        {children}
      </div>
    )
  }
)

CardFooter.displayName = 'CardFooter'

/* === Card Title === */
export interface CardTitleProps
  extends FluentExtendedProps<
    'h3',
    {
      /**
       * The content of the card title
       */
      children?: React.ReactNode
    }
  > {}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          'text-[var(--fontSizeBase500)] font-[var(--fontWeightSemibold)] leading-none tracking-tight',
          className
        )}
        {...props}
      >
        {children}
      </h3>
    )
  }
)

CardTitle.displayName = 'CardTitle'

/* === Card Description === */
export interface CardDescriptionProps
  extends FluentExtendedProps<
    'p',
    {
      /**
       * The content of the card description
       */
      children?: React.ReactNode
    }
  > {}

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-[var(--fontSizeBase200)] text-[var(--colorNeutralForeground2)]', className)}
        {...props}
      >
        {children}
      </p>
    )
  }
)

CardDescription.displayName = 'CardDescription'
