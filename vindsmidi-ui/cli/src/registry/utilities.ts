/**
 * Represents a utility dependency
 */
export interface Utility {
  name: string;
  description: string;
  dependencies: string[];
  file: {
    name: string;
    path: string;
    template: string;
  };
}

/**
 * Registry of available utilities
 */
export const utilities: Utility[] = [
  {
    name: "cn",
    description: "Utility function to merge class names conditionally",
    dependencies: ["clsx", "tailwind-merge"],
    file: {
      name: "cn.ts",
      path: "utils/cn.ts",
      template: "utils/cn.ts.template",
    },
  },
];

/**
 * Get a utility by name
 */
export function getUtility(name: string): Utility | undefined {
  return utilities.find((u) => u.name === name);
}

/**
 * Get multiple utilities by name
 */
export function getUtilities(names: string[]): Utility[] {
  return names.map((name) => {
    const utility = getUtility(name);
    if (!utility) {
      throw new Error(`Utility not found: ${name}`);
    }
    return utility;
  });
}

/**
 * Get all available utility names
 */
export function getUtilityNames(): string[] {
  return utilities.map((u) => u.name);
}