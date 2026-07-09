import { useEffect } from 'react'
import { motion } from 'motion/react'

interface LightBarFlyInProps {
  onArrive?: () => void
}

// A burst of solid-colored light bars radiating out of the center
// toward the viewer, evoking the NerveGear/SAO game boot "Link Start"
// sequence, rather than a single weapon sliding in from off-screen.
const BAR_COUNT = 12
const DURATION = 0.9
const MAX_STAGGER = 0.15
const TRAVEL_DISTANCE = 260

interface BarSpec {
  angleDeg: number
  color: string
  delay: number
}

const BARS: BarSpec[] = Array.from({ length: BAR_COUNT }, (_, i) => ({
  angleDeg: (360 / BAR_COUNT) * i,
  color: `hsl(${(360 / BAR_COUNT) * i}, 90%, 60%)`,
  delay: (i / BAR_COUNT) * MAX_STAGGER,
}))

export function LightBarFlyIn({ onArrive }: LightBarFlyInProps) {
  useEffect(() => {
    const timer = setTimeout(() => onArrive?.(), (DURATION + MAX_STAGGER) * 1000)
    return () => clearTimeout(timer)
  }, [onArrive])

  return (
    <div className="relative h-1 w-1">
      {BARS.map((bar) => {
        const angleRad = (bar.angleDeg * Math.PI) / 180
        const dx = Math.sin(angleRad) * TRAVEL_DISTANCE
        const dy = -Math.cos(angleRad) * TRAVEL_DISTANCE
        return (
          <motion.div
            key={bar.angleDeg}
            initial={{ x: 0, y: 0, opacity: 0, scaleY: 0.05 }}
            animate={{
              x: [0, dx * 0.4, dx],
              y: [0, dy * 0.4, dy],
              opacity: [0, 1, 0],
              scaleY: [0.05, 1, 2.5],
            }}
            transition={{
              duration: DURATION,
              delay: bar.delay,
              times: [0, 0.55, 1],
              ease: ['easeOut', 'easeIn'],
            }}
            className="absolute left-1/2 top-1/2 h-24 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              backgroundColor: bar.color,
              rotate: `${bar.angleDeg}deg`,
              filter: `drop-shadow(0 0 10px ${bar.color}) drop-shadow(0 0 20px ${bar.color})`,
            }}
          />
        )
      })}
    </div>
  )
}
