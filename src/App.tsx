import { Navigate, Route, Routes } from 'react-router-dom'
import { BootScreen } from './components/boot/BootScreen'
import { ParallaxBackground } from './components/background/ParallaxBackground'
import { CircularMenu } from './components/menu/CircularMenu'
import { SectionOverlay } from './components/sections/SectionOverlay'
import { Header } from './components/layout/Header'
import { ProfilePage } from './components/pages/ProfilePage'
import { BlogPage } from './components/pages/BlogPage'
import { SnsPage } from './components/pages/SnsPage'
import { useAppStore } from './store/useAppStore'

function App() {
  const bootDone = useAppStore((s) => s.bootDone)
  const setBootDone = useAppStore((s) => s.setBootDone)

  return (
    <div className="relative h-full w-full overflow-hidden">
      <ParallaxBackground />
      <Header />
      <CircularMenu />
      <SectionOverlay />
      <div className="relative z-0 h-full w-full overflow-y-auto">
        <Routes>
          <Route path="/" element={null} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/sns" element={<SnsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {!bootDone && <BootScreen onDone={() => setBootDone(true)} />}
    </div>
  )
}

export default App
