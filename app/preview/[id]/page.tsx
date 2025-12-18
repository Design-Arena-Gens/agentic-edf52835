'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Globe, Sparkles, ArrowRight, Mail, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'

interface WebsiteData {
  business_name: string
  description: string
  architecture: any
  content: any
  visuals: any
  integrations: any
}

export default function PreviewPage() {
  const params = useParams()
  const [website, setWebsite] = useState<WebsiteData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In production, fetch from API
    // For demo, use mock data
    setWebsite({
      business_name: 'Demo Business',
      description: 'A revolutionary platform',
      architecture: {
        colorPalette: {
          primary: '#667EEA',
          secondary: '#764BA2',
          accent: '#F093FB',
          background: '#FFFFFF',
          text: '#1F2937'
        },
        sections: ['hero', 'features', 'about', 'testimonials', 'contact']
      },
      content: {
        heroHeadline: 'Transform Your Business Today',
        heroSubheadline: 'Join thousands of satisfied customers who trust us',
        features: [
          { title: 'Fast & Reliable', description: 'Lightning-fast performance you can depend on' },
          { title: 'Secure Platform', description: 'Enterprise-grade security for your peace of mind' },
          { title: '24/7 Support', description: 'Always here when you need us most' }
        ],
        aboutSection: 'We are dedicated to providing the best service in the industry.',
        metaTitle: 'Demo Business | Innovation',
        metaDescription: 'Leading the way in business innovation'
      },
      visuals: {
        heroImageUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1792&h=1024&fit=crop',
        designEffects: ['gradient', 'glass-effect']
      },
      integrations: {
        contactFormEnabled: true,
        newsletterEnabled: true
      }
    })
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="inline-block"
          >
            <Sparkles className="w-16 h-16 text-primary" />
          </motion.div>
          <p className="mt-4 text-lg">Loading your website...</p>
        </div>
      </div>
    )
  }

  if (!website) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Website Not Found</h1>
          <Button onClick={() => window.location.href = '/'}>
            Go Home
          </Button>
        </div>
      </div>
    )
  }

  const { business_name, content, architecture, visuals, integrations } = website

  return (
    <div className="min-h-screen">
      {/* Action Bar */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{business_name}</h2>
            <p className="text-sm text-gray-600">Preview Mode</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button>
              <Globe className="w-4 h-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section
        className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${architecture.colorPalette.primary} 0%, ${architecture.colorPalette.secondary} 100%)`
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <Image
            src={visuals.heroImageUrl}
            alt="Hero"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold mb-6">{content.heroHeadline}</h1>
            <p className="text-2xl mb-8 opacity-90">{content.heroSubheadline}</p>
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              Get Started <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>

        {visuals.designEffects.includes('glass-effect') && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-4/5 max-w-4xl h-32 glass-effect rounded-lg"></div>
        )}
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.features.map((feature: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div
                        className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
                        style={{ backgroundColor: architecture.colorPalette.primary }}
                      >
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">About Us</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {content.aboutSection}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {integrations.contactFormEnabled && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Form</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                        <input
                          type="email"
                          placeholder="Your Email"
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                        <textarea
                          placeholder="Your Message"
                          rows={4}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                        <Button className="w-full" style={{ backgroundColor: architecture.colorPalette.primary }}>
                          Send Message
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <Mail className="w-6 h-6 text-primary mt-1" />
                          <div>
                            <h3 className="font-semibold mb-1">Email</h3>
                            <p className="text-gray-600">contact@{business_name.toLowerCase().replace(/\s+/g, '')}.com</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <Phone className="w-6 h-6 text-primary mt-1" />
                          <div>
                            <h3 className="font-semibold mb-1">Phone</h3>
                            <p className="text-gray-600">+1 (555) 123-4567</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <MapPin className="w-6 h-6 text-primary mt-1" />
                          <div>
                            <h3 className="font-semibold mb-1">Location</h3>
                            <p className="text-gray-600">123 Business St, Suite 100<br/>City, State 12345</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">{business_name}</h3>
          <p className="text-gray-400 mb-8">{content.metaDescription}</p>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} {business_name}. All rights reserved.
            <br />
            <span className="text-xs">Generated by NexaForge Pro</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
