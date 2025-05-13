import { Command } from "commander";
import path from "path";
import ora from "ora";
import { logger } from "../utils/logger";
import { getComponents, getComponentNames } from "../registry/components";
import { resolveDependencies } from "../utils/dependency-resolver";
import { installComponents } from "../utils/template-manager";
import { detectProject } from "../utils/project-detector";

export function registerAddCommand(program: Command): void {
  program
    .command("add")
    .description("Add components to your project")
    .argument("[components...]", "Component names to add")
    .option("-d, --dir <directory>", "Target directory", process.cwd())
    .option("-f, --force", "Overwrite existing files", false)
    .option("--no-deps", "Skip installing dependencies", false)
    .action(async (componentNames, options) => {
      try {
        // If no components specified, list available components
        if (!componentNames.length) {
          logger.title("Available Components");
          const names = getComponentNames();
          names.forEach((name) => logger.log(`- ${name}`));
          logger.newLine();
          logger.info(`Run 'vindsmidi add <component>' to add a component`);
          return;
        }

        // Detect project
        const spinner = ora("Analyzing project...").start();
        const projectInfo = await detectProject(options.dir);
        spinner.succeed("Project analyzed");

        logger.info(`Detected framework: ${projectInfo.framework}`);
        logger.info(
          `Using TypeScript: ${projectInfo.hasTypeScript ? "Yes" : "No"}`
        );
        logger.info(`Tailwind CSS: ${projectInfo.hasTailwind ? "Yes" : "No"}`);

        // Get components and dependencies
        spinner.text = "Resolving components...";
        spinner.start();

        const components = getComponents(componentNames);
        const allComponents = options.deps
          ? resolveDependencies(components)
          : components;

        spinner.succeed(`Resolved ${allComponents.length} components`);

        // Install components
        spinner.text = "Installing components...";
        spinner.start();

        const targetDir = path.join(options.dir, projectInfo.sourceDir);
        await installComponents(allComponents, targetDir, {
          overwrite: options.force,
          installDependencies: options.deps,
        });

        spinner.succeed("Components installed successfully");

        // Display usage example
        logger.title("Usage Example");
        if (componentNames.includes("button")) {
          logger.log(`
import { Button } from './${path.relative(
            projectInfo.sourceDir,
            path.join(projectInfo.componentsDir, "ui", "button")
          )}';

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
        ora().fail("Installation failed");
        logger.error(error instanceof Error ? error.message : String(error));
        process.exit(1);
      }
    });
}
