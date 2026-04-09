import SectionHeading from "../../components/ui/SectionHeading";
import { projects } from "../../data/projects";
import ProjectCard from "./ProjectCard";

export const Projects = () => (
	<section className="section-shell" id="projects">
		<div className="section-inner space-y-8">
			<SectionHeading align="left" eyebrow="04 — Proof" title="Projects" />

			<div className="section-panel retro-panel rounded-(--radius-panel) border border-(--color-border-soft) p-6 sm:p-8">
				<div className="grid gap-6 lg:grid-cols-3">
					{projects.map((project) => (
						<ProjectCard key={project.title} {...project} />
					))}
				</div>
			</div>
		</div>
	</section>
);

export default Projects;
