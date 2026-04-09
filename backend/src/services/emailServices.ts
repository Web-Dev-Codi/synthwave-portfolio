import { Resend } from "resend";
import type { ContactFormValues } from "../../../shared/types/contact.types.js";

type SendContactEmailResult =
	| {
			deliveryId?: string;
			success: true;
	  }
	| {
			message: string;
			statusCode: 502 | 503;
			success: false;
	  };

const createContactHtml = (contact: ContactFormValues) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #14111f;">
    <h1 style="font-size: 20px; margin-bottom: 16px;">New portfolio contact submission</h1>
    <p><strong>Name:</strong> ${contact.name}</p>
    <p><strong>Email:</strong> ${contact.email}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap;">${contact.message}</p>
  </div>
`;

const createContactText = (contact: ContactFormValues) =>
	[
		"New portfolio contact submission",
		`Name: ${contact.name}`,
		`Email: ${contact.email}`,
		"Message:",
		contact.message,
	].join("\n");

export const sendContactEmail = async (
	contact: ContactFormValues,
): Promise<SendContactEmailResult> => {
	const resendApiKey = process.env.RESEND_API_KEY;
	const contactFromEmail = process.env.CONTACT_FROM_EMAIL;
	const contactToEmail = process.env.CONTACT_TO_EMAIL;

	if (!resendApiKey || !contactFromEmail || !contactToEmail) {
		return {
			message:
				"The contact service is not configured yet. Add RESEND_API_KEY, CONTACT_FROM_EMAIL, and CONTACT_TO_EMAIL to the backend environment.",
			statusCode: 503,
			success: false,
		};
	}

	const resend = new Resend(resendApiKey);
	const { data, error } = await resend.emails.send({
		from: contactFromEmail,
		html: createContactHtml(contact),
		replyTo: contact.email,
		subject: `New portfolio message from ${contact.name}`,
		text: createContactText(contact),
		to: [contactToEmail],
	});

	if (error) {
		return {
			message:
				"The message could not be delivered right now. Please try again shortly.",
			statusCode: 502,
			success: false,
		};
	}

	return {
		deliveryId: data?.id,
		success: true,
	};
};
