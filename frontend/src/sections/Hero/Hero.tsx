import { useCallback, useState } from "react";
import { useHeroAnimation } from "../../hooks/useHeroAnimation";
import { LoadingScreen } from "./LoadingScreen";
import { ScrollIndicator } from "./ScrollIndicator";
import type { HeroPhase } from "./types";

interface HeroProps {
	onComplete?: () => void;
}

export const Hero = ({ onComplete }: HeroProps) => {
	const [phase, setPhase] = useState<HeroPhase>("loading");
	const [showScrollIndicator, setShowScrollIndicator] = useState(false);
	const [, setProgress] = useState(0);

	const handleLoadingComplete = useCallback(() => {
		setPhase("interactive");
		setShowScrollIndicator(true);
	}, []);

	const handleScrollIndicatorHide = useCallback(() => {
		setShowScrollIndicator(false);
	}, []);

	const handleHeroComplete = useCallback(() => {
		onComplete?.();
	}, [onComplete]);

	const { containerRef } = useHeroAnimation({
		phase,
		setPhase,
		setProgress,
		onComplete: handleHeroComplete,
	});

	return (
		<>
			<LoadingScreen
				onComplete={handleLoadingComplete}
				isComplete={phase !== "loading"}
			/>

			<ScrollIndicator
				isVisible={showScrollIndicator}
				onHide={handleScrollIndicatorHide}
			/>

			<section
				ref={containerRef}
				className="relative h-screen w-full overflow-hidden bg-[#0D0B1E]"
				id="hero"
			>
				{phase !== "loading" && (
					<div className="relative h-full w-full">
						<div className="absolute inset-0 flex items-center justify-center text-[#5DCAA5]">
							<p className="pixel-heading text-sm">Hero Scene Placeholder</p>
						</div>
					</div>
				)}
			</section>
		</>
	);
};

export default Hero;
