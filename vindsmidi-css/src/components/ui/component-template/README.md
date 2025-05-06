# Component Name

A brief description of the component and its purpose.

## Usage

```tsx
import { Component } from "vindsmidi-ui/components/ui/component-name"

export default function Example() {
  return (
    <Component>
      Component content
    </Component>
  )
}
```

## Features

- List key features
- Accessibility considerations
- WCAG compliance notes

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "secondary" \| "outline" \| "ghost"` | `"default"` | The visual style of the component |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | The size of the component |
| `disabled` | `boolean` | `false` | Whether the component is disabled |

## Variants

### Default

The standard appearance of the component.

### Secondary

A less prominent style.

### Outline

Bordered with transparent background.

### Ghost

Text-only with hover effect.

## Examples

### Basic Example

```tsx
<Component>Basic usage</Component>
```

### With Different Variants

```tsx
<Component variant="default">Default</Component>
<Component variant="secondary">Secondary</Component>
<Component variant="outline">Outline</Component>
<Component variant="ghost">Ghost</Component>
```

### With Different Sizes

```tsx
<Component size="sm">Small</Component>
<Component size="default">Default</Component>
<Component size="lg">Large</Component>
```

## Accessibility

This component follows WCAG 2.1 guidelines and includes the following accessibility features:

- Keyboard navigation support
- Screen reader announcements
- Appropriate contrast ratios
- Focus indicators 