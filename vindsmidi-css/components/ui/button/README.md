# Button

A button component that wraps the Fluent UI Button with vindsmidi-css Tailwind styling and design tokens.

## Usage

```tsx
import { Button } from 'vindsmidi-css/components/ui';

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

## Variants

- `primary` (default): Brand background, white text
- `secondary`: Neutral background, brand text
- `outline`: Transparent background, brand border
- `ghost`: Transparent, minimal
- `link`: Looks like a hyperlink

## Sizes

- `sm`, `default`, `lg`, `icon`

## Disabled State

```tsx
<Button disabled>Disabled</Button>
```

## Customizing with Variants

```tsx
import { buttonVariants } from 'vindsmidi-css/components/ui';

const customClass = buttonVariants({ variant: 'primary', size: 'lg' });
```

## Accessibility

- Built on Fluent UI Button for accessibility
- Keyboard and screen reader support
- WCAG 2.1 compliant

## Framework Support

### React

```tsx
import { Button } from "vindsmidi-ui/components/ui/button"

<Button>Click me</Button>
```

### Vue (example implementation)

```vue
<template>
  <FluentButton :class="buttonClasses">
    <slot></slot>
  </FluentButton>
</template>

<script setup>
import { computed } from 'vue';
import { FluentButton } from '@fluentui/web-components';
import { buttonVariants } from 'vindsmidi-ui/styles';

const props = defineProps({
  variant: { type: String, default: 'default' },
  size: { type: String, default: 'default' },
  disabled: { type: Boolean, default: false }
});

const buttonClasses = computed(() =>
  buttonVariants({ variant: props.variant, size: props.size, disabled: props.disabled })
);
</script>
```

### Web Components (example implementation)

```js
import { FluentButton } from '@fluentui/web-components';
import { buttonVariants } from 'vindsmidi-ui/styles';

class VindsmidiButton extends FluentButton {
  static get observedAttributes() {
    return ['variant', 'size', 'disabled'];
  }
  
  connectedCallback() {
    super.connectedCallback();
    this._updateClasses();
  }
  
  attributeChangedCallback() {
    this._updateClasses();
  }
  
  _updateClasses() {
    const variant = this.getAttribute('variant') || 'default';
    const size = this.getAttribute('size') || 'default';
    const disabled = this.hasAttribute('disabled');
    
    const classes = buttonVariants({ variant, size, disabled });
    
    // Apply the classes
    classes.split(' ').forEach(cls => {
      if (cls) this.classList.add(cls);
    });
  }
}

customElements.define('vindsmidi-button', VindsmidiButton);
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "secondary" \| "outline" \| "ghost" \| "link"` | `"default"` | The visual style of the button |
| `size` | `"sm" \| "default" \| "lg" \| "icon"` | `"default"` | The size of the button |
| `disabled` | `boolean` | `false` | Whether the button is disabled |

## Examples

```tsx
// Different variants
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>

// Disabled state
<Button disabled>Disabled</Button>
```