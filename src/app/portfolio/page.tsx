"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Briefcase, Search, Filter } from "lucide-react"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { useMockData } from "@/src/lib/hooks/use-mock-data"
import AssetCard from "@/src/components/asset-card"
import PageTransition from "@/src/components/page-transition"

// Loading fallback
const LoadingFallback = () => (
  <div className="w-full h-40 flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
  </div>
)

export default function PortfolioPage() {
  const { assets } = useMockData()
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  // Mock owned assets (first 3 assets)
  const ownedAssets = assets.slice(0, 3)

  // Mock created assets (next 2 assets)
  const createdAssets = assets.slice(3, 5)

  // Filter assets based on search and category
  const filterAssets = (assetList) => {
    return assetList.filter((asset) => {
      const matchesSearch =
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.creator.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = category === "all" || asset.category.toLowerCase() === category.toLowerCase()
      return matchesSearch && matchesCategory
    })
  }

  const filteredOwned = filterAssets(ownedAssets)
  const filteredCreated = filterAssets(createdAssets)

  // Sort assets
  const sortAssets = (assetList) => {
    return [...assetList].sort((a, b) => {
      if (sortBy === "price-high") return Number.parseFloat(b.price) - Number.parseFloat(a.price)
      if (sortBy === "price-low") return Number.parseFloat(a.price) - Number.parseFloat(b.price)
      if (sortBy === "likes") return b.likes - a.likes
      // Default: recent
      return Number.parseInt(b.id) - Number.parseInt(a.id)
    })
  }

  const sortedOwned = sortAssets(filteredOwned)
  const sortedCreated = sortAssets(filteredCreated)

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
            <Briefcase className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium">Your IP Portfolio</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 gradient-text">My Portfolio</h1>
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl">
            Manage your owned and created intellectual property assets on the Starknet blockchain
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
                placeholder="Search assets..."
                className="pl-10 bg-transparent border-white/10 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-4 w-full md:w-auto">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full md:w-[180px] bg-transparent border-white/10">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="art">Art</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="patent">Patents</SelectItem>
                  <SelectItem value="literature">Literature</SelectItem>
                  <SelectItem value="brand">Brand Assets</SelectItem>
                  <SelectItem value="film">Film & Video</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px] bg-transparent border-white/10">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="likes">Most Liked</SelectItem>
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
          <Tabs defaultValue="owned" className="w-full">
            <TabsList className="mb-6 glass-effect">
              <TabsTrigger value="owned">Owned Assets</TabsTrigger>
              <TabsTrigger value="created">Created Assets</TabsTrigger>
              <TabsTrigger value="licensed">Licensed Assets</TabsTrigger>
            </TabsList>

            <TabsContent value="owned">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {sortedOwned.map((asset, index) => (
                  <AssetCard key={asset.id} asset={asset} index={index} />
                ))}
              </div>

              {sortedOwned.length === 0 && (
                <div className="text-center py-20">
                  <h3 className="text-xl font-medium mb-2">No owned assets found</h3>
                  <p className="text-zinc-400 mb-6">Try adjusting your search or filter criteria</p>
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setCategory("all")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="created">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {sortedCreated.map((asset, index) => (
                  <AssetCard key={asset.id} asset={asset} index={index} />
                ))}
              </div>

              {sortedCreated.length === 0 && (
                <div className="text-center py-20">
                  <h3 className="text-xl font-medium mb-2">No created assets found</h3>
                  <p className="text-zinc-400 mb-6">Try adjusting your search or filter criteria</p>
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setCategory("all")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="licensed">
              <div className="text-center py-20">
                <h3 className="text-xl font-medium mb-2">No licensed assets yet</h3>
                <p className="text-zinc-400 mb-6">You haven't licensed any IP assets yet</p>
                <Button onClick={() => (window.location.href = "/explore")}>Explore Licensable Assets</Button>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </PageTransition>
  )
}
