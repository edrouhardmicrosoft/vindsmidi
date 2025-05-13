import { Component, ComponentDependency } from "../registry/schema";
import { getComponent } from "../registry/components";
import { logger } from "./logger";

/**
 * Resolves all dependencies for a set of components
 */
export function resolveDependencies(components: Component[]): Component[] {
  const resolvedComponents = new Map<string, Component>();
  const unresolvedDependencies = new Map<string, ComponentDependency>();

  // Add initial components
  components.forEach((component) => {
    resolvedComponents.set(component.name, component);
  });

  // Collect unresolved dependencies
  components.forEach((component) => {
    component.dependencies.forEach((dep) => {
      if (dep.type === "component" && !resolvedComponents.has(dep.name)) {
        unresolvedDependencies.set(dep.name, dep);
      }
    });
  });

  // Resolve dependencies recursively
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

      // Add new component's dependencies
      component.dependencies.forEach((newDep) => {
        if (
          newDep.type === "component" &&
          !resolvedComponents.has(newDep.name)
        ) {
          unresolvedDependencies.set(newDep.name, newDep);
        }
      });
    }
  }

  return Array.from(resolvedComponents.values());
}
