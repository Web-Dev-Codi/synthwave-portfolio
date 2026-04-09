import NeonBadge from "../../components/ui/NeonBadge/NeonBadge";
import SectionHeading from "../../components/ui/SectionHeading";
import { proficiencyMeters, skillGroups } from "../../data/skills";
import { cn } from "../../utils/cn";

const accentTextClassMap = {
	amber: "text-(--color-amber)",
	cyan: "text-(--color-cyan)",
	pink: "text-(--color-pink)",
	purple: "text-(--color-purple)",
} as const;

const accentTrackClassMap = {
	cyan: "bg-[rgba(93,202,165,0.72)]",
	pink: "bg-[rgba(212,83,126,0.72)]",
	purple: "bg-[rgba(127,119,221,0.72)]",
} as const;

export const Skills = () => (
	<section className="section-shell" id="skills">
		<div className="section-inner space-y-10">
			<SectionHeading eyebrow="03 — Systems" title="Skills" />

			<div className="grid gap-6 lg:grid-cols-3">
				{skillGroups.map((group) => (
					<article
						key={group.title}
						className={cn(
							"retro-panel neon-card rounded-3xl border p-6",
							group.accent === "cyan" && "accent-cyan",
							group.accent === "pink" && "accent-pink",
							group.accent === "purple" && "accent-purple",
						)}
					>
						<h3
							className={cn(
								"pixel-heading text-sm tracking-[0.24em]",
								accentTextClassMap[group.accent],
							)}
						>
							{group.title}
						</h3>

						<div className="mt-5 flex flex-wrap gap-3">
							{group.items.map((item) => (
								<NeonBadge key={item} accent={group.accent}>
									{item}
								</NeonBadge>
							))}
						</div>
					</article>
				))}
			</div>

			<div className="retro-panel rounded-(--radius-panel) border border-(--color-border-soft) p-6 sm:p-8">
				<div className="grid gap-5">
					{proficiencyMeters.map((meter) => (
						<div
							key={meter.label}
							className="grid gap-2 sm:grid-cols-[8rem_1fr_3rem] sm:items-center"
						>
							<p className="text-sm text-(--color-text-muted)">{meter.label}</p>
							<div className="h-2 overflow-hidden rounded-full bg-[rgba(26,23,64,0.86)]">
								<div
									aria-hidden="true"
									className={cn(
										"h-full rounded-full",
										accentTrackClassMap[meter.accent],
									)}
									style={{ width: `${meter.value}%` }}
								/>
							</div>
							<p
								className={cn(
									"text-right text-sm",
									accentTextClassMap[meter.accent],
								)}
							>
								{meter.value}%
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	</section>
);

export default Skills;
