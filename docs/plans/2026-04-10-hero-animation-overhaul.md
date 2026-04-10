# Hero Section Animation Overhaul — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Bring the Hero section fully in line with synthwave-requirements.md §01, with perfect animations — VHS noise canvas, sun/horizon alignment, tightened framer-motion stagger, and removal of the terminal kicker.

**Architecture:** Four targeted changes across Hero.tsx, a new VHSNoiseCanvas component, CSS fixes in neon.css, and updated animation timing in animations.ts. No new dependencies required.

**Tech Stack:** React 18, TypeScript, Framer Motion, Native Canvas API, Tailwind CSS

**User decisions:**
- Keep scroll parallax (scene reveal on scroll)
- Remove terminal kicker, keep summary paragraph
- Keep both CTA buttons
- VHS noise: canvas per-frame approach

---

### Task 1: Create `VHSNoiseCanvas` component

**Files:**
- Create: `frontend/src/canvas/VHSNoiseCanvas.tsx`

**Step 1: Write the component**

```tsx
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/useScrollAnimation";

type VHSNoiseCanvasProps = {
  className?: string;
};

const VHSNoiseCanvas = ({ className }: VHSNoiseCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let frameCount = 0;
    const NOISE_ALPHA = 18; // ~7% of 255

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const bounds = canvas.getBoundingClientRect();
      canvas.width = Math.floor(bounds.width * dpr);
      canvas.height = Math.floor(bounds.height * dpr);
    };

    const drawNoise = () => {
      const { width, height } = canvas;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() > 0.5 ? 255 : 0;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = NOISE_ALPHA;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
      frameCount++;
      if (frameCount % 3 === 0) drawNoise(); // redraw every 3rd frame ~20fps
      animationFrameId = requestAnimationFrame(loop);
    };

    resize();

    if (prefersReducedMotion) {
      drawNoise(); // static grain only
    } else {
      animationFrameId = requestAnimationFrame(loop);
    }

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={
        className ??
        "pointer-events-none absolute inset-0 h-full w-full opacity-[0.045] mix-blend-screen"
      }
      style={{ zIndex: 3 }}
    />
  );
};

export default VHSNoiseCanvas;
```

**Step 2: Verify it compiles**
```
cd frontend && npx tsc --noEmit
```
Expected: no errors related to `VHSNoiseCanvas`.

---

### Task 2: Fix sun/horizon alignment in `neon.css` and add `.hero-sun-inner`

**Files:**
- Modify: `frontend/src/styles/neon.css`

**Context:** The horizon line sits at `bottom: 24%` (`.hero-horizon-line`). The sun disc must be centered ON that line — half above, half below. Currently `.hero-sun-wrap` is at `bottom: 13%` which places the sun ~11% below the horizon. The fix is to move the wrap to `bottom: 24%` and add a child `.hero-sun-inner` with `transform: translateY(50%)` to vertically center the disc on the horizon. The scroll-driven inline `transform` on the wrap will compound cleanly since it only applies `translate3d` + `scale`.

**Change `.hero-sun-wrap`:**
```css
/* FROM */
.hero-sun-wrap {
  position: absolute;
  inset-inline: 0;
  bottom: 13%;
  display: flex;
  justify-content: center;
  filter: drop-shadow(0 0 30px rgba(255, 41, 117, 0.5));
  transform-origin: center bottom;
}

/* TO */
.hero-sun-wrap {
  position: absolute;
  inset-inline: 0;
  bottom: 24%;
  display: flex;
  justify-content: center;
  filter: drop-shadow(0 0 30px rgba(255, 41, 117, 0.5));
}
```

**Add new rule after `.hero-sun-wrap`:**
```css
/* Centers sun disc on the horizon line */
.hero-sun-inner {
  transform: translateY(50%);
}
```

---

### Task 3: Tighten hero stagger animations in `animations.ts`

**Files:**
- Modify: `frontend/src/utils/animations.ts`

**Add** these new named variants (keep existing `heroItemVariants` export intact to avoid breaking other callers):

```ts
// Name (h1) — first in, dramatic rise with blur
export const heroNameVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Title / role — delayed after name
export const heroRoleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.75, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Summary copy
export const heroSummaryVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 1.0, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// CTA buttons — last in
export const heroCtaVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 1.2, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};
```

Also update `heroStaggerVariants` so children animate independently (individual delays):
```ts
export const heroStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0,
      delayChildren: 0,
    },
  },
};
```

---

### Task 4: Update `Hero.tsx`

**Files:**
- Modify: `frontend/src/sections/Hero/Hero.tsx`

**Changes:**
1. Remove the `terminal-kicker` motion element
2. Import new animation variants: `heroNameVariants`, `heroRoleVariants`, `heroSummaryVariants`, `heroCtaVariants`
3. Import `VHSNoiseCanvas` from `../../canvas/VHSNoiseCanvas`
4. Apply correct variants to each content element
5. Add `hero-sun-inner` wrapper around `sun-disc`
6. Mount `<VHSNoiseCanvas />` inside `hero-scene-shell` as the topmost child
7. Wrap `hero-scene-shell` div in `motion.div` with scene fade-in (`initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease: "easeOut" }}`)

**Full updated `Hero.tsx`:**

