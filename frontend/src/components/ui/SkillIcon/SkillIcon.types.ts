import type { ReactNode } from "react";

export type SkillIconProps = {
	color: string;
	icon: ReactNode;
	name: string;
	size?: number;
};

export const prefersReducedMotion = (): boolean => {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const defaultSkillSize = 64;
