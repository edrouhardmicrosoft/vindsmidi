import fs from "fs-extra";
import path from "path";
import { logger } from "./logger";

/**
 * Ensures all required template files exist
 */
export async function ensureTemplates(): Promise<void> {
  const templatesDir = path.resolve(__dirname, "..", "..", "templates");
  const frameworks = ["react", "next", "vite", "remix"];

  for (const framework of frameworks) {
    const frameworkDir = path.join(templatesDir, "init", framework);
    await fs.ensureDir(frameworkDir);

    // Create template.json if it doesn't exist
    const templateJsonPath = path.join(frameworkDir, "template.json");
    if (!(await fs.pathExists(templateJsonPath))) {
      await fs.writeJson(
        templateJsonPath,
        {
          files: [
            { source: "package.json.template", target: "package.json" },
            { source: "vite.config.ts.template", target: "vite.config.ts" },
            {
              source: "tailwind.config.js.template",
              target: "tailwind.config.js",
            },
            {
              source: "src/styles/main.css.template",
              target: "src/styles/main.css",
            },
            { source: "src/App.tsx.template", target: "src/App.tsx" },
            { source: "src/main.tsx.template", target: "src/main.tsx" },
            {
              source: "src/utilities/classNames.ts.template",
              target: "src/utilities/classNames.ts",
            },
            {
              source: "src/utilities/index.ts.template",
              target: "src/utilities/index.ts",
            },
          ],
        },
        { spaces: 2 }
      );
      logger.debug(`Created template definition: ${templateJsonPath}`);
    }

    // Create required template files with placeholders
    const filesToCreate = [
      "package.json.template",
      "vite.config.ts.template",
      "tailwind.config.js.template",
      "src/styles/main.css.template",
      "src/App.tsx.template",
      "src/main.tsx.template",
      "src/utilities/classNames.ts.template",
      "src/utilities/index.ts.template",
    ];
    for (const relPath of filesToCreate) {
      const filePath = path.join(frameworkDir, relPath);
      await fs.ensureDir(path.dirname(filePath));
      if (!(await fs.pathExists(filePath))) {
        await fs.writeFile(filePath, `// Placeholder for ${relPath}`);
        logger.debug(`Created placeholder template: ${filePath}`);
      }
    }
  }
}
