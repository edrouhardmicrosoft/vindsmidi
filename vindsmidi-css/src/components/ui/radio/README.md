# Radio

An accessible radio button component built on Fluent UI Radio with custom Tailwind CSS styling.

## Usage

```tsx
import { Radio, RadioGroup } from "vindsmidi-ui/components/ui/radio"

export default function Example() {
  return (
    <RadioGroup defaultValue="option-one">
      <Radio value="option-one" label="Option One" />
      <Radio value="option-two" label="Option Two" />
      <Radio value="option-three" label="Option Three" />
      <Radio value="disabled" label="Disabled Option" disabled />
    </RadioGroup>
  )
}
```

## Controlled Example

```tsx
import { useState } from "react"
import { Radio, RadioGroup } from "vindsmidi-ui/components/ui/radio"

export default function ControlledExample() {
  const [value, setValue] = useState("option-one")
  
  return (
    <RadioGroup 
      value={value} 
      onValueChange={setValue}
    >
      <Radio value="option-one" label="Option One" />
      <Radio value="option-two" label="Option Two" />
      <Radio value="option-three" label="Option Three" />
    </RadioGroup>
  )
}
```

## Features

- Built on Fluent UI Radio component for accessibility
- Styled with Tailwind CSS using Fluent UI tokens
- Multiple radio variants (default, subtle)
- Different sizes (small, default, large)
- Horizontal and vertical orientation support
- WCAG 2.1 compliant

## Accessibility

The Radio component follows these accessibility best practices:

- Proper association between radio buttons and labels
- Support for keyboard navigation and activation
- Clear visual indication of focus, checked, and disabled states
- Proper grouping of related radio buttons
- Sufficient color contrast for all states
- Touch target size meets accessibility guidelines
- Unique auto-generated IDs for multiple radio buttons

## Framework Support

### React

```tsx
import { Radio, RadioGroup } from "vindsmidi-ui/components/ui/radio"

<RadioGroup 
  defaultValue="option-one"
  aria-label="Choose an option"
>
  <Radio value="option-one" label="Option One" />
  <Radio value="option-two" label="Option Two" />
</RadioGroup>
```

## API Reference

### RadioGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` | The orientation of the radio group |
| `value` | `string` | `undefined` | The value of the selected radio (controlled) |
| `defaultValue` | `string` | `undefined` | Default value for uncontrolled usage |
| `onValueChange` | `(value: string) => void` | `undefined` | Handler for when the value changes |
| `disabled` | `boolean` | `false` | Whether the radio group is disabled |
| `name` | `string` | Auto-generated | The name attribute to be used on the radio inputs |

### Radio Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "subtle"` | `"default"` | The visual style of the radio |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | The size of the radio |
| `value` | `string` | **Required** | The value of the radio |
| `checked` | `boolean` | `undefined` | Whether the radio is checked (usually managed by RadioGroup) |
| `disabled` | `boolean` | `false` | Whether the radio is disabled |
| `label` | `React.ReactNode` | `undefined` | The label for the radio |
| `id` | `string` | Auto-generated | Optional id for the input element |

## Variants

### Default

Standard radio button with solid accent color when selected.

### Subtle

Radio button with a lighter, more subtle appearance when selected.

## Examples

```tsx
// Different variants
<RadioGroup defaultValue="default">
  <Radio variant="default" value="default" label="Default" />
  <Radio variant="subtle" value="subtle" label="Subtle" />
</RadioGroup>

// Different sizes
<RadioGroup defaultValue="default" orientation="horizontal">
  <Radio size="sm" value="small" label="Small" />
  <Radio size="default" value="default" label="Default" />
  <Radio size="lg" value="large" label="Large" />
</RadioGroup>

// Horizontal orientation
<RadioGroup orientation="horizontal" defaultValue="option-one">
  <Radio value="option-one" label="One" />
  <Radio value="option-two" label="Two" />
  <Radio value="option-three" label="Three" />
</RadioGroup>

// Disabled state
<RadioGroup defaultValue="enabled">
  <Radio value="enabled" label="Enabled option" />
  <Radio value="disabled" label="Disabled option" disabled />
</RadioGroup>

// Without labels (ensure proper accessibility)
<RadioGroup aria-label="Color selection" defaultValue="red">
  <Radio value="red" aria-label="Red" />
  <Radio value="green" aria-label="Green" />
  <Radio value="blue" aria-label="Blue" />
</RadioGroup>
``` 