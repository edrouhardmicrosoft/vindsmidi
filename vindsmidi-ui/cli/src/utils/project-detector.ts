import fs from "fs-extra";
import path from "path";
import { logger } from "./logger";

export interface ProjectInfo {
  framework: "react" | "next" | "vite" | "remix" | "unknown";
  packageManager: "npm" | "yarn" | "pnpm" | "unknown";
  hasTypeScript: boolean;
  hasTailwind: boolean;
  sourceDir: string;
  componentsDir: string;
}

/**
 * Detects the framework and structure of a project
 */
export async function detectProject(dir: string): Promise<ProjectInfo> {
  try {
    const packageJsonPath = path.join(dir, "package.json");
    const hasPackageJson = await fs.pathExists(packageJsonPath);

    if (!hasPackageJson) {
      throw new Error("No package.json found in the specified directory");
    }

    const packageJson = await fs.readJson(packageJsonPath);

    // Detect framework
    let framework: ProjectInfo["framework"] = "unknown";
    if (packageJson.dependencies?.next) {
      framework = "next";
    } else if (packageJson.dependencies?.remix) {
      framework = "remix";
    } else if (
      packageJson.dependencies?.["@vitejs/plugin-react"] ||
      packageJson.devDependencies?.["@vitejs/plugin-react"]
    ) {
      framework = "vite";
    } else if (packageJson.dependencies?.react) {
      framework = "react";
    }

    // Detect package manager
    let packageManager: ProjectInfo["packageManager"] = "npm";
    if (await fs.pathExists(path.join(dir, "yarn.lock"))) {
      packageManager = "yarn";
    } else if (await fs.pathExists(path.join(dir, "pnpm-lock.yaml"))) {
      packageManager = "pnpm";
    }

    // Detect TypeScript
    const hasTypeScript = !!(
      packageJson.dependencies?.typescript ||
      packageJson.devDependencies?.typescript ||
      (await fs.pathExists(path.join(dir, "tsconfig.json")))
    );

    // Detect Tailwind
    const hasTailwind = !!(
      packageJson.dependencies?.tailwindcss ||
      packageJson.devDependencies?.tailwindcss
    );

    // Determine source directory based on framework
    let sourceDir = "src";
    let componentsDir = "src/components";

    if (framework === "next") {
      // Check for src directory in Next.js
      const hasSrcDir = await fs.pathExists(path.join(dir, "src"));
      sourceDir = hasSrcDir ? "src" : ".";
      componentsDir = path.join(sourceDir, "components");
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
      componentsDir,
    };
  } catch (error) {
    logger.error(
      `Failed to detect project: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    throw error;
  }
}
