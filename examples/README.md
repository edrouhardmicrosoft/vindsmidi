# Vindsmidi UI Component Examples

This directory contains examples and demos of the Vindsmidi UI component library.

## Component Showcase

The component showcase demonstrates all the Phase 1 (Foundation) components that have been implemented:

1. Text (Typography)
2. Card
3. Checkbox
4. Radio
5. Switch
6. Input
7. Select
8. Button

## Quick Preview

For a quick visual preview without setting up a full React environment:

1. Open `index.html` in your browser to see a simplified HTML/CSS representation of the components.

This preview uses simulated CSS with variables that match Fluent UI's token system, but it's only intended as a visual reference and doesn't include any interactive functionality.

## Full React Implementation

For a full functional preview, you will need to:

1. Set up a React environment with Fluent UI and Tailwind CSS
2. Use `component-showcase.tsx` as a starting point for your demo page
3. Make sure all dependencies are installed:
   - React
   - @fluentui/react-components
   - @fluentui/react-icons
   - tailwindcss

## Next Steps

The implementation roadmap includes:

1. Phase 2: Navigation & Layout components
2. Phase 3: Data Display components 
3. Phase 4: Feedback components
4. Phase 5: Advanced inputs & Utilities

Each component follows a consistent structure with:
- variants.ts - Styling definitions using class-variance-authority
- [component].tsx - Component implementation using Fluent UI components
- index.ts - Export file
- README.md - Comprehensive documentation 