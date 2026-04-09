import { cn } from "../../../utils/cn";
import type { NeonBadgeProps } from "./NeonBadge.types";

const accentClassMap = {
	amber:
		"border-[rgba(240,153,123,0.5)] bg-[rgba(74,21,40,0.2)] text-[var(--color-amber)]",
	cyan: "border-[rgba(93,202,165,0.5)] bg-[rgba(8,80,65,0.18)] text-[var(--color-cyan)]",
	pink: "border-[rgba(212,83,126,0.5)] bg-[rgba(74,21,40,0.2)] text-[var(--color-pink)]",
	purple:
		"border-[rgba(127,119,221,0.5)] bg-[rgba(38,33,92,0.28)] text-[var(--color-purple)]",
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
