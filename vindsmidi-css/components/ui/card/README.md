# Card

A flexible card component built on Fluent UI Card with custom Tailwind CSS styling, providing a container for related content and actions.

## Usage

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "vindsmidi-ui/components/ui/card"
import { Button } from "vindsmidi-ui/components/ui/button"

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description text</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  )
}
```

## Features

- Built on Fluent UI Card component for accessibility
- Styled with Tailwind CSS using Fluent UI tokens
- Multiple variants for different visual styles
- Flexible size and shadow options
- Interactive state support
- Composable with Header, Content, Footer, Title, and Description subcomponents
- WCAG 2.1 compliant

## Accessibility

The Card component follows these accessibility best practices:

- Clear visual boundaries with sufficient contrast
- Support for keyboard navigation when interactive
- Proper heading hierarchies within cards
- Semantic structure for screen reader users
- Focus management for interactive elements within cards

## Framework Support

### React

```tsx
import { Card } from "vindsmidi-ui/components/ui/card"

<Card>Card content</Card>
```

## API Reference

### Card

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "filled" \| "outline" \| "subtle" \| "branded"` | `"default"` | The visual style of the card |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | The size of the card padding |
| `shadow` | `"none" \| "sm" \| "default" \| "lg"` | `"default"` | The shadow level of the card |
| `interactive` | `boolean` | `false` | If true, adds hover and focus styles for interactive cards |

### CardHeader

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "filled" \| "outline" \| "subtle" \| "branded"` | `"default"` | The visual style of the card header (should match parent card) |

### CardContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `padded` | `boolean` | `false` | If true, adds padding to the top of the content |

### CardFooter

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "filled" \| "outline" \| "subtle" \| "branded"` | `"default"` | The visual style of the card footer (should match parent card) |
| `align` | `"start" \| "center" \| "end" \| "between"` | `"between"` | The alignment of the footer content |

### CardTitle

Heading component for card titles with appropriate styling.

### CardDescription

Paragraph component for card descriptions with appropriate styling.

## Variants

### Default

Standard card with border and white background.

### Filled

Borderless card with a subtle background color.

### Outline

Transparent card with border.

### Subtle

Light background card with subtle hover effect.

### Branded

Card with brand color background and border.

## Examples

```tsx
// Different variants
<Card variant="default">Default Card</Card>
<Card variant="filled">Filled Card</Card>
<Card variant="outline">Outline Card</Card>
<Card variant="subtle">Subtle Card</Card>
<Card variant="branded">Branded Card</Card>

// Different sizes
<Card size="sm">Small Card</Card>
<Card size="default">Default Card</Card>
<Card size="lg">Large Card</Card>

// Different shadows
<Card shadow="none">No Shadow</Card>
<Card shadow="sm">Small Shadow</Card>
<Card shadow="default">Default Shadow</Card>
<Card shadow="lg">Large Shadow</Card>

// Interactive card
<Card interactive>
  This card is interactive and can be clicked
</Card>

// Complete example with all subcomponents
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description providing additional context</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content area of the card. Can contain any elements.</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">Cancel</Button>
    <Button>Submit</Button>
  </CardFooter>
</Card>
``` 