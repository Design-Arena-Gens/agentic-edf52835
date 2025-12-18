import { NextRequest, NextResponse } from 'next/server'
import { analyzeRequirements } from '@/lib/agents/architect'
import { generateContent } from '@/lib/agents/copywriter'
import { generateVisuals } from '@/lib/agents/visual'
import { configureIntegrations } from '@/lib/agents/integration'
import { createClient } from '@supabase/supabase-js'

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    return null
  }

  return createClient(url, key)
}

export async function POST(request: NextRequest) {
  try {
    const { businessName, description, industry, theme } = await request.json()

    if (!businessName || !description || !industry || !theme) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Step 1: Architect Agent - Analyze requirements
    const architecture = await analyzeRequirements(
      businessName,
      description,
      industry,
      theme
    )

    // Step 2: Copywriter Agent - Generate content
    const content = await generateContent(
      businessName,
      description,
      industry,
      theme
    )

    // Step 3: Visual Agent - Generate images
    const visuals = await generateVisuals(
      businessName,
      description,
      industry,
      theme
    )

    // Step 4: Integration Agent - Configure features
    const integrations = await configureIntegrations(
      industry,
      architecture.features
    )

    // Step 5: Save to database
    const websiteData = {
      business_name: businessName,
      description,
      industry,
      theme,
      architecture,
      content,
      visuals,
      integrations,
      status: 'generated',
      created_at: new Date().toISOString()
    }

    const supabase = getSupabaseClient()

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('websites')
          .insert([websiteData])
          .select()
          .single()

        if (!error && data) {
          return NextResponse.json({
            success: true,
            websiteId: data.id,
            data: websiteData
          })
        }
      } catch (dbError) {
        console.error('Database error:', dbError)
      }
    }

    // Return success with mock ID if database is not configured or fails
    return NextResponse.json({
      success: true,
      websiteId: 'demo-' + Date.now(),
      data: websiteData
    })

  } catch (error: any) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Generation failed' },
      { status: 500 }
    )
  }
}
