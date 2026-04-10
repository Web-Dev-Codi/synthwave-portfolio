import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/useScrollAnimation";

type VHSNoiseCanvasProps = {
	className?: string;
};

const VHSNoiseCanvas = ({ className }: VHSNoiseCanvasProps) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const prefersReducedMotion = usePrefersReducedMotion();

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let animationFrameId = 0;
		let frameCount = 0;
		const NOISE_ALPHA = 18;

		const drawNoise = () => {
			const { width, height } = canvas;
			const imageData = ctx.createImageData(width, height);
			const data = imageData.data;
			for (let i = 0; i < data.length; i += 4) {
				const v = Math.random() > 0.5 ? 255 : 0;
				data[i] = v;
				data[i + 1] = v;
				data[i + 2] = v;
				data[i + 3] = NOISE_ALPHA;
			}
			ctx.putImageData(imageData, 0, 0);
		};

		const handleResize = () => {
			const dpr = window.devicePixelRatio || 1;
			const bounds = canvas.getBoundingClientRect();
			canvas.width = Math.floor(bounds.width * dpr);
			canvas.height = Math.floor(bounds.height * dpr);
			if (prefersReducedMotion) drawNoise();
		};

		const loop = () => {
			frameCount++;
			if (frameCount % 3 === 0) drawNoise();
			animationFrameId = requestAnimationFrame(loop);
		};

		handleResize();

		if (prefersReducedMotion) {
			drawNoise();
		} else {
			animationFrameId = requestAnimationFrame(loop);
		}

		window.addEventListener("resize", handleResize);
		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener("resize", handleResize);
		};
	}, [prefersReducedMotion]);

	return (
		<canvas
			ref={canvasRef}
			className={
				className ??
				"pointer-events-none absolute inset-0 z-3 h-full w-full opacity-[0.045] mix-blend-screen"
			}
		/>
	);
};

export default VHSNoiseCanvas;
