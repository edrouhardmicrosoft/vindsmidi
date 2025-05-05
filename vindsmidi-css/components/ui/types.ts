import type { ComponentProps as FluentComponentProps } from '@fluentui/react-components';

/**
 * Standard size options for components
 */
export type Size = 'sm' | 'default' | 'md' | 'lg' | 'xl';

/**
 * Standard Fluent UI-based color variants
 */
export type ColorVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'ghost'
  | 'link'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

/**
 * Interface for components with standard sizing
 */
export interface SizeProps {
  /**
   * The size of the component
   */
  size?: Size;
}

/**
 * Interface for components that can be disabled
 */
export interface DisableableProps {
  /**
   * Whether the component is disabled
   */
  disabled?: boolean;
}

/**
 * Interface for components that need a color variant
 */
export interface VariantProps {
  /**
   * The visual style of the component
   */
  variant?: ColorVariant;
}

/**
 * Standard ARIA attributes common across interactive components
 */
export interface AriaProps {
  /**
   * ID for aria-controls
   */
  'aria-controls'?: string;
  
  /**
   * Expanded state for expandable components
   */
  'aria-expanded'?: boolean;
  
  /**
   * Pressed state for toggle components
   */
  'aria-pressed'?: boolean;
  
  /**
   * Selected state
   */
  'aria-selected'?: boolean;
  
  /**
   * Label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Reference to element with additional description
   */
  'aria-describedby'?: string;
}

/**
 * Type for mapping Fluent UI component props to our styled component props
 */
export type FluentExtendedProps<TComponentName extends string, TExtraProps = {}> =
  FluentComponentProps<TComponentName> & TExtraProps;

/**
 * Common framework configuration type for multi-framework support
 */
export interface FrameworkConfig {
  /**
   * The target framework for component implementation
   */
  framework: 'react' | 'vue' | 'svelte' | 'web-components' | 'solid';
  
  /**
   * Additional framework-specific options
   */
  options?: Record<string, unknown>;
}