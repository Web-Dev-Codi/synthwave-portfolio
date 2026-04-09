import { motion } from "framer-motion";
import SynthGrid from "../../canvas/SynthGrid";
import Button from "../../components/ui/Button/Button";
import GlitchText from "../../components/ui/GlitchText/GlitchText";
import { profile } from "../../data/profile";
import { useScrollProgress } from "../../hooks/useScrollAnimation";
import { heroItemVariants, heroStaggerVariants } from "../../utils/animations";

export const Hero = () => {
	const { progress, ref } = useScrollProgress<HTMLElement>({
		endOffset: 0.92,
		startOffset: 0.04,
	});
	const sceneReveal = 0.35 + progress * 0.65;
	const sceneInset = Math.max(0, 26 - progress * 26);
	const sceneScale = 0.96 + progress * 0.08;
	const sceneLift = progress * 28;
	const gridOpacity = 0.42 + progress * 0.4;
	const mountainOpacity = 0.48 + progress * 0.42;

	const handleScrollToProjects = () => {
		const projectsSection = document.getElementById("projects");

		if (!projectsSection) {
			return;
		}

		projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<section
			ref={ref}
			className="section-shell overflow-hidden pt-6 sm:pt-10"
			id="hero"
		>
			<div className="section-inner relative flex min-h-[calc(100svh-6rem)] items-center justify-center py-8 sm:min-h-[calc(100svh-5rem)]">
				<div aria-hidden="true" className="orb-glow hero-orb-left" />
				<div aria-hidden="true" className="orb-glow hero-orb-right" />

				<div
					aria-hidden="true"
					className="hero-scene-shell"
					style={{ clipPath: `inset(${sceneInset}% 0 0 0)` }}
				>
					<div
						className="hero-horizon-line"
						style={{ transform: `translate3d(0, ${sceneLift * -0.32}px, 0)` }}
					/>
					<svg
						aria-hidden="true"
						className="hero-mountains"
						focusable="false"
						preserveAspectRatio="none"
						style={{
							opacity: mountainOpacity,
							transform: `translate3d(0, ${sceneLift * -0.42}px, 0) scale(${sceneScale})`,
						}}
						viewBox="0 0 1000 360"
					>
						<polyline
							fill="none"
							points="0,260 110,190 170,220 250,138 326,228 402,164 470,232"
							stroke="rgba(0, 208, 255, 0.9)"
							strokeWidth="1.5"
						/>
						<polyline
							fill="none"
							points="530,232 616,156 694,232 770,148 840,216 906,174 1000,248"
							stroke="rgba(0, 208, 255, 0.9)"
							strokeWidth="1.5"
						/>
						<polyline
							fill="none"
							points="72,260 158,216 214,242 278,190 346,252 418,210"
							stroke="rgba(140, 30, 255, 0.5)"
							strokeWidth="1"
						/>
						<polyline
							fill="none"
							points="582,242 648,194 724,248 786,192 860,236 936,202"
							stroke="rgba(140, 30, 255, 0.5)"
							strokeWidth="1"
						/>
					</svg>

					<div
						className="hero-sun-wrap"
						style={{
							transform: `translate3d(0, ${sceneLift * -0.5}px, 0) scale(${sceneScale})`,
						}}
					>
						<div className="sun-disc" />
					</div>

					<div
						className="hero-grid-floor"
						style={{
							opacity: gridOpacity,
							transform: `perspective(760px) rotateX(75deg) translateY(${progress * 18}px) scale(${0.98 + progress * 0.04})`,
						}}
					>
						<SynthGrid revealProgress={sceneReveal} />
					</div>
				</div>

				<motion.div
					className="relative z-10 flex max-w-4xl flex-col items-center gap-6 text-center"
					initial="hidden"
					animate="visible"
					variants={heroStaggerVariants}
				>
					<motion.span className="terminal-kicker" variants={heroItemVariants}>
						{profile.siteLabel}
					</motion.span>

					<motion.div variants={heroItemVariants}>
						<GlitchText
							as="h1"
							className="text-4xl leading-[1.4] sm:text-6xl lg:text-7xl"
							isActive={progress > 0.015}
							tone="chrome"
						>
							{profile.name}
						</GlitchText>
					</motion.div>

					<motion.p
						className="pixel-heading neon-text-cyan text-[0.72rem] tracking-[0.34em] sm:text-sm"
						variants={heroItemVariants}
					>
						{profile.role}
						<span aria-hidden="true" className="cursor-block" />
					</motion.p>

					<motion.p
						className="muted-copy max-w-2xl text-base leading-8 sm:text-lg"
						variants={heroItemVariants}
					>
						{profile.summary[0]} {profile.summary[1]}
					</motion.p>

					<motion.div
						className="flex flex-col gap-3 sm:flex-row"
						variants={heroItemVariants}
					>
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
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default Hero;
