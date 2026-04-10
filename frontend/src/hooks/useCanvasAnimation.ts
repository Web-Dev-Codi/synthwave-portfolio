import { useEffect, useRef } from "react";

type UseCanvasAnimationOptions = {
	enabled?: boolean;
	onResize?: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => void;
	onRender?: (
		canvas: HTMLCanvasElement,
		context: CanvasRenderingContext2D,
		time: number,
	) => void;
	shouldAnimate?: boolean;
};

export const useCanvasAnimation = ({
	enabled = true,
	onResize,
	onRender,
	shouldAnimate = true,
}: UseCanvasAnimationOptions = {}) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (!enabled) return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		const context = canvas.getContext("2d");
		if (!context) return;

		let animationFrameId = 0;

		const resizeCanvas = () => {
			const bounds = canvas.getBoundingClientRect();
			const devicePixelRatio = window.devicePixelRatio || 1;
			canvas.width = Math.floor(bounds.width * devicePixelRatio);
			canvas.height = Math.floor(bounds.height * devicePixelRatio);
			context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
			onResize?.(canvas, context);
		};

		const renderFrame = (time: number) => {
			onRender?.(canvas, context, time);
			if (shouldAnimate) {
				animationFrameId = window.requestAnimationFrame(renderFrame);
			}
		};

		resizeCanvas();
		if (shouldAnimate) {
			animationFrameId = window.requestAnimationFrame(renderFrame);
		} else {
			onRender?.(canvas, context, 0);
		}

		window.addEventListener("resize", resizeCanvas);

		return () => {
			window.removeEventListener("resize", resizeCanvas);
			window.cancelAnimationFrame(animationFrameId);
		};
	}, [enabled, onResize, onRender, shouldAnimate]);

	return canvasRef;
};
