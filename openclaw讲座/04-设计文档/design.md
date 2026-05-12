# AI Agent Technology Seminar — Global Design Document

A professional 18-slide HTML lecture presentation system for China Mobile non-technical staff, covering AI Agent technology evolution, core concepts (ReAct, MCP, Skills), OpenClaw deep dive, three-agent comparison, capabilities, and China Mobile application scenarios.

---

## Overview

A single-page presentation application where each "slide" is a full-viewport section. The experience mimics a modern Keynote/PowerPoint presentation in the browser, with smooth slide transitions, keyboard navigation, a progress bar, and collapsible detail sections for optional deep-dive content. The design is clean, fresh, and tech-savvy — approachable for non-technical audiences without being sterile or overly geeky.

**Key features:**
- 18 full-viewport slides with slide-like layouts
- 3 theme color schemes (CSS variable-driven)
- GSAP-powered slide transitions and entrance animations
- Keyboard + on-screen navigation
- Collapsible expandable detail sections within slides
- Comparison tables, flow diagrams, data highlight cards
- Modular slide architecture (each slide is a separate component file)

---

## Page List

| Page | File | Description |
|------|------|-------------|
| Presentation | `presentation.md` | The single-page presentation containing all 18 slides as full-viewport sections |

---

## Color Palette

### Theme 1 — China Mobile Blue (Default)

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#FFFFFF` | Main slide background |
| `--bg-secondary` | `#F8FAFC` | Alternate slide background, cards |
| `--bg-accent` | `#E8F4FD` | Light blue accent panels, code blocks, expandable sections |
| `--primary` | `#0066CC` | China Mobile Blue — headings, primary buttons, active nav |
| `--primary-dark` | `#004C99` | Hover states, emphasis text |
| `--secondary` | `#00B4D8` | Tech Cyan — accents, highlights, decorative elements |
| `--accent` | `#FF6B35` | Vibrant Orange — CTAs, key data points, badges |
| `--text-primary` | `#1E293B` | Main body text (softened near-black) |
| `--text-secondary` | `#64748B` | Captions, labels, secondary info |
| `--text-light` | `#94A3B8` | Muted text, placeholders |
| `--border` | `#E2E8F0` | Card borders, dividers |
| `--success` | `#10B981` | Positive metrics, checkmarks |
| `--card-bg` | `#FFFFFF` | Card surfaces |
| `--shadow` | `rgba(0, 102, 204, 0.08)` | Soft blue-tinted shadows |

### Theme 2 — Tech Dark

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0F172A` | Dark navy background |
| `--bg-secondary` | `#1E293B` | Card/panel backgrounds |
| `--bg-accent` | `#1A365D` | Accent panels, expandable sections |
| `--primary` | `#3B82F6` | Bright blue for headings and primary elements |
| `--primary-dark` | `#2563EB` | Hover states |
| `--secondary` | `#22D3EE` | Cyan accents |
| `--accent` | `#FB923C` | Warm orange accents |
| `--text-primary` | `#F1F5F9` | Primary text on dark |
| `--text-secondary` | `#94A3B8` | Secondary text |
| `--text-light` | `#64748B` | Muted text |
| `--border` | `#334155` | Borders on dark |
| `--success` | `#34D399` | Positive metrics |
| `--card-bg` | `#1E293B` | Card surfaces |
| `--shadow` | `rgba(0, 0, 0, 0.3)` | Shadows on dark |

### Theme 3 — Warm Light

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#FFFBF5` | Warm cream background |
| `--bg-secondary` | `#FDF2E9` | Soft peach card backgrounds |
| `--bg-accent` | `#FEF3C7` | Warm accent panels |
| `--primary` | `#0066CC` | China Mobile Blue retained |
| `--primary-dark` | `#004C99` | Hover states |
| `--secondary` | `#0EA5E9` | Warmed-up cyan |
| `--accent` | `#FF6B35` | Orange accent |
| `--text-primary` | `#292524` | Warm near-black |
| `--text-secondary` | `#78716C` | Warm gray secondary |
| `--text-light` | `#A8A29E` | Muted text |
| `--border` | `#E7E5E4` | Warm borders |
| `--success` | `#059669` | Positive metrics |
| `--card-bg` | `#FFFFFF` | Card surfaces |
| `--shadow` | `rgba(255, 107, 53, 0.06)` | Warm-tinted shadows |

