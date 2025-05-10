# Task: Implement CLI Tool for Vindsmidi UI Component Library

This task implements a modern CLI tool for the Vindsmidi UI component library, enabling developers to easily initialize projects and install components using the Component Shell Pattern.

## Commit 1: feat: Set up CLI project structure and core dependencies

**Description:**
Create the initial CLI project structure following the architecture defined in `docs/STRUCTURE.md`. Set up the foundation for the command-line interface with essential dependencies.

1. Create the CLI directory structure:
   ```bash
   mkdir -p cli/bin cli/src/commands cli/src/templates cli/src/utils cli/src/registry cli/src/config
   ```

2. Initialize package.json for the CLI:
   ```bash
   cd cli && npm init -y
   ```

3. Configure the package.json for CLI distribution:
   ```json
   {
     "name": "@vindsmidi/cli",
     "version": "0.1.0",
     "description": "CLI tool for Vindsmidi UI (Fluent UI + Tailwind CSS 4.0)",
     "main": "dist/index.js",
     "bin": {
       "vindsmidi": "./bin/index.js"
     },
     "scripts": {
       "build": "tsup",
       "dev": "tsup --watch",
       "lint": "eslint src/**/*.ts",
       "test": "vitest"
     },
     "files": [
       "bin",
       "dist",
       "README.md"
     ],
     "keywords": ["cli", "ui", "components", "fluent-ui", "tailwind"]
   }
   ```

4. Install core dependencies:
   ```bash
   npm install commander inquirer chalk ora fs-extra chokidar execa glob lodash.template picocolors
   npm install -D typescript tsup @types/node @types/inquirer @types/fs-extra @types/lodash.template vitest
   ```

5. Create TypeScript configuration for the CLI in `cli/tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "target": "ES2020",
       "module": "NodeNext",
       "moduleResolution": "NodeNext",
       "esModuleInterop": true,
       "strict": true,
       "outDir": "dist",
       "declaration": true,
       "skipLibCheck": true
     },
     "include": ["src/**/*"]
   }
   ```

6. Set up tsup configuration in `cli/tsup.config.ts`:
   ```typescript
   import { defineConfig } from 'tsup';

   export default defineConfig({
     entry: ['src/index.ts'],
     format: ['cjs'],
     clean: true,
     dts: true,
     shims: true,
     target: 'node16',
   });
   ```

7. Create the CLI entry point in `cli/bin/index.js`:
   ```javascript
   #!/usr/bin/env node

   require('../dist/index.js');
   ```

8. Create the main CLI implementation file in `cli/src/index.ts`:
   ```typescript
   import { Command } from 'commander';
   import { registerInitCommand } from './commands/init';
   import { registerAddCommand } from './commands/add';
   import { registerConfigCommand } from './commands/config';
   import { registerDevCommand } from './commands/dev';
   import { logger } from './utils/logger';

   const program = new Command();

   // Setup CLI metadata
   program
     .name('vindsmidi')
     .description('CLI tool for Vindsmidi UI (Fluent UI + Tailwind CSS 4.0)')
     .version('0.1.0');

   // Register commands
   registerInitCommand(program);
   registerAddCommand(program);
   registerConfigCommand(program);
   registerDevCommand(program);

   // Handle errors
   program.exitOverride((err) => {
     if (err.code === 'commander.help') {
       process.exit(0);
     }
     logger.error(err.message);
     process.exit(1);
   });

   // Parse arguments
   program.parse(process.argv);
   ```

**Verification:**
1. Verify directory structure is created correctly:
   ```bash
   ls -la cli/
   ```
2. Verify package.json is configured properly:
   ```bash
   cat cli/package.json
   ```
3. Test the build process:
   ```bash
   cd cli && npm run build
   ```
4. Verify the CLI can be executed and shows help:
   ```bash
   node cli/bin/index.js --help
   ```

---

## Commit 2: feat: Implement logger and file system utilities

**Description:**
Create essential utility modules for the CLI, including the logger for consistent terminal output and file system utilities for template operations.

1. Create the logger utility in `cli/src/utils/logger.ts`:
   ```typescript
   import chalk from 'chalk';
   import picocolors from 'picocolors';

   export const logger = {
     info: (message: string): void => {
       console.log(`${picocolors.blue('info')} ${message}`);
     },
     success: (message: string): void => {
       console.log(`${picocolors.green('success')} ${message}`);
     },
     warn: (message: string): void => {
       console.log(`${picocolors.yellow('warn')} ${message}`);
     },
     error: (message: string): void => {
       console.log(`${picocolors.red('error')} ${message}`);
     },
     debug: (message: string): void => {
       if (process.env.DEBUG) {
         console.log(`${picocolors.magenta('debug')} ${message}`);
       }
     },
     log: (message: string): void => {
       console.log(message);
     },
     title: (message: string): void => {
       console.log(chalk.bold(`\n${message}`));
     },
     divider: (): void => {
       console.log(chalk.dim('─'.repeat(40)));
     },
     newLine: (): void => {
       console.log();
     }
   };
   ```

2. Create file system utilities in `cli/src/utils/fs.ts`:
   ```typescript
   import fs from 'fs-extra';
   import path from 'path';
   import { logger } from './logger';

   /**
    * Ensures a directory exists, creating it if necessary
    */
   export async function ensureDirectory(dirPath: string): Promise<void> {
     try {
       await fs.ensureDir(dirPath);
     } catch (error) {
       logger.error(`Failed to create directory: ${dirPath}`);
       throw error;
     }
   }

   /**
    * Copy a file with template processing
    */
   export async function copyFile(
     source: string, 
     destination: string, 
     variables: Record<string, any> = {}
   ): Promise<void> {
     try {
       await fs.ensureDir(path.dirname(destination));
       
       const content = await fs.readFile(source, 'utf8');
       // Future enhancement: process template variables
       await fs.writeFile(destination, content);
       
       logger.debug(`Copied: ${source} -> ${destination}`);
     } catch (error) {
       logger.error(`Failed to copy file: ${source} -> ${destination}`);
       throw error;
     }
   }

   /**
    * Safely writes content to a file, ensuring the directory exists
    */
   export async function writeFile(
     filePath: string, 
     content: string
   ): Promise<void> {
     try {
       await fs.ensureDir(path.dirname(filePath));
       await fs.writeFile(filePath, content);
       logger.debug(`Wrote file: ${filePath}`);
     } catch (error) {
       logger.error(`Failed to write file: ${filePath}`);
       throw error;
     }
   }

   /**
    * Checks if a file exists
    */
   export async function fileExists(filePath: string): Promise<boolean> {
     try {
       return await fs.pathExists(filePath);
     } catch (error) {
       return false;
     }
   }
   ```

