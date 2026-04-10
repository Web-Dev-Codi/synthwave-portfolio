export type StarfieldCanvasProps = {
	className?: string;
};

export type Star = {
	baseOpacity: number;
	color: string;
	radius: number;
	twinkleOffset: number;
	twinkleSpeed: number;
	x: number;
	y: number;
};
