import { SECTIONS } from '../../types/section'
import { BlogSection } from '../sections/BlogSection'
import { SectionPageLayout } from './SectionPageLayout'

export function BlogPage() {
  return (
    <SectionPageLayout title={SECTIONS.find((s) => s.id === 'blog')!.label}>
      <BlogSection />
    </SectionPageLayout>
  )
}
