"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_commander = require("commander");

// src/commands/init.ts
function registerInitCommand(program2) {
  program2.command("init").description("Stub: Initialize a new project with Vindsmidi UI").action(() => {
    console.log("init command (stub)");
  });
}

// src/commands/add.ts
function registerAddCommand(program2) {
  program2.command("add").description("Stub: Add components to your project").action(() => {
    console.log("add command (stub)");
  });
}

// src/commands/config.ts
function registerConfigCommand(program2) {
  program2.command("config").description("Stub: Configure Vindsmidi UI in an existing project").action(() => {
    console.log("config command (stub)");
  });
}

// src/commands/dev.ts
function registerDevCommand(program2) {
  program2.command("dev").description("Stub: Start development server").action(() => {
    console.log("dev command (stub)");
  });
}

// src/utils/logger.ts
var import_chalk = __toESM(require("chalk"));
var import_picocolors = __toESM(require("picocolors"));
var logger = {
  info: (message) => {
    console.log(`${import_picocolors.default.blue("info")} ${message}`);
  },
  success: (message) => {
    console.log(`${import_picocolors.default.green("success")} ${message}`);
  },
  warn: (message) => {
    console.log(`${import_picocolors.default.yellow("warn")} ${message}`);
  },
  error: (message) => {
    console.log(`${import_picocolors.default.red("error")} ${message}`);
  },
  debug: (message) => {
    if (process.env.DEBUG) {
      console.log(`${import_picocolors.default.magenta("debug")} ${message}`);
    }
  },
  log: (message) => {
    console.log(message);
  },
  title: (message) => {
    console.log(import_chalk.default.bold(`
${message}`));
  },
  divider: () => {
    console.log(import_chalk.default.dim("\u2500".repeat(40)));
  },
  newLine: () => {
    console.log();
  }
};

// src/index.ts
var program = new import_commander.Command();
program.name("vindsmidi").description("CLI tool for Vindsmidi UI (Fluent UI + Tailwind CSS 4.0)").version("0.1.0");
registerInitCommand(program);
registerAddCommand(program);
registerConfigCommand(program);
registerDevCommand(program);
program.command("test-logger").description("Test the logger utility").action(() => {
  logger.title("Logger Test");
  logger.info("This is an info message");
  logger.success("This is a success message");
  logger.warn("This is a warning message");
  logger.error("This is an error message");
  logger.divider();
  logger.log("This is a regular log message");
});
program.exitOverride((err) => {
  if (err.code === "commander.help") {
    process.exit(0);
  }
  logger.error(err.message);
  process.exit(1);
});
program.parse(process.argv);
