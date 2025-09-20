'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { CategoryRow, TabData } from '@/types/product-insights'
import WaterfallChart from './WaterfallChart'
import TabsForSales from './TabsForSales'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Calendar } from './ui/calendar'
import { Button } from './ui/button'
import { ArrowUpRight, Calendar1, ChevronDownIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import Image from 'next/image'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type SalesBreakdownProps = {
  data: {
    title: string
    tabs: TabData[]
    insight: { message: string }
  }
}

const SalesBreakdown: React.FC<SalesBreakdownProps> = ({ data }) => {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center">
        <div className="">
          <h2 className="text-sm text-muted-foreground mb-1">
            Sales break down
          </h2>
          <h2 className="text-lg font-semibold">{data.title}</h2>
        </div>
        <div className="flex justify-center items-center gap-4">
          <TabsForSales tabsData={data.tabs} />
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
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
                selected={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDate(date)
                  setOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Card className="mt-3 flex-1">
        <CardContent>
          <WaterfallChart />
          <div className="mt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="w-56 bg-transparent border-0 border-b-2 border-blue-500 rounded-none"
                  variant="outline"
                >
                  Lab-grown Diamond / Clarity <ChevronDownIcon />
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
          </div>
        </CardContent>
        <div className="px-4">
          {data.tabs.map((tab) =>
            tab.categoryRows.map((item: CategoryRow, idx: number) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-4 mt-4 border-b pb-4"
              >
                {/* First 3 columns: smaller */}
                <p className="col-span-1 font-semibold">{item.range}</p>
                <div className="col-span-2">
                  <div className="flex justify-start items-center gap-8">
                    <p className="font-semibold">{item.products}</p>
                    <div className="w-[30px] h-[22px] rounded-lg bg-red-200 text-center">
                      <p className="text-sm font-medium text-red-500">
                        {item.dropoff}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">
                    {item.issues.join(', ')}
                  </p>
                </div>
                <div className="col-span-2">
                  <div className="flex justify-start items-center gap-8">
                    <p className="font-semibold">{item.products}</p>
                    <div className="w-[30px] h-[22px] rounded-lg bg-red-200 text-center">
                      <p className="text-sm font-medium text-red-500">
                        {item.dropoff}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">
                    {item.issues.join(', ')}
                  </p>
                </div>
                <div className="col-span-2">
                  <div className="flex justify-start items-center gap-8">
                    <p className="font-semibold">{item.products}</p>
                    <div className="w-[30px] h-[22px] rounded-lg bg-red-200 text-center">
                      <p className="text-sm font-medium text-red-500">
                        {item.dropoff}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">
                    {item.issues.join(', ')}
                  </p>
                </div>
                <div className="col-span-2">
                  <div className="flex justify-start items-center gap-8">
                    <p className="font-semibold">{item.products}</p>
                    <div className="w-[30px] h-[22px] rounded-lg bg-red-200 text-center">
                      <p className="text-sm font-medium text-red-500">
                        {item.dropoff}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">
                    {item.issues.join(', ')}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="font-semibold text-lg">{item.revenue}</p>
                  <div className="flex gap-1">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <p className="text-xs text-gray-400">{item.growth}</p>
                  </div>
                </div>
              </div>
            )),
          )}
        </div>
        <div className="px-4">
          <p className="text-blue-700 text-sm font-medium bg-blue-100 p-2 rounded-lg flex items-center gap-2">
            <span>
              <Image
                src={'/images/sparkles.png'}
                alt={'sparkles'}
                width={16}
                height={16}
                className="rounded-lg object-cover"
              />
            </span>
            <span>
              Checkout abandonment is disproportionately high for 18kt gold,
              suggesting size chart clarity and metal variant recommendations
              could recover up to ₹3.2M in potential sales.
            </span>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default SalesBreakdown
