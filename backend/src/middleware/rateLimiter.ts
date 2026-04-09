// ratelimiter.ts

import rateLimit from "express-rate-limit";

export const contactRateLimiter = rateLimit({
	handler: (_request, response) => {
		response.status(429).json({
			message:
				"Too many contact requests received. Please try again in a little while.",
			success: false,
		});
	},
	legacyHeaders: false,
	limit: 5,
	standardHeaders: true,
	windowMs: 15 * 60 * 1000,
});
