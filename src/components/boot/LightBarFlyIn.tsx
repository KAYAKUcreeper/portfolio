import { motion } from 'motion/react'

interface LightBarFlyInProps {
  onArrive?: () => void
}

// A rainbow-spectrum light bar rushing out of the center toward the
// viewer, evoking the NerveGear/SAO game boot "Link Start" sequence,
// rather than a weapon sliding in from off-screen.
export function LightBarFlyIn({ onArrive }: LightBarFlyInProps) {
  return (
    <motion.svg
      width={220}
      height={220}
      viewBox="0 0 100 100"
      initial={{ scale: 0.05, opacity: 0, rotate: -8 }}
      animate={{ scale: [0.05, 1, 3.5], opacity: [0, 1, 0], rotate: [-8, -4, 0] }}
      transition={{ duration: 0.9, times: [0, 0.55, 1], ease: ['easeOut', 'easeIn'] }}
      onAnimationComplete={onArrive}
      style={{
        filter:
          'drop-shadow(0 0 20px rgba(255,255,255,0.8)) drop-shadow(0 0 40px rgba(255,255,255,0.5))',
      }}
    >
      <defs>
        <linearGradient id="rainbow-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff3b3b" />
          <stop offset="16%" stopColor="#ff9f3b" />
          <stop offset="33%" stopColor="#fff23b" />
          <stop offset="50%" stopColor="#3bff6a" />
          <stop offset="66%" stopColor="#3bd9ff" />
          <stop offset="83%" stopColor="#3b6aff" />
          <stop offset="100%" stopColor="#b23bff" />
        </linearGradient>
      </defs>
      <rect x="44" y="4" width="12" height="92" rx="6" fill="url(#rainbow-gradient)" />
    </motion.svg>
  )
}
