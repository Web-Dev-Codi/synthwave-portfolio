import Button from "../../components/ui/Button/Button";
import NeonBadge from "../../components/ui/NeonBadge/NeonBadge";
import { cn } from "../../utils/cn";

type ProjectCardProps = {
	accent: "cyan" | "pink" | "purple";
	description: string;
	githubUrl: string;
	liveUrl: string;
	stack: readonly string[];
	title: string;
};

const accentClassMap = {
	cyan: "accent-cyan",
	pink: "accent-pink",
	purple: "accent-purple",
} as const;

export const ProjectCard = ({
	accent,
	description,
	githubUrl,
	liveUrl,
	stack,
	title,
}: ProjectCardProps) => (
	<article
		className={cn(
			"retro-panel neon-card flex h-full flex-col rounded-3xl border p-5 sm:p-6",
			accentClassMap[accent],
		)}
	>
		<div className="mb-6 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[linear-gradient(135deg,rgba(19,15,38,0.92),rgba(26,23,64,0.72))] p-6">
			<div className="flex aspect-[16/9] items-center justify-center rounded-xl border border-dashed border-[rgba(255,255,255,0.14)] bg-[rgba(8,7,18,0.4)] text-center">
				<span className="pixel-heading text-[0.7rem] tracking-[0.24em] text-(--color-text-dim)">
					Feature Preview
				</span>
			</div>
		</div>

		<div className="flex flex-1 flex-col gap-5">
			<div>
				<h3 className="pixel-heading chrome-text text-sm leading-7 sm:text-base">
					{title}
				</h3>
				<div className="section-divider mt-3" />
			</div>

			<p className="flex-1 text-sm leading-7 text-(--color-text-muted)">
				{description}
			</p>

			<div className="flex flex-wrap gap-3">
				{stack.map((item) => (
					<NeonBadge key={item} accent={accent}>
						{item}
					</NeonBadge>
				))}
			</div>

			<div className="mt-auto flex flex-col gap-3 sm:flex-row">
				<Button
					accent="cyan"
					aria-label={`Open live demo for ${title}`}
					href={liveUrl}
					size="sm"
				>
					Live Demo
				</Button>
				<Button
					accent="purple"
					aria-label={`Open GitHub repository for ${title}`}
					href={githubUrl}
					size="sm"
					target="_blank"
				>
					GitHub
				</Button>
			</div>
		</div>
	</article>
);

export default ProjectCard;
