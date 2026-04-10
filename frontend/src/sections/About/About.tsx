import { motion } from "framer-motion";
import SectionHeading from "../../components/ui/SectionHeading";
import SynthwaveAvatar from "../../components/ui/SynthwaveAvatar/SynthwaveAvatar";
import { profile } from "../../data/profile";
import {
	accentBorderClassMap as accentClassMap,
	accentTextClassMap,
} from "../../utils/accentMaps";
import {
	defaultViewport,
	fadeUpVariants,
	scaleUpVariants,
	staggerContainerVariants,
} from "../../utils/animations";
import { cn } from "../../utils/cn";

export const About = () => (
	<section className="section-shell" id="about">
		<div className="section-inner space-y-8">
			<SectionHeading align="left" eyebrow="02 — Identity" title="About Me" />

			<motion.div
				className="section-panel retro-panel rounded-(--radius-panel) border border-(--color-border-soft) p-6 sm:p-8"
				initial="hidden"
				whileInView="visible"
				viewport={defaultViewport}
				variants={fadeUpVariants}
			>
				<div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
					<motion.div
						className="retro-panel neon-card floating-panel inner-grid-texture rounded-(--radius-panel) border border-(--color-border-soft) p-6 sm:p-8"
						initial="hidden"
						whileInView="visible"
						viewport={defaultViewport}
						variants={scaleUpVariants}
					>
						<SynthwaveAvatar />
					</motion.div>

					<div className="space-y-8">
						<motion.div
							className="space-y-4 text-base leading-8 text-(--color-text-muted)"
							initial="hidden"
							whileInView="visible"
							viewport={defaultViewport}
							variants={fadeUpVariants}
						>
							{profile.summary.map((paragraph) => (
								<p key={paragraph}>{paragraph}</p>
							))}
						</motion.div>

						<motion.div
							className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
							initial="hidden"
							whileInView="visible"
							viewport={defaultViewport}
							variants={staggerContainerVariants}
						>
							{profile.stats.map((stat) => (
								<motion.article
									key={stat.label}
									className={cn(
										"retro-panel neon-card rounded-3xl border p-5 text-left",
										accentClassMap[stat.accent],
									)}
									variants={scaleUpVariants}
								>
									<p
										className={cn(
											"pixel-heading text-sm",
											accentTextClassMap[stat.accent],
										)}
									>
										{stat.value}
									</p>
									<p className="mt-3 text-sm uppercase tracking-[0.22em] text-(--color-text-dim)">
										{stat.label}
									</p>
								</motion.article>
							))}
						</motion.div>
					</div>
				</div>
			</motion.div>
		</div>
	</section>
);

export default About;
