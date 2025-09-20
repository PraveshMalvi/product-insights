import React from 'react'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { TabData } from '@/types/product-insights'

type TabsForSalesProps = {
  tabsData: TabData[]
}

const TabsForSales = ({ tabsData }: TabsForSalesProps) => {
  return (
    <Tabs defaultValue="rings" className="w-fit">
      {/* Tabs Header */}
      <TabsList className="flex gap-2 w-full">
        {tabsData.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} className="cursor-pointer">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export default TabsForSales
