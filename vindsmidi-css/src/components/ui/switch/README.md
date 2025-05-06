# Switch

An accessible toggle switch component built on Fluent UI Switch with custom Tailwind CSS styling.

## Usage

```tsx
import { Switch } from "vindsmidi-ui/components/ui/switch"

export default function Example() {
  return (
    <div className="space-y-4">
      <Switch label="Airplane Mode" />
      
      <Switch 
        label="Wi-Fi" 
        defaultChecked 
      />
      
      <Switch 
        label="Bluetooth" 
        variant="subtle" 
      />
      
      <Switch 
        label="Do Not Disturb" 
        disabled 
      />
    </div>
  )
}
```

## Controlled Example

```tsx
import { useState } from "react"
import { Switch } from "vindsmidi-ui/components/ui/switch"

export default function ControlledExample() {
  const [enabled, setEnabled] = useState(false)
  
  return (
    <Switch 
      label="Notifications" 
      checked={enabled}
      onCheckedChange={setEnabled}
    />
  )
}
```

## Features

- Built on Fluent UI Switch component for accessibility
- Styled with Tailwind CSS using Fluent UI tokens
- Multiple variants (default, subtle)
- Different sizes (small, default, large)
- Support for controlled and uncontrolled state
- WCAG 2.1 compliant

## Accessibility

The Switch component follows these accessibility best practices:

- Proper association between switch and label
- Support for keyboard navigation and activation (Space key)
- Clear visual indication of focus, checked, and disabled states
- Touch target size meets accessibility guidelines
- Sufficient color contrast for all states
- Appropriate aria attributes for toggle state
- Unique auto-generated IDs for multiple switches

## Framework Support

### React

```tsx
import { Switch } from "vindsmidi-ui/components/ui/switch"

<Switch label="Dark Mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "subtle"` | `"default"` | The visual style of the switch |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | The size of the switch |
| `checked` | `boolean` | `undefined` | Whether the switch is checked (controlled) |
| `defaultChecked` | `boolean` | `false` | Default checked state (uncontrolled) |
| `disabled` | `boolean` | `false` | Whether the switch is disabled |
| `onCheckedChange` | `(checked: boolean) => void` | `undefined` | Handler for when the checked state changes |
| `label` | `React.ReactNode` | `undefined` | The label for the switch |
| `id` | `string` | Auto-generated | Optional id for the button element |

## Variants

### Default

Standard switch with solid accent color when enabled.

### Subtle

Switch with a lighter, more subtle appearance when enabled.

## Examples

```tsx
// Different variants
<Switch variant="default" label="Default" />
<Switch variant="subtle" label="Subtle" />

// Different sizes
<Switch size="sm" label="Small" />
<Switch size="default" label="Default" />
<Switch size="lg" label="Large" />

// States
<Switch checked label="Checked" />
<Switch disabled label="Disabled" />
<Switch checked disabled label="Checked & Disabled" />

// Without label (ensure proper accessibility)
<Switch aria-label="Toggle dark mode" />

// Custom colors via CSS variables
<div style={{ "--colorBrandBackground": "#9c27b0" }}>
  <Switch label="Custom color" />
</div>
``` 