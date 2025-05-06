import * as React from 'react'
import { Checkbox as FluentCheckbox } from '@fluentui/react-components'
import { CheckmarkFilled, SubtractFilled } from '@fluentui/react-icons'
import { cn } from '../utils'
import { checkboxVariants, checkboxIndicatorVariants, checkboxLabelVariants } from './variants'
import type { FluentExtendedProps } from '../types'

export interface CheckboxProps
  extends FluentExtendedProps<
    'input',
    {
      /**
       * The visual style of the checkbox
       */
      variant?: 'default' | 'circular' | 'subtle'

      /**
       * The size of the checkbox
       */
      size?: 'sm' | 'default' | 'lg'

      /**
       * Whether the checkbox is checked
       */
      checked?: boolean

      /**
       * Whether the checkbox is in an indeterminate state
       */
      indeterminate?: boolean

      /**
       * Whether the checkbox is disabled
       */
      disabled?: boolean

      /**
       * Handler for when the checked state changes
       */
      onCheckedChange?: (checked: boolean) => void

      /**
       * The label for the checkbox
       */
      label?: React.ReactNode

      /**
       * Optional id for the input element
       */
      id?: string

      /**
       * Custom check icon
       */
      checkIcon?: React.ReactNode

      /**
       * Custom indeterminate icon
       */
      indeterminateIcon?: React.ReactNode
    }
  > {}

/**
 * Checkbox component that wraps Fluent UI Checkbox
 * with our custom Tailwind CSS styling
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      id,
      checked,
      indeterminate,
      disabled = false,
      label,
      onCheckedChange,
      checkIcon,
      indeterminateIcon,
      ...props
    },
    ref
  ) => {
    // Remove children from props if present
    const { children, ...rest } = props as any
    // Generate a unique ID if none provided
    const uniqueId = React.useId()
    const checkboxId = id || uniqueId

    // Apply our Tailwind CSS variants
    const checkboxClasses = cn(checkboxVariants({ variant, size }), className)

    const indicatorClasses = checkboxIndicatorVariants({ size })
    const labelClasses = checkboxLabelVariants({ size, disabled })

    // Default icons if none provided
    const defaultCheckIcon = <CheckmarkFilled className={indicatorClasses} />
    const defaultIndeterminateIcon = <SubtractFilled className={indicatorClasses} />

    // Determine the current state to show the appropriate icon
    const icon = indeterminate ? indeterminateIcon || defaultIndeterminateIcon : checkIcon || defaultCheckIcon

    // Handle state changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onCheckedChange) {
        onCheckedChange(e.target.checked)
      }
    }

    // Additional attributes based on state
    const checkboxStateAttributes = {
      'data-checked': checked ? '' : undefined,
      'data-indeterminate': indeterminate ? '' : undefined,
    }

    return (
      <div className="flex items-center space-x-2">
        <FluentCheckbox
          ref={ref}
          id={checkboxId}
          checked={checked}
          className={checkboxClasses}
          disabled={disabled}
          onChange={handleChange}
          {...checkboxStateAttributes}
          {...rest}
          aria-checked={indeterminate ? 'mixed' : checked}
        />
        {label && (
          <label htmlFor={checkboxId} className={labelClasses}>
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
