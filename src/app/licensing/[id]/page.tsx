"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Check, FileCheck, Shield, Sparkles, AlertCircle, ChevronRight } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Separator } from "@/src/components/ui/separator"
import { mockAssets } from "@/src/lib/data/mock-data"
import { useToast } from "@/src/components/ui/use-toast"
import { Badge } from "@/src/components/ui/badge"
import { Checkbox } from "@/src/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group"
import { Label } from "@/src/components/ui/label"
import { Progress } from "@/src/components/ui/progress"

export default function LicensingPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [asset, setAsset] = useState(null)
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(25)
  const [licenseType, setLicenseType] = useState("standard")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [processingLicense, setProcessingLicense] = useState(false)

  // Simulated loading of asset data
  useEffect(() => {
    const assetId = params.id
    // Find the asset in mock data
    const foundAsset = mockAssets.find((a) => a.id === assetId)

    if (foundAsset) {
      setAsset(foundAsset)
    }

    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [params.id])

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      setProgress(progress - 25)
    } else {
      router.back()
    }
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
      setProgress(progress + 25)
    }
  }

  const handleLicenseTypeChange = (value) => {
    setLicenseType(value)
  }

  const handleTermsChange = (checked) => {
    setTermsAccepted(checked)
  }

  const handleCompleteLicensing = () => {
    setProcessingLicense(true)

    // Simulate processing delay
    setTimeout(() => {
      setProcessingLicense(false)
      toast({
        title: "License Acquired Successfully",
        description: "You've successfully licensed this asset with zero platform fees.",
        duration: 5000,
      })
      router.push(`/assets/${params.id}`)
    }, 2000)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-3xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800/20 rounded-lg w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-800/20 rounded w-full mb-6"></div>
            <div className="h-64 bg-gray-800/20 rounded-xl mb-6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!asset) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="w-full max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Asset Not Found</h1>
          <p className="mb-6">The asset you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push("/assets")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back to Assets
          </Button>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="w-full max-w-3xl mx-auto">
        {/* Back button */}
        <Button variant="ghost" size="sm" onClick={handleBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {step > 1 ? "Previous Step" : "Back to Asset"}
        </Button>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">License Asset</h1>
            <Badge variant="outline">Step {step} of 4</Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: License Selection */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Select License Type</CardTitle>
                <CardDescription>Choose the appropriate license for your intended use</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start mb-6">
                    <div className="mr-4 h-16 w-16 rounded-md overflow-hidden">
                      <img
                        src={asset.image || "/placeholder.svg"}
                        alt={asset.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{asset.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {asset.category} by {asset.creator}
                      </p>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="text-xs">
                          <Shield className="h-3 w-3 mr-1 text-emerald-400" />
                          Zero-Fee Licensing
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <RadioGroup defaultValue="standard" value={licenseType} onValueChange={handleLicenseTypeChange}>
                    <div className="flex flex-col space-y-4">
                      <div className="p-4 rounded-lg border border-white/10 bg-black/5 hover:bg-black/10 transition-colors">
                        <div className="flex items-start">
                          <RadioGroupItem value="standard" id="standard" className="mt-1" />
                          <div className="ml-3">
                            <Label htmlFor="standard" className="text-lg font-medium">
                              Standard License
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              Basic usage rights for personal and limited commercial use
                            </p>
                            <ul className="space-y-1 text-sm mt-3">
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
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors">
                        <div className="flex items-start">
                          <RadioGroupItem value="extended" id="extended" className="mt-1" />
                          <div className="ml-3">
                            <Label htmlFor="extended" className="text-lg font-medium">
                              Extended License
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              Full commercial rights including derivative works
                            </p>
                            <ul className="space-y-1 text-sm mt-3">
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
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg border border-white/10 bg-black/5 hover:bg-black/10 transition-colors">
                        <div className="flex items-start">
                          <RadioGroupItem value="custom" id="custom" className="mt-1" />
                          <div className="ml-3">
                            <Label htmlFor="custom" className="text-lg font-medium">
                              Custom License
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              Negotiate custom terms directly with the creator
                            </p>
                            <Button variant="outline" size="sm" className="mt-3">
                              Contact Creator
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={() => router.push(`/assets/${params.id}`)}>
                  Cancel
                </Button>
                <Button onClick={handleNext} disabled={licenseType === "custom"}>
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {/* Step 2: License Details */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>License Details</CardTitle>
                <CardDescription>Review the details of your selected license</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-white/10 bg-black/5">
                    <h3 className="font-medium text-lg mb-2">
                      {licenseType === "standard" ? "Standard License" : "Extended License"}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">License Type</h4>
                        <p className="capitalize">{licenseType}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Duration</h4>
                        <p>Perpetual</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Territory</h4>
                        <p>Worldwide</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Platform Fee</h4>
                        <p className="text-emerald-400 font-medium">Zero Fee</p>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <h4 className="text-sm font-medium mb-2">License Terms</h4>
                    <ul className="space-y-2 text-sm">
                      {licenseType === "standard" ? (
                        <>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                            <span>You may use this asset for personal projects and limited commercial use</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                            <span>You may display this asset digitally on websites, apps, and social media</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                            <span>Attribution to the original creator is required</span>
                          </li>
                          <li className="flex items-start">
                            <AlertCircle className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                            <span>You may not create derivative works based on this asset</span>
                          </li>
                          <li className="flex items-start">
                            <AlertCircle className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                            <span>You may not redistribute or resell this asset</span>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                            <span>You may use this asset for unlimited commercial purposes</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                            <span>You may display this asset digitally and in physical products</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                            <span>You may create derivative works based on this asset</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                            <span>Attribution to the original creator is required</span>
                          </li>
                          <li className="flex items-start">
                            <AlertCircle className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                            <span>You may not redistribute or resell this asset as-is</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 p-4 rounded-lg border border-emerald-500/30">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-emerald-400 mr-2" />
                      <span className="font-medium text-emerald-400">Zero-Fee Licensing</span>
                    </div>
                    <p className="text-sm mt-1 text-muted-foreground">
                      MediaLane charges zero platform fees for licensing transactions. All licenses are recorded on
                      Starknet using zero-knowledge proofs for maximum privacy and security.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext}>
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Terms and Conditions */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Terms and Conditions</CardTitle>
                <CardDescription>Review and accept the licensing terms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-white/10 bg-black/5 max-h-64 overflow-y-auto">
                    <h3 className="font-medium mb-2">License Agreement</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      This License Agreement (the "Agreement") is entered into between the licensor and you (the
                      "Licensee").
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      1. <strong>Grant of License.</strong> Subject to the terms of this Agreement, Licensor grants to
                      Licensee a non-exclusive, non-transferable license to use the Asset as specified in the selected
                      license type.
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      2. <strong>Restrictions.</strong> Except as expressly permitted in the license type, Licensee may
                      not:
                      <br />- Redistribute, share, or transfer the Asset
                      <br />- Remove any copyright or other proprietary notices
                      <br />- Use the Asset in any way that violates applicable laws
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      3. <strong>Ownership.</strong> The Asset is licensed, not sold. Licensor retains all right, title,
                      and interest in and to the Asset.
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      4. <strong>Term and Termination.</strong> This license is perpetual unless terminated. Licensor
                      may terminate this license if Licensee breaches any terms.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      5. <strong>Blockchain Record.</strong> This license will be recorded on the Starknet blockchain
                      using zero-knowledge proofs to protect privacy while ensuring verifiable ownership.
                    </p>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" checked={termsAccepted} onCheckedChange={handleTermsChange} />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I accept the terms and conditions
                      </label>
                      <p className="text-sm text-muted-foreground">
                        By checking this box, you agree to the license terms and conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!termsAccepted}>
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Confirm License</CardTitle>
                <CardDescription>Review your license details and confirm</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start mb-6">
                    <div className="mr-4 h-20 w-20 rounded-md overflow-hidden">
                      <img
                        src={asset.image || "/placeholder.svg"}
                        alt={asset.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{asset.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {asset.category} by {asset.creator}
                      </p>
                      <div className="flex items-center mt-1">
                        <Badge className="capitalize mr-2">{licenseType} License</Badge>
                        <Badge variant="outline" className="text-xs">
                          <Shield className="h-3 w-3 mr-1 text-emerald-400" />
                          Zero-Fee
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">License Type</h4>
                      <p className="capitalize">{licenseType}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Duration</h4>
                      <p>Perpetual</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Territory</h4>
                      <p>Worldwide</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Platform Fee</h4>
                      <p className="text-emerald-400 font-medium">Zero Fee</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-white/10 bg-black/5">
                    <h4 className="text-sm font-medium mb-2">Transaction Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs text-muted-foreground mb-1">Network</h5>
                        <p className="text-sm">Starknet</p>
                      </div>
                      <div>
                        <h5 className="text-xs text-muted-foreground mb-1">Transaction Type</h5>
                        <p className="text-sm">License Acquisition</p>
                      </div>
                      <div>
                        <h5 className="text-xs text-muted-foreground mb-1">Gas Fee</h5>
                        <p className="text-sm">Zero (Covered by Protocol)</p>
                      </div>
                      <div>
                        <h5 className="text-xs text-muted-foreground mb-1">Privacy</h5>
                        <p className="text-sm">Protected by ZK-Proofs</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 p-4 rounded-lg border border-emerald-500/30">
                    <div className="flex items-center">
                      <FileCheck className="h-5 w-5 text-emerald-400 mr-2" />
                      <span className="font-medium text-emerald-400">Ready to Complete</span>
                    </div>
                    <p className="text-sm mt-1 text-muted-foreground">
                      Your license will be recorded on Starknet with zero-knowledge proofs for privacy and security. No
                      platform fees will be charged.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleCompleteLicensing} disabled={processingLicense} className="relative">
                  {processingLicense ? (
                    <>
                      <span className="opacity-0">Complete Licensing</span>
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Complete Licensing
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
