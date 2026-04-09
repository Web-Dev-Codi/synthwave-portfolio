import { cn } from "../../../utils/cn";
import type { GlitchTextProps } from "./GlitchText.types";

const toneClassMap = {
	chrome: "chrome-text",
	cyan: "neon-text-cyan",
	pink: "neon-text-pink",
	purple: "neon-text-purple",
} as const;

export const GlitchText = ({
	as: Component = "span",
	children,
	className,
	tone = "chrome",
}: GlitchTextProps) => (
	<Component
		className={cn(
			"relative inline-flex pixel-heading",
			toneClassMap[tone],
			className,
		)}
	>
		<span
			aria-hidden="true"
			className="pointer-events-none absolute inset-0 translate-x-px text-[rgba(212,83,126,0.28)] blur-[0.5px]"
		>
			{children}
		</span>
		<span
			aria-hidden="true"
			className="pointer-events-none absolute inset-0 -translate-x-px text-[rgba(93,202,165,0.25)] blur-[0.5px]"
		>
			{children}
		</span>
		<span className="relative">{children}</span>
	</Component>
);

export default GlitchText;
