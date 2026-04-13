import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { CitySkyline } from "./scene/CitySkyline";
import { Delorean } from "./scene/Delorean";
import { GridRoad } from "./scene/GridRoad";
import { HeroBanner } from "./scene/HeroBanner";
import { Starfield } from "./scene/Starfield";
import { SynthSun } from "./scene/SynthSun";

gsap.registerPlugin(ScrollTrigger);

export const HeroScene = ({
	onSceneComplete,
}: {
	onSceneComplete: () => void;
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [sunComplete, setSunComplete] = useState(false);
	const [starsVisible, setStarsVisible] = useState(false);
	const [skylineVisible, setSkylineVisible] = useState(false);
	const [deloreanVisible, setDeloreanVisible] = useState(false);
	const [bannerVisible, setBannerVisible] = useState(false);
	const [sceneComplete, setSceneComplete] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);

	useGSAP(
		() => {
			if (!containerRef.current) return;

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top top",
					end: "+=3000",
					scrub: 1,
					pin: true,
					anticipatePin: 1,
					onUpdate: (self) => {
						setScrollProgress(self.progress);
						if (self.progress >= 0.95 && !sceneComplete) {
							setSceneComplete(true);
							onSceneComplete();
						}
					},
				},
			});

			// Sun animation (0-20% of timeline)
			tl.call(() => setSunComplete(true), [], 0.2);

			// Stars appear (15-35%)
			tl.call(() => setStarsVisible(true), [], 0.15);

			// Skyline emerges (30-50%)
			tl.call(() => setSkylineVisible(true), [], 0.3);

			// DeLorean enters (45-65%)
			tl.call(() => setDeloreanVisible(true), [], 0.45);

			// Banner reveals (60-80%)
			tl.call(() => setBannerVisible(true), [], 0.6);

			return () => {
				tl.kill();
				ScrollTrigger.getAll().forEach((trigger) => {
					trigger.kill();
				});
			};
		},
		{ scope: containerRef },
	);

	return (
		<div
			ref={containerRef}
			className="relative w-full h-screen overflow-hidden bg-slate-950"
		>
			{/* Starfield background */}
			<Starfield
				isVisible={
					starsVisible || skylineVisible || deloreanVisible || bannerVisible
				}
			/>

			{/* Sun in top right */}
			{(sunComplete ||
				starsVisible ||
				skylineVisible ||
				deloreanVisible ||
				bannerVisible) && <SynthSun scrollProgress={scrollProgress} />}

			{/* City skyline */}
			{(skylineVisible || deloreanVisible || bannerVisible) && (
				<CitySkyline
					scrollProgress={scrollProgress}
					isVisible={skylineVisible}
				/>
			)}

			{/* Grid road */}
			{(deloreanVisible || bannerVisible) && (
				<GridRoad scrollProgress={scrollProgress} isVisible={deloreanVisible} />
			)}

			{/* DeLorean */}
			{(deloreanVisible || bannerVisible) && (
				<Delorean scrollProgress={scrollProgress} isVisible={deloreanVisible} />
			)}

			{/* Banner text */}
			{bannerVisible && <HeroBanner isVisible={bannerVisible} />}

			{/* Mobile simplification note: On mobile, some elements may be hidden via CSS */}
		</div>
	);
};

export default HeroScene;
