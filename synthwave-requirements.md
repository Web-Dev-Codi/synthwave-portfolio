# Synthwave Portfolio — Verbose Section Requirements

---

## 🌐 Global / Sitewide

- **Deep navy/black base background color**
  The entire site sits on a near-black deep navy base, approximately `#0D0B1E`. This is not pure black — it has a subtle blue-purple undertone that makes neon colors pop against it without the harshness of a true `#000000`. Set this on the `body` or a root wrapper and never override it per section. Every section background should be a slight variation of this base (e.g. `#100E24` for alternating sections) to create depth without breaking the visual continuity. Define it as a CSS custom property in `variables.css` and reference it everywhere.
  **Libraries:** `tailwindcss` (extend theme with custom color tokens)

- **Starfield that persists across all sections (slow twinkle animation)**
  A canvas-based or CSS-based starfield renders as a fixed full-viewport background layer behind all page content. Stars are randomly distributed white or pale-blue dots of varying sizes (0.5px to 2px radius) at varying opacity levels. Each star independently pulses between 30% and 100% opacity on a slow randomised interval (2–5 seconds per star) to simulate natural twinkling. The canvas is positioned `fixed` with `z-index: 0` and all page content sits above it. Generate star positions once on mount and store them in a ref so they do not re-randomise on re-render. On lower-end devices or when `prefers-reduced-motion` is active, disable the twinkle animation and render stars as static dots.
  **Libraries:** Native Canvas API via `useRef` and `useEffect`, or `@react-three/fiber` with a `Points` geometry if you go the Three.js route

- **Neon glow on all interactive elements (links, buttons, hover states)**
  Every element the user can interact with — buttons, nav links, project card CTAs, social icons, form inputs on focus — emits a visible neon glow on hover and focus states. This is achieved with layered `box-shadow` or `text-shadow` using the element's accent color at varying blur radii and opacities (e.g. a tight 2px inner glow plus a wider 12px outer bloom). The glow should transition in smoothly over 200–300ms using `transition: box-shadow`. Define reusable Tailwind utility classes in `neon.css` for each color variant (pink glow, cyan glow, purple glow) so they can be applied consistently across components.
  **Libraries:** `tailwindcss` custom utilities, `framer-motion` for hover state transitions

- **Consistent color palette: hot pink, cyan, purple, deep navy**
  The entire palette is defined as CSS custom properties in `variables.css` and extended into the Tailwind config so both raw CSS and Tailwind classes reference the same tokens. Hot pink (`#D4537E`) is used for primary CTAs, the sun, and high-priority accents. Cyan/teal (`#1D9E75` or `#5DCAA5`) is used for frontend skill badges, secondary highlights, and success states. Purple (`#534AB7` through `#7F77DD`) is used for structural UI elements, grid lines, and tertiary accents. Deep navy (`#0D0B1E`) is the base. Never introduce colors outside this palette — the consistency is what makes the aesthetic work.
  **Libraries:** `tailwindcss` theme extension

- **Pixel/chrome gradient font for all headings**
  Section headings and the hero name use Press Start 2P loaded from Google Fonts. A chrome gradient effect is applied using `background: linear-gradient(...)`, `background-clip: text`, and `color: transparent` — this gives the text a metallic pink-to-cyan or orange-to-yellow gradient fill identical to the "RETRO CLASSICS" reference image. Body text and descriptions use Space Grotesk or Inter at normal weight for readability. Never use Press Start 2P for body copy — it is unreadable at small sizes and is purely a display font.
  **Libraries:** Google Fonts (`@fontsource/press-start-2p` as an npm alternative to avoid FOUT)

- **Scanline overlay with subtle purple tint across the whole page**
  A fixed full-viewport `div` sits above the starfield but below all content, with `pointer-events: none` so it never interferes with interaction. It uses a repeating CSS linear gradient of alternating transparent and semi-transparent dark-purple stripes at 2–3px intervals to simulate CRT scanlines. Opacity should be very low (5–10%) so it is felt atmospherically rather than seen explicitly. On mobile and on `prefers-reduced-motion`, reduce opacity further or remove entirely since it can cause visual fatigue on small screens.
  **Libraries:** Pure CSS, no library needed

