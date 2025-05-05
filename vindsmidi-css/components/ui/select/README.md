# Select

An accessible select/dropdown component built on Fluent UI Dropdown with custom Tailwind CSS styling.

## Usage

```tsx
import { Select } from "vindsmidi-ui/components/ui/select"

export default function Example() {
  return (
    <div className="space-y-4">
      <Select label="Favorite fruit">
        <Select.Option value="apple">Apple</Select.Option>
        <Select.Option value="banana">Banana</Select.Option>
        <Select.Option value="orange">Orange</Select.Option>
        <Select.Option value="strawberry">Strawberry</Select.Option>
      </Select>
      
      <Select label="Country" defaultValue="us">
        <Select.Option value="us">United States</Select.Option>
        <Select.Option value="ca">Canada</Select.Option>
        <Select.Option value="uk">United Kingdom</Select.Option>
        <Select.Option value="au">Australia</Select.Option>
      </Select>
      
      <Select 
        label="Meal preference" 
        state="error" 
        message="Please select a meal preference"
      >
        <Select.Option value="vegetarian">Vegetarian</Select.Option>
        <Select.Option value="vegan">Vegan</Select.Option>
        <Select.Option value="pescatarian">Pescatarian</Select.Option>
        <Select.Option value="none" disabled>No preference</Select.Option>
      </Select>
      
      <Select 
        label="Category" 
        variant="filled"
        required
      >
        <Select.OptionGroup label="Electronics">
          <Select.Option value="phones">Phones</Select.Option>
          <Select.Option value="laptops">Laptops</Select.Option>
          <Select.Option value="tablets">Tablets</Select.Option>
        </Select.OptionGroup>
        <Select.OptionGroup label="Clothing">
          <Select.Option value="shirts">Shirts</Select.Option>
          <Select.Option value="pants">Pants</Select.Option>
          <Select.Option value="dresses">Dresses</Select.Option>
        </Select.OptionGroup>
      </Select>
    </div>
  )
}
```

## Controlled Example

```tsx
import { useState } from "react"
import { Select } from "vindsmidi-ui/components/ui/select"

export default function ControlledExample() {
  const [value, setValue] = useState("")
  
  return (
    <Select 
      label="Theme"
      value={value} 
      onValueChange={setValue}
      placeholder="Select a theme"
    >
      <Select.Option value="light">Light</Select.Option>
      <Select.Option value="dark">Dark</Select.Option>
      <Select.Option value="system">System</Select.Option>
    </Select>
  )
}
```

## Features

- Built on Fluent UI Dropdown component for accessibility
- Styled with Tailwind CSS using Fluent UI tokens
- Multiple variants (default, outline, filled, branded)
- Different sizes (small, default, large)
- Support for validation states (error, success)
- Option groups for organizing related options
- Integrated label and help/error message
- WCAG 2.1 compliant

## Accessibility

The Select component follows these accessibility best practices:

- Properly associated labels with the select control
- Support for keyboard navigation and operation
- Clear visual indication of focus, disabled, and error states
- Proper error messaging with aria-invalid and aria-describedby
- Required field indication
- Sufficient color contrast for all states
- Support for keyboard interaction within dropdown options
- ARIA attributes for describing state and relationships

## Framework Support

### React

```tsx
import { Select } from "vindsmidi-ui/components/ui/select"

<Select 
  label="Options"
  placeholder="Select an option"
>
  <Select.Option value="option1">Option 1</Select.Option>
  <Select.Option value="option2">Option 2</Select.Option>
</Select>
```

## API Reference

### Select Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "outline" \| "filled" \| "branded"` | `"default"` | The visual style of the select |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | The size of the select |
| `state` | `"error" \| "success"` | `undefined` | State of the select (error, success) |
| `disabled` | `boolean` | `false` | Whether the select is disabled |
| `required` | `boolean` | `false` | Whether the select is required |
| `label` | `React.ReactNode` | `undefined` | The label for the select |
| `message` | `React.ReactNode` | `undefined` | Message to display below the select |
| `id` | `string` | Auto-generated | Optional id for the select element |
| `value` | `string` | `undefined` | The selected value (controlled) |
| `defaultValue` | `string` | `undefined` | Default value for uncontrolled usage |
| `onValueChange` | `(value: string) => void` | `undefined` | Callback for when the value changes |
| `placeholder` | `string` | `"Select an option"` | The placeholder text |

### SelectOption Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **Required** | The value of the option |
| `disabled` | `boolean` | `false` | Whether the option is disabled |
| `children` | `React.ReactNode` | **Required** | The content of the option |

### SelectOptionGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | **Required** | The label for the option group |
| `children` | `React.ReactNode` | **Required** | The options within the group |

## Variants

### Default

Standard select with border.

### Outline

Select with a border that changes to brand color on hover.

### Filled

Select with a filled background and no visible border.

### Branded

Select with brand-colored border.

## Examples

```tsx
// Different variants
<Select variant="default" label="Default">
  <Select.Option value="option1">Option 1</Select.Option>
  <Select.Option value="option2">Option 2</Select.Option>
</Select>

<Select variant="outline" label="Outline">
  <Select.Option value="option1">Option 1</Select.Option>
  <Select.Option value="option2">Option 2</Select.Option>
</Select>

<Select variant="filled" label="Filled">
  <Select.Option value="option1">Option 1</Select.Option>
  <Select.Option value="option2">Option 2</Select.Option>
</Select>

<Select variant="branded" label="Branded">
  <Select.Option value="option1">Option 1</Select.Option>
  <Select.Option value="option2">Option 2</Select.Option>
</Select>

// Different sizes
<Select size="sm" label="Small">
  <Select.Option value="option1">Option 1</Select.Option>
  <Select.Option value="option2">Option 2</Select.Option>
</Select>

<Select size="default" label="Default">
  <Select.Option value="option1">Option 1</Select.Option>
  <Select.Option value="option2">Option 2</Select.Option>
</Select>

<Select size="lg" label="Large">
  <Select.Option value="option1">Option 1</Select.Option>
  <Select.Option value="option2">Option 2</Select.Option>
</Select>

// Validation states
<Select state="error" label="Error" message="Please select an option">
  <Select.Option value="option1">Option 1</Select.Option>
  <Select.Option value="option2">Option 2</Select.Option>
</Select>

<Select state="success" label="Success" message="Good choice!">
  <Select.Option value="option1">Option 1</Select.Option>
  <Select.Option value="option2">Option 2</Select.Option>
</Select>

// Required field
<Select required label="Required field">
  <Select.Option value="option1">Option 1</Select.Option>
  <Select.Option value="option2">Option 2</Select.Option>
</Select>

// With option groups
<Select label="Grouped options">
  <Select.OptionGroup label="Group 1">
    <Select.Option value="option1">Option 1</Select.Option>
    <Select.Option value="option2">Option 2</Select.Option>
  </Select.OptionGroup>
  <Select.OptionGroup label="Group 2">
    <Select.Option value="option3">Option 3</Select.Option>
    <Select.Option value="option4">Option 4</Select.Option>
  </Select.OptionGroup>
</Select>
``` 