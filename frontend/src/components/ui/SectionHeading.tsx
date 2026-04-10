import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { cn } from "../../utils/cn";
import GlitchText from "./GlitchText/GlitchText";
import type { SectionHeadingProps } from "./SectionHeading.types";

const alignmentClassMap = {
	center: "items-center text-center",
	left: "items-start text-left",
} as const;

export const SectionHeading = ({
	align = "center",
	eyebrow,
	className,
	title,
}: SectionHeadingProps) => {
	const { hasEntered, ref } = useScrollAnimation<HTMLDivElement>({
		rootMargin: "0px 0px -10% 0px",
		threshold: 0.2,
	});

	return (
		<div
			ref={ref}
			className={cn(
				"section-heading flex flex-col gap-4",
				alignmentClassMap[align],
				hasEntered && "section-heading-visible",
				className,
			)}
		>
			<p className="section-eyebrow">{eyebrow}</p>
			<GlitchText
				as="h2"
				className="section-heading-title text-2xl sm:text-3xl"
				isActive={hasEntered}
				tone="chrome"
			>
				{title}
			</GlitchText>
			<div className="section-divider" />
		</div>
	);
};

export default SectionHeading;
