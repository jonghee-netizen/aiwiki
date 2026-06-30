import { NextRequest, NextResponse } from 'next/server'
import { searchPages } from '@/lib/wiki'

export function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || ''
  const results = searchPages(q)
  return NextResponse.json(results.slice(0, 8))
}
