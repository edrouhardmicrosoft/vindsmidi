/**
 * Represents a dependency on another component, utility, or hook
 */
export interface ComponentDependency {
  name: string;
  type: "component" | "utility" | "hook";
  optional?: boolean;
}

/**
 * Represents a file that is part of a component
 */
export interface ComponentFile {
  name: string;
  path: string;
  template: string;
  overwritable?: boolean;
}

/**
 * Represents a component in the registry
 */
export interface Component {
  name: string;
  description: string;
  category:
    | "layout"
    | "input"
    | "data-display"
    | "feedback"
    | "navigation"
    | "overlay";
  dependencies: ComponentDependency[];
  files: ComponentFile[];
  styles?: string[];
  hooks?: string[];
}
