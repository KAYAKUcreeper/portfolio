import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Home, Menu as MenuIcon, Newspaper, Share2, UserRound, X } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import type { Section } from '../../types/section'
import { MenuButton } from './MenuButton'

interface MenuItem {
  id: Section
  label: string
  icon: ReactNode
}

const ITEMS: MenuItem[] = [
  { id: 'home', label: 'ホーム', icon: <Home size={22} /> },
  { id: 'profile', label: 'プロフィール', icon: <UserRound size={22} /> },
  { id: 'blog', label: 'ブログ', icon: <Newspaper size={22} /> },
  { id: 'sns', label: 'SNS', icon: <Share2 size={22} /> },
]

const RADIUS = 130
// Upper-half arc (screen-space angle, clockwise from +x): 200deg (upper-left)
// through 270deg (straight up) to 340deg (upper-right).
const START_ANGLE = 200
const END_ANGLE = 340

function angleForIndex(index: number, count: number) {
  if (count === 1) return (START_ANGLE + END_ANGLE) / 2
  return START_ANGLE + ((END_ANGLE - START_ANGLE) / (count - 1)) * index
}

export function CircularMenu() {
  const menuOpen = useAppStore((s) => s.menuOpen)
  const toggleMenu = useAppStore((s) => s.toggleMenu)
  const closeMenu = useAppStore((s) => s.closeMenu)
  const openSection = useAppStore((s) => s.openSection)

  return (
    <div className="fixed bottom-10 left-1/2 z-20 -translate-x-1/2">
      <div className="relative h-16 w-16">
        <AnimatePresence>
          {menuOpen &&
            ITEMS.map((item, index) => {
              const angle = (angleForIndex(index, ITEMS.length) * Math.PI) / 180
              const x = Math.cos(angle) * RADIUS
              const y = Math.sin(angle) * RADIUS
              return (
                <motion.div
                  key={item.id}
                  className="absolute left-1/2 top-1/2 -ml-7 -mt-7"
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
                  animate={{ x, y, opacity: 1, scale: 1 }}
                  exit={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    delay: index * 0.04,
                  }}
                >
                  <MenuButton
                    label={item.label}
                    icon={item.icon}
                    onClick={() => {
                      if (item.id === 'home') {
                        closeMenu()
                        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
                      } else {
                        openSection(item.id)
                      }
                    }}
                  />
                </motion.div>
              )
            })}
        </AnimatePresence>

        <motion.button
          type="button"
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          onClick={toggleMenu}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative flex h-16 w-16 items-center justify-center rounded-full border border-sao-cyan/50 bg-sao-navy-mid/70 text-sao-cyan shadow-[0_0_25px_-4px_rgba(55,244,255,0.7)] backdrop-blur-md"
        >
          <span className="pointer-events-none absolute inset-0 animate-ping rounded-full border border-sao-cyan/30" />
          {menuOpen ? <X size={26} /> : <MenuIcon size={26} />}
        </motion.button>
      </div>
    </div>
  )
}
