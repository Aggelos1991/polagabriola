import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sparkles, MeshDistortMaterial, Float, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Wrapper component to make sparkles "breathe" and rotate
const PulsingSparkles = ({ count, scale, size, speed, opacity, color, pulseSpeed = 0.5 }: any) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      const breathe = 1 + Math.sin(t * pulseSpeed) * 0.1;
      groupRef.current.scale.setScalar(breathe);
      groupRef.current.rotation.y = t * 0.02 * pulseSpeed;
    }
  });

  const Group = 'group' as any;

  return (
    <Group ref={groupRef}>
      <Sparkles 
        count={count} 
        scale={scale} 
        size={size} 
        speed={speed} 
        opacity={opacity} 
        color={color} 
      />
    </Group>
  );
};

const OrganicOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating rotation
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
      <Sphere args={[1, 128, 128]} scale={2.2} ref={meshRef}>
        {/* Solid, organic liquid material instead of wireframe */}
        <MeshDistortMaterial
          color="#be185d" // Deep Pink base
          attach="material"
          distort={0.3} // Subtle liquid distortion
          speed={1.5} // Slower, more natural movement
          roughness={0.1} // Glossy
          metalness={0.1} // Slightly reflective but mostly organic
          transparent
          opacity={0.3} // See-through like water/glass
          depthWrite={false}
        />
      </Sphere>
    </Float>
  );
};

// New component to handle responsive logic inside the Canvas context
const SceneContent = () => {
  const { viewport } = useThree();
  // Heuristic: Width < 7 usually indicates mobile portrait in this camera setup (fov 45, z=5)
  const isMobile = viewport.width < 7;
  
  // Scale down 3D elements on mobile to fit the screen comfortably
  const scale = isMobile ? 0.6 : 1;

  // Safe usage of R3F intrinsics to avoid type errors
  const AmbientLight = 'ambientLight' as any;
  const DirectionalLight = 'directionalLight' as any;
  const PointLight = 'pointLight' as any;
  const Group = 'group' as any;

  return (
    <>
      <AmbientLight intensity={0.4} />
      <DirectionalLight position={[10, 10, 5]} intensity={0.5} />
      <PointLight position={[-5, 5, -5]} color="#f9a8d4" intensity={1} />
      
      <Stars radius={100} depth={50} count={2000} factor={3} saturation={0} fade speed={0.5} />

      <Group scale={scale}>
        {/* Reduce particle count on mobile for performance */}
        <PulsingSparkles 
          count={isMobile ? 40 : 80} 
          scale={10} 
          size={1.5} 
          speed={0.2} 
          opacity={0.5} 
          color="#ffffff"
          pulseSpeed={0.2} 
        />
        
        <PulsingSparkles 
          count={isMobile ? 20 : 40} 
          scale={12} 
          size={3} 
          speed={0.1} 
          opacity={0.3} 
          color="#fbcfe8" // Pink-200
          pulseSpeed={0.4}
        />

        {/* Main Element: Organic Memory Bubble */}
        <Group position={[0, 0, -1]}>
           <OrganicOrb />
        </Group>
      </Group>
    </>
  );
};

export const BackgroundVisuals: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]} // sharper on high res screens
      >
        <SceneContent />
      </Canvas>
    </div>
  );
};