import { Canvas } from '@react-three/fiber'
import { ParallaxLayers } from './ParallaxLayers'
import { useMouseParallax } from './useMouseParallax'

export function ParallaxBackground() {
  useMouseParallax()

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
        <ParallaxLayers />
      </Canvas>
    </div>
  )
}
