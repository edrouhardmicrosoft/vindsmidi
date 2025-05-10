# Vindsmidi UI Project Structure - Final

This document outlines the recommended project structure for the Fluent UI + Tailwind CSS 4.0 integration library and its CLI tool, following the "Component Shell Pattern" architecture.

## Root Structure

```
/
├── docs/                      # Project-level documentation
├── src/                       # Component library source code
│   ├── components/            # Self-contained components
│   ├── hooks/                 # Shared accessibility hooks 
│   ├── tokens/                # Design token system
│   ├── utilities/             # Shared utility functions
│   ├── testing/               # Shared test utilities
│   └── index.ts               # Main library entry point
├── cli/                       # CLI tool source code
│   ├── bin/                   # CLI entry points
│   ├── src/                   # CLI implementation
│   ├── package.json           # CLI package definition
│   └── README.md              # CLI documentation
├── styles/                    # Global styles
├── .storybook/                # Storybook configuration
├── scripts/                   # Build and utility scripts
├── examples/                  # Usage examples
├── public/                    # Static assets
├── package.json               # Package manifest
├── vite.config.ts             # Vite configuration for Tailwind 4.0
├── vitest.config.ts           # Vitest configuration
└── README.md                  # Main documentation
```

## Component Library Structure

### Component Structure (Self-Contained)

Each component is fully self-contained with all related files:

```
src/components/ui/button/
├── button.tsx             # Component implementation
├── button.test.tsx        # Component unit/integration tests
├── button.a11y.test.tsx   # Accessibility-specific tests
├── button.utils.ts        # Component-specific utilities
├── button.css             # Component-specific styles (if needed)
├── button.types.ts        # Component type definitions
├── Button.stories.tsx     # Storybook stories
├── useButtonHooks.ts      # Button-specific hooks wrapping Fluent UI
├── variants.ts            # Tailwind variants using cva
├── index.ts               # Clean exports for library consumers
└── README.md              # Component documentation
```

### Hooks Structure

Shared accessibility hooks extracted from Fluent UI:

```
src/hooks/
├── useFluentAccessibility.ts  # Common accessibility utilities
├── useFluentFocus.ts          # Focus management hooks
├── useFluentKeyboard.ts       # Keyboard interaction hooks
├── useFluentAria.ts           # ARIA attribute utilities
└── index.ts                   # Hook exports
```

### Tokens Structure

Design token system for mapping Fluent UI tokens:

```
src/tokens/
├── colors.ts              # Color token TypeScript interface 
├── spacing.ts             # Spacing token TypeScript interface
├── typography.ts          # Typography token TypeScript interface
├── animation.ts           # Animation token TypeScript interface
└── index.ts               # Token exports
```

### Utilities Structure

Shared utilities used across components:

```
src/utilities/
├── classNames.ts          # Class name utility (cn)
├── refs.ts                # React ref utilities
├── dom.ts                 # DOM utilities
├── string.ts              # String manipulation utilities
└── index.ts               # Utility exports
```

### Testing Utilities

Shared test utilities for consistency:

```
src/testing/
├── setup/
│   ├── vitest.setup.ts    # Vitest setup
│   └── axe-setup.ts       # Accessibility testing setup
├── utils/
│   ├── render.tsx         # Test render utility with providers
│   ├── accessibility.ts   # Accessibility test helpers
│   └── user-events.ts     # User interaction helpers
├── fixtures/
│   ├── theme.ts           # Theme test fixtures
│   └── data.ts            # Test data
└── index.ts               # Testing utility exports
```

### Style Structure (Tailwind CSS 4.0)

Global styles using Tailwind CSS 4.0 features:

```
styles/
├── tokens/
│   ├── colors.css         # Color CSS variables using @theme
│   ├── spacing.css        # Spacing CSS variables using @theme
│   ├── typography.css     # Typography CSS variables using @theme
│   └── index.css          # Token imports
├── utilities/
│   ├── custom-utilities.css  # Custom utilities using @utility
│   └── index.css          # Utility imports
├── reset.css              # CSS reset/normalization
├── fluent-ui-tokens.css   # Mapped Fluent UI tokens
└── main.css               # Main CSS with @import "tailwindcss"
```

## CLI Tool Structure

The CLI tool follows a modular structure to support various commands and templates:

