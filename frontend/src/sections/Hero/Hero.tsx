import { useState } from "react";
import { HeroScene } from "./HeroScene";
import { LoadingScreen, ScrollIndicator } from "./index";

export const Hero = () => {
	const [loadingComplete, setLoadingComplete] = useState(false);
	const [showScrollIndicator, setShowScrollIndicator] = useState(false);

	const handleLoadingComplete = () => {
		setLoadingComplete(true);
		setShowScrollIndicator(true);
	};

	const handleSceneComplete = () => {
		setShowScrollIndicator(false);
	};

	return (
		<section className="relative w-full h-screen overflow-hidden" id="hero">
			<LoadingScreen onComplete={handleLoadingComplete} />

			{loadingComplete && <HeroScene onSceneComplete={handleSceneComplete} />}

			{showScrollIndicator && (
				<ScrollIndicator isVisible={showScrollIndicator} />
			)}
		</section>
	);
};

export default Hero;
