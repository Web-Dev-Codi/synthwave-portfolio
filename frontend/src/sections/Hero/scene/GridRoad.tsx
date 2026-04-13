import { useRef, useLayoutEffect, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GridRoadProps {
	timelineRef?: React.RefObject<gsap.core.Timeline | null>;
}

export const GridRoad = ({ timelineRef }: GridRoadProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<number>(0);
	const [isActive, setIsActive] = useState(false);

	useLayoutEffect(() => {
		if (!timelineRef?.current || !containerRef.current) return;

		const tl = timelineRef.current;

		// Set initial state
		gsap.set(containerRef.current, { opacity: 0 });

		// Road fades in
		tl.to(
			containerRef.current,
			{
				opacity: 1,
				duration: 0.5,
				ease: "power2.out",
				onStart: () => setIsActive(true),
			},
			0.6,
		);
	}, [timelineRef]);

	// Canvas animation for neon grid
	useEffect(() => {
		if (!isActive || !canvasRef.current) return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const resize = () => {
			canvas.width = canvas.offsetWidth * window.devicePixelRatio;
			canvas.height = canvas.offsetHeight * window.devicePixelRatio;
			ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
		};

		resize();
		window.addEventListener("resize", resize);

		let offset = 0;
		const speed = 2;

		const draw = () => {
			const width = canvas.offsetWidth;
			const height = canvas.offsetHeight;

			// Clear
			ctx.clearRect(0, 0, width, height);

			const horizonY = height * 0.3;
			const gridBottom = height;

			// Vertical lines (perspective)
			const centerX = width / 2;
			const numVerticalLines = 20;

			ctx.strokeStyle = "rgba(212, 83, 126, 0.6)";
			ctx.lineWidth = 1;

			for (let i = 0; i <= numVerticalLines; i++) {
				const t = (i / numVerticalLines - 0.5) * 2;
				const topX = centerX + t * width * 0.1;
				const bottomX = centerX + t * width * 1.5;

				ctx.beginPath();
				ctx.moveTo(topX, horizonY);
				ctx.lineTo(bottomX, gridBottom);
				ctx.stroke();
			}

			// Horizontal lines (moving)
			const numHorizontalLines = 15;
			const maxDistance = gridBottom - horizonY;

			for (let i = 0; i < numHorizontalLines; i++) {
				// Perspective distribution
				const rawT = i / numHorizontalLines;
				const animatedT = (rawT + offset) % 1;
				const perspectiveT = Math.pow(animatedT, 3);
				const y = horizonY + perspectiveT * maxDistance;

				// Fade out near horizon
				const alpha = 0.3 + perspectiveT * 0.7;
				ctx.strokeStyle = `rgba(212, 83, 126, ${alpha})`;
				ctx.lineWidth = 1 + perspectiveT * 2;

				// Width expands with perspective
				const lineWidth = width * (0.1 + perspectiveT * 1.4);
				const startX = centerX - lineWidth / 2;
				const endX = centerX + lineWidth / 2;

				ctx.beginPath();
				ctx.moveTo(startX, y);
				ctx.lineTo(endX, y);
				ctx.stroke();
			}

			// Horizon glow line
			const gradient = ctx.createLinearGradient(0, horizonY - 5, 0, horizonY + 5);
			gradient.addColorStop(0, "transparent");
			gradient.addColorStop(0.5, "rgba(212, 83, 126, 0.8)");
			gradient.addColorStop(1, "transparent");
			ctx.fillStyle = gradient;
			ctx.fillRect(0, horizonY - 5, width, 10);

			offset += speed / 100;
			animationRef.current = requestAnimationFrame(draw);
		};

		draw();

		return () => {
			window.removeEventListener("resize", resize);
			cancelAnimationFrame(animationRef.current);
		};
	}, [isActive]);

	return (
		<div
			ref={containerRef}
			className="pointer-events-none absolute inset-0 z-0"
			style={{
				perspective: "1000px",
			}}
		>
			<canvas
				ref={canvasRef}
				className="h-full w-full"
				style={{
					transform: "rotateX(60deg)",
					transformOrigin: "center top",
				}}
			/>
		</div>
	);
};

export default GridRoad;
