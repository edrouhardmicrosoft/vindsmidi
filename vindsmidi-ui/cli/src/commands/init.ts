import { Command } from "commander";

export function registerInitCommand(program: Command): void {
  program
    .command("init")
    .description("Stub: Initialize a new project with Vindsmidi UI")
    .action(() => {
      console.log("init command (stub)");
    });
}
