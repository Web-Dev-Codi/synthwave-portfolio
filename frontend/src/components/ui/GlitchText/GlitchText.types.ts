import type { ElementType } from "react";

export type GlitchTone = "chrome" | "cyan" | "pink" | "purple";

export type GlitchTextProps = {
	as?: ElementType;
	children: string;
	className?: string;
	isActive?: boolean;
	tone?: GlitchTone;
};
