import picocolors from "picocolors";

export const logger = {
  info: (message: string): void => {
    console.log(`${picocolors.blue("info")} ${message}`);
  },
  success: (message: string): void => {
    console.log(`${picocolors.green("success")} ${message}`);
  },
  warn: (message: string): void => {
    console.log(`${picocolors.yellow("warn")} ${message}`);
  },
  error: (message: string): void => {
    console.log(`${picocolors.red("error")} ${message}`);
  },
  debug: (message: string): void => {
    if (process.env.DEBUG) {
      console.log(`${picocolors.magenta("debug")} ${message}`);
    }
  },
  log: (message: string): void => {
    console.log(message);
  },
  title: (message: string): void => {
    console.log(picocolors.bold(`\n${message}`));
  },
  divider: (): void => {
    console.log(picocolors.dim("─".repeat(40)));
  },
  newLine: (): void => {
    console.log();
  },
};
