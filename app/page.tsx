'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Wand2, Sparkles, Zap, Globe, CheckCircle, ArrowRight, Loader2 } from 'lucide-react'

const INDUSTRIES = [
  'E-commerce', 'Restaurant', 'Real Estate', 'Healthcare', 'Education', 'Finance',
  'Technology', 'Fitness', 'Travel', 'Legal', 'Photography', 'Consulting',
  'Construction', 'Automotive', 'Fashion', 'Beauty', 'Entertainment', 'Non-profit',
  'Marketing', 'Manufacturing', 'Hospitality', 'Agriculture', 'Sports', 'Art Gallery'
]

const THEMES = [
  'Modern Minimalist', 'Bold & Vibrant', 'Corporate Professional', 'Creative & Artistic',
  'Elegant Luxury', 'Tech Startup', 'Eco-Friendly', 'Vintage Retro',
  'Futuristic', 'Playful Fun', 'Dark Mode', 'Glassmorphic',
  'Neumorphic', 'Gradient Magic', 'Monochrome', 'Pastel Dreams',
  'High Contrast', 'Material Design', 'Brutalist', 'Organic Natural'
]

export default function Home() {
  const [businessName, setBusinessName] = useState('')
  const [description, setDescription] = useState('')
  const [industry, setIndustry] = useState('')
  const [theme, setTheme] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStage, setGenerationStage] = useState('')
  const [progress, setProgress] = useState(0)

  const handleGenerate = async () => {
    if (!businessName || !description || !industry || !theme) {
      alert('Please fill in all fields')
      return
    }

    setIsGenerating(true)
    setProgress(0)

    try {
      // Simulate agent progression
      const stages = [
        { name: 'Architect Agent: Analyzing requirements...', progress: 15 },
        { name: 'Copywriter Agent: Crafting content...', progress: 35 },
        { name: 'Visual Agent: Generating hero image...', progress: 55 },
        { name: 'Designer Agent: Building layout...', progress: 75 },
        { name: 'Integration Agent: Setting up features...', progress: 90 },
        { name: 'Finalizing your website...', progress: 100 }
      ]

      for (const stage of stages) {
        setGenerationStage(stage.name)
        setProgress(stage.progress)
        await new Promise(resolve => setTimeout(resolve, 2000))
      }

      // Call API to generate website
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, description, industry, theme })
      })

      const data = await response.json()

      if (data.success) {
        window.location.href = `/preview/${data.websiteId}`
      } else {
        alert('Generation failed: ' + data.error)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred during generation')
    } finally {
      setIsGenerating(false)
      setGenerationStage('')
      setProgress(0)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Wand2 className="w-12 h-12 text-primary" />
            </motion.div>
          </div>

          <h1 className="text-6xl font-bold mb-4 gradient-text">
            NexaForge Pro
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Build Production-Ready Websites with AI Agents in Minutes
          </p>

          <div className="flex items-center justify-center gap-8 mb-12">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">24 Industries</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">20 Themes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">AI-Powered</span>
            </div>
          </div>
        </motion.div>

        {/* Main Generator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="max-w-4xl mx-auto shadow-2xl border-2 border-purple-100">
            <CardHeader>
              <CardTitle className="text-3xl">Create Your Website</CardTitle>
              <CardDescription>
                Our AI agents will handle everything from design to deployment
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isGenerating ? (
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Business Name</label>
                    <Input
                      placeholder="e.g., Tech Solutions Inc."
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="text-lg"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <Input
                      placeholder="Describe your business in one sentence..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="text-lg"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Industry</label>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {INDUSTRIES.map((ind) => (
                            <SelectItem key={ind} value={ind}>
                              {ind}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Theme Style</label>
                      <Select value={theme} onValueChange={setTheme}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          {THEMES.map((thm) => (
                            <SelectItem key={thm} value={thm}>
                              {thm}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    className="w-full text-lg py-6"
                    size="lg"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Website with AI
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              ) : (
                <div className="py-12 space-y-6">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="inline-block"
                    >
                      <Loader2 className="w-16 h-16 text-primary" />
                    </motion.div>
                    <h3 className="text-2xl font-semibold mt-6 mb-2">{generationStage}</h3>
                    <p className="text-gray-600">Please wait while our AI agents work their magic...</p>
                  </div>

                  <div className="max-w-md mx-auto">
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <p className="text-center mt-2 text-sm text-gray-600">{progress}% Complete</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12">Powered by AI Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 hover:border-purple-300 transition-colors">
              <CardHeader>
                <Zap className="w-10 h-10 text-purple-500 mb-2" />
                <CardTitle>Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get a fully functional website in under 5 minutes with our optimized AI agents
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-300 transition-colors">
              <CardHeader>
                <Globe className="w-10 h-10 text-blue-500 mb-2" />
                <CardTitle>SEO Optimized</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Auto-generated meta tags, structured data, and optimized content for search engines
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-300 transition-colors">
              <CardHeader>
                <Sparkles className="w-10 h-10 text-green-500 mb-2" />
                <CardTitle>Premium Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Glassmorphic effects, animations, and professional design patterns out of the box
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
