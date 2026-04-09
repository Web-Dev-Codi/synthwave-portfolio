export const skillGroups = [
	{
		accent: "cyan",
		items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
		title: "Frontend",
	},
	{
		accent: "pink",
		items: ["Node.js", "Express", "Python", "PostgreSQL"],
		title: "Backend",
	},
	{
		accent: "purple",
		items: ["Git", "Docker", "Linux", "Figma"],
		title: "Tools",
	},
] as const;

export const proficiencyMeters = [
	{ accent: "cyan", label: "React", value: 90 },
	{ accent: "pink", label: "Node.js", value: 80 },
	{ accent: "purple", label: "TypeScript", value: 95 },
] as const;
