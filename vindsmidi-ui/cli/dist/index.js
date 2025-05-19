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
var import_path4 = __toESM(require("path"));
var import_ora = __toESM(require("ora"));
var import_execa = require("execa");

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

// src/utils/prompt.ts
var import_inquirer = __toESM(require("inquirer"));
async function promptInit(defaultProjectName) {
  return import_inquirer.default.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: defaultProjectName,
      validate: (input) => input.trim() !== "" || "Project name is required"
    },
    {
      type: "list",
      name: "framework",
      message: "Select a framework:",
      choices: [
        { name: "React", value: "react" },
        { name: "Next.js", value: "next" },
        { name: "React + Vite", value: "vite" },
        { name: "Remix", value: "remix" }
      ],
      default: "react"
    },
    {
      type: "confirm",
      name: "typescript",
      message: "Use TypeScript?",
      default: true
    },
    {
      type: "list",
      name: "packageManager",
      message: "Select a package manager:",
      choices: [
        { name: "npm", value: "npm" },
        { name: "yarn", value: "yarn" },
        { name: "pnpm", value: "pnpm" }
      ],
      default: "npm"
    },
    {
      type: "checkbox",
      name: "components",
      message: "Select components to include:",
      choices: [
        { name: "Button", value: "button", checked: true },
        { name: "Card", value: "card", checked: true },
        { name: "Input", value: "input" },
        { name: "Checkbox", value: "checkbox" }
      ]
    }
  ]);
}

// src/utils/project-template-manager.ts
var import_path2 = __toESM(require("path"));
var import_fs_extra3 = __toESM(require("fs-extra"));

// src/utils/template.ts
var import_lodash = __toESM(require("lodash.template"));
var import_fs_extra2 = __toESM(require("fs-extra"));

// src/utils/fs.ts
var import_fs_extra = __toESM(require("fs-extra"));
var import_path = __toESM(require("path"));
async function writeFile(filePath, content) {
  try {
    await import_fs_extra.default.ensureDir(import_path.default.dirname(filePath));
    await import_fs_extra.default.writeFile(filePath, content);
    logger.debug(`Wrote file: ${filePath}`);
  } catch (error) {
    logger.error(`Failed to write file: ${filePath}`);
    throw error;
  }
}
async function fileExists(filePath) {
  try {
    return await import_fs_extra.default.pathExists(filePath);
  } catch (error) {
    return false;
  }
}

// src/utils/template.ts
async function renderTemplate(templatePath, outputPath, data = {}, options = {}) {
  try {
    if (!options.overwrite && await fileExists(outputPath)) {
      logger.warn(`File already exists (skipping): ${outputPath}`);
      return;
    }
    const templateContent = await import_fs_extra2.default.readFile(templatePath, "utf8");
    const compile = (0, import_lodash.default)(templateContent);
    const rendered = compile(data);
    await writeFile(outputPath, rendered);
    logger.debug(`Rendered template: ${templatePath} -> ${outputPath}`);
  } catch (error) {
    logger.error(`Failed to render template: ${templatePath} -> ${outputPath}`);
    throw error;
  }
}

// src/utils/project-template-manager.ts
async function getProjectTemplate(framework) {
  const templatePath = import_path2.default.resolve(
    __dirname,
    "..",
    "..",
    "templates",
    "init",
    framework,
    "template.json"
  );
  try {
    return await import_fs_extra3.default.readJson(templatePath);
  } catch (error) {
    logger.error(`Template not found for framework: ${framework}`);
    throw new Error(`Template not found for framework: ${framework}`);
  }
}
async function createProject(projectDir, framework, options) {
  const template = await getProjectTemplate(framework);
  await import_fs_extra3.default.ensureDir(projectDir);
  const templateBasePath = import_path2.default.resolve(
    __dirname,
    "..",
    "..",
    "templates",
    "init",
    framework
  );
  for (const file of template.files) {
    const sourcePath = import_path2.default.join(templateBasePath, file.source);
    const targetPath = import_path2.default.join(projectDir, file.target);
    if (!await import_fs_extra3.default.pathExists(sourcePath)) {
      logger.warn(`Template file not found: ${file.source}`);
      continue;
    }
    await renderTemplate(sourcePath, targetPath, {
      projectName: options.projectName,
      typescript: options.typescript,
      packageManager: options.packageManager
    });
    logger.success(`Created: ${file.target}`);
  }
}