```
cli/
├── bin/                      # CLI entry points
│   └── index.js              # Main executable
├── src/
│   ├── commands/             # Command implementations
│   │   ├── init.ts           # Project initialization
│   │   ├── add.ts            # Component installation
│   │   ├── config.ts         # Configuration management
│   │   └── dev.ts            # Development tools
│   ├── templates/            # Project & component templates
│   │   ├── init/             # Project initialization templates
│   │   │   ├── react/        # React project templates
│   │   │   ├── next/         # Next.js project templates
│   │   │   ├── vite/         # Vite project templates
│   │   │   └── remix/        # Remix project templates
│   │   └── components/       # Component templates
│   │       ├── button/       # Button component templates
│   │       ├── card/         # Card component templates
│   │       └── ...           # Other component templates
│   ├── utils/                # Shared utilities
│   │   ├── logger.ts         # Console output utilities
│   │   ├── fs.ts             # File system operations
│   │   ├── prompt.ts         # Interactive prompts
│   │   ├── template.ts       # Template rendering
│   │   ├── project-detector.ts # Project analysis
│   │   └── dependency-manager.ts # Dependency resolution
│   ├── registry/             # Component registry & metadata
│   │   ├── components.ts     # Component definitions
│   │   ├── dependencies.ts   # Dependency definitions
│   │   └── schema.ts         # Registry type definitions
│   └── config/               # Configuration schemas
│       ├── tailwind.ts       # Tailwind configuration
│       ├── typescript.ts     # TypeScript configuration
│       └── eslint.ts         # ESLint configuration
├── package.json              # CLI package definition
└── README.md                 # CLI documentation
```

## Component Registry Definition

The component registry is a critical part of the CLI implementation:

```typescript
// cli/src/registry/schema.ts
export interface ComponentDependency {
  name: string;
  type: 'component' | 'utility' | 'hook';
  optional?: boolean;
}

export interface ComponentFile {
  name: string;
  path: string;
  template: string;
  overwritable?: boolean;
}

export interface Component {
  name: string;
  description: string;
  category: 'layout' | 'input' | 'data-display' | 'feedback' | 'navigation' | 'overlay';
  dependencies: ComponentDependency[];
  files: ComponentFile[];
  styles?: string[];
  hooks?: string[];
}
```

## CLI Command Structure

Each command follows a consistent implementation pattern:

```typescript
// cli/src/commands/add.ts
import { Command } from 'commander';
import { logger } from '../utils/logger';
import { components } from '../registry/components';

export function registerAddCommand(program: Command) {
  program
    .command('add')
    .description('Add components to your project')
    .argument('<components...>', 'Component names to add')
    .option('-d, --dir <directory>', 'Target directory')
    .option('-f, --force', 'Overwrite existing files')
    .action(async (componentNames, options) => {
      // Implementation
    });
}
```

## Best Practices

### Component Library

1. **Component Development**
   - Each component is self-contained with its implementation, tests, stories, and docs
   - Use the index.ts file to control what is exported to library consumers
   - Extract Fluent UI accessibility features into dedicated hooks
   - Co-locate related files for improved developer experience

2. **File Organization**
   - Keep file names consistent and descriptive
   - Use consistent naming patterns across all components
   - Group related files by component rather than by file type
   - Ensure clean exports that don't include test or story files

3. **Styling with Tailwind CSS 4.0**
   - Use the single-line import: `@import "tailwindcss";`
   - Leverage the `@theme` directive for customization
   - Use the `@utility` directive for custom utilities
   - Take advantage of automatic content detection

4. **Testing Strategy**
   - Co-locate tests with the components they test
   - Use shared test utilities for consistency
   - Implement both unit and accessibility tests
   - Leverage Storybook for visual testing

5. **Documentation**
   - Include README.md files with each component
   - Use Storybook stories as living documentation
   - Document props, variants, and accessibility considerations
   - Provide usage examples

### CLI Tool

1. **Command Implementation**
   - Follow the command pattern with clear separation of concerns
   - Use consistent parameter naming and option formats
   - Provide helpful error messages and progress indicators
   - Implement graceful error handling and rollback capabilities

2. **Template Management**
   - Use parameterized templates with clear placeholders
   - Structure templates to match the component library's file organization
   - Ensure templates are framework-agnostic where possible
   - Maintain consistent coding style across templates

3. **Project Analysis**
   - Implement robust detection of project type and structure
   - Handle edge cases like monorepos and custom configurations
   - Provide fallback options when automatic detection fails
   - Validate compatibility before modification

4. **Developer Experience**
   - Use color-coded console output for clarity
   - Show progress indicators for long-running operations
   - Provide clear success/failure messages
   - Include usage examples after component installation

5. **Configuration Management**
   - Respect existing configuration when present
   - Make minimal changes to user files
   - Document modifications clearly
   - Provide options to customize the generated output

This structure provides an excellent developer experience with a clean separation between the component library and the CLI tool, while ensuring they work together seamlessly.