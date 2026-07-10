import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { SECTIONS } from '../../types/section'
import { GlassPanel } from '../ui/GlassPanel'
import { ProfileSection } from './ProfileSection'
import { BlogSection } from './BlogSection'
import { SnsSection } from './SnsSection'

const SECTION_COMPONENTS = {
  profile: ProfileSection,
  blog: BlogSection,
  sns: SnsSection,
}

export function SectionOverlay() {
  const activeSection = useAppStore((s) => s.activeSection)
  const closeSection = useAppStore((s) => s.closeSection)
  const ActiveSectionComponent = activeSection ? SECTION_COMPONENTS[activeSection] : null

  return (
    <AnimatePresence>
      {activeSection && ActiveSectionComponent && (
        <motion.div
          className="fixed inset-0 z-30 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-sao-navy/40"
            onClick={closeSection}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="relative z-10 w-full max-w-lg"
          >
            <GlassPanel className="max-h-[80svh] overflow-y-auto p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-lg tracking-[0.2em] text-sao-cyan">
                  {SECTIONS.find((s) => s.id === activeSection)?.label}
                </h2>
                <button
                  type="button"
                  onClick={closeSection}
                  aria-label="閉じる"
                  className="rounded-full border border-sao-cyan/30 p-1.5 text-sao-cyan transition hover:border-sao-cyan hover:bg-sao-cyan/10"
                >
                  <X size={18} />
                </button>
              </div>
              <ActiveSectionComponent />
            </GlassPanel>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
