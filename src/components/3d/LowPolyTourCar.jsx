import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Low-poly Palm Tree element
function PalmTree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk with slight curve */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.22, 2.4, 6]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.9} flatShading />
      </mesh>
      {/* Fronds / Palm Leaves */}
      {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <group key={idx} position={[0, 2.3, 0]} rotation={[0.4, rad, 0.4]}>
            <mesh position={[0, 0, 0.7]} rotation={[-0.4, 0, 0]}>
              <coneGeometry args={[0.45, 1.5, 4]} />
              <meshStandardMaterial color="#1b7a43" roughness={0.7} flatShading />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Stylized Tour Car with Luggage Rack
function CarModel() {
  const carGroup = useRef();
  const frontWheels = useRef([]);
  const rearWheels = useRef([]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (carGroup.current) {
      // Gentle suspension bounce & forward tilt
      carGroup.current.position.y = -0.15 + Math.sin(t * 8) * 0.03;
      carGroup.current.rotation.z = Math.sin(t * 4) * 0.015;
      carGroup.current.rotation.x = Math.sin(t * 6) * 0.01;
    }
    // Rotate wheels
    const wheelRot = -t * 12;
    [...frontWheels.current, ...rearWheels.current].forEach((w) => {
      if (w) w.rotation.x = wheelRot;
    });
  });

  return (
    <group ref={carGroup} position={[0, -0.15, 0]}>
      {/* Lower Chassis / Body */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[1.7, 0.45, 3.6]} />
        <meshStandardMaterial color="#083e28" roughness={0.3} metalness={0.2} flatShading />
      </mesh>

      {/* Titanium Trim Accent Stripe (No white or yellow) */}
      <mesh position={[0, 0.38, 0]}>
        <boxGeometry args={[1.72, 0.08, 3.62]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Cabin / Windows Roof */}
      <mesh position={[0, 0.95, -0.15]} castShadow>
        <boxGeometry args={[1.4, 0.6, 2.1]} />
        <meshStandardMaterial color="#06291a" roughness={0.2} flatShading />
      </mesh>

      {/* Windshield & Glass */}
      <mesh position={[0, 0.92, 0.91]} rotation={[-0.35, 0, 0]}>
        <planeGeometry args={[1.3, 0.55]} />
        <meshStandardMaterial color="#99f6e4" roughness={0.1} transparent opacity={0.7} metalness={0.9} />
      </mesh>
      {/* Rear Window */}
      <mesh position={[0, 0.95, -1.22]} rotation={[Math.PI, 0, 0]}>
        <planeGeometry args={[1.3, 0.45]} />
        <meshStandardMaterial color="#99f6e4" roughness={0.1} transparent opacity={0.7} metalness={0.9} />
      </mesh>

      {/* Safari Roof Rack with Luggage */}
      <group position={[0, 1.3, -0.15]}>
        {/* Rack Rails */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.45, 0.06, 1.8]} />
          <meshStandardMaterial color="#222" metalness={0.8} />
        </mesh>
        {/* Leather Suitcase 1 (Deep Chestnut Leather - no yellow) */}
        <mesh position={[-0.3, 0.18, 0.2]} rotation={[0, 0.1, 0]}>
          <boxGeometry args={[0.55, 0.3, 0.7]} />
          <meshStandardMaterial color="#78350f" roughness={0.6} />
        </mesh>
        {/* Canvas Duffel Bag 2 (Deep Teal) */}
        <mesh position={[0.32, 0.15, -0.1]} rotation={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.75, 8]} />
          <meshStandardMaterial color="#0f766e" roughness={0.8} />
        </mesh>
        {/* Compact Travel Box (Slate Blue - no yellow) */}
        <mesh position={[-0.2, 0.35, 0.1]}>
          <boxGeometry args={[0.4, 0.15, 0.4]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>
      </group>

      {/* Modern Ice-Blue LED Headlights (No yellow or plain white) */}
      <mesh position={[-0.6, 0.45, 1.81]}>
        <boxGeometry args={[0.28, 0.18, 0.08]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={1.8} />
      </mesh>
      <mesh position={[0.6, 0.45, 1.81]}>
        <boxGeometry args={[0.28, 0.18, 0.08]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={1.8} />
      </mesh>

      {/* Front Bumper & Grill */}
      <mesh position={[0, 0.28, 1.82]}>
        <boxGeometry args={[1.5, 0.18, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} />
      </mesh>

      {/* Taillights */}
      <mesh position={[-0.6, 0.48, -1.81]}>
        <boxGeometry args={[0.28, 0.15, 0.08]} />
        <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[0.6, 0.48, -1.81]}>
        <boxGeometry args={[0.28, 0.15, 0.08]} />
        <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={1.5} />
      </mesh>

      {/* 4 Wheels with Rims */}
      {[
        { pos: [-0.9, 0.22, 1.05], isFront: true, index: 0 },
        { pos: [0.9, 0.22, 1.05], isFront: true, index: 1 },
        { pos: [-0.9, 0.22, -1.05], isFront: false, index: 2 },
        { pos: [0.9, 0.22, -1.05], isFront: false, index: 3 },
      ].map((wheel, i) => (
        <group
          key={i}
          position={wheel.pos}
          ref={(el) => {
            if (wheel.isFront) frontWheels.current[wheel.index] = el;
            else rearWheels.current[wheel.index - 2] = el;
          }}
        >
          {/* Tire */}
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.34, 0.34, 0.28, 16]} />
            <meshStandardMaterial color="#171717" roughness={0.9} />
          </mesh>
          {/* Gunmetal Titanium Rim (No gold/yellow) */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.29, 8]} />
            <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Infinite Moving Tropical Scenic Road
function MovingScenicRoad() {
  const roadGroup = useRef();
  const roadStripeGroup = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Move road stripes backward continuously
    if (roadStripeGroup.current) {
      roadStripeGroup.current.position.z = (t * 8) % 4;
    }
    if (roadGroup.current) {
      roadGroup.current.position.z = ((t * 4) % 10) - 5;
    }
  });

  return (
    <group position={[0, -0.3, 0]}>
      {/* Asphalt Road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.8, 30]} />
        <meshStandardMaterial color="#1e2420" roughness={0.8} />
      </mesh>

      {/* Road Shoulders / Curbs (Basalt Slate - no gold or yellow) */}
      <mesh position={[-1.95, 0.02, 0]}>
        <boxGeometry args={[0.3, 0.06, 30]} />
        <meshStandardMaterial color="#334155" roughness={0.5} />
      </mesh>
      <mesh position={[1.95, 0.02, 0]}>
        <boxGeometry args={[0.3, 0.06, 30]} />
        <meshStandardMaterial color="#334155" roughness={0.5} />
      </mesh>

      {/* Moving Center Line Dashes (Cyan LED reflectors - no yellow or white) */}
      <group ref={roadStripeGroup}>
        {[-16, -12, -8, -4, 0, 4, 8, 12, 16].map((z) => (
          <mesh key={z} position={[0, 0.02, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.16, 2.2]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        ))}
      </group>

      {/* Tropical Vegetation along the road */}
      <group ref={roadGroup}>
        <PalmTree position={[-3.2, 0, -6]} scale={1.1} />
        <PalmTree position={[-3.6, 0, 4]} scale={0.9} />
        <PalmTree position={[3.3, 0, -2]} scale={1.2} />
        <PalmTree position={[3.5, 0, 8]} scale={0.85} />
        <PalmTree position={[-3.4, 0, 10]} scale={1.05} />
        <PalmTree position={[3.2, 0, -10]} scale={1.15} />

        {/* Rolling Emerald Hills / Tea Bushes */}
        <mesh position={[-5.5, 0.4, 0]} rotation={[0, 0.4, 0]}>
          <sphereGeometry args={[2.5, 7, 7]} />
          <meshStandardMaterial color="#0a3d24" roughness={0.9} flatShading />
        </mesh>
        <mesh position={[5.8, 0.6, -4]} rotation={[0, -0.3, 0]}>
          <sphereGeometry args={[3, 7, 7]} />
          <meshStandardMaterial color="#0f4d33" roughness={0.9} flatShading />
        </mesh>
      </group>
    </group>
  );
}

export default function LowPolyTourCar({ mouseX = 0, mouseY = 0 }) {
  const sceneRef = useRef();

  useFrame(() => {
    if (sceneRef.current) {
      // Smooth interactive mouse parallax
      sceneRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneRef.current.rotation.y,
        (mouseX * 0.4) - 0.25,
        0.05
      );
      sceneRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneRef.current.rotation.x,
        0.18 + (mouseY * 0.15),
        0.05
      );
    }
  });

  return (
    <group ref={sceneRef} rotation={[0.18, -0.25, 0]}>
      {/* Lighting (Neutral sky and cool accents - no yellow) */}
      <ambientLight intensity={0.9} color="#e2e8f0" />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.8}
        color="#cbd5e1"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-6, 4, -4]} intensity={0.7} color="#059669" />
      <pointLight position={[0, 1, 3]} intensity={1.5} color="#06b6d4" distance={6} />

      <CarModel />
      <MovingScenicRoad />
    </group>
  );
}
