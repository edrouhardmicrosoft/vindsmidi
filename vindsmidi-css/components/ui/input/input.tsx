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

      /**
       * Controlled value for the input
       */
      value?: string

      /**
       * Default value for the input
       */
      defaultValue?: string

      /**
       * Type of the input
       */
      type?:
        | 'number'
        | 'search'
        | 'time'
        | 'text'
        | 'password'
        | 'email'
        | 'tel'
        | 'url'
        | 'date'
        | 'datetime-local'
        | 'month'
        | 'week'
    }
  > {}

/**
 * Input component that wraps Fluent UI Input
 * with our custom Tailwind CSS styling
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, message, state, required = false, disabled = false, id, type = 'text', ...props }, ref) => {
    // Remove children from props if present
    const { children, ...rest } = props as any
    console.log('Input props passed to FluentInput:', rest)
    // Generate a unique ID if none provided
    const uniqueId = React.useId()
    const inputId = id || uniqueId
    const messageId = message ? `${inputId}-message` : undefined

    // Determine aria-invalid based on error state
    const isError = state === 'error'
    const isSuccess = state === 'success'

    // Apply our Tailwind CSS variants
    const inputClasses = inputVariants({ state })
    const wrapperClasses = inputWrapperVariants({ state })
    const labelClasses = inputLabelVariants({ state, required, disabled })
    const messageClasses = inputMessageVariants({ state })

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={inputId} className={labelClasses}>
            {label}
            {required && (
              <span className="after:content-['*'] after:ml-0.5 after:text-[var(--colorPaletteRedForeground2)]" />
            )}
          </label>
        )}
        <FluentInput
          ref={ref}
          id={inputId}
          className={inputClasses}
          type={type}
          disabled={disabled}
          aria-required={required}
          aria-invalid={state === 'error'}
          aria-describedby={messageId}
          {...Object.fromEntries(Object.entries(rest).filter(([k]) => k !== 'size'))}
        />
        {message && <div className={messageClasses}>{message}</div>}
      </div>
    )
  }
)

Input.displayName = 'Input'
