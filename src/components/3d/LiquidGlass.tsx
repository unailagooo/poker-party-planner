import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface LiquidGlassProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  geometry?: "plane" | "roundedBox" | "sphere";
  args?: any[];
}

export const LiquidGlass = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  geometry = "plane",
  args,
}: LiquidGlassProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      {geometry === "plane" && <planeGeometry args={args || [10, 10, 32, 32]} />}
      {geometry === "roundedBox" && <boxGeometry args={args || [1, 1, 0.1, 16, 16, 16]} />}
      {geometry === "sphere" && <sphereGeometry args={args || [1, 64, 64]} />}

      {/* Fallback Material para comprobar si el error es de MeshTransmissionMaterial */}
      <meshPhysicalMaterial 
        transmission={0.9} 
        opacity={1} 
        metalness={0.1} 
        roughness={0.1} 
        ior={1.5} 
        thickness={0.5} 
        color="#ffffff" 
      />
    </mesh>
  );
};