// src/registry/components.ts
var components = [
  {
    name: "button",
    description: "Interactive button component with various styles",
    category: "input",
    dependencies: [
      { name: "cn", type: "utility" },
      { name: "useFluentButton", type: "hook" }
    ],
    files: [
      {
        name: "button.tsx",
        path: "components/ui/button/button.tsx",
        template: "components/button/button.tsx.template"
      },
      {
        name: "button.types.ts",
        path: "components/ui/button/button.types.ts",
        template: "components/button/button.types.ts.template"
      },
      {
        name: "variants.ts",
        path: "components/ui/button/variants.ts",
        template: "components/button/variants.ts.template"
      },
      {
        name: "index.ts",
        path: "components/ui/button/index.ts",
        template: "components/button/index.ts.template"
      }
    ],
    hooks: ["useFluentButton"]
  },
  {
    name: "card",
    description: "Surface container for grouping related content",
    category: "layout",
    dependencies: [{ name: "cn", type: "utility" }],
    files: [
      {
        name: "card.tsx",
        path: "components/ui/card/card.tsx",
        template: "components/card/card.tsx.template"
      },
      {
        name: "card.types.ts",
        path: "components/ui/card/card.types.ts",
        template: "components/card/card.types.ts.template"
      },
      {
        name: "index.ts",
        path: "components/ui/card/index.ts",
        template: "components/card/index.ts.template"
      }
    ]
  }
];
function getComponent(name) {
  return components.find((c) => c.name === name);
}
function getComponents(names) {
  return names.map((name) => {
    const component = getComponent(name);
    if (!component) {
      throw new Error(`Component not found: ${name}`);
    }
    return component;
  });
}
function getComponentNames() {
  return components.map((c) => c.name);
}

// src/utils/dependency-resolver.ts
function resolveDependencies(components2) {
  const resolvedComponents = /* @__PURE__ */ new Map();
  const unresolvedDependencies = /* @__PURE__ */ new Map();
  components2.forEach((component) => {
    resolvedComponents.set(component.name, component);
  });
  components2.forEach((component) => {
    component.dependencies.forEach((dep) => {
      if (dep.type === "component" && !resolvedComponents.has(dep.name)) {
        unresolvedDependencies.set(dep.name, dep);
      }
    });
  });
  let hasNewDependencies = true;
  while (hasNewDependencies) {
    hasNewDependencies = false;
    for (const [name, dep] of unresolvedDependencies.entries()) {
      if (resolvedComponents.has(name)) {
        unresolvedDependencies.delete(name);
        continue;
      }
      const component = getComponent(name);
      if (!component) {
        if (dep.optional) {
          logger.warn(`Optional dependency not found: ${name}`);
          unresolvedDependencies.delete(name);
        } else {
          throw new Error(`Required dependency not found: ${name}`);
        }
        continue;
      }
      resolvedComponents.set(name, component);
      unresolvedDependencies.delete(name);
      hasNewDependencies = true;
      component.dependencies.forEach((newDep) => {
        if (newDep.type === "component" && !resolvedComponents.has(newDep.name)) {
          unresolvedDependencies.set(newDep.name, newDep);
        }
      });
    }
  }
  return Array.from(resolvedComponents.values());
}

// src/utils/template-manager.ts
var import_path3 = __toESM(require("path"));
var import_fs_extra4 = __toESM(require("fs-extra"));
function getTemplatePath(templateName) {
  return import_path3.default.resolve(__dirname, "..", "..", "templates", templateName);
}
async function installComponent(component, targetDir, options = {}) {
  logger.info(`Installing component: ${component.name}`);
  for (const file of component.files) {
    const templatePath = getTemplatePath(file.template);
    const outputPath = import_path3.default.join(targetDir, file.path);
    if (!await import_fs_extra4.default.pathExists(templatePath)) {
      logger.warn(`Template not found: ${file.template}`);
      continue;
    }
    await renderTemplate(
      templatePath,
      outputPath,
      {
        componentName: component.name
        // Additional template variables would go here
      },
      { overwrite: options.overwrite || file.overwritable }
    );
    logger.success(`Installed: ${file.name}`);
  }
  logger.success(`Component ${component.name} installed successfully`);
}
async function installComponents(components2, targetDir, options = {}) {
  for (const component of components2) {
    await installComponent(component, targetDir, options);
  }
}

