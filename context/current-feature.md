# Hero Refactor

## Status

Not Started

## Goals

- This is a major refactor of the hero section to create a full-screen synthwave hero intro.
- Create a full-screen synthwave hero intro that loads before the rest of the portfolio experience.
- Build the hero as a scroll-driven animation sequence where scene progress is controlled by mouse wheel or touch swipe input.
- Pin the hero section during the animation and release normal page scrolling only after the sequence completes.
- Add clear parallax depth across scene layers, including stars, skyline, road, and vehicle.
- Display a synthwave loading animation before the hero scene becomes interactive.
- Show a visible scroll indicator that encourages the user to start the sequence.
- Animate the synthwave sun upward using sequential horizontal stripe reveals and settle it in the top-right region of the viewport.
- Reveal small and large stars during the sun animation phase.
- Animate the city skyline upward from below the viewport and settle it across about 90% of viewport width.
- Animate the DeLorean entering from the left while a neon grid road appears beneath it and simulates forward motion.
- Animate a centered hero banner above the car with stacked text for “Brian Cordisco” and “Web Developer.”
- Reveal top navigation only after the hero scene has fully completed and settled.
- Ensure the feature is responsive across modern viewport breakpoints, with simplified behavior on smaller screens if needed.

## Notes

- Primary orchestration should use GSAP with ScrollTrigger because the scene requires pinned, scrubbed, multi-element animation sequencing.
- Framer Motion should remain in use for the loading screen, banner text transitions, and other non-hero component animations elsewhere in the portfolio.
- The sun should be implemented as SVG with GSAP stagger-based stripe animation.
- The starfield should use `@tsparticles/react` with the slim package variant where possible.
- The skyline should be implemented as SVG and animated vertically with GSAP; artwork should be AI-generated and imported via `vite-plugin-svgr`.
- The DeLorean can be implemented using Lottie for easiest visual fidelity, or SVG with independently animated wheel rotation if more direct control is needed.
- The neon road should ideally use Three.js through `@react-three/fiber` and `@react-three/drei` for perspective and movement.
- Responsive logic should not rely on CSS alone; animation values should adapt via a JS breakpoint hook such as `useMediaQuery`.
- Suggested architecture separates timing from implementation: GSAP controls when elements animate, while each child component owns how it animates internally.
- Suggested structure includes `Hero.tsx`, `HeroScene.tsx`, `LoadingScreen.tsx`, `ScrollIndicator.tsx`, and scene components for sun, stars, skyline, DeLorean, road, and banner.

- Implementation tasks:
- Set up hero section container with full viewport height, overflow handling, and initial hidden navigation state.
- Create a loading screen component with timed entry and exit transition before hero interaction begins.
- Add a scroll indicator component that is visible on initial load and fades once scroll-driven animation starts.
- Build a master GSAP ScrollTrigger timeline that pins the hero and scrubs animation progress to scroll position.
- Implement the synthwave sun SVG and animate stripe reveal from bottom to top.
- Integrate starfield rendering and trigger star appearance during the sun phase.
- Build or import skyline SVG and animate it upward into final position.
- Build or import DeLorean asset and animate left-to-center movement with continuous wheel motion.
- Build the neon grid road and animate it to simulate forward motion beneath the vehicle.
- Implement the hero banner with staggered text entrance once vehicle and road are nearly complete.
- Add nav reveal at the end of the timeline and release page pinning so the user can continue through the rest of the site.
- Add breakpoint-based motion adjustments and define a simplified mobile version if full scene performance is too heavy.
- Verify the hero does not block scrolling after completion and that the rest of the portfolio remains fully navigable.

- Acceptance criteria:
- On first load, the user sees a synthwave-themed loading animation before the hero scene interaction begins.
- A visible scroll prompt is present before the main animation sequence starts.
- Scrolling or swiping progresses the hero animation instead of immediately scrolling the page.
- The hero section stays pinned during the sequence and unpins only after the animation is complete.
- The sun reveals in horizontal segments and ends in the top-right area of the viewport.
- Stars appear while the sun sequence is in progress.
- The skyline rises from below the viewport and settles into place across most of the scene width.
- The DeLorean enters from the left and reaches the center while wheel movement continues.
- The neon grid road appears under the car and visibly animates to imply motion.
- The banner text appears centered above the car and displays the required title and subtitle.
- Navigation remains hidden until the hero sequence is complete, then becomes visible.
- After completion, the user can scroll through the remainder of the website normally.
- The experience works across modern viewport sizes, and smaller screens receive an adapted or simplified version rather than a broken layout.
- The scene includes noticeable parallax behavior rather than flat synchronized motion.

## History

- Project setup and boilerplate cleanup.
- Hero refactor concept documented as a scroll-driven synthwave intro with parallax, staged animation, and delayed nav reveal.
- Developer-ready spec expanded with implementation tasks and acceptance criteria.
