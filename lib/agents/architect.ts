export interface ArchitectAnalysis {
  industry: string
  theme: string
  colorPalette: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  layout: 'hero-centric' | 'grid-based' | 'story-driven' | 'product-focused'
  sections: string[]
  features: string[]
}

export async function analyzeRequirements(
  businessName: string,
  description: string,
  industry: string,
  theme: string
): Promise<ArchitectAnalysis> {
  // Generate color palette based on theme
  const colorPalettes: Record<string, any> = {
    'Modern Minimalist': {
      primary: '#000000',
      secondary: '#FFFFFF',
      accent: '#667EEA',
      background: '#FAFAFA',
      text: '#1A1A1A'
    },
    'Bold & Vibrant': {
      primary: '#FF006E',
      secondary: '#8338EC',
      accent: '#FFBE0B',
      background: '#FFFFFF',
      text: '#000000'
    },
    'Corporate Professional': {
      primary: '#1E3A8A',
      secondary: '#3B82F6',
      accent: '#60A5FA',
      background: '#F8FAFC',
      text: '#0F172A'
    },
    'Creative & Artistic': {
      primary: '#EC4899',
      secondary: '#8B5CF6',
      accent: '#F59E0B',
      background: '#FDF4FF',
      text: '#1F2937'
    },
    'Elegant Luxury': {
      primary: '#92400E',
      secondary: '#D97706',
      accent: '#FBBF24',
      background: '#FFFBEB',
      text: '#78350F'
    },
    'Tech Startup': {
      primary: '#7C3AED',
      secondary: '#A78BFA',
      accent: '#06B6D4',
      background: '#F5F3FF',
      text: '#1E1B4B'
    },
    'Glassmorphic': {
      primary: '#667EEA',
      secondary: '#764BA2',
      accent: '#F093FB',
      background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
      text: '#FFFFFF'
    }
  }

  const defaultPalette = {
    primary: '#667EEA',
    secondary: '#764BA2',
    accent: '#F093FB',
    background: '#FFFFFF',
    text: '#1F2937'
  }

  // Determine layout based on industry
  const layoutMap: Record<string, ArchitectAnalysis['layout']> = {
    'E-commerce': 'product-focused',
    'Restaurant': 'hero-centric',
    'Real Estate': 'grid-based',
    'Portfolio': 'story-driven',
    'Technology': 'hero-centric',
    'Healthcare': 'hero-centric'
  }

  // Determine sections based on industry
  const sectionMap: Record<string, string[]> = {
    'E-commerce': ['hero', 'featured-products', 'categories', 'testimonials', 'cta', 'footer'],
    'Restaurant': ['hero', 'menu', 'about', 'gallery', 'reservations', 'footer'],
    'Real Estate': ['hero', 'properties', 'services', 'about', 'contact', 'footer'],
    'Healthcare': ['hero', 'services', 'doctors', 'testimonials', 'contact', 'footer'],
    'Technology': ['hero', 'features', 'demo', 'pricing', 'faq', 'footer'],
    'Default': ['hero', 'features', 'about', 'testimonials', 'contact', 'footer']
  }

  // Determine features based on industry
  const featureMap: Record<string, string[]> = {
    'E-commerce': ['shopping-cart', 'stripe-checkout', 'product-catalog', 'search'],
    'Restaurant': ['menu-display', 'booking-calendar', 'online-ordering', 'contact-form'],
    'Real Estate': ['property-listings', 'filter-search', 'contact-form', 'virtual-tours'],
    'Healthcare': ['appointment-booking', 'contact-form', 'service-catalog', 'doctor-profiles'],
    'Technology': ['demo-request', 'pricing-table', 'feature-showcase', 'contact-form'],
    'Default': ['contact-form', 'newsletter', 'social-links']
  }

  return {
    industry,
    theme,
    colorPalette: colorPalettes[theme] || defaultPalette,
    layout: layoutMap[industry] || 'hero-centric',
    sections: sectionMap[industry] || sectionMap['Default'],
    features: featureMap[industry] || featureMap['Default']
  }
}
