export type KPIs = {
  title: string
  value: string
  change?: string
  subtitle?: string
  trend?: 'up' | 'down'
  chartData: number[]
}

export interface PurchasePurposeTrend {
  month: string
  rings: number
  bracelets: number
  others: number
}

export interface Issue {
  product: string
  feedback: string
  availableInStores: number
  sentiment: 'Positive' | 'Neutral' | 'Negative'
  issue: string
}

export interface ProductInsightsData {
  kpis: KPIs[]
  purchasePurposeTrends: PurchasePurposeTrend[]
  issues: Issue[]
  tabs: Tab[]
  salesBreakdown: SalesBreakdown
  exploreProducts: ExploreProduct[]
}

export interface SalesBreakdown {
  title: string
  tabs: TabData[]
  insight: { message: string }
}

export type TabItem = {
  title: string
  description: string
  image: string
}

export type Tab = {
  id: string
  label: string
  items: TabItem[]
}

export type Stage = {
  name: string
  value: number
  label: string
  percent: number
  dropoff?: { percent: number; reason: string }
  refund?: { percent: number; reason: string }
}

export type CategoryRow = {
  range: string
  products: string
  dropoff: string
  issues: string[]
  revenue: string
  growth: string
}

export type TabData = {
  id: string
  label: string
  stages: Stage[]
  categoryRows: CategoryRow[]
}

export type Sentiment = 'Positive' | 'Neutral' | 'Negative'

export interface ExploreProduct {
  product: string
  feedback: string
  availableStores: number
  sentiment: Sentiment
  issue: string
  image: string
}
