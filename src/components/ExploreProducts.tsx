'use client'

import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { BadgeAlert, Calendar1, MapPin, Search } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Calendar } from './ui/calendar'
import ExploreProductsTable from './ExploreProductsTable'
import { ProductInsightsData } from '@/types/product-insights'

interface ExploreProductsProps {
  data: ProductInsightsData
}

const ExploreProducts = ({ data }: ExploreProductsProps) => {
  const [openExploreDate, setOpenExploreDate] = useState(false)
  const [dateExplore, setDateExplore] = useState<Date | undefined>(undefined)

  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = data.exploreProducts.filter((p) =>
    p.product.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-sm text-muted-foreground mb-1">
            Explore Products
          </h2>
          <h2 className="text-lg font-semibold">
            20 products cause 10% revenue loss from inventory issues.
          </h2>
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="relative">
            <Search className="absolute top-1.5 right-2" color="gray" />
            <Input
              className="bg-white w-[230px]"
              type="text"
              placeholder="Search Products & Services"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            id="date"
            className="w-30 justify-between font-medium text-base cursor-pointer"
          >
            <MapPin />
            Location
          </Button>
          <Button
            variant="outline"
            id="date"
            className="w-44 justify-between font-medium text-base cursor-pointer"
          >
            <BadgeAlert />
            Issue Type
            <p className="bg-blue-700 w-[30px] h-[20px] text-white rounded-xl flex justify-center items-center text-sm">
              8
            </p>
          </Button>
          <Popover open={openExploreDate} onOpenChange={setOpenExploreDate}>
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
                selected={dateExplore}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDateExplore(date)
                  setOpenExploreDate(false)
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <ExploreProductsTable products={filteredProducts} />
    </div>
  )
}

export default ExploreProducts
