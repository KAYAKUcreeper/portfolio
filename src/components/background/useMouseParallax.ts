import { useEffect } from 'react'
import { mouseParallaxStore } from '../../store/mouseParallaxStore'

// Pointer events cover mouse AND touch-drag, so the parallax also reacts to
// a finger drag on touch devices instead of being frozen there.
export function useMouseParallax() {
  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = (event.clientY / window.innerHeight) * 2 - 1
      mouseParallaxStore.setState({ x, y })
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])
}
