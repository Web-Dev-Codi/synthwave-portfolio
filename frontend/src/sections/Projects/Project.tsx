import SectionHeading from "../../components/ui/SectionHeading";
import { projects } from "../../data/projects";
import ProjectCard from "./ProjectCard";

export const Projects = () => (
	<section className="section-shell" id="projects">
		<div className="section-inner space-y-10">
			<SectionHeading eyebrow="04 — Proof" title="Projects" />

			<div className="grid gap-6 lg:grid-cols-3">
				{projects.map((project) => (
					<ProjectCard key={project.title} {...project} />
				))}
			</div>
		</div>
	</section>
);

export default Projects;
