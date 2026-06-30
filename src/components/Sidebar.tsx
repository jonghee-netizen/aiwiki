'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { WikiMeta, getCategoryLabel } from '@/lib/wiki-utils'

interface SidebarProps {
  pagesByCategory: Record<string, WikiMeta[]>
}

export default function Sidebar({ pagesByCategory }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 bg-gray-50 min-h-screen p-4">
      <Link href="/" className="block mb-6">
        <h1 className="text-xl font-bold text-indigo-600">JJH WIKI</h1>
        <p className="text-xs text-gray-500 mt-0.5">AI 지식 정리 공간</p>
      </Link>

      <nav className="space-y-5">
        {Object.entries(pagesByCategory).map(([category, pages]) => (
          <div key={category}>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
              {getCategoryLabel(category)}
            </p>
            <ul className="space-y-0.5">
              {pages.map((page) => {
                const href = `/wiki/${page.slug.join('/')}`
                const isActive = pathname === href
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`block px-3 py-1.5 rounded-md text-sm transition-colors ${
                        isActive
                          ? 'bg-indigo-100 text-indigo-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                      }`}
                    >
                      {page.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
