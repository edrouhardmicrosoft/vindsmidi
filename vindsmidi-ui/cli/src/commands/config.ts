import { Command } from "commander";
import path from "path";
import ora from "ora";
import inquirer from "inquirer";
import { logger } from "../utils/logger";
import { configureTailwind } from "../utils/configure-tailwind";
import { generateTokenCss } from "../utils/generate-tokens";
import { detectProject } from "../utils/project-detector";

export function registerConfigCommand(program: Command): void {
  program
    .command("config")
    .description("Configure Vindsmidi UI in an existing project")
    .option("-d, --dir <directory>", "Target directory", process.cwd())
    .option("--tailwind", "Configure Tailwind CSS")
    .option("--tokens", "Generate Fluent UI token CSS")
    .option("--dark-mode <mode>", "Configure dark mode (class or media)")
    .option("-y, --yes", "Skip prompts and use defaults", false)
    .action(async (options) => {
      try {
        // Detect project
        const spinner = ora("Analyzing project...").start();
        const projectInfo = await detectProject(options.dir);
        spinner.succeed("Project analyzed");

        logger.info(`Detected framework: ${projectInfo.framework}`);
        logger.info(
          `Using TypeScript: ${projectInfo.hasTypeScript ? "Yes" : "No"}`
        );
        logger.info(`Tailwind CSS: ${projectInfo.hasTailwind ? "Yes" : "No"}`);

        // If no specific options, prompt for what to configure
        if (
          !options.tailwind &&
          !options.tokens &&
          !options.darkMode &&
          !options.yes
        ) {
          const answers = await inquirer.prompt([
            {
              type: "checkbox",
              name: "actions",
              message: "What would you like to configure?",
              choices: [
                {
                  name: "Configure Tailwind CSS",
                  value: "tailwind",
                  checked: true,
                },
                {
                  name: "Generate Fluent UI token CSS",
                  value: "tokens",
                  checked: true,
                },
                { name: "Configure dark mode", value: "darkMode" },
              ],
            },
            {
              type: "list",
              name: "darkMode",
              message: "Select dark mode strategy:",
              choices: [
                { name: "Class (.dark-theme)", value: "class:.dark-theme" },
                { name: "Media query (prefers-color-scheme)", value: "media" },
              ],
              when: (answers) => answers.actions.includes("darkMode"),
            },
          ]);

          options.tailwind = answers.actions.includes("tailwind");
          options.tokens = answers.actions.includes("tokens");
          options.darkMode = answers.actions.includes("darkMode")
            ? answers.darkMode
            : undefined;
        }

        // Configure Tailwind
        if (options.tailwind || options.yes) {
          spinner.text = "Configuring Tailwind CSS...";
          spinner.start();

          await configureTailwind(options.dir, {
            fluentTokens: true,
            componentPaths: [
              `./src/components/**/*.{js,ts,jsx,tsx}`,
              `./components/**/*.{js,ts,jsx,tsx}`,
            ],
            darkMode: options.darkMode as "class" | "media" | undefined,
          });

          spinner.succeed("Tailwind CSS configured");
        }

        // Generate tokens
        if (options.tokens || options.yes) {
          spinner.text = "Generating Fluent UI tokens...";
          spinner.start();

          await generateTokenCss(options.dir);

          spinner.succeed("Fluent UI tokens generated");
        }

        logger.success("Configuration completed successfully!");
      } catch (error) {
        ora().fail("Configuration failed");
        logger.error(error instanceof Error ? error.message : String(error));
        process.exit(1);
      }
    });
}
