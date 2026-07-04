import { useEffect, useState } from 'react'
import * as THREE from 'three'

// Loaded as a plain public/ path (not a static import) so a missing file
// never fails `npm run build` — TextureLoader's onError just leaves the
// gradient fallback in place. Upgrade path: hand-separated transparent
// layers (Aincrad_sky.png / Aincrad_castle.png / Aincrad_foreground.png)
// could be loaded the same way and passed to ParallaxLayers per-layer.
const IMAGE_PATH = '/images/Aincrad.png'

export function useAincradTexture(): THREE.Texture | null {
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  useEffect(() => {
    let disposed = false
    const loader = new THREE.TextureLoader()
    loader.load(
      IMAGE_PATH,
      (loaded) => {
        if (disposed) return
        loaded.colorSpace = THREE.SRGBColorSpace
        setTexture(loaded)
      },
      undefined,
      () => {
        // Aincrad.png not supplied yet — layers fall back to a gradient.
      },
    )
    return () => {
      disposed = true
    }
  }, [])

  return texture
}
