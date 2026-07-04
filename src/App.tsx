import { BootScreen } from './components/boot/BootScreen'
import { ParallaxBackground } from './components/background/ParallaxBackground'
import { CircularMenu } from './components/menu/CircularMenu'
import { SectionOverlay } from './components/sections/SectionOverlay'
import { useAppStore } from './store/useAppStore'

function App() {
  const bootDone = useAppStore((s) => s.bootDone)
  const setBootDone = useAppStore((s) => s.setBootDone)

  return (
    <div className="relative h-full w-full overflow-hidden">
      <ParallaxBackground />
      <CircularMenu />
      <SectionOverlay />
      {!bootDone && <BootScreen onDone={() => setBootDone(true)} />}
    </div>
  )
}

export default App
