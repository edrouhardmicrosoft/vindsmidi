module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './.storybook/**/*.{js,ts,jsx,tsx,mdx}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        // Using the CSS variables from main.css for theming
        brand: 'var(--fluent-color-brand-background)',
        'brand-hover': 'var(--fluent-color-brand-background-hover)',
        'brand-pressed': 'var(--fluent-color-brand-background-pressed)',
        'neutral-bg-1': 'var(--fluent-color-neutral-background-1)',
        'neutral-bg-2': 'var(--fluent-color-neutral-background-2)',
        'neutral-stroke-1': 'var(--fluent-color-neutral-stroke-1)',
        'neutral-foreground-1': 'var(--fluent-color-neutral-foreground-1)',
      },
      borderRadius: {
        'fluent-sm': 'var(--fluent-radius-sm)',
        'fluent-md': 'var(--fluent-radius-md)',
        'fluent-lg': 'var(--fluent-radius-lg)',
      },
      fontFamily: {
        'fluent': 'var(--fluent-font-sans)',
        'fluent-mono': 'var(--fluent-font-mono)',
      },
    },
  },
  plugins: [],
};