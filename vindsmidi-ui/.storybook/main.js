module.exports = {
  stories: [
    "../cli/src/templates/components/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-styling"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  docs: {
    autodocs: true
  },
  viteFinal: async (config) => {
    // Basic CSS settings
    if (!config.css) config.css = {};
    // Add preprocessor paths for CSS imports
    if (!config.css.preprocessorOptions) config.css.preprocessorOptions = {};
    config.css.preprocessorOptions.includePaths = ['node_modules', '.'];
    // Ensure CSS is properly processed
    if (!config.css.postcss) {
      config.css.postcss = {};
    }
    return config;
  },
}; 