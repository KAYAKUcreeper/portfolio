const BOOT_SEEN_KEY = 'sao-boot-seen'

export function hasSeenBoot(): boolean {
  return sessionStorage.getItem(BOOT_SEEN_KEY) === '1'
}

export function markBootSeen(): void {
  sessionStorage.setItem(BOOT_SEEN_KEY, '1')
}
