import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { BootScreen } from './components/boot/BootScreen'
import { ParallaxBackground } from './components/background/ParallaxBackground'
import { CircularMenu } from './components/menu/CircularMenu'
import { SectionOverlay } from './components/sections/SectionOverlay'
import { SectionPageLayout } from './components/sections/SectionPageLayout'
import { ProfileSection } from './components/sections/ProfileSection'
import { BlogSection } from './components/sections/BlogSection'
import { SnsSection } from './components/sections/SnsSection'
import { SECTIONS, type Section } from './types/section'
import { useAppStore } from './store/useAppStore'

function label(id: Section) {
  return SECTIONS.find((s) => s.id === id)!.label
}

function App() {
  const bootDone = useAppStore((s) => s.bootDone)
  const setBootDone = useAppStore((s) => s.setBootDone)

  return (
    <div className="relative w-full">
      <ParallaxBackground />
      <CircularMenu />
      <SectionOverlay />
      <main className="relative w-full">
        <section id="home" className="relative h-screen w-full">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="absolute left-1/2 top-20 flex w-fit -translate-x-1/2 flex-col items-center px-10 py-8 text-center sm:top-28"
            style={{
              background:
                'radial-gradient(ellipse 70% 65% at center, rgba(5,11,20,0.45) 0%, rgba(5,11,20,0.2) 50%, transparent 75%)',
            }}
          >
            <p className="font-display text-xs tracking-[0.4em] text-sao-cyan-dim [text-shadow:0_2px_6px_rgba(5,11,20,0.9)]">
              PORTFOLIO OF
            </p>
            <h1
              className="font-display mt-2 text-4xl tracking-[0.15em] text-sao-cyan sm:text-6xl"
              style={{
                filter:
                  'drop-shadow(0 0 16px rgba(55,244,255,0.55)) drop-shadow(0 3px 8px rgba(5,11,20,0.9))',
              }}
            >
              KAYAKU
            </h1>
            <div className="mt-4 h-px w-24 bg-sao-cyan/40" />
            <p className="mt-4 text-sm text-sao-white [text-shadow:0_2px_6px_rgba(5,11,20,0.9)]">
              student engineer
            </p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="font-display absolute bottom-10 right-6 flex flex-col items-center gap-2 text-sao-cyan/80 sm:right-10"
          >
            <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
            <ChevronDown size={20} />
          </motion.div>
        </section>
        <section id="profile">
          <SectionPageLayout title={label('profile')}>
            <ProfileSection />
          </SectionPageLayout>
        </section>
        <section id="blog">
          <SectionPageLayout title={label('blog')}>
            <BlogSection />
          </SectionPageLayout>
        </section>
        <section id="sns">
          <SectionPageLayout title={label('sns')}>
            <SnsSection />
          </SectionPageLayout>
        </section>
      </main>
      {!bootDone && <BootScreen onDone={() => setBootDone(true)} />}
    </div>
  )
}

export default App
