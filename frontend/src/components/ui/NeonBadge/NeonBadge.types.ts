import type { ReactNode } from "react";

export type NeonBadgeAccent = "amber" | "cyan" | "pink" | "purple";

export type NeonBadgeProps = {
	accent?: NeonBadgeAccent;
	children: ReactNode;
	className?: string;
};
