'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, ChevronDown, ChevronUp, CircleMinus } from 'lucide-react'
import Image from 'next/image'
import { ExploreProduct } from '@/types/product-insights'
import { useState } from 'react'
import { Button } from './ui/button'

const sentimentStyles: Record<ExploreProduct['sentiment'], string> = {
  Positive: 'bg-green-100 text-green-700',
  Neutral: 'bg-yellow-100 text-yellow-700',
  Negative: 'bg-red-100 text-red-700',
}

interface ExploreProductsTableProps {
  products: ExploreProduct[]
}

export default function ExploreProductsTable({
  products,
}: ExploreProductsTableProps) {
  const [visibleCount, setVisibleCount] = useState(5)
  const visibleProducts = products.slice(0, visibleCount)

  return (
    <div>
      <Card className="mt-3 flex-1">
        <CardContent>
          <table className="w-full table-auto text-left">
            <thead className="bg-gray-100 ">
              <tr className="text-sm text-gray-700 rounded-xl">
                <th className="py-2 px-4 rounded-tl-lg rounded-bl-lg">
                  Product
                </th>
                <th className="py-2 px-4">Feedback</th>
                <th className="py-2 px-4">Available in #Stores</th>
                <th className="py-2 px-4">Sentiment</th>
                <th className="py-2 px-4 rounded-tr-lg rounded-br-lg">
                  Issue, if Any
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleProducts.length > 0 ? (
                visibleProducts.map((item, idx) => (
                  <tr key={idx} className="border-b last:border-none">
                    <td className="py-3 px-4 font-medium flex gap-2 items-center">
                      <Image
                        src={item.image}
                        alt={item.product}
                        width={40}
                        height={40}
                        className="rounded-lg object-cover"
                      />
                      {item.product}
                    </td>
                    <td className="py-3 px-4">{item.feedback}</td>
                    <td className="py-3 px-4">{item.availableStores}</td>
                    <td className="py-3 px-4">
                      <Badge
                        className={`${sentimentStyles[item.sentiment]} rounded-full px-3 py-1`}
                      >
                        {item.sentiment === 'Negative' ? (
                          <>
                            <ChevronDown size={36} /> {item.sentiment}
                          </>
                        ) : item.sentiment === 'Positive' ? (
                          <>
                            <ChevronUp size={36} /> {item.sentiment}
                          </>
                        ) : (
                          <>
                            <CircleMinus size={36} /> {item.sentiment}
                          </>
                        )}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <p className="border rounded-lg text-xs font-medium py-1 px-2 text-center">
                        {item.issue}
                      </p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="pt-6 text-center text-xl font-bold text-black"
                  >
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {visibleCount < products.length && (
        <div className="flex justify-center mt-4">
          <Button
            variant="outline"
            id="date"
            className="cursor-pointer"
            onClick={() => setVisibleCount(products.length)}
          >
            Show all {products.length} products{' '}
            <ArrowUpRight className="h-4 w-4 text-black" />
          </Button>
        </div>
      )}
    </div>
  )
}
