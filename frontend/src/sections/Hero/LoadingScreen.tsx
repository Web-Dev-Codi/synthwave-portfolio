import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
	onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
			setTimeout(onComplete, 800);
		}, 2000);

		return () => clearTimeout(timer);
	}, [onComplete]);

	return (
		<AnimatePresence>
			{isLoading && (
				<motion.div
					className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950"
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.6 }}
				>
					<div className="relative">
						{/* Synthwave sun loader */}
						<motion.div
							className="w-24 h-24 rounded-full bg-linear-to-t from-fuchsia-600 via-purple-500 to-cyan-400"
							animate={{
								scaleY: [0.3, 1],
							}}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						/>
						{/* Horizontal stripes */}
						<div className="absolute inset-0 flex flex-col justify-end overflow-hidden rounded-full">
							{[...Array(8)].map((_, i) => (
								<motion.div
									key={`stripe-${i}`}
									className="w-full bg-slate-950"
									style={{ height: `${12 + i * 4}%` }}
									initial={{ y: "100%" }}
									animate={{ y: 0 }}
									transition={{
										delay: i * 0.1,
										duration: 0.3,
										repeat: Infinity,
										repeatDelay: 1.2,
									}}
								/>
							))}
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default LoadingScreen;
