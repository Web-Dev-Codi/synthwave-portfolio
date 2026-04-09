import { motion } from "framer-motion";
import NeonBadge from "../../components/ui/NeonBadge/NeonBadge";
import SectionHeading from "../../components/ui/SectionHeading";
import { skillGroups } from "../../data/skills";
import { cn } from "../../utils/cn";
import {
	fadeUpVariants,
	scaleUpVariants,
	staggerContainerVariants,
	defaultViewport,
	cardHoverAnimation,
	badgeHoverAnimation,
} from "../../utils/animations";

const accentTextClassMap = {
	amber: "text-(--color-amber)",
	cyan: "text-(--color-cyan)",
	pink: "text-(--color-pink)",
	purple: "text-(--color-purple)",
} as const;

export const Skills = () => {
	return (
		<section className="section-shell" id="skills">
			<div className="section-inner space-y-8">
				<SectionHeading align="left" eyebrow="03 — Systems" title="Skills" />

				<motion.div
					className="section-panel retro-panel rounded-(--radius-panel) border border-(--color-border-soft) p-6 sm:p-8"
					initial="hidden"
					whileInView="visible"
					viewport={defaultViewport}
					variants={fadeUpVariants}
				>
					<motion.div
						className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
						initial="hidden"
						whileInView="visible"
						viewport={defaultViewport}
						variants={staggerContainerVariants}
					>
						{skillGroups.map((group) => (
							<motion.article
								key={group.title}
								className={cn(
									"retro-panel neon-card rounded-3xl border p-6",
									group.accent === "amber" && "accent-amber",
									group.accent === "cyan" && "accent-cyan",
									group.accent === "pink" && "accent-pink",
									group.accent === "purple" && "accent-purple",
								)}
								variants={scaleUpVariants}
								whileHover={cardHoverAnimation}
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
										<motion.div key={item} whileHover={badgeHoverAnimation}>
											<NeonBadge accent={group.accent}>{item}</NeonBadge>
										</motion.div>
									))}
								</div>
							</motion.article>
						))}
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default Skills;
