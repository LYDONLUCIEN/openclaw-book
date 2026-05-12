# Presentation Page — All 18 Slides

The presentation is a single-page application where each slide is a full-viewport section. Only one slide is visible at a time, with GSAP-powered horizontal slide transitions between them. Each slide is a self-contained component module.

---

## Slide 01 — Cover Page

### Overview
A bold, welcoming hero slide that sets the tone. Clean, fresh, and professional — not corporate-stiff, not overly techy. The design balances China Mobile brand identity with an approachable, modern tech aesthetic.

### Layout
- **Structure**: Full viewport, single centered column, content vertically and horizontally centered
- **Background**: `var(--bg-primary)` (`#FFFFFF` in blue theme) with two large decorative gradient orbs (`hero-orb-1.svg`, `hero-orb-2.svg`) positioned behind content at very low opacity, slowly floating
- **Top bar**: Hidden on this slide for maximum impact
- **Bottom nav**: Visible

### Elements

#### Element: "Event Badge"
- **Content**: Pill badge — "China Mobile Internal Training" + calendar icon + "2025"
- **Style**: Badge component, Primary variant
- **Position**: Above the title, centered, margin-bottom `24px`
- **Animation**: `opacity: 0→1`, `scale: 0.9→1`, `duration: 0.5s`, `delay: 0.2s`, `ease: back.out(1.5)`

#### Element: "Main Title"
- **Content**: Line 1: "AI Agent Technology" / Line 2: "Deep Dive Seminar"
- **Style**: Font `Display XL` (4rem, 800 weight), color `var(--primary)`, text-align center, line-height `1.05`
- **Animation**: GSAP SplitText per-character, each char `opacity: 0→1`, `translateY(40px)→0`, stagger `0.02s`, `duration: 0.6s`, `ease: back.out(1.7)`, `delay: 0.4s`. Second line starts `0.15s` after first line.

#### Element: "Subtitle"
- **Content**: "From Concepts to Practice — Empowering Digital Transformation"
- **Style**: Font `H2` (1.75rem, 600 weight), color `var(--text-secondary)`, text-align center, margin-top `24px`, max-width `600px`
- **Animation**: `opacity: 0→1`, `translateY(20px)→0`, `duration: 0.6s`, `delay: 1.0s`, `ease: power3.out`

#### Element: "Decorative Divider"
- **Content**: A thin horizontal line, `120px` wide, `2px` height, centered
- **Style**: Background `linear-gradient(90deg, transparent, var(--secondary), transparent)`, margin `32px auto`
- **Animation**: `scaleX: 0→1` (from center), `duration: 0.6s`, `delay: 1.2s`, `ease: power3.out`

#### Element: "Presenter Info"
- **Content**: "Presenter: [Name] | Department | Date"
- **Style**: Font `Body Small`, color `var(--text-light)`, text-align center
- **Animation**: `opacity: 0→1`, `duration: 0.5s`, `delay: 1.4s`

#### Element: "Decorative Orbs"
- Two large SVG orbs (`hero-orb-1.svg` in blue, `hero-orb-2.svg` in cyan) positioned:
  - Orb 1: Top-right quadrant, `width: 500px`, `opacity: 0.06`, `filter: blur(80px)`
  - Orb 2: Bottom-left quadrant, `width: 400px`, `opacity: 0.05`, `filter: blur(80px)`
- **Animation**: Continuous slow float — `translateY(-20px ↔ +20px)`, `duration: 8s`, `ease: sine.inOut`, `yoyo: true`, `repeat: -1`, each orb offset by `3s`

### Responsive
- Mobile: Title drops to `2.5rem`, subtitle to `1.25rem`, orbs hidden (performance)
- Tablet: Title at `3rem`

---

## Slide 02 — Table of Contents

### Overview
A clean, scannable overview of the entire seminar. Four main sections displayed as a 2×2 grid of topic cards with numbered indicators, giving the audience a roadmap of what's ahead.

### Layout
- **Background**: `var(--bg-secondary)` (`#F8FAFC`)
- **Structure**: Title at top, 2×2 grid below, centered

### Elements

#### Element: "Slide Title"
- **Content**: "Today's Agenda"
- **Style**: Font `H1` (2.25rem), color `var(--primary)`, text-align center, margin-bottom `16px`
- **Animation**: `opacity: 0→1`, `translateY(20px)→0`, `duration: 0.5s`, `delay: 0.1s`

#### Element: "Subtitle"
- **Content**: "Four modules, 18 slides — from concepts to real-world applications"
- **Style**: Font `Body`, color `var(--text-secondary)`, text-align center, margin-bottom `48px`
- **Animation**: `opacity: 0→1`, `translateY(15px)→0`, `duration: 0.5s`, `delay: 0.2s`

#### Element: "TOC Grid" (4 cards in 2×2)
Each card represents a major section:

**Card 1 — "AI Agent Evolution"**
- Number: "01" in monospace, color `var(--primary)`, font-size `2rem`, weight `800`
- Title: "From ChatGPT to Agents" — Font `H2`, color `var(--text-primary)`
- Description: "The journey from conversational AI to autonomous agents" — Font `Body Small`, color `var(--text-secondary)`
- Slides: "Slides 3–6" — Badge, Caption style
- Icon: `Brain` Lucide icon, `24px`, color `var(--primary)`

**Card 2 — "OpenClaw Deep Dive"**
- Number: "02"
- Title: "OpenClaw Architecture"
- Description: "The world's most popular AI agent framework"
- Slides: "Slides 7–9"
- Icon: `Zap` Lucide icon

**Card 3 — "Agent Capabilities"**
- Number: "03"
- Title: "What Can Agents Do?"
- Description: "Real capabilities and scenario walkthroughs"
- Slides: "Slides 10–12"
- Icon: `Cpu` Lucide icon

**Card 4 — "China Mobile Scenarios"**
- Number: "04"
- Title: "Practical Applications"
- Description: "Four real-world scenarios at China Mobile"
- Slides: "Slides 13–16"
- Icon: `Globe` Lucide icon (or China Mobile icon)

- **Card style**: Feature Card component (see design.md)
- **Animation**: Cards stagger in — each card `opacity: 0→1`, `translateY(30px)→0`, `scale: 0.97→1`, stagger `0.1s`, `duration: 0.5s`, `delay: 0.3s`, `ease: power3.out`

#### Element: "Progress Indicator"
- **Content**: Four small dots below the grid, connected by a thin line
- **Style**: Dots are `10px` circles, the first is filled `var(--primary)`, rest are `var(--border)`. Connecting line is `1px` `var(--border)`.
- **Animation**: Dots fade in staggered `0.1s` after cards

### Responsive
- Mobile: Grid becomes single column (1×4), cards stack vertically
- Tablet: 2×2 grid maintained with smaller padding

---

## Slide 03 — From ChatGPT to Agent: Evolution (Part 1)

### Overview
A timeline-driven narrative slide showing the evolution from ChatGPT (2022) to the Agentic era. Uses a vertical timeline layout with key milestones, explaining the progression in a story-like way that's easy for non-technical audiences to follow.

### Layout
- **Background**: `var(--bg-primary)`
- **Structure**: Title + subtitle top-left, vertical timeline on the left half of the slide, with a brief explanatory panel on the right half

### Elements

#### Element: "Slide Title"
- **Content**: "The Journey: ChatGPT to AI Agents"
- **Style**: Font `H1`, color `var(--primary)`, margin-bottom `8px`
- **Animation**: Default entrance — `opacity: 0→1`, `translateY(20px)→0`, `duration: 0.5s`, `delay: 0.1s`

#### Element: "Subtitle"
- **Content**: "How AI went from answering questions to taking action"
- **Style**: Font `Body`, color `var(--text-secondary)`, margin-bottom `40px`
- **Animation**: Default entrance, `delay: 0.2s`

#### Element: "Timeline" (3 milestones)

**Milestone 1 — "2022: ChatGPT Era"**
- Year: "2022"
- Title: "Conversational AI"
- Description: "Ask a question, get an answer. AI as a chatbot — helpful but passive."
- Status: "Past" — dot in `var(--text-light)`

**Milestone 2 — "2023-2024: Copilot Era"**
- Year: "2023–2024"
- Title: "AI as Assistant (Copilot)"
- Description: "AI works alongside you — suggesting code, drafting emails, but still needs human direction."
- Status: "Current" — dot in `var(--primary)` with pulsing ring animation (`ring 4px solid var(--primary)` at 30% opacity, pulsing scale `1→1.3→1`, `duration: 2s`, infinite)

**Milestone 3 — "2025: Vibe Coding"**
- Year: "2025"
- Title: "Vibe Coding"
- Description: "Describe what you want in natural language, AI writes the code. Programming without coding."
- Status: "Emerging" — dot in `var(--secondary)`

- **Style**: TimelineItem component (see design.md)
- **Animation**: Each milestone staggers in — `opacity: 0→1`, `translateX(-20px)→0`, stagger `0.15s`, `duration: 0.5s`, `delay: 0.3s`. The pulsing ring on milestone 2 starts after its entrance completes.

#### Element: "Insight Panel" (right side)
- **Content**:
  - Heading: "Key Insight" — Font `H3`, color `var(--accent)`
  - Body: "Each step makes AI more autonomous. From answering → assisting → creating → acting independently."
  - Callout: "2026: The Year of Agents" — highlighted in a box with `var(--bg-accent)` background, border-left `4px solid var(--accent)`, padding `16px 20px`, Font `Body` weight `600`, color `var(--accent)`
- **Style**: Card-like panel with `var(--bg-secondary)` background, `border-radius: 16px`, `padding: 28px`, max-width `400px`
- **Animation**: `opacity: 0→1`, `translateX(30px)→0`, `duration: 0.6s`, `delay: 0.6s`, `ease: power3.out`

