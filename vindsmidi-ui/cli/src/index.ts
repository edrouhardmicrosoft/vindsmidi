import { Command } from "commander";
import { registerInitCommand } from "./commands/init";
import { registerAddCommand } from "./commands/add";
import { registerConfigCommand } from "./commands/config";
import { registerDevCommand } from "./commands/dev";
import { registerDoctorCommand } from "./commands/doctor";
import { logger } from "./utils/logger";
import { ensureTemplates } from "./utils/setup-templates";

(async () => {
  await ensureTemplates().catch((err) => {
    logger.error(`Failed to initialize templates: ${err.message}`);
    process.exit(1);
  });

  const program = new Command();

  // Setup CLI metadata
  program
    .name("vui")
    .description(
      "VUI CLI: Fast Fluent UI + Tailwind CSS 4.0 project and component generator"
    )
    .version("0.1.0");

  // Register commands
  registerInitCommand(program);
  registerAddCommand(program);
  registerConfigCommand(program);
  registerDevCommand(program);
  registerDoctorCommand(program);

  // Temporary addition to test the logger
  program
    .command("test-logger")
    .description("Test the logger utility")
    .action(() => {
      logger.title("Logger Test");
      logger.info("This is an info message");
      logger.success("This is a success message");
      logger.warn("This is a warning message");
      logger.error("This is an error message");
      logger.divider();
      logger.log("This is a regular log message");
    });

  // Handle errors
  program.exitOverride((err) => {
    if (err.code === "commander.help") {
      process.exit(0);
    }
    logger.error(err.message);
    process.exit(1);
  });

  // Parse arguments
  program.parse(process.argv);
})();
