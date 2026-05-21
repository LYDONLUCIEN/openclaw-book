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
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!isActive) return;
    // GSAP entrance animations only (no click-to-expand interactions)
  }, { scope: containerRef, dependencies: [isActive] });
  return <section>...</section>;
};
export default memo(SlideXX_Name);
```

### Navigation

- **Keyboard**: Arrow keys, Page Up/Down, Space, Home/End (handled by `useKeyboardNav` hook with 600ms throttle).
- **UI**: `TopBar` (theme toggle, PDF export), `BottomNav` (prev/next buttons), `ProgressBar`.
- **Theme**: Three themes (`blue`, `dark`, `warm`) toggled via `data-theme` attribute on `<html>`, persisted to localStorage.
- **PDF Export**: `PDFExportButton` component in TopBar exports all slides to PDF.

### Key Directories

- `app/src/components/` — shadcn/ui components + custom components (Layout, TopBar, BottomNav, ProgressBar, PDFExportButton, asset SVGs)
- `app/src/context/` — SlideContext
- `app/src/hooks/` — useTheme, useKeyboardNav
- `app/src/slides/` — All 24 slide components (Slide00 through Slide23)
- `app/src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

### Path Alias

`@/` maps to `app/src/` (configured in `vite.config.ts` and `tsconfig.app.json`).

## Slide Layout & Typography Rules

### Layout Constraints
- **TopBar**: 48px (h-12), fixed at top. Hidden on slide 0 and 23.
- **BottomNav**: 56px (h-14), fixed at bottom. Always visible.
- **Usable area**: ~100dvh - 104px. Slides MUST use `pt-16 pb-20` (TopBar visible) or `pt-8 pb-16` (TopBar hidden) to avoid content being obscured.
- No scrolling — all content must fit in one viewport.

### Typography & Visual Hierarchy
- **Adaptive font sizing**: Pages with less content should use larger fonts for clarity. Pages with dense content can use smaller fonts. Balance readability with space utilization.
- **Title**: `text-h1 md:text-display` when page has room; `text-h1` when dense.
- **Key conclusions/keywords**: Prominent with bold weight and accent color.
- **Detail text**: `text-caption` or `text-body-sm`, dense but visually recessive — readers can skip it.
- **No click-to-expand/tabs/phase switching**: All content visible at once. PDF export cannot handle interactions. Use typographic hierarchy (size, weight, color) instead.
- **Content width**: Use `max-w-5xl` to `max-w-6xl` for main content areas.
- **Card padding**: `p-4 md:p-5` minimum, `p-5 md:p-6` when space allows.
- **Aesthetic priority**: Maintain clean visual balance. Avoid oversized or jarring elements. Good proportions > maximum size.

### Text Style
- Professional, concise language. No colloquial expressions.
- Examples: "处理事务边界" not "能干多少活"; "输出可靠可预测" not "靠不靠谱".
- Cost perspective as main narrative thread: 操作成本(便利性) / 开发成本(完备性) / 确认成本(确定性).
- Property order: 便利性(输入) → 完备性(处理) → 确定性(输出).

## Visual Alignment & Consistency (默会排版知识)

以下规则源于波兰尼的默会知识（Tacit Knowledge）——那些"你知道但难以言传"的排版直觉。将这些隐性的审美判断显性化，确保跨页面的视觉一致性。

### 格式对齐原则

1. **同级标题等长等宽**：同一页面中处于相同层级的标题，字数和视觉长度应尽量接近。如果一个标题是4个字，其他同级标题也应控制在3-5个字。避免一个标题5个字、另一个15个字的情况。
   - 反例：三个卡片标题分别为 "模型幻觉" / "自主决策风险导致的输出不可控" / "安全"——长短差异过大。
   - 正例："模型幻觉" / "决策风险" / "安全边界"——字数接近，视觉齐整。

2. **等距网格对齐**：多个卡片/栏目并排时，必须使用 Grid 布局（`grid grid-cols-N`）而非 flex wrap。Grid 保证每个格子的宽度、高度完全一致，内容自动对齐。同一行卡片的高度由最高的那个决定（默认行为），所有卡片内部元素的位置应逐行对齐。

3. **卡片内部结构一致**：每个卡片遵循相同的内部结构层次：
   ```
   [图标/徽章]  ← 同一位置、同一尺寸
   [标题]       ← 同一字号、同一行数（尽量单行）
   [描述]       ← 同一字号、接近的行数
   [标签/指标]  ← 同一位置、同一格式
   ```
   所有卡片的图标、标题、描述、标签应在垂直方向上逐行对齐，即使内容长度不同。

4. **字号阶梯严格统一**：跨页面的相同角色元素使用完全相同的字号：
   - 页面主标题：始终 `text-h1 md:text-display`
   - 卡片/栏目标题：始终 `text-h3` 或 `text-body font-bold`
   - 正文描述：始终 `text-body-sm`
   - 补充细节：始终 `text-caption`
   - 不同页面间，相同角色的元素不应出现字号差异。

5. **间距阶梯统一**：
   - 标题到正文：`mb-4`~`mb-6`
   - 卡片之间：`gap-4 md:gap-6`
   - 卡片内部元素：`mb-3`
   - 底部总结到主体：`mt-6`~`mt-8`

### 视觉节奏

6. **呼吸感**：内容不应贴满整个页面。保留约 10%-15% 的留白，让视觉有休息的空间。但留白应均匀分布（上下对称或按结构分布），而非底部大量空白的失衡状态。

7. **视觉重心**：每页应有一个明确的视觉焦点（大标题/核心结论/关键数据），其余内容围绕它展开。焦点元素的字号/粗细/颜色应显著区别于周围内容。

8. **跨页面一致性**：相邻页面如果使用了相似的布局结构（如都是三栏卡片），卡片宽度、间距、圆角、边框粗细应保持完全一致。听众在翻页时不应感到"布局跳变"。

## Adding a New Slide

1. Create `app/src/slides/SlideXX_Name.tsx` following the `SlideProps` pattern above.
2. Import and add it to the `slides` array in `app/src/App.tsx`.
3. Update `TOTAL_SLIDES` constant.
4. Update TopBar hidden logic if the new slide is a cover/thanks page.

## Build Output

Production builds output to `app/dist/` with relative paths (`base: './'`) for static hosting.
