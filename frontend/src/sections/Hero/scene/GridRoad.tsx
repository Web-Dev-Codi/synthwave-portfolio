import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";

interface GridRoadProps {
	scrollProgress: number;
	isVisible: boolean;
}

function MovingGrid() {
	const gridRef = useRef<THREE.GridHelper>(null);
	const planeRef = useRef<THREE.Mesh>(null);

	useFrame((state) => {
		if (planeRef.current) {
			planeRef.current.position.z = (state.clock.elapsedTime * 2) % 1;
		}
	});

	return (
		<group position={[0, -0.5, 0]}>
			<gridHelper
				ref={gridRef}
				args={[100, 100, 0xff00ff, 0x22d3ee]}
				position={[0, 0, 0]}
			/>
			<mesh
				ref={planeRef}
				rotation={[-Math.PI / 2, 0, 0]}
				position={[0, -0.1, 0]}
			>
				<planeGeometry args={[100, 100]} />
				<meshBasicMaterial color="#0f172a" transparent opacity={0.8} />
			</mesh>
		</group>
	);
}

export const GridRoad = ({ isVisible }: GridRoadProps) => {
	if (!isVisible) return null;

	return (
		<div className="absolute bottom-0 left-0 w-full h-[30%] z-15">
			<Canvas camera={{ position: [0, 3, 5], fov: 75 }}>
				<PerspectiveCamera makeDefault position={[0, 2, 5]} fov={75} />
				<MovingGrid />
			</Canvas>
		</div>
	);
};

export default GridRoad;
