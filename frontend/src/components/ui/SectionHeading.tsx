import GlitchText from "./GlitchText/GlitchText";

type SectionHeadingProps = {
  align?: "center" | "left";
  eyebrow: string;
  title: string;
};

const alignmentClassMap = {
  center: "items-center text-center",
  left: "items-start text-left",
} as const;

export const SectionHeading = ({ align = "center", eyebrow, title }: SectionHeadingProps) => (
  <div className={`flex flex-col gap-4 ${alignmentClassMap[align]}`}>
    <p className="section-eyebrow">{eyebrow}</p>
    <GlitchText as="h2" className="text-2xl sm:text-3xl" tone="chrome">
      {title}
    </GlitchText>
    <div className="section-divider" />
  </div>
);

export default SectionHeading;
