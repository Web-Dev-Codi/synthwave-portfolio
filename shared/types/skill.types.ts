export type IconComponent = (props: { size?: number }) => any;

export interface Skill {
	icon: IconComponent;
	name: string;
	color: string;
	size?: number;
}

export interface SkillCategory {
	id: string;
	label: string;
	color: string;
	skills: Skill[];
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
export const headingGradient =
	"linear-gradient(90deg, #ff2975 0%, #00d0ff 100%)";

export const skillCategoryColors: Record<string, string> = {
	frontend: "#00d0ff",
	backend: "#ff2975",
	tools: "#8c1eff",
	ai: "#ff901f",
};
