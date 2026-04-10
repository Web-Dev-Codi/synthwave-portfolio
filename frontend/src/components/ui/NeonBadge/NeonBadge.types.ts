import type { ReactNode } from "react";

import type { AccentColor } from "../../../types/common";

export type NeonBadgeAccent = AccentColor;

export type NeonBadgeProps = {
	accent: NeonBadgeAccent;
	children: ReactNode;
	className?: string;
};
