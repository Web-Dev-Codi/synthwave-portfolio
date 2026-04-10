import { motion } from "framer-motion";
import SectionHeading from "../../components/ui/SectionHeading";
import SocialLinks from "../../components/ui/SocialLinks";
import { profile } from "../../data/profile";
import {
	defaultViewport,
	fadeUpVariants,
	scaleUpVariants,
	staggerContainerVariants,
} from "../../utils/animations";
import ContactForm from "./ContactForm";

export const Contact = () => (
	<section className="section-shell" id="contact">
		<div className="section-inner space-y-8">
			<SectionHeading
				align="left"
				eyebrow="06 — Conversion"
				title="Let's Build Something Bold"
			/>

			<motion.div
				className="section-panel retro-panel rounded-(--radius-panel) border border-(--color-border-soft) px-6 py-10 sm:px-10 sm:py-14"
				initial="hidden"
				whileInView="visible"
				viewport={defaultViewport}
				variants={fadeUpVariants}
			>
				<motion.div
					className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
					initial="hidden"
					whileInView="visible"
					viewport={defaultViewport}
					variants={staggerContainerVariants}
				>
					<motion.div
						className="space-y-6 text-left"
						variants={scaleUpVariants}
					>
						<p className="text-base leading-8 text-(--color-text-muted)">
							I’m currently open to product, frontend, and full stack
							opportunities where strong execution and memorable interfaces
							matter.
						</p>

						<div className="space-y-3 text-sm leading-7 text-(--color-text-dim)">
							<p>
								<span className="text-(--color-text-primary)">Email:</span>{" "}
								{profile.email}
							</p>
							<p>
								<span className="text-(--color-text-primary)">Location:</span>{" "}
								{profile.location}
							</p>
							<p>
								<span className="text-(--color-text-primary)">Status:</span>{" "}
								{profile.availability}
							</p>
						</div>

						<SocialLinks className="pt-2" />
					</motion.div>

					<ContactForm />
				</motion.div>
			</motion.div>
		</div>
	</section>
);

export default Contact;
