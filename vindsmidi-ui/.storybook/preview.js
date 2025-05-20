import '../src/styles/main.css';
import '../src/styles/tokens.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  a11y: {
    config: {
      rules: [
        {
          id: 'color-contrast',
          enabled: true
        }
      ]
    }
  }
}; 