- **Smooth glitch transition effect between sections on scroll**
  When the user scrolls into a new section, a brief RGB channel-split glitch flickers across the section heading before it settles. This is achieved by briefly offsetting duplicate `::before` and `::after` pseudo-elements of the heading text in red and cyan channels with a randomised horizontal translate, then snapping back. The entire effect lasts 400–600ms and triggers once per section as it enters the viewport. Use an Intersection Observer to trigger it at the right scroll position. For `prefers-reduced-motion` users, skip the glitch entirely and use a simple fade-in instead.
  **Libraries:** `framer-motion` (custom variants), or a lightweight custom hook wrapping `IntersectionObserver`

- **Neon horizontal rule dividers between every section**
  Section breaks use a styled `<hr>` or a `<div>` rendered as a 1px horizontal line with a neon glow applied via `box-shadow`. Alternate between pink and purple dividers to maintain visual rhythm. The line itself can also carry a subtle gradient from transparent on both ends to full color in the center, creating a "beam" effect rather than a flat rule. This prevents sections from bleeding into each other while reinforcing the aesthetic.
  **Libraries:** Pure CSS

- **Subtle CRT vignette on the screen edges**
  A fixed full-viewport overlay using a radial gradient from transparent in the center to a dark semi-transparent navy or black at the edges. This darkens the corners and periphery of the screen to simulate the natural light falloff of a curved CRT monitor. Opacity around 20–30%. Like the scanline overlay, it sits above the starfield and below all content with `pointer-events: none`. Combined with the scanlines this gives the whole site an undeniable CRT quality without being distracting.
  **Libraries:** Pure CSS

---

## 01 — Hero Section

- **Full viewport height**
  The hero occupies exactly 100vh so it is the only thing visible on initial page load. Use `min-height: 100svh` (small viewport height) on mobile to account for browser chrome that collapses on scroll. No scrollbar should be visible within the hero itself — the user should feel like they have landed on a self-contained cinematic screen before scrolling deeper.
  **Libraries:** Tailwind `min-h-screen` or `min-h-svh`

- **Animated synthwave grid floor scrolling toward the viewer**
  This is the centerpiece of the entire site. A Canvas 2D animation draws a perspective grid that simulates infinite forward movement — horizontal lines get further apart as they approach the bottom of the canvas (closer to the viewer) and vertical lines converge toward a vanishing point at the horizon center. New lines spawn at the horizon and travel toward the viewer, looping seamlessly. The animation runs via `requestAnimationFrame` in a `useEffect` hook, cancelled on component unmount. Line color is hot pink or purple. Subtle line opacity falloff toward the horizon adds depth. Target 60fps — the grid should feel smooth and hypnotic.
  **Libraries:** Native Canvas API, or `@react-three/fiber` with a `PlaneGeometry` and wireframe material for a 3D version

- **Retrowave striped sun rising from the horizon, centered**
  The sun sits exactly at the horizon center, half above and half below the horizon line. It is a circle or ellipse filled with an orange-to-yellow gradient, with evenly spaced horizontal dark stripes cut across its lower half using either `clip-path`, SVG `rect` elements, or a stacked CSS approach. The sun can be a pure SVG component, making it crisp at all resolutions and easy to animate. A subtle pulsing glow (`box-shadow` or SVG `filter: drop-shadow`) breathes life into it. Optionally add a very slow vertical rise animation on page load as if the sun is cresting the horizon.
  **Libraries:** Inline SVG component, `framer-motion` for the rise animation

