import {
	SiAnthropic,
	SiCss,
	SiDocker,
	SiExpress,
	SiFigma,
	SiFineco,
	SiGit,
	SiGnubash,
	SiHtml5,
	SiJavascript,
	SiLinux,
	SiMongodb,
	SiNeovim,
	SiNodedotjs,
	SiOllama,
	SiOpenai,
	SiOpenapiinitiative,
	SiPostgresql,
	SiPython,
	SiReact,
	SiTailwindcss,
	SiTypescript,
} from "react-icons/si";
import type { SkillCategory } from "../../../shared/types/skill.types";

export const skillCategories: SkillCategory[] = [
	{
		id: "frontend",
		label: "Frontend",
		color: "#00d0ff",
		skills: [
			{ icon: SiReact, name: "React", color: "#00d0ff", size: 32 },
			{ icon: SiTypescript, name: "TypeScript", color: "#00d0ff", size: 32 },
			{ icon: SiJavascript, name: "JavaScript", color: "#00d0ff", size: 32 },
			{ icon: SiTailwindcss, name: "Tailwind", color: "#00d0ff", size: 32 },
			{ icon: SiHtml5, name: "HTML", color: "#00d0ff", size: 32 },
			{ icon: SiCss, name: "CSS", color: "#00d0ff", size: 32 },
		],
	},
	{
		id: "backend",
		label: "Backend",
		color: "#ff2975",
		skills: [
			{ icon: SiNodedotjs, name: "Node.js", color: "#ff2975", size: 32 },
			{ icon: SiExpress, name: "Express", color: "#ff2975", size: 32 },
			{ icon: SiPython, name: "Python", color: "#ff2975", size: 32 },
			{ icon: SiPostgresql, name: "PostgreSQL", color: "#ff2975", size: 32 },
			{ icon: SiMongodb, name: "MongoDB", color: "#ff2975", size: 32 },
			{
				icon: SiOpenapiinitiative,
				name: "REST APIs",
				color: "#ff2975",
				size: 32,
			},
		],
	},
	{
		id: "tools",
		label: "Tools & DevOps",
		color: "#8c1eff",
		skills: [
			{ icon: SiGit, name: "Git", color: "#8c1eff", size: 32 },
			{ icon: SiDocker, name: "Docker", color: "#8c1eff", size: 32 },
			{ icon: SiLinux, name: "Linux", color: "#8c1eff", size: 32 },
			{ icon: SiNeovim, name: "Neovim", color: "#8c1eff", size: 32 },
			{ icon: SiGnubash, name: "Bash", color: "#8c1eff", size: 32 },
			{ icon: SiFigma, name: "Figma", color: "#8c1eff", size: 32 },
		],
	},
	{
		id: "ai",
		label: "AI/ML",
		color: "#ff901f",
		skills: [
			{ icon: SiOllama, name: "Ollama", color: "#ff901f", size: 32 },
			{ icon: SiOpenai, name: "LLM Integration", color: "#ff901f", size: 32 },
			{ icon: SiAnthropic, name: "AI Agents", color: "#ff901f", size: 32 },
			{ icon: SiFineco	, name: "Vector DBs", color: "#ff901f", size: 32 },
		],
	},
];

export default skillCategories;