#### Element: "Expandable Section" (optional deep-dive)
- **Toggle label**: "What is 'Vibe Coding'?"
- **Expanded content**:
  - Definition: "Vibe Coding is a new programming paradigm where you describe software in natural language, and AI generates the complete implementation."
  - Quote: "'The hottest new programming language is English' — Andrej Karpathy, Feb 2025" (styled as a blockquote with left border `3px solid var(--secondary)`, italic, `var(--text-secondary)`)
  - Example: A small code-like snippet showing natural language → generated code transformation
- **Animation**: Collapsible expand with GSAP height animation, `duration: 0.35s`

### Responsive
- Mobile: Timeline and insight panel stack vertically (timeline first)
- Tablet: Side-by-side maintained with narrower panel

---

## Slide 04 — From ChatGPT to Agent: Evolution (Part 2)

### Overview
Focuses on the 2026 Agentic era prediction and the "Agent = LLM + Tools + Autonomy" formula. A conceptual slide with a central visual formula and supporting explanation cards.

### Layout
- **Background**: `var(--bg-secondary)`
- **Structure**: Title top, a large central "formula" visual, three supporting cards below

### Elements

#### Element: "Slide Title"
- **Content**: "2026: The Year of AI Agents"
- **Style**: Font `H1`, color `var(--primary)`, text-align center
- **Animation**: Default entrance

#### Element: "Subtitle"
- **Content**: "The formula for an autonomous AI agent"
- **Style**: Font `Body`, color `var(--text-secondary)`, text-align center, margin-bottom `40px`
- **Animation**: Default entrance, `delay: 0.15s`

#### Element: "Agent Formula" (centerpiece visual)
A visual equation showing what makes an Agent:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│   LLM       │  +  │    Tools    │  +  │   Autonomy      │
│  (Brain)    │     │  (Hands)    │     │  (Decision)     │
└─────────────┘     └─────────────┘     └─────────────────┘
         ↓                    ↓                     ↓
   ┌──────────────────────────────────────────────────┐
   │              AI Agent                              │
   │      (Thinks, Acts, Decides Independently)        │
   └──────────────────────────────────────────────────┘
```

- **Implementation**: Three rounded cards connected by `+` signs, feeding into a larger result card below
- **LLM card**: Background `var(--bg-accent)`, border `2px solid var(--primary)`, icon `Brain`, label "LLM" in `H2`, sublabel "The Brain" in Caption
- **Tools card**: Same style, icon `Wrench` (or `Settings`), label "Tools", sublabel "The Hands"
- **Autonomy card**: Same style, icon `Sparkles`, label "Autonomy", sublabel "The Decision Maker"
- **Result card** (larger): Background `var(--primary)`, color white, border-radius `16px`, icon `Zap`, label "AI Agent" in Display size (white), sublabel "Thinks · Acts · Decides Independently"
- **Plus signs**: `+` in Font `Display`, color `var(--secondary)`, between cards
- **Connecting arrows**: Downward arrows from each component card to the result card, color `var(--secondary)`
- **Animation**:
  1. Three component cards stagger in from top — `opacity: 0→1`, `translateY(-20px)→0`, `scale: 0.95→1`, stagger `0.12s`, `duration: 0.5s`, `delay: 0.3s`
  2. Plus signs fade in — `opacity: 0→1`, `duration: 0.3s`, `delay: 0.6s`
  3. Arrows draw in (SVG stroke animation) — `stroke-dashoffset` from full to `0`, `duration: 0.5s`, `delay: 0.7s`
  4. Result card rises up — `opacity: 0→1`, `translateY(30px)→0`, `scale: 0.95→1`, `duration: 0.6s`, `delay: 0.9s`, `ease: back.out(1.3)`

#### Element: "Supporting Cards" (3 cards below formula)

**Card 1 — "LLM: The Brain"**
- Icon: `Brain`
- Text: "Large Language Models like GPT-4 provide reasoning, understanding, and decision-making capabilities."
- Feature Card component style

**Card 2 — "Tools: The Hands"**
- Icon: `Wrench`
- Text: "APIs, databases, browsers, email — tools let the agent interact with the real world."

**Card 3 — "Autonomy: The Mindset"**
- Icon: `Sparkles`
- Text: "The agent decides what to do next, loops through think-act-observe cycles without human input."

- **Animation**: Cards stagger in from bottom — `opacity: 0→1`, `translateY(30px)→0`, stagger `0.1s`, `duration: 0.5s`, `delay: 1.2s`

#### Element: "Expandable Section"
- **Toggle label**: "Why 2026? Evidence from Industry Leaders"
- **Expanded content**:
  - Quote from Jensen Huang (NVIDIA CEO): "AI agents will be the primary workforce by 2026"
  - Quote from Satya Nadella (Microsoft CEO): "Every organization will have agent-based workflows"
  - Market prediction: "Gartner predicts 80% of enterprises will deploy AI agents by 2027"
  - Each quote styled with speaker photo placeholder (initials circle), company logo placeholder, and quote text in italic

### Responsive
- Mobile: Formula cards stack vertically (LLM → Tools → Autonomy → Agent result), plus signs become horizontal dividers. Supporting cards stack.
- Tablet: Formula cards may wrap to 2+1 layout

---

## Slide 05 — Core Concept: ReAct Paradigm

### Overview
Explains the ReAct (Reasoning + Acting) paradigm with a clear visual loop diagram. This is a key technical concept made accessible through visual storytelling.

### Layout
- **Background**: `var(--bg-primary)`
- **Structure**: Title top, circular ReAct loop diagram center-left, explanation text right

### Elements

#### Element: "Slide Title"
- **Content**: "ReAct: Think → Act → Observe"
- **Style**: Font `H1`, color `var(--primary)`
- **Animation**: Default entrance

#### Element: "Subtitle"
- **Content**: "The decision-making loop that powers every AI agent"
- **Style**: Font `Body`, color `var(--text-secondary)`, margin-bottom `32px`
- **Animation**: Default entrance, `delay: 0.15s`

#### Element: "ReAct Loop Diagram" (centerpiece)
A circular flow diagram with 3 nodes connected in a loop:

**Node 1 — "THINK"** (top of circle)
- Position: 12 o'clock
- Icon: `Brain`, color `var(--primary)`
- Label: "THINK" in `H2`, weight `700`
- Description: "Analyze the task and plan next steps" in Caption
- Style: Rounded rectangle, `padding: 20px 28px`, background `var(--bg-accent)`, border `2px solid var(--primary)`, border-radius `14px`, min-width `160px`, text-align center

**Node 2 — "ACT"** (bottom-right of circle)
- Position: 4 o'clock
- Icon: `Zap`
- Label: "ACT"
- Description: "Execute the planned action using tools"
- Style: Same as Node 1, border-color `var(--secondary)`

**Node 3 — "OBSERVE"** (bottom-left of circle)
- Position: 8 o'clock
- Icon: `Eye` (or `Search`)
- Label: "OBSERVE"
- Description: "Review the results and adjust the plan"
- Style: Same as Node 1, border-color `var(--accent)`

**Connecting Arrows**:
- Arrow 1: THINK → ACT, curving clockwise
- Arrow 2: ACT → OBSERVE, curving clockwise
- Arrow 3: OBSERVE → THINK, curving clockwise (completing the loop)
- Arrow style: `2px` stroke, color `var(--secondary)`, with arrowhead markers
- Arrow animation: Dashed line with `stroke-dasharray: 8 4`, animated `stroke-dashoffset` creating a flowing effect, `duration: 2s`, infinite, linear

**Center Label**:
- "ReAct Loop" in Font `H3`, color `var(--text-primary)`, positioned at the center of the circle
- Subtle circular background `var(--bg-secondary)`, `border-radius: 50%`, `padding: 20px`

- **Implementation**: SVG-based diagram for precise control, or CSS positioned elements with SVG arrows overlaid
- **Container size**: `450px × 450px` approximately
- **Animation**:
  1. Center label fades in — `opacity: 0→1`, `scale: 0.8→1`, `duration: 0.4s`, `delay: 0.3s`
  2. Three nodes appear in sequence (THINK → ACT → OBSERVE) — `opacity: 0→1`, `scale: 0.9→1`, stagger `0.15s`, `duration: 0.5s`, `delay: 0.4s`, `ease: back.out(1.5)`
  3. Arrows draw in — SVG stroke-dashoffset animation, `duration: 0.8s`, `delay: 0.9s`
  4. Arrow flow animation starts — continuous dashed-line movement

#### Element: "Explanation Panel" (right side)
- **Heading**: "How It Works" — Font `H2`, color `var(--primary)`
- **Step list** (numbered 1-3):
  1. **"Reasoning"** — "The LLM analyzes the current situation, breaks down the problem, and decides what information or action is needed." — Font `Body Small`, color `var(--text-secondary)`
  2. **"Action"** — "The agent executes the plan — calling APIs, browsing the web, querying databases, or sending emails." — Font `Body Small`
  3. **"Observation"** — "The agent reviews the outcome, learns from it, and decides whether to continue, adjust, or complete the task." — Font `Body Small`
- Each step has a numbered circle (`28px`, background `var(--primary)`, white text, weight `700`) to the left
- **Style**: `var(--bg-secondary)` background panel, `border-radius: 16px`, `padding: 28px`, max-width `420px`
- **Animation**: Panel slides in from right — `opacity: 0→1`, `translateX(30px)→0`, `duration: 0.6s`, `delay: 0.5s`. Steps within stagger `0.1s`.

#### Element: "Expandable Section"
- **Toggle label**: "ReAct in Action: A Real Example"
- **Expanded content**:
  - Scenario: "Find me the cheapest flight from Beijing to Shanghai next Friday"
  - Step-by-step walkthrough showing each ReAct iteration:
    - THINK: "User wants flight info. I need to search flights."
    - ACT: [Calls flight search API]
    - OBSERVE: "Found 5 flights ranging from ¥380 to ¥920"
    - THINK: "Need to identify the cheapest option"
    - ACT: [Sorts by price]
    - OBSERVE: "Cheapest is ¥380 on Airline X"
    - (Final answer provided)
  - Each step shown as a small card with THINK/ACT/OBSERVE badge

### Responsive
- Mobile: Loop diagram scales down to `300px`, positioned above the explanation panel. Panel goes full-width below.
- Tablet: Side-by-side maintained with smaller diagram

---

## Slide 06 — Core Concepts: MCP & Skills

### Overview
Two key concepts on one slide — MCP (Model Context Protocol) and the Skills system. Uses a split layout with a visual diagram for MCP on the left and a structured list for Skills on the right.

### Layout
- **Background**: `var(--bg-secondary)`
- **Structure**: Title top, two-column layout below — MCP diagram left (55%), Skills system right (45%)

### Elements

#### Element: "Slide Title"
- **Content**: "MCP Protocol & Skills System"
- **Style**: Font `H1`, color `var(--primary)`
- **Animation**: Default entrance

#### Element: "Subtitle"
- **Content**: "The universal connector and reusable capabilities that make agents powerful"
- **Style**: Font `Body`, color `var(--text-secondary)`, margin-bottom `36px`
- **Animation**: Default entrance, `delay: 0.15s`

#### Element: "MCP Section" (left column)

**MCP Header**
- Badge: "MCP" in Primary badge variant
- Title: "Model Context Protocol" — Font `H2`, color `var(--text-primary)`
- Subtitle: "A universal USB port for AI" — Font `Body`, color `var(--text-secondary)`, italic

**MCP Diagram** (visual centerpiece)
```
┌──────────┐         ┌─────────────────┐         ┌──────────────┐
│  Agent   │ ←─────→ │   MCP Layer     │ ←─────→ │   Tools      │
│  (LLM)   │         │ (Universal      │         │  · Calendar  │
│          │         │  Connector)     │         │  · Files     │
└──────────┘         └─────────────────┘         │  · Database  │
                                                  │  · Browser   │
                                                  │  · Email     │
                                                  └──────────────┘
