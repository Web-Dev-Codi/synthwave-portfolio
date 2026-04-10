type AccentColor = "amber" | "cyan" | "pink" | "purple";

// Maps tech name → category accent color.
// Frontend/UI = cyan, Backend/Server = pink, Tools/DevOps = purple, AI/ML = amber
const techColorMap: Record<string, AccentColor> = {
	// Frontend — cyan
	CSS: "cyan",
	"HTML/CSS": "cyan",
	JavaScript: "cyan",
	"Next.js": "cyan",
	React: "cyan",
	Svelte: "cyan",
	Tailwind: "cyan",
	TypeScript: "cyan",
	Vue: "cyan",
	// Backend — pink
	Express: "pink",
	FastAPI: "pink",
	GraphQL: "pink",
	MongoDB: "pink",
	"Node.js": "pink",
	PostgreSQL: "pink",
	Python: "pink",
	Redis: "pink",
	REST: "pink",
	// Tools / DevOps — purple
	Bash: "purple",
	CLI: "purple",
	Documentation: "purple",
	DevOps: "purple",
	Dotfiles: "purple",
	Docker: "purple",
	Git: "purple",
	Hyprland: "purple",
	Linux: "purple",
	Rich: "purple",
	// AI / ML — amber
	AI: "amber",
	"AI/ML": "amber",
	Ollama: "amber",
	"TMDB API": "amber",
};

export const getTechColor = (
	tech: string,
	fallback: AccentColor = "purple",
): AccentColor => techColorMap[tech] ?? fallback;
