"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Upload,
  FileText,
  ImageIcon,
  Music,
  Video,
  File,
  X,
  Check,
  Sparkles,
  Eye,
  Zap,
  Shield,
  Coins,
  Users,
  Globe,
  Info,
  ChevronDown,
  ChevronUp,
  Code2,
  Palette,
  Camera,
  FileCode,
  Briefcase,
} from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Slider } from "@/src/components/ui/slider"
import { Switch } from "@/src/components/ui/switch"
import { Label } from "@/src/components/ui/label"
import { useToast } from "@/src/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/components/ui/tooltip"
import PageTransition from "@/src/components/page-transition"

export default function CreateAssetPage() {
  const [assetFile, setAssetFile] = useState<File | null>(null)
  const [assetPreview, setAssetPreview] = useState<string | null>(null)
  const [assetName, setAssetName] = useState("")
  const [assetDescription, setAssetDescription] = useState("")
  const [assetCategory, setAssetCategory] = useState("")
  const [assetPrice, setAssetPrice] = useState("")
  const [royaltyPercentage, setRoyaltyPercentage] = useState([5])
  const [allowDerivatives, setAllowDerivatives] = useState(true)
  const [requireAttribution, setRequireAttribution] = useState(true)
  const [commercialUse, setCommercialUse] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    upload: true,
    details: false,
    licensing: false,
    rules: false,
    listing: false,
    preview: false,
  })
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  // Licensing states
  const [licenseType, setLicenseType] = useState("standard")
  const [licensePrice, setLicensePrice] = useState("")
  const [exclusiveLicense, setExclusiveLicense] = useState(false)
  const [geographicRestrictions, setGeographicRestrictions] = useState("worldwide")
  const [usageDuration, setUsageDuration] = useState("unlimited")
  const [customLicenseTerms, setCustomLicenseTerms] = useState("")

  // Listing states
  const [listingType, setListingType] = useState("fixed")
  const [auctionDuration, setAuctionDuration] = useState("7")
  const [reservePrice, setReservePrice] = useState("")
  const [featuredListing, setFeaturedListing] = useState(false)
  const [marketplaceVisibility, setMarketplaceVisibility] = useState("public")
  const [socialMediaPromotion, setSocialMediaPromotion] = useState(true)
  const [listingTags, setListingTags] = useState("")

  const router = useRouter()
  const { toast } = useToast()

  const assetTypes = [
    {
      id: "image",
      name: "Image",
      icon: <ImageIcon className="h-5 w-5" />,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: "audio",
      name: "Audio",
      icon: <Music className="h-5 w-5" />,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      id: "video",
      name: "Video",
      icon: <Video className="h-5 w-5" />,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      id: "document",
      name: "Document",
      icon: <FileText className="h-5 w-5" />,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      id: "code",
      name: "Code",
      icon: <Code2 className="h-5 w-5" />,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      id: "other",
      name: "Other",
      icon: <File className="h-5 w-5" />,
      color: "text-gray-500",
      bgColor: "bg-gray-500/10",
    },
  ]

  const assetCategories = [
    { value: "art", label: "Digital Art", icon: <Palette className="h-4 w-4" /> },
    { value: "music", label: "Music", icon: <Music className="h-4 w-4" /> },
    { value: "video", label: "Video", icon: <Video className="h-4 w-4" /> },
    { value: "photography", label: "Photography", icon: <Camera className="h-4 w-4" /> },
    { value: "literature", label: "Literature", icon: <FileText className="h-4 w-4" /> },
    { value: "code", label: "Source Code", icon: <FileCode className="h-4 w-4" /> },
    { value: "patent", label: "Patent", icon: <Shield className="h-4 w-4" /> },
    { value: "trademark", label: "Trademark", icon: <Briefcase className="h-4 w-4" /> },
    { value: "design", label: "Design", icon: <Sparkles className="h-4 w-4" /> },
    { value: "other", label: "Other", icon: <File className="h-4 w-4" /> },
  ]

  // Real-time validation
  useEffect(() => {
    const errors: Record<string, string> = {}

    if (assetName && assetName.length < 3) {
      errors.assetName = "Asset name must be at least 3 characters"
    }

    if (assetDescription && assetDescription.length < 10) {
      errors.assetDescription = "Description must be at least 10 characters"
    }

    if (assetPrice && (isNaN(Number(assetPrice)) || Number(assetPrice) < 0)) {
      errors.assetPrice = "Price must be a valid positive number"
    }

    setValidationErrors(errors)
  }, [assetName, assetDescription, assetPrice])

  // Auto-expand sections based on completion
  useEffect(() => {
    if (assetFile && !expandedSections.details) {
      setExpandedSections((prev) => ({ ...prev, details: true, upload: false }))
    }
    if (assetName && assetDescription && assetCategory && !expandedSections.licensing) {
      setExpandedSections((prev) => ({ ...prev, licensing: true, details: false }))
    }
    if (licenseType && !expandedSections.rules) {
      setExpandedSections((prev) => ({ ...prev, rules: true, licensing: false }))
    }
    if (assetFile && assetName && assetDescription && !expandedSections.listing) {
      setExpandedSections((prev) => ({ ...prev, listing: true }))
    }
    if (assetFile && assetName && assetDescription && !expandedSections.preview) {
      setExpandedSections((prev) => ({ ...prev, preview: true }))
    }
  }, [assetFile, assetName, assetDescription, assetCategory, licenseType, expandedSections])

  const detectFileType = (file: File) => {
    if (file.type.startsWith("image/")) return "image"
    if (file.type.startsWith("audio/")) return "audio"
    if (file.type.startsWith("video/")) return "video"
    if (file.type.includes("pdf") || file.type.includes("document")) return "document"
    if (
      file.type.includes("text") ||
      file.name.includes(".code") ||
      file.name.includes(".js") ||
      file.name.includes(".py")
    )
      return "code"
    return "other"
  }

  const handleFileChange = useCallback(
    (file: File) => {
      setAssetFile(file)

      // Auto-detect category
      const detectedType = detectFileType(file)
      const category = assetCategories.find((cat) => cat.value === detectedType)?.value || "other"
      setAssetCategory(category)

      // Auto-generate name if empty
      if (!assetName) {
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "")
        setAssetName(nameWithoutExt)
      }

      // Create preview URL
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        const previewUrl = URL.createObjectURL(file)
        setAssetPreview(previewUrl)
      }
    },
    [assetName],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file) {
        handleFileChange(file)
      }
    },
    [handleFileChange],
  )

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const isFormValid = () => {
    return (
      assetFile &&
      assetName.length >= 3 &&
      assetDescription.length >= 10 &&
      assetCategory &&
      Object.keys(validationErrors).length === 0
    )
  }

  const handleSubmit = async () => {
    if (!isFormValid()) {
      toast({
        title: "Form Incomplete",
        description: "Please fill in all required fields correctly",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Asset Created Successfully! 🎉",
      description: "Your programmable IP asset has been created and deployed to Starknet",
    })

    setIsSubmitting(false)
    router.push("/assets")
  }

  const getCompletionPercentage = () => {
    let completed = 0
    const total = 7

    if (assetFile) completed++
    if (assetName.length >= 3) completed++
    if (assetDescription.length >= 10) completed++
    if (assetCategory) completed++
    if (licenseType) completed++
    if (listingType) completed++
    if (assetPrice) completed++

    return Math.round((completed / total) * 100)
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 md:pt-24 pb-24 md:pb-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <Sparkles className="w-5 h-5 mr-2 text-primary" />
              <span className="text-sm font-medium">Create Programmable IP</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Create Your NFT Asset</h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Transform your intellectual property into programmable NFTs with zero gas fees on Starknet
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress Bar */}
              <Card className="premium-glass border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-primary font-medium">{getCompletionPercentage()}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-purple-400 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${getCompletionPercentage()}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Upload Section */}
              <Card className="premium-glass border-primary/20">
                <CardHeader className="cursor-pointer" onClick={() => toggleSection("upload")}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-lg mr-3 ${assetFile ? "bg-green-500/20 text-green-500" : "bg-primary/20 text-primary"}`}
                      >
                        <Upload className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Upload Asset</CardTitle>
                        <CardDescription>
                          {assetFile
                            ? `${assetFile.name} (${(assetFile.size / 1024 / 1024).toFixed(2)} MB)`
                            : "Choose your file to tokenize"}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {assetFile && <Check className="h-5 w-5 text-green-500 mr-2" />}
                      {expandedSections.upload ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                </CardHeader>

                <AnimatePresence>
                  {expandedSections.upload && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="pt-0">
                        {!assetFile ? (
                          <div
                            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                              isDragOver
                                ? "border-primary bg-primary/10 scale-105"
                                : "border-white/20 hover:border-primary/50"
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                          >
                            <div className="space-y-4">
                              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                                <Upload className="h-8 w-8 text-primary" />
                              </div>
                              <div>
                                <p className="text-lg font-medium mb-2">Drag and drop your file here</p>
                                <p className="text-sm text-zinc-400 mb-4">
                                  or{" "}
                                  <label className="text-primary cursor-pointer hover:underline font-medium">
                                    browse files
                                    <input
                                      type="file"
                                      className="hidden"
                                      onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                                    />
                                  </label>
                                </p>
                                <div className="flex flex-wrap justify-center gap-2 text-xs text-zinc-500">
                                  <Badge variant="outline">Images</Badge>
                                  <Badge variant="outline">Audio</Badge>
                                  <Badge variant="outline">Video</Badge>
                                  <Badge variant="outline">Documents</Badge>
                                  <Badge variant="outline">Code</Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                            <div className="flex items-center">
                              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mr-3">
                                {assetTypes.find((type) => type.id === detectFileType(assetFile))?.icon}
                              </div>
                              <div>
                                <p className="font-medium">{assetFile.name}</p>
                                <p className="text-sm text-zinc-400">
                                  {(assetFile.size / 1024 / 1024).toFixed(2)} MB • {assetFile.type}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setAssetFile(null)
                                setAssetPreview(null)
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>

              {/* Details Section */}
              <Card className="premium-glass border-primary/20">
                <CardHeader className="cursor-pointer" onClick={() => toggleSection("details")}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-lg mr-3 ${assetName && assetDescription && assetCategory ? "bg-green-500/20 text-green-500" : "bg-primary/20 text-primary"}`}
                      >
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Asset Details</CardTitle>
                        <CardDescription>Name, description, and category</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {assetName && assetDescription && assetCategory && (
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                      )}
                      {expandedSections.details ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                </CardHeader>

                <AnimatePresence>
                  {expandedSections.details && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="pt-0 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="assetName">
                            Asset Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="assetName"
                            placeholder="Enter a catchy name for your asset"
                            value={assetName}
                            onChange={(e) => setAssetName(e.target.value)}
                            className={validationErrors.assetName ? "border-red-500" : ""}
                          />
                          {validationErrors.assetName && (
                            <p className="text-xs text-red-500">{validationErrors.assetName}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="assetDescription">
                            Description <span className="text-red-500">*</span>
                          </Label>
                          <Textarea
                            id="assetDescription"
                            placeholder="Describe your intellectual property asset and its unique value..."
                            rows={3}
                            value={assetDescription}
                            onChange={(e) => setAssetDescription(e.target.value)}
                            className={validationErrors.assetDescription ? "border-red-500" : ""}
                          />
                          <div className="flex justify-between text-xs">
                            <span className={validationErrors.assetDescription ? "text-red-500" : "text-zinc-500"}>
                              {validationErrors.assetDescription || `${assetDescription.length}/500 characters`}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="assetCategory">
                              Category <span className="text-red-500">*</span>
                            </Label>
                            <Select value={assetCategory} onValueChange={setAssetCategory}>
                              <SelectTrigger id="assetCategory">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {assetCategories.map((category) => (
                                  <SelectItem key={category.value} value={category.value}>
                                    <div className="flex items-center">
                                      {category.icon}
                                      <span className="ml-2">{category.label}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="assetPrice">Price (ETH)</Label>
                            <Input
                              id="assetPrice"
                              type="number"
                              placeholder="0.00"
                              min="0"
                              step="0.01"
                              value={assetPrice}
                              onChange={(e) => setAssetPrice(e.target.value)}
                              className={validationErrors.assetPrice ? "border-red-500" : ""}
                            />
                            {validationErrors.assetPrice && (
                              <p className="text-xs text-red-500">{validationErrors.assetPrice}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>

              {/* Licensing Section */}
              <Card className="premium-glass border-primary/20">
                <CardHeader className="cursor-pointer" onClick={() => toggleSection("licensing")}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-lg mr-3 ${licenseType ? "bg-green-500/20 text-green-500" : "bg-primary/20 text-primary"}`}
                      >
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Licensing Options</CardTitle>
                        <CardDescription>Set how others can license your IP</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {licenseType && <Check className="h-5 w-5 text-green-500 mr-2" />}
                      {expandedSections.licensing ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                </CardHeader>

                <AnimatePresence>
                  {expandedSections.licensing && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="pt-0 space-y-6">
                        <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                          <div className="flex items-center mb-2">
                            <Shield className="h-5 w-5 text-blue-500 mr-2" />
                            <h3 className="font-medium">Zero-Fee Licensing</h3>
                          </div>
                          <p className="text-sm text-zinc-400">
                            Set licensing terms for your IP. Users can license your work with zero platform fees.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="licenseType">License Type</Label>
                            <Select value={licenseType} onValueChange={setLicenseType}>
                              <SelectTrigger id="licenseType">
                                <SelectValue placeholder="Select license type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="standard">Standard License</SelectItem>
                                <SelectItem value="extended">Extended License</SelectItem>
                                <SelectItem value="exclusive">Exclusive License</SelectItem>
                                <SelectItem value="creative-commons">Creative Commons</SelectItem>
                                <SelectItem value="custom">Custom License</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="licensePrice">License Price (ETH)</Label>
                            <Input
                              id="licensePrice"
                              type="number"
                              placeholder="0.00"
                              min="0"
                              step="0.01"
                              value={licensePrice}
                              onChange={(e) => setLicensePrice(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="geographicRestrictions">Geographic Scope</Label>
                            <Select value={geographicRestrictions} onValueChange={setGeographicRestrictions}>
                              <SelectTrigger id="geographicRestrictions">
                                <SelectValue placeholder="Select geographic scope" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="worldwide">Worldwide</SelectItem>
                                <SelectItem value="north-america">North America</SelectItem>
                                <SelectItem value="europe">Europe</SelectItem>
                                <SelectItem value="asia">Asia</SelectItem>
                                <SelectItem value="custom">Custom Regions</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="usageDuration">Usage Duration</Label>
                            <Select value={usageDuration} onValueChange={setUsageDuration}>
                              <SelectTrigger id="usageDuration">
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="unlimited">Unlimited</SelectItem>
                                <SelectItem value="1-year">1 Year</SelectItem>
                                <SelectItem value="2-years">2 Years</SelectItem>
                                <SelectItem value="5-years">5 Years</SelectItem>
                                <SelectItem value="custom">Custom Duration</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg border border-white/10">
                          <div>
                            <Label htmlFor="exclusive-license" className="text-sm font-medium">
                              Exclusive Licensing Available
                            </Label>
                            <p className="text-xs text-zinc-500">Allow exclusive licensing agreements</p>
                          </div>
                          <Switch
                            id="exclusive-license"
                            checked={exclusiveLicense}
                            onCheckedChange={setExclusiveLicense}
                          />
                        </div>

                        {licenseType === "custom" && (
                          <div className="space-y-2">
                            <Label htmlFor="customLicenseTerms">Custom License Terms</Label>
                            <Textarea
                              id="customLicenseTerms"
                              placeholder="Define your custom licensing terms..."
                              rows={3}
                              value={customLicenseTerms}
                              onChange={(e) => setCustomLicenseTerms(e.target.value)}
                            />
                          </div>
                        )}
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>

              {/* Programmable Rules Section */}
              <Card className="premium-glass border-primary/20">
                <CardHeader className="cursor-pointer" onClick={() => toggleSection("rules")}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg mr-3 bg-primary/20 text-primary">
                        <Zap className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Programmable Rules</CardTitle>
                        <CardDescription>Define smart contract rules for your IP</CardDescription>
                      </div>
                    </div>
                    {expandedSections.rules ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                </CardHeader>

                <AnimatePresence>
                  {expandedSections.rules && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="pt-0 space-y-6">
                        <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                          <div className="flex items-center mb-2">
                            <Code2 className="h-5 w-5 text-primary mr-2" />
                            <h3 className="font-medium">Smart Contract Rules</h3>
                          </div>
                          <p className="text-sm text-zinc-400">
                            These rules will be encoded in smart contracts on Starknet and automatically enforced.
                          </p>
                        </div>

                        <div className="space-y-6">
                          {/* Royalty Percentage */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Coins className="h-4 w-4 mr-2 text-yellow-500" />
                                <Label htmlFor="royalty">Royalty Percentage</Label>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Info className="h-4 w-4 ml-2 text-zinc-400" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Percentage you earn from each resale</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                              <span className="text-sm font-medium bg-primary/20 px-2 py-1 rounded">
                                {royaltyPercentage[0]}%
                              </span>
                            </div>
                            <Slider
                              id="royalty"
                              min={0}
                              max={30}
                              step={1}
                              value={royaltyPercentage}
                              onValueChange={setRoyaltyPercentage}
                              className="w-full"
                            />
                          </div>

                          {/* Usage Rights */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center justify-between p-4 rounded-lg border border-white/10">
                              <div className="flex items-center">
                                <Globe className="h-4 w-4 mr-2 text-blue-500" />
                                <div>
                                  <Label htmlFor="commercial-use" className="text-sm font-medium">
                                    Commercial Use
                                  </Label>
                                  <p className="text-xs text-zinc-500">Allow commercial usage</p>
                                </div>
                              </div>
                              <Switch id="commercial-use" checked={commercialUse} onCheckedChange={setCommercialUse} />
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-lg border border-white/10">
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-2 text-green-500" />
                                <div>
                                  <Label htmlFor="derivatives" className="text-sm font-medium">
                                    Derivatives
                                  </Label>
                                  <p className="text-xs text-zinc-500">Allow derivative works</p>
                                </div>
                              </div>
                              <Switch
                                id="derivatives"
                                checked={allowDerivatives}
                                onCheckedChange={setAllowDerivatives}
                              />
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-lg border border-white/10">
                              <div className="flex items-center">
                                <Shield className="h-4 w-4 mr-2 text-purple-500" />
                                <div>
                                  <Label htmlFor="attribution" className="text-sm font-medium">
                                    Attribution
                                  </Label>
                                  <p className="text-xs text-zinc-500">Require credit</p>
                                </div>
                              </div>
                              <Switch
                                id="attribution"
                                checked={requireAttribution}
                                onCheckedChange={setRequireAttribution}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>

              {/* Listing Section */}
              <Card className="premium-glass border-primary/20">
                <CardHeader className="cursor-pointer" onClick={() => toggleSection("listing")}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-lg mr-3 ${listingType ? "bg-green-500/20 text-green-500" : "bg-primary/20 text-primary"}`}
                      >
                        <Globe className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Marketplace Listing</CardTitle>
                        <CardDescription>Configure how your asset appears in the marketplace</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {listingType && <Check className="h-5 w-5 text-green-500 mr-2" />}
                      {expandedSections.listing ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                </CardHeader>

                <AnimatePresence>
                  {expandedSections.listing && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="pt-0 space-y-6">
                        <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                          <div className="flex items-center mb-2">
                            <Globe className="h-5 w-5 text-purple-500 mr-2" />
                            <h3 className="font-medium">Global Marketplace</h3>
                          </div>
                          <p className="text-sm text-zinc-400">
                            Configure how your asset will be listed and discovered in the marketplace.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="listingType">Listing Type</Label>
                            <Select value={listingType} onValueChange={setListingType}>
                              <SelectTrigger id="listingType">
                                <SelectValue placeholder="Select listing type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="fixed">Fixed Price</SelectItem>
                                <SelectItem value="auction">Auction</SelectItem>
                                <SelectItem value="both">Fixed Price + Auction</SelectItem>
                                <SelectItem value="offers">Accept Offers Only</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="marketplaceVisibility">Visibility</Label>
                            <Select value={marketplaceVisibility} onValueChange={setMarketplaceVisibility}>
                              <SelectTrigger id="marketplaceVisibility">
                                <SelectValue placeholder="Select visibility" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="public">Public</SelectItem>
                                <SelectItem value="unlisted">Unlisted (Direct Link Only)</SelectItem>
                                <SelectItem value="private">Private</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {(listingType === "auction" || listingType === "both") && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="auctionDuration">Auction Duration (Days)</Label>
                              <Select value={auctionDuration} onValueChange={setAuctionDuration}>
                                <SelectTrigger id="auctionDuration">
                                  <SelectValue placeholder="Select duration" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1 Day</SelectItem>
                                  <SelectItem value="3">3 Days</SelectItem>
                                  <SelectItem value="7">7 Days</SelectItem>
                                  <SelectItem value="14">14 Days</SelectItem>
                                  <SelectItem value="30">30 Days</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="reservePrice">Reserve Price (ETH)</Label>
                              <Input
                                id="reservePrice"
                                type="number"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                value={reservePrice}
                                onChange={(e) => setReservePrice(e.target.value)}
                              />
                            </div>
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="listingTags">Tags & Keywords</Label>
                          <Input
                            id="listingTags"
                            placeholder="Enter tags separated by commas (e.g., digital art, abstract, modern)"
                            value={listingTags}
                            onChange={(e) => setListingTags(e.target.value)}
                          />
                          <p className="text-xs text-zinc-500">
                            Help users discover your asset with relevant tags and keywords
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center justify-between p-4 rounded-lg border border-white/10">
                            <div>
                              <Label htmlFor="featured-listing" className="text-sm font-medium">
                                Featured Listing
                              </Label>
                              <p className="text-xs text-zinc-500">Boost visibility (additional fee applies)</p>
                            </div>
                            <Switch
                              id="featured-listing"
                              checked={featuredListing}
                              onCheckedChange={setFeaturedListing}
                            />
                          </div>

                          <div className="flex items-center justify-between p-4 rounded-lg border border-white/10">
                            <div>
                              <Label htmlFor="social-promotion" className="text-sm font-medium">
                                Social Media Promotion
                              </Label>
                              <p className="text-xs text-zinc-500">Share on social platforms</p>
                            </div>
                            <Switch
                              id="social-promotion"
                              checked={socialMediaPromotion}
                              onCheckedChange={setSocialMediaPromotion}
                            />
                          </div>
                        </div>

                        {featuredListing && (
                          <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                            <div className="flex items-center mb-2">
                              <Sparkles className="h-4 w-4 text-yellow-500 mr-2" />
                              <h4 className="font-medium text-yellow-500">Featured Listing Benefits</h4>
                            </div>
                            <ul className="text-sm text-zinc-400 space-y-1">
                              <li>• Priority placement in search results</li>
                              <li>• Homepage featured section inclusion</li>
                              <li>• Social media promotion</li>
                              <li>• Email newsletter inclusion</li>
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </div>

            {/* Preview Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Live Preview */}
                <Card className="premium-glass border-primary/20">
                  <CardHeader>
                    <div className="flex items-center">
                      <Eye className="h-5 w-5 mr-2 text-primary" />
                      <CardTitle className="text-lg">Live Preview</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* NFT Preview */}
                    <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10">
                      {assetPreview ? (
                        <img
                          src={assetPreview || "/placeholder.svg"}
                          alt="Asset preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <ImageIcon className="h-12 w-12 text-zinc-600 mx-auto mb-2" />
                            <p className="text-sm text-zinc-500">Upload file to preview</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Asset Info */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg">{assetName || "Untitled Asset"}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {assetCategory && (
                            <Badge variant="outline" className="text-xs">
                              {assetCategories.find((cat) => cat.value === assetCategory)?.label}
                            </Badge>
                          )}
                          <Badge className="text-xs bg-primary/20 text-primary border-primary/20">
                            Programmable IP
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-zinc-400">
                        {assetDescription || "Add a description to see it here..."}
                      </p>

                      {assetPrice && (
                        <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                          <span className="text-sm font-medium">Price</span>
                          <span className="font-bold text-primary">{assetPrice} ETH</span>
                        </div>
                      )}

                      {licensePrice && (
                        <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                          <span className="text-sm font-medium">License Price</span>
                          <span className="font-bold text-blue-500">{licensePrice} ETH</span>
                        </div>
                      )}

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Royalty:</span>
                          <span>{royaltyPercentage[0]}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Commercial Use:</span>
                          <span className={commercialUse ? "text-green-500" : "text-red-500"}>
                            {commercialUse ? "Allowed" : "Restricted"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Derivatives:</span>
                          <span className={allowDerivatives ? "text-green-500" : "text-red-500"}>
                            {allowDerivatives ? "Allowed" : "Restricted"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">License Type:</span>
                          <span className="capitalize">{licenseType.replace("-", " ")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Listing Type:</span>
                          <span className="capitalize">{listingType.replace("-", " ")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Geographic Scope:</span>
                          <span className="capitalize">{geographicRestrictions.replace("-", " ")}</span>
                        </div>
                        {featuredListing && (
                          <div className="flex justify-between">
                            <span className="text-zinc-500">Featured:</span>
                            <span className="text-yellow-500">Yes</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Benefits */}
                <Card className="premium-glass border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-500">Zero-Fee Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Zap className="h-4 w-4 mr-2 text-green-500" />
                      <span>Zero gas fees on Starknet</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Shield className="h-4 w-4 mr-2 text-green-500" />
                      <span>Smart contract protection</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Coins className="h-4 w-4 mr-2 text-green-500" />
                      <span>Automatic royalty distribution</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Globe className="h-4 w-4 mr-2 text-green-500" />
                      <span>Global licensing marketplace</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Create Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid() || isSubmitting}
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></div>
                      Creating NFT...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Create Programmable IP
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
