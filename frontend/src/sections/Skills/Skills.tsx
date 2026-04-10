import { motion } from "framer-motion";
import { hexToRgba, SkillIcon } from "../../components/ui/SkillIcon";
import { skillCategories } from "../../data/skills";

export const Skills = () => {
	return (
		<section className="section-shell" id="skills">
			<div className="section-inner space-y-8">
				{/* Section heading with pink-to-cyan gradient */}
				<div className="space-y-4">
					<div className="flex items-center gap-4">
						<span className="pixel-heading text-[0.65rem] tracking-[0.34em] text-[var(--color-cyan)]">
							03 — Systems
						</span>
					</div>
					<h2
						className="font-['Press_Start_2P'] text-2xl sm:text-3xl uppercase"
						style={{
							background: "linear-gradient(90deg, #ff2975 0%, #00d0ff 100%)",
							WebkitBackgroundClip: "text",
							backgroundClip: "text",
							color: "transparent",
						}}
					>
						Skills
					</h2>
					{/* Neon pink divider */}
					<div
						className="h-[2px] w-32"
						style={{
							background:
								"linear-gradient(90deg, #ff2975 0%, transparent 100%)",
							boxShadow: "0 0 8px rgba(255, 41, 117, 0.6)",
						}}
					/>
				</div>

				{/* Skills Grid - 4 columns on desktop, 2 on tablet, 1 on mobile */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
				</div>
			</div>
		</section>
	);
};

export default Skills;
