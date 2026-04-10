import type { TargetAndTransition, Variants } from "framer-motion";

// Fade up animation for scroll reveals
export const fadeUpVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 40,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
};

// Stagger container for child animations
export const staggerContainerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.1,
		},
	},
};

// Scale up animation for cards
export const scaleUpVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.95,
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.5,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
};

// Slide in from left for timeline
export const slideInLeftVariants: Variants = {
	hidden: {
		opacity: 0,
		x: -60,
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.6,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
};

// Slide in from right for timeline
export const slideInRightVariants: Variants = {
	hidden: {
		opacity: 0,
		x: 60,
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.6,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
};

// Glitch text animation
export const glitchVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.9,
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.4,
			ease: "easeOut",
		},
	},
};

// Hero content stagger animation
export const heroStaggerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.2,
		},
	},
};

export const heroItemVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 30,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
};

// Card hover animation (for Framer Motion whileHover)
export const cardHoverAnimation: TargetAndTransition = {
	y: -8,
	scale: 1.02,
	transition: {
		duration: 0.3,
		ease: [0.34, 1.56, 0.64, 1],
	},
};

// Badge hover animation
export const badgeHoverAnimation = {
	scale: 1.08,
	transition: {
		duration: 0.2,
		ease: "easeOut",
	},
};

// Viewport settings for scroll animations
export const defaultViewport = {
	once: true,
	amount: 0.15,
	margin: "-50px",
};
