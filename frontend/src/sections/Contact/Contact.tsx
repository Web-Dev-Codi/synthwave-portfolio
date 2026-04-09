import Button from "../../components/ui/Button/Button";
import SectionHeading from "../../components/ui/SectionHeading";
import { profile } from "../../data/profile";

export const Contact = () => (
	<section className="section-shell" id="contact">
		<div className="section-inner">
			<div className="retro-panel rounded-(--radius-panel) border border-(--color-border-soft) px-6 py-10 sm:px-10 sm:py-14">
				<div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
					<SectionHeading
						eyebrow="06 — Conversion"
						title="Let’s Build Something Bold"
					/>

					<p className="max-w-2xl text-base leading-8 text-(--color-text-muted)">
						I’m currently open to product, frontend, and full stack
						opportunities where strong execution and memorable interfaces
						matter.
					</p>

					<div className="flex flex-col gap-3 sm:flex-row">
						<Button
							accent="pink"
							aria-label="Email Brian"
							href={`mailto:${profile.email}`}
						>
							Email Me
						</Button>
						<Button
							accent="cyan"
							aria-label="Jump to GitHub profile"
							href={profile.socialLinks[0].href}
							target="_blank"
						>
							View GitHub
						</Button>
					</div>

					<div className="flex flex-wrap items-center justify-center gap-3 pt-4">
						{profile.socialLinks.map((link) => (
							<Button
								key={link.label}
								accent="purple"
								aria-label={`Open ${link.label}`}
								href={link.href}
								size="sm"
								target={link.href.startsWith("http") ? "_blank" : undefined}
							>
								{link.label}
							</Button>
						))}
					</div>
				</div>
			</div>
		</div>
	</section>
);

export default Contact;
