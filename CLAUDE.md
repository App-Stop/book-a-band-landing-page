@AGENTS.md

# Design System Rules (for Figma MCP integration)

This project has **no Tailwind config file, no component library, and no Storybook**. Tokens, components, and Figma-fidelity conventions all live directly in `app/`. Read this before turning a Figma frame into code.

## 1. Token Definitions

All tokens are plain CSS custom properties in `app/globals.css` — there is no `tailwind.config.*` (Tailwind v4 is CSS-first, loaded via `@tailwindcss/postcss`).

```css
:root {
  --font-display: "Zalando Sans Expanded", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-script: "The Nautigal", cursive;
  --cyan: #00c9c6;
  --purple: #a240ff;
  --pink: #ff42dc;
  --glass-shadow: 0px 685px 96px rgba(0,0,0,0), ...; /* 5-layer Figma shadow stack */
}
```

- **Colors**: only `--cyan`, `--purple`, `--pink` are named tokens. Everything else (background `#0c0b1a`, per-card accents like `#407fff`/`#ff4099`/`#ff6f40`, gradient stops) is written as **inline Tailwind arbitrary values** (`bg-[#0c0b1a]`, `from-[#0300a6] to-[#ce00af]`) or as inline `style={{ backgroundImage: ... }}` (see `StatsGrid.tsx` accent colors). When a Figma color reappears 3+ times, promote it to a `:root` variable; a one-off accent can stay as an arbitrary value.
- **Fonts**: 3 families loaded via Google Fonts `@import` at the top of `globals.css` — Inter (body), Zalando Sans Expanded 900 (display/headings, via the `.display` utility), The Nautigal (script accents, via `.neon-script`). Don't add new font-family declarations elsewhere; extend the `--font-*` variables instead.
- **Spacing/sizing**: no spacing scale token — Tailwind's default scale plus raw arbitrary values (`px-[27px]`, `top-[9.23%]`) copied straight from Figma frame measurements. Percentage/`cqw` (container-query width) values are used deliberately to reproduce exact Figma artboard proportions at `lg+` — see §7.
- **Shadows**: `--glass-shadow` is the one shared shadow token, consumed by the `glass*` utilities below. One-off shadows (e.g. modal shadow) stay as arbitrary `shadow-[...]` values.
- Tailwind v4's `@utility` and `@custom-variant` directives are the token-transformation layer in place of a JS config — see §6.

## 2. Component Library

`app/components/*.tsx` — a **flat directory, no subfolders, no atomic-design tiers, no Storybook/docs**. Two kinds of files:

- **Section components** (`Hero.tsx`, `Navbar.tsx`, `AppFeatures.tsx`, `Tailored.tsx`, `Testimonials.tsx`, `Faqs.tsx`, `CtaBanner.tsx`, `Footer.tsx`, `AiMatch.tsx`, `AppTour.tsx`, `IntroStatement.tsx`, `MatchedBands.tsx`, `StatsGrid.tsx`) — one per landing-page section, composed in order in `app/page.tsx`. These are largely non-reusable, page-specific, and hard-code their own Figma layout math.
- **Shared primitives**: `Icon.tsx` (icon system, §5), `GetAppModal.tsx` (context provider + modal, global "Get the App" QR popup wired to any `href="#get-app"` link via a delegated click listener), `ScriptAccent.tsx` (wraps text in the neon-script style), `LegalPage.tsx` (shared shell for `/terms` and `/privacy`), `ScrollAnimations.tsx` (headless GSAP controller, §7).

New reusable pieces should follow the `Icon.tsx` / `GetAppModal.tsx` pattern: a single default-exported component, typed props inline (no separate `types.ts`), colocated in `app/components/`.

## 3. Frameworks & Libraries

