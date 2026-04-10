import { cn } from "../../../utils/cn";
import type { GlitchTextProps } from "./GlitchText.types";

const toneClassMap = {
	chrome: "chrome-text",
	cyan: "neon-text-cyan",
	pink: "neon-text-pink",
	purple: "neon-text-purple",
	amber: "neon-text-amber",
} as const;

export const GlitchText = ({
	as: Component = "span",
	children,
	className,
	isActive = false,
	tone = "chrome",
}: GlitchTextProps) => (
	<Component
		className={cn(
			"glitch-text relative inline-flex pixel-heading",
			isActive && "glitch-text-active",
			className,
		)}
		data-glitch-active={isActive ? "true" : "false"}
	>
		<span
			aria-hidden="true"
			className="glitch-layer glitch-layer-pink pointer-events-none absolute inset-0 text-[rgba(212,83,126,0.28)] blur-[0.5px]"
		>
			{children}
		</span>
		<span
			aria-hidden="true"
			className="glitch-layer glitch-layer-cyan pointer-events-none absolute inset-0 text-[rgba(93,202,165,0.25)] blur-[0.5px]"
		>
			{children}
		</span>
		<span
			className={cn("glitch-layer-foreground relative", toneClassMap[tone])}
		>
			{children}
		</span>
	</Component>
);

export default GlitchText;
