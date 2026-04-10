type ProjectPlaceholderProps = {
	accent?: "amber" | "cyan" | "pink" | "purple";
};

type PlaceholderColors = {
	grid: string;
	sun1: string;
	sun2: string;
};

const accentColorMap: Record<string, PlaceholderColors> = {
	amber: { grid: "rgba(255,144,31,0.38)", sun1: "#ff901f", sun2: "#ff2975" },
	cyan: { grid: "rgba(0,208,255,0.38)", sun1: "#ffd319", sun2: "#ff2975" },
	pink: { grid: "rgba(255,41,117,0.38)", sun1: "#ff901f", sun2: "#8c1eff" },
	purple: { grid: "rgba(140,30,255,0.38)", sun1: "#ff2975", sun2: "#8c1eff" },
};

export const ProjectPlaceholder = ({ accent = "cyan" }: ProjectPlaceholderProps) => {
	const colors = accentColorMap[accent] ?? accentColorMap.cyan;
	const gradId = `pp-sun-${accent}`;
	return (
		<svg
			aria-hidden="true"
			className="h-full w-full"
			viewBox="0 0 400 160"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect fill="#070612" height="160" width="400" />
			{/* Stars */}
			<circle cx="40" cy="20" fill="rgba(255,255,255,0.6)" r="0.9" />
			<circle cx="110" cy="35" fill="rgba(255,255,255,0.45)" r="0.7" />
			<circle cx="280" cy="15" fill="rgba(0,208,255,0.5)" r="1" />
			<circle cx="350" cy="30" fill="rgba(255,255,255,0.4)" r="0.7" />
			<defs>
				<radialGradient cx="50%" cy="50%" id={gradId} r="50%">
					<stop offset="0%" stopColor={colors.sun1} />
					<stop offset="100%" stopColor={colors.sun2} />
				</radialGradient>
			</defs>
			{/* Sun at horizon (y=88) */}
			<circle cx="200" cy="88" fill={`url(#${gradId})`} r="26" />
			{/* Stripes lower half */}
			<rect fill="rgba(7,6,18,0.8)" height="2.2" width="52" x="174" y="88" />
			<rect fill="rgba(7,6,18,0.8)" height="2.2" width="52" x="174" y="94" />
			<rect fill="rgba(7,6,18,0.8)" height="2.2" width="52" x="174" y="100" />
			<rect fill="rgba(7,6,18,0.8)" height="2" width="52" x="174" y="106" />
			<rect fill="rgba(7,6,18,0.8)" height="2" width="52" x="174" y="112" />
			{/* Horizon */}
			<line stroke="rgba(0,208,255,0.55)" strokeWidth="1" x1="0" x2="400" y1="88" y2="88" />
			{/* Grid perspective lines */}
			<line stroke={colors.grid} strokeWidth="0.8" x1="200" x2="0" y1="88" y2="160" />
			<line stroke={colors.grid} strokeWidth="0.8" x1="200" x2="80" y1="88" y2="160" />
			<line stroke={colors.grid} strokeWidth="0.8" x1="200" x2="150" y1="88" y2="160" />
			<line stroke={colors.grid} strokeWidth="0.8" x1="200" x2="250" y1="88" y2="160" />
			<line stroke={colors.grid} strokeWidth="0.8" x1="200" x2="320" y1="88" y2="160" />
			<line stroke={colors.grid} strokeWidth="0.8" x1="200" x2="400" y1="88" y2="160" />
			{/* Horizontal grid lines */}
			<line opacity="0.6" stroke={colors.grid} strokeWidth="0.6" x1="48" x2="352" y1="118" y2="118" />
			<line opacity="0.4" stroke={colors.grid} strokeWidth="0.6" x1="18" x2="382" y1="140" y2="140" />
		</svg>
	);
};

export default ProjectPlaceholder;