---

## Typography

### Font Stack

- **Primary font**: `Inter` — clean, modern, excellent for presentation readability
- **Monospace font**: `JetBrains Mono` — for code snippets, technical terms, data values
- **Fallback**: `system-ui, -apple-system, sans-serif`

### Type Scale

All sizes use `rem` with root at `16px`. The presentation is optimized for a typical presentation viewport (projector/large screen).

| Level | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| Display XL | `4rem` (64px) | 800 | 1.05 | -0.03em | Slide main titles (hero moment) |
| Display | `3rem` (48px) | 700 | 1.1 | -0.02em | Section headings |
| H1 | `2.25rem` (36px) | 700 | 1.2 | -0.01em | Slide titles |
| H2 | `1.75rem` (28px) | 600 | 1.25 | 0 | Card titles, sub-headings |
| H3 | `1.375rem` (22px) | 600 | 1.3 | 0 | Feature labels, list headers |
| Body | `1.125rem` (18px) | 400 | 1.6 | 0.01em | Main body text (larger for presentations) |
| Body Small | `0.9375rem` (15px) | 400 | 1.5 | 0.01em | Secondary body, descriptions |
| Caption | `0.8125rem` (13px) | 500 | 1.4 | 0.02em | Labels, badges, metadata |
| Data | `3.5rem` (56px) | 800 | 1.0 | -0.02em | Large data figures (monospace) |
| Data Small | `1.5rem` (24px) | 700 | 1.1 | -0.01em | Medium data figures |

### Typography Rules
- Titles use the primary theme color (`var(--primary)`) or dark text
- Body text uses `var(--text-primary)`
- Captions and secondary info use `var(--text-secondary)`
- Data/numbers use monospace font for tabular alignment and tech feel
- Maximum line width for body text: `52ch` for readability
- Text selection color: `var(--primary)` background at 20% opacity

---

## Spacing System

Based on an `8px` grid unit.

| Token | Value |
|-------|-------|
| `space-1` | `4px` |
| `space-2` | `8px` |
| `space-3` | `12px` |
| `space-4` | `16px` |
| `space-5` | `24px` |
| `space-6` | `32px` |
| `space-7` | `48px` |
| `space-8` | `64px` |
| `space-9` | `96px` |
| `space-10` | `128px` |

### Slide Layout Padding
- **Horizontal**: `clamp(2rem, 5vw, 6rem)` — responsive padding
- **Vertical**: `clamp(3rem, 8vh, 6rem)` — comfortable vertical breathing room
- **Content max-width**: `1400px` centered

---

## Component Design

### Navigation Controls (Bottom Bar)

Fixed bottom bar across all slides, centered horizontally, `z-index: 50`.

```
[◀ Prev]  [  5 / 18  ]  [Next ▶]
```

- **Container**: Height `56px`, background `var(--card-bg)` with `backdrop-filter: blur(12px)`, border-top `1px solid var(--border)`, box-shadow `0 -4px 24px var(--shadow)`
- **Prev/Next buttons**: Width `100px`, height `40px`, border-radius `20px`, background `var(--primary)`, color white, font-weight `600`, font-size `0.875rem`. Hover: scale `1.05`, background `var(--primary-dark)`. Disabled state (first/last slide): opacity `0.35`, cursor `not-allowed`
- **Slide counter**: Font-size `0.9375rem`, font-weight `500`, color `var(--text-secondary)`. Format: `"5 / 18"`. Current slide number in `var(--primary)` with `font-weight: 700`
- **Position**: `position: fixed; bottom: 0; left: 0; right: 0`

