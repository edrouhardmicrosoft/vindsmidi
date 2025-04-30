# Tailwind CSS 4.1+ Portable Library Setup Plan

This checklist outlines steps to set up, build, and distribute a Tailwind CSS 4.1+ library compatible with any web-based project (vanilla HTML/CSS, React, Vue, Svelte, Web Components, Solid, etc.).

## 1. Project Initialization
- [x] Create a new directory and navigate into it:
  ```bash
  mkdir vindsmidi-css && cd vindsmidi-css
  ```
- [x] Initialize npm:
  ```bash
  npm init -y
  ```

## 2. Install Dependencies
- [x] Install Tailwind CSS, @tailwindcss/cli, PostCSS, and Autoprefixer:
  ```bash
  npm install tailwindcss@latest @tailwindcss/cli@latest postcss autoprefixer --save-dev
  ```

## 3. Create Source CSS (CSS-First Configuration)
- [x] Create `src/main.css` as your main source file.
- [x] Import Tailwind and define all theme customizations using the `@theme` directive:
  ```css
  @import "tailwindcss";

  @theme {
    /* Example custom properties */
    --font-display: "Satoshi", "sans-serif";
    --breakpoint-3xl: 1920px;
    --color-avocado-100: oklch(0.99 0 0);
    /* ...add your custom properties here... */
  }
  ```
- [x] Add any additional custom CSS, layers, or overrides as needed.
- Note: The JavaScript config file (`tailwind.config.js`) is now optional and only needed for advanced/legacy use cases.

## 4. Build Script
- [x] Add build scripts in `package.json`:
  ```json
  "scripts": {
    "build": "tailwindcss -i src/main.css -o dist/tailwind.css --minify",
    "watch": "tailwindcss -i src/main.css -o dist/tailwind.css --watch"
  }
  ```
- [x] Run build:
  ```bash
  npm run build
  ```

## 5. Test in Vanilla HTML
- [ ] Create `public/index.html` and link the generated CSS:
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../dist/tailwind.css">
    <title>Tailwind Portable Test</title>
  </head>
  <body>
    <h1 class="text-3xl font-bold">Hello, Tailwind Portable!</h1>
  </body>
  </html>
  ```
- [ ] Open in browser and verify styling.

## 6. Usage in Frameworks
- [ ] React: import the CSS in `src/index.js` or `App.jsx`:
  ```js
  import '../dist/tailwind.css';
  ```
- [ ] Vue 3: import in `main.js` or add in `public/index.html`.
- [ ] Svelte: import in `src/app.html` or `src/main.js`.
- [ ] Web Components: link or inject `dist/tailwind.css` within Shadow DOM or `<head>`.
- [ ] Solid: import in the entry file (e.g., `index.tsx`).

## 7. Customization
- [ ] Extend theme settings, colors, fonts, spacing, etc. in `src/main.css` using the `@theme` directive.
- [ ] Add and configure official or community plugins (forms, typography, aspect-ratio, etc.) in CSS if supported.
- [ ] Update `src/main.css` with custom base or component layers if needed.

## 8. Distribution
- [ ] Ensure `dist/tailwind.css` is generated and minified.
- [ ] Update `package.json` metadata:
  - Set `"main": "dist/tailwind.css"`
  - Add `"files": ["dist/tailwind.css"]` to include only the CSS in package.
- [ ] Create a `README.md` with clear usage instructions for each supported framework.
- [ ] Add a LICENSE file.

## 9. Publishing
- [ ] Login to npm (if not already):
  ```bash
  npm login
  ```
- [ ] Bump version:
  ```bash
  npm version patch
  ```
- [ ] Publish to npm:
  ```bash
  npm publish
  ```

## 10. Continuous Integration (Optional)
- [ ] Configure CI (GitHub Actions, GitLab CI, etc.) to run `npm run build` on push.
- [ ] Set up auto-publishing on new Git tags or releases. 