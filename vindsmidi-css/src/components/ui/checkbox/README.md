# Checkbox

An accessible checkbox component built on Fluent UI Checkbox with custom Tailwind CSS styling.

## Usage

```tsx
import { Checkbox } from "vindsmidi-ui/components/ui/checkbox"

export default function Example() {
  return (
    <div className="space-y-4">
      <Checkbox label="Accept terms and conditions" />
      
      <Checkbox 
        label="Remember me" 
        defaultChecked 
      />
      
      <Checkbox 
        label="Select all (some items selected)" 
        indeterminate 
      />
      
      <Checkbox 
        label="Disabled option" 
        disabled 
      />
    </div>
  )
}
```

## Controlled Example

```tsx
import { useState } from "react"
import { Checkbox } from "vindsmidi-ui/components/ui/checkbox"

export default function ControlledExample() {
  const [checked, setChecked] = useState(false)
  
  return (
    <Checkbox 
      label="Email me about new features" 
      checked={checked}
      onCheckedChange={setChecked}
    />
  )
}
```

## Features

- Built on Fluent UI Checkbox component for accessibility
- Styled with Tailwind CSS using Fluent UI tokens
- Multiple variants (default, circular, subtle)
- Different sizes (small, default, large)
- Support for indeterminate state
- Customizable check and indeterminate icons
- WCAG 2.1 compliant

## Accessibility

The Checkbox component follows these accessibility best practices:

- Proper association between checkbox and label
- Support for keyboard navigation and activation
- Clear visual indication of focus, checked, and disabled states
- Proper ARIA attributes for checked and indeterminate states
- Sufficient color contrast for all states
- Touch target size meets accessibility guidelines
- Unique auto-generated IDs for multiple checkboxes

## Framework Support

### React

```tsx
import { Checkbox } from "vindsmidi-ui/components/ui/checkbox"

<Checkbox label="Option" checked={checked} onCheckedChange={setChecked} />
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "circular" \| "subtle"` | `"default"` | The visual style of the checkbox |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | The size of the checkbox |
| `checked` | `boolean` | `undefined` | Whether the checkbox is checked (controlled) |
| `defaultChecked` | `boolean` | `false` | Default checked state (uncontrolled) |
| `indeterminate` | `boolean` | `false` | Whether the checkbox is in an indeterminate state |
| `disabled` | `boolean` | `false` | Whether the checkbox is disabled |
| `label` | `React.ReactNode` | `undefined` | The label for the checkbox |
| `onCheckedChange` | `(checked: boolean) => void` | `undefined` | Handler for when the checked state changes |
| `id` | `string` | Auto-generated | Optional id for the input element |
| `checkIcon` | `React.ReactNode` | `<CheckmarkFilled />` | Custom check icon |
| `indeterminateIcon` | `React.ReactNode` | `<SubtractFilled />` | Custom indeterminate icon |

## Variants

### Default

Standard checkbox with square shape.

### Circular

Checkbox with circular/rounded shape.

### Subtle

Checkbox with a lighter, more subtle appearance.

## Examples

```tsx
// Different variants
<Checkbox variant="default" label="Default" />
<Checkbox variant="circular" label="Circular" />
<Checkbox variant="subtle" label="Subtle" />

// Different sizes
<Checkbox size="sm" label="Small" />
<Checkbox size="default" label="Default" />
<Checkbox size="lg" label="Large" />

// States
<Checkbox checked label="Checked" />
<Checkbox indeterminate label="Indeterminate" />
<Checkbox disabled label="Disabled" />
<Checkbox checked disabled label="Checked & Disabled" />

// Custom icons
import { HeartFilled, SquareFilled } from "@fluentui/react-icons"

<Checkbox 
  checkIcon={<HeartFilled />} 
  indeterminateIcon={<SquareFilled />}
  label="Custom icons" 
/>

// Without label
<Checkbox aria-label="Toggle option" />
``` 