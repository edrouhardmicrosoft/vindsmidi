import lodashTemplate from "lodash.template";
import fs from "fs-extra";
import path from "path";
import { logger } from "./logger";
import { writeFile, fileExists } from "./fs";

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
    if (!options.overwrite && (await fileExists(outputPath))) {
      logger.warn(`File already exists (skipping): ${outputPath}`);
      return;
    }

    // Read template content
    const templateContent = await fs.readFile(templatePath, "utf8");

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
