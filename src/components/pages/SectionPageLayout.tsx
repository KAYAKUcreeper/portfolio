import type { ReactNode } from 'react'

interface SectionPageLayoutProps {
  title: string
  children: ReactNode
}

// Deliberately NOT the small floating GlassPanel card used by the ring-menu
// popup (SectionOverlay) — a full-bleed scrim + wide reading column, so a
// header nav click reads as "a different page," not "the same popup."
export function SectionPageLayout({ title, children }: SectionPageLayoutProps) {
  return (
    <div className="min-h-full bg-sao-navy/60 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 sm:pt-36">
        <h1 className="font-display mb-8 border-b border-sao-cyan/20 pb-4 text-2xl tracking-[0.2em] text-sao-cyan sm:text-3xl">
          {title}
        </h1>
        {children}
      </div>
    </div>
  )
}
