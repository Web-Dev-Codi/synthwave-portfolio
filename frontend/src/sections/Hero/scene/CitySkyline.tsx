import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface CitySkylineProps {
	timelineRef?: React.RefObject<gsap.core.Timeline | null>;
}

export const CitySkyline = ({ timelineRef }: CitySkylineProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const leftBuildingsRef = useRef<SVGPathElement>(null);
	const rightBuildingsRef = useRef<SVGPathElement>(null);
	const centerRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (!timelineRef?.current || !containerRef.current) return;

		const tl = timelineRef.current;

		// Set initial state - below viewport
		gsap.set(containerRef.current, { y: "100vh", opacity: 0 });
		gsap.set(centerRef.current, { scale: 0.8, opacity: 0 });

		// Skyline rises from below
		tl.to(
			containerRef.current,
			{
				y: "0vh",
				opacity: 1,
				duration: 1.2,
				ease: "power2.out",
			},
			0.4,
		);

		// Center buildings scale in
		tl.to(
			centerRef.current,
			{
				scale: 1,
				opacity: 1,
				duration: 0.8,
				ease: "power2.out",
			},
			0.6,
		);
	}, [timelineRef]);

	return (
		<div
			ref={containerRef}
			className="absolute bottom-0 left-0 right-0 z-10"
			style={{ height: "35vh" }}
		>
			<svg
				viewBox="0 0 1200 300"
				preserveAspectRatio="none"
				className="h-full w-full"
				style={{ filter: "drop-shadow(0 0 10px rgba(93,202,165,0.5))" }}
			>
				{/* Left side buildings */}
				<path
					ref={leftBuildingsRef}
					d="M0,300 L0,180 L40,180 L40,120 L80,120 L80,150 L120,150 L120,80 L160,80 L160,140 L200,140 L200,100 L240,100 L240,160 L280,160 L280,200 L320,200 L320,140 L360,140 L360,180 L400,180 L400,220 L440,220 L440,170 L480,170 L480,190 L520,190 L520,250 L560,250 L560,300 Z"
					fill="#0D0B1E"
					stroke="#5DCAA5"
					strokeWidth="1.5"
					opacity="0.9"
				/>

				{/* Right side buildings */}
				<path
					ref={rightBuildingsRef}
					d="M640,300 L640,250 L680,250 L680,190 L720,190 L720,170 L760,170 L760,220 L800,220 L800,180 L840,180 L840,140 L880,140 L880,200 L920,200 L920,160 L960,160 L960,100 L1000,100 L1000,140 L1040,140 L1040,80 L1080,80 L1080,120 L1120,120 L1120,180 L1160,180 L1160,150 L1200,150 L1200,300 Z"
					fill="#0D0B1E"
					stroke="#5DCAA5"
					strokeWidth="1.5"
					opacity="0.9"
				/>
			</svg>

			{/* Center building cluster */}
			<div
				ref={centerRef}
				className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
				style={{ width: "15%" }}
			>
				<svg viewBox="0 0 200 250" className="h-auto w-full">
					{/* Main tower */}
					<rect
						x="60"
						y="50"
						width="80"
						height="200"
						fill="#0D0B1E"
						stroke="#D4537E"
						strokeWidth="2"
					/>
					{/* Windows */}
					<rect
						x="75"
						y="70"
						width="15"
						height="15"
						fill="#D4537E"
						opacity="0.6"
					/>
					<rect
						x="110"
						y="70"
						width="15"
						height="15"
						fill="#D4537E"
						opacity="0.6"
					/>
					<rect
						x="75"
						y="100"
						width="15"
						height="15"
						fill="#D4537E"
						opacity="0.4"
					/>
					<rect
						x="110"
						y="100"
						width="15"
						height="15"
						fill="#D4537E"
						opacity="0.4"
					/>
					<rect
						x="75"
						y="130"
						width="15"
						height="15"
						fill="#D4537E"
						opacity="0.6"
					/>
					<rect
						x="110"
						y="130"
						width="15"
						height="15"
						fill="#D4537E"
						opacity="0.6"
					/>
					{/* Side wings */}
					<rect
						x="30"
						y="120"
						width="30"
						height="130"
						fill="#0D0B1E"
						stroke="#534AB7"
						strokeWidth="1.5"
					/>
					<rect
						x="140"
						y="120"
						width="30"
						height="130"
						fill="#0D0B1E"
						stroke="#534AB7"
						strokeWidth="1.5"
					/>
					{/* Spire */}
					<line
						x1="100"
						y1="50"
						x2="100"
						y2="20"
						stroke="#D4537E"
						strokeWidth="2"
					/>
					<circle cx="100" cy="15" r="5" fill="#D4537E" />
				</svg>
			</div>
		</div>
	);
};

export default CitySkyline;
