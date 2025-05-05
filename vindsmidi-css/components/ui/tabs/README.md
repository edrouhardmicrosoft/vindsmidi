# Tabs

A tabbed navigation component built on Fluent UI TabList and Tab, styled with Tailwind CSS and Fluent UI tokens.

## Usage

```tsx
import { Tabs, Tab } from "vindsmidi-ui/components/ui/tabs"

export default function Example() {
  const [tab, setTab] = React.useState("tab1")
  return (
    <Tabs value={tab} onValueChange={setTab}>
      <Tab value="tab1">Tab One</Tab>
      <Tab value="tab2">Tab Two</Tab>
      <Tab value="tab3">Tab Three</Tab>
    </Tabs>
  )
}
```

## Features

- Built on Fluent UI TabList and Tab for accessibility
- Styled with Tailwind CSS using Fluent UI tokens
- Supports horizontal and vertical orientation
- Multiple appearances: default, subtle, transparent
- Small and medium size options
- Controlled and uncontrolled usage
- Keyboard navigation and ARIA support
- WCAG 2.1 compliant

## Accessibility

- Uses proper roles and ARIA attributes for tabs and tablists
- Keyboard navigation: arrow keys to move between tabs, Home/End to jump
- Focus ring and color contrast for selected/active states
- Supports disabled tabs

## API Reference

### Tabs Props
| Prop         | Type                                 | Default      | Description                                 |
|--------------|--------------------------------------|--------------|---------------------------------------------|
| `value`      | `string`                             |              | The selected tab value (controlled)         |
| `defaultValue` | `string`                           |              | The default selected tab value (uncontrolled)|
| `onValueChange` | `(value: string) => void`          |              | Callback when the selected tab changes      |
| `appearance` | `'default' \| 'subtle' \| 'transparent'` | `'default'` | Visual appearance of the tab list           |
| `orientation`| `'horizontal' \| 'vertical'`         | `'horizontal'`| Orientation of the tabs                    |
| `size`       | `'sm' \| 'md'`                       | `'md'`       | Size of the tabs                            |
| `children`   | `React.ReactNode`                    |              | The Tab components                          |
| `id`         | `string`                             |              | Optional id for the tablist                 |
| `className`  | `string`                             |              | Additional className for the tablist        |

### Tab Props
| Prop         | Type                                 | Default      | Description                                 |
|--------------|--------------------------------------|--------------|---------------------------------------------|
| `value`      | `string`                             | **Required** | The value of the tab                        |
| `disabled`   | `boolean`                            | `false`      | If true, disables the tab                   |
| `icon`       | `React.ReactNode`                    |              | Optional icon for the tab                   |
| `className`  | `string`                             |              | Additional className for the tab            |
| `size`       | `'sm' \| 'md'`                       | `'md'`       | Tab size (inherited from Tabs if not set)   |
| `children`   | `React.ReactNode`                    |              | Tab label                                   |

## Examples

```tsx
// Horizontal tabs
<Tabs defaultValue="tab1">
  <Tab value="tab1">Tab One</Tab>
  <Tab value="tab2">Tab Two</Tab>
  <Tab value="tab3">Tab Three</Tab>
</Tabs>

// Vertical tabs
<Tabs defaultValue="tab1" orientation="vertical">
  <Tab value="tab1">Tab One</Tab>
  <Tab value="tab2">Tab Two</Tab>
  <Tab value="tab3">Tab Three</Tab>
</Tabs>

// Subtle appearance
<Tabs defaultValue="tab1" appearance="subtle">
  <Tab value="tab1">Tab One</Tab>
  <Tab value="tab2">Tab Two</Tab>
</Tabs>

// With icons
import { CalendarMonthRegular } from '@fluentui/react-icons'
<Tabs defaultValue="tab1">
  <Tab value="tab1" icon={<CalendarMonthRegular />}>Tab One</Tab>
  <Tab value="tab2">Tab Two</Tab>
</Tabs>

// Disabled tab
<Tabs defaultValue="tab1">
  <Tab value="tab1">Tab One</Tab>
  <Tab value="tab2" disabled>Tab Two</Tab>
</Tabs>
``` 