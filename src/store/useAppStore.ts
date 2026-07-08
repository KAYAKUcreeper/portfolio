import { create } from 'zustand'
import type { Section } from '../types/section'
import { hasSeenBoot } from '../hooks/useSessionBootSkip'

type PopupSection = Exclude<Section, 'home'>

interface AppState {
  bootDone: boolean
  menuOpen: boolean
  activeSection: PopupSection | null
  setBootDone: (done: boolean) => void
  toggleMenu: () => void
  closeMenu: () => void
  openSection: (section: PopupSection) => void
  closeSection: () => void
}

export const useAppStore = create<AppState>((set) => ({
  bootDone: hasSeenBoot(),
  menuOpen: false,
  activeSection: null,
  setBootDone: (done) => set({ bootDone: done }),
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
  closeMenu: () => set({ menuOpen: false }),
  // opening a section always collapses the ring menu (confirmed UX)
  openSection: (section) => set({ activeSection: section, menuOpen: false }),
  closeSection: () => set({ activeSection: null }),
}))
