import type { Request, Response } from "express";
import type { ContactApiResponse } from "../../../shared/types/contact.types.js";
import type { ContactResponseLocals } from "../middleware/validateContact.js";
import { sendContactEmail } from "../services/emailServices.js";

export const handleContactSubmission = async (
	_request: Request,
	response: Response<ContactApiResponse, ContactResponseLocals>,
) => {
	const emailResult = await sendContactEmail(response.locals.contact);

	if (!emailResult.success) {
		return response.status(emailResult.statusCode).json({
			message: emailResult.message,
			success: false,
		});
	}

	return response.status(200).json({
		deliveryId: emailResult.deliveryId,
		message: "Message sent successfully. I’ll get back to you soon.",
		success: true,
	});
};
