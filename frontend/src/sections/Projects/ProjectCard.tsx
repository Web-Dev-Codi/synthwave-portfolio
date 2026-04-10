import { motion } from "framer-motion";
import Button from "../../components/ui/Button/Button";
import NeonBadge from "../../components/ui/NeonBadge/NeonBadge";
import ProjectPlaceholder from "../../components/ui/ProjectPlaceholder";
import { cardHoverAnimation } from "../../utils/animations";
import { cn } from "../../utils/cn";
import { getTechColor } from "../../utils/techColors";

type ProjectCardProps = {
	accent: "amber" | "cyan" | "pink" | "purple";
	description: string;
	githubUrl: string;
	liveUrl: string;
	stack: readonly string[];
	title: string;
};

const accentClassMap = {
	amber: "accent-amber",
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
	<motion.article
		className={cn(
			"retro-panel neon-card flex h-full flex-col rounded-3xl border p-5 sm:p-6",
			accentClassMap[accent],
		)}
		whileHover={cardHoverAnimation}
	>
		<div className="mb-6 overflow-hidden rounded-2xl">
			<ProjectPlaceholder accent={accent} />
		</div>

		<div className="flex flex-1 flex-col gap-5 inner-grid-texture-subtle rounded-b-3xl px-1">
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
					<NeonBadge key={item} accent={getTechColor(item, accent)}>
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
	</motion.article>
);

export default ProjectCard;