3. Create template rendering utility in `cli/src/utils/template.ts`:
   ```typescript
   import lodashTemplate from 'lodash.template';
   import fs from 'fs-extra';
   import path from 'path';
   import { logger } from './logger';
   import { writeFile, fileExists } from './fs';

   /**
    * Renders a template file with provided data
    */
   export async function renderTemplate(
     templatePath: string,
     outputPath: string,
     data: Record<string, any> = {},
     options: { overwrite?: boolean } = {}
   ): Promise<void> {
     try {
       // Check if file exists and shouldn't be overwritten
       if (!options.overwrite && await fileExists(outputPath)) {
         logger.warn(`File already exists (skipping): ${outputPath}`);
         return;
       }

       // Read template content
       const templateContent = await fs.readFile(templatePath, 'utf8');
       
       // Compile and render template
       const compile = lodashTemplate(templateContent);
       const rendered = compile(data);
       
       // Write output file
       await writeFile(outputPath, rendered);
       
       logger.debug(`Rendered template: ${templatePath} -> ${outputPath}`);
     } catch (error) {
       logger.error(`Failed to render template: ${templatePath} -> ${outputPath}`);
       throw error;
     }
   }

   /**
    * Renders multiple templates with the same data
    */
   export async function renderTemplates(
     templates: Array<{ source: string; target: string }>,
     data: Record<string, any> = {},
     options: { overwrite?: boolean } = {}
   ): Promise<void> {
     for (const template of templates) {
       await renderTemplate(template.source, template.target, data, options);
     }
   }
   ```

4. Create project detection utility in `cli/src/utils/project-detector.ts`:
   ```typescript
   import fs from 'fs-extra';
   import path from 'path';
   import { logger } from './logger';

   export interface ProjectInfo {
     framework: 'react' | 'next' | 'vite' | 'remix' | 'unknown';
     packageManager: 'npm' | 'yarn' | 'pnpm' | 'unknown';
     hasTypeScript: boolean;
     hasTailwind: boolean;
     sourceDir: string;
     componentsDir: string;
   }

   /**
    * Detects the framework and structure of a project
    */
   export async function detectProject(dir: string): Promise<ProjectInfo> {
     try {
       const packageJsonPath = path.join(dir, 'package.json');
       const hasPackageJson = await fs.pathExists(packageJsonPath);
       
       if (!hasPackageJson) {
         throw new Error('No package.json found in the specified directory');
       }
       
       const packageJson = await fs.readJson(packageJsonPath);
       
       // Detect framework
       let framework: ProjectInfo['framework'] = 'unknown';
       if (packageJson.dependencies?.next) {
         framework = 'next';
       } else if (packageJson.dependencies?.remix) {
         framework = 'remix';
       } else if (packageJson.dependencies?.['@vitejs/plugin-react'] || packageJson.devDependencies?.['@vitejs/plugin-react']) {
         framework = 'vite';
       } else if (packageJson.dependencies?.react) {
         framework = 'react';
       }
       
       // Detect package manager
       let packageManager: ProjectInfo['packageManager'] = 'npm';
       if (await fs.pathExists(path.join(dir, 'yarn.lock'))) {
         packageManager = 'yarn';
       } else if (await fs.pathExists(path.join(dir, 'pnpm-lock.yaml'))) {
         packageManager = 'pnpm';
       }
       
       // Detect TypeScript
       const hasTypeScript = !!(
         packageJson.dependencies?.typescript || 
         packageJson.devDependencies?.typescript ||
         await fs.pathExists(path.join(dir, 'tsconfig.json'))
       );
       
       // Detect Tailwind
       const hasTailwind = !!(
         packageJson.dependencies?.tailwindcss || 
         packageJson.devDependencies?.tailwindcss
       );
       
       // Determine source directory based on framework
       let sourceDir = 'src';
       let componentsDir = 'src/components';
       
       if (framework === 'next') {
         // Check for src directory in Next.js
         const hasSrcDir = await fs.pathExists(path.join(dir, 'src'));
         sourceDir = hasSrcDir ? 'src' : '.';
         componentsDir = path.join(sourceDir, 'components');
       } else if (framework === 'remix') {
         sourceDir = 'app';
         componentsDir = 'app/components';
       }
       
       return {
         framework,
         packageManager,
         hasTypeScript,
         hasTailwind,
         sourceDir,
         componentsDir
       };
     } catch (error) {
       logger.error(`Failed to detect project: ${error instanceof Error ? error.message : String(error)}`);
       throw error;
     }
   }
   ```

**Verification:**
1. Verify utility files exist and have proper content:
   ```bash
   cat cli/src/utils/logger.ts cli/src/utils/fs.ts cli/src/utils/template.ts cli/src/utils/project-detector.ts
   ```
2. Add a simple test command to verify the logger:
   ```typescript
   // Temporary addition to cli/src/index.ts
   program
     .command('test-logger')
     .description('Test the logger utility')
     .action(() => {
       logger.title('Logger Test');
       logger.info('This is an info message');
       logger.success('This is a success message');
       logger.warn('This is a warning message');
       logger.error('This is an error message');
       logger.divider();
       logger.log('This is a regular log message');
     });
   ```
3. Build and test the logger:
   ```bash
   cd cli && npm run build
   node bin/index.js test-logger
   ```
4. Remove the test command after verification.

---

## Commit 3: feat: Implement component registry and CLI add command

**Description:**
Create the component registry system and implement the 'add' command to install components from the registry into a project.

