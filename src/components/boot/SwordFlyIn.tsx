import { motion } from 'motion/react'

interface SwordFlyInProps {
  onArrive?: () => void
}

export function SwordFlyIn({ onArrive }: SwordFlyInProps) {
  return (
    <motion.svg
      width={220}
      height={220}
      viewBox="0 0 100 100"
      initial={{ x: '-60vw', y: '40vh', rotate: -35, opacity: 0, scale: 0.6 }}
      animate={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      onAnimationComplete={onArrive}
      style={{
        filter: 'drop-shadow(0 0 18px #37f4ff) drop-shadow(0 0 36px #37f4ff)',
      }}
    >
      <defs>
        <linearGradient id="blade-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#bdfcff" />
          <stop offset="100%" stopColor="#37f4ff" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path d="M50 2 L58 30 L54 78 L50 98 L46 78 L42 30 Z" fill="url(#blade-gradient)" />
      <rect x="47" y="78" width="6" height="16" rx="2" fill="#1aa8c9" />
    </motion.svg>
  )
}
