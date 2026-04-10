import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/useScrollAnimation";
import { cn } from "../utils/cn";
import type { SynthGridCanvasProps } from "./SynthGridCanvas.types";

const SynthGridCanvas = ({
	className,
	revealProgress = 1,
}: SynthGridCanvasProps) => {
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

			// Thinner 0.5px lines for subtle grid effect
			context.lineWidth = 0.5;

			// Horizon line - vibrant pink (#ff2975)
			context.strokeStyle = `rgba(255, 41, 117, ${0.55 + reveal * 0.25})`;
			context.beginPath();
			context.moveTo(0, horizonY);
			context.lineTo(width, horizonY);
			context.stroke();

			const verticalLineCount = Math.max(9, Math.floor(width / 92));

			// Vertical perspective lines - pink gradient
			for (
				let index = -verticalLineCount;
				index <= verticalLineCount;
				index += 1
			) {
				const ratio = index / verticalLineCount;
				const bottomX = vanishingPointX + ratio * width * 0.78;
				const opacity = 0.15 + reveal * 0.35;

				context.beginPath();
				context.strokeStyle = `rgba(255, 41, 117, ${opacity})`;
				context.moveTo(vanishingPointX, horizonY);
				context.lineTo(bottomX, height);
				context.stroke();
			}

			const horizontalLineCount = 16;

			// Horizontal moving lines - cyan to purple gradient based on depth
			for (let index = 0; index <= horizontalLineCount; index += 1) {
				const depth = (index / horizontalLineCount + travel) % 1;
				const easedDepth = depth * depth;
				const y = horizonY + easedDepth * floorDepth;
				const halfWidth = width * (0.08 + easedDepth * 0.74);
				const opacity = 0.12 + easedDepth * (0.5 + reveal * 0.15);

				// Blend between cyan (near) and purple (far)
				const r = Math.floor(0 + easedDepth * 140);
				const g = Math.floor(208 - easedDepth * 178);
				const b = Math.floor(255 - easedDepth * 17);

				context.beginPath();
				context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
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
