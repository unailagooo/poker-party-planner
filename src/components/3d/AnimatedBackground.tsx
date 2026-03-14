import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Blob({ position, color, speed, offset }: { position: [number, number, number], color: string, speed: number, offset: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Use useMemo to avoid recreating uniform objects
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
    }),
    [color]
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    // Gentle floating motion
    meshRef.current.position.y = position[1] + Math.sin(time * speed + offset) * 1.5;
    meshRef.current.position.x = position[0] + Math.cos(time * speed * 0.8 + offset) * 1.5;
    
    // Deform geometry slightly
    if (meshRef.current.material) {
        // Simple procedural animation if we were using a custom shader, 
        // but for standard material we just rotate/scale
        meshRef.current.rotation.x = time * 0.2;
        meshRef.current.rotation.y = time * 0.3;
        
        const scaleBase = 1 + Math.sin(time * speed * 1.2 + offset) * 0.1;
        meshRef.current.scale.setScalar(scaleBase);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.1}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

export const AnimatedBackground = () => {
  return (
    <group>
      {/* Ambient and directional lights to illuminate the blobs and provide highlights for the glass */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#00ffff" />
      <pointLight position={[0, 0, 5]} intensity={3} color="#ff00ff" />

      {/* Floating colored blobs in the background */}
      <Blob position={[-3, 2, -5]} color="#10b981" speed={0.4} offset={0} /> {/* Emerald */}
      <Blob position={[4, -2, -6]} color="#6366f1" speed={0.3} offset={Math.PI / 2} /> {/* Indigo */}
      <Blob position={[-2, -4, -4]} color="#f59e0b" speed={0.5} offset={Math.PI} /> {/* Amber */}
      <Blob position={[5, 4, -7]} color="#ec4899" speed={0.2} offset={Math.PI * 1.5} /> {/* Pink */}

      {/* A dark background plane to give depth and contrast */}
      <mesh position={[0, 0, -15]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial color="#09090b" /> {/* Tailwind zinc-950 */}
      </mesh>
    </group>
  );
};
