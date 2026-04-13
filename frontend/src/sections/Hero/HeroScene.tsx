import { useEffect, useRef, useState } from "react";
import { CitySkyline } from "./scene/CitySkyline";
import { Delorean } from "./scene/Delorean";
import { GridRoad } from "./scene/GridRoad";
import { HeroBanner } from "./scene/HeroBanner";
import { Starfield } from "./scene/Starfield";
import { SynthSun } from "./scene/SynthSun";

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

	useEffect(() => {
		// Animation sequence using setTimeout for reliability
		const timeouts: ReturnType<typeof setTimeout>[] = [];

		// Sun appears immediately
		timeouts.push(setTimeout(() => setSunComplete(true), 100));

		// Stars appear (0.5s)
		timeouts.push(setTimeout(() => setStarsVisible(true), 500));

		// Skyline emerges (1.5s)
		timeouts.push(setTimeout(() => setSkylineVisible(true), 1500));

		// DeLorean enters (2.5s)
		timeouts.push(setTimeout(() => setDeloreanVisible(true), 2500));

		// Banner reveals (3.5s)
		timeouts.push(
			setTimeout(() => {
				setBannerVisible(true);
			}, 3500),
		);

		// Scene complete (5s) - unlock scroll
		timeouts.push(
			setTimeout(() => {
				setSceneComplete(true);
				onSceneComplete();
			}, 5000),
		);

		// Update progress bar for sun animation
		const progressInterval = setInterval(() => {
			setScrollProgress((prev) => {
				if (prev >= 1) {
					clearInterval(progressInterval);
					return 1;
				}
				return prev + 0.02;
			});
		}, 100);

		return () => {
			timeouts.forEach(clearTimeout);
			clearInterval(progressInterval);
		};
	}, [onSceneComplete]);

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
		</div>
	);
};

export default HeroScene;
