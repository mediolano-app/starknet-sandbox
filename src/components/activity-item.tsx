"use client"

import { motion } from "framer-motion"
import { Heart, ShoppingCart, Tag, MessageCircle, Award, Zap, ArrowUpRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { useRouter } from "next/navigation"
import { useMobile } from "@/src/hooks/use-mobile"

export default function ActivityItem({ activity }) {
  const router = useRouter()
  const isMobile = useMobile()

  function getActivityIcon(type) {
    switch (type) {
      case "sale":
        return <ShoppingCart className="h-4 w-4" />
      case "like":
        return <Heart className="h-4 w-4" />
      case "listing":
        return <Tag className="h-4 w-4" />
      case "comment":
        return <MessageCircle className="h-4 w-4" />
      case "award":
        return <Award className="h-4 w-4" />
      case "mint":
        return <Zap className="h-4 w-4" />
      default:
        return <Zap className="h-4 w-4" />
    }
  }

  function getActivityColor(type) {
    switch (type) {
      case "sale":
        return "bg-green-500"
      case "like":
        return "bg-red-500"
      case "listing":
        return "bg-blue-500"
      case "comment":
        return "bg-purple-500"
      case "award":
        return "bg-yellow-500"
      case "mint":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleUserClick = (e, username) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/creators/${username}`)
  }

  const handleAssetClick = (e, assetId) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/assets/${assetId}`)
  }

  // Simplified layout for mobile
  if (isMobile) {
    return (
      <motion.div
        className={`activity-item flex items-start p-3 mb-2 rounded-lg glass-effect border border-white/10 ${
          activity.isNew ? "border-primary/30" : ""
        }`}
        initial={{ opacity: 0, y: -10, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className={`${getActivityColor(activity.type)} p-2 rounded-full mr-3 flex-shrink-0 mt-1`}>
          {getActivityIcon(activity.type)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-1">
            <Avatar className="h-5 w-5 mr-1">
              <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
              <AvatarFallback>{activity.user.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <Button
              variant="link"
              className="p-0 h-auto font-medium text-white hover:text-primary text-sm"
              onClick={(e) => handleUserClick(e, activity.user.name)}
            >
              {activity.user.name}
            </Button>
            {activity.isNew && (
              <Badge className="ml-1 bg-primary/20 text-primary border-primary/30 text-[10px]">New</Badge>
            )}
          </div>

          <div className="text-sm">
            {activity.type === "sale" && (
              <span>
                sold{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-medium text-white hover:text-primary text-sm"
                  onClick={(e) => handleAssetClick(e, activity.asset)}
                >
                  {activity.asset}
                </Button>{" "}
                for {activity.price}
              </span>
            )}

            {activity.type === "like" && (
              <span>
                liked{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-medium text-white hover:text-primary text-sm"
                  onClick={(e) => handleAssetClick(e, activity.asset)}
                >
                  {activity.asset}
                </Button>
              </span>
            )}

            {activity.type === "listing" && (
              <span>
                listed{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-medium text-white hover:text-primary text-sm"
                  onClick={(e) => handleAssetClick(e, activity.asset)}
                >
                  {activity.asset}
                </Button>{" "}
                for {activity.price}
              </span>
            )}

            {activity.type === "comment" && (
              <span>
                commented on{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-medium text-white hover:text-primary text-sm"
                  onClick={(e) => handleAssetClick(e, activity.asset)}
                >
                  {activity.asset}
                </Button>
              </span>
            )}

            {activity.type === "award" && (
              <span>
                received award for{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-medium text-white hover:text-primary text-sm"
                  onClick={(e) => handleAssetClick(e, activity.asset)}
                >
                  {activity.asset}
                </Button>
              </span>
            )}

            {activity.type === "mint" && (
              <span>
                minted{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-medium text-white hover:text-primary text-sm"
                  onClick={(e) => handleAssetClick(e, activity.asset)}
                >
                  {activity.asset}
                </Button>
              </span>
            )}
          </div>

          <div className="text-xs text-zinc-500 mt-1">{activity.time}</div>
        </div>
      </motion.div>
    )
  }

  // Desktop layout
  return (
    <motion.div
      className={`activity-item flex items-center p-4 mb-3 rounded-lg glass-effect border border-white/10 ${
        activity.isNew ? "border-primary/30 glow-effect" : ""
      }`}
      initial={{ opacity: 0, y: -20, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`${getActivityColor(activity.type)} p-2 rounded-full mr-4`}>{getActivityIcon(activity.type)}</div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center flex-wrap">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
            <AvatarFallback>{activity.user.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <Button
            variant="link"
            className="p-0 h-auto font-medium text-white hover:text-primary"
            onClick={(e) => handleUserClick(e, activity.user.name)}
          >
            {activity.user.name}
          </Button>

          {activity.type === "sale" && (
            <span className="text-sm ml-1">
              sold{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-medium text-white hover:text-primary"
                onClick={(e) => handleAssetClick(e, activity.asset)}
              >
                {activity.asset}
              </Button>{" "}
              for {activity.price}
            </span>
          )}

          {activity.type === "like" && (
            <span className="text-sm ml-1">
              liked{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-medium text-white hover:text-primary"
                onClick={(e) => handleAssetClick(e, activity.asset)}
              >
                {activity.asset}
              </Button>
            </span>
          )}

          {activity.type === "listing" && (
            <span className="text-sm ml-1">
              listed{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-medium text-white hover:text-primary"
                onClick={(e) => handleAssetClick(e, activity.asset)}
              >
                {activity.asset}
              </Button>{" "}
              for {activity.price}
            </span>
          )}

          {activity.type === "comment" && (
            <span className="text-sm ml-1">
              commented on{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-medium text-white hover:text-primary"
                onClick={(e) => handleAssetClick(e, activity.asset)}
              >
                {activity.asset}
              </Button>
              {activity.comment && `: "${activity.comment}"`}
            </span>
          )}

          {activity.type === "award" && (
            <span className="text-sm ml-1">
              received{" "}
              <Badge variant="outline" className="ml-1 mr-1 bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                {activity.award || "Featured Collection"}
              </Badge>{" "}
              for{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-medium text-white hover:text-primary"
                onClick={(e) => handleAssetClick(e, activity.asset)}
              >
                {activity.asset}
              </Button>
            </span>
          )}

          {activity.type === "mint" && (
            <span className="text-sm ml-1">
              minted{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-medium text-white hover:text-primary"
                onClick={(e) => handleAssetClick(e, activity.asset)}
              >
                {activity.asset}
              </Button>
            </span>
          )}

          {activity.isNew && (
            <Badge className="ml-2 bg-primary/20 text-primary border-primary/30 text-[10px]">New</Badge>
          )}
        </div>
        <div className="text-xs text-zinc-500 mt-1">{activity.time}</div>
      </div>

      <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 ml-2">
        <ArrowUpRight className="h-4 w-4" />
      </Button>
    </motion.div>
  )
}
