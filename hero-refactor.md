## Hero Refactor

## Core Concept

I want the portfolio page to load a full screen viewport synthwave night time City skyline scene with a Synthwave styles sun, stars, city skyline, A DMC Delorean and a neon synthwave grid road. The animation will be scroll drivin , each element of the scene will scroll into view as the user mouse scrolls or finger swipe up. After the Animation is complete the scene settles into the Hero section of the webpage and the top Navigation becomes visible resulting in the user being able to scroll down the entirety of the portfolio. Must use a parallax effect.

## Requirements
- The page should show a initial loading synthwave style icon/animation.
- Apparent scroll indicator notifying the user to start scrolling.
- Traditional Synthwave sun animates upwards vertically one horizontal sun beam at a time until complete and settles in top right of viewport width.
- As Synthwave sun is completing small and large stars speckle the night sky.
- After sun and stars are nearly complete a synthwave styled city skyline emerges from below to the viewport and settles to left of the stars and sun spanning 90% of the viewport width.
- The city skyline is near completion a retro synthwave inspired GM Delorean emerges from the left of the viewport as a synthwave orange grid roadway appears under the Delorean. The Delorean reaches the center of the viewport width with wheels still spinning as the neon synthwave grid roadway animates and moves under the Delorean giving the illusion of The Delorean driving.
- once the Delorean and grid roadway is near complete animating, A large synthwave styled banner start animating in the center of the viewport width and height above the Delorean stacking each text element which has main title saying Brian Cordisco and sub heading Web Developer.
- Must be fully responsive on all modern CSS viewport break points widths
- Navigation should become visible after the synthwave scene has completed and settled into the Hero section.
- After scene completion and Navigation reveal the user can scroll and navigate the whole entire site.
- Must be a parallax effect.

## Libraries for the Synthwave Hero Scene

---

## Core Scroll & Orchestration

**GSAP + ScrollTrigger** — this is the most important recommendation on the entire list. Framer Motion is excellent for component-level animations but it is not built for this kind of complex, multi-element, scroll-choreographed scene. GSAP ScrollTrigger is the industry standard for exactly this use case — pinning the viewport, sequencing animations based on scroll progress, and scrubbing through a timeline. Every major element in your scene (sun rise, stars, skyline, Delorean, banner) becomes a ScrollTrigger timeline that fires in sequence.

**Use Framer Motion alongside GSAP** — do not replace it. Keep Framer Motion for the rest of the portfolio (section entrances, card hovers, form interactions). Use GSAP exclusively for the hero scene. They coexist without conflict.

```
gsap
@gsap/react          ← official React integration hooks
scrolltrigger        ← comes bundled with gsap
```

---

## 🌅 Sun Animation

**GSAP Timeline + SVG** The sun is a pure SVG component. Each horizontal stripe animates in one by one using a GSAP `stagger` timeline tied to ScrollTrigger progress. The stripes clip-reveal from bottom to top using `clipPath` or `scaleY` transforms on each stripe element. GSAP's `stagger` property handles the sequential stripe reveal in a single timeline call — no manual sequencing needed.

```
gsap (timeline + stagger)
```

---

## ⭐ Starfield

**tsParticles** — the most capable particle system for React. Handles hundreds of stars with individual twinkle animations, randomised sizes, and opacity pulses. Integrates as a React component and can be triggered to spawn particles at a specific scroll progress point via GSAP's `onEnter` callback. Lightweight enough to run alongside the canvas animations.

```
@tsparticles/react
@tsparticles/slim      ← smaller bundle, enough for stars
```

---

## 🌆 City Skyline

**SVG + GSAP** The skyline is an SVG illustration. Buildings emerge from below the viewport using a `translateY` from `+100%` to `0` tied to ScrollTrigger scrub. Individual buildings can stagger in at slightly different speeds using GSAP `stagger` to give depth. Neon window lights on the buildings are SVG `rect` elements that flicker using a GSAP `repeat: -1` yoyo animation once the skyline is settled.

For generating the actual SVG skyline artwork, use **Inkscape** or **Figma** — draw it once, export clean SVG, embed as a React component via `vite-plugin-svgr`.

```
gsap (translateY scrub)
vite-plugin-svgr       ← import SVGs as React components
```

---

## 🚗 DeLorean

**Lottie** — the DeLorean is the most complex visual element. Create the DeLorean as a Lottie JSON animation using delorean.png in the root folder as a style guide. Lottie handles the wheel spin loop natively as part of the animation file. GSAP controls when it enters from the left and reaches center. The Lottie animation's internal playback (wheel spin) runs independently once triggered.

