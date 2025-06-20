"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Sparkles,
  ArrowRight,
  Layers,
  Code,
  FileCheck,
  Wallet,
  Zap,
  TrendingUp,
  BarChart3,
  Globe,
  Shield,
  Search,
} from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { useMobile } from "@/src/hooks/use-mobile"
import { useMockData } from "@/src/lib/hooks/use-mock-data"
import { useRouter } from "next/navigation"
import { RecentActivity } from "@/src/components/recent-activity"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Badge } from "@/src/components/ui/badge"
import { Input } from "@/src/components/ui/input"
import { Card, CardContent } from "@/src/components/ui/card"
import AssetCard from "@/src/components/asset-card"
import { CollectionCard } from "@/src/components/collection-card"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const isMobile = useMobile()
  const { assets, collections, activities, stats } = useMockData()
  const router = useRouter()

  useEffect(() => {
    // Simulate loading - reduced time for better UX
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
          <span className="text-lg font-medium">Loading MediaLane</span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <section className="py-12 md:py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl opacity-50" />
        </div>

        <motion.div
          className="max-w-5xl mx-auto text-center space-y-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2"
          >
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium">Decentralized IP Marketplace on Starknet</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            The <span className="text-primary">Programmable IP</span> Platform
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create, license, and trade intellectual property with zero fees on Starknet
          </motion.p>

          <motion.div variants={itemVariants} className="pt-2 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assets, collections, or creators..."
                className="pl-9 pr-24 h-11 rounded-full"
              />
              <Button
                className="absolute right-1 top-1/2 -translate-y-1/2 h-9 rounded-full"
                onClick={() => router.push("/explore")}
              >
                Explore
              </Button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 pt-4">
            <Badge variant="outline" className="px-3 py-1 text-sm cursor-pointer hover:bg-primary/10">
              #Art
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-sm cursor-pointer hover:bg-primary/10">
              #Music
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-sm cursor-pointer hover:bg-primary/10">
              #Patents
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-sm cursor-pointer hover:bg-primary/10">
              #Literature
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-sm cursor-pointer hover:bg-primary/10">
              #Film
            </Badge>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-4xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Zap className="h-5 w-5 text-primary mb-2" />
                <h3 className="font-medium text-sm">Zero Fees</h3>
                <p className="text-xs text-muted-foreground">No gas fees on Starknet</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Shield className="h-5 w-5 text-primary mb-2" />
                <h3 className="font-medium text-sm">Secure</h3>
                <p className="text-xs text-muted-foreground">Zero-knowledge security</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Globe className="h-5 w-5 text-primary mb-2" />
                <h3 className="font-medium text-sm">Permissionless</h3>
                <p className="text-xs text-muted-foreground">Open to everyone</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Code className="h-5 w-5 text-primary mb-2" />
                <h3 className="font-medium text-sm">Programmable</h3>
                <p className="text-xs text-muted-foreground">Custom licensing rules</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Assets Section - 2/3 width on desktop */}
          <div className="lg:col-span-2 space-y-12">
            {/* Featured Assets */}
            <section>
              <div className="flex items-end justify-between mb-6">
                <div>
                  <div className="inline-flex items-center justify-center p-1.5 bg-primary/10 rounded-full mb-2">
                    <TrendingUp className="w-3.5 h-3.5 mr-1.5 text-primary" />
                    <span className="text-xs font-medium">Trending Now</span>
                  </div>
                  <h2 className="text-2xl font-bold">Featured Assets</h2>
                </div>
                <Button variant="ghost" size="sm" onClick={() => router.push("/assets")}>
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="art">Art</TabsTrigger>
                  <TabsTrigger value="music">Music</TabsTrigger>
                  <TabsTrigger value="patent">Patents</TabsTrigger>
                  <TabsTrigger value="brand">Brands</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {assets.slice(0, 6).map((asset) => (
                      <AssetCard key={asset.id} asset={asset} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="art">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {assets
                      .filter((a) => a.category === "Art")
                      .slice(0, 6)
                      .map((asset) => (
                        <AssetCard key={asset.id} asset={asset} />
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="music">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {assets
                      .filter((a) => a.category === "Music")
                      .slice(0, 6)
                      .map((asset) => (
                        <AssetCard key={asset.id} asset={asset} />
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="patent">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {assets
                      .filter((a) => a.category === "Patent")
                      .slice(0, 6)
                      .map((asset) => (
                        <AssetCard key={asset.id} asset={asset} />
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="brand">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {assets
                      .filter((a) => a.category === "Brand")
                      .slice(0, 6)
                      .map((asset) => (
                        <AssetCard key={asset.id} asset={asset} />
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </section>

            {/* Featured Collections */}
            <section>
              <div className="flex items-end justify-between mb-6">
                <div>
                  <div className="inline-flex items-center justify-center p-1.5 bg-primary/10 rounded-full mb-2">
                    <Layers className="w-3.5 h-3.5 mr-1.5 text-primary" />
                    <span className="text-xs font-medium">Curated Collections</span>
                  </div>
                  <h2 className="text-2xl font-bold">Featured Collections</h2>
                </div>
                <Button variant="ghost" size="sm" onClick={() => router.push("/collections")}>
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {collections.slice(0, 4).map((collection) => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - 1/3 width on desktop */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <section>
              <div className="flex items-end justify-between mb-6">
                <div>
                  <div className="inline-flex items-center justify-center p-1.5 bg-primary/10 rounded-full mb-2">
                    <BarChart3 className="w-3.5 h-3.5 mr-1.5 text-primary" />
                    <span className="text-xs font-medium">Live Updates</span>
                  </div>
                  <h2 className="text-2xl font-bold">Recent Activity</h2>
                </div>
              </div>

              <RecentActivity activities={activities} limit={5} />
            </section>

            {/* Platform Stats */}
            <section>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Platform Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total Assets</span>
                      <span className="font-medium">{stats?.assets?.toLocaleString() || "0"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total Users</span>
                      <span className="font-medium">{stats?.users?.toLocaleString() || "0"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Trading Volume</span>
                      <span className="font-medium">{stats?.volume?.toLocaleString() || "0"} STRK</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Transactions</span>
                      <span className="font-medium">{stats?.transactions?.toLocaleString() || "0"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* CTA */}
            <section>
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">Create Your First Asset</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Start tokenizing your intellectual property with programmable rules and zero fees.
                  </p>
                  <Button className="w-full" onClick={() => router.push("/create")}>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>

      {/* Licensing Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2">
              <FileCheck className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm font-medium">Zero-Fee Licensing</span>
            </div>
            <h2 className="text-3xl font-bold">Programmable IP Licensing</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Create custom licensing terms with programmable rules enforced by smart contracts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Programmable Rules</h3>
                <p className="text-muted-foreground mb-4">
                  Define custom licensing terms with programmable conditions and parameters
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2 bg-primary/10">
                      ✓
                    </Badge>
                    Time-based licensing
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2 bg-primary/10">
                      ✓
                    </Badge>
                    Usage limitations
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2 bg-primary/10">
                      ✓
                    </Badge>
                    Revenue sharing
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Instant Settlement</h3>
                <p className="text-muted-foreground mb-4">
                  Automatic royalty distribution and revenue sharing with instant settlement
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2 bg-primary/10">
                      ✓
                    </Badge>
                    Automatic payments
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2 bg-primary/10">
                      ✓
                    </Badge>
                    Multi-party royalties
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2 bg-primary/10">
                      ✓
                    </Badge>
                    Transparent tracking
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Enforcement</h3>
                <p className="text-muted-foreground mb-4">
                  License terms enforced by smart contracts with cryptographic verification
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2 bg-primary/10">
                      ✓
                    </Badge>
                    Tamper-proof terms
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2 bg-primary/10">
                      ✓
                    </Badge>
                    Verifiable usage
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2 bg-primary/10">
                      ✓
                    </Badge>
                    Dispute resolution
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
