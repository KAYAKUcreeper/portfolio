import { SECTIONS } from '../../types/section'
import { ProfileSection } from '../sections/ProfileSection'
import { SectionPageLayout } from './SectionPageLayout'

export function ProfilePage() {
  return (
    <SectionPageLayout title={SECTIONS.find((s) => s.id === 'profile')!.label}>
      <ProfileSection />
    </SectionPageLayout>
  )
}
