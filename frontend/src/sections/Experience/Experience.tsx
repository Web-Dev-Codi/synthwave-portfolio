import { motion } from "framer-motion";
import SectionHeading from "../../components/ui/SectionHeading";
import { experiences } from "../../data/experience";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import {
	accentClassMap,
	accentDotClassMap,
	accentNodePulseClassMap,
} from "../../utils/accentMaps";
import {
	cardHoverAnimation,
	defaultViewport,
	fadeUpVariants,
	slideInLeftVariants,
	slideInRightVariants,
	staggerContainerVariants,
} from "../../utils/animations";
import { cn } from "../../utils/cn";

export const Experience = () => {
	const { ref: timelineRef, isVisible: timelineVisible } =
		useScrollAnimation<HTMLDivElement>({ threshold: 0.08 });

	return (
		<section className="section-shell" id="experience">
			<div className="section-inner space-y-8">
				<SectionHeading
					align="left"
					eyebrow="05 — Timeline"
					title="Experience"
				/>

				<motion.div
					className="section-panel retro-panel rounded-(--radius-panel) border border-(--color-border-soft) p-6 sm:p-8"
					initial="hidden"
					whileInView="visible"
					viewport={defaultViewport}
					variants={fadeUpVariants}
				>
					<motion.div
						ref={timelineRef}
						className="relative grid gap-6 md:gap-8"
						initial="hidden"
						variants={staggerContainerVariants}
						viewport={defaultViewport}
						whileInView="visible"
					>
						<span
							aria-hidden="true"
							className={cn(
								"timeline-track",
								timelineVisible && "timeline-track-visible",
							)}
						/>

						{experiences.map((experience, index) => (
							<motion.article
								key={`${experience.company}-${experience.period}`}
								className={cn(
									"retro-panel neon-card relative ml-10 rounded-3xl border p-6 md:ml-0 md:w-[calc(50%-2rem)]",
									accentClassMap[experience.accent],
									index % 2 === 0 ? "md:mr-auto" : "md:ml-auto",
								)}
								variants={
									index % 2 === 0 ? slideInLeftVariants : slideInRightVariants
								}
								whileHover={cardHoverAnimation}
							>
								<span
									aria-hidden="true"
									className={cn(
										"absolute -left-[2.6rem] top-8 h-4 w-4 rounded-full border-2 border-[rgba(255,255,255,0.3)] md:left-auto",
										accentDotClassMap[experience.accent],
										accentNodePulseClassMap[experience.accent],
										index % 2 === 0
											? "md:-right-[2.6rem]"
											: "md:-left-[2.6rem] md:right-auto",
									)}
								/>

								<p className="pixel-heading text-[0.62rem] tracking-[0.26em] text-(--color-text-dim)">
									{experience.period}
								</p>
								<h3 className="mt-4 text-xl neon-text-cyan">
									{experience.role}
								</h3>
								<p className="pixel-heading mt-1 chrome-text text-[0.58rem] tracking-[0.18em]">
									{experience.company}
								</p>

								<ul className="mt-5 space-y-3 text-sm leading-7 text-(--color-text-muted)">
									{experience.highlights.map((highlight) => (
										<li key={highlight} className="flex gap-3">
											<span
												aria-hidden="true"
												className="mt-2 h-1.5 w-1.5 rounded-full bg-(--color-cyan)"
											/>
											<span>{highlight}</span>
										</li>
									))}
								</ul>
							</motion.article>
						))}
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default Experience;
