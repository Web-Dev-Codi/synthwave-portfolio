import SectionHeading from "../../components/ui/SectionHeading";
import { profile } from "../../data/profile";
import { cn } from "../../utils/cn";

const accentClassMap = {
	amber: "accent-amber",
	cyan: "accent-cyan",
	pink: "accent-pink",
	purple: "accent-purple",
} as const;

export const About = () => (
	<section className="section-shell" id="about">
		<div className="section-inner grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
			<div className="retro-panel neon-card floating-panel rounded-[var(--radius-panel)] border border-[var(--color-border-soft)] p-6 sm:p-8">
				<div className="flex h-full flex-col items-center justify-center gap-6 rounded-[calc(var(--radius-panel)-0.5rem)] border border-[rgba(127,119,221,0.28)] bg-[rgba(26,23,64,0.7)] px-8 py-10 text-center">
					<div className="flex h-24 w-24 items-center justify-center rounded-full border border-[rgba(127,119,221,0.45)] bg-[rgba(60,52,137,0.42)] text-3xl text-[var(--color-text-primary)] shadow-[var(--shadow-purple)]">
						B
					</div>
					<div className="space-y-2">
						<p className="pixel-heading text-xs tracking-[0.22em] text-[var(--color-purple)]">
							Pixel Avatar
						</p>
						<p className="muted-copy text-sm leading-7">
							Crafting high-contrast interfaces with modern frontend tooling and
							product-minded implementation.
						</p>
					</div>
				</div>
			</div>

			<div className="space-y-8">
				<SectionHeading align="left" eyebrow="02 — Identity" title="About Me" />

				<div className="space-y-4 text-base leading-8 text-[var(--color-text-muted)]">
					{profile.summary.map((paragraph) => (
						<p key={paragraph}>{paragraph}</p>
					))}
				</div>

				<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
					{profile.stats.map((stat) => (
						<article
							key={stat.label}
							className={cn(
								"retro-panel neon-card rounded-3xl border p-5 text-left",
								accentClassMap[stat.accent],
							)}
						>
							<p className="pixel-heading text-sm text-[var(--color-text-primary)]">
								{stat.value}
							</p>
							<p className="mt-3 text-sm uppercase tracking-[0.22em] text-[var(--color-text-dim)]">
								{stat.label}
							</p>
						</article>
					))}
				</div>
			</div>
		</div>
	</section>
);

export default About;
