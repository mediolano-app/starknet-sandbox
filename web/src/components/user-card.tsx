"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function UserCard({ user }) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl border bg-background transition-all hover:shadow-md"
      variants={item}
    >
      <div className="relative h-32 overflow-hidden">
        <img
          src={user.banner || "/placeholder.svg"}
          alt={user.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="relative -mt-10 px-4 pb-4">
        <Avatar className="h-16 w-16 border-4 border-background">
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
        </Avatar>

        <div className="mt-2">
          <div className="flex items-center">
            <h4 className="font-medium truncate">{user.name}</h4>
            {user.verified && <CheckCircle2 className="h-4 w-4 ml-1 text-blue-500 fill-background" />}
          </div>

          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{user.bio}</p>

          <div className="flex items-center justify-between mt-3">
            <div className="text-sm">
              <div className="font-medium">{user.followers.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Followers</div>
            </div>

            <div className="text-sm">
              <div className="font-medium">{user.collections}</div>
              <div className="text-xs text-muted-foreground">Collections</div>
            </div>

            <Button size="sm">Follow</Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
