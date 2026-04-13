import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef } from "react";
import type { HeroPhase } from "../sections/Hero/types";

gsap.registerPlugin(ScrollTrigger);

interface UseHeroAnimationProps {
	phase: HeroPhase;
	setPhase: (phase: HeroPhase) => void;
	setProgress: (progress: number) => void;
	onComplete?: () => void;
}

interface UseHeroAnimationReturn {
	containerRef: React.RefObject<HTMLDivElement | null>;
	timelineRef: React.RefObject<gsap.core.Timeline | null>;
	cleanup: () => void;
}

export const useHeroAnimation = ({
	phase,
	setPhase,
	setProgress,
	onComplete,
}: UseHeroAnimationProps): UseHeroAnimationReturn => {
	const containerRef = useRef<HTMLDivElement>(null);
	const timelineRef = useRef<gsap.core.Timeline | null>(null);
	const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

	const cleanup = useCallback(() => {
		if (timelineRef.current) {
			timelineRef.current.kill();
			timelineRef.current = null;
		}
		if (scrollTriggerRef.current) {
			scrollTriggerRef.current.kill();
			scrollTriggerRef.current = null;
		}
	}, []);

	useEffect(() => {
		if (phase !== "interactive" || !containerRef.current) {
			return;
		}

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top top",
					end: "+=300%",
					pin: true,
					scrub: 1,
					onUpdate: (self) => {
						setProgress(self.progress);
					},
					onScrubComplete: () => {
						setPhase("complete");
						onComplete?.();
					},
				},
			});

			timelineRef.current = tl;
			scrollTriggerRef.current = tl.scrollTrigger as ScrollTrigger;
		}, containerRef);

		return () => {
			ctx.revert();
		};
	}, [phase, setPhase, setProgress, onComplete]);

	return { containerRef, timelineRef, cleanup };
};

export default useHeroAnimation;
