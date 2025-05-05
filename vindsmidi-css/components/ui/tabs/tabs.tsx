import * as React from 'react'
import { TabList as FluentTabList, Tab as FluentTab, SelectTabData, SelectTabEvent } from '@fluentui/react-components'
import { cn } from '../utils'
import { tabListVariants, tabVariants } from './variants'
import type { FluentExtendedProps } from '../types'

/* === Tabs Component === */
export interface TabsProps
  extends FluentExtendedProps<
    'div',
    {
      /**
       * The selected tab value (controlled)
       */
      value?: string
      /**
       * The default selected tab value (uncontrolled)
       */
      defaultValue?: string
      /**
       * Callback when the selected tab changes
       */
      onValueChange?: (value: string) => void
      /**
       * Visual appearance of the tab list
       */
      appearance?: 'default' | 'subtle' | 'transparent'
      /**
       * Orientation of the tabs
       */
      orientation?: 'horizontal' | 'vertical'
      /**
       * Size of the tabs
       */
      size?: 'sm' | 'md'
      /**
       * The children (Tab components)
       */
      children: React.ReactNode
      /**
       * Optional id for the tablist
       */
      id?: string
      /**
       * Additional className for the tablist
       */
      className?: string
    }
  > {}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      appearance = 'default',
      orientation = 'horizontal',
      size = 'md',
      children,
      id,
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const isControlled = value !== undefined
    const selectedValue = isControlled ? value : internalValue

    // Handle tab selection
    const handleTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
      if (!isControlled) setInternalValue(data.value as string)
      if (onValueChange) onValueChange(data.value as string)
    }

    // Compose Tailwind classes
    const tabListClass = cn(tabListVariants({ appearance, orientation, size }), className)

    return (
      <FluentTabList
        ref={ref as any}
        id={id}
        className={tabListClass}
        selectedValue={selectedValue}
        onTabSelect={handleTabSelect}
        vertical={orientation === 'vertical'}
        {...props}
      >
        {children}
      </FluentTabList>
    )
  }
)
Tabs.displayName = 'Tabs'

/* === Tab Component === */
export interface TabProps
  extends FluentExtendedProps<
    'button',
    {
      /**
       * The value of the tab (required)
       */
      value: string
      /**
       * If true, disables the tab
       */
      disabled?: boolean
      /**
       * Optional icon for the tab
       */
      icon?: React.ReactNode
      /**
       * Additional className for the tab
       */
      className?: string
      /**
       * Tab size (inherited from Tabs if not set)
       */
      size?: 'sm' | 'md'
      /**
       * Children (tab label)
       */
      children: React.ReactNode
    }
  > {}

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ value, disabled = false, icon, className, size = 'md', children, ...props }, ref) => {
    // Fluent UI handles selected state via context, so we style based on aria-selected
    // We'll use a function to merge classNames based on the selected/disabled state
    const getTabClass = (selected: boolean) => cn(tabVariants({ selected, disabled, size }), className)

    return (
      <FluentTab
        ref={ref}
        value={value}
        disabled={disabled}
        className={({ selected }) => getTabClass(!!selected)}
        icon={icon}
        {...props}
      >
        {children}
      </FluentTab>
    )
  }
)
Tab.displayName = 'Tab'

// Attach Tab as a static property of Tabs for ergonomic import
Tabs.Tab = Tab
