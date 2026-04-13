import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface DeloreanProps {
	timelineRef?: React.RefObject<gsap.core.Timeline | null>;
}

export const Delorean = ({ timelineRef }: DeloreanProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const wheelFrontRef = useRef<HTMLDivElement>(null);
	const wheelRearRef = useRef<HTMLDivElement>(null);
	const carBodyRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (!timelineRef?.current || !containerRef.current) return;

		const tl = timelineRef.current;

		// Set initial state - off-screen left
		gsap.set(containerRef.current, { x: "-50vw", opacity: 0 });

		// Car enters from left
		tl.to(
			containerRef.current,
			{
				x: "0vw",
				opacity: 1,
				duration: 1,
				ease: "power2.out",
			},
			0.8,
		);

		// Continuous wheel rotation during the sequence
		if (wheelFrontRef.current && wheelRearRef.current) {
			gsap.to([wheelFrontRef.current, wheelRearRef.current], {
				rotation: 720,
				duration: 2,
				ease: "none",
				repeat: 0,
				delay: 0.8,
			});
		}

		// Subtle bobbing motion
		if (carBodyRef.current) {
			gsap.to(carBodyRef.current, {
				y: "-=5",
				duration: 0.3,
				ease: "power1.inOut",
				yoyo: true,
				repeat: 5,
				delay: 1,
			});
		}
	}, [timelineRef]);

	return (
		<div
			ref={containerRef}
			className="absolute z-20"
			style={{
				left: "50%",
				bottom: "15%",
				transform: "translateX(-50%)",
				width: "clamp(200px, 25vw, 350px)",
			}}
		>
			<div ref={carBodyRef} className="relative">
				{/* Glow effect */}
				<div
					className="absolute -inset-4 blur-xl"
					style={{
						background: "radial-gradient(ellipse, rgba(93,202,165,0.3) 0%, transparent 70%)",
					}}
				/>

				<svg viewBox="0 0 300 120" className="h-auto w-full" style={{ filter: "drop-shadow(0 0 8px rgba(93,202,165,0.6))" }}>
					{/* Car body - retro wireframe style */}
					<path
						d="M20,70 L40,50 L80,45 L120,40 L180,40 L220,45 L260,55 L280,70 L280,85 L250,85 L240,75 L220,75 L210,85 L90,85 L80,75 L60,75 L50,85 L20,85 Z"
						fill="#0D0B1E"
						stroke="#5DCAA5"
						strokeWidth="2"
					/>

					{/* Windshield */}
					<path
						d="M120,42 L180,42 L170,25 L130,25 Z"
						fill="#0D0B1E"
						stroke="#5DCAA5"
						strokeWidth="1.5"
						opacity="0.8"
					/>

					{/* Side window */}
					<path
						d="M85,47 L115,42 L115,60 L75,62 Z"
						fill="#0D0B1E"
						stroke="#534AB7"
						strokeWidth="1.5"
						opacity="0.6"
					/>

					{/* Door line */}
					<line x1="120" y1="42" x2="120" y2="82" stroke="#5DCAA5" strokeWidth="1" opacity="0.5" />

					{/* Headlights */}
					<rect x="270" y="65" width="8" height="12" fill="#FFD700" opacity="0.9" />
					<rect x="275" y="67" width="3" height="8" fill="#FFFFFF" />

					{/* Taillights */}
					<rect x="22" y="65" width="6" height="10" fill="#D4537E" opacity="0.9" />

					{/* Stripe detail */}
					<line x1="40" y1="55" x2="260" y2="55" stroke="#534AB7" strokeWidth="1" opacity="0.4" />
				</svg>

				{/* Wheels */}
				<div
					ref={wheelFrontRef}
					className="absolute"
					style={{
						left: "72%",
						bottom: "-8%",
						width: "14%",
						height: "auto",
						aspectRatio: "1",
					}}
				>
					<svg viewBox="0 0 40 40" className="h-auto w-full">
						<circle cx="20" cy="20" r="18" fill="#1a1a2e" stroke="#5DCAA5" strokeWidth="2" />
						<circle cx="20" cy="20" r="8" fill="#0D0B1E" stroke="#534AB7" strokeWidth="1" />
						{/* Spokes */}
						<line x1="20" y1="4" x2="20" y2="36" stroke="#534AB7" strokeWidth="1" />
						<line x1="4" y1="20" x2="36" y2="20" stroke="#534AB7" strokeWidth="1" />
					</svg>
				</div>

				<div
					ref={wheelRearRef}
					className="absolute"
					style={{
						left: "18%",
						bottom: "-8%",
						width: "14%",
						height: "auto",
						aspectRatio: "1",
					}}
				>
					<svg viewBox="0 0 40 40" className="h-auto w-full">
						<circle cx="20" cy="20" r="18" fill="#1a1a2e" stroke="#5DCAA5" strokeWidth="2" />
						<circle cx="20" cy="20" r="8" fill="#0D0B1E" stroke="#534AB7" strokeWidth="1" />
						{/* Spokes */}
						<line x1="20" y1="4" x2="20" y2="36" stroke="#534AB7" strokeWidth="1" />
						<line x1="4" y1="20" x2="36" y2="20" stroke="#534AB7" strokeWidth="1" />
					</svg>
				</div>
			</div>
		</div>
	);
};

export default Delorean;
