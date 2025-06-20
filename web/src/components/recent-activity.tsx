"use client"

import { formatDistanceToNow } from "date-fns"
import { Card } from "@/src/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Badge } from "@/src/components/ui/badge"
import { ShoppingCart, Repeat, Heart, Tag, ArrowUpRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface RecentActivityProps {
  activities: any[]
  limit?: number
}

export function RecentActivity({ activities, limit = 5 }: RecentActivityProps) {
  const router = useRouter()
  const visibleActivities = activities.slice(0, limit)

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return <ShoppingCart className="h-4 w-4 text-green-500" />
      case "listing":
        return <Tag className="h-4 w-4 text-blue-500" />
      case "transfer":
        return <Repeat className="h-4 w-4 text-orange-500" />
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />
      default:
        return <ArrowUpRight className="h-4 w-4 text-primary" />
    }
  }

  const getActivityText = (activity: any) => {
    switch (activity.type) {
      case "purchase":
        return (
          <>
            <span className="font-medium">{activity.user}</span> purchased{" "}
            <span className="font-medium">{activity.asset}</span> for{" "}
            <span className="font-medium">{activity.price}</span>
          </>
        )
      case "listing":
        return (
          <>
            <span className="font-medium">{activity.user}</span> listed{" "}
            <span className="font-medium">{activity.asset}</span> for{" "}
            <span className="font-medium">{activity.price}</span>
          </>
        )
      case "transfer":
        return (
          <>
            <span className="font-medium">{activity.user}</span> transferred{" "}
            <span className="font-medium">{activity.asset}</span> to{" "}
            <span className="font-medium">{activity.recipient}</span>
          </>
        )
      case "like":
        return (
          <>
            <span className="font-medium">{activity.user}</span> liked{" "}
            <span className="font-medium">{activity.asset}</span>
          </>
        )
      default:
        return (
          <>
            <span className="font-medium">{activity.user}</span> {activity.action}{" "}
            <span className="font-medium">{activity.asset}</span>
          </>
        )
    }
  }

  const handleActivityClick = (activity: any) => {
    if (activity.assetId) {
      router.push(`/assets/${activity.assetId}`)
    } else if (activity.userId) {
      router.push(`/users/${activity.userId}`)
    }
  }

  return (
    <div className="space-y-3">
      {visibleActivities.map((activity) => (
        <Card
          key={activity.id}
          className="p-3 cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => handleActivityClick(activity)}
        >
          <div className="flex items-center gap-3">
            <div className="rounded-full p-2 bg-muted">{getActivityIcon(activity.type)}</div>
            <div className="min-w-0 flex-1">
              <p className="text-sm line-clamp-1">{getActivityText(activity)}</p>
              <div className="flex items-center mt-1">
                <Avatar className="h-4 w-4 mr-1">
                  <AvatarImage src={activity.userAvatar || "/placeholder.svg?height=20&width=20"} alt={activity.user} />
                  <AvatarFallback className="text-[8px]">{activity.user.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </span>
                {activity.type && (
                  <Badge variant="outline" className="ml-auto text-[10px] h-4 px-1">
                    {activity.type}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
