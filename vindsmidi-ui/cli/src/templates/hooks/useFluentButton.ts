import {
  useRef,
  useEffect,
  useCallback,
  KeyboardEvent,
  FocusEvent,
} from "react";

/**
 * useFluentButton - A hook providing comprehensive Fluent UI-inspired
 * accessibility and focus management for buttons.
 */
export function useFluentButton<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  // Handle keyboard interactions (Space/Enter activate button)
  const handleKeyDown = useCallback((event: KeyboardEvent<T>) => {
    const node = ref.current;
    if (!node) return;

    // Handle Space and Enter key presses
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      node.click();
    }

    // Handle Escape key (blur focus)
    if (event.key === "Escape") {
      node.blur();
    }
  }, []);

  // Track focus state for styling
  const handleFocus = useCallback((event: FocusEvent<T>) => {
    const node = ref.current;
    if (!node) return;
    node.setAttribute("data-focused", "true");
  }, []);

  const handleBlur = useCallback((event: FocusEvent<T>) => {
    const node = ref.current;
    if (!node) return;
    node.removeAttribute("data-focused");
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Set proper ARIA attributes
    if (!node.getAttribute("role")) {
      node.setAttribute("role", "button");
    }

    if (!node.hasAttribute("tabindex") && node.tagName !== "BUTTON") {
      node.setAttribute("tabindex", "0");
    }

    // Add focus visible style hook for keyboard navigation
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        document.body.classList.add("using-keyboard");
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove("using-keyboard");
    };

    document.addEventListener("keyup", handleKeyUp as any);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("keyup", handleKeyUp as any);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return {
    ref,
    handleKeyDown,
    handleFocus,
    handleBlur,
    buttonProps: {
      role: "button",
      tabIndex: 0,
      onKeyDown: handleKeyDown,
      onFocus: handleFocus,
      onBlur: handleBlur,
    },
  };
}
