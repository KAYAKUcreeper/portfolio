import { IconLink } from '../ui/IconLink'
import { GithubLogo, XLogo, ZennLogo } from './brand-icons'

const LINKS = [
  { label: 'Zenn', href: 'https://zenn.dev/kayakucreeper', icon: <ZennLogo /> },
  { label: 'X (Twitter)', href: 'https://x.com/YOUR_USERNAME', icon: <XLogo /> },
  { label: 'GitHub', href: 'https://github.com/YOUR_USERNAME', icon: <GithubLogo /> },
]

export function SnsSection() {
  return (
    <div className="space-y-3">
      {LINKS.map((link) => (
        <IconLink key={link.label} href={link.href} label={link.label} icon={link.icon} />
      ))}
      <p className="pt-2 text-xs text-sao-white/50">
        ※ プレースホルダーURLです。実際のアカウントURLに差し替えてください。
      </p>
    </div>
  )
}
