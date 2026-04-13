import type { MutableRefObject } from "react";

export type HeroPhase = "loading" | "interactive" | "complete";

export interface HeroContextValue {
	phase: HeroPhase;
	setPhase: (phase: HeroPhase) => void;
	progress: number;
	setProgress: (progress: number) => void;
}

export interface SceneComponentProps {
	timelineRef?: MutableRefObject<gsap.core.Timeline | null>;
	progress: number;
}

export interface StarfieldConfig {
	particleCount: number;
	color: string;
	opacity: {
		min: number;
		max: number;
	};
	size: {
		min: number;
		max: number;
	};
	twinkle: {
		enabled: boolean;
		duration: number;
	};
}

export interface SunStripeConfig {
	count: number;
	gap: number;
	colors: {
		top: string;
		bottom: string;
	};
}

export interface DeloreanAnimationConfig {
	entryDuration: number;
	wheelSpinSpeed: number;
	bobAmplitude: number;
	bobFrequency: number;
}

export interface GridRoadConfig {
	gridColor: string;
	speed: number;
	perspective: number;
}
