import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/useScrollAnimation";
import { cn } from "../utils/cn";

type SynthGridProps = {
	className?: string;
	revealProgress?: number;
};

const SynthGridCanvas = ({ className, revealProgress = 1 }: SynthGridProps) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
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
			const bounds = canvas.getBoundingClientRect();
			const devicePixelRatio = window.devicePixelRatio || 1;

			canvas.width = Math.floor(bounds.width * devicePixelRatio);
			canvas.height = Math.floor(bounds.height * devicePixelRatio);
			context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
		};

		const renderFrame = (time: number) => {
			const bounds = canvas.getBoundingClientRect();
			const width = bounds.width;
			const height = bounds.height;
			const horizonY = height * 0.16;
			const floorDepth = height - horizonY;
			const vanishingPointX = width / 2;
			const travel = prefersReducedMotion ? 0.18 : (time * 0.00024) % 1;
			const reveal = Math.max(0.2, Math.min(1, revealProgress));

			context.clearRect(0, 0, width, height);

			context.lineWidth = 1;
			context.strokeStyle = `rgba(212, 83, 126, ${0.45 + reveal * 0.18})`;
			context.beginPath();
			context.moveTo(0, horizonY);
			context.lineTo(width, horizonY);
			context.stroke();

			const verticalLineCount = Math.max(9, Math.floor(width / 92));

			for (
				let index = -verticalLineCount;
				index <= verticalLineCount;
				index += 1
			) {
				const ratio = index / verticalLineCount;
				const bottomX = vanishingPointX + ratio * width * 0.78;

				context.beginPath();
				context.strokeStyle = `rgba(212, 83, 126, ${0.12 + reveal * 0.28})`;
				context.moveTo(vanishingPointX, horizonY);
				context.lineTo(bottomX, height);
				context.stroke();
			}

			const horizontalLineCount = 16;

			for (let index = 0; index <= horizontalLineCount; index += 1) {
				const depth = (index / horizontalLineCount + travel) % 1;
				const easedDepth = depth * depth;
				const y = horizonY + easedDepth * floorDepth;
				const halfWidth = width * (0.08 + easedDepth * 0.74);
				const opacity = 0.1 + easedDepth * (0.42 + reveal * 0.12);

				context.beginPath();
				context.strokeStyle = `rgba(127, 119, 221, ${opacity})`;
				context.moveTo(vanishingPointX - halfWidth, y);
				context.lineTo(vanishingPointX + halfWidth, y);
				context.stroke();
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
	}, [prefersReducedMotion, revealProgress]);

	return (
		<canvas
			className={cn(
				"pointer-events-none absolute inset-x-0 bottom-0 h-full w-full",
				className,
			)}
			ref={canvasRef}
		/>
	);
};

export default SynthGridCanvas;
