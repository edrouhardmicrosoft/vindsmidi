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
    
    // Check for Next.js - also check devDependencies
    if (packageJson.dependencies?.next || packageJson.devDependencies?.next) {
      framework = "next";
    } 
    // Check for Remix - also check devDependencies
    else if (packageJson.dependencies?.remix || packageJson.devDependencies?.remix || 
             packageJson.dependencies?.["@remix-run/react"] || packageJson.devDependencies?.["@remix-run/react"]) {
      framework = "remix";
    } 
    // Check for Vite with React
    else if (
      (packageJson.dependencies?.["@vitejs/plugin-react"] || packageJson.devDependencies?.["@vitejs/plugin-react"]) &&
      (packageJson.dependencies?.react || packageJson.devDependencies?.react)
    ) {
      framework = "vite";
    } 
    // Check for React without Vite
    else if (packageJson.dependencies?.react || packageJson.devDependencies?.react) {
      // Check if it might be a Create React App project
      if (packageJson.dependencies?.["react-scripts"] || packageJson.devDependencies?.["react-scripts"]) {
        framework = "react";
      } else {
        framework = "react";
      }
    }

    // Also check the package.json scripts for further clarification
    if (packageJson.scripts) {
      if (framework === "unknown" && packageJson.scripts.dev?.includes("vite")) {
        framework = "vite";
      } else if (framework === "unknown" && packageJson.scripts.start?.includes("react-scripts")) {
        framework = "react";
      } else if (framework === "unknown" && packageJson.scripts.dev?.includes("next")) {
        framework = "next";
      }
    }

    // Detect package manager
    let packageManager: ProjectInfo["packageManager"] = "npm";
    
    // Check for specific lock files
    if (await fs.pathExists(path.join(dir, "yarn.lock"))) {
      packageManager = "yarn";
    } else if (await fs.pathExists(path.join(dir, "pnpm-lock.yaml"))) {
      packageManager = "pnpm";
    } else if (await fs.pathExists(path.join(dir, "package-lock.json"))) {
      packageManager = "npm";
    } else {
      // If no lock file found, try to detect by looking at the node_modules/.bin directory
      // This might help in cases where the lock file is gitignored but node_modules is present
      const yarnBin = path.join(dir, "node_modules", ".bin", "yarn");
      const pnpmBin = path.join(dir, "node_modules", ".bin", "pnpm");
      
      if (await fs.pathExists(yarnBin)) {
        packageManager = "yarn";
      } else if (await fs.pathExists(pnpmBin)) {
        packageManager = "pnpm";
      }
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
      
      // Check for app directory (App Router) vs pages directory (Pages Router)
      const hasAppDir = await fs.pathExists(path.join(dir, sourceDir, "app"));
      const hasPagesDir = await fs.pathExists(path.join(dir, sourceDir, "pages"));
      
      if (hasAppDir) {
        // App Router - components typically in src/app/_components or src/components
        const appComponentsDir = path.join(sourceDir, "app", "_components");
        if (await fs.pathExists(path.join(dir, appComponentsDir))) {
          componentsDir = appComponentsDir;
        } else {
          componentsDir = path.join(sourceDir, "components");
        }
      } else if (hasPagesDir) {
        // Pages Router - components typically in src/components or components
        componentsDir = path.join(sourceDir, "components");
      } else {
        componentsDir = path.join(sourceDir, "components");
      }
    } else if (framework === "remix") {
      // Remix can have different structures
      const hasAppDir = await fs.pathExists(path.join(dir, "app"));
      sourceDir = hasAppDir ? "app" : "src";
      componentsDir = path.join(sourceDir, "components");
    } else {
      // Check for custom component directories in other frameworks
      const possibleComponentDirs = [
        path.join(sourceDir, "components"),
        "components",
        path.join(sourceDir, "ui"),
        path.join(sourceDir, "ui", "components"),
      ];
      
      for (const possibleDir of possibleComponentDirs) {
        if (await fs.pathExists(path.join(dir, possibleDir))) {
          componentsDir = possibleDir;
          break;
        }
      }
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
