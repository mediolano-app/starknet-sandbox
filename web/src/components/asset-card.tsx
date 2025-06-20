"use client"

import type React from "react"
import { ExternalLink } from "lucide-react"
import { Badge } from "@/src/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardFooter } from "@/src/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/components/ui/tooltip"
import { useRouter } from "next/navigation"

interface AssetCardProps {
  asset: any
  minimal?: boolean
}

export default function AssetCard({ asset, minimal = false }: AssetCardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/assets/${asset.id}`)
  }

  const handleCreatorClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/users/${asset.creatorId || "1"}`)
  }

  return (
    <Card
      className="overflow-hidden group cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:-translate-y-1"
      onClick={handleCardClick}
    >
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        <img
          src={asset.image || "/placeholder.svg?height=400&width=400"}
          alt={asset.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Top badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {asset.category && (
            <Badge variant="secondary" className="text-xs font-normal opacity-90">
              {asset.category}
            </Badge>
          )}
        </div>

        {/* Zero fees badge */}
        <div className="absolute bottom-2 left-2">
          <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/30 text-xs">
            Zero Fees
          </Badge>
        </div>
      </div>

      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm truncate">{asset.name}</h3>
        </div>

        <div className="flex items-center justify-between mt-1.5">
          <div
            className="flex items-center cursor-pointer hover:text-primary transition-colors"
            onClick={handleCreatorClick}
          >
            <Avatar className="h-4 w-4 mr-1">
              <AvatarImage src={asset.creatorAvatar || "/placeholder.svg?height=20&width=20"} alt={asset.creator} />
              <AvatarFallback className="text-[8px]">{asset.creator.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{asset.creator}</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="font-medium text-xs">{asset.price}</div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zero-fee licensing available</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>

      {!minimal && (
        <CardFooter className="p-3 pt-0">
          <Button size="sm" variant="outline" className="w-full h-7 text-xs rounded-full" onClick={handleCardClick}>
            <ExternalLink className="h-3 w-3 mr-1" />
            View Details
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
