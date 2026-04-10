import type { ElementType, ReactNode } from "react";
import type { AccentColor } from "../../../types/common";

export type GlitchTone = "chrome" | AccentColor;

export type GlitchTextProps = {
	as?: ElementType;
	children: ReactNode;
	className?: string;
	isActive?: boolean;
	tone?: GlitchTone;
};
