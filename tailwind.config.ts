import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      colors: {
        bg: {
          base: "var(--bg-base)",
          surface: "var(--bg-surface)",
          elevated: "var(--bg-elevated)",
          overlay: "var(--bg-overlay)",
          inset: "var(--bg-inset)",
          top: "var(--bg-top)",
          "status-bar": "var(--bg-status-bar)",
        },
        border: {
          DEFAULT: "var(--border-default)",
          muted: "var(--border-muted)",
          emphasis: "var(--border-emphasis)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          disabled: "var(--text-disabled)",
          inverse: "var(--text-inverse)",
        },
        action: {
          DEFAULT: "var(--action-default)",
          hover: "var(--action-hover)",
          active: "var(--action-active)",
          disabled: "var(--action-disabled)",
          muted: "var(--action-muted)",
        },
        link: {
          DEFAULT: "var(--link-default)",
          hover: "var(--link-hover)",
        },
        status: {
          success: "var(--status-success)",
          "success-muted": "var(--status-success-muted)",
          warning: "var(--status-warning)",
          "warning-muted": "var(--status-warning-muted)",
          error: "var(--status-error)",
          "error-muted": "var(--status-error-muted)",
          info: "var(--status-info)",
          "info-muted": "var(--status-info-muted)",
        },
        destructive: {
          DEFAULT: "var(--destructive-default)",
          hover: "var(--destructive-hover)",
        },
        brand: {
          primary: "var(--brand-primary)",
          secondary: "var(--brand-secondary)",
          color: "var(--brand-color)",
        },
        ui: {
          divider: "var(--ui-divider)",
          "focus-ring": "var(--ui-focus-ring)",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        low: "var(--shadow-low)",
        medium: "var(--shadow-medium)",
        high: "var(--shadow-high)",
      },
    },
  },
  plugins: [],
};
export default config;
