import { Canvas } from "@react-three/fiber";
import { AnimatedBackground } from "./AnimatedBackground";
import { LiquidGlass } from "./LiquidGlass";

export const Scene = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: false }} // alpha false because we draw a background plane
        dpr={[1, 2]} // Support retina displays
      >
        <color attach="background" args={["#000000"]} />
        
        <AnimatedBackground />

        {/* Global Liquid Glass Layer overlaying everything slightly to tie it together */}
        {/* We place a large thin glass plane very close to the camera */}
        <LiquidGlass 
          position={[0, 0, 3]} 
          scale={[15, 15, 1]} 
          geometry="plane" 
          thickness={0.5}
          roughness={0.1}
          chromaticAberration={0.03}
          transmission={1}
          ior={1.2}
        />
        
        {/* Decorative glass orbs */}
        <LiquidGlass 
          position={[-2, 1, 1]} 
          geometry="sphere" 
          args={[1, 64, 64]} 
          thickness={2}
          ior={1.5}
          chromaticAberration={0.05}
        />
        <LiquidGlass 
          position={[2.5, -1.5, 0.5]} 
          geometry="sphere" 
          args={[0.8, 64, 64]} 
          thickness={1.5}
          ior={1.4}
          chromaticAberration={0.04}
        />
      </Canvas>
    </div>
  );
};
