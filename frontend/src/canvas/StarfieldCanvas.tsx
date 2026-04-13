import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/useScrollAnimation";
import { cn } from "../utils/cn";
import type { Star, StarfieldCanvasProps } from "./StarfieldCanvas.types";

const starColors = [
	"rgba(255,255,255,0.95)",
	"rgba(223,233,255,0.95)",
	"rgba(93,202,165,0.9)",
	"rgba(212,83,126,0.88)",
	"rgba(175,169,236,0.92)",
] as const;

const withAlpha = (rgbaColor: string, alpha: number) =>
	rgbaColor.replace(/,\s*([0-9.]+)\)$/, `, ${alpha})`);

const createStars = (width: number, height: number) => {
	const area = width * height;
	const starCount = Math.max(90, Math.floor(area / 9500));

	return Array.from(
		{ length: starCount },
		() =>
			({
				baseOpacity: 0.28 + Math.random() * 0.62,
				color:
					starColors[Math.floor(Math.random() * starColors.length)] ??
					starColors[0],
				radius: 0.45 + Math.random() * 1.7,
				twinkleOffset: Math.random() * Math.PI * 2,
				twinkleSpeed: 0.7 + Math.random() * 1.5,
				x: Math.random() * width,
				y: Math.random() * height,
			}) satisfies Star,
	);
};

const StarfieldCanvas = ({ className }: StarfieldCanvasProps) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const starsRef = useRef<Star[]>([]);
	const prefersReducedMotion = usePrefersReducedMotion();

	useEffect(() => {
		const canvas = canvasRef.current;

		if (!canvas) {
			return;
		}

		const context = canvas.getContext("2d");

		if (!context) {
			return;
		}

		let animationFrameId = 0;

		const resizeCanvas = () => {
			const devicePixelRatio = window.devicePixelRatio || 1;
			const width = window.innerWidth;
			const height = window.innerHeight;

			canvas.width = Math.floor(width * devicePixelRatio);
			canvas.height = Math.floor(height * devicePixelRatio);
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
			starsRef.current = createStars(width, height);
		};

		const renderFrame = (time: number) => {
			const width = window.innerWidth;
			const height = window.innerHeight;

			context.clearRect(0, 0, width, height);

			for (const star of starsRef.current) {
				const twinkle = prefersReducedMotion
					? 1
					: 0.55 +
						0.45 *
							Math.sin(time * 0.0012 * star.twinkleSpeed + star.twinkleOffset);
				const opacity = Math.max(0.15, Math.min(1, star.baseOpacity * twinkle));

				context.beginPath();
				context.fillStyle = withAlpha(star.color, opacity);
				context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
				context.fill();
			}

			if (!prefersReducedMotion) {
				animationFrameId = window.requestAnimationFrame(renderFrame);
			}
		};

		resizeCanvas();

		if (prefersReducedMotion) {
			renderFrame(0);
		} else {
			animationFrameId = window.requestAnimationFrame(renderFrame);
		}

		window.addEventListener("resize", resizeCanvas);

		return () => {
			window.removeEventListener("resize", resizeCanvas);
			window.cancelAnimationFrame(animationFrameId);
		};
	}, [prefersReducedMotion]);

	return (
		<canvas
			className={cn("pointer-events-none fixed inset-0 z-0", className)}
			ref={canvasRef}
		/>
	);
};

export default StarfieldCanvas;
