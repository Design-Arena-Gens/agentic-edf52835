import OpenAI from 'openai'

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return null
  }
  return new OpenAI({ apiKey })
}

export interface WebsiteContent {
  heroHeadline: string
  heroSubheadline: string
  aboutSection: string
  features: Array<{ title: string; description: string }>
  metaTitle: string
  metaDescription: string
  structuredData: any
}

export async function generateContent(
  businessName: string,
  description: string,
  industry: string,
  theme: string
): Promise<WebsiteContent> {
  const openai = getOpenAIClient()

  if (!openai) {
    // Return fallback content if OpenAI is not configured
    return {
      heroHeadline: `Welcome to ${businessName}`,
      heroSubheadline: description,
      aboutSection: `${businessName} is a leading ${industry} business dedicated to providing exceptional service and value to our customers.`,
      features: [
        { title: 'Quality Service', description: 'We deliver excellence in everything we do' },
        { title: 'Expert Team', description: 'Our professionals are industry leaders' },
        { title: 'Customer Focus', description: 'Your satisfaction is our priority' }
      ],
      metaTitle: `${businessName} | ${industry}`,
      metaDescription: description.slice(0, 155),
      structuredData: {
        '@context': 'https://schema.org',
        '@type': getSchemaType(industry),
        name: businessName,
        description: description
      }
    }
  }

  try {
    const prompt = `Generate professional website content for a ${industry} business named "${businessName}".

Business Description: ${description}
Theme Style: ${theme}

Generate the following in JSON format:
{
  "heroHeadline": "Compelling headline (max 10 words)",
  "heroSubheadline": "Supporting text (max 20 words)",
  "aboutSection": "About section content (2-3 sentences)",
  "features": [
    {"title": "Feature 1", "description": "Brief description"},
    {"title": "Feature 2", "description": "Brief description"},
    {"title": "Feature 3", "description": "Brief description"}
  ],
  "metaTitle": "SEO-optimized title (max 60 chars)",
  "metaDescription": "SEO-optimized description (max 155 chars)"
}

Make it professional, engaging, and SEO-optimized.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert copywriter specializing in website content and SEO. Always respond with valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    })

    const content = JSON.parse(completion.choices[0].message.content || '{}')

    // Generate JSON-LD structured data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': getSchemaType(industry),
      name: businessName,
      description: description,
      url: 'https://example.com'
    }

    return {
      ...content,
      structuredData
    }
  } catch (error) {
    console.error('Error generating content:', error)

    // Fallback content
    return {
      heroHeadline: `Welcome to ${businessName}`,
      heroSubheadline: description,
      aboutSection: `${businessName} is a leading ${industry} business dedicated to providing exceptional service and value to our customers.`,
      features: [
        { title: 'Quality Service', description: 'We deliver excellence in everything we do' },
        { title: 'Expert Team', description: 'Our professionals are industry leaders' },
        { title: 'Customer Focus', description: 'Your satisfaction is our priority' }
      ],
      metaTitle: `${businessName} | ${industry}`,
      metaDescription: description.slice(0, 155),
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: businessName,
        description: description
      }
    }
  }
}

function getSchemaType(industry: string): string {
  const schemaMap: Record<string, string> = {
    'E-commerce': 'Store',
    'Restaurant': 'Restaurant',
    'Real Estate': 'RealEstateAgent',
    'Healthcare': 'MedicalBusiness',
    'Education': 'EducationalOrganization',
    'Legal': 'LegalService',
    'Technology': 'Organization',
    'Fitness': 'HealthAndBeautyBusiness'
  }

  return schemaMap[industry] || 'Organization'
}
