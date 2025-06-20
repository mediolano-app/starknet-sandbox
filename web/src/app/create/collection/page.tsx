"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Upload,
  ImageIcon,
  FileText,
  Settings,
  Eye,
  Check,
  X,
  Plus,
  Globe,
  Zap,
  Tag,
  Shield,
  Sparkles,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Label } from "@/src/components/ui/label"
import { Switch } from "@/src/components/ui/switch"
import { Slider } from "@/src/components/ui/slider"
import { Badge } from "@/src/components/ui/badge"
import { Progress } from "@/src/components/ui/progress"
import { useToast } from "@/src/components/ui/use-toast"
import { useMobile } from "@/src/hooks/use-mobile"
import { cn } from "@/src/lib/utils"

export default function CreateCollectionPage() {
  const { toast } = useToast()
  const isMobile = useMobile()

  // Form state
  const [formData, setFormData] = useState({
    // Basic Information
    name: "",
    description: "",
    symbol: "",
    category: "",
    tags: [],

    // Media
    coverImage: null,
    bannerImage: null,
    logoImage: null,

    // Collection Settings
    maxSupply: 10000,
    isUnlimited: false,
    royaltyPercentage: 5,

    // Visibility & Access
    isPublic: true,
    isVerified: false,
    allowCollaborators: false,

    // Advanced Settings
    enableRevealDate: false,
    revealDate: "",
    enableWhitelist: false,
    whitelistAddresses: [],

    // Social Links
    website: "",
    twitter: "",
    discord: "",
    instagram: "",
  })

  // UI state
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    media: false,
    settings: false,
    visibility: false,
    advanced: false,
    social: false,
  })

  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [currentTag, setCurrentTag] = useState("")

  // Calculate completion percentage
  const calculateCompletion = () => {
    let completed = 0
    const total = 6

    if (formData.name && formData.description && formData.symbol) completed++
    if (formData.coverImage) completed++
    if (formData.maxSupply > 0) completed++
    if (formData.category) completed++
    if (formData.tags.length > 0) completed++
    if (formData.website || formData.twitter) completed++

    return Math.round((completed / total) * 100)
  }

  const completionPercentage = calculateCompletion()

  // Auto-expand sections based on completion
  useEffect(() => {
    const newExpanded = { ...expandedSections }

    if (formData.name && formData.description && formData.symbol && !expandedSections.media) {
      newExpanded.media = true
    }
    if (formData.coverImage && !expandedSections.settings) {
      newExpanded.settings = true
    }
    if (formData.maxSupply && !expandedSections.visibility) {
      newExpanded.visibility = true
    }

    setExpandedSections(newExpanded)
  }, [formData])

  // Handle file upload simulation
  const handleFileUpload = async (file, type) => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setFormData((prev) => ({
            ...prev,
            [type]: {
              name: file.name,
              size: file.size,
              type: file.type,
              url: URL.createObjectURL(file),
            },
          }))
          toast({
            title: "Upload Complete",
            description: `${file.name} uploaded successfully`,
          })
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e, type) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0], type)
    }
  }

  // Add tag
  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  // Remove tag
  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  // Toggle section
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Handle form submission
  const handleSubmit = () => {
    toast({
      title: "Collection Created!",
      description: "Your collection has been successfully created and is now live.",
      duration: 5000,
    })
  }

  const categories = [
    "Art",
    "Photography",
    "Music",
    "Video",
    "Gaming",
    "Sports",
    "Collectibles",
    "Utility",
    "Metaverse",
    "PFP",
    "Memes",
    "Other",
  ]

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-8 space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                Create New Collection
              </h1>
              <p className="text-gray-400 text-lg">Build your own NFT collection with programmable IP features</p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-effect rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-300">Collection Progress</span>
                <span className="text-sm font-bold text-purple-400">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
              <p className="text-xs text-gray-500 mt-2">Complete all sections to publish your collection</p>
            </motion.div>

            {/* Basic Information Section */}
            <CollectionSection
              title="Basic Information"
              icon={FileText}
              isExpanded={expandedSections.basic}
              onToggle={() => toggleSection("basic")}
              isCompleted={formData.name && formData.description && formData.symbol}
              color="text-purple-400"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Collection Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter collection name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="bg-black/40 border-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="symbol">Symbol *</Label>
                  <Input
                    id="symbol"
                    placeholder="e.g., MYCOL"
                    value={formData.symbol}
                    onChange={(e) => setFormData((prev) => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
                    className="bg-black/40 border-white/10"
                    maxLength={10}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your collection..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="bg-black/40 border-white/10 min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full p-3 bg-black/40 border border-white/10 rounded-lg text-white"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add tag"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                      className="bg-black/40 border-white/10"
                    />
                    <Button onClick={addTag} size="sm" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-purple-500/20">
                        {tag}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CollectionSection>

            {/* Media Section */}
            <CollectionSection
              title="Collection Media"
              icon={ImageIcon}
              isExpanded={expandedSections.media}
              onToggle={() => toggleSection("media")}
              isCompleted={formData.coverImage}
              color="text-blue-400"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Cover Image */}
                <FileUploadArea
                  title="Cover Image"
                  description="400x400px recommended"
                  file={formData.coverImage}
                  onFileUpload={(file) => handleFileUpload(file, "coverImage")}
                  dragActive={dragActive}
                  onDrag={handleDrag}
                  onDrop={(e) => handleDrop(e, "coverImage")}
                  required
                />

                {/* Banner Image */}
                <FileUploadArea
                  title="Banner Image"
                  description="1200x400px recommended"
                  file={formData.bannerImage}
                  onFileUpload={(file) => handleFileUpload(file, "bannerImage")}
                  dragActive={dragActive}
                  onDrag={handleDrag}
                  onDrop={(e) => handleDrop(e, "bannerImage")}
                />

                {/* Logo Image */}
                <FileUploadArea
                  title="Logo"
                  description="200x200px recommended"
                  file={formData.logoImage}
                  onFileUpload={(file) => handleFileUpload(file, "logoImage")}
                  dragActive={dragActive}
                  onDrag={handleDrag}
                  onDrop={(e) => handleDrop(e, "logoImage")}
                />
              </div>

              {isUploading && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Uploading...</span>
                    <span className="text-sm text-purple-400">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
            </CollectionSection>

            {/* Collection Settings */}
            <CollectionSection
              title="Collection Settings"
              icon={Settings}
              isExpanded={expandedSections.settings}
              onToggle={() => toggleSection("settings")}
              isCompleted={formData.maxSupply > 0}
              color="text-green-400"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Unlimited Supply</Label>
                    <Switch
                      checked={formData.isUnlimited}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isUnlimited: checked }))}
                    />
                  </div>

                  {!formData.isUnlimited && (
                    <div className="space-y-2">
                      <Label>Maximum Supply</Label>
                      <Input
                        type="number"
                        value={formData.maxSupply}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, maxSupply: Number.parseInt(e.target.value) || 0 }))
                        }
                        className="bg-black/40 border-white/10"
                        min="1"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Creator Royalty: {formData.royaltyPercentage}%</Label>
                    <Slider
                      value={[formData.royaltyPercentage]}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, royaltyPercentage: value[0] }))}
                      max={10}
                      step={0.5}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500">Percentage you'll earn from secondary sales</p>
                  </div>
                </div>
              </div>
            </CollectionSection>

            {/* Visibility & Access */}
            <CollectionSection
              title="Visibility & Access"
              icon={Eye}
              isExpanded={expandedSections.visibility}
              onToggle={() => toggleSection("visibility")}
              isCompleted={true}
              color="text-cyan-400"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Public Collection</Label>
                      <p className="text-xs text-gray-500">Visible to everyone</p>
                    </div>
                    <Switch
                      checked={formData.isPublic}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPublic: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow Collaborators</Label>
                      <p className="text-xs text-gray-500">Let others add to collection</p>
                    </div>
                    <Switch
                      checked={formData.allowCollaborators}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, allowCollaborators: checked }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-medium text-blue-400">Verification Status</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      Submit for verification to get a blue checkmark and increased visibility
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Apply for Verification
                    </Button>
                  </div>
                </div>
              </div>
            </CollectionSection>

            {/* Advanced Settings */}
            <CollectionSection
              title="Advanced Settings"
              icon={Zap}
              isExpanded={expandedSections.advanced}
              onToggle={() => toggleSection("advanced")}
              isCompleted={false}
              color="text-orange-400"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Reveal Date</Label>
                    <p className="text-xs text-gray-500">Hide metadata until reveal</p>
                  </div>
                  <Switch
                    checked={formData.enableRevealDate}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, enableRevealDate: checked }))}
                  />
                </div>

                {formData.enableRevealDate && (
                  <div className="space-y-2">
                    <Label>Reveal Date</Label>
                    <Input
                      type="datetime-local"
                      value={formData.revealDate}
                      onChange={(e) => setFormData((prev) => ({ ...prev, revealDate: e.target.value }))}
                      className="bg-black/40 border-white/10"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Whitelist</Label>
                    <p className="text-xs text-gray-500">Restrict minting to specific addresses</p>
                  </div>
                  <Switch
                    checked={formData.enableWhitelist}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, enableWhitelist: checked }))}
                  />
                </div>

                {formData.enableWhitelist && (
                  <div className="space-y-2">
                    <Label>Whitelist Addresses</Label>
                    <Textarea
                      placeholder="Enter wallet addresses (one per line)"
                      className="bg-black/40 border-white/10"
                      rows={4}
                    />
                  </div>
                )}
              </div>
            </CollectionSection>

            {/* Social Links */}
            <CollectionSection
              title="Social Links"
              icon={Globe}
              isExpanded={expandedSections.social}
              onToggle={() => toggleSection("social")}
              isCompleted={formData.website || formData.twitter}
              color="text-pink-400"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input
                    placeholder="https://yourwebsite.com"
                    value={formData.website}
                    onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                    className="bg-black/40 border-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Twitter</Label>
                  <Input
                    placeholder="@yourusername"
                    value={formData.twitter}
                    onChange={(e) => setFormData((prev) => ({ ...prev, twitter: e.target.value }))}
                    className="bg-black/40 border-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Discord</Label>
                  <Input
                    placeholder="Discord invite link"
                    value={formData.discord}
                    onChange={(e) => setFormData((prev) => ({ ...prev, discord: e.target.value }))}
                    className="bg-black/40 border-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Instagram</Label>
                  <Input
                    placeholder="@yourusername"
                    value={formData.instagram}
                    onChange={(e) => setFormData((prev) => ({ ...prev, instagram: e.target.value }))}
                    className="bg-black/40 border-white/10"
                  />
                </div>
              </div>
            </CollectionSection>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4"
            >
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-6 text-lg font-semibold"
                disabled={completionPercentage < 50}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Create Collection
              </Button>
              <Button variant="outline" className="px-8 py-6">
                Save Draft
              </Button>
            </motion.div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <CollectionPreview formData={formData} completionPercentage={completionPercentage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Collection Section Component
const CollectionSection = ({ title, icon: Icon, isExpanded, onToggle, isCompleted, color, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={cn(
      "glass-effect rounded-2xl border transition-all duration-300",
      isExpanded ? "border-white/20" : "border-white/10",
      isCompleted ? "bg-green-500/5 border-green-500/20" : "",
    )}
  >
    <div className="p-6 cursor-pointer flex items-center justify-between" onClick={onToggle}>
      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-lg bg-black/40", isCompleted ? "bg-green-500/20" : "")}>
          {isCompleted ? <Check className="h-5 w-5 text-green-400" /> : <Icon className={cn("h-5 w-5", color)} />}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <ChevronRight className={cn("h-5 w-5 transition-transform duration-200", isExpanded ? "rotate-90" : "")} />
    </div>

    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-6 space-y-4 border-t border-white/10">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
)

// File Upload Area Component
const FileUploadArea = ({ title, description, file, onFileUpload, dragActive, onDrag, onDrop, required = false }) => (
  <div className="space-y-2">
    <Label className="flex items-center gap-1">
      {title}
      {required && <span className="text-red-400">*</span>}
    </Label>
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 cursor-pointer",
        dragActive ? "border-purple-400 bg-purple-400/10" : "border-gray-600 hover:border-gray-500",
        file ? "border-green-400 bg-green-400/10" : "",
      )}
      onDragEnter={onDrag}
      onDragLeave={onDrag}
      onDragOver={onDrag}
      onDrop={onDrop}
      onClick={() => document.getElementById(`file-${title}`)?.click()}
    >
      <input
        id={`file-${title}`}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && onFileUpload(e.target.files[0])}
      />

      {file ? (
        <div className="space-y-2">
          <img src={file.url || "/placeholder.svg"} alt={title} className="w-16 h-16 object-cover rounded-lg mx-auto" />
          <p className="text-sm text-green-400 font-medium">{file.name}</p>
        </div>
      ) : (
        <div className="space-y-2">
          <Upload className="h-8 w-8 mx-auto text-gray-400" />
          <p className="text-sm text-gray-400">{description}</p>
          <p className="text-xs text-gray-500">Click or drag to upload</p>
        </div>
      )}
    </div>
  </div>
)