- **Wireframe mountains on left and right flanking the sun**
  Two SVG polygon or polyline shapes sit on either side of the sun at the horizon line, styled as teal/cyan wireframe mountain silhouettes with no fill and a neon stroke. They should feel like low-poly terrain from an 80s vector graphics demo. These can be hardcoded SVG path data or generated procedurally. A subtle inner glow on the stroke lines ties them into the neon aesthetic. They sit between the starfield and the grid floor in z-order.
  **Libraries:** Inline SVG, or `react-spring` for subtle idle sway animation

- **Your name as the headline in large pixel/chrome gradient text**
  The largest text element on the page. Press Start 2P font at a size that commands attention — around 3–5rem depending on name length. Chrome gradient applied via CSS background-clip trick, going from hot pink through purple to cyan. A subtle `text-shadow` in multiple layers creates depth and glow. On mobile, scale down gracefully using `clamp()` for font-size so it never overflows the viewport. This text should render above all canvas layers with a clearly higher `z-index`.
  **Libraries:** `@fontsource/press-start-2p`, Tailwind for sizing

- **Your title below in glowing cyan**
  A secondary line directly below the name, e.g. "FULL STACK DEVELOPER". Smaller than the name (around 0.8–1rem in Press Start 2P or slightly larger in Space Grotesk with letter-spacing). Colored in cyan/teal with a matching neon `text-shadow` glow. Letter spacing of 0.3–0.5em gives it that broadcast/terminal feel. Animate it in with a slight delay after the name appears on load.
  **Libraries:** `framer-motion` for staggered entrance

- **Blinking cursor at the end of your title**
  A simple rectangular block cursor character (`█` or a styled `<span>`) appended after the title text. It blinks on/off on a 500–700ms CSS animation cycle using `opacity: 0` to `opacity: 1`. This references both terminal and retro game aesthetics simultaneously. On `prefers-reduced-motion` keep it static (always visible, no blink).
  **Libraries:** Pure CSS `@keyframes`, or `typed.js` / `react-typed` if you want a typewriter effect that then leaves the cursor

- **Glowing CTA button with neon border and bloom on hover**
  A single "VIEW MY WORK" button, transparent background with a 1–2px hot pink border and matching `box-shadow` glow. On hover the glow intensifies (wider blur radius, higher opacity) and the background fills with a very low opacity pink tint. On click, a brief flash effect fires. The button smoothly scrolls to the Projects section using native smooth scroll behavior. Press Start 2P font at a small size (8–9px) with letter spacing.
  **Libraries:** `framer-motion` (`whileHover`, `whileTap`), native `scrollIntoView`

- **Subtle VHS noise/grain layer on top of the whole hero**
  A canvas or SVG filter layer adds dynamic film grain over the hero. A canvas approach re-randomises pixel noise on every few frames to create a living, breathing static effect. Opacity should be very low (3–6%) — enough to feel analog without obscuring the content below. An SVG `feTurbulence` filter is a lighter alternative that achieves a similar result without per-frame JS. On `prefers-reduced-motion`, replace with a static noise texture image at low opacity.
  **Libraries:** Native Canvas API, or `react-noise` for a pre-built noise component

---

## 02 — About Me Section

- **Dark card or panel with a faint inner grid texture**
  The about section content sits inside a large dark card (`#100E24` or similar) with a `border: 1px solid #534AB7` and a very subtle repeating grid pattern inside using either a CSS `background-image` with a linear-gradient crosshatch or a low-opacity SVG pattern. The grid texture should be barely perceptible — 5–8% opacity max. The card has generous padding and rounded corners (4–6px) to soften the otherwise hard-edged aesthetic.
  **Libraries:** Tailwind for layout, pure CSS for grid texture

- **A pixel art avatar or portrait**
  Instead of a standard photograph, use a pixel art version of yourself. Tools like Piskel or Aseprite can create this manually, or you can commission one. Export as a PNG with a transparent background. Display it in an appropriately sized container with a neon border glow matching your accent color. Optionally add a subtle idle animation (a slow bob or blink cycle) using a sprite sheet and CSS `steps()` animation to bring it to life. This is one of the most memorable elements of the entire portfolio.
  **Libraries:** Pure CSS sprite animation, or `framer-motion` for simple bob effect

