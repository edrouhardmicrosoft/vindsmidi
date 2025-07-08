import path from "path";
import fs from "fs-extra";
import { logger } from "./logger";
import { renderTemplate } from "./template";
import { Component } from "../registry/schema";
import { ResolvedDependencies } from "./dependency-resolver";

/**
 * Gets the absolute path to a template
 */
function getTemplatePath(templateName: string): string {
  // Templates are located relative to the built CLI package in dist/
  return path.resolve(__dirname, "..", "templates", templateName);
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
 * Installs a utility by copying its template file
 */
export async function installUtility(
  utility: any,
  targetDir: string,
  options: { overwrite?: boolean } = {}
): Promise<void> {
  logger.info(`Installing utility: ${utility.name}`);

  const templatePath = getTemplatePath(utility.file.template);
  const outputPath = path.join(targetDir, utility.file.path);

  if (!(await fs.pathExists(templatePath))) {
    logger.warn(`Template not found: ${utility.file.template}`);
    return;
  }

  await renderTemplate(
    templatePath,
    outputPath,
    {
      utilityName: utility.name,
    },
    { overwrite: options.overwrite }
  );

  logger.success(`Installed utility: ${utility.name}`);
}

/**
 * Installs a hook by copying its template file
 */
export async function installHook(
  hook: any,
  targetDir: string,
  options: { overwrite?: boolean } = {}
): Promise<void> {
  logger.info(`Installing hook: ${hook.name}`);

  const templatePath = getTemplatePath(hook.file.template);
  const outputPath = path.join(targetDir, hook.file.path);

  if (!(await fs.pathExists(templatePath))) {
    logger.warn(`Template not found: ${hook.file.template}`);
    return;
  }

  await renderTemplate(
    templatePath,
    outputPath,
    {
      hookName: hook.name,
    },
    { overwrite: options.overwrite }
  );

  logger.success(`Installed hook: ${hook.name}`);
}

/**
 * Installs components with their dependencies (utilities and hooks)
 */
export async function installComponents(
  resolved: ResolvedDependencies,
  targetDir: string,
  options: { overwrite?: boolean; installDependencies?: boolean } = {}
): Promise<void> {
  // Install utilities first
  if (options.installDependencies) {
    for (const utility of resolved.utilities) {
      await installUtility(utility, targetDir, options);
    }

    // Install hooks
    for (const hook of resolved.hooks) {
      await installHook(hook, targetDir, options);
    }
  }

  // Install components
  for (const component of resolved.components) {
    await installComponent(component, targetDir, options);
  }
}
