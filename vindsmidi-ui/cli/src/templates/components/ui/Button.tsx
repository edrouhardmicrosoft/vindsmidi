import React from "react";
import { useFluentButton } from "../../hooks/useFluentButton";
import { cn } from "../../utilities/cn";

/**
 * Variants for the Button component
 */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "subtle"
  | "transparent";

/**
 * Sizes for the Button component
 */
export type ButtonSize = "small" | "medium" | "large";

/**
 * Button component styled with TailwindCSS to visually match Fluent UI's button.
 */
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "ref"> {
  /** Content to be rendered inside the button */
  children: React.ReactNode;
  /** Visual variant of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Optional icon to display before the button text */
  iconBefore?: React.ReactNode;
  /** Optional icon to display after the button text */
  iconAfter?: React.ReactNode;
  /** Makes the button take the full width of its container */
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "medium",
      iconBefore,
      iconAfter,
      fullWidth = false,
      disabled = false,
      ...props
    },
    forwardedRef
  ) => {
    // Use the enhanced useFluentButton hook
    const { ref, buttonProps } = useFluentButton<HTMLButtonElement>();

    // Combine refs
    const combinedRef = (node: HTMLButtonElement) => {
      ref.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        (
          forwardedRef as React.MutableRefObject<HTMLButtonElement | null>
        ).current = node;
      }
    };

    // Base inline styles for all buttons
    const baseStyles = {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 500,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "background-color 0.2s",
      outline: "none",
      width: fullWidth ? "100%" : "auto",
      borderRadius: "4px",
    };

    // Size styles
    let sizeStyles = {};
    switch (size) {
      case "small":
        sizeStyles = {
          fontSize: "12px",
          padding: "6px 10px",
          height: "32px",
        };
        break;
      case "large":
        sizeStyles = {
          fontSize: "16px",
          padding: "12px 24px",
          height: "48px",
        };
        break;
      default: // medium
        sizeStyles = {
          fontSize: "14px",
          padding: "8px 16px",
          height: "40px",
        };
    }

    // Variant styles
    let variantStyles = {};
    switch (variant) {
      case "primary":
        variantStyles = {
          backgroundColor: "#0f6cbd",
          color: "white",
          border: "none",
        };
        break;
      case "secondary":
        variantStyles = {
          backgroundColor: "#f5f5f5",
          color: "#242424",
          border: "none",
        };
        break;
      case "outline":
        variantStyles = {
          backgroundColor: "transparent",
          color: "#242424",
          border: "1px solid #d1d1d1",
        };
        break;
      case "subtle":
        variantStyles = {
          backgroundColor: "#fafafa",
          color: "#424242",
          border: "none",
        };
        break;
      case "transparent":
        variantStyles = {
          backgroundColor: "transparent",
          color: "#242424",
          border: "none",
        };
        break;
    }

    // Icon spacing
    const iconBeforeClass = iconBefore ? "gap-h-s" : "";
    const iconAfterClass = iconAfter ? "gap-h-s" : "";

    return (
      <button
        ref={combinedRef}
        type="button"
        className={cn(
          className,
          // Direct Tailwind classes for debug
          "bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-700 border-0"
        )}
        style={{
          ...baseStyles,
          ...sizeStyles,
          ...variantStyles,
        }}
        disabled={disabled}
        {...buttonProps}
        {...props}
      >
        {iconBefore && <span style={{ marginRight: "8px" }}>{iconBefore}</span>}
        {children}
        {iconAfter && <span style={{ marginLeft: "8px" }}>{iconAfter}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