- **Short bio text in a clean sans-serif**
  2–4 sentences max. Use Space Grotesk or Inter at 16px, line-height 1.7, in a pale off-white color (`#EEEDFE` or similar). Do not use Press Start 2P here — save pixel fonts exclusively for headings. The bio should read fast and confidently. Keep it personal and specific — mention Berlin, your background, and what you are currently focused on. This text should feel human against the cold neon surroundings.
  **Libraries:** Google Fonts or `@fontsource/space-grotesk`

- **Neon-glowing section heading**
  "ABOUT ME" in Press Start 2P with the full chrome gradient treatment and layered `text-shadow` glow. A thin neon underline divider sits below it, colored in hot pink, extending a short distance either side of the text (not full width — proportional to the text width). This heading pattern repeats identically across every section for consistency.
  **Libraries:** `@fontsource/press-start-2p`

- **Key facts as glowing stat blocks**
  3–4 small rectangular cards displaying key facts: years of experience, number of projects, location, current status. Each stat block has a dark background, a neon-colored border (each card a different accent color from the palette), a large number or short value in the accent color, and a small muted label below it. They sit in a row below the bio text. On hover each card's border glow intensifies.
  **Libraries:** `framer-motion` for hover glow, Tailwind for grid layout

- **Animated glow pulse on avatar or card border**
  The avatar container or the about card border slowly pulses its `box-shadow` glow between a dimmer and brighter state on a 2–3 second ease-in-out loop. This is purely ambient — it adds life to the section without demanding attention. Implemented as a CSS `@keyframes` animation on `box-shadow`. Keep the pulse subtle; it should feel like breathing, not flashing.
  **Libraries:** Pure CSS `@keyframes`

---

## 03 — Skills Section

- **Section heading in pixel chrome style**
  "SKILLS" in Press Start 2P with the chrome gradient and glow treatment, identical to the About heading. Consistency in headings across all sections is what ties the whole portfolio together visually. The heading enters the viewport with a glitch flicker animation on scroll.
  **Libraries:** `framer-motion` with `useInView`

- **Skills grouped by category**
  Three or four category groups: Frontend, Backend, Tools, and optionally Other. Each group has a small category label above it in the category's accent color (Frontend = cyan, Backend = pink, Tools = purple). The badges within each group sit in a `flex-wrap` row so they reflow naturally on smaller screens. This grouping makes the section scannable and avoids the common portfolio mistake of dumping all technologies in a single undifferentiated list.
  **Libraries:** Tailwind flex utilities

- **Skill displayed as neon badges**
  Each skill is a pill-shaped badge with a dark background, a 1px neon border in its category color, the skill name in a small monospace or Press Start 2P font at 10–12px, and a matching text glow. The border has a subtle `box-shadow` glow. Badges are compact — they should feel like retro arcade tokens or sci-fi data chips. On hover, the badge glows more intensely and scales up very slightly (1.05x) to indicate interactivity.
  **Libraries:** `framer-motion` (`whileHover`), Tailwind for base styles

- **Skill bars styled as retro arcade progress bars**
  For a subset of key skills, a proficiency bar is displayed below the badge groups. Each bar is a narrow rectangle with a dark track background and a blocky pixelated fill (achieved with `background-image: repeating-linear-gradient` to create a segmented block pattern rather than a smooth fill). The fill is colored in the skill's category color with a neon glow on the fill edge. On scroll into view, the bar animates from 0% to its target width over 800ms with an ease-out curve. Never show exact percentages — the bars are decorative indicators, not precise metrics.
  **Libraries:** `framer-motion` with `useInView` for scroll-triggered fill animation

