import path from "path";
import fs from "fs-extra";
import { logger } from "./logger";

export interface TailwindConfigOptions {
  fluentTokens?: boolean;
  componentPaths?: string[];
  darkMode?: "class" | "media";
}

/**
 * Configures Tailwind CSS for a project
 */
export async function configureTailwind(
  projectDir: string,
  options: TailwindConfigOptions = {}
): Promise<void> {
  // Detect existing tailwind.config.js/ts
  const jsConfigPath = path.join(projectDir, "tailwind.config.js");
  const tsConfigPath = path.join(projectDir, "tailwind.config.ts");

  let configPath = "";
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
    logger.success("Created tailwind.config.js");
  }

  // Read existing config
  const configContent = await fs.readFile(configPath, "utf8");

  // Parse config
  // Note: In a real implementation, this would use a proper parser
  // For this demo, we'll use a simple string replacement approach

  let updatedContent = configContent;

  // Add component paths
  if (options.componentPaths?.length) {
    const pathsString = options.componentPaths
      .map((p) => `"${p}"`)
      .join(",\n      ");

    if (updatedContent.includes("content: [")) {
      updatedContent = updatedContent.replace(
        "content: [",
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
    if (updatedContent.includes("theme: {")) {
      updatedContent = updatedContent.replace(
        /theme:\s*\{[^}]*\}/s,
        tokensSnippet
      );
    } else {
      // Add theme section if not present
      updatedContent = updatedContent.replace(
        "export default {",
        `export default {\n${tokensSnippet}`
      );
    }
  }

  // Configure dark mode
  if (options.darkMode) {
    if (updatedContent.includes("darkMode:")) {
      updatedContent = updatedContent.replace(
        /darkMode:\s*['"]?[^,\n]*['"]?/,
        `darkMode: '${options.darkMode}'`
      );
    } else {
      // Add dark mode if not present
      updatedContent = updatedContent.replace(
        "export default {",
        `export default {\n  darkMode: '${options.darkMode}',`
      );
    }
  }

  // Write updated config
  await fs.writeFile(configPath, updatedContent);
  logger.success(`Updated ${path.basename(configPath)}`);
}
