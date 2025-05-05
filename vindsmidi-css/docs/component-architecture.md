# Vindsmidi UI Component Architecture

This document outlines the architecture and design principles for Vindsmidi UI components.

## Core Principles

1. **Accessibility First**: All components must be WCAG 2.1 compliant
2. **Fluent UI Design System**: Follow Microsoft Fluent UI design principles
3. **Modularity**: Components should be composable and self-contained
4. **Customizability**: Support theming and styling variations
5. **Type Safety**: Use TypeScript for better developer experience

## Component Structure

Each component follows this standard structure:

```
components/ui/[component-name]/
├── index.ts           # Exports the component and types
├── [component].tsx    # Component implementation
├── variants.ts        # Component variants and styles
└── README.md          # Component documentation
```

## Implementation Guidelines

### 1. Component File

- Use functional components with TypeScript
- Use React.forwardRef for ref forwarding
- Document props with JSDoc comments
- Include displayName for debugging
- Implement accessibility features (ARIA attributes, keyboard interaction)

### 2. Variants File

- Use Class Variance Authority (CVA) for managing variants
- Define all style variations (variant, size, state)
- Use Tailwind CSS with Fluent UI token variables
- Include appropriate states (hover, focus, active, disabled)

### 3. Index File

- Export the component and its types
- Export variants if they might be useful externally

### 4. README File

- Include description and usage examples
- Document all props and variants
- Provide accessibility information
- Show examples with different configurations

## Styling Guidelines

### Using Fluent UI Tokens

Use CSS variables from our Fluent UI tokens for consistency:

```tsx
// ✅ Good - Using Fluent UI tokens via CSS variables
<div className="bg-[var(--colorBrandBackground)] text-[var(--colorNeutralForeground1)]">

// ❌ Bad - Using hardcoded values
<div className="bg-blue-500 text-gray-900">
```

### Class Naming Conventions

- Use the `cn()` utility to merge classes
- Prefix component-specific classes with the component name
- Use Tailwind's modifier syntax for states

### State Handling

Include all required states:
- Default
- Hover
- Focus
- Active/Pressed
- Disabled
- Selected (if applicable)
- Error (if applicable)

## Accessibility Requirements

- Ensure keyboard accessibility
- Support screen readers
- Maintain appropriate contrast ratios
- Implement proper focus management
- Follow ARIA best practices

## Component Registry

All components must be registered in the `registry.json` file:

```json
{
  "components": [
    {
      "name": "button",
      "description": "Button component with various styles and states",
      "files": ["button.tsx", "variants.ts"],
      "dependencies": []
    }
  ]
}
```

## Testing Guidelines

- Test for accessibility (keyboard, screen reader)
- Test all variants and states
- Test responsiveness
- Test color contrast 