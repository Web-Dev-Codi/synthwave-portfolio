import { useEffect, useRef, useState } from "react";

type UseScrollAnimationOptions = {
	once?: boolean;
	rootMargin?: string;
	threshold?: number | number[];
};

type UseScrollProgressOptions = {
	endOffset?: number;
	startOffset?: number;
};

export const usePrefersReducedMotion = () => {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		const handlePreferenceChange = () => {
			setPrefersReducedMotion(mediaQuery.matches);
		};

		handlePreferenceChange();
		mediaQuery.addEventListener("change", handlePreferenceChange);

		return () => {
			mediaQuery.removeEventListener("change", handlePreferenceChange);
		};
	}, []);

	return prefersReducedMotion;
};

export const useScrollAnimation = <T extends HTMLElement>({
	once = true,
	rootMargin = "0px 0px -12% 0px",
	threshold = 0.25,
}: UseScrollAnimationOptions = {}) => {
	const ref = useRef<T | null>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [hasEntered, setHasEntered] = useState(false);

	useEffect(() => {
		const targetElement = ref.current;

		if (!targetElement) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					setHasEntered(true);

					if (once) {
						observer.unobserve(targetElement);
					}

					return;
				}

				if (!once) {
					setIsVisible(false);
				}
			},
			{ rootMargin, threshold },
		);

		observer.observe(targetElement);

		return () => {
			observer.disconnect();
		};
	}, [once, rootMargin, threshold]);

	return { hasEntered, isVisible, ref };
};

export const useScrollProgress = <T extends HTMLElement>({
	endOffset = 0.9,
	startOffset = 0.15,
}: UseScrollProgressOptions = {}) => {
	const ref = useRef<T | null>(null);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		let animationFrameId = 0;

		const updateProgress = () => {
			const targetElement = ref.current;

			if (!targetElement) {
				return;
			}

			const rect = targetElement.getBoundingClientRect();
			const viewportHeight = window.innerHeight || 1;
			const start = viewportHeight * (1 - startOffset);
			const end = -rect.height * endOffset;
			const totalDistance = Math.max(start - end, 1);
			const nextProgress = Math.min(
				1,
				Math.max(0, (start - rect.top) / totalDistance),
			);

			setProgress((previousProgress) =>
				Math.abs(previousProgress - nextProgress) < 0.001
					? previousProgress
					: nextProgress,
			);
		};

		const handleScrollOrResize = () => {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = window.requestAnimationFrame(updateProgress);
		};

		updateProgress();
		window.addEventListener("scroll", handleScrollOrResize, { passive: true });
		window.addEventListener("resize", handleScrollOrResize);

		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener("scroll", handleScrollOrResize);
			window.removeEventListener("resize", handleScrollOrResize);
		};
	}, [endOffset, startOffset]);

	return { progress, ref };
};