// src/commands/init.ts
function registerInitCommand(program) {
  program.command("init").description("Initialize a new project with Vindsmidi UI").argument("[name]", "Project name").option("-d, --dir <directory>", "Parent directory", process.cwd()).option("-y, --yes", "Skip prompts and use defaults", false).action(async (name, options) => {
    try {
      const defaultProjectName = name || "vindsmidi-project";
      let initOptions;
      if (options.yes) {
        initOptions = {
          projectName: defaultProjectName,
          framework: "react",
          typescript: true,
          packageManager: "npm",
          components: ["button", "card"]
        };
      } else {
        initOptions = await promptInit(defaultProjectName);
      }
      const projectDir = import_path4.default.join(options.dir, initOptions.projectName);
      const spinner = (0, import_ora.default)("Creating project...").start();
      await createProject(projectDir, initOptions.framework, {
        projectName: initOptions.projectName,
        typescript: initOptions.typescript,
        packageManager: initOptions.packageManager
      });
      spinner.succeed("Project created");
      if (initOptions.components.length) {
        spinner.text = "Installing components...";
        spinner.start();
        const components2 = getComponents(initOptions.components);
        const allComponents = resolveDependencies(components2);
        const sourceDir = initOptions.framework === "next" || initOptions.framework === "remix" ? "src" : ".";
        await installComponents(
          allComponents,
          import_path4.default.join(projectDir, sourceDir),
          {
            overwrite: true,
            installDependencies: true
          }
        );
        spinner.succeed("Components installed");
      }
      spinner.text = "Installing dependencies...";
      spinner.start();
      const installCommand = initOptions.packageManager === "yarn" ? "yarn" : initOptions.packageManager === "pnpm" ? "pnpm install" : "npm install";
      try {
        await (0, import_execa.execa)(installCommand, { cwd: projectDir, shell: true });
        spinner.succeed("Dependencies installed");
      } catch (error) {
        spinner.warn("Failed to install dependencies automatically");
        logger.info(
          `Run '${installCommand}' in the project directory to install dependencies`
        );
      }
      logger.newLine();
      logger.success(
        `Project ${initOptions.projectName} created successfully!`
      );
      logger.info(`To get started:`);
      logger.log(`  cd ${initOptions.projectName}`);
      logger.log(
        `  ${initOptions.packageManager === "yarn" ? "yarn dev" : initOptions.packageManager === "pnpm" ? "pnpm dev" : "npm run dev"}`
      );
    } catch (error) {
      (0, import_ora.default)().fail("Project creation failed");
      logger.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });
}

// src/commands/add.ts
var import_path6 = __toESM(require("path"));
var import_ora2 = __toESM(require("ora"));

// src/utils/project-detector.ts
var import_fs_extra5 = __toESM(require("fs-extra"));
var import_path5 = __toESM(require("path"));
async function detectProject(dir) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  try {
    const packageJsonPath = import_path5.default.join(dir, "package.json");
    const hasPackageJson = await import_fs_extra5.default.pathExists(packageJsonPath);
    if (!hasPackageJson) {
      throw new Error("No package.json found in the specified directory");
    }
    const packageJson = await import_fs_extra5.default.readJson(packageJsonPath);
    let framework = "unknown";
    if ((_a = packageJson.dependencies) == null ? void 0 : _a.next) {
      framework = "next";
    } else if ((_b = packageJson.dependencies) == null ? void 0 : _b.remix) {
      framework = "remix";
    } else if (((_c = packageJson.dependencies) == null ? void 0 : _c["@vitejs/plugin-react"]) || ((_d = packageJson.devDependencies) == null ? void 0 : _d["@vitejs/plugin-react"])) {
      framework = "vite";
    } else if ((_e = packageJson.dependencies) == null ? void 0 : _e.react) {
      framework = "react";
    }
    let packageManager = "npm";
    if (await import_fs_extra5.default.pathExists(import_path5.default.join(dir, "yarn.lock"))) {
      packageManager = "yarn";
    } else if (await import_fs_extra5.default.pathExists(import_path5.default.join(dir, "pnpm-lock.yaml"))) {
      packageManager = "pnpm";
    }
    const hasTypeScript = !!(((_f = packageJson.dependencies) == null ? void 0 : _f.typescript) || ((_g = packageJson.devDependencies) == null ? void 0 : _g.typescript) || await import_fs_extra5.default.pathExists(import_path5.default.join(dir, "tsconfig.json")));
    const hasTailwind = !!(((_h = packageJson.dependencies) == null ? void 0 : _h.tailwindcss) || ((_i = packageJson.devDependencies) == null ? void 0 : _i.tailwindcss));
    let sourceDir = "src";
    let componentsDir = "src/components";
    if (framework === "next") {
      const hasSrcDir = await import_fs_extra5.default.pathExists(import_path5.default.join(dir, "src"));
      sourceDir = hasSrcDir ? "src" : ".";
      componentsDir = import_path5.default.join(sourceDir, "components");
    } else if (framework === "remix") {
      sourceDir = "app";
      componentsDir = "app/components";
    }
    return {
      framework,
      packageManager,
      hasTypeScript,
      hasTailwind,
      sourceDir,
      componentsDir
    };
  } catch (error) {
    logger.error(
      `Failed to detect project: ${error instanceof Error ? error.message : String(error)}`
    );
    throw error;
  }
}

