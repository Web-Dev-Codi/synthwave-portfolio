import { motion } from "framer-motion";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type {
	ContactApiResponse,
	ContactFieldErrors,
	ContactFormValues,
} from "../../../../shared/types/contact.types";
import { contactSchema } from "../../../../shared/types/contact.types";
import Button from "../../components/ui/Button/Button";
import SectionHeading from "../../components/ui/SectionHeading";
import { profile } from "../../data/profile";
import {
	fadeUpVariants,
	scaleUpVariants,
	staggerContainerVariants,
	defaultViewport,
} from "../../utils/animations";

const initialContactValues: ContactFormValues = {
	email: "",
	message: "",
	name: "",
};

type SubmissionState = {
	message: string;
	tone: "amber" | "cyan" | "pink" | "purple";
	type: "error" | "idle" | "submitting" | "success";
};

const apiBaseUrl =
	import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:3001";

export const Contact = () => {
	const [contactValues, setContactValues] =
		useState<ContactFormValues>(initialContactValues);
	const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
	const [submissionState, setSubmissionState] = useState<SubmissionState>({
		message: "",
		tone: "pink",
		type: "idle",
	});

	const handleInputChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = event.target;

		setContactValues((previousValues) => ({
			...previousValues,
			[name]: value,
		}));
		setFieldErrors((previousErrors) => ({
			...previousErrors,
			[name]: undefined,
		}));

		if (submissionState.type !== "idle") {
			setSubmissionState({ message: "", tone: "pink", type: "idle" });
		}
	};

	const getFieldError = (fieldName: keyof ContactFormValues) =>
		fieldErrors[fieldName]?.[0] ?? "";

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const parsedContact = contactSchema.safeParse(contactValues);

		if (!parsedContact.success) {
			setFieldErrors(parsedContact.error.flatten().fieldErrors);
			setSubmissionState({
				message: "Please correct the highlighted fields and try again.",
				tone: "amber",
				type: "error",
			});

			return;
		}

		setFieldErrors({});
		setSubmissionState({
			message: "Sending your message…",
			tone: "purple",
			type: "submitting",
		});

		try {
			const response = await fetch(`${apiBaseUrl}/api/contact`, {
				body: JSON.stringify(parsedContact.data),
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
			});
			const payload = (await response.json()) as ContactApiResponse;

			if (!response.ok || !payload.success) {
				setFieldErrors(payload.success ? {} : (payload.fieldErrors ?? {}));
				setSubmissionState({
					message: payload.message,
					tone: "amber",
					type: "error",
				});

				return;
			}

			setContactValues(initialContactValues);
			setSubmissionState({
				message: payload.message,
				tone: "cyan",
				type: "success",
			});
		} catch {
			setSubmissionState({
				message:
					"The contact service is currently unreachable. Please try again shortly.",
				tone: "amber",
				type: "error",
			});
		}
	};

	return (
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

							<div className="flex flex-wrap gap-3 pt-2">
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
						</motion.div>

						<form className="grid gap-5" noValidate onSubmit={handleSubmit}>
							<label className="grid gap-2" htmlFor="name">
								<span className="text-xs uppercase tracking-[0.22em] text-(--color-text-dim)">
									Name
								</span>
								<input
									aria-describedby="name-error"
									aria-invalid={Boolean(getFieldError("name"))}
									className="rounded-2xl border border-[rgba(60,52,137,0.8)] bg-[rgba(13,11,30,0.94)] px-4 py-3 text-(--color-text-primary) outline-none transition focus:border-[rgba(93,202,165,0.8)] focus:shadow-(--shadow-cyan)"
									id="name"
									name="name"
									onChange={handleInputChange}
									placeholder="Your name"
									value={contactValues.name}
								/>
								<span
									className="min-h-5 text-sm text-(--color-pink)"
									id="name-error"
								>
									{getFieldError("name")}
								</span>
							</label>

							<label className="grid gap-2" htmlFor="email">
								<span className="text-xs uppercase tracking-[0.22em] text-(--color-text-dim)">
									Email
								</span>
								<input
									aria-describedby="email-error"
									aria-invalid={Boolean(getFieldError("email"))}
									className="rounded-2xl border border-[rgba(60,52,137,0.8)] bg-[rgba(13,11,30,0.94)] px-4 py-3 text-(--color-text-primary) outline-none transition focus:border-[rgba(93,202,165,0.8)] focus:shadow-(--shadow-cyan)"
									id="email"
									name="email"
									onChange={handleInputChange}
									placeholder="you@example.com"
									type="email"
									value={contactValues.email}
								/>
								<span
									className="min-h-5 text-sm text-(--color-pink)"
									id="email-error"
								>
									{getFieldError("email")}
								</span>
							</label>

							<label className="grid gap-2" htmlFor="message">
								<span className="text-xs uppercase tracking-[0.22em] text-(--color-text-dim)">
									Message
								</span>
								<textarea
									aria-describedby="message-error"
									aria-invalid={Boolean(getFieldError("message"))}
									className="min-h-44 rounded-2xl border border-[rgba(60,52,137,0.8)] bg-[rgba(13,11,30,0.94)] px-4 py-3 text-(--color-text-primary) outline-none transition focus:border-[rgba(93,202,165,0.8)] focus:shadow-(--shadow-cyan)"
									id="message"
									name="message"
									onChange={handleInputChange}
									placeholder="Tell me about your project, role, or idea."
									value={contactValues.message}
								/>
								<span
									className="min-h-5 text-sm text-(--color-pink)"
									id="message-error"
								>
									{getFieldError("message")}
								</span>
							</label>

							<Button
								accent={submissionState.tone}
								aria-label="Send contact message"
								className="w-full justify-center"
								type="submit"
							>
								{submissionState.type === "submitting"
									? "Sending Message"
									: "Send Message"}
							</Button>

							<p className="min-h-6 text-sm text-(--color-text-muted)">
								{submissionState.message}
							</p>
						</form>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default Contact;
