"use client"

import { useState, Suspense } from "react"
import { motion } from "framer-motion"
import { Users, Search } from "lucide-react"
import { Input } from "@/src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { useMockData } from "@/src/lib/hooks/use-mock-data"
import CreatorCard from "@/src/components/creator-card"
import PageTransition from "@/src/components/page-transition"

// Loading fallback
const LoadingFallback = () => (
  <div className="w-full h-40 flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
  </div>
)

export default function CreatorsPage() {
  const { creators } = useMockData()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")

  const filteredCreators = creators.filter(
    (creator) =>
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.bio.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort creators
  const sortedCreators = [...filteredCreators].sort((a, b) => {
    if (sortBy === "popular") return b.followers - a.followers
    if (sortBy === "collections") return b.collections - a.collections
    if (sortBy === "verified") return (b.verified ? 1 : 0) - (a.verified ? 1 : 0)
    // Default: alphabetical
    return a.name.localeCompare(b.name)
  })

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 md:pt-24 pb-24 md:pb-32 px-4 md:px-8">
        <motion.div
          className="flex flex-col items-center text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <Users className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium">Meet the Creators</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 gradient-text">Creative Visionaries</h1>
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl">
            Connect with the brilliant minds behind the most innovative intellectual property assets
          </p>
        </motion.div>

        <motion.div
          className="max-w-7xl mx-auto mb-6 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass-effect p-4 rounded-xl">
            <div className="relative w-full md:w-auto flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                type="search"
                placeholder="Search creators..."
                className="pl-10 bg-transparent border-white/10 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="w-full md:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px] bg-transparent border-white/10">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="collections">Most Collections</SelectItem>
                  <SelectItem value="verified">Verified First</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Suspense fallback={<LoadingFallback />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {sortedCreators.map((creator, index) => (
                <CreatorCard key={creator.id} creator={creator} index={index} />
              ))}
            </div>
          </Suspense>
        </motion.div>
      </div>
    </PageTransition>
  )
}
