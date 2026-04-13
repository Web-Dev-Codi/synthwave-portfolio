import gsap from "gsap";
import { useEffect, useRef } from "react";

interface CitySkylineProps {
	scrollProgress: number;
	isVisible: boolean;
}

export const CitySkyline = ({
	scrollProgress,
	isVisible,
}: CitySkylineProps) => {
	const skylineRef = useRef<HTMLDivElement>(null);
	const windowsRef = useRef<NodeListOf<SVGRectElement> | null>(null);

	useEffect(() => {
		if (!skylineRef.current || !isVisible) return;

		const svg = skylineRef.current.querySelector("svg");
		if (!svg) return;

		const skylineGroup = svg.querySelector("#skyline");
		windowsRef.current = svg.querySelectorAll(".window");

		const tl = gsap.timeline();

		if (skylineGroup) {
			tl.fromTo(
				skylineGroup,
				{ y: 400, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1.2,
					ease: "power3.out",
				},
				0,
			);
		}

		if (windowsRef.current) {
			tl.fromTo(
				windowsRef.current,
				{ opacity: 0 },
				{
					opacity: 1,
					duration: 0.2,
					stagger: 0.05,
					ease: "power2.out",
				},
				0.8,
			);
		}

		return () => {
			tl.kill();
		};
	}, [isVisible]);

	return (
		<div
			ref={skylineRef}
			className="absolute bottom-0 left-0 w-full h-[60%] z-10"
		>
			{/* Embed SVG directly to avoid SVGR issues */}
			<svg
				viewBox="0 0 1200 400"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="none"
				className="w-full h-full"
			>
				<defs>
					<linearGradient
						id="buildingGradient"
						x1="0%"
						y1="0%"
						x2="0%"
						y2="100%"
					>
						<stop offset="0%" style={{ stopColor: "#1e1b4b" }} />
						<stop offset="100%" style={{ stopColor: "#0f172a" }} />
					</linearGradient>
					<linearGradient id="windowGlow" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" style={{ stopColor: "#22d3ee" }} />
						<stop offset="100%" style={{ stopColor: "#a855f7" }} />
					</linearGradient>
				</defs>

				{/* Background buildings */}
				<g id="skyline">
					<rect
						x="0"
						y="200"
						width="80"
						height="200"
						fill="url(#buildingGradient)"
					/>
					<rect
						x="80"
						y="150"
						width="60"
						height="250"
						fill="url(#buildingGradient)"
					/>
					<rect
						x="140"
						y="180"
						width="100"
						height="220"
						fill="url(#buildingGradient)"
					/>
					<rect
						x="240"
						y="120"
						width="70"
						height="280"
						fill="url(#buildingGradient)"
					/>
					<rect
						x="310"
						y="160"
						width="90"
						height="240"
						fill="url(#buildingGradient)"
					/>
					<rect
						x="400"
						y="100"
						width="120"
						height="300"
						fill="url(#buildingGradient)"
					/>
					<rect
						x="520"
						y="140"
						width="80"
						height="260"
						fill="url(#buildingGradient)"
					/>
					<rect
						x="600"
						y="180"
						width="100"
						height="220"
						fill="url(#buildingGradient)"
					/>
					<rect
						x="700"
						y="110"
						width="90"
						height="290"
						fill="url(#buildingGradient)"
					/>
					<rect
						x="790"
						y="150"
						width="70"
						height="250"
						fill="url(#buildingGradient)"
					/>
					<rect
						x="860"
						y="190"
						width="110"
						height="210"
						fill="url(#buildingGradient)"
					/>
					<rect
						x="970"
						y="130"
						width="80"
						height="270"
						fill="url(#buildingGradient)"
					/>
					<rect
						x="1050"
						y="170"
						width="150"
						height="230"
						fill="url(#buildingGradient)"
					/>
				</g>

				{/* Window lights */}
				<g id="windows">
					<rect
						x="20"
						y="220"
						width="8"
						height="12"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="35"
						y="220"
						width="8"
						height="12"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="20"
						y="240"
						width="8"
						height="12"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="35"
						y="240"
						width="8"
						height="12"
						fill="url(#windowGlow)"
						className="window"
					/>

					<rect
						x="100"
						y="170"
						width="10"
						height="15"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="115"
						y="170"
						width="10"
						height="15"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="100"
						y="195"
						width="10"
						height="15"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="115"
						y="195"
						width="10"
						height="15"
						fill="url(#windowGlow)"
						className="window"
					/>

					<rect
						x="260"
						y="140"
						width="12"
						height="18"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="280"
						y="140"
						width="12"
						height="18"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="260"
						y="168"
						width="12"
						height="18"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="280"
						y="168"
						width="12"
						height="18"
						fill="url(#windowGlow)"
						className="window"
					/>

					<rect
						x="420"
						y="120"
						width="15"
						height="20"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="445"
						y="120"
						width="15"
						height="20"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="470"
						y="120"
						width="15"
						height="20"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="420"
						y="150"
						width="15"
						height="20"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="445"
						y="150"
						width="15"
						height="20"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="470"
						y="150"
						width="15"
						height="20"
						fill="url(#windowGlow)"
						className="window"
					/>

					<rect
						x="720"
						y="130"
						width="10"
						height="16"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="735"
						y="130"
						width="10"
						height="16"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="720"
						y="156"
						width="10"
						height="16"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="735"
						y="156"
						width="10"
						height="16"
						fill="url(#windowGlow)"
						className="window"
					/>

					<rect
						x="990"
						y="150"
						width="12"
						height="18"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="1010"
						y="150"
						width="12"
						height="18"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="990"
						y="178"
						width="12"
						height="18"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="1010"
						y="178"
						width="12"
						height="18"
						fill="url(#windowGlow)"
						className="window"
					/>

					<rect
						x="1080"
						y="190"
						width="14"
						height="20"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="1105"
						y="190"
						width="14"
						height="20"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="1130"
						y="190"
						width="14"
						height="20"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="1080"
						y="220"
						width="14"
						height="20"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="1105"
						y="220"
						width="14"
						height="20"
						fill="url(#windowGlow)"
						className="window"
					/>
					<rect
						x="1130"
						y="220"
						width="14"
						height="20"
						fill="url(#windowGlow)"
						className="window"
					/>
				</g>

				{/* Neon outlines on building tops */}
				<path
					d="M0,200 L80,200 L80,200 L0,200"
					stroke="#22d3ee"
					strokeWidth="2"
					fill="none"
				/>
				<path
					d="M80,150 L140,150 L140,150 L80,150"
					stroke="#a855f7"
					strokeWidth="2"
					fill="none"
				/>
				<path
					d="M240,120 L310,120 L310,120 L240,120"
					stroke="#22d3ee"
					strokeWidth="2"
					fill="none"
				/>
				<path
					d="M400,100 L520,100 L520,100 L400,100"
					stroke="#d946ef"
					strokeWidth="2"
					fill="none"
				/>
				<path
					d="M700,110 L790,110 L790,110 L700,110"
					stroke="#a855f7"
					strokeWidth="2"
					fill="none"
				/>
			</svg>
		</div>
	);
};

export default CitySkyline;
