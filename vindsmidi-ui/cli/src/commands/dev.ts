import { Command } from "commander";
import { execa } from "execa";
import ora from "ora";
import { logger } from "../utils/logger";
import { detectProject } from "../utils/project-detector";

export function registerDevCommand(program: Command): void {
  program
    .command("dev")
    .description("Start development server")
    .option("-d, --dir <directory>", "Target directory", process.cwd())
    .action(async (options) => {
      try {
        // Detect project
        const spinner = ora("Analyzing project...").start();
        const projectInfo = await detectProject(options.dir);
        spinner.succeed("Project analyzed");

        // Start dev server based on project type
        logger.info(`Starting ${projectInfo.framework} development server...`);

        const devCommand =
          projectInfo.packageManager === "yarn"
            ? "yarn dev"
            : projectInfo.packageManager === "pnpm"
            ? "pnpm dev"
            : "npm run dev";

        // Execute dev command
        const child = execa(devCommand, { cwd: options.dir, shell: true });

        // Pipe output
        child.stdout?.pipe(process.stdout);
        child.stderr?.pipe(process.stderr);

        // Handle exit
        child.on("exit", (code) => {
          if (code !== 0) {
            logger.error(`Development server exited with code ${code}`);
            process.exit(code || 1);
          } else {
            logger.success(`Development server exited successfully`);
          }
        });

        // Wait for process to finish
        await child;
      } catch (error) {
        ora().fail("Failed to start development server");
        logger.error(error instanceof Error ? error.message : String(error));
        process.exit(1);
      }
    });
}
