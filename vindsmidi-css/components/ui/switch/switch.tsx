import * as React from 'react'
import { Switch as FluentSwitch } from '@fluentui/react-components'
import { cn } from '../utils'
import { switchVariants, switchThumbVariants, switchLabelVariants } from './variants'
import type { FluentExtendedProps } from '../types'

export interface SwitchProps
  extends FluentExtendedProps<
    'button',
    {
      /**
       * The visual style of the switch
       */
      variant?: 'default' | 'subtle'

      /**
       * The size of the switch
       */
      size?: 'sm' | 'default' | 'lg'

      /**
       * Whether the switch is checked
       */
      checked?: boolean

      /**
       * Default checked state for uncontrolled usage
       */
      defaultChecked?: boolean

      /**
       * Whether the switch is disabled
       */
      disabled?: boolean

      /**
       * Handler for when the checked state changes
       */
      onCheckedChange?: (checked: boolean) => void

      /**
       * The label for the switch
       */
      label?: React.ReactNode

      /**
       * Optional id for the button element
       */
      id?: string
    }
  > {}

/**
 * Switch component that wraps Fluent UI Switch
 * with our custom Tailwind CSS styling
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      id,
      checked,
      defaultChecked,
      disabled = false,
      onCheckedChange,
      label,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if none provided
    const uniqueId = React.useId()
    const switchId = id || uniqueId

    // Apply our Tailwind CSS variants
    const switchClasses = cn(switchVariants({ variant, size }), className)

    const thumbClasses = switchThumbVariants({ size })
    const labelClasses = switchLabelVariants({ size, disabled })

    // Handle change events
    const handleChange = (e: React.FormEvent<HTMLElement>, data: { checked: boolean }) => {
      if (onCheckedChange) {
        onCheckedChange(data.checked)
      }
    }

    // Additional attributes based on state
    const switchStateAttributes = {
      'data-checked': checked ? '' : undefined,
    }

    return (
      <div className="flex items-center">
        <FluentSwitch
          ref={ref}
          id={switchId}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={handleChange}
          className={switchClasses}
          {...switchStateAttributes}
          {...props}
        >
          <span className={thumbClasses} data-checked={checked ? '' : undefined} />
        </FluentSwitch>

        {label && (
          <label htmlFor={switchId} className={labelClasses}>
            {label}
          </label>
        )}
      </div>
    )
  }
)

Switch.displayName = 'Switch'
