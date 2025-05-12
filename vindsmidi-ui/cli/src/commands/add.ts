import { Command } from "commander";

export function registerAddCommand(program: Command): void {
  program
    .command("add")
    .description("Stub: Add components to your project")
    .action(() => {
      console.log("add command (stub)");
    });
}
