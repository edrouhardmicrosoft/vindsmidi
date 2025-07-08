/**
 * Represents a hook dependency
 */
export interface Hook {
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
 * Registry of available hooks
 */
export const hooks: Hook[] = [
  {
    name: "useFluentButton",
    description: "Enhanced button hook with Fluent UI integration",
    dependencies: [],
    file: {
      name: "useFluentButton.ts",
      path: "hooks/useFluentButton.ts",
      template: "hooks/useFluentButton.ts.template",
    },
  },
];

/**
 * Get a hook by name
 */
export function getHook(name: string): Hook | undefined {
  return hooks.find((h) => h.name === name);
}

/**
 * Get multiple hooks by name
 */
export function getHooks(names: string[]): Hook[] {
  return names.map((name) => {
    const hook = getHook(name);
    if (!hook) {
      throw new Error(`Hook not found: ${name}`);
    }
    return hook;
  });
}

/**
 * Get all available hook names
 */
export function getHookNames(): string[] {
  return hooks.map((h) => h.name);
}