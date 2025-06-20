"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/src/components/ui/input"
import UserCard from "@/src/components/user-card"

const users = [
  {
    id: "1",
    name: "CryptoArtist",
    avatar: "/placeholder.svg?height=100&width=100",
    banner: "/placeholder.svg?height=200&width=600",
    bio: "Digital artist specializing in abstract tokenized art",
    followers: 1245,
    collections: 8,
    verified: true,
  },
  {
    id: "2",
    name: "SoundWave",
    avatar: "/placeholder.svg?height=100&width=100",
    banner: "/placeholder.svg?height=200&width=600",
    bio: "Music producer tokenizing original compositions",
    followers: 3782,
    collections: 12,
    verified: true,
  },
  {
    id: "3",
    name: "InnovatorX",
    avatar: "/placeholder.svg?height=100&width=100",
    banner: "/placeholder.svg?height=200&width=600",
    bio: "Patent holder and tech innovator",
    followers: 892,
    collections: 5,
    verified: false,
  },
  {
    id: "4",
    name: "AuthorPrime",
    avatar: "/placeholder.svg?height=100&width=100",
    banner: "/placeholder.svg?height=200&width=600",
    bio: "Bestselling author tokenizing literary works",
    followers: 2156,
    collections: 3,
    verified: true,
  },
  {
    id: "5",
    name: "DesignStudio",
    avatar: "/placeholder.svg?height=100&width=100",
    banner: "/placeholder.svg?height=200&width=600",
    bio: "Brand design studio specializing in tokenized brand assets",
    followers: 1678,
    collections: 9,
    verified: false,
  },
  {
    id: "6",
    name: "CinematicArts",
    avatar: "/placeholder.svg?height=100&width=100",
    banner: "/placeholder.svg?height=200&width=600",
    bio: "Film producer tokenizing film rights and digital content",
    followers: 4521,
    collections: 7,
    verified: true,
  },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="container px-4 py-12">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold">Discover Creators</h1>
        <div className="relative w-full md:w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search creators..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </motion.div>
    </div>
  )
}
