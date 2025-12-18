import OpenAI from 'openai'

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return null
  }
  return new OpenAI({ apiKey })
}

export interface VisualAssets {
  heroImageUrl: string
  heroImagePrompt: string
  designEffects: string[]
}

export async function generateVisuals(
  businessName: string,
  description: string,
  industry: string,
  theme: string
): Promise<VisualAssets> {
  const openai = getOpenAIClient()
  const designEffects = getDesignEffects(theme)

  if (!openai) {
    // Return fallback if OpenAI is not configured
    return {
      heroImageUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1792&h=1024&fit=crop',
      heroImagePrompt: 'Fallback image',
      designEffects
    }
  }

  try {
    // Create a detailed prompt for DALL-E 3
    const imagePrompt = generateImagePrompt(businessName, description, industry, theme)

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: imagePrompt,
      n: 1,
      size: '1792x1024',
      quality: 'standard',
    })

    const imageUrl = response.data?.[0]?.url || ''

    return {
      heroImageUrl: imageUrl,
      heroImagePrompt: imagePrompt,
      designEffects
    }
  } catch (error) {
    console.error('Error generating visuals:', error)

    // Return fallback
    return {
      heroImageUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1792&h=1024&fit=crop',
      heroImagePrompt: 'Fallback image',
      designEffects
    }
  }
}

function generateImagePrompt(
  businessName: string,
  description: string,
  industry: string,
  theme: string
): string {
  const themeStyles: Record<string, string> = {
    'Modern Minimalist': 'minimalist, clean lines, white space, simple geometric shapes',
    'Bold & Vibrant': 'bold colors, high contrast, energetic, dynamic composition',
    'Corporate Professional': 'professional, business setting, modern office, clean and sophisticated',
    'Creative & Artistic': 'artistic, creative, colorful, abstract elements',
    'Elegant Luxury': 'luxury, elegant, premium quality, sophisticated lighting',
    'Tech Startup': 'futuristic, technology, innovation, digital elements',
    'Glassmorphic': 'glass effect, translucent, frosted glass, modern blur effect',
    'Futuristic': 'sci-fi, futuristic technology, neon lights, cyber aesthetic'
  }

  const industryContext: Record<string, string> = {
    'E-commerce': 'online shopping, products, retail store',
    'Restaurant': 'gourmet food, dining experience, culinary artistry',
    'Real Estate': 'modern architecture, beautiful property, luxury home',
    'Healthcare': 'medical care, health and wellness, hospital setting',
    'Technology': 'cutting-edge technology, software, digital innovation',
    'Fitness': 'fitness training, healthy lifestyle, gym environment',
    'Education': 'learning environment, education, knowledge',
    'Travel': 'travel destination, adventure, exploration'
  }

  const style = themeStyles[theme] || 'modern and professional'
  const context = industryContext[industry] || 'business setting'

  return `A hero image for ${businessName}, ${description}. ${context}. Style: ${style}. High quality, professional, suitable for website header. Wide landscape format.`
}

function getDesignEffects(theme: string): string[] {
  const effectMap: Record<string, string[]> = {
    'Modern Minimalist': ['clean', 'spacious', 'typography-focused'],
    'Bold & Vibrant': ['gradient', 'high-contrast', 'animated'],
    'Corporate Professional': ['subtle-shadows', 'clean', 'grid-layout'],
    'Creative & Artistic': ['animated', 'gradient', 'irregular-shapes'],
    'Elegant Luxury': ['gold-accents', 'subtle-animations', 'serif-typography'],
    'Tech Startup': ['gradient', 'animated', 'geometric-patterns'],
    'Glassmorphic': ['glass-effect', 'backdrop-blur', 'transparency'],
    'Neumorphic': ['neumorphic', 'soft-shadows', 'depth'],
    'Futuristic': ['neon-glow', 'animated', 'gradient'],
    'Dark Mode': ['dark-theme', 'high-contrast', 'glow-effects']
  }

  return effectMap[theme] || ['gradient', 'clean']
}
