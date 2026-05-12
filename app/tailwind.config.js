/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        /* Presentation design tokens */
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-accent': 'var(--bg-accent)',
        'cm-primary': 'var(--primary)',
        'cm-primary-dark': 'var(--primary-dark)',
        'cm-secondary': 'var(--secondary)',
        'cm-accent': 'var(--accent)',
        'cm-text': 'var(--text-primary)',
        'cm-text-secondary': 'var(--text-secondary)',
        'cm-text-light': 'var(--text-light)',
        'cm-border': 'var(--border)',
        'cm-success': 'var(--success)',
        'cm-card-bg': 'var(--card-bg)',
        'cm-shadow': 'var(--shadow)',

        /* shadcn compatibility - mapped to design tokens */
        border: "hsl(var(--border-hsl, var(--border)))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary-hsl))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary-hsl))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent-hsl))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      spacing: {
        'space-1': '4px',
        'space-2': '8px',
        'space-3': '12px',
        'space-4': '16px',
        'space-5': '24px',
        'space-6': '32px',
        'space-7': '48px',
        'space-8': '64px',
        'space-9': '96px',
        'space-10': '128px',
      },
      fontSize: {
        'display-xl': ['4rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h2': ['1.75rem', { lineHeight: '1.25', letterSpacing: '0', fontWeight: '600' }],
        'h3': ['1.375rem', { lineHeight: '1.3', letterSpacing: '0', fontWeight: '600' }],
        'body': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0.01em', fontWeight: '400' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '400' }],
        'caption': ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '500' }],
        'data': ['3.5rem', { lineHeight: '1.0', letterSpacing: '-0.02em', fontWeight: '800' }],
        'data-sm': ['1.5rem', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '700' }],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'card': '0 4px 16px var(--shadow)',
        'card-hover': '0 12px 32px var(--shadow)',
        'nav': '0 -4px 24px var(--shadow)',
        'toggle': '0 2px 12px var(--shadow)',
        'popover': '0 8px 32px var(--shadow)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
