import type { ElementType } from "react";
import type { AccentColor } from "../../../types/common";

export type GlitchTone = "chrome" | AccentColor;

export type GlitchTextProps = {
	as?: ElementType;
	children: string;
	className?: string;
	isActive?: boolean;
	tone?: GlitchTone;
};
