import Link from 'next/link'
import { getPagesByCategory, getCategoryLabel } from '@/lib/wiki'

export default function HomePage() {
  const pagesByCategory = getPagesByCategory()

  const categoryIcons: Record<string, string> = {
    models: '🤖',
    concepts: '💡',
    tools: '🔧',
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">AI 위키</h1>
        <p className="text-lg text-gray-600">
          AI 모델, 개념, 도구에 대한 지식을 정리한 공간입니다.
        </p>
      </div>

      <div className="grid gap-8">
        {Object.entries(pagesByCategory).map(([category, pages]) => (
          <section key={category}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>{categoryIcons[category] || '📄'}</span>
              {getCategoryLabel(category)}
              <span className="text-sm font-normal text-gray-400">({pages.length})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pages.map((page) => (
                <Link
                  key={page.slug.join('/')}
                  href={`/wiki/${page.slug.join('/')}`}
                  className="block p-4 border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all group"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {page.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{page.description}</p>
                  {page.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {page.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
