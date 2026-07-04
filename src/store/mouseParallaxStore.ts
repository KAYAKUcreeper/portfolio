import { createStore } from 'zustand/vanilla'

interface MouseParallaxState {
  x: number
  y: number
}

/**
 * Plain vanilla zustand store (no React hook) so the R3F render loop can
 * read the latest pointer position via getState() every frame without
 * subscribing and triggering React re-renders on every mousemove.
 */
export const mouseParallaxStore = createStore<MouseParallaxState>(() => ({
  x: 0,
  y: 0,
}))
