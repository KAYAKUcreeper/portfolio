import type { ReactNode } from 'react'
import { motion } from 'motion/react'

interface MenuButtonProps {
  icon: ReactNode
  label: string
  onClick: () => void
}

export function MenuButton({ icon, label, onClick }: MenuButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
      className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-sao-cyan/40 bg-sao-navy-mid/80 text-sao-cyan shadow-[0_0_18px_-4px_rgba(55,244,255,0.6)] backdrop-blur-md transition hover:border-sao-cyan hover:shadow-[0_0_24px_-2px_rgba(55,244,255,0.9)]"
    >
      {icon}
      <span className="font-display pointer-events-none absolute -bottom-6 whitespace-nowrap text-[10px] tracking-wide text-sao-cyan opacity-0 transition group-hover:opacity-100">
        {label}
      </span>
    </motion.button>
  )
}
