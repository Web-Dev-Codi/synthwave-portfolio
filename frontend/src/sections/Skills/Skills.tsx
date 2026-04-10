import { motion } from "framer-motion";
import SectionHeading from "../../components/ui/SectionHeading";
import SkillIcon from "../../components/ui/SkillIcon/SkillIcon";
import { skillCategories } from "../../data/skills";
import {
	defaultViewport,
	fadeUpVariants,
	staggerContainerVariants,
} from "../../utils/animations";
import { hexToRgba } from "../../utils/colorUtils";

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
						{skillCategories.map((category) => (
							<motion.div
								key={category.id}
								className="rounded-xl p-6"
								style={{
									background: "#100E24",
									border: `1px solid ${hexToRgba(category.color, 0.6)}`,
									boxShadow: `0 0 16px ${hexToRgba(category.color, 0.3)}`,
								}}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5 }}
							>
								{/* Category label */}
								<h3
									className="font-['Press_Start_2P'] text-[9px] tracking-[0.2em] mb-4 uppercase"
									style={{ color: category.color }}
								>
									{category.label}
								</h3>

								{/* Skills flex wrap grid */}
								<div className="flex flex-wrap gap-3 justify-center">
									{category.skills.map((skill) => (
										<SkillIcon
											key={skill.name}
											icon={skill.icon}
											name={skill.name}
											color={skill.color}
											size={skill.size}
										/>
									))}
								</div>
							</motion.div>
						))}
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default Skills;
