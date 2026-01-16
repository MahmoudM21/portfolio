import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Icosahedron, Octahedron, Torus } from '@react-three/drei'
import * as THREE from 'three'

// Individual floating shape component
const FloatingShape = ({ 
  position, 
  scale, 
  color, 
  shape = 'icosahedron', 
  speed = 1,
  distort = 0.3,
  wobble = false,
}) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 * speed
  })

  const ShapeComponent = {
    icosahedron: Icosahedron,
    octahedron: Octahedron,
    torus: Torus,
  }[shape] || Icosahedron

  const shapeArgs = shape === 'torus' ? [1, 0.4, 16, 32] : [1, 0]

  return (
    <Float
      speed={2 * speed}
      rotationIntensity={0.5}
      floatIntensity={1}
      floatingRange={[-0.2, 0.2]}
    >
      <ShapeComponent ref={meshRef} args={shapeArgs} position={position} scale={scale}>
        {wobble ? (
          <MeshWobbleMaterial
            color={color}
            factor={0.5}
            speed={2}
            transparent
            opacity={0.6}
            wireframe
          />
        ) : (
          <MeshDistortMaterial
            color={color}
            distort={distort}
            speed={2}
            transparent
            opacity={0.7}
          />
        )}
      </ShapeComponent>
    </Float>
  )
}

// Particle field
const ParticleField = ({ count = 200 }) => {
  const points = useRef()

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20

      // Cyan to violet gradient
      const t = Math.random()
      colors[i * 3] = t * 0.55 // R
      colors[i * 3 + 1] = 1 - t * 0.64 // G
      colors[i * 3 + 2] = 0.88 + t * 0.1 // B
    }

    return { positions, colors }
  }, [count])

  useFrame((state) => {
    if (!points.current) return
    points.current.rotation.y = state.clock.elapsedTime * 0.02
    points.current.rotation.x = state.clock.elapsedTime * 0.01
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Animated rings
const AnimatedRing = ({ radius, color, rotationAxis = 'x' }) => {
  const ringRef = useRef()

  useFrame((state) => {
    if (!ringRef.current) return
    const speed = 0.3
    if (rotationAxis === 'x') {
      ringRef.current.rotation.x = state.clock.elapsedTime * speed
    } else if (rotationAxis === 'y') {
      ringRef.current.rotation.y = state.clock.elapsedTime * speed
    } else {
      ringRef.current.rotation.z = state.clock.elapsedTime * speed
    }
  })

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  )
}

// Main scene component
const Scene = () => {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#00FFE0" />
      <pointLight position={[10, -10, 5]} intensity={0.3} color="#8B5CF6" />

      {/* Floating shapes */}
      <FloatingShape
        position={[-3, 1, -2]}
        scale={0.8}
        color="#00FFE0"
        shape="icosahedron"
        speed={0.8}
        distort={0.4}
      />
      <FloatingShape
        position={[3, -1, -3]}
        scale={0.6}
        color="#8B5CF6"
        shape="octahedron"
        speed={1.2}
        distort={0.3}
      />
      <FloatingShape
        position={[2, 2, -4]}
        scale={0.5}
        color="#00FFE0"
        shape="torus"
        speed={0.6}
        wobble
      />
      <FloatingShape
        position={[-2, -2, -2]}
        scale={0.4}
        color="#8B5CF6"
        shape="icosahedron"
        speed={1}
        distort={0.5}
      />

      {/* Animated rings */}
      <AnimatedRing radius={2.5} color="#00FFE0" rotationAxis="x" />
      <AnimatedRing radius={3} color="#8B5CF6" rotationAxis="y" />
      <AnimatedRing radius={3.5} color="#00FFE0" rotationAxis="z" />

      {/* Particle field */}
      <ParticleField count={300} />
    </>
  )
}

// Canvas wrapper component
const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

export default FloatingShapes

