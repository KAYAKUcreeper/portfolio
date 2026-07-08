import { SECTIONS } from '../../types/section'
import { SnsSection } from '../sections/SnsSection'
import { SectionPageLayout } from './SectionPageLayout'

export function SnsPage() {
  return (
    <SectionPageLayout title={SECTIONS.find((s) => s.id === 'sns')!.label}>
      <SnsSection />
    </SectionPageLayout>
  )
}
