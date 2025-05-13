import path from "path";
import fs from "fs-extra";
import { logger } from "./logger";
import { renderTemplate } from "./template";

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
    "..",
    "..",
    "templates",
    "init",
    framework,
    "template.json"
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
    packageManager: "npm" | "yarn" | "pnpm";
  }
): Promise<void> {
  // Get template definition
  const template = await getProjectTemplate(framework);

  // Create project directory
  await fs.ensureDir(projectDir);

  // Get template base path
  const templateBasePath = path.resolve(
    __dirname,
    "..",
    "..",
    "templates",
    "init",
    framework
  );

  // Render each template file
  for (const file of template.files) {
    const sourcePath = path.join(templateBasePath, file.source);
    const targetPath = path.join(projectDir, file.target);

    // Skip if template doesn't exist (for demo purposes)
    if (!(await fs.pathExists(sourcePath))) {
      logger.warn(`Template file not found: ${file.source}`);
      continue;
    }

    // Render the template
    await renderTemplate(sourcePath, targetPath, {
      projectName: options.projectName,
      typescript: options.typescript,
      packageManager: options.packageManager,
    });

    logger.success(`Created: ${file.target}`);
  }
}
