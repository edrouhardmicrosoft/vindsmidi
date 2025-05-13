# Vindsmidi UI CLI

A modern CLI tool for working with the Vindsmidi UI component library, which integrates Fluent UI's accessibility features with Tailwind CSS 4.0's styling capabilities.

## Installation

```bash
npm install -g @vindsmidi/cli
# or
yarn global add @vindsmidi/cli
# or
pnpm add -g @vindsmidi/cli
```

## Usage

### Initialize a New Project

```bash
# Create a new project with interactive prompts
vui init my-project

# Create a new project with defaults
vui init my-project --yes
```

### Add Components

```bash
# Add components to your project
vui add button card

# List available components
vui add
```

### Configure Existing Project

```bash
# Configure with interactive prompts
vui config

# Configure specific options
vui config --tailwind --tokens --dark-mode class
```

### Start Development Server

```bash
# Start development server
vui dev
```

## Available Components

- Button - Interactive button component with various styles
- Card - Surface container for grouping related content
- (More components coming soon)

## Documentation

For more detailed documentation, visit the [Vindsmidi UI documentation site](https://vindsmidi-ui.dev).

## License

MIT 