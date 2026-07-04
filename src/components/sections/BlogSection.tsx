import { ExternalLink, Newspaper } from 'lucide-react'

const BLOG_URL = 'https://zenn.dev/YOUR_USERNAME'

export function BlogSection() {
  return (
    <div className="space-y-4 text-sm text-sao-white/90">
      <p>技術ブログは Zenn にて公開しています。</p>
      <a
        href={BLOG_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between rounded-xl border border-sao-cyan/30 bg-sao-navy/40 px-5 py-4 transition hover:border-sao-cyan hover:bg-sao-cyan/10"
      >
        <span className="font-display flex items-center gap-3 text-sao-cyan">
          <Newspaper size={20} />
          Zenn で記事を読む
        </span>
        <ExternalLink
          size={16}
          className="text-sao-cyan/70 transition group-hover:translate-x-1"
        />
      </a>
      <p className="text-xs text-sao-white/50">
        ※ プレースホルダーURLです。実際のブログURLに差し替えてください。
      </p>
    </div>
  )
}