```

- **Agent box**: Left, `padding: 20px`, background `var(--bg-accent)`, border `2px solid var(--primary)`, border-radius `12px`, icon `Brain`, label "Agent"
- **MCP Layer box**: Center, larger, `padding: 24px`, background `var(--primary)`, color white, border-radius `14px`, icon `Server`, label "MCP Layer" in `H3` white, sublabel "Universal Connector"
- **Tools cluster**: Right, a vertical stack of 5 small pill items:
  - "Calendar" with `Calendar` icon
  - "Files" with `FileText` icon
  - "Database" with `Database` icon
  - "Browser" with `Globe` icon
  - "Email" with `Mail` icon
  - Each pill: `padding: 6px 14px`, border-radius `8px`, background `var(--bg-primary)`, border `1px solid var(--border)`, Font `Caption`
- **Bidirectional arrows**: Between Agent ↔ MCP and MCP ↔ Tools, `2px` stroke, `var(--secondary)`, with arrowheads both ways
- **Animation**:
  1. Agent box — `opacity: 0→1`, `translateX(-20px)→0`, `duration: 0.5s`, `delay: 0.3s`
  2. MCP Layer — `opacity: 0→1`, `scale: 0.95→1`, `duration: 0.5s`, `delay: 0.45s`
  3. Tool pills — stagger from top, `opacity: 0→1`, `translateX(20px)→0`, stagger `0.06s`, `duration: 0.4s`, `delay: 0.6s`
  4. Arrows — stroke draw animation, `duration: 0.5s`, `delay: 0.8s`

#### Element: "Skills Section" (right column)

**Skills Header**
- Badge: "SKILL.md" in Accent badge variant
- Title: "Skills System" — Font `H2`
- Subtitle: "Reusable capabilities, like LEGO blocks" — Font `Body`, italic

**Skills List** (4 items)

1. **"Write Files"** — Icon `FileText`, color `var(--primary)`
   - "Create and edit documents, spreadsheets, and reports"
2. **"Browse the Web"** — Icon `Globe`
   - "Search information, read websites, download data"
3. **"Execute Code"** — Icon `Code`
   - "Run Python, JavaScript, and other programming languages"
4. **"Use APIs"** — Icon `Server`
   - "Connect to any service with a standard interface"

- Each item: Feature Card mini — horizontal layout with icon left, text right, `padding: 14px 18px`, background `var(--bg-primary)`, border `1px solid var(--border)`, border-radius `10px`, margin-bottom `10px`
- **Animation**: Items stagger in — `opacity: 0→1`, `translateX(20px)→0`, stagger `0.08s`, `duration: 0.4s`, `delay: 0.5s`

#### Element: "Bottom Insight Bar"
- **Content**: "One protocol, infinite possibilities. MCP is like USB for AI — one standard, connects everything."
- **Style**: Full-width bar, background `var(--bg-accent)`, border-left `4px solid var(--secondary)`, `padding: 16px 24px`, border-radius `0 12px 12px 0`, Font `Body` weight `500`, color `var(--text-primary)`
- **Position**: Below both columns, spanning full width
- **Animation**: `opacity: 0→1`, `translateY(15px)→0`, `duration: 0.5s`, `delay: 1.0s`

#### Element: "Expandable Section"
- **Toggle label**: "How MCP Works Under the Hood"
- **Expanded content**:
  - Technical explanation of MCP architecture: Client-Server model
  - JSON-RPC based communication
  - Three primitive types: Resources, Tools, Prompts
  - Small architecture diagram showing the client-server relationship
  - Key benefit: "Any tool that speaks MCP can work with any agent that speaks MCP"

### Responsive
- Mobile: Single column — MCP diagram full-width, Skills list below it
- Tablet: Side-by-side with 50/50 split


---

## Slide 07 — OpenClaw Deep Dive: Architecture (Part 1)

### Overview
Introduces OpenClaw as the world's most popular AI agent framework (278,932 GitHub stars). Uses a bold data highlight combined with a 3-tier architecture diagram to showcase its technical foundation.

### Layout
- **Background**: `var(--bg-primary)`
- **Structure**: Title + star count hero at top, architecture diagram below, key stats row at bottom

### Elements

#### Element: "Slide Title"
- **Content**: "OpenClaw: The World's #1 Agent Framework"
- **Style**: Font `H1`, color `var(--primary)`
- **Animation**: Default entrance

#### Element: "Star Count Hero"
- **Content**:
  - Number: "278,932" — Font `Data` (3.5rem, monospace, weight `800`), color `var(--accent)`
  - Label: "GitHub Stars" — Font `Caption`, color `var(--text-secondary)`, uppercase
  - Sub-label: "Global Rank #1 in AI Agent Frameworks" — Font `Body Small`, color `var(--text-light)`
  - GitHub icon beside the number (Lucide `Github` or `Star` icon)
- **Style**: Centered block, `padding: 24px 48px`, background `var(--bg-secondary)`, border-radius `16px`, border `1px solid var(--border)`, display inline-flex flex-column center
- **Animation**: Counter animation — number counts up from `0` to `278,932` over `1.5s`, `ease: power2.out`, `snap: 1`. Label and sublabel fade in after counter completes — `opacity: 0→1`, `duration: 0.4s`, `delay: 1.6s`.

#### Element: "Architecture Diagram" (3-tier)

```
┌──────────────────────────────────────────────────────────────┐
│                      GATEWAY                                  │
│         (Entry Point — Authentication & Routing)              │
├──────────────────────────────────────────────────────────────┤
│                       NODE                                    │
│    (Processing Engine — Task Execution & Memory)              │
├──────────────────────────────────────────────────────────────┤
│                     CHANNEL                                   │
│     (Communication — External Tools & APIs)                   │
└──────────────────────────────────────────────────────────────┘
```

- **Three horizontal tiers**, each a full-width rounded rectangle within the content area:

**Tier 1 — "Gateway"** (top)
- Background: `linear-gradient(135deg, var(--primary), var(--primary-dark))`, color white
- Height: `80px`, border-radius `14px`, padding `0 32px`, display flex align-items center
- Icon: `Shield` (Lucide), `28px`, white, margin-right `16px`
- Label: "GATEWAY" — Font `H2`, white, weight `700`
- Description: "Entry Point — Authentication & Request Routing" — Font `Body Small`, white at 80% opacity
- Left accent: `4px` wide vertical stripe on left edge in `var(--secondary)`

**Tier 2 — "Node"** (middle)
- Background: `var(--bg-accent)`, border `2px solid var(--primary)`, color `var(--text-primary)`
- Same dimensions and layout
- Icon: `Cpu`
- Label: "NODE"
- Description: "Processing Engine — Task Execution & Memory Management"

**Tier 3 — "Channel"** (bottom)
- Background: `var(--bg-secondary)`, border `2px solid var(--secondary)`, color `var(--text-primary)`
- Same dimensions
- Icon: `Plug` (or `Link`)
- Label: "CHANNEL"
- Description: "Communication Layer — External Tools & API Integration"

**Connecting arrows**: Downward arrows between each tier, centered, `30px` tall, color `var(--secondary)`, stroke `2px`

- **Animation**:
  1. Gateway — `opacity: 0→1`, `translateY(-20px)→0`, `duration: 0.5s`, `delay: 0.3s`
  2. Arrow 1 — stroke draw down, `duration: 0.3s`, `delay: 0.5s`
  3. Node — `opacity: 0→1`, `duration: 0.5s`, `delay: 0.6s`
  4. Arrow 2 — stroke draw down, `duration: 0.3s`, `delay: 0.8s`
  5. Channel — `opacity: 0→1`, `duration: 0.5s`, `delay: 0.9s`

#### Element: "Key Stats Row" (3 data cards at bottom)

**Stat 1**: "13,729" / "Skills in ClawHub" — DataCard component
**Stat 2**: "100%" / "Open Source" — DataCard component
**Stat 3**: "4 Layers" / "Memory System" — DataCard component

- **Layout**: 3 cards in a row, equal width, `gap: 20px`
- **Animation**: Stagger in — `opacity: 0→1`, `translateY(20px)→0`, stagger `0.1s`, `duration: 0.4s`, `delay: 1.1s`

#### Element: "Expandable Section"
- **Toggle label**: "OpenClaw vs Other Frameworks"
- **Expanded content**:
  - Brief comparison with AutoGPT, LangChain
  - Key differentiator: "Built for production from day one, not just research"
  - Architecture advantages: modular, scalable, self-hostable

### Responsive
- Mobile: Architecture tiers stack with full width. Stats row becomes vertical stack.
- Tablet: Architecture maintained, stats row becomes 2+1 grid.

---

## Slide 08 — OpenClaw Deep Dive: Memory System (Part 2)

### Overview
Deep dive into OpenClaw's 4-layer memory system, visualized as a pyramid. This is a technical concept presented visually to make it accessible.

### Layout
- **Background**: `var(--bg-secondary)`
- **Structure**: Title top, 4-layer pyramid diagram center, explanation cards to the right

### Elements

#### Element: "Slide Title"
- **Content**: "4-Layer Memory System"
- **Style**: Font `H1`, color `var(--primary)`
- **Animation**: Default entrance

#### Element: "Subtitle"
- **Content**: "How OpenClaw remembers everything — from global knowledge to session context"
- **Style**: Font `Body`, color `var(--text-secondary)`, margin-bottom `36px`
- **Animation**: Default entrance, `delay: 0.15s`

#### Element: "Memory Pyramid" (visual centerpiece)
A pyramid/stack diagram with 4 layers, widest at top (SOUL), narrowest at bottom (Session):

```
        ┌──────────────────────────────────────┐
        │              SOUL                     │  ← Widest
        │    (Global Knowledge & Persona)       │
        ├────────────────────────────┬─────────┤
        │           TOOLS            │         │
        │   (Available Capabilities) │         │
        ├──────────────────┬─────────┴─────────┤
        │      USER        │                   │
        │ (User Preferences│ & History)        │
        ├────────┬─────────┴───────────────────┤
        │Session │                            │  ← Narrowest
        │(Current│ Conversation)               │
        └────────┴─────────────────────────────┘
