import { Command } from "commander";
import path from "path";
import ora from "ora";
import { execa } from "execa";
import { logger } from "../utils/logger";
import { promptInit } from "../utils/prompt";
import { createProject } from "../utils/project-template-manager";
import { getComponents } from "../registry/components";
import { resolveDependencies } from "../utils/dependency-resolver";
import { installComponents } from "../utils/template-manager";

export function registerInitCommand(program: Command): void {
  program
    .command("init")
    .description("Initialize a new project with Vindsmidi UI")
    .argument("[name]", "Project name")
    .option("-d, --dir <directory>", "Parent directory", process.cwd())
    .option("-y, --yes", "Skip prompts and use defaults", false)
    .action(async (name, options) => {
      try {
        const defaultProjectName = name || "vindsmidi-project";

        // Interactive prompts
        let initOptions;
        if (options.yes) {
          // Use defaults
          initOptions = {
            projectName: defaultProjectName,
            framework: "react",
            typescript: true,
            packageManager: "npm",
            components: ["button", "card"],
          };
        } else {
          initOptions = await promptInit(defaultProjectName);
        }

        const projectDir = path.join(options.dir, initOptions.projectName);

        // Create project
        const spinner = ora("Creating project...").start();

        await createProject(projectDir, initOptions.framework, {
          projectName: initOptions.projectName,
          typescript: initOptions.typescript,
          packageManager: initOptions.packageManager,
        });

        spinner.succeed("Project created");

        // Install selected components
        if (initOptions.components.length) {
          spinner.text = "Installing components...";
          spinner.start();

          const components = getComponents(initOptions.components);
          const allComponents = resolveDependencies(components);

          const sourceDir =
            initOptions.framework === "next" ||
            initOptions.framework === "remix"
              ? "src"
              : ".";

          await installComponents(
            allComponents,
            path.join(projectDir, sourceDir),
            {
              overwrite: true,
              installDependencies: true,
            }
          );

          spinner.succeed("Components installed");
        }

        // Install dependencies
        spinner.text = "Installing dependencies...";
        spinner.start();

        const installCommand =
          initOptions.packageManager === "yarn"
            ? "yarn"
            : initOptions.packageManager === "pnpm"
            ? "pnpm install"
            : "npm install";

        try {
          await execa(installCommand, { cwd: projectDir, shell: true });
          spinner.succeed("Dependencies installed");
        } catch (error) {
          spinner.warn("Failed to install dependencies automatically");
          logger.info(
            `Run '${installCommand}' in the project directory to install dependencies`
          );
        }

        // Success message
        logger.newLine();
        logger.success(
          `Project ${initOptions.projectName} created successfully!`
        );
        logger.info(`To get started:`);
        logger.log(`  cd ${initOptions.projectName}`);
        logger.log(
          `  ${
            initOptions.packageManager === "yarn"
              ? "yarn dev"
              : initOptions.packageManager === "pnpm"
              ? "pnpm dev"
              : "npm run dev"
          }`
        );
      } catch (error) {
        ora().fail("Project creation failed");
        logger.error(error instanceof Error ? error.message : String(error));
        process.exit(1);
      }
    });
}