// src/commands/add.ts
function registerAddCommand(program) {
  program.command("add").description("Add components to your project").argument("[components...]", "Component names to add").option("-d, --dir <directory>", "Target directory", process.cwd()).option("-f, --force", "Overwrite existing files", false).option("--no-deps", "Skip installing dependencies", false).action(async (componentNames, options) => {
    try {
      if (!componentNames.length) {
        logger.title("Available Components");
        const names = getComponentNames();
        names.forEach((name) => logger.log(`- ${name}`));
        logger.newLine();
        logger.info(`Run 'vindsmidi add <component>' to add a component`);
        return;
      }
      const spinner = (0, import_ora2.default)("Analyzing project...").start();
      const projectInfo = await detectProject(options.dir);
      spinner.succeed("Project analyzed");
      logger.info(`Detected framework: ${projectInfo.framework}`);
      logger.info(
        `Using TypeScript: ${projectInfo.hasTypeScript ? "Yes" : "No"}`
      );
      logger.info(`Tailwind CSS: ${projectInfo.hasTailwind ? "Yes" : "No"}`);
      spinner.text = "Resolving components...";
      spinner.start();
      const components2 = getComponents(componentNames);
      const allComponents = options.deps ? resolveDependencies(components2) : components2;
      spinner.succeed(`Resolved ${allComponents.length} components`);
      spinner.text = "Installing components...";
      spinner.start();
      const targetDir = import_path6.default.join(options.dir, projectInfo.sourceDir);
      await installComponents(allComponents, targetDir, {
        overwrite: options.force,
        installDependencies: options.deps
      });
      spinner.succeed("Components installed successfully");
      logger.title("Usage Example");
      if (componentNames.includes("button")) {
        logger.log(`
import { Button } from './${import_path6.default.relative(
          projectInfo.sourceDir,
          import_path6.default.join(projectInfo.componentsDir, "ui", "button")
        )}';

// Basic usage
<Button>Click me</Button>

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
          `);
      }
    } catch (error) {
      (0, import_ora2.default)().fail("Installation failed");
      logger.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });
}

// src/commands/config.ts
var import_ora3 = __toESM(require("ora"));
var import_inquirer2 = __toESM(require("inquirer"));

// src/utils/configure-tailwind.ts
var import_path7 = __toESM(require("path"));
var import_fs_extra6 = __toESM(require("fs-extra"));
async function configureTailwind(projectDir, options = {}) {
  var _a;
  const jsConfigPath = import_path7.default.join(projectDir, "tailwind.config.js");
  const tsConfigPath = import_path7.default.join(projectDir, "tailwind.config.ts");
  let configPath = "";
  let isTypeScript = false;
  if (await import_fs_extra6.default.pathExists(tsConfigPath)) {
    configPath = tsConfigPath;
    isTypeScript = true;
  } else if (await import_fs_extra6.default.pathExists(jsConfigPath)) {
    configPath = jsConfigPath;
  } else {
    configPath = jsConfigPath;
    const baseConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;
    await import_fs_extra6.default.writeFile(configPath, baseConfig);
    logger.success("Created tailwind.config.js");
  }
  const configContent = await import_fs_extra6.default.readFile(configPath, "utf8");
  let updatedContent = configContent;
  if ((_a = options.componentPaths) == null ? void 0 : _a.length) {
    const pathsString = options.componentPaths.map((p) => `"${p}"`).join(",\n      ");
    if (updatedContent.includes("content: [")) {
      updatedContent = updatedContent.replace(
        "content: [",
        `content: [
      ${pathsString},`
      );
    }
  }
  if (options.fluentTokens) {
    const tokensSnippet = `
  theme: {
    extend: {
      colors: {
        // Fluent UI color tokens
        brand: 'var(--fluent-color-brand-background)',
        'brand-hover': 'var(--fluent-color-brand-background-hover)',
        'brand-pressed': 'var(--fluent-color-brand-background-pressed)',
        'neutral-background': 'var(--fluent-color-neutral-background-1)',
        'neutral-foreground': 'var(--fluent-color-neutral-foreground-1)',
      },
      spacing: {
        // Fluent UI spacing tokens
        'fluent-xxs': 'var(--fluent-spacing-xxs)',
        'fluent-xs': 'var(--fluent-spacing-xs)',
        'fluent-s': 'var(--fluent-spacing-s)',
        'fluent-m': 'var(--fluent-spacing-m)',
        'fluent-l': 'var(--fluent-spacing-l)',
        'fluent-xl': 'var(--fluent-spacing-xl)',
        'fluent-xxl': 'var(--fluent-spacing-xxl)',
      },
      borderRadius: {
        // Fluent UI border radius tokens
        'fluent-none': 'var(--fluent-border-radius-none)',
        'fluent-small': 'var(--fluent-border-radius-small)',
        'fluent-medium': 'var(--fluent-border-radius-medium)',
        'fluent-large': 'var(--fluent-border-radius-large)',
        'fluent-xlarge': 'var(--fluent-border-radius-xlarge)',
        'fluent-circular': 'var(--fluent-border-radius-circular)',
      },
    },
  },`;
    if (updatedContent.includes("theme: {")) {
      updatedContent = updatedContent.replace(
        /theme:\s*\{[^}]*\}/s,
        tokensSnippet
      );
    } else {
      updatedContent = updatedContent.replace(
        "export default {",
        `export default {
${tokensSnippet}`
      );
    }
  }
  if (options.darkMode) {
    if (updatedContent.includes("darkMode:")) {
      updatedContent = updatedContent.replace(
        /darkMode:\s*['"]?[^,\n]*['"]?/,
        `darkMode: '${options.darkMode}'`
      );
    } else {
      updatedContent = updatedContent.replace(
        "export default {",
        `export default {
  darkMode: '${options.darkMode}',`
      );
    }
  }
  await import_fs_extra6.default.writeFile(configPath, updatedContent);
  logger.success(`Updated ${import_path7.default.basename(configPath)}`);
}

// src/utils/generate-tokens.ts
var import_path8 = __toESM(require("path"));
var import_fs_extra7 = __toESM(require("fs-extra"));
async function generateTokenCss(projectDir, options = {}) {
  const outputPath = options.outputPath || import_path8.default.join(projectDir, "src", "styles", "fluent-tokens.css");
  const format = options.format || "css";
  const tokenCss = `/**
 * Fluent UI Design Tokens
 * Generated by Vindsmidi CLI
 */

:root {
  /* Brand Colors */
  --fluent-color-brand-background: #0f6cbd;
  --fluent-color-brand-background-hover: #115ea3;
  --fluent-color-brand-background-pressed: #0e4775;
  --fluent-color-brand-background-selected: #115ea3;
  
  /* Neutral Colors */
  --fluent-color-neutral-foreground-1: #242424;
  --fluent-color-neutral-foreground-2: #424242;
  --fluent-color-neutral-foreground-3: #616161;
  --fluent-color-neutral-foreground-disabled: #bdbdbd;
  
  --fluent-color-neutral-background-1: #ffffff;
  --fluent-color-neutral-background-2: #fafafa;
  --fluent-color-neutral-background-3: #f5f5f5;
  --fluent-color-neutral-background-4: #f0f0f0;
  --fluent-color-neutral-background-disabled: #f0f0f0;
  
  --fluent-color-neutral-stroke-1: #d1d1d1;
  --fluent-color-neutral-stroke-2: #e0e0e0;
  --fluent-color-neutral-stroke-3: #f0f0f0;
  --fluent-color-neutral-stroke-disabled: #e0e0e0;
  
  /* Border Radius */
  --fluent-border-radius-none: 0;
  --fluent-border-radius-small: 2px;
  --fluent-border-radius-medium: 4px;
  --fluent-border-radius-large: 6px;
  --fluent-border-radius-xlarge: 8px;
  --fluent-border-radius-circular: 9999px;
  
  /* Spacing */
  --fluent-spacing-xxs: 2px;
  --fluent-spacing-xs: 4px;
  --fluent-spacing-s: 8px;
  --fluent-spacing-m: 12px;
  --fluent-spacing-l: 16px;
  --fluent-spacing-xl: 20px;
  --fluent-spacing-xxl: 24px;
  --fluent-spacing-xxxl: 32px;
}

/* Dark Mode */
.dark-theme {
  --fluent-color-neutral-foreground-1: #ffffff;
  --fluent-color-neutral-foreground-2: #d6d6d6;
  --fluent-color-neutral-foreground-3: #adadad;
  --fluent-color-neutral-foreground-disabled: #616161;
  
  --fluent-color-neutral-background-1: #1a1a1a;
  --fluent-color-neutral-background-2: #242424;
  --fluent-color-neutral-background-3: #2e2e2e;
  --fluent-color-neutral-background-4: #383838;
  --fluent-color-neutral-background-disabled: #242424;
  
  --fluent-color-neutral-stroke-1: #575757;
  --fluent-color-neutral-stroke-2: #424242;
  --fluent-color-neutral-stroke-3: #383838;
  --fluent-color-neutral-stroke-disabled: #424242;
}
`;
  await import_fs_extra7.default.ensureDir(import_path8.default.dirname(outputPath));
  await import_fs_extra7.default.writeFile(outputPath, tokenCss);
  logger.success(
    `Generated token CSS at ${import_path8.default.relative(process.cwd(), outputPath)}`
  );
  const mainCssPath = import_path8.default.join(import_path8.default.dirname(outputPath), "main.css");
  if (await import_fs_extra7.default.pathExists(mainCssPath)) {
    const mainCss = await import_fs_extra7.default.readFile(mainCssPath, "utf8");
    if (!mainCss.includes("fluent-tokens.css")) {
      const updatedMainCss = `@import "./fluent-tokens.css";
${mainCss}`;
      await import_fs_extra7.default.writeFile(mainCssPath, updatedMainCss);
      logger.success("Updated main.css to import token CSS");
    }
  }
}

// src/commands/config.ts
function registerConfigCommand(program) {
  program.command("config").description("Configure Vindsmidi UI in an existing project").option("-d, --dir <directory>", "Target directory", process.cwd()).option("--tailwind", "Configure Tailwind CSS").option("--tokens", "Generate Fluent UI token CSS").option("--dark-mode <mode>", "Configure dark mode (class or media)").option("-y, --yes", "Skip prompts and use defaults", false).action(async (options) => {
    try {
      const spinner = (0, import_ora3.default)("Analyzing project...").start();
      const projectInfo = await detectProject(options.dir);
      spinner.succeed("Project analyzed");
      logger.info(`Detected framework: ${projectInfo.framework}`);
      logger.info(
        `Using TypeScript: ${projectInfo.hasTypeScript ? "Yes" : "No"}`
      );
      logger.info(`Tailwind CSS: ${projectInfo.hasTailwind ? "Yes" : "No"}`);
      if (!options.tailwind && !options.tokens && !options.darkMode && !options.yes) {
        const answers = await import_inquirer2.default.prompt([
          {
            type: "checkbox",
            name: "actions",
            message: "What would you like to configure?",
            choices: [
              {
                name: "Configure Tailwind CSS",
                value: "tailwind",
                checked: true
              },
              {
                name: "Generate Fluent UI token CSS",
                value: "tokens",
                checked: true
              },
              { name: "Configure dark mode", value: "darkMode" }
            ]
          },
          {
            type: "list",
            name: "darkMode",
            message: "Select dark mode strategy:",
            choices: [
              { name: "Class (.dark-theme)", value: "class" },
              { name: "Media query (prefers-color-scheme)", value: "media" }
            ],
            when: (answers2) => answers2.actions.includes("darkMode")
          }
        ]);
        options.tailwind = answers.actions.includes("tailwind");
        options.tokens = answers.actions.includes("tokens");
        options.darkMode = answers.actions.includes("darkMode") ? answers.darkMode : void 0;
      }
      if (options.tailwind || options.yes) {
        spinner.text = "Configuring Tailwind CSS...";
        spinner.start();
        await configureTailwind(options.dir, {
          fluentTokens: true,
          componentPaths: [
            `./src/components/**/*.{js,ts,jsx,tsx}`,
            `./components/**/*.{js,ts,jsx,tsx}`
          ],
          darkMode: options.darkMode
        });
        spinner.succeed("Tailwind CSS configured");
      }
      if (options.tokens || options.yes) {
        spinner.text = "Generating Fluent UI tokens...";
        spinner.start();
        await generateTokenCss(options.dir);
        spinner.succeed("Fluent UI tokens generated");
      }
      logger.success("Configuration completed successfully!");
    } catch (error) {
      (0, import_ora3.default)().fail("Configuration failed");
      logger.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });
}

// src/commands/dev.ts
var import_execa2 = require("execa");
var import_ora4 = __toESM(require("ora"));
function registerDevCommand(program) {
  program.command("dev").description("Start development server").option("-d, --dir <directory>", "Target directory", process.cwd()).action(async (options) => {
    var _a, _b;
    try {
      const spinner = (0, import_ora4.default)("Analyzing project...").start();
      const projectInfo = await detectProject(options.dir);
      spinner.succeed("Project analyzed");
      logger.info(`Starting ${projectInfo.framework} development server...`);
      const devCommand = projectInfo.packageManager === "yarn" ? "yarn dev" : projectInfo.packageManager === "pnpm" ? "pnpm dev" : "npm run dev";
      const child = (0, import_execa2.execa)(devCommand, { cwd: options.dir, shell: true });
      (_a = child.stdout) == null ? void 0 : _a.pipe(process.stdout);
      (_b = child.stderr) == null ? void 0 : _b.pipe(process.stderr);
      child.on("exit", (code) => {
        if (code !== 0) {
          logger.error(`Development server exited with code ${code}`);
          process.exit(code || 1);
        }
      });
      await child;
    } catch (error) {
      (0, import_ora4.default)().fail("Failed to start development server");
      logger.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });
}

// src/commands/doctor.ts
var import_path9 = __toESM(require("path"));
var import_fs_extra8 = __toESM(require("fs-extra"));
function registerDoctorCommand(program) {
  program.command("doctor").description("Check CLI setup and diagnose issues").action(async () => {
    var _a;
    logger.title("CLI Setup Diagnostics");
    const templatesDir = import_path9.default.resolve(__dirname, "..", "..", "templates");
    const hasTemplatesDir = await import_fs_extra8.default.pathExists(templatesDir);
    if (hasTemplatesDir) {
      logger.success(`\u2713 Templates directory exists: ${templatesDir}`);
    } else {
      logger.error(`\u2717 Templates directory missing: ${templatesDir}`);
    }
    for (const framework of ["react", "next", "vite", "remix"]) {
      const frameworkDir = import_path9.default.join(templatesDir, "init", framework);
      const hasFrameworkDir = await import_fs_extra8.default.pathExists(frameworkDir);
      if (hasFrameworkDir) {
        logger.success(`\u2713 Framework templates exist: ${framework}`);
        const templateJson = import_path9.default.join(frameworkDir, "template.json");
        if (await import_fs_extra8.default.pathExists(templateJson)) {
          try {
            const template = await import_fs_extra8.default.readJson(templateJson);
            const fileCount = ((_a = template.files) == null ? void 0 : _a.length) || 0;
            logger.success(`  \u2713 template.json valid with ${fileCount} files`);
            let missingCount = 0;
            for (const file of template.files || []) {
              const filePath = import_path9.default.join(frameworkDir, file.source);
              if (!await import_fs_extra8.default.pathExists(filePath)) {
                logger.warn(`  \u2717 Missing template file: ${file.source}`);
                missingCount++;
              }
            }
            if (missingCount === 0) {
              logger.success(`  \u2713 All template files present`);
            }
          } catch (err) {
            if (err instanceof Error) {
              logger.error(`  \u2717 Invalid template.json: ${err.message}`);
            } else {
              logger.error(`  \u2717 Invalid template.json: ${String(err)}`);
            }
          }
        } else {
          logger.error(`  \u2717 Missing template.json`);
        }
      } else {
        logger.warn(`! Framework templates missing: ${framework}`);
      }
    }
  });
}

// src/utils/setup-templates.ts
var import_fs_extra9 = __toESM(require("fs-extra"));
var import_path10 = __toESM(require("path"));
async function ensureTemplates() {
  const templatesDir = import_path10.default.resolve(__dirname, "..", "..", "templates");
  const frameworks = ["react", "next", "vite", "remix"];
  for (const framework of frameworks) {
    const frameworkDir = import_path10.default.join(templatesDir, "init", framework);
    await import_fs_extra9.default.ensureDir(frameworkDir);
    const templateJsonPath = import_path10.default.join(frameworkDir, "template.json");
    if (!await import_fs_extra9.default.pathExists(templateJsonPath)) {
      await import_fs_extra9.default.writeJson(
        templateJsonPath,
        {
          files: [
            { source: "package.json.template", target: "package.json" },
            { source: "vite.config.ts.template", target: "vite.config.ts" },
            {
              source: "tailwind.config.js.template",
              target: "tailwind.config.js"
            },
            {
              source: "src/styles/main.css.template",
              target: "src/styles/main.css"
            },
            { source: "src/App.tsx.template", target: "src/App.tsx" },
            { source: "src/main.tsx.template", target: "src/main.tsx" },
            {
              source: "src/utilities/classNames.ts.template",
              target: "src/utilities/classNames.ts"
            },
            {
              source: "src/utilities/index.ts.template",
              target: "src/utilities/index.ts"
            }
          ]
        },
        { spaces: 2 }
      );
      logger.debug(`Created template definition: ${templateJsonPath}`);
    }
    const filesToCreate = [
      "package.json.template",
      "vite.config.ts.template",
      "tailwind.config.js.template",
      "src/styles/main.css.template",
      "src/App.tsx.template",
      "src/main.tsx.template",
      "src/utilities/classNames.ts.template",
      "src/utilities/index.ts.template"
    ];
    for (const relPath of filesToCreate) {
      const filePath = import_path10.default.join(frameworkDir, relPath);
      await import_fs_extra9.default.ensureDir(import_path10.default.dirname(filePath));
      if (!await import_fs_extra9.default.pathExists(filePath)) {
        await import_fs_extra9.default.writeFile(filePath, `// Placeholder for ${relPath}`);
        logger.debug(`Created placeholder template: ${filePath}`);
      }
    }
  }
}

// src/index.ts
(async () => {
  await ensureTemplates().catch((err) => {
    logger.error(`Failed to initialize templates: ${err.message}`);
    process.exit(1);
  });
  const program = new import_commander.Command();
  program.name("vui").description(
    "VUI CLI: Fast Fluent UI + Tailwind CSS 4.0 project and component generator"
  ).version("0.1.0");
  registerInitCommand(program);
  registerAddCommand(program);
  registerConfigCommand(program);
  registerDevCommand(program);
  registerDoctorCommand(program);
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
})();