```tsx
import { motion } from "framer-motion";
import VHSNoiseCanvas from "../../canvas/VHSNoiseCanvas";
import SynthGrid from "../../canvas/SynthGrid";
import Button from "../../components/ui/Button/Button";
import GlitchText from "../../components/ui/GlitchText/GlitchText";
import { profile } from "../../data/profile";
import { useScrollProgress } from "../../hooks/useScrollAnimation";
import {
  heroStaggerVariants,
  heroNameVariants,
  heroRoleVariants,
  heroSummaryVariants,
  heroCtaVariants,
} from "../../utils/animations";

export const Hero = () => {
  const { progress, ref } = useScrollProgress<HTMLElement>({
    endOffset: 0.92,
    startOffset: 0.04,
  });
  const sceneReveal = 0.35 + progress * 0.65;
  const sceneInset = Math.max(0, 26 - progress * 26);
  const sceneScale = 0.96 + progress * 0.08;
  const sceneLift = progress * 28;
  const gridOpacity = 0.42 + progress * 0.4;
  const mountainOpacity = 0.48 + progress * 0.42;

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (!projectsSection) return;
    projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={ref}
      className="section-shell overflow-hidden pt-6 sm:pt-10"
      id="hero"
    >
      <div className="section-inner relative flex min-h-[calc(100svh-6rem)] items-center justify-center py-8 sm:min-h-[calc(100svh-5rem)]">
        <div aria-hidden="true" className="orb-glow hero-orb-left" />
        <div aria-hidden="true" className="orb-glow hero-orb-right" />

        {/* Scene — grid, sun, mountains, VHS noise */}
        <motion.div
          aria-hidden="true"
          className="hero-scene-shell"
          style={{ clipPath: `inset(${sceneInset}% 0 0 0)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div
            className="hero-horizon-line"
            style={{ transform: `translate3d(0, ${sceneLift * -0.32}px, 0)` }}
          />
          <svg
            aria-hidden="true"
            className="hero-mountains"
            focusable="false"
            preserveAspectRatio="none"
            style={{
              opacity: mountainOpacity,
              transform: `translate3d(0, ${sceneLift * -0.42}px, 0) scale(${sceneScale})`,
            }}
            viewBox="0 0 1000 360"
          >
            <polyline
              fill="none"
              points="0,260 110,190 170,220 250,138 326,228 402,164 470,232"
              stroke="rgba(0, 208, 255, 0.9)"
              strokeWidth="1.5"
            />
            <polyline
              fill="none"
              points="530,232 616,156 694,232 770,148 840,216 906,174 1000,248"
              stroke="rgba(0, 208, 255, 0.9)"
              strokeWidth="1.5"
            />
            <polyline
              fill="none"
              points="72,260 158,216 214,242 278,190 346,252 418,210"
              stroke="rgba(140, 30, 255, 0.5)"
              strokeWidth="1"
            />
            <polyline
              fill="none"
              points="582,242 648,194 724,248 786,192 860,236 936,202"
              stroke="rgba(140, 30, 255, 0.5)"
              strokeWidth="1"
            />
          </svg>

          <div
            className="hero-sun-wrap"
            style={{
              transform: `translate3d(0, ${sceneLift * -0.5}px, 0) scale(${sceneScale})`,
            }}
          >
            <div className="hero-sun-inner">
              <div className="sun-disc" />
            </div>
          </div>

          <div
            className="hero-grid-floor"
            style={{
              opacity: gridOpacity,
              transform: `perspective(760px) rotateX(75deg) translateY(${progress * 18}px) scale(${0.98 + progress * 0.04})`,
            }}
          >
            <SynthGrid revealProgress={sceneReveal} />
          </div>

          <VHSNoiseCanvas />
        </motion.div>

        {/* Text content */}
        <motion.div
          className="relative z-10 flex max-w-4xl flex-col items-center gap-6 text-center"
          initial="hidden"
          animate="visible"
          variants={heroStaggerVariants}
        >
          <motion.div variants={heroNameVariants}>
            <GlitchText
              as="h1"
              className="text-4xl leading-[1.4] sm:text-6xl lg:text-7xl"
              isActive={progress > 0.015}
              tone="chrome"
            >
              {profile.name}
            </GlitchText>
          </motion.div>

          <motion.p
            className="pixel-heading neon-text-cyan text-[0.72rem] tracking-[0.34em] sm:text-sm"
            variants={heroRoleVariants}
          >
            {profile.role}
            <span aria-hidden="true" className="cursor-block" />
          </motion.p>

          <motion.p
            className="muted-copy max-w-2xl text-base leading-8 sm:text-lg"
            variants={heroSummaryVariants}
          >
            {profile.summary[0]} {profile.summary[1]}
          </motion.p>

          <motion.div
            className="flex flex-col gap-3 sm:flex-row"
            variants={heroCtaVariants}
          >
            <Button
              aria-label="Scroll to the projects section"
              onClick={handleScrollToProjects}
            >
              View My Work
            </Button>
            <Button
              accent="cyan"
              aria-label="Send Brian an email"
              href={`mailto:${profile.email}`}
            >
              Start a Conversation
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
```

**Step 2: Type-check**
```
cd frontend && npx tsc --noEmit
```
Expected: no errors.

---

### Task 5: Final commit

```bash
git add \
  docs/plans/2026-04-10-hero-animation-overhaul.md \
  frontend/src/canvas/VHSNoiseCanvas.tsx \
  frontend/src/sections/Hero/Hero.tsx \
  frontend/src/styles/neon.css \
  frontend/src/utils/animations.ts
git commit -m "feat(hero): VHS noise canvas, sun/horizon alignment, tightened stagger animations"
```