### Progress Bar

Thin horizontal bar at the very top of the viewport, `z-index: 50`.

- **Track**: Height `3px`, background transparent
- **Fill**: Height `3px`, background `linear-gradient(90deg, var(--primary), var(--secondary))`, width animated from `0%` to `100%` based on current slide index
- **Transition**: `width 0.5s cubic-bezier(0.4, 0, 0.2, 1)`

### Theme Toggle

A floating circular button in the top-right corner, `z-index: 50`.

- **Size**: `44px × 44px`, border-radius `50%`
- **Background**: `var(--card-bg)`, border `1px solid var(--border)`, box-shadow `0 2px 12px var(--shadow)`
- **Icon**: Palette icon, color `var(--primary)`, size `20px`
- **Click behavior**: Opens a small popover below with 3 theme options as colored dots with labels
- **Theme options**:
  - Blue dot + "Blue" label → Theme 1
  - Dark dot + "Dark" label → Theme 2
  - Warm dot + "Warm" label → Theme 3
- **Hover**: scale `1.1`, icon rotates `30deg`
- **Popover**: `padding: 8px`, border-radius `12px`, background `var(--card-bg)`, border `1px solid var(--border)`, box-shadow `0 8px 32px var(--shadow)`

### Slide Container

Each slide is a `section` element:

- `width: 100vw; min-height: 100vh;`
- `display: flex; flex-direction: column;`
- `position: relative; overflow: hidden;`
- Background alternates between `var(--bg-primary)` and `var(--bg-secondary)` for visual rhythm

### Data Highlight Card

Used for efficiency improvement metrics and key statistics.

- **Container**: `padding: 24px 32px`, border-radius `16px`, background `var(--card-bg)`, border `1px solid var(--border)`, box-shadow `0 4px 16px var(--shadow)`
- **Metric number**: Font `Data` (3.5rem), color `var(--accent)`, font-family monospace, `font-weight: 800`
- **Label**: Font `Caption` (0.8125rem), color `var(--text-secondary)`, uppercase, `letter-spacing: 0.05em`
- **Description**: Font `Body Small`, color `var(--text-secondary)`, margin-top `8px`
- **Arrow indicator**: Small arrow icon between before/after values, color `var(--success)`
- **Hover effect**: translateY `-4px`, box-shadow deepens, transition `0.3s ease`

### Comparison Table

Used for agent comparison and capability matrices.

- **Container**: border-radius `12px`, overflow hidden, border `1px solid var(--border)`
- **Header row**: Background `var(--primary)`, color white, font-weight `600`, font-size `0.9375rem`, padding `14px 20px`
- **Data rows**: Alternating backgrounds `var(--bg-primary)` and `var(--bg-secondary)`, padding `12px 20px`
- **Row hover**: Background `var(--bg-accent)`, transition `0.2s`
- **Check/X icons**: Check uses `var(--success)`, X uses `var(--accent)`
- **Featured column**: Left border `3px solid var(--primary)`, subtle highlight
- **Border between cells**: `1px solid var(--border)`

### Flow Diagram (CSS-based)

Used for ReAct loop, architecture diagrams, and process timelines.

- **Nodes**: Rounded rectangles (`border-radius: 12px`), padding `16px 24px`, background `var(--card-bg)`, border `2px solid var(--primary)`, box-shadow `0 4px 12px var(--shadow)`
- **Node title**: Font `H3`, color `var(--primary)`
- **Node description**: Font `Body Small`, color `var(--text-secondary)`
- **Connecting arrows**: CSS `::after` pseudo-elements with arrow icons, color `var(--secondary)`, stroke-width `2px`
- **Arrow animation**: Dashed stroke with `stroke-dashoffset` animation for flowing effect
- **Active node**: Background `var(--bg-accent)`, border-color `var(--secondary)`, scale `1.02`
- **Layout**: Flexbox row with `gap: 24px`, vertically centered. On mobile: flex-direction column

