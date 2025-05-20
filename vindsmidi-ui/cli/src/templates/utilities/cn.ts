/**
 * cn - Utility to concatenate and conditionally join CSS class names (like classNames).
 * Usage: cn('foo', condition && 'bar', ['baz', anotherCondition && 'qux'])
 */
export function cn(...args: any[]): string {
  return args.flat(Infinity).filter(Boolean).join(" ");
}
