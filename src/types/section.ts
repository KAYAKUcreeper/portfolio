export type Section = 'home' | 'profile' | 'blog' | 'sns'

export interface SectionMeta {
  id: Section
  label: string
}

export const SECTIONS: SectionMeta[] = [
  { id: 'home', label: 'ホーム' },
  { id: 'profile', label: 'プロフィール' },
  { id: 'blog', label: 'ブログ' },
  { id: 'sns', label: 'SNS' },
]
