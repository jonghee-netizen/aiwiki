import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPage, getAllPages, getCategoryLabel } from '@/lib/wiki'

interface Props {
  params: Promise<{ slug: string[] }>
}

export async function generateStaticParams() {
  const pages = getAllPages()
  return pages.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) return {}
  return { title: `${page.title} | JJH WIKI`, description: page.description }
}

export default async function WikiPage({ params }: Props) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) notFound()

  return (
    <article className="max-w-3xl mx-auto px-8 py-10">
      <div className="mb-2">
        <Link
          href="/"
          className="text-sm text-indigo-500 hover:text-indigo-700"
        >
          ← 홈으로
        </Link>
        <span className="text-sm text-gray-400 mx-2">/</span>
        <span className="text-sm text-gray-500">{getCategoryLabel(page.category)}</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">{page.title}</h1>
      <p className="text-gray-500 mb-4">{page.description}</p>

      {page.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-8">
          {page.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div
        className="prose prose-gray max-w-none
          prose-headings:font-semibold prose-headings:text-gray-900
          prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3
          prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
          prose-p:text-gray-700 prose-p:leading-7
          prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
          prose-code:text-indigo-700 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal
          prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-4
          prose-table:border-collapse prose-th:border prose-th:border-gray-300 prose-th:px-3 prose-th:py-2 prose-th:bg-gray-50
          prose-td:border prose-td:border-gray-200 prose-td:px-3 prose-td:py-2
          prose-ul:list-disc prose-ol:list-decimal
          prose-li:text-gray-700
          prose-strong:text-gray-900"
        dangerouslySetInnerHTML={{ __html: page.htmlContent || '' }}
      />
    </article>
  )
}
