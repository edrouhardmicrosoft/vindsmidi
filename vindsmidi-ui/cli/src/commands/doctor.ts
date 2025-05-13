import { Command } from "commander";
import path from "path";
import fs from "fs-extra";
import { logger } from "../utils/logger";

export function registerDoctorCommand(program: Command): void {
  program
    .command("doctor")
    .description("Check CLI setup and diagnose issues")
    .action(async () => {
      logger.title("CLI Setup Diagnostics");
      const templatesDir = path.resolve(__dirname, "..", "..", "templates");
      const hasTemplatesDir = await fs.pathExists(templatesDir);
      if (hasTemplatesDir) {
        logger.success(`✓ Templates directory exists: ${templatesDir}`);
      } else {
        logger.error(`✗ Templates directory missing: ${templatesDir}`);
      }
      for (const framework of ["react", "next", "vite", "remix"]) {
        const frameworkDir = path.join(templatesDir, "init", framework);
        const hasFrameworkDir = await fs.pathExists(frameworkDir);
        if (hasFrameworkDir) {
          logger.success(`✓ Framework templates exist: ${framework}`);
          const templateJson = path.join(frameworkDir, "template.json");
          if (await fs.pathExists(templateJson)) {
            try {
              const template = await fs.readJson(templateJson);
              const fileCount = template.files?.length || 0;
              logger.success(`  ✓ template.json valid with ${fileCount} files`);
              let missingCount = 0;
              for (const file of template.files || []) {
                const filePath = path.join(frameworkDir, file.source);
                if (!(await fs.pathExists(filePath))) {
                  logger.warn(`  ✗ Missing template file: ${file.source}`);
                  missingCount++;
                }
              }
              if (missingCount === 0) {
                logger.success(`  ✓ All template files present`);
              }
            } catch (err) {
              if (err instanceof Error) {
                logger.error(`  ✗ Invalid template.json: ${err.message}`);
              } else {
                logger.error(`  ✗ Invalid template.json: ${String(err)}`);
              }
            }
          } else {
            logger.error(`  ✗ Missing template.json`);
          }
        } else {
          logger.warn(`! Framework templates missing: ${framework}`);
        }
      }
    });
}
