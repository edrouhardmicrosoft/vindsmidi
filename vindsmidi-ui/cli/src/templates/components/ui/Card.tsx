import React from "react";

/**
 * Card appearance variants
 */
export type CardVariant = "filled" | "outline" | "subtle" | "elevated";

/**
 * Card component styled with TailwindCSS to visually match Fluent UI's card.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content to be rendered inside the card */
  children: React.ReactNode;
  /** Visual variant of the card */
  variant?: CardVariant;
  /** Enables interactive hover and focus styles */
  interactive?: boolean;
  /** Adds a header section to the card */
  header?: React.ReactNode;
  /** Adds a footer section to the card */
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "filled",
  interactive = false,
  header,
  footer,
  ...props
}) => {
  // Base inline styles for all cards
  const baseStyles: React.CSSProperties = {
    borderRadius: "8px",
    overflow: "hidden",
    transition: "box-shadow 0.2s",
    boxShadow:
      variant === "elevated" ? "0 2px 8px rgba(0,0,0,0.12)" : undefined,
    cursor: interactive ? "pointer" : undefined,
    outline: "none",
    border: variant === "outline" ? "1px solid #d1d1d1" : undefined,
    background: "#fff",
  };

  // Variant-specific styles
  let variantStyles: React.CSSProperties = {};
  switch (variant) {
    case "filled":
      variantStyles = { background: "#fff" };
      break;
    case "outline":
      variantStyles = { background: "#fff", border: "1px solid #d1d1d1" };
      break;
    case "subtle":
      variantStyles = { background: "#fafafa" };
      break;
    case "elevated":
      variantStyles = {
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
      };
      break;
  }

  // Interactive styles
  const interactiveStyles: React.CSSProperties = interactive
    ? {
        boxShadow: "0 4px 16px rgba(0,0,0,0.16)",
        outline: "2px solid #0f6cbd",
      }
    : {};

  return (
    <div
      className={className}
      style={{
        ...baseStyles,
        ...variantStyles,
        ...interactiveStyles,
      }}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? "button" : undefined}
      {...props}
    >
      {header && (
        <div
          style={{
            padding: "16px",
            borderBottom: "1px solid #e0e0e0",
            fontWeight: 600,
          }}
        >
          {header}
        </div>
      )}
      <div style={{ padding: "24px" }}>{children}</div>
      {footer && (
        <div
          style={{
            padding: "16px",
            borderTop: "1px solid #e0e0e0",
            fontWeight: 400,
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

Card.displayName = "Card";

export default Card;
