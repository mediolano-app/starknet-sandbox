"use client"

import { useState, Suspense, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles, Search, Filter, Wallet, Code } from "lucide-react"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { useMockData } from "@/src/lib/hooks/use-mock-data"
import AssetCard from "@/src/components/asset-card"
import PageTransition from "@/src/components/page-transition"
import { Badge } from "@/src/components/ui/badge"
import { useRouter } from "next/navigation"

// Loading fallback
const LoadingFallback = () => (
  <div className="w-full h-40 flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
  </div>
)

export default function AssetsPage() {
  const { assets } = useMockData()
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.creator.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = category === "all" || asset.category.toLowerCase() === category.toLowerCase()
    return matchesSearch && matchesCategory
  })

  // Sort assets
  const sortedAssets = [...filteredAssets].sort((a, b) => {
    if (sortBy === "price-high") return Number.parseFloat(b.price) - Number.parseFloat(a.price)
    if (sortBy === "price-low") return Number.parseFloat(a.price) - Number.parseFloat(b.price)
    if (sortBy === "likes") return b.likes - a.likes
    // Default: recent
    return Number.parseInt(b.id) - Number.parseInt(a.id)
  })

  const handleCreateAsset = () => {
    router.push("/create")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 md:pt-24 pb-24 md:pb-32 px-4 md:px-8 flex items-center justify-center">
        <LoadingFallback />
      </div>
    )
  }

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
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium">Discover Unique IP Assets</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 gradient-text">Tokenized Intellectual Property</h1>
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl">
            Explore and collect unique digital assets representing intellectual property rights on the Starknet
            blockchain with zero licensing fees
          </p>

          <div className="flex gap-4 mt-6">
            <Button onClick={handleCreateAsset} className="rounded-full">
              <Code className="mr-2 h-4 w-4" />
              Create Asset
            </Button>
            <Button variant="outline" className="rounded-full">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          </div>
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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <h2 className="text-xl font-bold">All Assets</h2>
              <Badge className="ml-3 bg-primary/20 text-primary border-none">{sortedAssets.length} results</Badge>
            </div>
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              Zero Licensing Fees
            </Badge>
          </div>

          <Suspense fallback={<LoadingFallback />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {sortedAssets.map((asset, index) => (
                <AssetCard key={asset.id} asset={asset} index={index} />
              ))}
            </div>
          </Suspense>

          {sortedAssets.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium mb-2">No assets found</h3>
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
        </motion.div>
      </div>
    </PageTransition>
  )
}
