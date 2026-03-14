import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, useFBO } from "@react-three/drei";
import * as THREE from "three";

interface LiquidGlassProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  thickness?: number;
  roughness?: number;
  chromaticAberration?: number;
  ior?: number;
  transmission?: number;
  geometry?: "plane" | "roundedBox" | "sphere";
  args?: any[]; // Allow passing specific geometry arguments
}

export const LiquidGlass = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  thickness = 2,
  roughness = 0.05,
  chromaticAberration = 0.05,
  ior = 1.5,
  transmission = 1,
  geometry = "plane",
  args,
}: LiquidGlassProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Optional: Add subtle breathing/floating animation to purely decorative glass meshes
    // If it's used as a backdrop for UI, you might want to keep it still or tie it to scroll/mouse.
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      {geometry === "plane" && <planeGeometry args={args || [10, 10, 32, 32]} />}
      {geometry === "roundedBox" && <boxGeometry args={args || [1, 1, 0.1, 16, 16, 16]} />}
      {geometry === "sphere" && <sphereGeometry args={args || [1, 64, 64]} />}

      <MeshTransmissionMaterial
        backside
        samples={4}
        thickness={thickness}
        roughness={roughness}
        chromaticAberration={chromaticAberration}
        anisotropy={1}
        ior={ior}
        transmission={transmission}
        distortion={0.5}
        distortionScale={0.5}
        temporalDistortion={0.1}
        color="#ffffff"
      />
    </mesh>
  );
};
