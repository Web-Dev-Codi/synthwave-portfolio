import { motion } from "framer-motion";

interface HeroBannerProps {
	isVisible: boolean;
}

export const HeroBanner = ({ isVisible }: HeroBannerProps) => {
	return (
		<motion.div
			className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-center"
			initial={{ opacity: 0, scale: 0.8 }}
			animate={isVisible ? { opacity: 1, scale: 1 } : {}}
			transition={{ duration: 0.8, ease: "easeOut" }}
		>
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={isVisible ? { opacity: 1, y: 0 } : {}}
				transition={{ delay: 0.2, duration: 0.6 }}
			>
				<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold pixel-heading">
					<span className="bg-linear-to-r from-cyan-400 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
						BRIAN CORDISCO
					</span>
				</h1>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={isVisible ? { opacity: 1, y: 0 } : {}}
				transition={{ delay: 0.4, duration: 0.6 }}
			>
				<p className="mt-4 text-lg sm:text-xl lg:text-2xl neon-text-cyan tracking-widest">
					WEB DEVELOPER
				</p>
			</motion.div>

			<motion.div
				initial={{ width: 0 }}
				animate={isVisible ? { width: "100%" } : {}}
				transition={{ delay: 0.6, duration: 0.8 }}
				className="mt-6 h-0.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent"
			/>
		</motion.div>
	);
};

export default HeroBanner;