// Collection Preview Component
const CollectionPreview = ({ formData, completionPercentage }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3 }}
    className="glass-effect rounded-2xl p-6 border border-white/10 space-y-6"
  >
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold">Collection Preview</h3>
      <Badge variant="secondary" className="bg-purple-500/20">
        {completionPercentage}% Complete
      </Badge>
    </div>

    {/* Cover Image Preview */}
    <div className="aspect-square rounded-xl overflow-hidden bg-gray-800/50 border border-white/10">
      {formData.coverImage ? (
        <img
          src={formData.coverImage.url || "/placeholder.svg"}
          alt="Collection cover"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <ImageIcon className="h-12 w-12 text-gray-600" />
        </div>
      )}
    </div>

    {/* Collection Info */}
    <div className="space-y-3">
      <h4 className="text-xl font-bold">{formData.name || "Collection Name"}</h4>

      {formData.symbol && (
        <Badge variant="outline" className="text-purple-400 border-purple-400/50">
          {formData.symbol}
        </Badge>
      )}

      <p className="text-gray-400 text-sm">{formData.description || "Collection description will appear here..."}</p>

      {formData.category && (
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-blue-400" />
          <span className="text-sm text-blue-400">{formData.category}</span>
        </div>
      )}

      {formData.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {formData.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {formData.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{formData.tags.length - 3}
            </Badge>
          )}
        </div>
      )}
    </div>

    {/* Collection Stats */}
    <div className="grid grid-cols-2 gap-4">
      <div className="text-center p-3 bg-black/40 rounded-lg">
        <div className="text-lg font-bold text-purple-400">
          {formData.isUnlimited ? "∞" : formData.maxSupply.toLocaleString()}
        </div>
        <div className="text-xs text-gray-500">Max Supply</div>
      </div>
      <div className="text-center p-3 bg-black/40 rounded-lg">
        <div className="text-lg font-bold text-green-400">{formData.royaltyPercentage}%</div>
        <div className="text-xs text-gray-500">Royalty</div>
      </div>
    </div>

    {/* Zero-Fee Benefits */}
    <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
      <div className="flex items-center gap-2 mb-2">
        <Zap className="h-4 w-4 text-yellow-400" />
        <span className="text-sm font-medium text-yellow-400">Zero-Fee Benefits</span>
      </div>
      <ul className="text-xs text-gray-300 space-y-1">
        <li>• No collection creation fees</li>
        <li>• No listing fees</li>
        <li>• No transaction fees</li>
        <li>• Keep 100% of your earnings</li>
      </ul>
    </div>

    {/* Action Buttons */}
    <div className="space-y-2">
      <Button className="w-full" variant="outline" disabled>
        <Eye className="h-4 w-4 mr-2" />
        Preview Collection
      </Button>
      <p className="text-xs text-gray-500 text-center">Complete the form to enable preview</p>
    </div>
  </motion.div>
)
