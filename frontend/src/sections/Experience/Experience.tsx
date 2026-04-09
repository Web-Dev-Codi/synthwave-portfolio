import SectionHeading from "../../components/ui/SectionHeading";
import { experiences } from "../../data/experience";
import { cn } from "../../utils/cn";

const accentClassMap = {
	cyan: "accent-cyan",
	pink: "accent-pink",
	purple: "accent-purple",
} as const;

const accentDotClassMap = {
	cyan: "bg-[var(--color-cyan)] shadow-[var(--shadow-cyan)]",
	pink: "bg-[var(--color-pink)] shadow-[var(--shadow-pink)]",
	purple: "bg-[var(--color-purple)] shadow-[var(--shadow-purple)]",
} as const;

export const Experience = () => (
	<section className="section-shell" id="experience">
		<div className="section-inner space-y-10">
			<SectionHeading eyebrow="05 — Timeline" title="Experience" />

			<div className="relative grid gap-6 before:absolute before:left-3 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-[rgba(127,119,221,0.22)] md:before:left-1/2 md:before:-translate-x-1/2">
				{experiences.map((experience, index) => (
					<article
						key={`${experience.company}-${experience.period}`}
						className={cn(
							"retro-panel neon-card relative ml-10 rounded-3xl border p-6 md:ml-0 md:w-[calc(50%-1.5rem)]",
							accentClassMap[experience.accent],
							index % 2 === 0 ? "md:mr-auto" : "md:ml-auto",
						)}
					>
						<span
							aria-hidden="true"
							className={cn(
								"absolute -left-8 top-8 h-4 w-4 rounded-full border border-[rgba(255,255,255,0.18)] md:left-auto md:right-[-2.25rem]",
								accentDotClassMap[experience.accent],
								index % 2 === 0
									? "md:right-[-2.25rem]"
									: "md:left-[-2.25rem] md:right-auto",
							)}
						/>

						<p className="pixel-heading text-[0.62rem] tracking-[0.26em] text-(--color-text-dim)">
							{experience.period}
						</p>
						<h3 className="mt-4 text-xl text-(--color-text-primary)">
							{experience.role}
						</h3>
						<p className="mt-1 text-sm uppercase tracking-[0.22em] text-(--color-text-muted)">
							{experience.company}
						</p>

						<ul className="mt-5 space-y-3 text-sm leading-7 text-(--color-text-muted)">
							{experience.highlights.map((highlight) => (
								<li key={highlight} className="flex gap-3">
									<span
										aria-hidden="true"
										className="mt-2 h-1.5 w-1.5 rounded-full bg-(--color-cyan)"
									/>
									<span>{highlight}</span>
								</li>
							))}
						</ul>
					</article>
				))}
			</div>
		</div>
	</section>
);

export default Experience;
