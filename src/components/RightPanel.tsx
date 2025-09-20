'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Tab } from '@/types/product-insights'
import Image from 'next/image'

type RightSidePanelProps = {
  tabsData: Tab[]
}

export default function RightSidePanel({ tabsData }: RightSidePanelProps) {
  return (
    <Tabs defaultValue="top5" className="w-full">
      {/* Tabs Header */}
      <TabsList className="grid w-full grid-cols-3">
        {tabsData.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} className="cursor-pointer">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Tabs Content */}
      {tabsData.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="mt-4">
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[400px]">
            {tab.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={40}
                  height={40}
                  className="rounded-lg object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{item.title}</span>
                  <span className="text-xs text-gray-500">
                    {item.description}
                  </span>
                </div>
              </div>
            ))}
            {tab.items.length === 0 && (
              <p className="text-gray-400 text-sm text-center mt-4">
                No data available
              </p>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
