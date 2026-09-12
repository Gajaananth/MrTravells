import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';

const LowPolyTourCar = lazy(() => import('./LowPolyTourCar'));

function CanvasFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#083321]/40 via-[#051810] to-[#0a422a]/40 border border-emerald-500/20 p-6 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.12),transparent_70%)] animate-pulse-subtle" />
      <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 border border-emerald-500/30">
        <span className="text-4xl">🚗</span>
      </div>
      <p className="text-emerald-300 font-serif text-lg font-semibold tracking-wide">Ceylon Luxury Touring</p>
      <p className="text-emerald-200/70 text-xs mt-1">Dedicated Sedan & Chauffeur Guide</p>
    </div>
  );
}

export default function CarCanvas() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [webGLAvailable, setWebGLAvailable] = useState(true);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebGLAvailable(false);
    } catch (e) {
      setWebGLAvailable(false);
    }

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!webGLAvailable) {
    return <CanvasFallback />;
  }

  return (
    <div className="w-full h-full min-h-[260px] sm:min-h-[340px] lg:min-h-[440px] relative select-none">
      <Suspense fallback={<CanvasFallback />}>
        <Canvas
          camera={{ position: [0, 2.5, 7], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          className="cursor-grab active:cursor-grabbing"
        >
          <LowPolyTourCar mouseX={mousePos.x} mouseY={mousePos.y} />
        </Canvas>
      </Suspense>

      {/* Interactive Micro-badge */}
      <div className="absolute top-12 sm:top-auto sm:bottom-3 right-3 pointer-events-none hidden xs:flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] sm:text-[11px] text-emerald-300">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Interactive 3D</span>
      </div>
    </div>
  );
}
