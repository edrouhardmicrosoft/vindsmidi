import fs from "fs-extra";
import path from "path";
import { logger } from "./logger";

/**
 * Ensures a directory exists, creating it if necessary
 */
export async function ensureDirectory(dirPath: string): Promise<void> {
  try {
    await fs.ensureDir(dirPath);
  } catch (error) {
    logger.error(`Failed to create directory: ${dirPath}`);
    throw error;
  }
}

/**
 * Copy a file with template processing
 */
export async function copyFile(
  source: string,
  destination: string,
  variables: Record<string, any> = {}
): Promise<void> {
  try {
    await fs.ensureDir(path.dirname(destination));

    const content = await fs.readFile(source, "utf8");
    // Future enhancement: process template variables
    await fs.writeFile(destination, content);

    logger.debug(`Copied: ${source} -> ${destination}`);
  } catch (error) {
    logger.error(`Failed to copy file: ${source} -> ${destination}`);
    throw error;
  }
}

/**
 * Safely writes content to a file, ensuring the directory exists
 */
export async function writeFile(
  filePath: string,
  content: string
): Promise<void> {
  try {
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, content);
    logger.debug(`Wrote file: ${filePath}`);
  } catch (error) {
    logger.error(`Failed to write file: ${filePath}`);
    throw error;
  }
}

/**
 * Checks if a file exists
 */
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    return await fs.pathExists(filePath);
  } catch (error) {
    return false;
  }
}