### Feature Card (Icon-based)

Used for capability showcases and feature lists.

- **Container**: `padding: 28px`, border-radius `16px`, background `var(--card-bg)`, border `1px solid var(--border)`, transition `all 0.3s ease`
- **Icon container**: `48px × 48px`, border-radius `12px`, background `var(--bg-accent)`, display flex center, margin-bottom `16px`
- **Icon**: Size `24px`, color `var(--primary)`
- **Title**: Font `H3`, color `var(--text-primary)`, margin-bottom `8px`
- **Description**: Font `Body Small`, color `var(--text-secondary)`, line-height `1.6`
- **Hover**: translateY `-6px`, border-color `var(--primary)`, box-shadow `0 12px 32px var(--shadow)`, icon container background shifts to `var(--primary)` and icon becomes white

### Expandable Detail Section

Collapsible section within slides for optional deep-dive content.

- **Toggle button**: Width `100%`, padding `14px 20px`, border-radius `12px`, background `var(--bg-accent)`, border `1px solid var(--border)`, display flex between
  - **Left**: Chevron-down icon (rotates 180deg when open) + "More Details" label in Font `Body Small` weight `600`, color `var(--primary)`
  - **Right**: "Click to expand" hint text in Font `Caption`, color `var(--text-light)`
- **Toggle hover**: Background darkens slightly, chevron moves down `2px`
- **Expanded content**: padding `20px`, border-radius `0 0 12px 12px`, background `var(--bg-primary)`, border `1px solid var(--border)`, border-top none
  - Content animates in with `height: 0 → auto` via GSAP, `opacity: 0 → 1`, `duration: 0.35s`, `ease: power2.out`
- **Only one expandable section open per slide** — opening another closes the first

### Badge/Pill

Used for labels, status indicators, category tags.

- **Padding**: `4px 12px`
- **Border-radius**: `9999px` (full pill)
- **Font**: Font `Caption`, weight `600`
- **Variants**:
  - Primary: background `var(--primary)` at 10% opacity, color `var(--primary)`, border `1px solid var(--primary)` at 20% opacity
  - Accent: background `var(--accent)` at 10% opacity, color `var(--accent)`, border `1px solid var(--accent)` at 20% opacity
  - Success: background `var(--success)` at 10% opacity, color `var(--success)`, border `1px solid var(--success)` at 20% opacity

### Timeline Item

Used for the ChatGPT→Agent evolution timeline and the 10-step scenario walkthrough.

- **Container**: Display flex, gap `16px`, position relative
- **Timeline line**: Absolute, left `20px`, top `0`, bottom `0`, width `2px`, background `var(--border)`
- **Dot**: `40px × 40px`, border-radius `50%`, background `var(--primary)`, color white, display flex center, font-weight `700`, font-size `0.875rem`, z-index `1`
- **Active dot**: Background `var(--secondary)`, ring `4px solid var(--bg-accent)`
- **Content**: Flex-1, padding-left `8px`
- **Year/Step label**: Font `Caption`, color `var(--text-light)`, margin-bottom `4px`
- **Title**: Font `H3`, color `var(--text-primary)`
- **Description**: Font `Body Small`, color `var(--text-secondary)`, margin-top `4px`

---

## Animation & Motion

### Slide Transition System

The presentation uses a custom slide transition system (NOT Lenis scroll — this is a slide deck, not a scrolling page).

