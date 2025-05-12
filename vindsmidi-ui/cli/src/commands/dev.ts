import { Command } from "commander";

export function registerDevCommand(program: Command): void {
  program
    .command("dev")
    .description("Stub: Start development server")
    .action(() => {
      console.log("dev command (stub)");
    });
}