- **Next.js 16.3.5**, App Router, no `src/` directory (`app/` at repo root).
- **React 19.2.8**, function components only, `"use client"` only on components that need interactivity/DOM APIs (`Navbar`, `GetAppModal`, `ScrollAnimations`); everything else is a server component by default.
- **TypeScript 5**, `strict: true`, path alias `@/*` → repo root.
- **Tailwind CSS v4** (`@tailwindcss/postcss` in `postcss.config.mjs`) — CSS-first config, no `tailwind.config.ts`. Do not create one; add tokens/utilities to `globals.css` instead.
- **GSAP 3.15 + ScrollTrigger** for all animation (entrance reveals, scroll parallax, counters) — see §7. No Framer Motion / CSS-only alternative in use.
- **ESLint 9** flat config (`eslint.config.mjs`) extending `eslint-config-next` core-web-vitals + typescript.
- No component/UI library (no shadcn, Radix, MUI) — everything is hand-built to match Figma pixel-for-pixel.
- Build/bundler: Next's own toolchain (`next dev` / `next build` / `next start`) — no custom webpack/vite config.

## 4. Asset Management

- All static assets live in **`/public`**, referenced with `next/image` (`Image` component), almost always with explicit `width`/`height` (or `fill` + a sized wrapper for modal/background art).
- **No `images` config in `next.config.ts`** (default export, empty options) — only local `/public` assets can be used; a remote Figma image URL will NOT load until `images.remotePatterns` is added there.
- Filenames are inconsistent — a mix of conventions from raw Figma/tool exports: kebab-case (`app-feed.png`, `hero-bg.png`), `snake_case` with numeric suffixes (`message_1.png` … `message_5.png`, `like_1.png` … `like_4.png`), and un-renamed export artifacts with spaces/parens (`"Hero BG.png"`, `"Store download button (1).png"`, `"adobe-express-qr-code 1.png"`, `"Group 6897.png"`). **When exporting a new asset from Figma, rename it to kebab-case before adding it to `/public`** — don't perpetuate the spaced/parenthesized names.
- No CDN/image-optimization config beyond Next's built-in image pipeline; no `sizes` strategy standard — each usage sets `sizes` ad hoc based on its layout (see `AppFeatures.tsx`, `GetAppModal.tsx`).
- SVGs (`globe.svg`, `play.svg`, `waveform.svg`) are the only vector assets kept as files; all other icons are hand-authored inline SVG paths in `Icon.tsx` (§5) rather than imported files.

## 5. Icon System

Single source of truth: **`app/components/Icon.tsx`**. There is no icon package (not lucide-react/heroicons) — every icon (including social glyphs) is a hand-drawn inline SVG path matching the Figma vector exactly.

```tsx
type IconName = "equalizer" | "badge" | "notes" | "pin" | "calendar" | "play"
  | "chat" | "broadcast" | "chevron-down" | "chevron-left" | "chevron-right"
  | "close" | "star" | "instagram" | "x" | "tiktok" | "youtube";

// usage
<Icon name="calendar" className="size-5" />
```

- Naming: lowercase, kebab-case for multi-word names (`"chevron-down"`).
- All paths share one `<svg viewBox="0 0 24 24">` shell with `strokeWidth={1.6}`, round caps/joins; stroked by default, filled only for names listed in the `filled` array (currently `star`, `play`).
- **To add a new icon from Figma**: extract the vector path data from the Figma node, add a new `IconName` union member, add its `<path>`/`<circle>` markup to the `paths` record (normalize to the shared 24×24 viewBox), and add to `filled` only if the Figma icon is a solid fill rather than a stroke.
- Sizing is controlled entirely via the `className` prop (default `size-5`); don't hardcode `width`/`height` on `<svg>`.

## 6. Styling Approach

Tailwind utility classes inline in JSX — **no CSS Modules, no styled-components/emotion**. `app/globals.css` is the only stylesheet, containing:

