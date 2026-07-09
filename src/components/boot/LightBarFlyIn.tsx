import { useEffect, useMemo } from 'react'
import { motion } from 'motion/react'

interface LightBarFlyInProps {
  onArrive?: () => void
}

// A burst of solid-colored light bars flying out of the vanishing point
// toward the viewer through real 3D depth (CSS perspective + translateZ),
// evoking the NerveGear/SAO "Link Start" hyperspace warp effect.
const BAR_COUNT = 16
const DURATION = 0.85
const MAX_DELAY = 0.2
const Z_START = -700
const Z_END_MIN = 550
const Z_END_MAX = 630
const LANE_RADIUS_MIN = 15
const LANE_RADIUS_MAX = 40

interface BarSpec {
  laneX: number
  laneY: number
  rotateDeg: number
  color: string
  delay: number
  zEnd: number
}

function makeBars(): BarSpec[] {
  return Array.from({ length: BAR_COUNT }, (_, i) => {
    const baseAngleDeg = (360 / BAR_COUNT) * i
    const angleDeg = baseAngleDeg + (Math.random() - 0.5) * 20
    const angleRad = (angleDeg * Math.PI) / 180
    const laneRadius = LANE_RADIUS_MIN + Math.random() * (LANE_RADIUS_MAX - LANE_RADIUS_MIN)
    return {
      laneX: Math.sin(angleRad) * laneRadius,
      laneY: -Math.cos(angleRad) * laneRadius,
      rotateDeg: angleDeg,
      color: `hsl(${(360 / BAR_COUNT) * i}, 90%, 60%)`,
      delay: Math.random() * MAX_DELAY,
      zEnd: Z_END_MIN + Math.random() * (Z_END_MAX - Z_END_MIN),
    }
  })
}

export function LightBarFlyIn({ onArrive }: LightBarFlyInProps) {
  const bars = useMemo(makeBars, [])

  useEffect(() => {
    const maxDelay = Math.max(...bars.map((b) => b.delay))
    const timer = setTimeout(() => onArrive?.(), (maxDelay + DURATION) * 1000)
    return () => clearTimeout(timer)
  }, [bars, onArrive])

  return (
    <div className="relative h-1 w-1" style={{ perspective: 600 }}>
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          initial={{ z: Z_START, opacity: 0 }}
          animate={{ z: [Z_START, (Z_START + bar.zEnd) / 2, bar.zEnd], opacity: [0, 1, 0] }}
          transition={{
            duration: DURATION,
            delay: bar.delay,
            times: [0, 0.55, 1],
            ease: ['easeOut', 'easeIn'],
          }}
          className="absolute left-1/2 top-1/2 h-24 w-3 rounded-full"
          style={{
            x: bar.laneX,
            y: bar.laneY,
            rotate: `${bar.rotateDeg}deg`,
            translateX: '-50%',
            translateY: '-50%',
            transformStyle: 'preserve-3d',
            backgroundColor: bar.color,
            filter: `drop-shadow(0 0 10px ${bar.color}) drop-shadow(0 0 20px ${bar.color})`,
          }}
        />
      ))}
    </div>
  )
}
