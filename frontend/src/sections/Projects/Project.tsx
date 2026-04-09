import { motion } from "framer-motion";
import SectionHeading from "../../components/ui/SectionHeading";
import { projects } from "../../data/projects";
import {
	fadeUpVariants,
	scaleUpVariants,
	staggerContainerVariants,
	defaultViewport,
} from "../../utils/animations";
import ProjectCard from "./ProjectCard";

export const Projects = () => (
	<section className="section-shell" id="projects">
		<div className="section-inner space-y-8">
			<SectionHeading align="left" eyebrow="04 — Proof" title="Projects" />

			<motion.div
				className="section-panel retro-panel rounded-(--radius-panel) border border-(--color-border-soft) p-6 sm:p-8"
				initial="hidden"
				whileInView="visible"
				viewport={defaultViewport}
				variants={fadeUpVariants}
			>
				<motion.div
					className="grid gap-6 md:grid-cols-2"
					initial="hidden"
					whileInView="visible"
					viewport={defaultViewport}
					variants={staggerContainerVariants}
				>
					{projects.map((project) => (
						<motion.div key={project.title} variants={scaleUpVariants}>
							<ProjectCard {...project} />
						</motion.div>
					))}
				</motion.div>
			</motion.div>
		</div>
	</section>
);

export default Projects;