- **Color coding by category**
  Frontend skills use cyan/teal. Backend skills use hot pink. Tool skills use purple. This color coding is applied consistently across the badge borders, category labels, skill bar fills, and any hover states within that category. It creates an immediate visual grammar that visitors absorb without needing to read labels. Define the category-to-color mapping in a `skills.ts` data file so it is applied programmatically rather than hardcoded per badge.
  **Libraries:** Data-driven from `skills.ts`

---

## 04 — Projects Section

- **Section heading in pixel chrome style**
  "PROJECTS" in Press Start 2P with chrome gradient, glow, and glitch entrance — same treatment as all other section headings.
  **Libraries:** `framer-motion` with `useInView`

- **Project cards with glowing neon borders**
  Each project lives in a dark card component with `background: #0D0B1E`, generous padding, and a 1–1.5px border in a neon accent color. Cards alternate border colors across the grid (pink, cyan, purple, orange) to prevent visual monotony. The border has a `box-shadow` glow in the same color. Cards have a `border-radius` of 4–6px. They sit in a 2-column CSS grid on desktop and collapse to a single column on mobile. Maintain consistent card height within rows using `align-items: stretch`.
  **Libraries:** Tailwind grid, `framer-motion`

- **Faint grid texture inside each card**
  The same subtle crosshatch grid pattern used in the About section card is repeated inside each project card at even lower opacity (3–5%). This reinforces the synthwave grid motif as a recurring visual thread throughout the portfolio rather than just a hero-section gimmick.
  **Libraries:** Pure CSS background pattern

- **Project screenshot or synthwave placeholder**
  A fixed-height image area at the top of each card displays a screenshot of the project. If the project is not yet live or has no screenshot, use a synthwave-themed placeholder — a small canvas or SVG with a miniature grid and sun. Images are lazy-loaded using native `loading="lazy"` and ideally served as WebP. A subtle dark gradient overlay fades the bottom edge of the image into the card body below it.
  **Libraries:** Native lazy loading, `react-intersection-observer` for custom lazy loading if needed

- **Project title in gradient pixel font**
  Each card title uses Press Start 2P with a gradient matching or complementing the card's border color. Font size around 10–12px due to the density of the pixel font. A thin neon underline in the card's accent color sits directly below the title, width-matched to the text.
  **Libraries:** `@fontsource/press-start-2p`

- **Tech stack as small glowing retro tags**
  2–4 technology tags at the bottom of each card, styled as small pill badges consistent with the skills section badge design. Each tag inherits its color from the global category color mapping (React tag = cyan, Node tag = pink, etc.). This creates visual cross-referencing between your Skills and Projects sections.
  **Libraries:** Shared badge component from `components/ui/NeonBadge`

- **Two CTA buttons per card**
  "LIVE DEMO" and "GITHUB" buttons sit side by side at the bottom of each card. They use distinct neon colors (cyan for Live Demo, purple for GitHub) so they are immediately distinguishable. Both use the same base button style as the hero CTA — transparent background, neon border, glow on hover. On mobile they stack vertically.
  **Libraries:** `framer-motion` (`whileHover`, `whileTap`), shared `Button` component

- **Card hover: border glow intensifies with upward lift**
  On hover the card's `box-shadow` glow expands (from e.g. 0 0 8px to 0 0 20px) and the card translates upward by 4–6px using `transform: translateY(-4px)`. Both effects transition over 200ms. This is a standard card hover pattern but the neon glow makes it feel unique to the aesthetic. On touch devices the hover state is skipped — use `@media (hover: hover)` to scope it.
  **Libraries:** `framer-motion` (`whileHover`)

---

## 05 — Experience / Timeline Section

- **Vertical timeline as a glowing neon line**
  A centered vertical line runs the full height of the section, colored in purple with a `box-shadow` glow. This is the visual backbone of the section. On scroll, the line can animate in from top to bottom using a `scaleY` transform originating from the top, triggered when the section enters the viewport. The line is a simple `div` with a fixed width (1–2px) and `height: 100%`, absolutely positioned in the center of the section container.
  **Libraries:** `framer-motion` with `useInView` for the line draw animation

