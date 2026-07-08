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
        <section className="relative h-screen w-full">
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