- **Transition type**: Horizontal slide + fade
- **Direction**: Next slide enters from right, current exits to left. Previous slide: reverse.
- **Entering slide**: `translateX(100px) → translateX(0)`, `opacity: 0 → 1`, `duration: 0.5s`, `ease: power3.out`
- **Exiting slide**: `translateX(0) → translateX(-100px)`, `opacity: 1 → 0`, `duration: 0.4s`, `ease: power3.in`
- **Background**: Slides use `position: absolute` stacked, with `opacity` and `transform` animated. Only the active slide is `pointer-events: auto`.
- **GSAP Timeline**: Each slide transition is orchestrated via a GSAP timeline that:
  1. Fires `onLeave` callback for outgoing slide (reverse its entrance animations)
  2. Animates outgoing slide out
  3. Animates incoming slide in
  4. Fires `onEnter` callback for incoming slide (trigger entrance animations)

### Global Entrance Animation Pattern

Elements within each slide follow a staggered entrance pattern triggered when the slide becomes active.

**Default entrance (used by most slides):**
1. **Title**: `opacity: 0 → 1`, `translateY(30px) → 0`, `duration: 0.6s`, `ease: power3.out`, `delay: 0.1s`
2. **Subtitle/description**: `opacity: 0 → 1`, `translateY(20px) → 0`, `duration: 0.5s`, `ease: power3.out`, `delay: 0.2s`
3. **Main content (cards, diagrams)**: `opacity: 0 → 1`, `translateY(30px) → 0`, `duration: 0.5s`, `ease: power3.out`, `delay: 0.3s`, children staggered `0.08s`
4. **Footer/secondary**: `opacity: 0 → 1`, `duration: 0.4s`, `delay: 0.5s`

**Hero entrance (slides 1, 18):**
1. **Background**: Subtle scale `1.05 → 1`, `duration: 1.2s`, `ease: power2.out`
2. **Title characters**: SplitText character animation, each char `opacity: 0 → 1`, `translateY(40px) → 0`, stagger `0.02s`, `duration: 0.6s`, `ease: back.out(1.7)`, `delay: 0.3s`
3. **Subtitle**: `opacity: 0 → 1`, `translateY(20px) → 0`, `duration: 0.6s`, `delay: 0.8s`
4. **CTA/badge**: `opacity: 0 → 1`, `scale: 0.9 → 1`, `duration: 0.5s`, `delay: 1.0s`, `ease: back.out(1.5)`

**Counter animation (data slides):**
- Numbers count up from `0` to target value over `1.5s` using GSAP's `textContent` tween with `snap` to integers
- `ease: power2.out` for satisfying deceleration
- Triggered when slide enters, reset when slide leaves

### Hover Micro-interactions

- **Buttons**: `scale(1.03)`, background color shift, `transition: all 0.2s ease`
- **Cards**: `translateY(-4px)`, shadow deepens, `transition: all 0.3s ease`
- **Nav buttons**: `scale(1.05)`, `transition: 0.2s`
- **Theme toggle**: Icon rotates `30deg`, `scale(1.1)`
- **Expandable toggle**: Chevron bounces `translateY(2px)`

### Continuous Ambient Animations

- **Decorative gradient orbs** (on cover and thank-you slides): Slow floating motion using GSAP `yoyo` timeline, `duration: 8s`, `ease: sine.inOut`, infinite loop. Two orbs in `var(--secondary)` and `var(--primary)` at very low opacity (`0.06`), `blur(80px)`, positioned behind content
- **Progress bar fill**: Smooth width transition on slide change, `duration: 0.5s`

### Keyboard Interaction Animations

- **Arrow key press**: Brief flash on corresponding nav button — `scale(0.95)` then `scale(1)`, `duration: 0.15s`
- **Space bar**: Same as next button with subtle pulse on the slide container (`scale: 1 → 0.995 → 1`)

---

## Responsive Behavior

### Breakpoints

| Name | Width | Notes |
|------|-------|-------|
| Mobile | < 768px | Single column, stacked layouts |
| Tablet | 768–1024px | 2-column grids, adjusted spacing |
| Desktop | 1024–1440px | Full layout as designed |
| Large | > 1440px | Max-width container centered |

### Responsive Adjustments

