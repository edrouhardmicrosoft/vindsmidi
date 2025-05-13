import inquirer from "inquirer";

export interface InitOptions {
  projectName: string;
  framework: "react" | "next" | "vite" | "remix";
  typescript: boolean;
  packageManager: "npm" | "yarn" | "pnpm";
  components: string[];
}

/**
 * Prompts for project initialization options
 */
export async function promptInit(
  defaultProjectName: string
): Promise<InitOptions> {
  return inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: defaultProjectName,
      validate: (input) => input.trim() !== "" || "Project name is required",
    },
    {
      type: "list",
      name: "framework",
      message: "Select a framework:",
      choices: [
        { name: "React", value: "react" },
        { name: "Next.js", value: "next" },
        { name: "React + Vite", value: "vite" },
        { name: "Remix", value: "remix" },
      ],
      default: "react",
    },
    {
      type: "confirm",
      name: "typescript",
      message: "Use TypeScript?",
      default: true,
    },
    {
      type: "list",
      name: "packageManager",
      message: "Select a package manager:",
      choices: [
        { name: "npm", value: "npm" },
        { name: "yarn", value: "yarn" },
        { name: "pnpm", value: "pnpm" },
      ],
      default: "npm",
    },
    {
      type: "checkbox",
      name: "components",
      message: "Select components to include:",
      choices: [
        { name: "Button", value: "button", checked: true },
        { name: "Card", value: "card", checked: true },
        { name: "Input", value: "input" },
        { name: "Checkbox", value: "checkbox" },
      ],
    },
  ]);
}
