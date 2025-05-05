import * as React from 'react'
import { Input as FluentInput } from '@fluentui/react-components'
import { cn } from '../utils'
import { inputVariants, inputWrapperVariants, inputLabelVariants, inputMessageVariants } from './variants'
import type { FluentExtendedProps } from '../types'

/* === Input Component === */
export interface InputProps
  extends FluentExtendedProps<
    'input',
    {
      /**
       * The visual style of the input
       */
      variant?: 'default' | 'outline' | 'filled' | 'branded'

      /**
       * The size of the input
       */
      size?: 'sm' | 'default' | 'lg'

      /**
       * State of the input (error, success)
       */
      state?: 'error' | 'success'

      /**
       * Whether the input is disabled
       */
      disabled?: boolean

      /**
       * Whether the input is required
       */
      required?: boolean

      /**
       * The label for the input
       */
      label?: React.ReactNode

      /**
       * Message to display below the input (error, help text, etc.)
       */
      message?: React.ReactNode

      /**
       * Callback for when the input value changes
       */
      onChange?: React.ChangeEventHandler<HTMLInputElement>

      /**
       * Optional id for the input element
       */
      id?: string
    }
  > {}

/**
 * Input component that wraps Fluent UI Input
 * with our custom Tailwind CSS styling
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      state,
      disabled = false,
      required = false,
      label,
      message,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if none provided
    const uniqueId = React.useId()
    const inputId = id || uniqueId

    // Apply our Tailwind CSS variants
    const inputClasses = cn(inputVariants({ variant, size, state }), className)

    const wrapperClasses = inputWrapperVariants({ state })
    const labelClasses = inputLabelVariants({ state, required, disabled })
    const messageClasses = inputMessageVariants({ state })

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={inputId} className={labelClasses}>
            {label}
          </label>
        )}

        <FluentInput
          ref={ref}
          id={inputId}
          className={inputClasses}
          disabled={disabled}
          required={required}
          onChange={onChange}
          aria-describedby={message ? `${inputId}-message` : undefined}
          aria-invalid={state === 'error'}
          {...props}
        />

        {message && (
          <div id={`${inputId}-message`} className={messageClasses}>
            {message}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
