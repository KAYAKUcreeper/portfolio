import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Newspaper, Share2, UserRound } from 'lucide-react'
import { SECTIONS, type Section } from '../../types/section'
import { GlassPanel } from '../ui/GlassPanel'

const ICONS: Record<Section, ReactNode> = {
  home: <Home size={18} />,
  profile: <UserRound size={18} />,
  blog: <Newspaper size={18} />,
  sns: <Share2 size={18} />,
}

function pathFor(id: Section) {
  return id === 'home' ? '/' : `/${id}`
}

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-[25] flex justify-center p-3 sm:p-4">
      <GlassPanel className="flex items-center gap-1 px-2 py-2 sm:gap-2 sm:px-4">
        {SECTIONS.map((section) => (
          <NavLink
            key={section.id}
            to={pathFor(section.id)}
            end={section.id === 'home'}
            className={({ isActive }) =>
              `font-display flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-xs tracking-wide transition sm:px-3 sm:text-sm ${
                isActive ? 'bg-sao-cyan/15 text-sao-cyan' : 'text-sao-white/60 hover:text-sao-cyan'
              }`
            }
          >
            {ICONS[section.id]}
            <span className="hidden sm:inline">{section.label}</span>
          </NavLink>
        ))}
      </GlassPanel>
    </header>
  )
}