1. Create the component registry schema in `cli/src/registry/schema.ts`:
   ```typescript
   /**
    * Represents a dependency on another component, utility, or hook
    */
   export interface ComponentDependency {
     name: string;
     type: 'component' | 'utility' | 'hook';
     optional?: boolean;
   }

   /**
    * Represents a file that is part of a component
    */
   export interface ComponentFile {
     name: string;
     path: string;
     template: string;
     overwritable?: boolean;
   }

   /**
    * Represents a component in the registry
    */
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

2. Create a sample component registry in `cli/src/registry/components.ts`:
   ```typescript
   import { Component } from './schema';

   /**
    * Registry of available components
    */
   export const components: Component[] = [
     {
       name: 'button',
       description: 'Interactive button component with various styles',
       category: 'input',
       dependencies: [
         { name: 'cn', type: 'utility' },
         { name: 'useFluentButton', type: 'hook' }
       ],
       files: [
         {
           name: 'button.tsx',
           path: 'components/ui/button/button.tsx',
           template: 'components/button/button.tsx.template'
         },
         {
           name: 'button.types.ts',
           path: 'components/ui/button/button.types.ts',
           template: 'components/button/button.types.ts.template'
         },
         {
           name: 'variants.ts',
           path: 'components/ui/button/variants.ts',
           template: 'components/button/variants.ts.template'
         },
         {
           name: 'index.ts',
           path: 'components/ui/button/index.ts',
           template: 'components/button/index.ts.template'
         }
       ],
       hooks: ['useFluentButton']
     },
     {
       name: 'card',
       description: 'Surface container for grouping related content',
       category: 'layout',
       dependencies: [
         { name: 'cn', type: 'utility' }
       ],
       files: [
         {
           name: 'card.tsx',
           path: 'components/ui/card/card.tsx',
           template: 'components/card/card.tsx.template'
         },
         {
           name: 'card.types.ts',
           path: 'components/ui/card/card.types.ts',
           template: 'components/card/card.types.ts.template'
         },
         {
           name: 'index.ts',
           path: 'components/ui/card/index.ts',
           template: 'components/card/index.ts.template'
         }
       ]
     }
   ];

   /**
    * Get a component by name
    */
   export function getComponent(name: string): Component | undefined {
     return components.find(c => c.name === name);
   }

   /**
    * Get multiple components by name
    */
   export function getComponents(names: string[]): Component[] {
     return names.map(name => {
       const component = getComponent(name);
       if (!component) {
         throw new Error(`Component not found: ${name}`);
       }
       return component;
     });
   }

   /**
    * Get all available component names
    */
   export function getComponentNames(): string[] {
     return components.map(c => c.name);
   }
   ```

3. Create the dependency resolver in `cli/src/utils/dependency-resolver.ts`:
   ```typescript
   import { Component, ComponentDependency } from '../registry/schema';
   import { getComponent } from '../registry/components';
   import { logger } from './logger';

   /**
    * Resolves all dependencies for a set of components
    */
   export function resolveDependencies(components: Component[]): Component[] {
     const resolvedComponents = new Map<string, Component>();
     const unresolvedDependencies = new Map<string, ComponentDependency>();
     
     // Add initial components
     components.forEach(component => {
       resolvedComponents.set(component.name, component);
     });
     
     // Collect unresolved dependencies
     components.forEach(component => {
       component.dependencies.forEach(dep => {
         if (dep.type === 'component' && !resolvedComponents.has(dep.name)) {
           unresolvedDependencies.set(dep.name, dep);
         }
       });
     });
     
     // Resolve dependencies recursively
     let hasNewDependencies = true;
     while (hasNewDependencies) {
       hasNewDependencies = false;
       
       for (const [name, dep] of unresolvedDependencies.entries()) {
         if (resolvedComponents.has(name)) {
           unresolvedDependencies.delete(name);
           continue;
         }
         
         const component = getComponent(name);
         if (!component) {
           if (dep.optional) {
             logger.warn(`Optional dependency not found: ${name}`);
             unresolvedDependencies.delete(name);
           } else {
             throw new Error(`Required dependency not found: ${name}`);
           }
           continue;
         }
         
         resolvedComponents.set(name, component);
         unresolvedDependencies.delete(name);
         hasNewDependencies = true;
         
         // Add new component's dependencies
         component.dependencies.forEach(newDep => {
           if (newDep.type === 'component' && !resolvedComponents.has(newDep.name)) {
             unresolvedDependencies.set(newDep.name, newDep);
           }
         });
       }
     }
     
     return Array.from(resolvedComponents.values());
   }
   ```

4. Create a template handler in `cli/src/utils/template-manager.ts`:
   ```typescript
   import path from 'path';
   import fs from 'fs-extra';
   import { logger } from './logger';
   import { renderTemplate } from './template';
   import { Component } from '../registry/schema';

   /**
    * Gets the absolute path to a template
    */
   function getTemplatePath(templateName: string): string {
     // In a real implementation, this would resolve from the CLI's templates directory
     // For now, we'll use a relative path for demonstration
     return path.resolve(__dirname, '..', '..', 'templates', templateName);
   }

   /**
    * Installs a component by copying its template files
    */
   export async function installComponent(
     component: Component, 
     targetDir: string,
     options: { overwrite?: boolean; installDependencies?: boolean } = {}
   ): Promise<void> {
     logger.info(`Installing component: ${component.name}`);
     
     for (const file of component.files) {
       const templatePath = getTemplatePath(file.template);
       const outputPath = path.join(targetDir, file.path);
       
       // Skip if template doesn't exist (for demo purposes)
       if (!await fs.pathExists(templatePath)) {
         logger.warn(`Template not found: ${file.template}`);
         continue;
       }
       
       // Render the template
       await renderTemplate(
         templatePath,
         outputPath,
         {
           componentName: component.name,
           // Additional template variables would go here
         },
         { overwrite: options.overwrite || file.overwritable }
       );
       
       logger.success(`Installed: ${file.name}`);
     }
     
     logger.success(`Component ${component.name} installed successfully`);
   }

   /**
    * Installs multiple components
    */
   export async function installComponents(
     components: Component[],
     targetDir: string,
     options: { overwrite?: boolean; installDependencies?: boolean } = {}
   ): Promise<void> {
     for (const component of components) {
       await installComponent(component, targetDir, options);
     }
   }
   ```

5. Implement the 'add' command in `cli/src/commands/add.ts`:
   ```typescript
   import { Command } from 'commander';
   import path from 'path';
   import ora from 'ora';
   import { logger } from '../utils/logger';
   import { getComponents, getComponentNames } from '../registry/components';
   import { resolveDependencies } from '../utils/dependency-resolver';
   import { installComponents } from '../utils/template-manager';
   import { detectProject } from '../utils/project-detector';

   export function registerAddCommand(program: Command): void {
     program
       .command('add')
       .description('Add components to your project')
       .argument('[components...]', 'Component names to add')
       .option('-d, --dir <directory>', 'Target directory', process.cwd())
       .option('-f, --force', 'Overwrite existing files', false)
       .option('--no-deps', 'Skip installing dependencies', false)
       .action(async (componentNames, options) => {
         try {
           // If no components specified, list available components
           if (!componentNames.length) {
             logger.title('Available Components');
             const names = getComponentNames();
             names.forEach(name => logger.log(`- ${name}`));
             logger.newLine();
             logger.info(`Run 'vindsmidi add <component>' to add a component`);
             return;
           }
           
           // Detect project
           const spinner = ora('Analyzing project...').start();
           const projectInfo = await detectProject(options.dir);
           spinner.succeed('Project analyzed');
           
           logger.info(`Detected framework: ${projectInfo.framework}`);
           logger.info(`Using TypeScript: ${projectInfo.hasTypeScript ? 'Yes' : 'No'}`);
           logger.info(`Tailwind CSS: ${projectInfo.hasTailwind ? 'Yes' : 'No'}`);
           
           // Get components and dependencies
           spinner.text = 'Resolving components...';
           spinner.start();
           
           const components = getComponents(componentNames);
           const allComponents = options.deps ? 
             resolveDependencies(components) : 
             components;
             
           spinner.succeed(`Resolved ${allComponents.length} components`);
           
           // Install components
           spinner.text = 'Installing components...';
           spinner.start();
           
           const targetDir = path.join(options.dir, projectInfo.sourceDir);
           await installComponents(allComponents, targetDir, {
             overwrite: options.force,
             installDependencies: options.deps
           });
           
           spinner.succeed('Components installed successfully');
           
           // Display usage example
           logger.title('Usage Example');
           if (componentNames.includes('button')) {
             logger.log(`
import { Button } from './${path.relative(projectInfo.sourceDir, path.join(projectInfo.componentsDir, 'ui', 'button'))}';

// Basic usage
<Button>Click me</Button>

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
             `);
           }
           
         } catch (error) {
           ora().fail('Installation failed');
           logger.error(error instanceof Error ? error.message : String(error));
           process.exit(1);
         }
       });
   }
   ```

6. Add a placeholder template for testing in `cli/templates/components/button/button.tsx.template`:
   ```typescript
   import * as React from 'react';
   
   /**
    * Button component using the Component Shell Pattern
    */
   export const Button = React.forwardRef<HTMLButtonElement, any>(
     ({ 
       variant = 'primary', 
       size = 'md', 
       className, 
       disabled = false, 
       children, 
       ...props 
     }, ref) => {
       return (
         <button
           ref={ref}
           className={`button button-${variant} button-${size}`}
           disabled={disabled}
           {...props}
         >
           {children}
         </button>
       );
     }
   );
   
   Button.displayName = 'Button';
   ```

**Verification:**
1. Check that registry files are created correctly:
   ```bash
   cat cli/src/registry/schema.ts cli/src/registry/components.ts
   ```
2. Verify implementation of the 'add' command:
   ```bash
   cat cli/src/commands/add.ts
   ```
3. Create the templates directory for testing:
   ```bash
   mkdir -p cli/templates/components/button
   # Create the placeholder template as shown above
   ```
4. Build and test the 'add' command:
   ```bash
   cd cli && npm run build
   # First, test listing available components
   node bin/index.js add
   # Then, test adding a component
   node bin/index.js add button --dir ./test-project
   ```

---

## Commit 4: feat: Implement init command for project bootstrapping

**Description:**
Implement the `init` command for bootstrapping new projects with Vindsmidi UI and the necessary configuration.

1. Create project templates for different frameworks. Start with a basic React template in `cli/templates/init/react/template.json`:
   ```json
   {
     "files": [
       {
         "source": "package.json.template",
         "target": "package.json"
       },
       {
         "source": "vite.config.ts.template",
         "target": "vite.config.ts"
       },
       {
         "source": "tailwind.config.js.template",
         "target": "tailwind.config.js"
       },
       {
         "source": "src/styles/main.css.template",
         "target": "src/styles/main.css"
       },
       {
         "source": "src/App.tsx.template",
         "target": "src/App.tsx"
       },
       {
         "source": "src/main.tsx.template",
         "target": "src/main.tsx"
       },
       {
         "source": "src/utilities/classNames.ts.template",
         "target": "src/utilities/classNames.ts"
       },
       {
         "source": "src/utilities/index.ts.template",
         "target": "src/utilities/index.ts"
       }
     ]
   }
   ```

2. Create a sample package.json template in `cli/templates/init/react/package.json.template`:
   ```json
   {
     "name": "<%= projectName %>",
     "private": true,
     "version": "0.1.0",
     "type": "module",
     "scripts": {
       "dev": "vite",
       "build": "tsc && vite build",
       "preview": "vite preview",
       "lint": "eslint src/**/*.{ts,tsx}"
     },
     "dependencies": {
       "@fluentui/react-components": "^9.30.0",
       "@fluentui/react-hooks": "^9.1.9",
       "@fluentui/react-utilities": "^9.14.0",
       "class-variance-authority": "^0.7.0",
       "clsx": "^2.1.0",
       "react": "^18.2.0",
       "react-dom": "^18.2.0",
       "tailwind-merge": "^2.2.0"
     },
     "devDependencies": {
       "@tailwindcss/vite": "^4.0.0",
       "@types/react": "^18.2.15",
       "@types/react-dom": "^18.2.7",
       "@typescript-eslint/eslint-plugin": "^6.0.0",
       "@typescript-eslint/parser": "^6.0.0",
       "@vitejs/plugin-react": "^4.0.3",
       "eslint": "^8.45.0",
       "eslint-plugin-react-hooks": "^4.6.0",
       "eslint-plugin-react-refresh": "^0.4.3",
       "tailwindcss": "^4.0.0",
       "typescript": "^5.0.2",
       "vite": "^4.4.5"
     }
   }
   ```

3. Create a sample tailwind.config.js template in `cli/templates/init/react/tailwind.config.js.template`:
   ```javascript
   /** @type {import('tailwindcss').Config} */
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {
         colors: {
           // Map Fluent UI colors to Tailwind
           brand: 'var(--fluent-color-brand-background)',
           'brand-hover': 'var(--fluent-color-brand-background-hover)',
           'brand-pressed': 'var(--fluent-color-brand-background-pressed)',
         },
       },
     },
     plugins: [],
   }
   ```

4. Create a project template manager in `cli/src/utils/project-template-manager.ts`:
   ```typescript
   import path from 'path';
   import fs from 'fs-extra';
   import { logger } from './logger';
   import { renderTemplate } from './template';

   interface ProjectTemplate {
     files: Array<{
       source: string;
       target: string;
     }>;
   }

   /**
    * Gets the template definition for a framework
    */
   export async function getProjectTemplate(
     framework: string
   ): Promise<ProjectTemplate> {
     const templatePath = path.resolve(
       __dirname, 
       '..', 
       '..', 
       'templates', 
       'init', 
       framework, 
       'template.json'
     );
     
     try {
       return await fs.readJson(templatePath);
     } catch (error) {
       logger.error(`Template not found for framework: ${framework}`);
       throw new Error(`Template not found for framework: ${framework}`);
     }
   }

   /**
    * Creates a new project from a template
    */
   export async function createProject(
     projectDir: string,
     framework: string,
     options: {
       projectName: string;
       typescript: boolean;
       packageManager: 'npm' | 'yarn' | 'pnpm';
     }
   ): Promise<void> {
     // Get template definition
     const template = await getProjectTemplate(framework);
     
     // Create project directory
     await fs.ensureDir(projectDir);
     
     // Get template base path
     const templateBasePath = path.resolve(
       __dirname, 
       '..', 
       '..', 
       'templates', 
       'init', 
       framework
     );
     
     // Render each template file
     for (const file of template.files) {
       const sourcePath = path.join(templateBasePath, file.source);
       const targetPath = path.join(projectDir, file.target);
       
       // Skip if template doesn't exist (for demo purposes)
       if (!await fs.pathExists(sourcePath)) {
         logger.warn(`Template file not found: ${file.source}`);
         continue;
       }
       
       // Render the template
       await renderTemplate(
         sourcePath,
         targetPath,
         {
           projectName: options.projectName,
           typescript: options.typescript,
           packageManager: options.packageManager
         }
       );
       
       logger.success(`Created: ${file.target}`);
     }
   }
   ```

5. Implement the interactive prompts utility in `cli/src/utils/prompt.ts`:
   ```typescript
   import inquirer from 'inquirer';

   export interface InitOptions {
     projectName: string;
     framework: 'react' | 'next' | 'vite' | 'remix';
     typescript: boolean;
     packageManager: 'npm' | 'yarn' | 'pnpm';
     components: string[];
   }

   /**
    * Prompts for project initialization options
    */
   export async function promptInit(
     defaultProjectName: string
   ): Promise<InitOptions> {
     return inquirer.prompt([
       {
         type: 'input',
         name: 'projectName',
         message: 'Project name:',
         default: defaultProjectName,
         validate: (input) => input.trim() !== '' || 'Project name is required'
       },
       {
         type: 'list',
         name: 'framework',
         message: 'Select a framework:',
         choices: [
           { name: 'React', value: 'react' },
           { name: 'Next.js', value: 'next' },
           { name: 'React + Vite', value: 'vite' },
           { name: 'Remix', value: 'remix' }
         ],
         default: 'react'
       },
       {
         type: 'confirm',
         name: 'typescript',
         message: 'Use TypeScript?',
         default: true
       },
       {
         type: 'list',
         name: 'packageManager',
         message: 'Select a package manager:',
         choices: [
           { name: 'npm', value: 'npm' },
           { name: 'yarn', value: 'yarn' },
           { name: 'pnpm', value: 'pnpm' }
         ],
         default: 'npm'
       },
       {
         type: 'checkbox',
         name: 'components',
         message: 'Select components to include:',
         choices: [
           { name: 'Button', value: 'button', checked: true },
           { name: 'Card', value: 'card', checked: true },
           { name: 'Input', value: 'input' },
           { name: 'Checkbox', value: 'checkbox' }
         ]
       }
     ]);
   }
   ```

6. Implement the 'init' command in `cli/src/commands/init.ts`:
   ```typescript
   import { Command } from 'commander';
   import path from 'path';
   import ora from 'ora';
   import { execa } from 'execa';
   import { logger } from '../utils/logger';
   import { promptInit } from '../utils/prompt';
   import { createProject } from '../utils/project-template-manager';
   import { getComponents } from '../registry/components';
   import { resolveDependencies } from '../utils/dependency-resolver';
   import { installComponents } from '../utils/template-manager';

   export function registerInitCommand(program: Command): void {
     program
       .command('init')
       .description('Initialize a new project with Vindsmidi UI')
       .argument('[name]', 'Project name')
       .option('-d, --dir <directory>', 'Parent directory', process.cwd())
       .option('-y, --yes', 'Skip prompts and use defaults', false)
       .action(async (name, options) => {
         try {
           const defaultProjectName = name || 'vindsmidi-project';
           
           // Interactive prompts
           let initOptions;
           if (options.yes) {
             // Use defaults
             initOptions = {
               projectName: defaultProjectName,
               framework: 'react',
               typescript: true,
               packageManager: 'npm',
               components: ['button', 'card']
             };
           } else {
             initOptions = await promptInit(defaultProjectName);
           }
           
           const projectDir = path.join(options.dir, initOptions.projectName);
           
           // Create project
           const spinner = ora('Creating project...').start();
           
           await createProject(projectDir, initOptions.framework, {
             projectName: initOptions.projectName,
             typescript: initOptions.typescript,
             packageManager: initOptions.packageManager
           });
           
           spinner.succeed('Project created');
           
           // Install selected components
           if (initOptions.components.length) {
             spinner.text = 'Installing components...';
             spinner.start();
             
             const components = getComponents(initOptions.components);
             const allComponents = resolveDependencies(components);
             
             const sourceDir = initOptions.framework === 'next' || initOptions.framework === 'remix' ? 
               'src' : 
               '.';
               
             await installComponents(allComponents, path.join(projectDir, sourceDir), {
               overwrite: true,
               installDependencies: true
             });
             
             spinner.succeed('Components installed');
           }
           
           // Install dependencies
           spinner.text = 'Installing dependencies...';
           spinner.start();
           
           const installCommand = initOptions.packageManager === 'yarn' ? 
             'yarn' : 
             initOptions.packageManager === 'pnpm' ? 
               'pnpm install' : 
               'npm install';
           
           try {
             await execa(installCommand, { cwd: projectDir, shell: true });
             spinner.succeed('Dependencies installed');
           } catch (error) {
             spinner.warn('Failed to install dependencies automatically');
             logger.info(`Run '${installCommand}' in the project directory to install dependencies`);
           }
           
           // Success message
           logger.newLine();
           logger.success(`Project ${initOptions.projectName} created successfully!`);
           logger.info(`To get started:`);
           logger.log(`  cd ${initOptions.projectName}`);
           logger.log(`  ${initOptions.packageManager === 'yarn' ? 'yarn dev' : initOptions.packageManager === 'pnpm' ? 'pnpm dev' : 'npm run dev'}`);
           
         } catch (error) {
           ora().fail('Project creation failed');
           logger.error(error instanceof Error ? error.message : String(error));
           process.exit(1);
         }
       });
   }
   ```

**Verification:**
1. Create the template directory for testing:
   ```bash
   mkdir -p cli/templates/init/react
   # Create the template.json and package.json.template as shown above
   ```
2. Verify implementation of the 'init' command:
   ```bash
   cat cli/src/commands/init.ts
   ```
3. Build and test the 'init' command:
   ```bash
   cd cli && npm run build
   # Test with defaults
   node bin/index.js init test-project --yes
   # Test with prompts
   node bin/index.js init
   ```
4. Verify the created project structure:
   ```bash
   ls -la test-project/
   ```

---

## Commit 5: feat: Implement config command and complete CLI implementation

**Description:**
Implement the `config` command for customizing existing projects and finalize the CLI implementation with the remaining commands and documentation.

1. Create the Tailwind configuration generator in `cli/src/utils/configure-tailwind.ts`:
   ```typescript
   import path from 'path';
   import fs from 'fs-extra';
   import { logger } from './logger';

   export interface TailwindConfigOptions {
     fluentTokens?: boolean;
     componentPaths?: string[];
     darkMode?: 'class' | 'media';
   }

   /**
    * Configures Tailwind CSS for a project
    */
   export async function configureTailwind(
     projectDir: string,
     options: TailwindConfigOptions = {}
   ): Promise<void> {
     // Detect existing tailwind.config.js/ts
     const jsConfigPath = path.join(projectDir, 'tailwind.config.js');
     const tsConfigPath = path.join(projectDir, 'tailwind.config.ts');
     
     let configPath = '';
     let isTypeScript = false;
     
     if (await fs.pathExists(tsConfigPath)) {
       configPath = tsConfigPath;
       isTypeScript = true;
     } else if (await fs.pathExists(jsConfigPath)) {
       configPath = jsConfigPath;
     } else {
       // Create new config
       configPath = jsConfigPath;
       
       const baseConfig = `/** @type {import('tailwindcss').Config} */
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   `;
       
       await fs.writeFile(configPath, baseConfig);
       logger.success('Created tailwind.config.js');
     }
     
     // Read existing config
     const configContent = await fs.readFile(configPath, 'utf8');
     
     // Parse config
     // Note: In a real implementation, this would use a proper parser
     // For this demo, we'll use a simple string replacement approach
     
     let updatedContent = configContent;
     
     // Add component paths
     if (options.componentPaths?.length) {
       const pathsString = options.componentPaths
         .map(p => `"${p}"`)
         .join(',\n      ');
         
       if (updatedContent.includes('content: [')) {
         updatedContent = updatedContent.replace(
           'content: [',
           `content: [\n      ${pathsString},`
         );
       }
     }
     
     // Add Fluent UI tokens
     if (options.fluentTokens) {
       const tokensSnippet = `
     theme: {
       extend: {
         colors: {
           // Fluent UI color tokens
           brand: 'var(--fluent-color-brand-background)',
           'brand-hover': 'var(--fluent-color-brand-background-hover)',
           'brand-pressed': 'var(--fluent-color-brand-background-pressed)',
           'neutral-background': 'var(--fluent-color-neutral-background-1)',
           'neutral-foreground': 'var(--fluent-color-neutral-foreground-1)',
         },
         spacing: {
           // Fluent UI spacing tokens
           'fluent-xxs': 'var(--fluent-spacing-xxs)',
           'fluent-xs': 'var(--fluent-spacing-xs)',
           'fluent-s': 'var(--fluent-spacing-s)',
           'fluent-m': 'var(--fluent-spacing-m)',
           'fluent-l': 'var(--fluent-spacing-l)',
           'fluent-xl': 'var(--fluent-spacing-xl)',
           'fluent-xxl': 'var(--fluent-spacing-xxl)',
         },
         borderRadius: {
           // Fluent UI border radius tokens
           'fluent-none': 'var(--fluent-border-radius-none)',
           'fluent-small': 'var(--fluent-border-radius-small)',
           'fluent-medium': 'var(--fluent-border-radius-medium)',
           'fluent-large': 'var(--fluent-border-radius-large)',
           'fluent-xlarge': 'var(--fluent-border-radius-xlarge)',
           'fluent-circular': 'var(--fluent-border-radius-circular)',
         },
       },
     },`;
       
       // Replace theme section
       if (updatedContent.includes('theme: {')) {
         updatedContent = updatedContent.replace(
           /theme:\s*\{[^}]*\}/s,
           tokensSnippet
         );
       } else {
         // Add theme section if not present
         updatedContent = updatedContent.replace(
           'export default {',
           `export default {\n${tokensSnippet}`
         );
       }
     }
     
     // Configure dark mode
     if (options.darkMode) {
       if (updatedContent.includes('darkMode:')) {
         updatedContent = updatedContent.replace(
           /darkMode:\s*['"]?[^,\n]*['"]?/,
           `darkMode: '${options.darkMode}'`
         );
       } else {
         // Add dark mode if not present
         updatedContent = updatedContent.replace(
           'export default {',
           `export default {\n  darkMode: '${options.darkMode}',`
         );
       }
     }
     
     // Write updated config
     await fs.writeFile(configPath, updatedContent);
     logger.success(`Updated ${path.basename(configPath)}`);
   }
   ```

2. Implement the theme tokens generator in `cli/src/utils/generate-tokens.ts`:
   ```typescript
   import path from 'path';
   import fs from 'fs-extra';
   import { logger } from './logger';

   /**
    * Generates Fluent UI token CSS variables
    */
   export async function generateTokenCss(
     projectDir: string,
     options: {
       outputPath?: string;
       format?: 'css' | 'scss';
     } = {}
   ): Promise<void> {
     const outputPath = options.outputPath || 
       path.join(projectDir, 'src', 'styles', 'fluent-tokens.css');
       
     const format = options.format || 'css';
     
     // Create basic token CSS
     const tokenCss = `/**
   * Fluent UI Design Tokens
   * Generated by Vindsmidi CLI
   */
   
   :root {
     /* Brand Colors */
     --fluent-color-brand-background: #0f6cbd;
     --fluent-color-brand-background-hover: #115ea3;
     --fluent-color-brand-background-pressed: #0e4775;
     --fluent-color-brand-background-selected: #115ea3;
     
     /* Neutral Colors */
     --fluent-color-neutral-foreground-1: #242424;
     --fluent-color-neutral-foreground-2: #424242;
     --fluent-color-neutral-foreground-3: #616161;
     --fluent-color-neutral-foreground-disabled: #bdbdbd;
     
     --fluent-color-neutral-background-1: #ffffff;
     --fluent-color-neutral-background-2: #fafafa;
     --fluent-color-neutral-background-3: #f5f5f5;
     --fluent-color-neutral-background-4: #f0f0f0;
     --fluent-color-neutral-background-disabled: #f0f0f0;
     
     --fluent-color-neutral-stroke-1: #d1d1d1;
     --fluent-color-neutral-stroke-2: #e0e0e0;
     --fluent-color-neutral-stroke-3: #f0f0f0;
     --fluent-color-neutral-stroke-disabled: #e0e0e0;
     
     /* Border Radius */
     --fluent-border-radius-none: 0;
     --fluent-border-radius-small: 2px;
     --fluent-border-radius-medium: 4px;
     --fluent-border-radius-large: 6px;
     --fluent-border-radius-xlarge: 8px;
     --fluent-border-radius-circular: 9999px;
     
     /* Spacing */
     --fluent-spacing-xxs: 2px;
     --fluent-spacing-xs: 4px;
     --fluent-spacing-s: 8px;
     --fluent-spacing-m: 12px;
     --fluent-spacing-l: 16px;
     --fluent-spacing-xl: 20px;
     --fluent-spacing-xxl: 24px;
     --fluent-spacing-xxxl: 32px;
   }
   
   /* Dark Mode */
   .dark-theme {
     --fluent-color-neutral-foreground-1: #ffffff;
     --fluent-color-neutral-foreground-2: #d6d6d6;
     --fluent-color-neutral-foreground-3: #adadad;
     --fluent-color-neutral-foreground-disabled: #616161;
     
     --fluent-color-neutral-background-1: #1a1a1a;
     --fluent-color-neutral-background-2: #242424;
     --fluent-color-neutral-background-3: #2e2e2e;
     --fluent-color-neutral-background-4: #383838;
     --fluent-color-neutral-background-disabled: #242424;
     
     --fluent-color-neutral-stroke-1: #575757;
     --fluent-color-neutral-stroke-2: #424242;
     --fluent-color-neutral-stroke-3: #383838;
     --fluent-color-neutral-stroke-disabled: #424242;
   }
   `;
     
     // Ensure directory exists
     await fs.ensureDir(path.dirname(outputPath));
     
     // Write token CSS
     await fs.writeFile(outputPath, tokenCss);
     logger.success(`Generated token CSS at ${path.relative(process.cwd(), outputPath)}`);
     
     // Create import for main CSS
     const mainCssPath = path.join(path.dirname(outputPath), 'main.css');
     
     if (await fs.pathExists(mainCssPath)) {
       const mainCss = await fs.readFile(mainCssPath, 'utf8');
       
       if (!mainCss.includes('fluent-tokens.css')) {
         const updatedMainCss = `@import "./fluent-tokens.css";\n${mainCss}`;
         await fs.writeFile(mainCssPath, updatedMainCss);
         logger.success('Updated main.css to import token CSS');
       }
     }
   }
   ```

3. Implement the `config` command in `cli/src/commands/config.ts`:
   ```typescript
   import { Command } from 'commander';
   import path from 'path';
   import ora from 'ora';
   import inquirer from 'inquirer';
   import { logger } from '../utils/logger';
   import { configureTailwind } from '../utils/configure-tailwind';
   import { generateTokenCss } from '../utils/generate-tokens';
   import { detectProject } from '../utils/project-detector';

   export function registerConfigCommand(program: Command): void {
     program
       .command('config')
       .description('Configure Vindsmidi UI in an existing project')
       .option('-d, --dir <directory>', 'Target directory', process.cwd())
       .option('--tailwind', 'Configure Tailwind CSS')
       .option('--tokens', 'Generate Fluent UI token CSS')
       .option('--dark-mode <mode>', 'Configure dark mode (class or media)')
       .option('-y, --yes', 'Skip prompts and use defaults', false)
       .action(async (options) => {
         try {
           // Detect project
           const spinner = ora('Analyzing project...').start();
           const projectInfo = await detectProject(options.dir);
           spinner.succeed('Project analyzed');
           
           logger.info(`Detected framework: ${projectInfo.framework}`);
           logger.info(`Using TypeScript: ${projectInfo.hasTypeScript ? 'Yes' : 'No'}`);
           logger.info(`Tailwind CSS: ${projectInfo.hasTailwind ? 'Yes' : 'No'}`);
           
           // If no specific options, prompt for what to configure
           if (!options.tailwind && !options.tokens && !options.darkMode && !options.yes) {
             const answers = await inquirer.prompt([
               {
                 type: 'checkbox',
                 name: 'actions',
                 message: 'What would you like to configure?',
                 choices: [
                   { name: 'Configure Tailwind CSS', value: 'tailwind', checked: true },
                   { name: 'Generate Fluent UI token CSS', value: 'tokens', checked: true },
                   { name: 'Configure dark mode', value: 'darkMode' }
                 ]
               },
               {
                 type: 'list',
                 name: 'darkMode',
                 message: 'Select dark mode strategy:',
                 choices: [
                   { name: 'Class (.dark-theme)', value: 'class' },
                   { name: 'Media query (prefers-color-scheme)', value: 'media' }
                 ],
                 when: (answers) => answers.actions.includes('darkMode')
               }
             ]);
             
             options.tailwind = answers.actions.includes('tailwind');
             options.tokens = answers.actions.includes('tokens');
             options.darkMode = answers.actions.includes('darkMode') ? answers.darkMode : undefined;
           }
           
           // Configure Tailwind
           if (options.tailwind || options.yes) {
             spinner.text = 'Configuring Tailwind CSS...';
             spinner.start();
             
             await configureTailwind(options.dir, {
               fluentTokens: true,
               componentPaths: [
                 `./src/components/**/*.{js,ts,jsx,tsx}`,
                 `./components/**/*.{js,ts,jsx,tsx}`,
               ],
               darkMode: options.darkMode as 'class' | 'media' | undefined
             });
             
             spinner.succeed('Tailwind CSS configured');
           }
           
           // Generate tokens
           if (options.tokens || options.yes) {
             spinner.text = 'Generating Fluent UI tokens...';
             spinner.start();
             
             await generateTokenCss(options.dir);
             
             spinner.succeed('Fluent UI tokens generated');
           }
           
           logger.success('Configuration completed successfully!');
           
         } catch (error) {
           ora().fail('Configuration failed');
           logger.error(error instanceof Error ? error.message : String(error));
           process.exit(1);
         }
       });
   }
   ```

4. Implement the minimal `dev` command in `cli/src/commands/dev.ts`:
   ```typescript
   import { Command } from 'commander';
   import { execa } from 'execa';
   import ora from 'ora';
   import { logger } from '../utils/logger';
   import { detectProject } from '../utils/project-detector';

   export function registerDevCommand(program: Command): void {
     program
       .command('dev')
       .description('Start development server')
       .option('-d, --dir <directory>', 'Target directory', process.cwd())
       .action(async (options) => {
         try {
           // Detect project
           const spinner = ora('Analyzing project...').start();
           const projectInfo = await detectProject(options.dir);
           spinner.succeed('Project analyzed');
           
           // Start dev server based on project type
           logger.info(`Starting ${projectInfo.framework} development server...`);
           
           const devCommand = projectInfo.packageManager === 'yarn' ? 
             'yarn dev' : 
             projectInfo.packageManager === 'pnpm' ? 
               'pnpm dev' : 
               'npm run dev';
           
           // Execute dev command
           const child = execa(devCommand, { cwd: options.dir, shell: true });
           
           // Pipe output
           child.stdout?.pipe(process.stdout);
           child.stderr?.pipe(process.stderr);
           
           // Handle exit
           child.on('exit', (code) => {
             if (code !== 0) {
               logger.error(`Development server exited with code ${code}`);
               process.exit(code || 1);
             }
           });
           
           // Wait for process to finish
           await child;
           
         } catch (error) {
           ora().fail('Failed to start development server');
           logger.error(error instanceof Error ? error.message : String(error));
           process.exit(1);
         }
       });
   }
   ```

5. Create a README.md file for the CLI in `cli/README.md`:
   ```markdown
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
   vindsmidi init my-project

   # Create a new project with defaults
   vindsmidi init my-project --yes
   ```

   ### Add Components

   ```bash
   # Add components to your project
   vindsmidi add button card

   # List available components
   vindsmidi add
   ```

   ### Configure Existing Project

   ```bash
   # Configure with interactive prompts
   vindsmidi config

   # Configure specific options
   vindsmidi config --tailwind --tokens --dark-mode class
   ```

   ### Start Development Server

   ```bash
   # Start development server
   vindsmidi dev
   ```

   ## Available Components

   - Button - Interactive button component with various styles
   - Card - Surface container for grouping related content
   - (More components coming soon)

   ## Documentation

   For more detailed documentation, visit the [Vindsmidi UI documentation site](https://vindsmidi-ui.dev).

   ## License

   MIT
   ```

**Verification:**
1. Verify implementation of the 'config' command:
   ```bash
   cat cli/src/commands/config.ts
   ```
2. Build and test the 'config' command:
   ```bash
   cd cli && npm run build
   # Test with an existing project
   node bin/index.js config --dir ./test-project
   ```
3. Verify generated files:
   ```bash
   cat test-project/src/styles/fluent-tokens.css
   cat test-project/tailwind.config.js
   ```
4. Test the 'dev' command:
   ```bash
   node bin/index.js dev --dir ./test-project
   ```
5. Verify the README.md is correctly created:
   ```bash
   cat cli/README.md
   ```