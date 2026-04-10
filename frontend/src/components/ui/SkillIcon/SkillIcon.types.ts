import type { IconType } from "react-icons";

export interface SkillIconProps {
	icon: IconType;
	name: string;
	color: string;
	size?: number;
}

export const hexToRgba = (hex: string, alpha: number): string => {
	const r = Number.parseInt(hex.slice(1, 3), 16);
	const g = Number.parseInt(hex.slice(3, 5), 16);
	const b = Number.parseInt(hex.slice(5, 7), 16);
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const prefersReducedMotion = (): boolean => {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const defaultSkillSize = 32;
