import Particles from "@tsparticles/react";

interface StarfieldProps {
	isVisible: boolean;
}

export const Starfield = ({ isVisible }: StarfieldProps) => {
	if (!isVisible) return null;

	return (
		<Particles
			id="starfield"
			className="absolute inset-0 z-0"
			options={{
				fpsLimit: 60,
				particles: {
					number: {
						value: 150,
					},
					color: {
						value: ["#ffffff", "#e0e7ff", "#c4b5fd"],
					},
					shape: {
						type: "circle",
					},
					opacity: {
						value: { min: 0.3, max: 0.8 },
						animation: {
							enable: true,
							speed: 0.5,
							sync: false,
						},
					},
					size: {
						value: { min: 1, max: 3 },
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
					},
				},
				detectRetina: true,
			}}
		/>
	);
};

export default Starfield;
