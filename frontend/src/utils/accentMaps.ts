import type { AccentColor } from "../types/common";

export const accentClassMap: Record<AccentColor, string> = {
	amber:
		"border-[rgba(240,153,123,0.6)] text-[var(--color-amber)] shadow-[var(--shadow-amber)] hover:border-[var(--color-amber)] hover:text-[var(--color-amber)] hover:bg-[rgba(240,153,123,0.1)]",
	cyan: "border-[rgba(93,202,165,0.6)] text-[var(--color-cyan)] shadow-[var(--shadow-cyan)] hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)] hover:bg-[rgba(93,202,165,0.1)]",
	pink: "border-[rgba(212,83,126,0.6)] text-[var(--color-pink)] shadow-[var(--shadow-pink)] hover:border-[var(--color-pink)] hover:text-[var(--color-pink)] hover:bg-[rgba(212,83,126,0.1)] hover:shadow-[var(--shadow-pink-hover)]",
	purple:
		"border-[rgba(127,119,221,0.6)] text-[var(--color-purple)] shadow-[var(--shadow-purple)] hover:border-[var(--color-purple)] hover:text-[var(--color-purple)] hover:bg-[rgba(127,119,221,0.1)]",
} as const;

export const accentTextClassMap: Record<AccentColor, string> = {
	amber: "text-(--color-amber)",
	cyan: "text-(--color-cyan)",
	pink: "text-(--color-pink)",
	purple: "text-(--color-purple)",
} as const;

export const accentDotClassMap: Record<AccentColor, string> = {
	amber: "bg-[var(--color-amber)] shadow-[var(--shadow-amber)]",
	cyan: "bg-[var(--color-cyan)] shadow-[var(--shadow-cyan)]",
	pink: "bg-[var(--color-pink)] shadow-[var(--shadow-pink)]",
	purple: "bg-[var(--color-purple)] shadow-[var(--shadow-purple)]",
} as const;

export const accentNodePulseClassMap: Record<AccentColor, string> = {
	amber: "timeline-node-pulse-amber",
	cyan: "timeline-node-pulse-cyan",
	pink: "timeline-node-pulse-pink",
	purple: "timeline-node-pulse-purple",
} as const;

export const accentBorderClassMap: Record<AccentColor, string> = {
	amber:
		"accent-amber border-[rgba(240,153,123,0.5)] bg-[rgba(74,21,40,0.2)] text-[var(--color-amber)]",
	cyan: "accent-cyan border-[rgba(93,202,165,0.5)] bg-[rgba(8,80,65,0.18)] text-[var(--color-cyan)]",
	pink: "accent-pink border-[rgba(212,83,126,0.5)] bg-[rgba(74,21,40,0.2)] text-[var(--color-pink)]",
	purple:
		"accent-purple border-[rgba(127,119,221,0.5)] bg-[rgba(38,33,92,0.28)] text-[var(--color-purple)]",
} as const;
