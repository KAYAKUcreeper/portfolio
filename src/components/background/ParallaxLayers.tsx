import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { mouseParallaxStore } from '../../store/mouseParallaxStore'
import { useAincradTexture } from './useAincradTexture'

interface LayerConfig {
  depth: number
  parallaxFactor: number
  band: { offset: number; repeat: number }
  idleAmplitude: number
  idleFreq: number
  idlePhase: number
  fallbackColors: [string, string]
  overscan: number
}

// Three vertical bands cropped from the single Aincrad.png, placed at
// different Z depths with different parallax speeds — a pseudo-3D
// approximation of depth from one flat image (see plan for rationale).
const LAYERS: LayerConfig[] = [
  {
    depth: -6,
    parallaxFactor: 0.15,
    band: { offset: 0.35, repeat: 0.65 }, // sky + floating castle (top of image)
    idleAmplitude: 0.03,
    idleFreq: 0.05,
    idlePhase: 0,
    fallbackColors: ['#0a1a2e', '#123049'],
    overscan: 1.15,
  },
  {
    depth: -3,
    parallaxFactor: 0.35,
    band: { offset: 0.25, repeat: 0.5 }, // clouds / mountains (midground)
    idleAmplitude: 0.05,
    idleFreq: 0.08,
    idlePhase: 2,
    fallbackColors: ['#123049', '#1aa8c9'],
    overscan: 1.2,
  },
  {
    depth: 0,
    parallaxFactor: 0.7,
    band: { offset: 0, repeat: 0.35 }, // grass + crossed swords (foreground)
    idleAmplitude: 0.08,
    idleFreq: 0.11,
    idlePhase: 4,
    fallbackColors: ['#123049', '#050b14'],
    overscan: 1.3,
  },
]

function createFallbackTexture(colors: [string, string]) {
  const canvas = document.createElement('canvas')
  canvas.width = 8
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, colors[0])
    gradient.addColorStop(1, colors[1])
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

function ParallaxLayer({
  config,
  sourceTexture,
}: {
  config: LayerConfig
  sourceTexture: THREE.Texture | null
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const current = useRef({ x: 0, y: 0 })
  const { viewport, camera } = useThree()

  const material = useMemo(() => {
    if (sourceTexture) {
      const layerTexture = sourceTexture.clone()
      layerTexture.wrapS = THREE.ClampToEdgeWrapping
      layerTexture.wrapT = THREE.ClampToEdgeWrapping
      layerTexture.repeat.set(1, config.band.repeat)
      layerTexture.offset.set(0, config.band.offset)
      layerTexture.needsUpdate = true
      return new THREE.MeshBasicMaterial({ map: layerTexture })
    }
    return new THREE.MeshBasicMaterial({
      map: createFallbackTexture(config.fallbackColors),
      transparent: true,
      opacity: 0.95,
    })
  }, [sourceTexture, config])

  const { width, height } = useMemo(() => {
    const size = viewport.getCurrentViewport(camera, [0, 0, config.depth])
    return { width: size.width * config.overscan, height: size.height * config.overscan }
  }, [viewport, camera, config])

  useFrame((state) => {
    const target = mouseParallaxStore.getState()
    current.current.x += (target.x - current.current.x) * 0.08
    current.current.y += (target.y - current.current.y) * 0.08

    const idle =
      Math.sin(state.clock.elapsedTime * config.idleFreq + config.idlePhase) *
      config.idleAmplitude

    if (meshRef.current) {
      meshRef.current.position.x = current.current.x * config.parallaxFactor + idle * 0.4
      meshRef.current.position.y = -current.current.y * config.parallaxFactor * 0.6 + idle
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, config.depth]} material={material}>
      <planeGeometry args={[width, height]} />
    </mesh>
  )
}

export function ParallaxLayers() {
  const texture = useAincradTexture()

  return (
    <>
      {LAYERS.map((config) => (
        <ParallaxLayer key={config.depth} config={config} sourceTexture={texture} />
      ))}
    </>
  )
}
