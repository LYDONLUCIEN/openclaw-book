# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An interactive presentation web app for a corporate AI Agent seminar (企业AI智能体讲座). Built with React + TypeScript + Vite, using GSAP for slide transitions and in-slide animations. All slides are rendered simultaneously (stacked absolutely) with GSAP controlling visibility and position.

## Commands

All commands run from the `app/` directory:

```bash
npm run dev       # Dev server on localhost:3000
npm run build     # TypeScript check + Vite production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

No test framework is configured.

## Architecture

### Slide System

- **`app/src/App.tsx`**: Defines the ordered slide array and total count. Each slide component is imported and registered here.
- **`app/src/components/Layout.tsx`**: Renders all slides stacked with absolute positioning. Manages GSAP slide-to-slide transitions (horizontal slide with fade). Wraps everything in `SlideProvider`.
- **`app/src/context/SlideContext.tsx`**: React context providing `currentSlide`, `goNext`, `goPrev`, `goToSlide`, `direction`, `isTransitioning`, and theme state.
- **`app/src/slides/Slide*.tsx`**: Individual slide components. Each receives `isActive: boolean` and uses `useGSAP()` to animate its content when it becomes active.

### Slide Component Pattern

Every slide follows this interface:
```tsx
interface SlideProps { isActive: boolean; }
const SlideXX_Name: React.FC<SlideProps> = ({ isActive }) => {
  // refs for animated elements
  useGSAP(() => {
    if (!isActive) return;
    // GSAP timeline with staggered animations
  }, { dependencies: [isActive] });
  return <div>...</div>;
};
```

### Navigation

- **Keyboard**: Arrow keys, Page Up/Down, Space, Home/End (handled by `useKeyboardNav` hook with 600ms throttle).
- **UI**: `TopBar` (theme toggle), `BottomNav` (prev/next buttons), `ProgressBar`.
- **Theme**: Three themes (`blue`, `dark`, `warm`) toggled via `data-theme` attribute on `<html>`, persisted to localStorage.

### Key Directories

- `app/src/components/` — shadcn/ui components + custom components (Layout, TopBar, BottomNav, ProgressBar, asset SVGs)
- `app/src/context/` — SlideContext
- `app/src/hooks/` — useTheme, useKeyboardNav
- `app/src/slides/` — All 21 slide components (Slide00 through Slide21)
- `app/src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

### Path Alias

`@/` maps to `app/src/` (configured in `vite.config.ts` and `tsconfig.app.json`).

## Adding a New Slide

1. Create `app/src/slides/SlideXX_Name.tsx` following the `SlideProps` pattern above.
2. Import and add it to the `slides` array in `app/src/App.tsx`.
3. Update `TOTAL_SLIDES` constant.

## Build Output

Production builds output to `app/dist/` with relative paths (`base: './'`) for static hosting.
