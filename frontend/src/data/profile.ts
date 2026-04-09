export const profile = {
	availability: "Open to work",
	email: "hello@brian.dev",
	location: "Berlin",
	name: "Brian Cordisco",
	role: "Full Stack Developer",
	siteLabel: "BRIAN.DEV",
	socialLinks: [
		{
			href: "https://github.com/Web-Dev-Codi",
			label: "GitHub",
		},
		{
			href: "mailto:hello@brian.dev",
			label: "Email",
		},
	],
	stats: [
		{ accent: "cyan", label: "Yrs Exp", value: "5+" },
		{ accent: "pink", label: "Projects", value: "30+" },
		{ accent: "purple", label: "Location", value: "Berlin" },
		{ accent: "amber", label: "Status", value: "Open" },
	],
	summary: [
		"I build polished frontend experiences and dependable backend systems with a bias for clarity, accessibility, and maintainable architecture.",
		"Based in Berlin, I enjoy turning ambitious interfaces into fast, usable products that feel distinctive without sacrificing usability.",
		"Right now I am focused on React, TypeScript, Node.js, and product-minded full stack work where design quality matters as much as code quality.",
	],
} as const;

export type Profile = typeof profile;
