"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Share2,
  Download,
  Code,
  FileCheck,
  Layers,
  Shield,
  Copy,
  ExternalLink,
  Tag,
  Users,
  Sparkles,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Separator } from "@/src/components/ui/separator"
import { mockAssets, mockCreators } from "@/src/lib/data/mock-data"
import { useToast } from "@/src/components/ui/use-toast"
import { useMobile } from "@/src/hooks/use-mobile"

export default function AssetDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const isMobile = useMobile()
  const [asset, setAsset] = useState(null)
  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("details")

  // Simulated loading of asset data
  useEffect(() => {
    const assetId = params.id
    // Find the asset in mock data
    const foundAsset = mockAssets.find((a) => a.id === assetId)

    if (foundAsset) {
      setAsset(foundAsset)
      // Find the creator
      const foundCreator = mockCreators.find((c) => c.name === foundAsset.creator)
      if (foundCreator) {
        setCreator(foundCreator)
      }
    }

    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [params.id])

  const handleLicense = () => {
    toast({
      title: "Licensing Process Started",
      description: "Starting the zero-fee licensing process for this asset.",
      duration: 3000,
    })
    // Would navigate to licensing flow in a real app
    router.push(`/licensing/${params.id}`)
  }

  const handleShare = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link Copied",
      description: "Asset link copied to clipboard",
      duration: 2000,
    })
  }

  const handleBack = () => {
    router.back()
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-800/20 rounded-xl mb-6"></div>
            <div className="h-8 bg-gray-800/20 rounded-lg w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-800/20 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-800/20 rounded w-3/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-32 bg-gray-800/20 rounded-lg"></div>
              <div className="h-32 bg-gray-800/20 rounded-lg"></div>
              <div className="h-32 bg-gray-800/20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!asset) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="w-full max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Asset Not Found</h1>
          <p className="mb-6">The asset you're looking for doesn't exist or has been removed.</p>
          <Button onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  // Generate some mock programmable rules for the asset
  const programmableRules = [
    {
      name: "Commercial Usage",
      description: "This asset can be used for commercial purposes with proper attribution",
      icon: <Tag className="h-5 w-5" />,
    },
    {
      name: "Derivative Works",
      description: "Creation of derivative works is permitted with revenue sharing",
      icon: <Layers className="h-5 w-5" />,
    },
    {
      name: "Geographic Restrictions",
      description: "No usage restrictions based on geographic location",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      name: "Attribution Required",
      description: "Creator attribution is required for all usage",
      icon: <Users className="h-5 w-5" />,
    },
  ]

  // Mock transaction history
  const transactionHistory = [
    {
      type: "Mint",
      from: "Creator",
      to: "CryptoArtist",
      date: "2023-05-10",
      txHash: "0x1234...5678",
    },
    {
      type: "License",
      from: "CryptoArtist",
      to: "DigitalStudio",
      date: "2023-06-15",
      txHash: "0x8765...4321",
    },
    {
      type: "License",
      from: "CryptoArtist",
      to: "MediaCompany",
      date: "2023-07-22",
      txHash: "0xabcd...efgh",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Back button */}
        <Button variant="ghost" size="sm" onClick={handleBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Assets
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Asset Image - Takes up 3 columns on large screens */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="relative rounded-xl overflow-hidden border border-white/10 glass-effect"
            >
              <div className="aspect-square md:aspect-[4/3]">
                <img src={asset.image || "/placeholder.svg"} alt={asset.name} className="w-full h-full object-cover" />
              </div>

              {/* Asset category badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <Badge className="bg-black/50 hover:bg-black/70">{asset.category}</Badge>
                <Badge className="bg-primary/50 hover:bg-primary/70 flex items-center gap-1">
                  <Code className="h-3 w-3" /> Programmable
                </Badge>
                {Math.random() > 0.5 && (
                  <Badge className="bg-purple-500/50 hover:bg-purple-500/70 flex items-center gap-1">
                    <FileCheck className="h-3 w-3" /> RWA
                  </Badge>
                )}
              </div>

              {/* Action buttons */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button size="sm" variant="secondary" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                  {!isMobile && <span className="ml-2">Share</span>}
                </Button>
                <Button size="sm" variant="secondary">
                  <Download className="h-4 w-4" />
                  {!isMobile && <span className="ml-2">Preview</span>}
                </Button>
              </div>
            </motion.div>

            {/* Mobile action buttons */}
            {isMobile && (
              <div className="flex gap-2 mt-4">
                <Button className="flex-1" onClick={handleLicense}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  License (Zero Fee)
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            )}
          </div>

          {/* Asset Details - Takes up 2 columns on large screens */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="space-y-6">
              {/* Asset title and creator */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{asset.name}</h1>
                <div className="flex items-center mt-2">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={asset.creatorAvatar || "/placeholder.svg"} alt={asset.creator} />
                    <AvatarFallback>{asset.creator.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    Created by <span className="text-primary font-medium">{asset.creator}</span>
                  </span>
                </div>
              </div>

              {/* Asset description */}
              <p className="text-muted-foreground">{asset.description}</p>

              {/* Starknet details */}
              <div className="p-3 rounded-lg bg-black/10 border border-white/5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Token ID</span>
                  <div className="flex items-center">
                    <span className="font-mono">0x{Math.random().toString(16).substring(2, 10)}...</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Blockchain</span>
                  <div className="flex items-center">
                    <span>Starknet</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Created</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>

              {/* Desktop license button */}
              {!isMobile && (
                <Button size="lg" className="w-full" onClick={handleLicense}>
                  <Sparkles className="mr-2 h-5 w-5" />
                  License This Asset (Zero Fee)
                </Button>
              )}

              {/* Asset price */}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Current Price</span>
                <span className="text-xl font-bold">{asset.price}</span>
              </div>

              {/* Zero-fee badge */}
              <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 p-3 rounded-lg border border-emerald-500/30">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-emerald-400 mr-2" />
                  <span className="font-medium text-emerald-400">Zero-Fee Licensing</span>
                </div>
                <p className="text-sm mt-1 text-muted-foreground">
                  This asset can be licensed with zero platform fees on the MediaLane protocol.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs for additional information */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <Tabs defaultValue="details" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="programmable">Programmable Rules</TabsTrigger>
              <TabsTrigger value="history">Provenance</TabsTrigger>
              <TabsTrigger value="licensing">Licensing</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Asset Details</CardTitle>
                  <CardDescription>Comprehensive information about this digital asset</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Category</h4>
                      <p>{asset.category}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Asset Type</h4>
                      <p>Programmable IP</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Creation Date</h4>
                      <p>{new Date().toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">File Format</h4>
                      <p>Digital Image (PNG)</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Resolution</h4>
                      <p>3000 x 3000 px</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">File Size</h4>
                      <p>12.4 MB</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Full Description</h4>
                    <p className="text-sm">
                      {asset.description} This asset represents a unique piece of intellectual property that has been
                      tokenized on the Starknet blockchain using zero-knowledge proofs. The owner of this token has
                      specific rights as defined in the programmable rules section.
                    </p>
                    <p className="text-sm mt-2">
                      The asset can be licensed with zero platform fees, allowing for efficient and cost-effective IP
                      management. All transactions and licensing agreements are recorded on-chain for maximum
                      transparency and provenance tracking.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="programmable" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Programmable IP Rules</CardTitle>
                  <CardDescription>Smart contract enforced rules that govern this asset's usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {programmableRules.map((rule, index) => (
                      <div key={index} className="flex">
                        <div className="mr-3 h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                          {rule.icon}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">{rule.name}</h4>
                          <p className="text-sm text-muted-foreground">{rule.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <div className="bg-black/10 rounded-lg p-4 border border-white/5">
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <Code className="h-4 w-4 mr-2" />
                      Smart Contract Rules
                    </h4>
                    <div className="font-mono text-xs overflow-x-auto p-2 bg-black/20 rounded-md">
                      <pre>
                        {`// Simplified representation of on-chain rules
{
  "assetId": "${asset.id}",
  "owner": "0x${Math.random().toString(16).substring(2, 42)}",
  "rules": {
    "commercial": true,
    "derivatives": true,
    "attribution": true,
    "geographic": "unrestricted",
    "royalties": "5%",
    "transferable": true
  }
}`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Provenance & History</CardTitle>
                  <CardDescription>Complete on-chain history of this asset</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {transactionHistory.map((tx, index) => (
                      <div key={index} className="flex items-start">
                        <div className="mr-3 h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                          {tx.type === "Mint" ? (
                            <Sparkles className="h-5 w-5" />
                          ) : tx.type === "Transfer" ? (
                            <ArrowRight className="h-5 w-5" />
                          ) : (
                            <FileCheck className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">{tx.type}</h4>
                            <span className="text-xs text-muted-foreground">{tx.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            From <span className="text-primary">{tx.from}</span> to{" "}
                            <span className="text-primary">{tx.to}</span>
                          </p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs font-mono text-muted-foreground">{tx.txHash}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-3 rounded-lg bg-black/10 border border-white/5 text-center">
                    <p className="text-sm text-muted-foreground">
                      All transactions are recorded on Starknet with zero-knowledge proofs for privacy and security.
                    </p>
                    <Button variant="link" size="sm" className="mt-1">
                      View Full History
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="licensing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Licensing Options</CardTitle>
                  <CardDescription>Available licensing models for this asset with zero platform fees</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-lg border border-white/10 bg-black/5 hover:bg-black/10 transition-colors">
                      <h3 className="text-lg font-medium mb-1">Standard License</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Basic usage rights for personal and limited commercial use
                      </p>
                      <Badge variant="outline" className="mb-4">
                        Zero Platform Fee
                      </Badge>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          Personal use
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          Limited commercial use
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          Digital display
                        </li>
                        <li className="flex items-center">
                          <X className="h-4 w-4 mr-2 text-red-500" />
                          Derivative works
                        </li>
                      </ul>
                      <Button className="w-full mt-4" variant="outline" onClick={handleLicense}>
                        License Now
                      </Button>
                    </div>

                    <div className="p-4 rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors">
                      <h3 className="text-lg font-medium mb-1">Extended License</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Full commercial rights including derivative works
                      </p>
                      <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
                        Zero Platform Fee
                      </Badge>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          Personal use
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          Unlimited commercial use
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          Digital and physical display
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          Derivative works allowed
                        </li>
                      </ul>
                      <Button className="w-full mt-4" onClick={handleLicense}>
                        License Now
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 p-4 rounded-lg border border-emerald-500/30">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-emerald-400 mr-2" />
                      <span className="font-medium text-emerald-400">Custom Licensing Available</span>
                    </div>
                    <p className="text-sm mt-1 text-muted-foreground">
                      Need a custom licensing arrangement? Contact the creator directly to negotiate terms.
                    </p>
                    <Button variant="outline" size="sm" className="mt-3">
                      Contact Creator
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Related assets */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-xl font-bold mb-6">More from this Creator</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockAssets
              .filter((a) => a.creator === asset.creator && a.id !== asset.id)
              .slice(0, 4)
              .map((relatedAsset, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden border border-white/10 hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => router.push(`/assets/${relatedAsset.id}`)}
                >
                  <div className="aspect-square">
                    <img
                      src={relatedAsset.image || "/placeholder.svg"}
                      alt={relatedAsset.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm truncate">{relatedAsset.name}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{relatedAsset.category}</span>
                      <span className="text-xs font-medium">{relatedAsset.price}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Missing component definition
function ArrowRight(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

// Missing component definition
function Check(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

// Missing component definition
function Globe(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

// Missing component definition
function X(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
