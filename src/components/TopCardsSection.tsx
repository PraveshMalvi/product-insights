import { KPIs } from '@/types/product-insights'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Line } from 'react-chartjs-2'

type TopCardsSectionProps = {
  data: KPIs[]
}

const TopCardsSection = ({ data }: TopCardsSectionProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {data.map((kpi: KPIs, i: number) => (
        <Card key={i} className="rounded-2xl shadow-sm border py-3 gap-0">
          <CardHeader className="pb-1 px-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 relative">
            <div className="text-3xl font-semibold">{kpi.value}</div>
            <div className="flex items-center space-x-1 text-sm mt-1">
              {kpi.change && (
                <>
                  {kpi.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span
                    className={
                      kpi.trend === 'up'
                        ? 'text-green-600 font-medium'
                        : 'text-red-600 font-medium'
                    }
                  >
                    {kpi.change}
                  </span>
                </>
              )}
              <span className="text-muted-foreground">{kpi.subtitle}</span>
            </div>
            <div className="w-12 h-10 absolute right-2 bottom-0">
              <Line
                data={{
                  labels: kpi.chartData.map((_, i) => i.toString()),
                  datasets: [
                    {
                      data: kpi.chartData,
                      borderColor:
                        kpi.trend === 'up'
                          ? 'rgb(34,197,94)'
                          : 'rgb(239,68,68)',
                      borderWidth: 2,
                      tension: 0.4,
                      pointRadius: 0,
                      fill: true,
                      backgroundColor: (context) => {
                        const ctx = context.chart.ctx
                        const gradient = ctx.createLinearGradient(0, 0, 0, 60)
                        if (kpi.trend === 'up') {
                          gradient.addColorStop(0, 'rgba(34,197,94,0.3)')
                          gradient.addColorStop(1, 'rgba(34,197,94,0)')
                        } else {
                          gradient.addColorStop(0, 'rgba(239,68,68,0.3)')
                          gradient.addColorStop(1, 'rgba(239,68,68,0)')
                        }
                        return gradient
                      },
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false },
                  },
                  scales: {
                    x: { display: false },
                    y: { display: false },
                  },
                  elements: { line: { borderJoinStyle: 'round' } },
                }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default TopCardsSection
