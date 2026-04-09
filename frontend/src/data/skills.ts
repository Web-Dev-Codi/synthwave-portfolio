export const skillGroups = [
	{
		accent: "cyan",
		items: [
			"React",
			"Next.js",
			"TypeScript",
			"JavaScript",
			"Tailwind CSS",
			"HTML",
			"CSS",
		],
		title: "Frontend",
	},
	{
		accent: "pink",
		items: [
			"Node.js",
			"Express",
			"Python",
			"PostgreSQL",
			"MongoDB",
			"REST APIs",
		],
		title: "Backend",
	},
	{
		accent: "purple",
		items: ["Git", "Docker", "Linux", "Neovim", "Bash", "Figma", "Agile"],
		title: "Tools & DevOps",
	},
	{
		accent: "amber",
		items: ["Ollama", "LLM Integration", "AI Agents", "Vector DBs"],
		title: "AI/ML",
	},
] as const;

// Proficiency meters removed as per requirements
