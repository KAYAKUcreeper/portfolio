import { useEffect } from 'react'
import { motion } from 'motion/react'

interface LightBarFlyInProps {
  onArrive?: () => void
}

// A burst of solid-colored light bars that fan out into a ring (like
// pinwheel blades around a hub), spin clockwise as a rigid ring, then
// release outward toward the viewer — evoking the NerveGear/SAO game
// boot "Link Start" sequence.
const BAR_COUNT = 12
const SPIN_DEGREES = 120
const APPEAR_DURATION = 0.35
const SPIN_DURATION = 0.6
const DURATION = 0.9
const MAX_STAGGER = 0.15
const TRAVEL_DISTANCE = 260
const RING_FRACTION = 0.4

const BAR_DURATION = SPIN_DURATION + DURATION
const SPIN_FRACTION = SPIN_DURATION / BAR_DURATION
const RING_ARRIVE_FRACTION = APPEAR_DURATION / BAR_DURATION

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
    const timer = setTimeout(() => onArrive?.(), (BAR_DURATION + MAX_STAGGER) * 1000)
    return () => clearTimeout(timer)
  }, [onArrive])

  return (
    <motion.div
      className="relative h-1 w-1"
      initial={{ rotate: 0 }}
      animate={{ rotate: SPIN_DEGREES }}
      transition={{ duration: SPIN_DURATION, ease: 'easeIn' }}
    >
      {BARS.map((bar) => {
        const angleRad = (bar.angleDeg * Math.PI) / 180
        const dx = Math.sin(angleRad) * TRAVEL_DISTANCE
        const dy = -Math.cos(angleRad) * TRAVEL_DISTANCE
        const ringX = dx * RING_FRACTION
        const ringY = dy * RING_FRACTION
        return (
          <motion.div
            key={bar.angleDeg}
            initial={{ x: 0, y: 0, opacity: 0, scaleY: 0.05 }}
            animate={{
              x: [0, ringX, ringX, dx],
              y: [0, ringY, ringY, dy],
              opacity: [0, 1, 1, 0],
              scaleY: [0.05, 1, 1, 2.5],
            }}
            transition={{
              duration: BAR_DURATION,
              delay: bar.delay,
              times: [0, RING_ARRIVE_FRACTION, SPIN_FRACTION, 1],
              ease: ['easeOut', 'linear', 'easeIn'],
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
    </motion.div>
  )
}