- **Timeline entries alternating left and right**
  Odd-numbered entries hang to the left of the line, even-numbered to the right. Each card is connected to the line by a short horizontal connector line in the same purple. On mobile the alternating layout collapses to all-left (or all-right) with the line moving to the leftmost edge, a standard responsive timeline pattern. The left/right alternation creates natural visual rhythm on desktop that guides the eye down the page.
  **Libraries:** Tailwind responsive classes, `framer-motion` for slide-in from left/right

- **Company name in gradient text, role in cyan, dates in purple**
  Within each timeline card: the company name uses the chrome gradient treatment at a moderate size. The job title/role sits below it in cyan. The date range is in a muted purple at a smaller size. A few lines of description in pale off-white Space Grotesk body text sit below that. Keep descriptions short — 1–2 lines. This is a portfolio, not a CV.
  **Libraries:** Shared typography utilities from Tailwind

- **Timeline nodes as glowing neon circles**
  At the point where each entry's connector meets the central line, a small filled circle (8–12px diameter) acts as a visual node. The circle is filled with the entry's accent color and has a pulsing neon `box-shadow` glow on the same slow-breathing cycle as the About section avatar glow. Each entry can use a different accent color node to add variety.
  **Libraries:** Pure CSS for pulse animation

- **Entrance animation on scroll**
  Each timeline card slides in from its respective side (left cards from the left, right cards from the right) with a simultaneous fade-in, triggered as it crosses into the viewport. Use a stagger delay between entries so they animate in sequence rather than all at once. On `prefers-reduced-motion` use fade-only with no translate.
  **Libraries:** `framer-motion` `variants` with `staggerChildren`, `useInView`

---

## 06 — Contact Section

- **Section heading in pixel chrome style**
  "CONTACT" in Press Start 2P with chrome gradient and glitch entrance — consistent with all other section headings.
  **Libraries:** `framer-motion` with `useInView`

- **Punchy tagline in neon pink**
  A short line directly below the heading — something like "LET'S BUILD SOMETHING" — in hot pink with a glow. Slightly smaller than the heading. Letter-spaced generously. This is the human moment of the section, so make the copy personal and direct.
  **Libraries:** Pure CSS

- **Input fields with dark backgrounds, neon borders, glow on focus**
  Each input and textarea has `background: #0D0B1E`, a default `border: 1px solid #3C3489` (dim purple), and on focus it transitions to a brighter `border-color` and `box-shadow` glow in cyan. This `focus` state transition takes 150ms. The label sits above each field in a muted purple, small caps or monospace. Placeholder text is very dim — `opacity: 0.3` — so it does not compete with the label. Use controlled React components for all fields.
  **Libraries:** React `useState` for form state, Tailwind for base styles, `framer-motion` for focus animation

- **Submit button with bloom animation on hover and click**
  Full-width or prominently wide button at the bottom of the form. Hot pink border, transparent background, "SEND MESSAGE" in Press Start 2P. On hover the glow blooms outward. On click a brief bright flash fires across the button surface before the loading state begins. During the API call the button shows a pulsing state. On success it turns cyan and displays a confirmation message. On error it turns red with an error message. Handle all three states explicitly.
  **Libraries:** `framer-motion` (`whileHover`, `whileTap`), `react-hook-form` for form handling, `zod` for client-side validation

- **Form validation and API call**
  Use `react-hook-form` with a `zod` resolver for client-side validation. On submit, call your Express backend `/api/contact` endpoint via native `fetch`. Show inline validation errors in hot pink below each field. The validation schema on the frontend should be imported from `shared/types/contact.types.ts` — the same schema your backend uses — so validation rules are never out of sync between client and server.
  **Libraries:** `react-hook-form`, `zod`, `@hookform/resolvers`

