import { useCallback, useState } from "react";
import { HeroScene } from "./HeroScene";
import { LoadingScreen } from "./LoadingScreen";
import { ScrollIndicator } from "./ScrollIndicator";
import type { HeroPhase } from "./types";

interface HeroProps {
	onComplete?: () => void;
}

export const Hero = ({ onComplete }: HeroProps) => {
	const [phase, setPhase] = useState<HeroPhase>("loading");
	const [showScrollIndicator, setShowScrollIndicator] = useState(false);

	const handleLoadingComplete = useCallback(() => {
		setPhase("interactive");
		setShowScrollIndicator(true);
	}, []);

	const handleScrollIndicatorHide = useCallback(() => {
		setShowScrollIndicator(false);
	}, []);

	const handleHeroComplete = useCallback(() => {
		setPhase("complete");
		onComplete?.();
	}, [onComplete]);

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

			<HeroScene
				isActive={phase !== "loading"}
				onComplete={handleHeroComplete}
			/>
		</>
	);
};

export default Hero;
