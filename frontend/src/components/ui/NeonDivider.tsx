import type { NeonDividerProps } from "./NeonDivider.types";

export const NeonDivider = ({ color = "pink" }: NeonDividerProps) => (
	<div aria-hidden="true" className={`neon-divider neon-divider-${color}`} />
);

export default NeonDivider;
