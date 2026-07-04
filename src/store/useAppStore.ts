import { create } from 'zustand'
import type { Section } from '../types/section'
import { hasSeenBoot } from '../hooks/useSessionBootSkip'

interface AppState {
  bootDone: boolean
  menuOpen: boolean
  activeSection: Section | null
  setBootDone: (done: boolean) => void
  toggleMenu: () => void
  openSection: (section: Section) => void
  closeSection: () => void
}

export const useAppStore = create<AppState>((set) => ({
  bootDone: hasSeenBoot(),
  menuOpen: false,
  activeSection: null,
  setBootDone: (done) => set({ bootDone: done }),
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
  // opening a section always collapses the ring menu (confirmed UX)
  openSection: (section) => set({ activeSection: section, menuOpen: false }),
  closeSection: () => set({ activeSection: null }),
}))
