/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./cli/src/templates/components/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        brand: "var(--colorBrandBackground)",
        "brand-1": "var(--colorBrandBackground1)",
        "brand-2": "var(--colorBrandBackground2)",
        "brand-3": "var(--colorBrandBackground3)",
        "brand-hover": "var(--colorBrandBackgroundHover)",
        "brand-pressed": "var(--colorBrandBackgroundPressed)",
        "brand-selected": "var(--colorBrandBackgroundSelected)",
        "brand-fg-1": "var(--colorBrandForeground1)",
        "brand-fg-2": "var(--colorBrandForeground2)",
        "brand-fg-hover": "var(--colorBrandForegroundHover)",
        "brand-fg-pressed": "var(--colorBrandForegroundPressed)",
        "brand-stroke-1": "var(--colorBrandStroke1)",
        "brand-stroke-2": "var(--colorBrandStroke2)",

        // Neutral Colors - Foreground
        "neutral-fg-1": "var(--colorNeutralForeground1)",
        "neutral-fg-2": "var(--colorNeutralForeground2)",
        "neutral-fg-3": "var(--colorNeutralForeground3)",
        "neutral-fg-4": "var(--colorNeutralForeground4)",
        "neutral-fg-disabled": "var(--colorNeutralForegroundDisabled)",
        "neutral-fg-inverted": "var(--colorNeutralForegroundInverted)",

        // Neutral Colors - Background
        "neutral-bg-1": "var(--colorNeutralBackground1)",
        "neutral-bg-2": "var(--colorNeutralBackground2)",
        "neutral-bg-3": "var(--colorNeutralBackground3)",
        "neutral-bg-4": "var(--colorNeutralBackground4)",
        "neutral-bg-5": "var(--colorNeutralBackground5)",
        "neutral-bg-6": "var(--colorNeutralBackground6)",
        "neutral-bg-1-hover": "var(--colorNeutralBackground1Hover)",
        "neutral-bg-1-pressed": "var(--colorNeutralBackground1Pressed)",
        "neutral-bg-1-selected": "var(--colorNeutralBackground1Selected)",
        "neutral-bg-disabled": "var(--colorNeutralBackgroundDisabled)",

        // Neutral Colors - Stroke
        "neutral-stroke-1": "var(--colorNeutralStroke1)",
        "neutral-stroke-2": "var(--colorNeutralStroke2)",
        "neutral-stroke-3": "var(--colorNeutralStroke3)",
        "neutral-stroke-accessible": "var(--colorNeutralStrokeAccessible)",
        "neutral-stroke-disabled": "var(--colorNeutralStrokeDisabled)",

        // Status Colors - Danger
        "danger-bg-1": "var(--colorStatusDangerBackground1)",
        "danger-fg-1": "var(--colorStatusDangerForeground1)",
        "danger-border-1": "var(--colorStatusDangerBorder1)",

        // Status Colors - Success
        "success-bg-1": "var(--colorStatusSuccessBackground1)",
        "success-fg-1": "var(--colorStatusSuccessForeground1)",
        "success-border-1": "var(--colorStatusSuccessBorder1)",

        // Status Colors - Warning
        "warning-bg-1": "var(--colorStatusWarningBackground1)",
        "warning-fg-1": "var(--colorStatusWarningForeground1)",
        "warning-border-1": "var(--colorStatusWarningBorder1)",

        // Status Colors - Info
        "info-bg-1": "var(--colorStatusInfoBackground1)",
        "info-fg-1": "var(--colorStatusInfoForeground1)",
        "info-border-1": "var(--colorStatusInfoBorder1)",
      },

      fontFamily: {
        base: "var(--fontFamilyBase)",
        mono: "var(--fontFamilyMonospace)",
      },

      fontSize: {
        "fluent-100": "var(--fontSizeBase100)",
        "fluent-200": "var(--fontSizeBase200)",
        "fluent-300": "var(--fontSizeBase300)",
        "fluent-400": "var(--fontSizeBase400)",
        "fluent-500": "var(--fontSizeBase500)",
        "fluent-600": "var(--fontSizeBase600)",
      },

      fontWeight: {
        regular: "var(--fontWeightRegular)",
        medium: "var(--fontWeightMedium)",
        semibold: "var(--fontWeightSemibold)",
        bold: "var(--fontWeightBold)",
      },

      lineHeight: {
        "fluent-100": "var(--lineHeightBase100)",
        "fluent-200": "var(--lineHeightBase200)",
        "fluent-300": "var(--lineHeightBase300)",
        "fluent-400": "var(--lineHeightBase400)",
        "fluent-500": "var(--lineHeightBase500)",
      },

      borderRadius: {
        "fluent-none": "var(--borderRadiusNone)",
        "fluent-sm": "var(--borderRadiusSmall)",
        "fluent-md": "var(--borderRadiusMedium)",
        "fluent-lg": "var(--borderRadiusLarge)",
        "fluent-xl": "var(--borderRadiusXLarge)",
        "fluent-circular": "var(--borderRadiusCircular)",
      },

      borderWidth: {
        "fluent-thin": "var(--strokeWidthThin)",
        "fluent-thick": "var(--strokeWidthThick)",
        "fluent-thicker": "var(--strokeWidthThicker)",
      },

      boxShadow: {
        "fluent-2": "var(--shadow2)",
        "fluent-4": "var(--shadow4)",
        "fluent-8": "var(--shadow8)",
        "fluent-16": "var(--shadow16)",
      },

      spacing: {
        // Horizontal spacing
        "h-none": "var(--spacingHorizontalNone)",
        "h-xs": "var(--spacingHorizontalXS)",
        "h-s": "var(--spacingHorizontalS)",
        "h-m": "var(--spacingHorizontalM)",
        "h-l": "var(--spacingHorizontalL)",
        "h-xl": "var(--spacingHorizontalXL)",
        "h-xxl": "var(--spacingHorizontalXXL)",
        "h-xxxl": "var(--spacingHorizontalXXXL)",

        // Vertical spacing
        "v-none": "var(--spacingVerticalNone)",
        "v-xs": "var(--spacingVerticalXS)",
        "v-s": "var(--spacingVerticalS)",
        "v-m": "var(--spacingVerticalM)",
        "v-l": "var(--spacingVerticalL)",
        "v-xl": "var(--spacingVerticalXL)",
        "v-xxl": "var(--spacingVerticalXXL)",
        "v-xxxl": "var(--spacingVerticalXXXL)",
      },

      // Component-specific extensions
      height: {
        button: "var(--buttonHeight)",
      },
      padding: {
        "button-x": "var(--buttonPaddingHorizontal)",
        card: "var(--cardPadding)",
      },
    },
  },
  plugins: [],
};
