# Input

An accessible input component built on Fluent UI Input with custom Tailwind CSS styling.

## Usage

```tsx
import { Input } from "vindsmidi-ui/components/ui/input"

export default function Example() {
  return (
    <div className="space-y-4">
      <Input
        label="Username"
        placeholder="Enter your username"
      />
      
      <Input
        label="Email address"
        type="email"
        placeholder="name@example.com"
        required
      />
      
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        message="Password must be at least 8 characters"
      />
      
      <Input
        label="Error example"
        state="error"
        message="This field is required"
      />
      
      <Input
        label="Success example"
        state="success"
        message="Looks good!"
        defaultValue="Verified content"
      />
      
      <Input
        label="Disabled example"
        disabled
        value="Cannot be edited"
      />
    </div>
  )
}
```

## Controlled Example

```tsx
import { useState } from "react"
import { Input } from "vindsmidi-ui/components/ui/input"

export default function ControlledExample() {
  const [value, setValue] = useState("")
  
  return (
    <Input 
      label="Controlled input"
      value={value} 
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type something..."
    />
  )
}
```

## Features

- Built on Fluent UI Input component for accessibility
- Styled with Tailwind CSS using Fluent UI tokens
- Multiple variants (default, outline, filled, branded)
- Different sizes (small, default, large)
- Support for validation states (error, success)
- Integrated label and help/error message
- WCAG 2.1 compliant

## Accessibility

The Input component follows these accessibility best practices:

- Properly associated labels with inputs
- Support for keyboard navigation and operation
- Clear visual indication of focus, disabled, and error states
- Proper error messaging with aria-invalid and aria-describedby
- Required field indication
- Sufficient color contrast for all states
- Touch target size meets accessibility guidelines

## Framework Support

### React

```tsx
import { Input } from "vindsmidi-ui/components/ui/input"

<Input 
  label="Email"
  type="email"
  required
  placeholder="Enter your email"
/>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "outline" \| "filled" \| "branded"` | `"default"` | The visual style of the input |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | The size of the input |
| `state` | `"error" \| "success"` | `undefined` | State of the input (error, success) |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `required` | `boolean` | `false` | Whether the input is required |
| `label` | `React.ReactNode` | `undefined` | The label for the input |
| `message` | `React.ReactNode` | `undefined` | Message to display below the input |
| `id` | `string` | Auto-generated | Optional id for the input element |
| `onChange` | `React.ChangeEventHandler<HTMLInputElement>` | `undefined` | Callback for when the input value changes |
| `type` | `string` | `"text"` | HTML input type |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `value` | `string` | `undefined` | Value for controlled input |
| `defaultValue` | `string` | `undefined` | Default value for uncontrolled input |

## Variants

### Default

Standard input with border.

### Outline

Input with a border that changes to brand color on hover.

### Filled

Input with a filled background and no visible border.

### Branded

Input with brand-colored border.

## Examples

```tsx
// Different variants
<Input variant="default" label="Default" />
<Input variant="outline" label="Outline" />
<Input variant="filled" label="Filled" />
<Input variant="branded" label="Branded" />

// Different sizes
<Input size="sm" label="Small" />
<Input size="default" label="Default" />
<Input size="lg" label="Large" />

// Validation states
<Input state="error" label="Error" message="This field is invalid" />
<Input state="success" label="Success" message="Looks good!" />

// Required field
<Input required label="Required field" />

// Different input types
<Input type="text" label="Text" />
<Input type="email" label="Email" />
<Input type="password" label="Password" />
<Input type="number" label="Number" />
<Input type="tel" label="Telephone" />
<Input type="url" label="URL" />
<Input type="date" label="Date" />
<Input type="search" label="Search" />

// With prefix/suffix (added container and positioning)
<div className="relative">
  <span className="absolute left-3 top-1/2 -translate-y-1/2">@</span>
  <Input className="pl-7" label="Username" />
</div>
``` 