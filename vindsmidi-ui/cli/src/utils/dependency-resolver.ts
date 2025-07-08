import { Component, ComponentDependency } from "../registry/schema";
import { getComponent } from "../registry/components";
import { getUtility } from "../registry/utilities";
import { getHook } from "../registry/hooks";
import { logger } from "./logger";

export interface ResolvedDependencies {
  components: Component[];
  utilities: Array<{ name: string; file: any }>;
  hooks: Array<{ name: string; file: any }>;
}

/**
 * Resolves all dependencies for a set of components
 */
export function resolveDependencies(components: Component[]): ResolvedDependencies {
  const resolvedComponents = new Map<string, Component>();
  const resolvedUtilities = new Map<string, any>();
  const resolvedHooks = new Map<string, any>();
  const unresolvedDependencies = new Map<string, ComponentDependency>();

  // Add initial components
  components.forEach((component) => {
    resolvedComponents.set(component.name, component);
  });

  // Collect unresolved dependencies from initial components
  components.forEach((component) => {
    component.dependencies.forEach((dep) => {
      if (dep.type === "component" && !resolvedComponents.has(dep.name)) {
        unresolvedDependencies.set(dep.name, dep);
      } else if (dep.type === "utility" && !resolvedUtilities.has(dep.name)) {
        const utility = getUtility(dep.name);
        if (utility) {
          resolvedUtilities.set(dep.name, utility);
        } else if (!dep.optional) {
          logger.warn(`Required utility not found: ${dep.name}`);
        }
      } else if (dep.type === "hook" && !resolvedHooks.has(dep.name)) {
        const hook = getHook(dep.name);
        if (hook) {
          resolvedHooks.set(dep.name, hook);
        } else if (!dep.optional) {
          logger.warn(`Required hook not found: ${dep.name}`);
        }
      }
    });
  });

  // Resolve component dependencies recursively
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
        } else if (newDep.type === "utility" && !resolvedUtilities.has(newDep.name)) {
          const utility = getUtility(newDep.name);
          if (utility) {
            resolvedUtilities.set(newDep.name, utility);
          } else if (!newDep.optional) {
            logger.warn(`Required utility not found: ${newDep.name}`);
          }
        } else if (newDep.type === "hook" && !resolvedHooks.has(newDep.name)) {
          const hook = getHook(newDep.name);
          if (hook) {
            resolvedHooks.set(newDep.name, hook);
          } else if (!newDep.optional) {
            logger.warn(`Required hook not found: ${newDep.name}`);
          }
        }
      });
    }
  }

  return {
    components: Array.from(resolvedComponents.values()),
    utilities: Array.from(resolvedUtilities.values()),
    hooks: Array.from(resolvedHooks.values()),
  };
}
