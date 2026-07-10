import type { ReactNode } from 'react'

interface GlassPanelProps {
  children: ReactNode
  className?: string
}

export function GlassPanel({ children, className = '' }: GlassPanelProps) {
  return (
    <div
      className={`rounded-2xl border border-sao-cyan/30 bg-sao-navy-mid/60 shadow-[0_0_30px_-5px_rgba(55,244,255,0.35)] backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  )
}
