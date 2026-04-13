import { useEffect, useMemo, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

interface StarfieldProps {
	isActive: boolean;
}

export const Starfield = ({ isActive }: StarfieldProps) => {
	const engineInitialized = useRef(false);

	useEffect(() => {
		if (!engineInitialized.current) {
			initParticlesEngine(async (engine: Engine) => {
				await loadSlim(engine);
			});
			engineInitialized.current = true;
		}
	}, []);

	const options: ISourceOptions = useMemo(
		() => ({
			fullScreen: false,
			background: {
				color: "transparent",
			},
			particles: {
				number: {
					value: 150,
					density: {
						enable: true,
						area: 800,
					},
				},
				color: {
					value: ["#FFFFFF", "#EEEDFE", "#5DCAA5"],
				},
				shape: {
					type: "circle",
				},
				opacity: {
					value: { min: 0.3, max: 1 },
					animation: {
						enable: true,
						speed: 0.5,
						sync: false,
					},
				},
				size: {
					value: { min: 0.5, max: 2 },
				},
				move: {
					enable: false,
				},
			},
			interactivity: {
				events: {
					onHover: {
						enable: false,
					},
					onClick: {
						enable: false,
					},
				},
			},
			detectRetina: true,
		}),
		[],
	);

	if (!isActive) {
		return null;
	}

	return (
		<div className="pointer-events-none absolute inset-0 z-0">
			<Particles id="hero-starfield" options={options} className="h-full w-full" />
		</div>
	);
};

export default Starfield;
