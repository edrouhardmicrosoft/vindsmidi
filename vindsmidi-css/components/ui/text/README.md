# Text (Typography)

A typography component that wraps the Fluent UI Text component with our custom Tailwind CSS styling, providing a consistent typographic system.

## Usage

```tsx
import { Text } from "vindsmidi-ui/components/ui/text"

export default function Example() {
  return (
    <div>
      <Text variant="titleLarge">Main Heading</Text>
      <Text variant="subtitle">Subtitle</Text>
      <Text variant="body">This is a paragraph of text that demonstrates the body text style.</Text>
      <Text variant="caption">Caption text for smaller, less important information</Text>
    </div>
  )
}
```

## Features

- Built on Fluent UI Text component for accessibility
- Styled with Tailwind CSS using Fluent UI tokens
- Multiple variants for different typographic needs
- Automatic semantic HTML elements based on variant
- Support for different text alignments and weights
- Truncation support for overflow handling
- WCAG 2.1 compliant

## Accessibility

The Text component follows these accessibility best practices:

- Uses semantic HTML elements appropriate to the text's function (`h1`, `h2`, `p`, etc.)
- Maintains proper heading hierarchy by default
- Follows WCAG 2.1 Level AA contrast requirements
- Supports text resizing up to 200% without loss of content or functionality
- Provides proper text spacing for readability

## Framework Support

### React

```tsx
import { Text } from "vindsmidi-ui/components/ui/text"

<Text variant="title">Heading</Text>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"body" \| "bodySmall" \| "bodyLarge" \| "caption" \| "subtitle" \| "title" \| "titleLarge" \| "display" \| "largeDisplay" \| "heroDisplay"` | `"body"` | The visual style of the text |
| `weight` | `"regular" \| "medium" \| "semibold" \| "bold"` | `"regular"` | The font weight of the text |
| `align` | `"left" \| "center" \| "right"` | `"left"` | The text alignment |
| `truncate` | `boolean` | `false` | Whether the text should truncate with ellipsis if it overflows |
| `as` | `React.ElementType` | Based on variant | The HTML element to render |

## Variants

### Heading Variants

- **titleLarge**: Main heading (renders as `h1`)
- **title**: Secondary heading (renders as `h2`)
- **subtitle**: Tertiary heading (renders as `h3`)
- **display**, **largeDisplay**, **heroDisplay**: Large display headings (renders as `h1`)

### Body Variants

- **body**: Standard paragraph text (renders as `p`)
- **bodySmall**: Smaller body text (renders as `p`)
- **bodyLarge**: Larger body text (renders as `p`)
- **caption**: Small caption text (renders as `span`)

## Examples

```tsx
// Different variants
<Text variant="body">Body text</Text>
<Text variant="bodySmall">Small body text</Text>
<Text variant="bodyLarge">Large body text</Text>
<Text variant="caption">Caption text</Text>
<Text variant="subtitle">Subtitle</Text>
<Text variant="title">Title</Text>
<Text variant="titleLarge">Large Title</Text>
<Text variant="display">Display</Text>
<Text variant="largeDisplay">Large Display</Text>
<Text variant="heroDisplay">Hero Display</Text>

// Different weights
<Text weight="regular">Regular</Text>
<Text weight="medium">Medium</Text>
<Text weight="semibold">Semibold</Text>
<Text weight="bold">Bold</Text>

// Different alignments
<Text align="left">Left aligned</Text>
<Text align="center">Center aligned</Text>
<Text align="right">Right aligned</Text>

// Truncate long text
<Text truncate>This is a very long text that will be truncated with an ellipsis when it overflows its container</Text>

// Override semantic element
<Text variant="title" as="span">Title styled as span</Text>
``` 