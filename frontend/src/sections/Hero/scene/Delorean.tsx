import { useEffect, useRef } from "react";
import gsap from "gsap";

interface DeloreanProps {
	scrollProgress: number;
	isVisible: boolean;
}

export const Delorean = ({ scrollProgress, isVisible }: DeloreanProps) => {
	const carRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!carRef.current || !isVisible) return;

		const tl = gsap.timeline({ paused: true });

		tl.fromTo(
			carRef.current,
			{ x: -400, opacity: 0 },
			{
				x: 0,
				opacity: 1,
				duration: 1.5,
				ease: "power2.out",
			},
			0,
		);

		return () => {
			tl.kill();
		};
	}, [isVisible]);

	useEffect(() => {
		if (!isVisible) return;

		const allTl = gsap.globalTimeline;
		if (allTl) {
			allTl.progress(scrollProgress);
		}
	}, [scrollProgress, isVisible]);

	return (
		<div
			ref={carRef}
			className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-24 sm:w-64 sm:h-32 z-20"
		>
			{/* Simplified DeLorean SVG */}
			<svg viewBox="0 0 200 100" className="w-full h-full">
				{/* Car body */}
				<path
					d="M20,60 L40,40 L80,35 L140,35 L170,45 L190,60 L190,75 L20,75 Z"
					fill="#1e293b"
					stroke="#22d3ee"
					strokeWidth="2"
				/>
				{/* Windshield */}
				<path
					d="M50,42 L75,38 L130,38 L155,45 L155,55 L50,55 Z"
					fill="#0f172a"
					stroke="#a855f7"
					strokeWidth="1"
				/>
				{/* Wheels */}
				<circle
					cx="55"
					cy="75"
					r="18"
					fill="#334155"
					stroke="#22d3ee"
					strokeWidth="2"
					className="wheel"
				/>
				<circle
					cx="145"
					cy="75"
					r="18"
					fill="#334155"
					stroke="#22d3ee"
					strokeWidth="2"
					className="wheel"
				/>
				{/* Wheel spokes */}
				<g className="wheel-spokes">
					<line x1="55" y1="57" x2="55" y2="93" stroke="#22d3ee" strokeWidth="1" />
					<line x1="37" y1="75" x2="73" y2="75" stroke="#22d3ee" strokeWidth="1" />
					<line x1="145" y1="57" x2="145" y2="93" stroke="#22d3ee" strokeWidth="1" />
					<line x1="127" y1="75" x2="163" y2="75" stroke="#22d3ee" strokeWidth="1" />
				</g>
			</svg>

			<style>{`
				.wheel {
					animation: spin 0.3s linear infinite;
				}
				@keyframes spin {
					from { transform: rotate(0deg); transform-origin: center; }
					to { transform: rotate(360deg); transform-origin: center; }
				}
			`}</style>
		</div>
	);
};

export default Delorean;
