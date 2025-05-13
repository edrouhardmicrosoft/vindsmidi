import path from "path";
import fs from "fs-extra";
import { logger } from "./logger";
import { renderTemplate } from "./template";
import { Component } from "../registry/schema";

/**
 * Gets the absolute path to a template
 */
function getTemplatePath(templateName: string): string {
  // In a real implementation, this would resolve from the CLI's templates directory
  // For now, we'll use a relative path for demonstration
  return path.resolve(__dirname, "..", "..", "templates", templateName);
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
    if (!(await fs.pathExists(templatePath))) {
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
