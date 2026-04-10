import { motion } from "framer-motion";
import { hexToRgba } from "../../../utils/colorUtils";
import type { SkillIconProps } from "./SkillIcon.types";
import { defaultSkillSize, prefersReducedMotion } from "./SkillIcon.types";

export const SkillIcon = ({
	icon: Icon,
	name,
	color,
	size = defaultSkillSize,
}: SkillIconProps) => {
	const rgba50 = hexToRgba(color, 0.5);
	const rgba25 = hexToRgba(color, 0.25);
	const rgba38 = hexToRgba(color, 0.38);
	const rgba6 = hexToRgba(color, 0.06);
	const rgba19 = hexToRgba(color, 0.19);
	const rgba60 = hexToRgba(color, 0.6);
	const rgba20 = hexToRgba(color, 0.2);

	const baseStyles = {
		filter: `drop-shadow(0 0 4px ${rgba50}) drop-shadow(0 0 8px ${rgba25})`,
		color,
	};

	const cardStyles = {
		border: `1px solid ${rgba38}`,
		boxShadow: `0 0 8px ${rgba19}, inset 0 0 8px ${rgba6}`,
	};

	const reducedMotion = prefersReducedMotion();

	return (
		<motion.div
			className="rounded-xl bg-[#100E24] p-3 flex flex-col items-center gap-2 cursor-pointer"
			whileHover={
				reducedMotion
					? {}
					: {
							filter: `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 16px ${rgba60})`,
							boxShadow: `0 0 16px ${rgba60}, inset 0 0 12px ${rgba20}`,
							y: -4,
						}
			}
			transition={{ duration: 0.2 }}
			style={cardStyles}
		>
			<div style={baseStyles}>
				<Icon size={size} />
			</div>
			<span
				className="font-['Press_Start_2P'] text-[8px] text-center"
				style={{ color }}
			>
				{name}
			</span>
		</motion.div>
	);
};

export default SkillIcon;
