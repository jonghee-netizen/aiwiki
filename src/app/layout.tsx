import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import SearchBar from '@/components/SearchBar'
import { getPagesByCategory } from '@/lib/wiki'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JJH WIKI',
  description: 'AI 지식 정리 위키',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pagesByCategory = getPagesByCategory()

  return (
    <html lang="ko">
      <body className={`${geist.className} bg-white text-gray-900`}>
        <header className="fixed top-0 left-0 right-0 z-40 h-14 border-b border-gray-200 bg-white flex items-center px-4 gap-4">
          <div className="w-64 shrink-0 font-bold text-indigo-600 text-lg">JJH WIKI</div>
          <SearchBar />
        </header>
        <div className="flex pt-14 min-h-screen">
          <Sidebar pagesByCategory={pagesByCategory} />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  )
}
