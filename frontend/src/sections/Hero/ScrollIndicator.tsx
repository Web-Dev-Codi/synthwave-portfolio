import { AnimatePresence, motion } from "framer-motion";

interface ScrollIndicatorProps {
	isVisible: boolean;
	onHide: () => void;
}

export const ScrollIndicator = ({
	isVisible,
	onHide,
}: ScrollIndicatorProps) => {
	const handleInteraction = () => {
		onHide();
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					className="fixed bottom-12 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-3"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 10 }}
					transition={{ duration: 0.4 }}
					onClick={handleInteraction}
				>
					<span className="pixel-heading text-[0.6rem] tracking-[0.3em] text-[#7F77DD]">
						SCROLL TO START
					</span>

					<motion.div
						className="flex flex-col items-center"
						animate={{ y: [0, 8, 0] }}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							className="text-[#D4537E]"
						>
							<title>Scroll down</title>
							<path
								d="M12 5v14M5 12l7 7 7-7"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="square"
							/>
						</svg>
					</motion.div>

					<div className="h-16 w-px bg-linear-to-b from-[#D4537E] to-transparent" />
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ScrollIndicator;
