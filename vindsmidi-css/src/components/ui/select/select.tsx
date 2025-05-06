import * as React from 'react'
import { Dropdown, Option, OptionGroup } from '@fluentui/react-components'
import { ChevronDownRegular } from '@fluentui/react-icons'
import { cn } from '../utils'
import {
  selectVariants,
  selectTriggerVariants,
  selectContentVariants,
  selectOptionVariants,
  selectWrapperVariants,
  selectLabelVariants,
  selectMessageVariants,
} from './variants'
import type { FluentExtendedProps } from '../types'

/* === Select Component === */
export interface SelectProps
  extends FluentExtendedProps<
    'select',
    {
      /**
       * The visual style of the select
       */
      variant?: 'default' | 'outline' | 'filled' | 'branded'

      /**
       * The size of the select
       */
      size?: 'sm' | 'default' | 'lg'

      /**
       * State of the select (error, success)
       */
      state?: 'error' | 'success'

      /**
       * Whether the select is disabled
       */
      disabled?: boolean

      /**
       * Whether the select is required
       */
      required?: boolean

      /**
       * The label for the select
       */
      label?: React.ReactNode

      /**
       * Message to display below the select (error, help text, etc.)
       */
      message?: React.ReactNode

      /**
       * The selected value
       */
      value?: string

      /**
       * Default value for uncontrolled usage
       */
      defaultValue?: string

      /**
       * Callback for when the value changes
       */
      onValueChange?: (value: string) => void

      /**
       * Optional id for the select element
       */
      id?: string

      /**
       * The placeholder text
       */
      placeholder?: string

      /**
       * The children options (usually Select.Option components)
       */
      children: React.ReactNode
    }
  > {}

/**
 * Select component that wraps Fluent UI Dropdown
 * with our custom Tailwind CSS styling
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
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
      value,
      defaultValue,
      onValueChange,
      id,
      placeholder = 'Select an option',
      children,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if none provided
    const uniqueId = React.useId()
    const selectId = id || uniqueId

    // Apply our Tailwind CSS variants
    const selectClasses = cn(selectVariants({ variant, size, state }), className)

    const triggerClasses = selectTriggerVariants({ size })
    const wrapperClasses = selectWrapperVariants({ state })
    const labelClasses = selectLabelVariants({ state, required, disabled })
    const messageClasses = selectMessageVariants({ state })

    // Handle change events
    const handleChange = (e: any, data: { value: string }) => {
      if (onValueChange) {
        onValueChange(data.value)
      }
    }

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={selectId} className={labelClasses}>
            {label}
          </label>
        )}

        <Dropdown
          ref={ref as any}
          id={selectId}
          className={selectClasses}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          aria-describedby={message ? `${selectId}-message` : undefined}
          aria-invalid={state === 'error'}
          placeholder={placeholder}
          {...props}
        >
          <div className={triggerClasses}>
            <span>{value || placeholder}</span>
            <ChevronDownRegular />
          </div>

          {children}
        </Dropdown>

        {message && (
          <div id={`${selectId}-message`} className={messageClasses}>
            {message}
          </div>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

/* === Select Option Component === */
export interface SelectOptionProps
  extends FluentExtendedProps<
    'option',
    {
      /**
       * The value of the option
       */
      value: string

      /**
       * Whether the option is disabled
       */
      disabled?: boolean

      /**
       * The children of the option (usually text)
       */
      children: React.ReactNode
    }
  > {}

export const SelectOption = React.forwardRef<HTMLOptionElement, SelectOptionProps>(
  ({ className, value, disabled = false, children, ...props }, ref) => {
    const optionClasses = cn(selectOptionVariants({}), className)

    return (
      <Option ref={ref as any} className={optionClasses} value={value} disabled={disabled} {...props}>
        {children}
      </Option>
    )
  }
)

SelectOption.displayName = 'SelectOption'

/* === Select OptionGroup Component === */
export interface SelectOptionGroupProps
  extends FluentExtendedProps<
    'optgroup',
    {
      /**
       * The label for the option group
       */
      label: string

      /**
       * The children of the option group (usually SelectOption components)
       */
      children: React.ReactNode
    }
  > {}

export const SelectOptionGroup = React.forwardRef<HTMLOptGroupElement, SelectOptionGroupProps>(
  ({ className, label, children, ...props }, ref) => {
    return (
      <OptionGroup ref={ref as any} className={className} label={label} {...props}>
        {children}
      </OptionGroup>
    )
  }
)

SelectOptionGroup.displayName = 'SelectOptionGroup'

// Attach subcomponents
Select.Option = SelectOption
Select.OptionGroup = SelectOptionGroup
