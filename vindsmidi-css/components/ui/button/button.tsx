import * as React from 'react'
import { Button as FluentButton } from '@fluentui/react-components'
import { cn } from '../utils'
import { buttonVariants } from './variants'
import type { FluentExtendedProps } from '../types'

export interface ButtonProps
  extends FluentExtendedProps<
    'button',
    {
      /**
       * The visual style of the button
       */
      variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link'

      /**
       * The size of the button
       */
      size?: 'sm' | 'default' | 'lg' | 'icon'

      /**
       * The content of the button
       */
      children?: React.ReactNode

      /**
       * Show a loading spinner and disable the button
       */
      loading?: boolean
    }
  > {}

/**
 * Button component that wraps Fluent UI Button
 * with our custom Tailwind CSS styling
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'default', size = 'default', disabled = false, loading = false, children, ...props },
    ref
  ) => {
    // Apply our Tailwind CSS variants
    const tailwindClasses = cn(buttonVariants({ variant, size, disabled: disabled || loading }), className)

    return (
      <FluentButton
        ref={ref}
        className={tailwindClasses}
        disabled={disabled || loading}
        aria-busy={loading ? true : undefined}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin mr-2 h-4 w-4 text-current inline-block align-middle"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <circle className="opacity-25" cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" />
            <path className="opacity-75" fill="currentColor" d="M15 8a7 7 0 01-7 7V13a5 5 0 005-5h2z" />
          </svg>
        )}
        {children}
      </FluentButton>
    )
  }
)

Button.displayName = 'Button'

/**
 * Framework-agnostic implementation notes:
 *
 * For non-React frameworks:
 * 1. Vue: Use a <template> with v-bind to apply the classes
 * 2. Svelte: Use class:directive to conditionally apply classes
 * 3. Web Components: Use setAttribute to apply the classes
 * 4. Solid: Similar to React with solid-js patterns
 *
 * The core styling (buttonVariants) remains the same across all frameworks
 * Only the implementation pattern changes
 */
