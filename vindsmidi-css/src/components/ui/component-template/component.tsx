import * as React from 'react'
// import {
//   SomeComponent as FluentComponent,
//   useSomeComponentStyles_unstable
// } from '@fluentui/react-components';
import { cn } from '../utils'
import { componentVariants } from './variants'
import type { FluentExtendedProps } from '../types'

// Define props with TypeScript, extending Fluent UI props
export interface ComponentProps
  extends FluentExtendedProps<
    'div',
    {
      /**
       * The visual style of the component
       */
      variant?: 'default' | 'secondary' | 'outline' | 'ghost'

      /**
       * The size of the component
       */
      size?: 'sm' | 'default' | 'lg'
    }
  > {}

/**
 * Component template - replace this with your component description
 *
 * This wraps a Fluent UI component with our Tailwind CSS styling
 */
export const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    // 1. Set up any component-specific logic

    // 2. Apply Tailwind CSS classes using our variant system
    const tailwindClasses = cn(componentVariants({ variant, size }), className)

    // 3. Render a simple div for now
    return (
      <div ref={ref} className={tailwindClasses} {...props}>
        {children}
      </div>
    )
  }
)

// Set display name for debugging
Component.displayName = 'Component'

/**
 * Framework-agnostic implementation notes:
 *
 * For non-React frameworks:
 * 1. The structure will vary based on framework
 * 2. The core styling (variants.ts) remains the same
 * 3. The implementation file would be renamed (e.g., component.vue, component.svelte)
 * 4. The wrapper pattern remains conceptually the same:
 *    - Import Fluent UI component (or equivalent)
 *    - Apply our Tailwind CSS classes
 *    - Forward remaining props
 */
