import { Command } from "commander";

export function registerConfigCommand(program: Command): void {
  program
    .command("config")
    .description("Stub: Configure Vindsmidi UI in an existing project")
    .action(() => {
      console.log("config command (stub)");
    });
}