- **Social links as neon icon buttons**
  GitHub, LinkedIn, and any other relevant links displayed as square icon buttons with a dark background, neon border, and the platform's associated accent color glow. Use SVG icons (Lucide React or Simple Icons for brand logos) sized at 20–24px. On hover the icon color brightens and the border glow intensifies. These sit below the submit button, centered in a row.
  **Libraries:** `lucide-react` for generic icons, `react-icons` for brand icons (si prefix for Simple Icons)

- **Decorative synthwave sun or grid element**
  A smaller echo of the hero's sun graphic positioned decoratively behind or beside the form — significantly smaller, low opacity (20–30%), acting as a background texture element rather than a focal point. This ties the contact section back to the hero visually and prevents the section from feeling like it belongs to a different site.
  **Libraries:** Reused SVG sun component from Hero section

---

## 07 — Footer

- **Minimal dark background centered layout**
  The footer uses the darkest background on the site (`#0A0818`) to signal "end of page" without an abrupt cut-off. All content is horizontally centered. Minimal vertical padding — this is not a content section, just a closing flourish. No full-width containers or grid layouts needed.
  **Libraries:** Tailwind

- **Name or logo in pixel font**
  Your name or a short `BRIAN.DEV` style logomark in Press Start 2P at a small size (10–12px) in a muted pale color. No gradient needed here — the hero has already made the impression. This is just a clean sign-off.
  **Libraries:** `@fontsource/press-start-2p`

- **Copyright line in muted purple**
  A single line in a small monospace font, muted purple color. Keep it brief — just the year and your name. Optionally add a small wink like "made with neon and caffeine" in the spirit of the aesthetic.
  **Libraries:** Pure CSS

- **Thin neon line divider at the top of the footer**
  A 1px top border on the footer element in hot pink with a `box-shadow` glow, separating it from the Contact section above. This is the last instance of the neon divider motif used throughout the site.
  **Libraries:** Pure CSS

- **Social icon links repeated with subtle glow**
  The same social icons from the Contact section repeated here at a smaller size (16–18px), arranged in a tight row. Consistent behavior — neon glow on hover. Having them in the footer means visitors who scroll all the way to the bottom always have an easy path to your profiles.
  **Libraries:** `lucide-react`, `react-icons`

---

## 🎨 Assets Checklist

| Asset | Format | Notes |
|---|---|---|
| Pixel art avatar | PNG (transparent bg) | Create in Aseprite or Piskel |
| Synthwave sun | SVG component | Reusable across Hero and Contact |
| Wireframe mountains | SVG component | Hardcoded path data |
| Scrolling grid | Canvas animation | Custom hook `useSynthGrid` |
| Starfield | Canvas animation | Custom hook `useStarfield` |
| Press Start 2P | Font via `@fontsource` | Headings only |
| Space Grotesk | Font via `@fontsource` | Body text |
| Neon glow utilities | CSS custom properties | Defined in `neon.css` |
| 8-bit hover sounds | MP3/OGG | Off by default, `howler.js` |
| VHS grain texture | PNG or Canvas | Low opacity overlay |

---

## 📦 Complete Library Reference

| Library | Purpose |
|---|---|
| `framer-motion` | Animations, transitions, scroll triggers, hover/tap states |
| `react-hook-form` | Contact form state management |
| `zod` | Form validation (shared with backend) |
| `@hookform/resolvers` | Connects zod schema to react-hook-form |
| `react-intersection-observer` | Scroll-triggered animations (wraps IntersectionObserver) |
| `lucide-react` | UI icons (nav, footer, buttons) |
| `react-icons` | Brand/social icons (GitHub, LinkedIn etc.) |
| `@fontsource/press-start-2p` | Pixel heading font, self-hosted via npm |
| `@fontsource/space-grotesk` | Body text font, self-hosted via npm |
| `howler` | Optional 8-bit hover sound effects |
| `clsx` + `tailwind-merge` | Conditional class name utility (`cn.ts`) |
| Native Canvas API | Starfield and synthwave grid animations |
| Native SVG | Sun, mountains, decorative elements |
