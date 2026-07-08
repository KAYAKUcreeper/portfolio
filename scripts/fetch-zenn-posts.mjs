// Build-time fetch of Zenn articles for the ブログ section (src/components/sections/BlogSection.tsx).
// Runs via npm's predev/prebuild hooks. Node-to-Node fetch sidesteps any
// browser CORS uncertainty around Zenn's feed. Never breaks the build/dev
// server on failure: on any error this just warns and leaves the last
// successfully-written src/data/zennPosts.json untouched, exiting 0.
import { writeFile } from 'node:fs/promises'
import { XMLParser } from 'fast-xml-parser'

const ZENN_USERNAME = 'kayakucreeper'
const FEED_URL = `https://zenn.dev/${ZENN_USERNAME}/feed`
const OUTPUT_PATH = new URL('../src/data/zennPosts.json', import.meta.url)
const FETCH_TIMEOUT_MS = 8000
const EXCERPT_MAX_LENGTH = 300

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'portfolio-site-build/1.0' },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
    return await res.text()
  } finally {
    clearTimeout(timer)
  }
}

function toArray(value) {
  if (value === undefined || value === null) return []
  return Array.isArray(value) ? value : [value]
}

function unwrapText(value) {
  if (value === undefined || value === null) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object' && '#text' in value) return String(value['#text'])
  return String(value)
}

function extractAtomLink(entryLink) {
  const links = toArray(entryLink)
  const alt = links.find((l) => !l?.['@_rel'] || l['@_rel'] === 'alternate') ?? links[0]
  if (typeof alt === 'string') return alt
  return alt?.['@_href'] ?? ''
}

function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function stripHtml(html) {
  return decodeHtmlEntities(html.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()
}

function truncate(text, maxLength) {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trimEnd()}…`
}

// Zenn's feed shape (Atom vs RSS 2.0) isn't verifiable from this sandbox
// (zenn.dev is network-policy-blocked here) — handle both defensively.
function normalizeEntries(parsed) {
  const atomEntries = toArray(parsed?.feed?.entry)
  if (atomEntries.length > 0) {
    return atomEntries.map((e) => ({
      title: unwrapText(e.title),
      url: extractAtomLink(e.link),
      publishedRaw: unwrapText(e.published ?? e.updated ?? ''),
      feedExcerpt: unwrapText(e.summary ?? e.content ?? ''),
    }))
  }
  const rssItems = toArray(parsed?.rss?.channel?.item)
  return rssItems.map((item) => ({
    title: unwrapText(item.title),
    url: unwrapText(item.link),
    publishedRaw: unwrapText(item.pubDate ?? ''),
    feedExcerpt: unwrapText(item.description ?? item['content:encoded'] ?? ''),
  }))
}

function looksUsable(text, title) {
  const trimmed = text.trim()
  return trimmed.length > 0 && trimmed !== title.trim()
}

async function fetchMetaDescriptionFallback(articleUrl) {
  try {
    const html = await fetchWithTimeout(articleUrl, FETCH_TIMEOUT_MS)
    const match =
      /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i.exec(html) ??
      /<meta\s+property=["']og:description["']\s+content=["']([^"']*)["']/i.exec(html)
    return match ? decodeHtmlEntities(match[1]).trim() : ''
  } catch (err) {
    console.warn(`[fetch-zenn-posts] meta description fallback failed for ${articleUrl}:`, err.message)
    return ''
  }
}

async function main() {
  const feedXml = await fetchWithTimeout(FEED_URL, FETCH_TIMEOUT_MS)
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' })
  const parsed = parser.parse(feedXml)
  const rawEntries = normalizeEntries(parsed)

  const posts = []
  for (const entry of rawEntries) {
    const title = entry.title.trim()
    const url = entry.url.trim()
    if (!title || !url) continue

    const publishedAt = entry.publishedRaw
      ? new Date(entry.publishedRaw).toISOString()
      : new Date().toISOString()

    let excerpt = entry.feedExcerpt ? stripHtml(entry.feedExcerpt) : ''
    if (!looksUsable(excerpt, title)) {
      excerpt = stripHtml(await fetchMetaDescriptionFallback(url))
    }

    posts.push({ title, url, publishedAt, excerpt: truncate(excerpt, EXCERPT_MAX_LENGTH) })
  }

  posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  await writeFile(OUTPUT_PATH, `${JSON.stringify(posts, null, 2)}\n`, 'utf-8')
  console.log(`[fetch-zenn-posts] wrote ${posts.length} post(s) to ${OUTPUT_PATH.pathname}`)
}

main().catch((err) => {
  console.warn('[fetch-zenn-posts] failed, keeping existing src/data/zennPosts.json:', err.message)
  process.exit(0)
})
