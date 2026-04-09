import Button from "../../components/ui/Button/Button";
import GlitchText from "../../components/ui/GlitchText/GlitchText";
import { profile } from "../../data/profile";

export const Hero = () => {
	const handleScrollToProjects = () => {
		const projectsSection = document.getElementById("projects");

		if (!projectsSection) {
			return;
		}

		projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<section className="section-shell overflow-hidden pt-24 sm:pt-32" id="hero">
			<div className="section-inner relative flex min-h-[48rem] items-start justify-center pb-52 pt-8 sm:min-h-[calc(100vh-6rem)] sm:items-center sm:pb-28 sm:pt-0">
				<div aria-hidden="true" className="orb-glow hero-orb-left" />
				<div aria-hidden="true" className="orb-glow hero-orb-right" />

				<div className="relative z-10 flex max-w-4xl flex-col items-center gap-6 text-center">
					<span className="terminal-kicker">{profile.siteLabel}</span>

					<GlitchText
						as="h1"
						className="text-4xl leading-[1.4] sm:text-6xl lg:text-7xl"
						tone="chrome"
					>
						{profile.name}
					</GlitchText>

					<p className="pixel-heading neon-text-cyan text-[0.72rem] tracking-[0.34em] sm:text-sm">
						{profile.role}
						<span aria-hidden="true" className="cursor-block" />
					</p>

					<p className="muted-copy max-w-2xl text-base leading-8 sm:text-lg">
						{profile.summary[0]} {profile.summary[1]}
					</p>

					<div className="flex flex-col gap-3 sm:flex-row">
						<Button
							aria-label="Scroll to the projects section"
							onClick={handleScrollToProjects}
						>
							View My Work
						</Button>
						<Button
							accent="cyan"
							aria-label="Send Brian an email"
							href={`mailto:${profile.email}`}
						>
							Start a Conversation
						</Button>
					</div>
				</div>

				<div className="pointer-events-none absolute inset-x-0 -bottom-20 flex justify-center sm:bottom-18 lg:bottom-28">
					<div className="sun-disc" />
				</div>

				<div aria-hidden="true" className="hero-grid-floor" />
			</div>
		</section>
	);
};

export default Hero;
