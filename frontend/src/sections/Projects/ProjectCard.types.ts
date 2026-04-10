import type { AccentColor } from "../../types/common";

export type ProjectCardProps = {
	accent: AccentColor;
	description: string;
	githubUrl: string;
	liveUrl: string;
	stack: readonly string[];
	title: string;
};
