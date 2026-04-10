import type { ComponentType } from "react";
import type { AccentColor } from "../../../types/common";

export type SocialAccentColor = Extract<AccentColor, "cyan" | "purple">;

export type SocialConfig = {
	accent: SocialAccentColor;
	icon: ComponentType<{ size?: number }>;
};

export type SocialLinksProps = {
	className?: string;
	iconSize?: number;
};
