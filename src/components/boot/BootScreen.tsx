import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { LightBarFlyIn } from './LightBarFlyIn'
import { markBootSeen } from '../../hooks/useSessionBootSkip'

type Phase = 'idle' | 'flying' | 'settled' | 'transitioning'

const IDLE_MS = 500
const SETTLE_MS = 450
const TRANSITION_MS = 650

interface BootScreenProps {
  onDone: () => void
}

export function BootScreen({ onDone }: BootScreenProps) {
  const [phase, setPhase] = useState<Phase>('idle')

  const skip = useCallback(() => {
    setPhase((current) => (current === 'transitioning' ? current : 'transitioning'))
  }, [])

  useEffect(() => {
    if (phase !== 'idle') return
    const timer = setTimeout(() => setPhase('flying'), IDLE_MS)
    return () => clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'settled') return
    const timer = setTimeout(() => setPhase('transitioning'), SETTLE_MS)
    return () => clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'transitioning') return
    const timer = setTimeout(() => {
      markBootSeen()
      onDone()
    }, TRANSITION_MS)
    return () => clearTimeout(timer)
  }, [phase, onDone])

  useEffect(() => {
    window.addEventListener('pointerdown', skip)
    window.addEventListener('keydown', skip)
    return () => {
      window.removeEventListener('pointerdown', skip)
      window.removeEventListener('keydown', skip)
    }
  }, [skip])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      animate={{ opacity: phase === 'transitioning' ? 0 : 1 }}
      transition={{ duration: TRANSITION_MS / 1000, ease: 'easeInOut' }}
    >
      <AnimatePresence>
        {phase === 'idle' && (
          <motion.p
            key="prompt"
            className="font-display absolute bottom-16 text-xs tracking-[0.4em] text-sao-cyan-dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            NOW LOADING
          </motion.p>
        )}

        {phase === 'settled' && (
          <motion.div
            key="flash"
            className="absolute h-40 w-40 rounded-full bg-sao-cyan/70 blur-2xl"
            initial={{ opacity: 0.9, scale: 0.4 }}
            animate={{ opacity: 0, scale: 2.2 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      {phase !== 'idle' && <LightBarFlyIn onArrive={() => setPhase('settled')} />}
    </motion.div>
  )
}
