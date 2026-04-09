// contactRoutes.ts

import { Router } from "express";
import { handleContactSubmission } from "../controllers/contactController.js";
import { contactRateLimiter } from "../middleware/rateLimiter.js";
import { validateContact } from "../middleware/validateContact.js";

const contactRouter = Router();

contactRouter.post(
	"/",
	contactRateLimiter,
	validateContact,
	handleContactSubmission,
);

export { contactRouter };
export default contactRouter;
