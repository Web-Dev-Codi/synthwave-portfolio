import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface SynthSunProps {
	timelineRef?: React.RefObject<gsap.core.Timeline | null>;
}

export const SynthSun = ({ timelineRef }: SynthSunProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const stripesRef = useRef<HTMLDivElement[]>([]);

	useLayoutEffect(() => {
		if (!timelineRef?.current || !containerRef.current) return;

		const tl = timelineRef.current;
		const stripes = stripesRef.current;

		// Set initial state - stripes hidden
		gsap.set(stripes, { scaleY: 0, transformOrigin: "bottom" });
		gsap.set(containerRef.current, {
			y: "50vh",
			x: "0vw",
			opacity: 0,
		});

		// Sun reveal animation
		tl.to(
			containerRef.current,
			{
				y: "-30vh",
				x: "15vw",
				opacity: 1,
				duration: 1,
				ease: "power2.out",
			},
			0,
		);

		// Stripe reveal with stagger
		tl.to(
			stripes,
			{
				scaleY: 1,
				duration: 0.8,
				ease: "power2.out",
				stagger: 0.05,
			},
			0.2,
		);
	}, [timelineRef]);

	const stripeCount = 12;
	const stripeKeys = [
		"alpha",
		"beta",
		"gamma",
		"delta",
		"epsilon",
		"zeta",
		"eta",
		"theta",
		"iota",
		"kappa",
		"lambda",
		"mu",
	];
	const stripes = Array.from({ length: stripeCount }, (_, i) => (
		<div
			key={stripeKeys[i]}
			ref={(el) => {
				if (el) stripesRef.current[i] = el;
			}}
			className="absolute w-full"
			style={{
				height: `${100 / stripeCount}%`,
				top: `${(i * 100) / stripeCount}%`,
				background:
					i % 2 === 0
						? "linear-gradient(to bottom, #FF6B35, #F7931E)"
						: "transparent",
			}}
		/>
	));

	return (
		<div
			ref={containerRef}
			className="absolute"
			style={{
				width: "clamp(200px, 30vw, 400px)",
				height: "clamp(200px, 30vw, 400px)",
				right: "15%",
				top: "20%",
			}}
		>
			{/* Glow effect */}
			<div
				className="absolute inset-0 rounded-full blur-xl"
				style={{
					background:
						"radial-gradient(circle, rgba(255,107,53,0.4) 0%, transparent 70%)",
				}}
			/>

			{/* Sun disc */}
			<div
				className="relative h-full w-full overflow-hidden rounded-full"
				style={{
					background:
						"linear-gradient(to bottom, #FF6B35 0%, #F7931E 50%, #FFD700 100%)",
					boxShadow:
						"0 0 60px rgba(255,107,53,0.6), 0 0 120px rgba(255,107,53,0.3)",
				}}
			>
				{/* Stripe mask overlay */}
				<div className="absolute inset-0 overflow-hidden rounded-full">
					{stripes}
				</div>
			</div>
		</div>
	);
};

export default SynthSun;