```

- **Layer 1 — SOUL** (top, widest)
  - Width: `100%` of pyramid container (`500px`)
  - Height: `80px`, background `linear-gradient(135deg, var(--primary), #004C99)`, color white
  - Border-radius: `14px 14px 0 0`
  - Icon: `Sparkles`, label "SOUL", description "Global Knowledge & Persona"
  - Text: Font `H2` white, description Font `Caption` white at 70%

- **Layer 2 — TOOLS**
  - Width: `85%` of container, centered
  - Height: `80px`, background `var(--bg-accent)`, border `2px solid var(--primary)`
  - Border-radius: `0` (seamless with layer above if adjacent)
  - Icon: `Wrench`, label "TOOLS", description "Available Capabilities"

- **Layer 3 — USER**
  - Width: `65%` of container, centered
  - Height: `80px`, background `var(--bg-secondary)`, border `2px solid var(--secondary)`
  - Icon: `Users`, label "USER", description "Preferences & History"

- **Layer 4 — Session** (bottom, narrowest)
  - Width: `45%` of container, centered
  - Height: `80px`, background `var(--bg-primary)`, border `2px solid var(--border)`
  - Border-radius: `0 0 14px 14px`
  - Icon: `MessageSquare`, label "Session", description "Current Conversation"

- **Pyramid container**: Total height `~360px`, width `500px`, centered vertically
- **Arrow on right side**: A vertical arrow pointing up alongside the pyramid, labeled "Persistence ↑" at top and "Temporality ↓" at bottom, indicating that upper layers persist longer

- **Animation**:
  1. Pyramid builds from bottom up — each layer `opacity: 0→1`, `translateY(20px)→0`, `scaleX: 0.9→1`, stagger `0.15s`, `duration: 0.5s`, `delay: 0.3s`
  2. Layer labels and icons fade in after layer appears — `opacity: 0→1`, `duration: 0.3s`
  3. Right-side arrow draws in — `duration: 0.6s`, `delay: 1.0s`
  4. "Persistence" label fades in — `delay: 1.2s`

#### Element: "Layer Detail Cards" (right side, 4 small cards)

**SOUL Card**: "Permanent memory — the agent's core knowledge, personality, and world understanding. Survives across all sessions."
**TOOLS Card**: "Dynamic capability registry — what tools the agent can use, updated as new skills are added."
**USER Card**: "Personalized context — remembers your preferences, past interactions, and work patterns."
**Session Card**: "Temporary working memory — the current conversation context, cleared when the chat ends."

- Each card: `padding: 14px 18px`, background `var(--bg-primary)`, border `1px solid var(--border)`, border-radius `10px`, margin-bottom `10px`
- Left border: `3px solid` with layer's color
- Font: `Body Small`, color `var(--text-secondary)`
- **Animation**: Stagger in from right — `opacity: 0→1`, `translateX(20px)→0`, stagger `0.08s`, `duration: 0.4s`, `delay: 0.8s`

#### Element: "Expandable Section"
- **Toggle label**: "Memory in Action: A Practical Example"
- **Expanded content**:
  - Walkthrough of how memory layers work in a real interaction:
    - User asks: "Schedule a meeting with the marketing team like last time"
    - SOUL: Knows what "schedule a meeting" means
    - TOOLS: Knows calendar tool is available
    - USER: Recalls "last time" was a weekly standup on Tuesdays at 10am
    - Session: Tracks that this is a follow-up request in the current conversation

### Responsive
- Mobile: Pyramid becomes a vertical stack (full-width layers, no tapering). Detail cards go below.
- Tablet: Pyramid scales down, detail cards beside with smaller text.

---

## Slide 09 — OpenClaw Deep Dive: ClawHub & Self-Hosting (Part 3)

### Overview
Highlights two key OpenClaw features: ClawHub (the skills marketplace with 13,729 skills) and self-hosted data sovereignty. Emphasizes why this matters for enterprise/China Mobile use.

### Layout
- **Background**: `var(--bg-primary)`
- **Structure**: Title top, two-column layout — ClawHub left, Self-hosting right

### Elements

#### Element: "Slide Title"
- **Content**: "ClawHub & Data Sovereignty"
- **Style**: Font `H1`, color `var(--primary)`
- **Animation**: Default entrance

#### Element: "Subtitle"
- **Content**: "13,729 ready-to-use skills and complete control over your data"
- **Style**: Font `Body`, color `var(--text-secondary)`, margin-bottom `36px`
- **Animation**: Default entrance, `delay: 0.15s`

#### Element: "ClawHub Section" (left column, ~50%)

**ClawHub Header**
- Big number: "13,729" — Font `Data` (3.5rem), color `var(--accent)`, monospace
- Label: "Skills in ClawHub" — Font `H2`, color `var(--text-primary)`
- Description: "The world's largest AI agent skill marketplace" — Font `Body`, color `var(--text-secondary)`

**Skill Category Grid** (3×2 mini cards)
6 category cards showing the diversity of available skills:

1. **"Productivity"** — Icon `CheckSquare`, count "2,341 skills"
2. **"Development"** — Icon `Code`, count "3,102 skills"
3. **"Data Analysis"** — Icon `BarChart3`, count "1,876 skills"
4. **"Communication"** — Icon `MessageSquare`, count "2,567 skills"
5. **"Automation"** — Icon `Settings`, count "2,045 skills"
6. **"Integration"** — Icon `Plug`, count "1,798 skills"

- Each mini card: `padding: 14px`, background `var(--bg-secondary)`, border `1px solid var(--border)`, border-radius `10px`
- Icon: `20px`, color `var(--primary)`
- Category name: Font `Caption`, weight `600`, color `var(--text-primary)`
- Count: Font `Caption`, color `var(--text-light)`
- **Layout**: 3×2 grid, `gap: 10px`

**"What is a Skill?" box**
- Background `var(--bg-accent)`, border-radius `12px`, `padding: 16px`
- Content: "A Skill = A SKILL.md file that teaches the agent how to use a specific tool or complete a specific task. Like an instruction manual the agent can read and follow."
- Font: `Body Small`, color `var(--text-primary)`

- **Animation**:
  1. "13,729" counter animation — `duration: 1.5s`, `delay: 0.2s`
  2. Label and description fade in — `delay: 1.0s`
  3. Skill category grid — stagger `0.06s`, `opacity: 0→1`, `translateY(15px)→0`, `delay: 0.5s`
  4. "What is a Skill?" box — `opacity: 0→1`, `translateY(10px)→0`, `delay: 1.0s`

#### Element: "Self-Hosting Section" (right column, ~50%)

**Self-Hosting Header**
- Icon: `Server` inside a `48px` circle, background `var(--bg-accent)`, color `var(--primary)`
- Title: "Self-Hosted = Full Control" — Font `H2`

**Benefits List** (4 items)

1. **"Data Never Leaves"** — Icon `Shield`, color `var(--success)`
   - "Your data stays on your servers. No third-party cloud required."
2. **"Custom Security"** — Icon `Lock`
   - "Integrate with your existing security policies and compliance requirements."
3. **"Internal Network"** — Icon `Network` (or `Globe` with slash)
   - "Works fully within your organization's private network."
4. **"Zero External Dependency"** — Icon `CheckCircle`
   - "No reliance on external APIs or services that could be blocked or changed."

- Each item: horizontal layout, icon `24px` left, text right, `padding: 14px 0`, border-bottom `1px solid var(--border)` (except last)
- Title: Font `H3`, color `var(--text-primary)`
- Description: Font `Body Small`, color `var(--text-secondary)`

**"Why This Matters for China Mobile" callout**
- Background `var(--bg-accent)`, border-left `4px solid var(--accent)`, `padding: 16px 20px`
- Content: "With strict data security requirements and internal network isolation, self-hosted AI agents are not optional — they're essential."
- Font: `Body` weight `500`, color `var(--accent)`

- **Animation**:
  1. Self-hosting header — `opacity: 0→1`, `translateX(20px)→0`, `delay: 0.3s`
  2. Benefits list — stagger `0.1s`, `opacity: 0→1`, `translateX(15px)→0`, `delay: 0.5s`
  3. Callout box — `opacity: 0→1`, `translateY(10px)→0`, `delay: 1.0s`

#### Element: "Expandable Section"
- **Toggle label**: "How to Install a Skill from ClawHub"
- **Expanded content**:
  - Step-by-step: Search → Click Install → Agent learns the SKILL.md → Ready to use
  - Code-like example: " clawhub install productivity/email-manager "
  - Note: "No coding required — it's as simple as installing an app"

### Responsive
- Mobile: Single column — ClawHub section full-width, Self-hosting below
- Tablet: Side-by-side maintained

---

## Slide 10 — Three-Agent Comparison

### Overview
A clear comparison table of the three major AI agent platforms: OpenClaw, Hermes Agent, and Claude Code. Presented as a feature-comparison matrix with visual highlights.

### Layout
- **Background**: `var(--bg-secondary)`
- **Structure**: Title top, comparison table center, key takeaway bar at bottom

### Elements

#### Element: "Slide Title"
- **Content**: "Three Major AI Agents Compared"
- **Style**: Font `H1`, color `var(--primary)`, text-align center
- **Animation**: Default entrance

#### Element: "Subtitle"
- **Content**: "OpenClaw · Hermes Agent · Claude Code — head to head"
- **Style**: Font `Body`, color `var(--text-secondary)`, text-align center, margin-bottom `36px`
- **Animation**: Default entrance, `delay: 0.15s`

#### Element: "Comparison Table"
ComparisonTable component (see design.md).

**Table structure:**

| Feature | OpenClaw | Hermes Agent | Claude Code |
|---------|----------|--------------|-------------|
| **Positioning** | Universal Agent OS | Self-Evolving Agent | Programming Champion |
| **GitHub Stars** | 278,932 | [value] | [value] |
| **Open Source** | Yes | Yes | No |
| **Self-Hosted** | Yes | Yes | No |
| **Security Vulnerabilities (CVE)** | Low | 0 | [value] |
| **SWE-bench Score** | [value] | [value] | 87.6% |
| **Skill Ecosystem** | 13,729 skills | [value] | [value] |
| **Best For** | Universal tasks | Security-critical | Software development |

- **Header row**: Background `var(--primary)`, white text, font-weight `600`
- **Column highlights**:
  - OpenClaw column: Subtle blue left border `3px solid var(--primary)`, header cell has slightly deeper blue
  - Hermes column: Standard styling
  - Claude Code column: Standard styling
- **Check/X icons**: `CheckCircle` icon in `var(--success)` for Yes, `XCircle` in `var(--text-light)` for No
- **Star highlight**: OpenClaw's star count in `var(--accent)` with bold weight
- **SWE-bench highlight**: Claude Code's 87.6% in `var(--accent)` with bold weight
- **Row hover**: Background shifts to `var(--bg-accent)`

- **Animation**: Table fades in as a whole — `opacity: 0→1`, `translateY(20px)→0`, `duration: 0.6s`, `delay: 0.3s`. Rows within stagger `0.05s` for a cascading reveal effect.

#### Element: "Key Takeaway Bar"
- **Content**: "For China Mobile: OpenClaw offers the best balance of openness, ecosystem scale, and deployment flexibility."
- **Style**: Full-width, background `var(--bg-accent)`, border-left `4px solid var(--primary)`, `padding: 16px 24px`, border-radius `0 12px 12px 0`
- Font: `Body` weight `500`, color `var(--text-primary)`
- **Animation**: `opacity: 0→1`, `translateY(15px)→0`, `duration: 0.5s`, `delay: 0.8s`

#### Element: "Expandable Section"
- **Toggle label**: "Detailed Feature Breakdown"
- **Expanded content**:
  - Additional rows for the comparison table:
    - Programming Language Support
    - Community Size
    - Enterprise Features
    - Documentation Quality
    - Learning Curve
  - Each with ratings (star rating icons) rather than just Yes/No

### Responsive
- Mobile: Table becomes horizontally scrollable with `overflow-x: auto`. A subtle fade indicator on the right edge hints at more content. Minimum column width `140px`.
- Tablet: Full table visible, slightly smaller padding.

---

## Slide 11 — Agent Capabilities Showcase

### Overview
A capabilities grid showcasing what AI agents can do — 5 capability areas presented as icon-based feature cards. Clean, scannable, and impressive without being overwhelming.

### Layout
- **Background**: `var(--bg-primary)`
- **Structure**: Title top, 5 capability cards in a responsive grid (3+2 layout), summary bar at bottom

### Elements

#### Element: "Slide Title"
- **Content**: "What Can AI Agents Do?"
- **Style**: Font `H1`, color `var(--primary)`, text-align center
- **Animation**: Default entrance

#### Element: "Subtitle"
- **Content**: "Five core capabilities transforming how we work"
- **Style**: Font `Body`, color `var(--text-secondary)`, text-align center, margin-bottom `40px`
- **Animation**: Default entrance, `delay: 0.15s`

#### Element: "Capabilities Grid" (5 Feature Cards)

**Card 1 — "Information Processing"**
- Icon: `Search` (Lucide), `28px`
- Title: "Information Processing"
- Description: "Read, understand, and synthesize information from documents, emails, websites, and databases — processing thousands of pages in minutes."
- Badge: "Core" — Primary variant

**Card 2 — "Content Generation"**
- Icon: `FileText`
- Title: "Content Generation"
- Description: "Draft reports, emails, presentations, and documents in your organization's tone and style — from outlines to polished final versions."
- Badge: "Core" — Primary variant

**Card 3 — "Browser Automation"**
- Icon: `Globe`
- Title: "Browser Automation"
- Description: "Navigate websites, fill forms, extract data, and interact with web applications just like a human user — but 10× faster."
- Badge: "Advanced" — Accent variant

**Card 4 — "Data Analysis"**
- Icon: `BarChart3`
- Title: "Data Analysis"
- Description: "Analyze spreadsheets, generate charts, identify trends, and produce actionable insights from raw data automatically."
- Badge: "Core" — Primary variant

**Card 5 — "Process Automation"**
- Icon: `Settings`
- Title: "Process Automation"
- Description: "Connect multiple steps into seamless workflows — from receiving a request to completing the task across different systems."
- Badge: "Advanced" — Accent variant

- **Layout**: Row 1 has 3 cards, Row 2 has 2 cards centered, `gap: 20px`
- **Card style**: Feature Card component (see design.md)
- **Animation**: Cards stagger in — `opacity: 0→1`, `translateY(30px)→0`, `scale: 0.97→1`, stagger `0.08s`, `duration: 0.5s`, `delay: 0.3s`, `ease: power3.out`

#### Element: "Summary Bar"
- **Content**: "These five capabilities combine to handle complex, multi-step tasks that previously required hours of human effort."
- **Style**: Centered, max-width `700px`, `padding: 16px 24px`, background `var(--bg-accent)`, border-radius `12px`, text-align center
- Font: `Body` weight `500`, color `var(--text-primary)`
- **Animation**: `opacity: 0→1`, `duration: 0.5s`, `delay: 0.9s`

#### Element: "Expandable Section"
- **Toggle label**: "Real-World Impact: Before vs After"
- **Expanded content**:
  - Table showing time savings for typical tasks:
    | Task | Before (Manual) | After (Agent) | Savings |
    |------|----------------|---------------|---------|
    | Data entry (1000 rows) | 4 hours | 10 minutes | 96% |
    | Report generation | 2 days | 30 minutes | 98% |
    | Email triage (200 emails) | 3 hours | 5 minutes | 97% |
    | Web research | 2 hours | 15 minutes | 87% |

### Responsive
- Mobile: All cards stack vertically (1 column)
- Tablet: 2×3 grid (with one empty cell) or 3+2 as designed

---

## Slide 12 — 10-Step Scenario Walkthrough

### Overview
A step-by-step walkthrough showing a complete agent workflow — from receiving a task to delivering results. Uses a numbered horizontal timeline that shows the 10 steps with a "before vs after" time comparison at the bottom.

### Layout
- **Background**: `var(--bg-secondary)`
- **Structure**: Title top, horizontal 10-step timeline center, before/after comparison at bottom

### Elements

#### Element: "Slide Title"
- **Content**: "A Complete Agent Workflow: 10 Steps"
- **Style**: Font `H1`, color `var(--primary)`
- **Animation**: Default entrance

#### Element: "Subtitle"
- **Content**: "Watch how an agent handles a complex task from start to finish"
- **Style**: Font `Body`, color `var(--text-secondary)`, margin-bottom `32px`
- **Animation**: Default entrance, `delay: 0.15s`

#### Element: "10-Step Timeline" (horizontal)
A horizontal flow with 10 numbered steps connected by arrows:

```
① → ② → ③ → ④ → ⑤ → ⑥ → ⑦ → ⑧ → ⑨ → ⑩
```

**Steps:**
1. **"Receive Task"** — Icon `Inbox`
2. **"Understand"** — Icon `Brain`
3. **"Plan"** — Icon `Map`
4. **"Gather Info"** — Icon `Search`
5. **"Process Data"** — Icon `BarChart3`
6. **"Generate Content"** — Icon `FileText`
7. **"Review Results"** — Icon `Eye`
8. **"Iterate"** — Icon `RefreshCw`
9. **"Finalize"** — Icon `CheckSquare`
10. **"Deliver"** — Icon `Send`

- **Step node**: `56px × 56px` circle, background `var(--primary)`, color white, border-radius `50%`, display flex center
  - Number inside: Font `H3` (1.375rem), weight `700`
  - Hover: scale `1.1`, background `var(--primary-dark)`
- **Connecting arrows**: `ArrowRight` icon between steps, color `var(--secondary)`, `20px`
- **Step label**: Below each circle, Font `Caption` (0.8125rem), color `var(--text-secondary)`, text-align center, max-width `80px`, margin-top `8px`
- **Container**: Horizontal scroll on mobile, `overflow-x: auto` with fade indicators

- **Animation**:
  1. Steps appear sequentially from left to right — each step `opacity: 0→1`, `scale: 0.8→1`, stagger `0.08s`, `duration: 0.4s`, `delay: 0.3s`, `ease: back.out(1.5)`
  2. Arrows fade in between steps — `opacity: 0→1`, stagger `0.08s`, `duration: 0.2s`, `delay: 0.5s`
  3. Labels appear below steps — `opacity: 0→1`, `translateY(5px)→0`, stagger `0.08s`, `duration: 0.3s`, `delay: 0.7s`

#### Element: "Active Step Detail" (below timeline)
A detail panel showing the currently highlighted step (default: step 1). As the presenter clicks through, this updates.

- **Container**: Background `var(--bg-primary)`, border `1px solid var(--border)`, border-radius `14px`, `padding: 24px`, max-width `700px`, centered
- **Step number badge**: "Step 1 of 10" — Badge component, Primary variant
- **Step title**: Font `H2`, color `var(--primary)`
- **Step description**: Font `Body`, color `var(--text-secondary)`
- **Example**: A concrete example for each step, Font `Body Small`, background `var(--bg-accent)`, `padding: 12px 16px`, border-radius `8px`

*Interactive behavior*: Clicking a step on the timeline updates this detail panel with a smooth crossfade (`opacity: 0→1`, `duration: 0.3s`).

#### Element: "Before vs After Bar"
A horizontal comparison bar at the bottom:

- **Before**: "Traditional: 2–3 days of manual work" — left side, background `var(--text-light)` at 20%, `padding: 14px 24px`, border-radius `10px 0 0 10px`
- **Arrow**: `ArrowRight` icon, color `var(--success)`, centered
- **After**: "With Agent: 30 minutes" — right side, background `var(--success)` at 15%, `padding: 14px 24px`, border-radius `0 10px 10px 0`
- **Before text**: Font `Body` weight `500`, color `var(--text-secondary)`, strikethrough on the time
- **After text**: Font `Body` weight `600`, color `var(--success)`
- **Layout**: Flex row, centered, `max-width: 600px`
- **Animation**: Bar slides in from bottom — `opacity: 0→1`, `translateY(20px)→0`, `duration: 0.5s`, `delay: 1.2s`

#### Element: "Expandable Section"
- **Toggle label**: "What Happens at Each Step (Detailed)"
- **Expanded content**:
  - All 10 steps with detailed descriptions:
    1. Receive Task: "Agent receives a natural language instruction via chat, email, or API"
    2. Understand: "Breaks down the request, identifies intent, and extracts key parameters"
    3. Plan: "Creates a step-by-step execution plan with tool selections"
    4. Gather Info: "Searches documents, browses websites, queries databases as needed"
    5. Process Data: "Analyzes collected data, performs calculations, identifies patterns"
    6. Generate Content: "Creates drafts, reports, or outputs based on processed information"
    7. Review Results: "Self-checks outputs for accuracy, completeness, and relevance"
    8. Iterate: "If needed, goes back to gather more info or refine the output"
    9. Finalize: "Formats the final deliverable according to requirements"
    10. Deliver: "Presents results to the user in the requested format"

### Responsive
- Mobile: Timeline becomes horizontally scrollable with `gap: 12px`. Step detail panel goes full-width. Before/After bar stacks vertically.
- Tablet: Timeline may wrap to 2 rows (5+5).

---

## Slide 13 — China Mobile Scenario 1: Email Automation

### Overview
The first of four China Mobile scenarios — email automation that reduces processing time from 30 minutes to 3 minutes. Uses a before/after layout with a data highlight card.

### Layout
- **Background**: `var(--bg-primary)`
- **Structure**: Title + scenario badge top, two-column layout — "Before" left, "After" right, data highlight card centered below

### Elements

#### Element: "Scenario Badge"
- **Content**: "Scenario 1 / 4" — Badge component, Accent variant, with `Mail` icon
- **Position**: Top-left of slide content area
- **Animation**: `opacity: 0→1`, `duration: 0.4s`, `delay: 0.1s`

#### Element: "Slide Title"
- **Content**: "Email Processing Automation"
- **Style**: Font `H1`, color `var(--primary)`, margin-bottom `8px`
- **Animation**: Default entrance

#### Element: "Subtitle"
- **Content**: "Intelligent email triage, classification, and response drafting"
- **Style**: Font `Body`, color `var(--text-secondary)`, margin-bottom `32px`
- **Animation**: Default entrance, `delay: 0.15s`

#### Element: "Before Panel" (left column)
- **Header**: "Before" — Font `H2`, color `var(--text-light)`, with a `Clock` icon
- **Time badge**: "30 minutes" — large text, strikethrough, color `var(--text-light)`
- **Process list** (pain points):
  1. "Manually read each email" — Font `Body Small`
  2. "Classify by department and priority"
  3. "Copy-paste into tracking system"
  4. "Draft responses from scratch"
  5. "Wait for supervisor approval"
- Each item: `padding: 8px 0`, border-bottom `1px solid var(--border)`, with `XCircle` icon in `var(--text-light)`
- **Container**: Background `var(--bg-secondary)`, border-radius `14px`, `padding: 24px`, opacity `0.8` (to emphasize the "after")
- **Animation**: `opacity: 0→1`, `translateX(-20px)→0`, `duration: 0.5s`, `delay: 0.3s`

#### Element: "After Panel" (right column)
- **Header**: "After" — Font `H2`, color `var(--success)`, with `Zap` icon
- **Time badge**: "3 minutes" — Font `Data Small` (1.5rem), color `var(--success)`, weight `700`
- **Process list** (improved steps):
  1. "Agent reads and classifies all emails automatically" — Font `Body Small`
  2. "Priority detection and smart routing"
  3. "Auto-fills tracking system with extracted data"
  4. "Drafts personalized responses instantly"
  5. "Flags items needing human review"
- Each item: `padding: 8px 0`, with `CheckCircle` icon in `var(--success)`
- **Container**: Background `var(--bg-accent)`, border `2px solid var(--success)` at 30%, border-radius `14px`, `padding: 24px`
- **Animation**: `opacity: 0→1`, `translateX(20px)→0`, `duration: 0.5s`, `delay: 0.5s`

#### Element: "Efficiency Card" (centered below columns)
- **Metric**: "90%" — Font `Data` (3.5rem), color `var(--accent)`, monospace
- **Label**: "Time Saved" — Font `Caption`, color `var(--text-secondary)`
- **Description**: "From 30 minutes to 3 minutes — reclaim 27 minutes per batch" — Font `Body Small`
- **Style**: DataCard component, centered, max-width `300px`
- **Animation**: Counter animation for "90" — `duration: 1.2s`, `delay: 0.8s`. Card `opacity: 0→1`, `scale: 0.95→1`, `delay: 0.7s`, `ease: back.out(1.3)`

#### Element: "Expandable Section"
- **Toggle label**: "How It Works: Technical Details"
- **Expanded content**:
  - Step-by-step agent workflow:
    1. Agent connects to email server (IMAP/Exchange)
    2. Natural language rules: "Flag emails from VIP customers as urgent"
    3. Auto-classification using LLM understanding
    4. Integration with internal ticketing system
    5. Response templates personalized per sender
  - Data privacy note: "All processing happens on internal servers — no data leaves China Mobile's network"

### Responsive
- Mobile: Before/After panels stack vertically (Before first, After second). Efficiency card goes below.
- Tablet: Side-by-side maintained.

---

## Slide 14 — China Mobile Scenario 2: Monthly Report Generation

### Overview
Monthly report automation reducing report creation from 2–3 days to 30 minutes. Shows the agent pulling data from multiple sources and generating a comprehensive report.

### Layout
- **Background**: `var(--bg-secondary)`
- **Structure**: Title + badge top, flow diagram showing data sources → agent → report, before/after comparison below

### Elements

#### Element: "Scenario Badge"
- **Content**: "Scenario 2 / 4" — Badge, Accent variant, `FileText` icon
- **Animation**: `opacity: 0→1`, `duration: 0.4s`, `delay: 0.1s`

#### Element: "Slide Title"
- **Content**: "Monthly Report Generation"
- **Style**: Font `H1`, color `var(--primary)`
- **Animation**: Default entrance

#### Element: "Subtitle"
- **Content**: "Automatically compile data from multiple systems into polished reports"
- **Style**: Font `Body`, color `var(--text-secondary)`, margin-bottom `32px`
- **Animation**: Default entrance, `delay: 0.15s`

#### Element: "Data Flow Diagram" (center)
A 3-stage flow diagram:

**Stage 1 — "Data Sources"** (left)
- Container: Rounded rectangle, background `var(--bg-primary)`, border `1px solid var(--border)`, border-radius `12px`, `padding: 16px`
- 4 source items stacked vertically:
  - "CRM System" — `Database` icon
  - "Billing Platform" — `CreditCard` icon
  - "Network Monitor" — `Activity` icon
  - "HR Database" — `Users` icon
- Each: `padding: 6px 12px`, Font `Caption`

**Arrow**: Rightward arrow, color `var(--secondary)`

**Stage 2 — "AI Agent"** (center)
- Larger rounded rectangle, background `var(--primary)`, color white, border-radius `14px`, `padding: 20px 28px`
- Icon: `Zap`, `32px`, white
- Label: "AI Agent" — Font `H2`, white
- Sub-label: "Data Collection → Analysis → Report Writing" — Font `Caption`, white at 70%

**Arrow**: Rightward arrow

**Stage 3 — "Report Output"** (right)
- Container: Same style as Stage 1
- 3 output items:
  - "Executive Summary" — `FileText` icon
  - "Charts & Visualizations" — `BarChart3` icon
  - "Action Items" — `CheckSquare` icon

- **Animation**:
  1. Stage 1 — `opacity: 0→1`, `translateX(-20px)→0`, `duration: 0.5s`, `delay: 0.3s`
  2. Arrow 1 — stroke draw, `duration: 0.3s`, `delay: 0.5s`
  3. Stage 2 — `opacity: 0→1`, `scale: 0.95→1`, `duration: 0.5s`, `delay: 0.6s`
  4. Arrow 2 — stroke draw, `duration: 0.3s`, `delay: 0.8s`
  5. Stage 3 — `opacity: 0→1`, `translateX(20px)→0`, `duration: 0.5s`, `delay: 0.9s`

#### Element: "Before/After Comparison" (below diagram)
Two cards side by side:

**Before Card**: Background `var(--bg-primary)`, border `1px solid var(--border)`
- Time: "2–3 Days" — strikethrough, Font `Data Small`, color `var(--text-light)`
- Description: "Manually collect data from 4+ systems, create spreadsheets, write analysis, format report" — Font `Body Small`

**After Card**: Background `var(--bg-accent)`, border `2px solid var(--success)` at 30%
- Time: "30 Minutes" — Font `Data Small`, color `var(--success)`
- Description: "Agent auto-collects, analyzes, and generates a complete report with charts and insights" — Font `Body Small`

- **Animation**: Cards stagger in — `opacity: 0→1`, `translateY(15px)→0`, stagger `0.1s`, `duration: 0.5s`, `delay: 1.1s`

#### Element: "Efficiency Highlight"
- **Content**: "Up to 99% time reduction"
- **Style**: Centered badge, Accent variant, large padding
- **Animation**: `opacity: 0→1`, `scale: 0.9→1`, `duration: 0.4s`, `delay: 1.4s`, `ease: back.out(1.5)`

#### Element: "Expandable Section"
- **Toggle label**: "Report Customization Options"
- **Expanded content**:
  - Report templates: Executive, Detailed, Department-specific
  - Output formats: PDF, Word, PowerPoint, HTML
  - Scheduling: Daily, weekly, monthly auto-generation
  - Distribution: Auto-email to stakeholders

### Responsive
- Mobile: Flow diagram stacks vertically (sources → agent → output, top to bottom). Before/After cards stack.
- Tablet: Horizontal flow maintained.

---

## Slide 15 — China Mobile Scenario 3: Fault Diagnosis

### Overview
Network fault diagnosis automation reducing resolution time from 2–4 hours to 10 minutes. This is a high-value scenario for a telecom operator.

### Layout
- **Background**: `var(--bg-primary)`
- **Structure**: Title + badge top, ReAct-style loop diagram showing diagnosis process, before/after at bottom

### Elements

#### Element: "Scenario Badge"
- **Content**: "Scenario 3 / 4" — Badge, Accent variant, `Activity` icon
- **Animation**: `opacity: 0→1`, `duration: 0.4s`, `delay: 0.1s`

#### Element: "Slide Title"
- **Content**: "Network Fault Diagnosis"
- **Style**: Font `H1`, color `var(--primary)`
- **Animation**: Default entrance

#### Element: "Subtitle"
- **Content**: "AI-powered network monitoring and rapid fault resolution"
- **Style**: Font `Body`, color `var(--text-secondary)`, margin-bottom `32px`
- **Animation**: Default entrance, `delay: 0.15s`

#### Element: "Diagnosis Loop Diagram"
A ReAct-inspired loop specific to fault diagnosis:

**Step 1 — "Monitor"** (top)
- Icon: `Activity` (pulse animation on the icon — `scale: 1→1.2→1`, `duration: 1.5s`, infinite)
- Label: "MONITOR"
- Description: "Continuously watch network metrics"

**Step 2 — "Detect"** (right)
- Icon: `AlertTriangle`
- Label: "DETECT"
- Description: "Identify anomalies and alerts"

**Step 3 — "Analyze"** (bottom)
- Icon: `Brain`
- Label: "ANALYZE"
- Description: "Root cause analysis using historical data"

**Step 4 — "Resolve"** (left)
- Icon: `CheckCircle`
- Label: "RESOLVE"
- Description: "Execute fix or escalate with recommendations"

- **Layout**: Circular arrangement (smaller than the ReAct loop, `350px` diameter)
- **Style**: Same node styling as ReAct loop diagram (Slide 05)
- **Connecting arrows**: Clockwise, flowing dashed animation
- **Center**: "Fault Diagnosis Agent" label
- **Animation**: Same sequence as ReAct loop — center first, then nodes clockwise, then arrows

#### Element: "Before/After Cards" (below diagram)

**Before Card**:
- Time: "2–4 Hours" — strikethrough, color `var(--text-light)`
- Process: "Receive alert → Manually check logs → Search knowledge base → Trial-and-error fixes → Document incident"

**After Card**:
- Time: "10 Minutes" — color `var(--success)`
- Process: "Alert received → Agent auto-diagnoses → Suggests fix with confidence score → Applies or escalates → Auto-documents"

- **Animation**: Cards stagger in — `opacity: 0→1`, `translateY(15px)→0`, stagger `0.1s`, `duration: 0.5s`, `delay: 1.0s`

#### Element: "Efficiency Card"
- **Metric**: "96%" — Font `Data`, color `var(--accent)`
- **Label**: "Faster Resolution"
- **Description**: "From hours to minutes — minimizing network downtime"
- DataCard component
- **Animation**: Counter animation, `duration: 1.2s`, `delay: 1.3s`

#### Element: "Expandable Section"
- **Toggle label**: "Integration with China Mobile Systems"
- **Expanded content**:
  - Connects to: OSS (Operation Support Systems), BSS (Business Support Systems)
  - Uses existing monitoring data: No additional infrastructure needed
  - Escalation protocol: Agent confidence score < 80% → human engineer
  - Knowledge base: Continuously learns from resolved incidents

### Responsive
- Mobile: Loop diagram scales to `280px`. Cards stack vertically.
- Tablet: Layout maintained.

---

## Slide 16 — China Mobile Scenario 4: Data Audit

### Overview
Data audit automation reducing audit time from 5 days to 1 hour. Emphasizes compliance and accuracy — critical for a regulated telecom industry.

### Layout
- **Background**: `var(--bg-secondary)`
- **Structure**: Title + badge top, process visualization, before/after with efficiency highlight

### Elements

#### Element: "Scenario Badge"
- **Content**: "Scenario 4 / 4" — Badge, Accent variant, `Shield` icon
- **Animation**: `opacity: 0→1`, `duration: 0.4s`, `delay: 0.1s`

#### Element: "Slide Title"
- **Content**: "Automated Data Audit"
- **Style**: Font `H1`, color `var(--primary)`
- **Animation**: Default entrance

#### Element: "Subtitle"
- **Content**: "Compliance verification, data quality checks, and anomaly detection"
- **Style**: Font `Body`, color `var(--text-secondary)`, margin-bottom `32px`
- **Animation**: Default entrance, `delay: 0.15s`

#### Element: "Audit Process Flow" (4-step horizontal)

**Step 1 — "Ingest"**
- Icon: `Download`
- Label: "INGEST"
- Description: "Pull data from all relevant systems"

**Step 2 — "Validate"**
- Icon: `ShieldCheck`
- Label: "VALIDATE"
- Description: "Check against compliance rules"

**Step 3 — "Detect"**
- Icon: `Search`
- Label: "DETECT"
- Description: "Find anomalies and inconsistencies"

**Step 4 — "Report"**
- Icon: `FileText`
- Label: "REPORT"
- Description: "Generate audit report with findings"

- **Style**: FlowDiagram component — 4 nodes in a row with connecting arrows
- **Node style**: Rounded rectangle, `padding: 16px 20px`, background `var(--bg-primary)`, border `2px solid var(--primary)`, border-radius `12px`, text-align center
- **Animation**: Nodes stagger in — `opacity: 0→1`, `translateY(20px)→0`, stagger `0.1s`, `duration: 0.5s`, `delay: 0.3s`. Arrows draw in after.

#### Element: "Before/After Comparison"

**Before**: "5 Days" — strikethrough
- "Manual sampling, spreadsheet checks, human review of every record"

**After**: "1 Hour" — color `var(--success)`
- "100% automated, every record checked, AI-powered anomaly detection"

- Two cards side by side, same styling as previous scenario slides
- **Animation**: `opacity: 0→1`, `translateY(15px)→0`, stagger `0.1s`, `delay: 0.9s`

#### Element: "Efficiency Card"
- **Metric**: "98%" — Font `Data`, color `var(--accent)`
- **Label**: "Time Saved"
- **Description**: "From 5 days to 1 hour — 40 hours of work compressed into 60 minutes"
- DataCard component
- **Animation**: Counter animation, `duration: 1.2s`, `delay: 1.2s`

#### Element: "Compliance Note"
- **Content**: "Audit trails are automatically generated and stored for regulatory compliance — every agent decision is logged and traceable."
- **Style**: Centered, max-width `600px`, `padding: 12px 20px`, background `var(--bg-accent)`, border-radius `10px`, border-left `3px solid var(--primary)`
- Font: `Body Small`, color `var(--text-primary)`
- **Animation**: `opacity: 0→1`, `duration: 0.5s`, `delay: 1.5s`

#### Element: "Expandable Section"
- **Toggle label**: "Audit Rule Examples"
- **Expanded content**:
  - Sample compliance rules the agent can check:
    - "All customer data must have consent flag = true"
    - "Billing amounts must match between CRM and billing system"
    - "No PII data in unencrypted fields"
    - "Transaction timestamps must be within business hours"
  - Each rule shown as a small code-like block with check/result

### Responsive
- Mobile: Process flow wraps to 2×2 grid. Cards stack.
- Tablet: Horizontal flow maintained.

---

## Slide 17 — Summary

### Overview
Three key conclusions from the seminar, presented as prominent takeaway cards with a "Carbon-Silicon Collaboration" concept closing statement.

### Layout
- **Background**: `var(--bg-primary)`
- **Structure**: Title top, 3 conclusion cards in a row, closing statement below

### Elements

#### Element: "Slide Title"
- **Content**: "Key Takeaways"
- **Style**: Font `H1`, color `var(--primary)`, text-align center
- **Animation**: Default entrance

#### Element: "Subtitle"
- **Content**: "Three conclusions from today's seminar"
- **Style**: Font `Body`, color `var(--text-secondary)`, text-align center, margin-bottom `40px`
- **Animation**: Default entrance, `delay: 0.15s`

#### Element: "Conclusion Cards" (3 cards)

**Card 1 — "AI Agents Are Here"**
- Number: "01" — Font `Data Small` (1.5rem), color `var(--primary)`, monospace
- Title: "AI Agents Are Here to Stay" — Font `H2`, color `var(--text-primary)`
- Description: "From ChatGPT to autonomous agents — 2026 marks the inflection point. Agents are not experimental; they're the next platform shift." — Font `Body Small`, color `var(--text-secondary)`
- Icon: `TrendingUp`, `28px`, color `var(--primary)`
- Left accent: `4px solid var(--primary)`

**Card 2 — "OpenClaw Leads"**
- Number: "02"
- Title: "OpenClaw: Open, Powerful, Flexible"
- Description: "278K+ stars, 13K+ skills, self-hosted deployment, and a thriving ecosystem. The ideal foundation for enterprise AI transformation."
- Icon: `Zap`, color `var(--secondary)`
- Left accent: `4px solid var(--secondary)`

**Card 3 — "Real Impact"**
- Number: "03"
- Title: "Real Impact at China Mobile"
- Description: "90%+ time savings across email, reporting, diagnosis, and audit scenarios. The 'Super Individual' era begins — one person with an agent can outperform an entire team."
- Icon: `Users`, color `var(--accent)`
- Left accent: `4px solid var(--accent)`

- **Card style**: Background `var(--bg-secondary)`, border-radius `16px`, `padding: 28px`, border `1px solid var(--border)`, min-height `220px`
- **Animation**: Cards stagger in — `opacity: 0→1`, `translateY(30px)→0`, `scale: 0.97→1`, stagger `0.12s`, `duration: 0.6s`, `delay: 0.3s`, `ease: power3.out`

#### Element: "Closing Statement"
- **Content**: "The future is not 'AI replacing humans' — it's Carbon-Silicon Collaboration, where humans provide direction and creativity, while agents handle execution at scale."
- **Style**: Centered, max-width `700px`, `margin-top: 40px`, `padding: 24px 32px`, background `var(--bg-accent)`, border-radius `16px`, border `1px solid var(--primary)` at 20%
- **"Carbon-Silicon Collaboration"**: Highlighted in Font `H2`, color `var(--primary)`, weight `700`
- **Rest of text**: Font `Body`, color `var(--text-secondary)`
- **Animation**: `opacity: 0→1`, `translateY(20px)→0`, `duration: 0.6s`, `delay: 0.9s`

#### Element: "Expandable Section"
- **Toggle label**: "Recommended Next Steps"
- **Expanded content**:
  1. "Evaluate OpenClaw for a pilot project in your department"
  2. "Identify 3 repetitive tasks that could be automated"
  3. "Connect with the IT team about internal deployment options"
  4. "Join the OpenClaw community for updates and support"
  - Each as a checklist item with `Circle` icon

### Responsive
- Mobile: Cards stack vertically. Closing statement goes full-width.
- Tablet: 3 cards in a row with reduced padding.

---

## Slide 18 — Thank You Page

### Overview
A warm, memorable closing slide. Clean and simple — the hero moment mirrors the cover slide for visual bookending.

### Layout
- **Background**: `var(--bg-primary)` with the same decorative gradient orbs as the cover slide (visual bookend)
- **Structure**: Centered single column, content vertically and horizontally centered
- **Top bar**: Hidden for cleaner look

### Elements

#### Element: "Thank You Title"
- **Content**: "Thank You"
- **Style**: Font `Display XL` (4rem), weight `800`, color `var(--primary)`, text-align center
- **Animation**: GSAP SplitText per-character, each char `opacity: 0→1`, `translateY(30px)→0`, stagger `0.03s`, `duration: 0.5s`, `ease: back.out(1.7)`, `delay: 0.3s`

#### Element: "Closing Message"
- **Content**: "Questions & Discussion"
- **Style**: Font `H2` (1.75rem), color `var(--text-secondary)`, text-align center, margin-top `16px`
- **Animation**: `opacity: 0→1`, `duration: 0.5s`, `delay: 0.8s`

#### Element: "Decorative Divider"
- Same as cover slide: thin horizontal line, `120px` wide, gradient `var(--secondary)`
- **Animation**: `scaleX: 0→1`, `duration: 0.6s`, `delay: 1.0s`

#### Element: "Contact/Resource Block"
- **Content**:
  - Line 1: "AI Agent Technology Seminar" — Font `Body`, color `var(--text-primary)`
  - Line 2: "China Mobile | [Department Name]" — Font `Body Small`, color `var(--text-secondary)`
  - Line 3: "[Date]" — Font `Caption`, color `var(--text-light)`
- **Style**: Text-align center, margin-top `24px`
- **Animation**: `opacity: 0→1`, `duration: 0.5s`, `delay: 1.2s`

#### Element: "Resource Links" (optional)
- **Content**: Two pill buttons side by side:
  - "OpenClaw GitHub" — External link icon, Primary button style
  - "Download Materials" — Download icon, Secondary button style (outline)
- **Style**: Centered, `gap: 12px`, margin-top `32px`
- **Animation**: `opacity: 0→1`, `translateY(10px)→0`, `duration: 0.5s`, `delay: 1.4s`

#### Element: "Decorative Orbs"
- Same as cover slide — two large gradient orbs floating slowly in the background
- Orb positions mirrored (bottom-right and top-left) for bookend effect

### Responsive
- Mobile: Title drops to `2.5rem`, orbs hidden. Resource buttons stack vertically.
- Tablet: Title at `3rem`.

---

## Navigation & Interaction Summary

### Global Navigation
- **Bottom nav bar**: Fixed at bottom, always visible (except during transitions)
  - Prev button (left), slide counter (center), Next button (right)
  - Clicking prev/next triggers slide transition with GSAP animation
- **Progress bar**: Fixed at very top, fills left-to-right based on current slide

### Keyboard Navigation
- `ArrowRight` / `ArrowDown` / `Space` → Next slide
- `ArrowLeft` / `ArrowUp` → Previous slide
- `Home` → Slide 1
- `End` → Slide 18
- All keys throttled to prevent rapid-fire

### Theme Switching
- Theme toggle button (palette icon) in top-right corner
- Click opens popover with 3 options: Blue (default), Dark, Warm
- Theme change applies CSS variables instantly with `transition: all 0.3s ease`
- Selected theme persisted in `localStorage`

### Expandable Sections
- Each slide may have 0–1 expandable detail sections
- Click toggle to expand/collapse with GSAP height animation
- Only one section open at a time per slide
- Expanded state resets when leaving the slide

### Slide Transitions
- **Next**: Incoming slide enters from right (`translateX: 100px → 0`, `opacity: 0 → 1`), outgoing exits to left
- **Previous**: Reverse direction
- **Duration**: `0.5s` enter, `0.4s` exit
- **Ease**: `power3.out` for enter, `power3.in` for exit
- **Transition lock**: Prevents overlapping transitions (min `600ms` between)

### Accessibility
- `prefers-reduced-motion`: Disables all animations, instant transitions
- Focus management: Focus trapped in active slide
- ARIA labels on all interactive elements
- Screen reader announcements on slide change