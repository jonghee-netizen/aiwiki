export interface WikiMeta {
  slug: string[]
  title: string
  category: string
  description: string
  tags: string[]
}

const CATEGORY_LABELS: Record<string, string> = {
  models: 'AI 모델',
  concepts: '핵심 개념',
  tools: '도구 & 프레임워크',
  'ax-project': 'AX project',
}

export function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] || category
}
