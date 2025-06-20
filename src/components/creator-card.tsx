"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, ArrowUpRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import { useToast } from "@/src/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useMobile } from "@/src/hooks/use-mobile"

export default function CreatorCard({ creator, index }) {
  const cardRef = useRef(null)
  const { toast } = useToast()
  const router = useRouter()
  const isMobile = useMobile()

  const handleFollow = (e) => {
    e.preventDefault()
    e.stopPropagation()

    toast({
      title: "Creator Followed",
      description: `You are now following ${creator.name}`,
      duration: 2000,
    })
  }

  const handleCardClick = () => {
    // Navigate to creator detail page
    router.push(`/users/${creator.id}`)
  }

  const handleViewProfile = (e) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/users/${creator.id}`)
  }

  return (
    <motion.div
      ref={cardRef}
      className="creator-card rounded-xl overflow-hidden glass-effect border border-white/10 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }} // Cap delay for better performance
      whileHover={{ scale: isMobile ? 1 : 1.02 }}
      onClick={handleCardClick}
    >
      <div className="relative h-28 md:h-32 overflow-hidden">
        <img
          src={creator.banner || "/placeholder.svg"}
          alt={creator.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy" // Add lazy loading for better performance
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <div className="relative -mt-10 px-4 pb-4">
        <Avatar className="h-16 w-16 border-4 border-background">
          <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
          <AvatarFallback>{creator.name.substring(0, 2)}</AvatarFallback>
        </Avatar>

        <div className="mt-2">
          <div className="flex items-center">
            <h4 className="font-medium truncate">{creator.name}</h4>
            {creator.verified && <CheckCircle2 className="h-4 w-4 ml-1 text-primary fill-background" />}
          </div>

          <p className="text-sm text-zinc-400 mt-1 line-clamp-2">{creator.bio}</p>

          <div className="flex items-center justify-between mt-3 md:mt-4">
            <div className="text-sm">
              <div className="font-medium">{creator.followers.toLocaleString()}</div>
              <div className="text-xs text-zinc-500">Followers</div>
            </div>

            <div className="text-sm">
              <div className="font-medium">{creator.collections}</div>
              <div className="text-xs text-zinc-500">Collections</div>
            </div>

            <Button
              size="sm"
              variant={creator.following ? "default" : "outline"}
              className="rounded-full"
              onClick={handleFollow}
            >
              {creator.following ? "Following" : "Follow"}
            </Button>
          </div>

          <Button variant="ghost" size="sm" className="w-full mt-3 text-xs" onClick={handleViewProfile}>
            View Profile
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
