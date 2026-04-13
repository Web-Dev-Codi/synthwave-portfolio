import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SynthSun } from "./scene/SynthSun";
import { Starfield } from "./scene/Starfield";
import { CitySkyline } from "./scene/CitySkyline";
import { Delorean } from "./scene/Delorean";
import { GridRoad } from "./scene/GridRoad";
import { HeroBanner } from "./scene/HeroBanner";

gsap.registerPlugin(ScrollTrigger);

interface HeroSceneProps {
	isActive: boolean;
	onComplete?: () => void;
}

export const HeroScene = ({ isActive, onComplete }: HeroSceneProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const timelineRef = useRef<gsap.core.Timeline | null>(null);
	const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

	useLayoutEffect(() => {
		if (!isActive || !containerRef.current) return;

		// Create master timeline
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: containerRef.current,
				start: "top top",
				end: "+=400%",
				pin: true,
				scrub: 1.5,
				onLeave: () => {
					onComplete?.();
				},
			},
		});

		timelineRef.current = tl;
		scrollTriggerRef.current = tl.scrollTrigger as ScrollTrigger;

		return () => {
			if (scrollTriggerRef.current) {
				scrollTriggerRef.current.kill();
			}
			if (timelineRef.current) {
				timelineRef.current.kill();
			}
		};
	}, [isActive, onComplete]);

	if (!isActive) {
		return null;
	}

	return (
		<div
			ref={containerRef}
			className="relative h-screen w-full overflow-hidden bg-[#0D0B1E]"
		>
			{/* Background layer - Stars */}
			<Starfield isActive={isActive} />

			{/* Grid Road layer */}
			<GridRoad timelineRef={timelineRef} />

			{/* Sun layer */}
			<SynthSun timelineRef={timelineRef} />

			{/* City Skyline layer */}
			<CitySkyline timelineRef={timelineRef} />

			{/* DeLorean layer */}
			<Delorean timelineRef={timelineRef} />

			{/* Banner layer */}
			<HeroBanner timelineRef={timelineRef} />
		</div>
	);
};

export default HeroScene;