Alternatively, if you want full SVG control, the DeLorean can be a static SVG with the wheels as separate rotating `circle` elements animated via GSAP `rotation` on a `repeat: -1` loop.

```
lottie-react           ← plays Lottie JSON in React
```

---

## 🛣️ Neon Grid Road

**Three.js** The moving grid road under the DeLorean is the same perspective grid technique from the original hero concept but cropped to a road-width strip.

**Three.js via `@react-three/fiber` (better visual)** — a `PlaneGeometry` with a wireframe grid material, moving texture offset to simulate road motion, proper perspective camera. Gives you real 3D perspective on the road surface with very little code using R3F's declarative API.

```
@react-three/fiber     ← Three.js in React
@react-three/drei      ← helpers: Grid, PerspectiveCamera, useScroll
```

If you use R3F for the road, `@react-three/drei`'s `useScroll` hook integrates directly with your scroll driver.

---

## 📜 Scroll Pinning & Parallax

**GSAP ScrollTrigger `pin: true`** The entire hero scene section is pinned to the viewport while the user scrolls through the animation sequence. The page does not actually move — the scroll progress drives the animation timeline. Once the sequence completes, ScrollTrigger unpins and the page scrolls normally. This is the core mechanic.

**Parallax depth layers** — each scene layer (stars, mountains, skyline, road, DeLorean) has a different `scrub` multiplier in GSAP so they move at different speeds relative to scroll, creating genuine parallax depth without a separate library.

```
gsap ScrollTrigger (pin + scrub + parallax)
```

---

## 🔤 Banner Text

**Framer Motion** — this is where you keep using what you already have. The banner text elements (BRIAN CORDISCO, WEB DEVELOPER) stack in using Framer Motion `variants` with `staggerChildren`, triggered when GSAP's ScrollTrigger reaches the banner phase. The glitch effect on the name uses Framer Motion custom keyframes. This is the handoff point between GSAP (scene) and Framer Motion (content).

```
framer-motion (already installed)
```

---

## ⏳ Loading Screen

**Framer Motion** A full-viewport loading screen with a small synthwave animation — a miniature version of the sun or a pixel icon — that plays for 1.5–2 seconds then exits with a wipe or fade transition. Use Framer Motion `AnimatePresence` to unmount it cleanly. Behind it the scene canvas and SVGs preload silently.

```
framer-motion AnimatePresence (already installed)
```

---

## 📱 Responsive Handling

**`useMediaQuery` hook (custom or via `usehooks-ts`)** You need to detect breakpoints in JS, not just CSS, because your GSAP animation values (distances, sizes, positions) need to adapt to viewport width. A simple `useMediaQuery` hook lets you swap GSAP `x`/`y` values between mobile and desktop. On mobile, simplify the scene — stars + sun + banner only, skip the DeLorean and skyline or scale them significantly.

```
usehooks-ts            ← useMediaQuery and other useful hooks
```

---

## 📦 Full Install List

```
gsap
@gsap/react
lottie-react
@tsparticles/react
@tsparticles/slim
@react-three/fiber
@react-three/drei
three
@types/three
vite-plugin-svgr
usehooks-ts
```

---

## 🗺️ Recommended Architecture

```
src/
├── sections/
│   └── Hero/
│       ├── Hero.tsx              ← orchestrator, mounts scene
│       ├── HeroScene.tsx         ← GSAP ScrollTrigger timeline lives here
│       ├── LoadingScreen.tsx     ← Framer Motion AnimatePresence
│       ├── ScrollIndicator.tsx   ← bounce arrow, fades out on scroll
│       ├── scene/
│       │   ├── SynthSun.tsx      ← SVG + GSAP stripe reveal
│       │   ├── Starfield.tsx     ← tsParticles
│       │   ├── CitySkyline.tsx   ← SVG translateY scrub
│       │   ├── Delorean.tsx      ← Lottie or SVG + wheel spin
│       │   ├── GridRoad.tsx      ← R3F canvas or Canvas 2D
│       │   └── HeroBanner.tsx    ← Framer Motion stagger text
│       └── index.ts
```

---

**The key architectural decision:** GSAP ScrollTrigger owns the scroll timeline and tells each scene child _when_ to animate. Each child component owns _how_ it animates internally. That separation keeps the code maintainable as the scene grows in complexity.