- **Mobile**: Flow diagrams become vertical stacks, comparison tables become horizontally scrollable cards, feature cards stack to single column, data highlight cards stack, navigation buttons become icon-only (no text)
- **Tablet**: 2-column grids for feature cards and data highlights, flow diagrams may wrap to 2 rows
- **Font sizes**: Display XL scales down to `2.5rem` on mobile, Display to `2rem`, H1 to `1.75rem`, Data to `2.5rem`
- **Slide padding**: Reduced to `1.5rem` horizontal on mobile
- **Bottom nav**: Height reduced to `48px` on mobile, buttons become `44px` circles with icons only

---

## Shared Components

### Top Bar

Fixed top bar, `z-index: 50`, height `48px`.

- **Left**: Small China Mobile logo mark (blue icon) + "AI Agent Technology Seminar" text in Font `Caption`, color `var(--text-secondary)`, truncated with ellipsis on small screens
- **Right**: Theme toggle button (circular palette icon) + fullscreen toggle button (optional)
- **Background**: `var(--bg-primary)` at `90%` opacity with `backdrop-filter: blur(12px)`, border-bottom `1px solid var(--border)`
- **Visibility**: Can be hidden on cover and thank-you slides for cleaner hero look (auto-hide on slide 1 and 18)

### Bottom Navigation Bar

(See Component Design > Navigation Controls above)

Fixed at bottom, always visible except when transitioning.

### Keyboard Navigation

- `ArrowRight` / `ArrowDown` / `Space` / `PageDown` → Next slide
- `ArrowLeft` / `ArrowUp` / `PageUp` → Previous slide
- `Home` → First slide
- `End` → Last slide
- `F` → Toggle fullscreen (optional)

All key handlers use `event.preventDefault()` and `throttle` to prevent rapid-fire transitions (min `600ms` between transitions).

### Slide State Management

- **Current slide index**: Stored in React state (`useState`), initialized to `0`
- **Slide direction**: `"next" | "prev"` tracked for transition direction
- **Transition lock**: Boolean flag to prevent overlapping transitions
- **Theme**: `"blue" | "dark" | "warm"` stored in state + `localStorage`
- **Expanded sections**: Per-slide Set of expanded section IDs

---

## Dependencies

### shadcn/ui Components
- `Button` — Nav controls, expandable toggles
- `Badge` — Labels, status indicators
- `Card` — Feature cards, data highlight cards
- `Collapsible` — Expandable detail sections
- `Tooltip` — Nav button hints

### Animation Libraries
- **GSAP** + **ScrollTrigger** — Slide transitions, entrance animations, counter animations, ambient orbs
- **No Lenis** — This is a slide deck, not a scrolling page

### Icons
- **Lucide React** — All icons ( ChevronLeft, ChevronRight, ChevronDown, Palette, Maximize, Zap, Brain, Code, Server, Globe, Shield, Clock, TrendingUp, CheckCircle, XCircle, ArrowRight, Layers, Cpu, Database, Mail, FileText, Activity, BarChart3, Settings, Users, Sparkles )

### Fonts
- **Google Fonts**: `Inter` (weights: 400, 500, 600, 700, 800) + `JetBrains Mono` (weights: 400, 700)

---

## Assets

| Filename | Description | Location | Dimensions | Type |
|----------|-------------|----------|------------|------|
| `cm-logo.svg` | China Mobile logo — simplified blue mark with "China Mobile" text | Top bar, Cover slide | 160×40 | SVG |
| `hero-orb-1.svg` | Large soft gradient orb, blue-to-cyan, very low opacity, for decorative background | Cover slide, Thank-you slide | 600×600 | SVG |
| `hero-orb-2.svg` | Large soft gradient orb, cyan-to-transparent, very low opacity | Cover slide, Thank-you slide | 500×500 | SVG |
| `react-loop-diagram.svg` | Circular ReAct loop diagram: Thought → Action → Observation arrows in a cycle with a center label "ReAct Paradigm" | Slide 5 | 500×400 | SVG |
| `mcp-diagram.svg` | MCP protocol diagram: Agent on left, MCP Layer in center (labeled "Universal Connector"), connected tools on right (Calendar, Files, Database, Browser, Email) | Slide 6 | 600×350 | SVG |
| `openclaw-architecture.svg` | OpenClaw architecture: 3-tier diagram — Gateway (top) → Node (middle) → Channel (bottom) with connecting lines | Slide 7 | 700×400 | SVG |
| `memory-layers.svg` | 4-layer pyramid/stack diagram: SOUL (top, widest) → TOOLS → USER → Session (bottom, narrowest) with labels | Slide 8 | 500×450 | SVG |

