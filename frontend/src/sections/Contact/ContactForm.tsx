import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type {
	ContactApiResponse,
	ContactFormValues,
} from "../../../../shared/types/contact.types";
import { contactSchema } from "../../../../shared/types/contact.types";
import Button from "../../components/ui/Button/Button";
import type { SubmissionState } from "./ContactForm.types";

const apiBaseUrl =
	import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:3001";

const inputClassName =
	"rounded-2xl border border-[rgba(60,52,137,0.8)] bg-[rgba(13,11,30,0.94)] px-4 py-3 text-(--color-text-primary) placeholder:opacity-30 outline-none transition focus:border-[rgba(93,202,165,0.8)] focus:shadow-(--shadow-cyan)";

const labelSpanClassName =
	"text-xs uppercase tracking-[0.22em] text-(--color-text-dim)";

const errorSpanClassName = "min-h-5 text-sm text-(--color-pink)";

export const ContactForm = () => {
	const [submissionState, setSubmissionState] = useState<SubmissionState>({
		message: "",
		tone: "pink",
		type: "idle",
	});
	const {
		formState: { errors, isSubmitting },
		handleSubmit,
		register,
		reset,
	} = useForm<ContactFormValues>({
		resolver: zodResolver(contactSchema),
	});

	const onSubmit = async (data: ContactFormValues) => {
		setSubmissionState({
			message: "Sending your message…",
			tone: "purple",
			type: "submitting",
		});
		try {
			const response = await fetch(`${apiBaseUrl}/api/contact`, {
				body: JSON.stringify(data),
				headers: { "Content-Type": "application/json" },
				method: "POST",
			});
			const payload = (await response.json()) as ContactApiResponse;
			if (!response.ok || !payload.success) {
				setSubmissionState({
					message: payload.message,
					tone: "amber",
					type: "error",
				});
				return;
			}
			reset();
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
		<form className="grid gap-5" noValidate onSubmit={handleSubmit(onSubmit)}>
			<label className="grid gap-2" htmlFor="name">
				<span className={labelSpanClassName}>Name</span>
				<input
					{...register("name")}
					aria-describedby="name-error"
					aria-invalid={Boolean(errors.name)}
					className={inputClassName}
					id="name"
					placeholder="Your name"
				/>
				<span className={errorSpanClassName} id="name-error" role="alert">
					{errors.name?.message ?? ""}
				</span>
			</label>
			<label className="grid gap-2" htmlFor="email">
				<span className={labelSpanClassName}>Email</span>
				<input
					{...register("email")}
					aria-describedby="email-error"
					aria-invalid={Boolean(errors.email)}
					className={inputClassName}
					id="email"
					placeholder="you@example.com"
					type="email"
				/>
				<span className={errorSpanClassName} id="email-error" role="alert">
					{errors.email?.message ?? ""}
				</span>
			</label>
			<label className="grid gap-2" htmlFor="message">
				<span className={labelSpanClassName}>Message</span>
				<textarea
					{...register("message")}
					aria-describedby="message-error"
					aria-invalid={Boolean(errors.message)}
					className={`min-h-44 ${inputClassName}`}
					id="message"
					placeholder="Tell me about your project, role, or idea."
				/>
				<span className={errorSpanClassName} id="message-error" role="alert">
					{errors.message?.message ?? ""}
				</span>
			</label>
			<Button
				accent={isSubmitting ? "purple" : submissionState.tone}
				aria-label="Send contact message"
				className="w-full justify-center"
				type="submit"
			>
				{isSubmitting ? "Sending Message…" : "Send Message"}
			</Button>
			<p
				className="min-h-6 text-sm text-(--color-text-muted)"
				aria-live="polite"
			>
				{submissionState.message}
			</p>
		</form>
	);
};

export default ContactForm;
