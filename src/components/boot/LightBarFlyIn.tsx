import { useEffect, useMemo } from 'react'
import { motion } from 'motion/react'

interface LightBarFlyInProps {
  onArrive?: () => void
}

// Each bar independently converges inward into a ring while fading in
// (a straight radial line, no rotation happening), holds at that ring
// distance while it rotates around the shared hub (no radial motion
// happening), then bursts back outward while fading out (straight
// again) — evoking the NerveGear/SAO game boot "Link Start" sequence.
// Bars are staggered with a large random delay so each one runs its
// own converge/rotate/burst cycle rather than moving in lockstep.
const BAR_COUNT = 12
const SPIN_DEGREES = 60
const APPEAR_DURATION = 0.6
const SPIN_DURATION = 2.5
const DURATION = 1.5
const MAX_STAGGER = 1.5
const TRAVEL_DISTANCE = 260
const RING_FRACTION = 0.4
const RING_DISTANCE = TRAVEL_DISTANCE * RING_FRACTION

const BAR_DURATION = APPEAR_DURATION + SPIN_DURATION + DURATION
const RING_ARRIVE_FRACTION = APPEAR_DURATION / BAR_DURATION
const SPIN_FRACTION = (APPEAR_DURATION + SPIN_DURATION) / BAR_DURATION

interface BarSpec {
  angleDeg: number
  color: string
  delay: number
}

function makeBars(): BarSpec[] {
  return Array.from({ length: BAR_COUNT }, (_, i) => ({
    angleDeg: (360 / BAR_COUNT) * i,
    color: `hsl(${(360 / BAR_COUNT) * i}, 90%, 60%)`,
    delay: Math.random() * MAX_STAGGER,
  }))
}

export function LightBarFlyIn({ onArrive }: LightBarFlyInProps) {
  const bars = useMemo(makeBars, [])

  useEffect(() => {
    const timer = setTimeout(() => onArrive?.(), (BAR_DURATION + MAX_STAGGER) * 1000)
    return () => clearTimeout(timer)
  }, [onArrive])

  return (
    <div className="relative h-1 w-1">
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2"
          initial={{ rotate: bar.angleDeg }}
          animate={{
            rotate: [bar.angleDeg, bar.angleDeg, bar.angleDeg + SPIN_DEGREES, bar.angleDeg + SPIN_DEGREES],
          }}
          transition={{
            duration: BAR_DURATION,
            delay: bar.delay,
            times: [0, RING_ARRIVE_FRACTION, SPIN_FRACTION, 1],
            ease: ['linear', 'easeInOut', 'linear'],
          }}
        >
          <motion.div
            initial={{ y: -TRAVEL_DISTANCE, opacity: 0, scaleY: 2.5 }}
            animate={{
              y: [-TRAVEL_DISTANCE, -RING_DISTANCE, -RING_DISTANCE, -TRAVEL_DISTANCE],
              opacity: [0, 1, 1, 0],
              scaleY: [2.5, 1, 1, 2.5],
            }}
            transition={{
              duration: BAR_DURATION,
              delay: bar.delay,
              times: [0, RING_ARRIVE_FRACTION, SPIN_FRACTION, 1],
              ease: ['easeOut', 'linear', 'easeIn'],
            }}
            className="absolute left-0 top-0 h-24 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              backgroundColor: bar.color,
              filter: `drop-shadow(0 0 10px ${bar.color}) drop-shadow(0 0 20px ${bar.color})`,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
