'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  Filler,
} from 'chart.js'
import { Calendar1, Loader, Upload } from 'lucide-react'
import { ProductInsightsData } from '@/types/product-insights'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import RightSidePanel from './RightPanel'
import TopCardsSection from './TopCardsSection'
import SalesBreakdown from './SalesBreakdown'
import ExploreProducts from './ExploreProducts'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  Filler,
)

export default function Dashboard() {
  const [data, setData] = useState<ProductInsightsData | null>(null)

  const [openKPI, setOpenKPI] = useState(false)
  const [dateKPI, setDateKPI] = useState<Date | undefined>(undefined)

  const [openChart, setOpenChart] = useState(false)
  const [dateChart, setDateChart] = useState<Date | undefined>(undefined)

  useEffect(() => {
    fetch('/data/product-insights.json')
      .then((res) => res.json())
      .then((json: ProductInsightsData) => setData(json))
  }, [])

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" size={32} />
      </div>
    )
  }

  const chartData = {
    labels: data.purchasePurposeTrends.map((item) => item.month),
    datasets: [
      {
        label: 'Rings',
        data: data.purchasePurposeTrends.map((item) => item.rings),
        backgroundColor: 'rgba(253, 224, 71, .5)',
      },
      {
        label: 'Bracelets',
        data: data.purchasePurposeTrends.map((item) => item.bracelets),
        backgroundColor: 'rgba(240, 171, 252, .5)',
      },
      {
        label: 'Others',
        data: data.purchasePurposeTrends.map((item) => item.others),
        backgroundColor: 'rgba(209, 213, 219, .5)',
      },
    ],
  }

  const allData = {
    kpis: data.kpis,
    purchasePurposeTrends: data.purchasePurposeTrends,
    salesBreakdown: data.salesBreakdown,
    issues: data.issues,
    exploreProducts: data.exploreProducts,
  }

  function exportAllToJSON() {
    const blob = new Blob([JSON.stringify(allData, null, 2)], {
      type: 'application/json',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'product-insights.json' // any name you prefer
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="w-full h-full px-20 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Product Insights</h1>
        <div className="flex justify-center items-center gap-4">
          <div className="flex justify-center items-center gap-2">
            <div className="w-[8px] h-[8px] bg-green-500 rounded-full mt-[2px]"></div>
            <p className="text-green-500">Updated on 18 June 2023, 12:23 IST</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                All India Stores <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Keyboard shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => exportAllToJSON()}
          >
            Export Data <Upload />
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center mt-6">
        <h1 className="text-xl font-semibold">{`KPI's`}</h1>
        <div className="flex flex-col gap-3">
          <Popover open={openKPI} onOpenChange={setOpenKPI}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-10 justify-between font-normal cursor-pointer"
              >
                <Calendar1 />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={dateKPI}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDateKPI(date)
                  setOpenKPI(false)
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="w-full h-full grid gap-6 mt-6">
        <TopCardsSection data={data.kpis} />

        {/* Chart */}
        <div className="w-full h-full flex gap-4 mt-4">
          <div className="w-[70%] flex flex-col">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-base text-gray-500">
                  Purchase Purpose Trends
                </h2>
                <p className="text-xl font-semibold">90,988,090</p>
              </div>
              <div className="flex flex-col gap-3">
                <Popover open={openChart} onOpenChange={setOpenChart}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-10 justify-between font-normal cursor-pointer"
                    >
                      <Calendar1 />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={dateChart}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDateChart(date)
                        setOpenChart(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <Card className="mt-3 flex-1">
              <CardContent>
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                        align: 'start',
                        labels: { boxWidth: 8, boxHeight: 8 },
                      },
                    },
                    scales: {
                      x: {
                        stacked: true,
                      },
                      y: {
                        stacked: true,
                        position: 'right',
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </div>
          <div className="w-[30%] flex flex-col">
            <Card className="flex-1">
              <CardContent className="h-full">
                <RightSidePanel tabsData={data.tabs} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sales Breakdown */}
        <SalesBreakdown data={data.salesBreakdown} />

        {/* Explore Products */}
        <ExploreProducts data={data} />
      </div>
    </div>
  )
}
