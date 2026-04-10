import { Mail } from "lucide-react";
import type { ComponentType } from "react";
import { SiGithub } from "react-icons/si";
import { profile } from "../../../data/profile";
import { cn } from "../../../utils/cn";

type AccentColor = "cyan" | "purple";

type SocialConfig = {
	accent: AccentColor;
	icon: ComponentType<{ size?: number }>;
};

const socialConfigMap: Record<string, SocialConfig> = {
	Email: { accent: "cyan", icon: Mail },
	GitHub: { accent: "purple", icon: SiGithub },
};

const accentClassMap: Record<AccentColor, string> = {
	cyan: "border-[rgba(0,208,255,0.6)] text-(--color-cyan) shadow-(--shadow-cyan) hover:border-(--color-cyan) hover:shadow-(--shadow-cyan-hover)",
	purple:
		"border-[rgba(127,119,221,0.6)] text-(--color-purple) shadow-(--shadow-purple) hover:border-(--color-purple) hover:shadow-(--shadow-purple-hover)",
};

type SocialLinksProps = {
	className?: string;
	iconSize?: number;
};

export const SocialLinks = ({ className, iconSize = 18 }: SocialLinksProps) => (
	<div className={cn("flex items-center gap-3", className)}>
		{profile.socialLinks.map((link) => {
			const config = socialConfigMap[link.label];
			if (!config) return null;
			const { accent, icon: Icon } = config;
			return (
				<a
					key={link.label}
					aria-label={link.label}
					className={cn(
						"inline-flex items-center justify-center rounded-xl border bg-[rgba(13,11,30,0.94)] transition duration-200",
						iconSize <= 16 ? "h-8 w-8" : "h-10 w-10",
						accentClassMap[accent],
					)}
					href={link.href}
					rel={
						link.href.startsWith("http") ? "noreferrer" : undefined
					}
					target={link.href.startsWith("http") ? "_blank" : undefined}
				>
					<Icon size={iconSize} />
				</a>
			);
		})}
	</div>
);

export default SocialLinks;