1. Font `@import` + `@import "tailwindcss"`.
2. `@custom-variant short (...)` — a custom breakpoint variant for short laptop viewports (`min-width:1024px` and `max-height:820px`), used as `short:...` in components that need tighter spacing on laptop screens.
3. `:root` tokens (§1).
4. Global element resets (`html, body`) — dark theme is hardcoded (`background:#0c0b1a; color:#fff`), there is **no light-mode variant/no theme switching**.
5. Pre-hydration animation-hiding rules gated by `html.anim` (coordinates with the inline script in `layout.tsx` and `ScrollAnimations.tsx` — see §7).
6. Reusable **`@utility`** blocks (Tailwind v4's config-free way to define custom utility classes) — this is the project's component-class layer:
   - `.display` — Figma heading typeface (Zalando Sans Expanded, weight 900).
   - `.glass` / `.glass-nav` / `.glass-soft` — the three Figma glassmorphism panel variants (badges/pills, navbar, large stat cards), each a fixed border + background + backdrop-blur + `--glass-shadow` combo.
   - `.page-x` — Figma's fluid page gutter (20px → 32px → `clamp(40px,7.29vw,140px)`).
   - `.neon-script` — pink neon-glow handwritten heading style (multi-layer `text-shadow`).
   - `.animate-tour-progress` — the 10s progress-bar keyframe for `AppTour.tsx`, disabled under `prefers-reduced-motion`.
7. `.legal-copy` — a plain nested CSS block (not a utility) styling rendered legal-page HTML in `LegalPage.tsx`.

**When translating a Figma frame:** if a visual treatment (glass panel, neon text, display heading) already has a `@utility` class, reuse it rather than reimplementing with raw Tailwind. If Figma gives an exact px/percent value that doesn't map to Tailwind's scale, use an arbitrary-value utility (`top-[9.23%]`, `text-[clamp(22px,3.334vw,64px)]`) rather than rounding to the nearest scale step — pixel-fidelity to Figma is preferred over scale-purity here.

**Responsive strategy**: mobile-first (`sm:`/`lg:` breakpoints, Tailwind defaults) plus the custom `short:` variant. Large desktop sections (`AppFeatures.tsx`, `Hero.tsx`) reproduce the Figma artboard as an **absolutely-positioned percentage layout inside a `@container` (`cqw` units)** at `lg+`, and collapse to a normal stacked flex/grid layout below `lg`. Components frequently carry comments citing the source Figma node ID/frame size (e.g. `/* Figma node 40:513 */`, `1920 × 3174 artboard`) — preserve/add these comments when porting a new frame so the percentage math stays traceable back to Figma.

## 7. Project Structure

```
app/
  layout.tsx          # root layout, metadata, pre-hydration anim script, GetAppProvider wraps everything
  page.tsx             # composes all landing sections in order (single source of page structure)
  globals.css          # the entire design-token + utility layer (§1, §6)
  privacy/page.tsx, terms/page.tsx   # reuse LegalPage.tsx
  components/
    site-content.ts    # centralized typed content/data (as const arrays) — see below
    Icon.tsx            # icon system (§5)
    ScrollAnimations.tsx # headless GSAP controller (§7)
    GetAppModal.tsx      # context + global modal
    <Section>.tsx         # one per landing section
public/                 # all static assets (§4)
```

- **`site-content.ts` is the content layer**: copy, links, stats, testimonials, FAQ, feature card data all live here as typed `as const` arrays/objects, imported into the presentational section components. When a Figma text/data change comes in, edit this file, not the JSX — components should stay structural.
- **Animation contract**: `ScrollAnimations.tsx` is a headless (`return null`) client component mounted once in `page.tsx`. Other components opt into GSAP entrance/scroll behavior purely via `data-*` attributes rather than importing GSAP themselves:
  - `data-hero="nav|badge|title|sound|copy|cta|pill|phones|stat"` — hero intro timeline targets.
  - `data-reveal="up|left|right|scale|fade|neon"` — scroll-triggered entrance for a single element.
  - `data-stagger="up|..."` — entrance staggered across a group's children.
  - `data-parallax="0.05"` — scroll parallax factor.
  - `data-words` / `data-word` — word-by-word highlight-on-scroll (`IntroStatement.tsx`).
  - `data-count` — number counts up from 0 on hero intro.
  When implementing a new Figma frame that should animate, add the matching `data-*` attribute rather than writing new GSAP code inline in the section component.
- No feature/domain subfolders — this is a single-page marketing site, so "one component per Figma section" is the organizing principle, not atomic design tiers.
