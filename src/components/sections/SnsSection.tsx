import { IconLink } from '../ui/IconLink'
import { GithubLogo, XLogo, ZennLogo } from './brand-icons'

const LINKS = [
  { label: 'Zenn', href: 'https://zenn.dev/kayakucreeper', icon: <ZennLogo /> },
  { label: 'X (Twitter)', href: 'https://x.com/KAYAKUcreeper', icon: <XLogo /> },
  { label: 'GitHub', href: 'https://github.com/KAYAKUcreeper', icon: <GithubLogo /> },
]

export function SnsSection() {
  return (
    <div className="space-y-3">
      {LINKS.map((link) => (
        <IconLink key={link.label} href={link.href} label={link.label} icon={link.icon} />
      ))}
    </div>
  )
}
