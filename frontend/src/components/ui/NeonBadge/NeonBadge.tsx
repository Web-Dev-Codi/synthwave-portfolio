import { cn } from "../../../utils/cn";
import type { NeonBadgeAccent, NeonBadgeProps } from "./NeonBadge.types";

const accentClassMap: Record<NeonBadgeAccent, string> = {
	amber:
		"border-[rgba(240,153,123,0.6)] bg-[rgba(240,153,123,0.12)] text-[var(--color-amber)] shadow-[var(--shadow-amber)]",
	cyan: "border-[rgba(93,202,165,0.6)] bg-[rgba(93,202,165,0.12)] text-[var(--color-cyan)] shadow-[var(--shadow-cyan)]",
	pink: "border-[rgba(212,83,126,0.6)] bg-[rgba(212,83,126,0.12)] text-[var(--color-pink)] shadow-[var(--shadow-pink)]",
	purple:
		"border-[rgba(127,119,221,0.6)] bg-[rgba(127,119,221,0.12)] text-[var(--color-purple)] shadow-[var(--shadow-purple)]",
} as const;

export const NeonBadge = ({
	accent = "purple",
	children,
	className,
}: NeonBadgeProps) => (
	<span
		className={cn(
			"inline-flex items-center rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.18em] font-sans",
			accentClassMap[accent],
			className,
		)}
	>
		{children}
	</span>
);

export default NeonBadge;
