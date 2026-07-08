import type { ReactNode } from 'react'
import { GlassPanel } from '../ui/GlassPanel'

interface SectionPageLayoutProps {
  title: string
  children: ReactNode
}

export function SectionPageLayout({ title, children }: SectionPageLayoutProps) {
  return (
    <div className="flex min-h-full justify-center px-4 pb-16 pt-28 sm:pt-32">
      <GlassPanel className="h-fit w-full max-w-2xl p-8">
        <h1 className="font-display mb-6 text-lg tracking-[0.2em] text-sao-cyan">{title}</h1>
        {children}
      </GlassPanel>
    </div>
  )
}