**Note**: All SVG assets are vector-based illustrations with clean, minimal line art style. Colors use CSS `currentColor` or the design tokens so they adapt to themes. Style is flat, modern, with subtle shadows — no 3D or photorealistic elements.

---

## File Structure

```
src/
├── slides/
│   ├── Slide01_Cover.tsx
│   ├── Slide02_TOC.tsx
│   ├── Slide03_Evolution1.tsx
│   ├── Slide04_Evolution2.tsx
│   ├── Slide05_ReAct.tsx
│   ├── Slide06_MCP_Skills.tsx
│   ├── Slide07_OpenClaw1.tsx
│   ├── Slide08_OpenClaw2.tsx
│   ├── Slide09_OpenClaw3.tsx
│   ├── Slide10_Comparison.tsx
│   ├── Slide11_Capabilities.tsx
│   ├── Slide12_ScenarioWalkthrough.tsx
│   ├── Slide13_CM_Scenario1.tsx
│   ├── Slide14_CM_Scenario2.tsx
│   ├── Slide15_CM_Scenario3.tsx
│   ├── Slide16_CM_Scenario4.tsx
│   ├── Slide17_Summary.tsx
│   └── Slide18_ThankYou.tsx
├── components/
│   ├── TopBar.tsx
│   ├── BottomNav.tsx
│   ├── ProgressBar.tsx
│   ├── ThemeToggle.tsx
│   ├── DataCard.tsx
│   ├── ComparisonTable.tsx
│   ├── FlowDiagram.tsx
│   ├── FeatureCard.tsx
│   ├── ExpandableSection.tsx
│   ├── TimelineItem.tsx
│   └── Badge.tsx
├── hooks/
│   ├── useKeyboardNav.ts
│   ├── useSlideTransition.ts
│   └── useTheme.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## Performance Notes

- **Slide virtualization**: Only the current slide and adjacent slides are mounted. Others are unmounted to keep DOM light. Use React `AnimatePresence` for enter/exit transitions.
- **GSAP cleanup**: All GSAP timelines are killed on component unmount. Use `useGSAP` hook from `@gsap/react`.
- **Animation budget**: Max 8-10 simultaneously animating elements per slide. Complex slides (comparison tables, flow diagrams) stagger animations across phases.
- **Counter animations**: Use GSAP `to()` with `snap` for number counting. Kill and reset on slide exit.
- **CSS transitions for simple hovers**: Use CSS for hover micro-interactions (cards, buttons) — reserve GSAP for entrance and transition animations.

---

## Accessibility

- **Reduced motion**: All animations respect `prefers-reduced-motion: reduce` — instant transitions, no counter animation, no orb floating.
- **Focus management**: Focus is trapped within the active slide during transitions. Nav buttons have visible focus rings (`2px solid var(--primary)`).
- **ARIA**: Each slide section has `role="region"` and `aria-label="Slide X of 18: [Title]"`. Navigation buttons have `aria-label="Previous slide"` / `aria-label="Next slide"`.
- **Screen reader announcements**: Slide changes announced via `aria-live="polite"` region with current slide title.
- **Keyboard shortcuts**: All documented and discoverable via `?` key (help overlay — optional enhancement).