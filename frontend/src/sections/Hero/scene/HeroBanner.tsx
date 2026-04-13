import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { profile } from "../../../data/profile";

gsap.registerPlugin(ScrollTrigger);

interface HeroBannerProps {
	timelineRef?: React.RefObject<gsap.core.Timeline | null>;
}

export const HeroBanner = ({ timelineRef }: HeroBannerProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const nameRef = useRef<HTMLHeadingElement>(null);
	const titleRef = useRef<HTMLParagraphElement>(null);

	useLayoutEffect(() => {
		if (!timelineRef?.current || !containerRef.current) return;

		const tl = timelineRef.current;

		// Set initial state
		gsap.set(containerRef.current, { opacity: 0, y: 30 });

		// Banner fades in and rises
		tl.to(
			containerRef.current,
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: "power2.out",
			},
			1.2,
		);
	}, [timelineRef]);

	const nameChars = profile.name.toUpperCase().split("");

	return (
		<div
			ref={containerRef}
			className="absolute left-1/2 z-30 flex -translate-x-1/2 flex-col items-center"
			style={{
				top: "15%",
				textAlign: "center",
			}}
		>
			{/* Glow effect behind text */}
			<div
				className="absolute inset-0 -z-10 blur-2xl"
				style={{
					background:
						"radial-gradient(ellipse, rgba(212,83,126,0.2) 0%, transparent 60%)",
					transform: "scale(1.5)",
				}}
			/>

			<motion.h1
				ref={nameRef}
				className="pixel-heading text-4xl leading-tight tracking-wider sm:text-5xl md:text-6xl lg:text-7xl"
				style={{
					background:
						"linear-gradient(180deg, #FFD700 0%, #FF6B35 50%, #D4537E 100%)",
					WebkitBackgroundClip: "text",
					WebkitTextFillColor: "transparent",
					backgroundClip: "text",
					textShadow: "0 0 30px rgba(255,107,53,0.5)",
				}}
			>
				{nameChars.map((char, i) => (
					<motion.span
						key={`name-char-${i}-${char}`}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							delay: i * 0.05,
							duration: 0.3,
							ease: "easeOut",
						}}
					>
						{char === " " ? "\u00A0" : char}
					</motion.span>
				))}
			</motion.h1>

			<motion.p
				ref={titleRef}
				className="mt-4 text-sm tracking-[0.4em] sm:text-base md:text-lg"
				style={{
					color: "#5DCAA5",
					textShadow:
						"0 0 10px rgba(93,202,165,0.8), 0 0 20px rgba(93,202,165,0.4)",
				}}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, duration: 0.5 }}
			>
				{profile.role}
				<motion.span
					className="ml-1 inline-block"
					animate={{ opacity: [1, 0, 1] }}
					transition={{
						duration: 0.8,
						repeat: Infinity,
						ease: "linear",
					}}
				>
					|
				</motion.span>
			</motion.p>
		</div>
	);
};

export default HeroBanner;
