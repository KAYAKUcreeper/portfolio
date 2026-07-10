import type { ReactNode } from 'react'

interface IconLinkProps {
  href: string
  label: string
  icon: ReactNode
}

export function IconLink({ href, label, icon }: IconLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-xl border border-sao-cyan/20 bg-sao-navy/40 px-4 py-3 text-sao-white transition hover:border-sao-cyan/60 hover:bg-sao-cyan/10 hover:shadow-[0_0_20px_-4px_rgba(55,244,255,0.6)]"
    >
      <span className="text-sao-cyan transition group-hover:scale-110">{icon}</span>
      <span className="font-display text-sm tracking-wide">{label}</span>
    </a>
  )
}
