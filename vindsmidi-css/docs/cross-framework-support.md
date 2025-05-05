# Cross-Framework Support

This document outlines how our Fluent UI-based component library supports multiple frameworks.

## Architecture

Our multi-framework architecture follows these principles:

1. **Core Style Separation**: All styling is defined using framework-agnostic Tailwind CSS classes
2. **Framework-Specific Wrappers**: Each framework gets its own implementation wrappers
3. **Shared Token System**: Fluent UI tokens are used consistently across all implementations
4. **Component Contract**: Each component maintains the same props interface across frameworks

## Implementation Strategy

### Style Layer (Framework-Agnostic)

- **Token CSS Variables**: Defined in `fluent-ui-tokens.css`
- **Component Variants**: Defined using `class-variance-authority` in `variants.ts` files
- **Tailwind Configuration**: Defined in `tailwind.config.js`

### Component Layer (Framework-Specific)

#### React
- Wraps Fluent UI React components
- Uses React-specific patterns (forwardRef, context, hooks)

#### Vue (Future)
- Will use Vue component structure
- Will import same variant definitions
- Will apply classes through Vue's class binding system

#### Svelte (Future)
- Will use Svelte component structure
- Will import same variant definitions
- Will apply classes through Svelte's class directives

#### Web Components (Future)
- Will use custom elements structure
- Will import same variant definitions
- Will apply classes through classList methods

#### Solid (Future)
- Will use Solid component patterns
- Will import same variant definitions
- Will apply classes through Solid's class binding system

## CLI Configuration

The CLI will support creating components for any supported framework:

```bash
# Examples of future CLI usage
vindsmidi-ui add button --framework=react
vindsmidi-ui add button --framework=vue
vindsmidi-ui add button --framework=web-components
```

## Sharing Styles Across Frameworks

All frameworks use the same:
1. Tailwind CSS class names
2. Variant definitions
3. Token variables

Only the component implementation methods differ.

## Component Requirements for New Frameworks

To add support for a new framework, each component needs:
1. A framework-specific implementation file
2. Integration with Fluent UI components for that framework
3. Method to apply the Tailwind CSS classes from variants
4. Registration in the registry.json file

## Example: Button Component Across Frameworks

### Core Shared Styles (variants.ts)
```ts
// All frameworks use the same variants definition
export const buttonVariants = cva(
  "rounded-[var(--borderRadiusMedium)] inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-[var(--colorBrandBackground)] text-white",
        // ... other variants
      },
      // ... other variant groups
    }
  }
);
```

### Framework-Specific Implementations
Each framework would have a different implementation file that:
1. Imports the Fluent UI component for that framework
2. Applies the CSS classes from buttonVariants
3. Handles framework-specific rendering patterns

## Development Workflow

When developing a new component:
1. Start with the React implementation as reference
2. Create the variants.ts file with framework-agnostic styles
3. Implement for additional frameworks as needed
4. Test in each supported framework
5. Update registry.json with framework support information