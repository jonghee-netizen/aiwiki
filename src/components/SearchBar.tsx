'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface SearchResult {
  slug: string[]
  title: string
  description: string
  category: string
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timer = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResults(data)
      setOpen(true)
    }, 200)

    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setOpen(true)}
        placeholder="문서 검색..."
        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
      />
      <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>

      {open && results.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {results.map((r) => (
            <Link
              key={r.slug.join('/')}
              href={`/wiki/${r.slug.join('/')}`}
              onClick={() => { setOpen(false); setQuery('') }}
              className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
            >
              <p className="text-sm font-medium text-gray-900">{r.title}</p>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{r.description}</p>
            </Link>
          ))}
        </div>
      )}

      {open && query && results.length === 0 && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 px-4 py-3">
          <p className="text-sm text-gray-500">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  )
}
