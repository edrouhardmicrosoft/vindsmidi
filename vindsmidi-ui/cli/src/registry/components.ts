import { Component } from "./schema";

/**
 * Registry of available components
 */
export const components: Component[] = [
  {
    name: "button",
    description: "Interactive button component with various styles",
    category: "input",
    dependencies: [
      { name: "cn", type: "utility" },
      { name: "useFluentButton", type: "hook" },
    ],
    files: [
      {
        name: "button.tsx",
        path: "components/ui/button/button.tsx",
        template: "components/button/button.tsx.template",
      },
      {
        name: "button.types.ts",
        path: "components/ui/button/button.types.ts",
        template: "components/button/button.types.ts.template",
      },
      {
        name: "variants.ts",
        path: "components/ui/button/variants.ts",
        template: "components/button/variants.ts.template",
      },
      {
        name: "index.ts",
        path: "components/ui/button/index.ts",
        template: "components/button/index.ts.template",
      },
    ],
    hooks: ["useFluentButton"],
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
        template: "components/card/card.tsx.template",
      },
      {
        name: "card.types.ts",
        path: "components/ui/card/card.types.ts",
        template: "components/card/card.types.ts.template",
      },
      {
        name: "index.ts",
        path: "components/ui/card/index.ts",
        template: "components/card/index.ts.template",
      },
    ],
  },
];

/**
 * Get a component by name
 */
export function getComponent(name: string): Component | undefined {
  return components.find((c) => c.name === name);
}

/**
 * Get multiple components by name
 */
export function getComponents(names: string[]): Component[] {
  return names.map((name) => {
    const component = getComponent(name);
    if (!component) {
      throw new Error(`Component not found: ${name}`);
    }
    return component;
  });
}

/**
 * Get all available component names
 */
export function getComponentNames(): string[] {
  return components.map((c) => c.name);
}
