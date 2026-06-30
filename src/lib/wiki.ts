import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import { WikiMeta, getCategoryLabel } from './wiki-utils'

export { getCategoryLabel } from './wiki-utils'
export type { WikiMeta } from './wiki-utils'

const contentDir = path.join(process.cwd(), 'content')

export interface WikiPage {
  slug: string[]
  title: string
  category: string
  description: string
  tags: string[]
  content: string
  htmlContent?: string
}

export function getAllCategories(): string[] {
  return fs.readdirSync(contentDir).filter((f) =>
    fs.statSync(path.join(contentDir, f)).isDirectory()
  )
}

export function getAllPages(): WikiMeta[] {
  const categories = getAllCategories()
  const pages: WikiMeta[] = []

  for (const category of categories) {
    const categoryDir = path.join(contentDir, category)
    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith('.md'))

    for (const file of files) {
      const slug = file.replace(/\.md$/, '')
      const filePath = path.join(categoryDir, file)
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(raw)

      pages.push({
        slug: [category, slug],
        title: data.title || slug,
        category,
        description: data.description || '',
        tags: data.tags || [],
      })
    }
  }

  return pages
}

export function getPagesByCategory(): Record<string, WikiMeta[]> {
  const pages = getAllPages()
  const grouped: Record<string, WikiMeta[]> = {}

  for (const page of pages) {
    const cat = page.category
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(page)
  }

  return grouped
}

export async function getPage(slugParts: string[]): Promise<WikiPage | null> {
  const filePath = path.join(contentDir, ...slugParts) + '.md'

  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content)

  return {
    slug: slugParts,
    title: data.title || slugParts[slugParts.length - 1],
    category: data.category || slugParts[0],
    description: data.description || '',
    tags: data.tags || [],
    content,
    htmlContent: processed.toString(),
  }
}

export function searchPages(query: string): WikiMeta[] {
  if (!query.trim()) return []
  const pages = getAllPages()
  const q = query.toLowerCase()

  return pages.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  )
}
