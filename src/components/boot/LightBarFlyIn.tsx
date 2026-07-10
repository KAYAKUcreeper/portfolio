import { useEffect } from 'react'
import { motion } from 'motion/react'

interface LightBarFlyInProps {
  onArrive?: () => void
}

// Bars enter one at a time (staggered) from the same point at the top
// of the ring, fading in along a straight vertical line (no rotation
// while entering). The instant a bar arrives, it joins the shared
// clockwise rotation (no radial movement while rotating). The stagger
// interval and rotation speed are tuned together so that by the time
// the last bar arrives, all 12 have spread out into an evenly-filled
// ring — at which point every bar bursts back outward in unison,
// fading out — evoking the NerveGear/SAO game boot "Link Start" sequence.
const BAR_COUNT = 12
const SLOT_ANGLE = 360 / BAR_COUNT
const ENTRY_DURATION = 0.35
const STAGGER_INTERVAL = 0.22
const ROTATION_SPEED = SLOT_ANGLE / STAGGER_INTERVAL // deg/sec, keeps the ring evenly spaced as it fills
const HOLD_DURATION = 0.35 // extra spin time once full, before the synchronized burst
const BURST_DURATION = 0.7
const TRAVEL_DISTANCE = 260
const RING_FRACTION = 0.4
const RING_DISTANCE = TRAVEL_DISTANCE * RING_FRACTION

const BURST_TIME = (BAR_COUNT - 1) * STAGGER_INTERVAL + ENTRY_DURATION + HOLD_DURATION

interface BarSpec {
  color: string
  delay: number
  totalDuration: number
  times: [number, number, number, number]
  finalAngle: number
}

const BARS: BarSpec[] = Array.from({ length: BAR_COUNT }, (_, i) => {
  const delay = i * STAGGER_INTERVAL
  const entryEnd = delay + ENTRY_DURATION
  const rotationDuration = BURST_TIME - entryEnd
  const totalDuration = ENTRY_DURATION + rotationDuration + BURST_DURATION
  return {
    color: `hsl(${SLOT_ANGLE * i}, 90%, 60%)`,
    delay,
    totalDuration,
    times: [0, ENTRY_DURATION / totalDuration, (ENTRY_DURATION + rotationDuration) / totalDuration, 1],
    finalAngle: ROTATION_SPEED * rotationDuration,
  }
})

export function LightBarFlyIn({ onArrive }: LightBarFlyInProps) {
  useEffect(() => {
    const timer = setTimeout(() => onArrive?.(), (BURST_TIME + BURST_DURATION) * 1000)
    return () => clearTimeout(timer)
  }, [onArrive])

  return (
    <div className="relative h-1 w-1">
      {BARS.map((bar, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2"
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 0, bar.finalAngle, bar.finalAngle] }}
          transition={{
            duration: bar.totalDuration,
            delay: bar.delay,
            times: bar.times,
            ease: ['linear', 'linear', 'linear'],
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
              duration: bar.totalDuration,
              delay: bar.delay,
              times: bar.times,
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
