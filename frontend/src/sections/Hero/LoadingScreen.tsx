import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "../../data/profile";

interface LoadingScreenProps {
	onComplete: () => void;
	isComplete: boolean;
}

const loadingBars = Array.from({ length: 8 });
const loadingBarKeys = [
	"bar-alpha",
	"bar-beta",
	"bar-gamma",
	"bar-delta",
	"bar-epsilon",
	"bar-zeta",
	"bar-eta",
	"bar-theta",
];

export const LoadingScreen = ({
	onComplete,
	isComplete,
}: LoadingScreenProps) => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (isComplete) return;

		const duration = 2500;
		const interval = 50;
		const steps = duration / interval;
		let currentStep = 0;

		const timer = setInterval(() => {
			currentStep++;
			const easeProgress = 1 - (1 - currentStep / steps) ** 3;
			setProgress(Math.min(Math.round(easeProgress * 100), 100));

			if (currentStep >= steps) {
				clearInterval(timer);
				setTimeout(onComplete, 400);
			}
		}, interval);

		return () => clearInterval(timer);
	}, [onComplete, isComplete]);

	return (
		<AnimatePresence>
			{!isComplete && (
				<motion.div
					className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D0B1E]"
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.6, ease: "easeInOut" }}
				>
					<div aria-hidden="true" className="scanline-overlay opacity-10" />
					<div aria-hidden="true" className="vignette-overlay" />

					<motion.div
						className="relative flex flex-col items-center gap-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<div className="relative">
							<motion.div
								className="absolute -inset-4 rounded-full bg-[#D4537E] opacity-20 blur-xl"
								animate={{
									scale: [1, 1.2, 1],
									opacity: [0.2, 0.4, 0.2],
								}}
								transition={{
									duration: 2,
									repeat: Infinity,
									ease: "easeInOut",
								}}
							/>
							<h1 className="pixel-heading relative text-2xl tracking-[0.2em] text-[#D4537E]">
								{profile.siteLabel}
							</h1>
						</div>

						<div className="flex flex-col items-center gap-3">
							<div className="pixel-heading text-xs tracking-[0.3em] text-[#5DCAA5]">
								INITIALIZING
							</div>

							<div className="flex items-center gap-2">
								{loadingBars.map((_, i) => (
									<motion.div
										key={loadingBarKeys[i]}
										className="h-3 w-3 bg-[#5DCAA5]"
										initial={{ opacity: 0.2 }}
										animate={{
											opacity: progress > i * 12.5 ? 1 : 0.2,
										}}
										transition={{ duration: 0.15 }}
									/>
								))}
							</div>

							<div className="font-mono text-sm text-[#7F77DD]">
								{progress.toString().padStart(3, "0")}%
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default LoadingScreen;
