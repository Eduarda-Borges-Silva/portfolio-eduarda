import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAccessibility } from "../../contexts/AccessibilityContext";

function createRoundedCard() {
  const width = 3.45;
  const height = 2.24;
  const radius = .22;
  const shape = new THREE.Shape();

  shape.moveTo(-width / 2 + radius, -height / 2);
  shape.lineTo(width / 2 - radius, -height / 2);
  shape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius);
  shape.lineTo(width / 2, height / 2 - radius);
  shape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2);
  shape.lineTo(-width / 2 + radius, height / 2);
  shape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius);
  shape.lineTo(-width / 2, -height / 2 + radius);
  shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: .16,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: .035,
    bevelThickness: .035,
    curveSegments: 10
  });
  geometry.center();
  return geometry;
}

function CardModel({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(createRoundedCard, []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  useFrame(({ clock }) => {
    if (!group.current || reducedMotion) return;
    const time = clock.getElapsedTime();
    group.current.rotation.y = -.14 + Math.sin(time * .38) * .025;
    group.current.rotation.x = .06 + Math.cos(time * .32) * .018;
    group.current.position.y = Math.sin(time * .55) * .02;
  });

  return (
    <group ref={group} rotation={[.06, -.14, 0]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#11182d" emissive="#171044" emissiveIntensity={.42} metalness={.5} roughness={.3} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#9b83ff" transparent opacity={.75} />
      </lineSegments>
      <mesh position={[-1.32, .82, .12]}>
        <sphereGeometry args={[.032, 12, 12]} />
        <meshBasicMaterial color="#78a8ff" />
      </mesh>
      <mesh position={[1.32, -.82, .12]}>
        <sphereGeometry args={[.032, 12, 12]} />
        <meshBasicMaterial color="#aa87ff" />
      </mesh>
    </group>
  );
}

function Orbit({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.z = clock.getElapsedTime() * .018;
  });

  return (
    <group ref={group} rotation={[.72, .12, -.18]} scale={[1, .72, 1]}>
      <mesh>
        <torusGeometry args={[1.72, .007, 4, 96]} />
        <meshBasicMaterial color="#78a8ff" transparent opacity={.32} />
      </mesh>
    </group>
  );
}

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <ambientLight intensity={.65} />
      <pointLight position={[-3, 2, 4]} color="#8165ff" intensity={10} />
      <pointLight position={[3, -2, 3]} color="#4b8cff" intensity={7} />
      <Orbit reducedMotion={reducedMotion} />
      <CardModel reducedMotion={reducedMotion} />
    </>
  );
}

export default function HeroScene() {
  const { shouldReduceMotion } = useAccessibility();
  const [visible, setVisible] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stageRef.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={stageRef} className="hero-3d-stage" aria-hidden="true">
      <Canvas
        className="hero-3d-canvas"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 42 }}
        frameloop={shouldReduceMotion || !visible ? "demand" : "always"}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        fallback={null}
      >
        <Scene reducedMotion={shouldReduceMotion} />
      </Canvas>
    </div>
  );
}
