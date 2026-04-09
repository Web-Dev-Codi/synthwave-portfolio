// validateContact.ts

import type { NextFunction, Request, Response } from "express";
import type {
	ContactFieldErrors,
	ContactFormValues,
} from "../../../shared/types/contact.types.js";
import { contactSchema } from "../../../shared/types/contact.types.js";

export type ContactResponseLocals = {
	contact: ContactFormValues;
};

type ContactValidationErrorResponse = {
	fieldErrors: ContactFieldErrors;
	message: string;
	success: false;
};

export const validateContact = (
	req: Request,
	res: Response<ContactValidationErrorResponse, ContactResponseLocals>,
	next: NextFunction,
) => {
	const parsedContact = contactSchema.safeParse(req.body);

	if (!parsedContact.success) {
		return res.status(400).json({
			fieldErrors: parsedContact.error.flatten().fieldErrors,
			message: "Please correct the highlighted fields and try again.",
			success: false,
		});
	}

	res.locals.contact = parsedContact.data;

	return next();
};
