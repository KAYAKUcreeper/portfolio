import { ExternalLink, Newspaper } from 'lucide-react'
import zennPosts from '../../data/zennPosts.json'

const ZENN_PROFILE_URL = 'https://zenn.dev/kayakucreeper'

function formatJaDate(iso: string) {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(iso))
}

export function BlogSection() {
  return (
    <div className="space-y-4 text-sm text-sao-white/90">
      <p>技術ブログは Zenn にて公開しています。</p>

      <div className="space-y-3">
        {zennPosts.map((post) => (
          <a
            key={post.url + post.publishedAt}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-sao-cyan/30 bg-sao-navy/40 px-5 py-4 transition hover:border-sao-cyan hover:bg-sao-cyan/10"
          >
            <p className="font-display text-sao-cyan">{post.title}</p>
            <p className="mt-1 text-xs text-sao-white/50">{formatJaDate(post.publishedAt)}</p>
            {post.excerpt && (
              <p className="mt-2 line-clamp-3 text-sm text-sao-white/70">{post.excerpt}</p>
            )}
          </a>
        ))}
      </div>

      <a
        href={ZENN_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center gap-2 pt-1 text-xs text-sao-cyan/80 transition hover:text-sao-cyan"
      >
        <Newspaper size={14} />
        すべての記事を見る
        <ExternalLink size={12} className="transition group-hover:translate-x-1" />
      </a>
    </div>
  )
}
