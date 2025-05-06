import * as React from 'react'
import { Radio as FluentRadio, RadioGroup as FluentRadioGroup } from '@fluentui/react-components'
import { cn } from '../utils'
import { radioGroupVariants, radioVariants, radioIndicatorVariants, radioLabelVariants } from './variants'
import type { FluentExtendedProps } from '../types'

/* === RadioGroup Component === */
export interface RadioGroupProps
  extends FluentExtendedProps<
    'div',
    {
      /**
       * The orientation of the radio group
       */
      orientation?: 'horizontal' | 'vertical'

      /**
       * The value of the selected radio
       */
      value?: string

      /**
       * Default value for uncontrolled usage
       */
      defaultValue?: string

      /**
       * Handler for when the value changes
       */
      onValueChange?: (value: string) => void

      /**
       * Whether the radio group is disabled
       */
      disabled?: boolean

      /**
       * The name attribute to be used on the radio inputs
       */
      name?: string

      /**
       * The children of the radio group (should be Radio components)
       */
      children: React.ReactNode
    }
  > {}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      orientation = 'vertical',
      value,
      defaultValue,
      onValueChange,
      disabled = false,
      name,
      children,
      ...props
    },
    ref
  ) => {
    // Apply our Tailwind CSS variants
    const groupClasses = cn(radioGroupVariants({ orientation }), className)

    // Handle value changes
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement
      if (onValueChange) {
        onValueChange(target.value)
      }
    }

    return (
      <FluentRadioGroup
        ref={ref}
        className={groupClasses}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        onChange={handleChange}
        layout={orientation}
        {...props}
      >
        {children}
      </FluentRadioGroup>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'

/* === Radio Component === */
export interface RadioProps
  extends FluentExtendedProps<
    'input',
    {
      /**
       * The visual style of the radio
       */
      variant?: 'default' | 'subtle'

      /**
       * The size of the radio
       */
      size?: 'sm' | 'default' | 'lg'

      /**
       * The value of the radio
       */
      value: string

      /**
       * Whether the radio is checked
       */
      checked?: boolean

      /**
       * Whether the radio is disabled
       */
      disabled?: boolean

      /**
       * The label for the radio
       */
      label?: React.ReactNode

      /**
       * Optional id for the input element
       */
      id?: string
    }
  > {}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    { className, variant = 'default', size = 'default', value, checked, disabled = false, label, id, ...props },
    ref
  ) => {
    // Generate a unique ID if none provided
    const uniqueId = React.useId()
    const radioId = id || uniqueId

    // Apply our Tailwind CSS variants
    const radioClasses = cn(radioVariants({ variant, size }), className)

    const indicatorClasses = radioIndicatorVariants({ size })
    const labelClasses = radioLabelVariants({ size, disabled })

    // Additional attributes based on state
    const radioStateAttributes = {
      'data-checked': checked ? '' : undefined,
    }

    return (
      <div className="flex items-center space-x-2">
        <FluentRadio
          ref={ref}
          id={radioId}
          value={value}
          checked={checked}
          className={radioClasses}
          disabled={disabled}
          {...radioStateAttributes}
          {...props}
        >
          {checked && <span className={indicatorClasses} />}
        </FluentRadio>

        {label && (
          <label htmlFor={radioId} className={labelClasses}>
            {label}
          </label>
        )}
      </div>
    )
  }
)

Radio.displayName = 'Radio'
