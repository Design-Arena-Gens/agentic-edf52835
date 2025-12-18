export interface IntegrationConfig {
  stripeEnabled: boolean
  bookingEnabled: boolean
  contactFormEnabled: boolean
  newsletterEnabled: boolean
  socialLinksEnabled: boolean
  integrations: {
    name: string
    type: string
    config: any
  }[]
}

export async function configureIntegrations(
  industry: string,
  features: string[]
): Promise<IntegrationConfig> {
  const config: IntegrationConfig = {
    stripeEnabled: false,
    bookingEnabled: false,
    contactFormEnabled: true, // Always enabled
    newsletterEnabled: true, // Always enabled
    socialLinksEnabled: true, // Always enabled
    integrations: []
  }

  // Configure based on features
  features.forEach(feature => {
    switch (feature) {
      case 'shopping-cart':
      case 'stripe-checkout':
        config.stripeEnabled = true
        config.integrations.push({
          name: 'Stripe Checkout',
          type: 'payment',
          config: {
            mode: 'payment',
            successUrl: '/success',
            cancelUrl: '/cancel'
          }
        })
        break

      case 'booking-calendar':
      case 'appointment-booking':
        config.bookingEnabled = true
        config.integrations.push({
          name: 'Booking System',
          type: 'booking',
          config: {
            timeSlots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'],
            daysAvailable: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
          }
        })
        break

      case 'online-ordering':
        config.integrations.push({
          name: 'Online Ordering',
          type: 'ordering',
          config: {
            deliveryEnabled: true,
            pickupEnabled: true
          }
        })
        break
    }
  })

  // Industry-specific integrations
  if (industry === 'E-commerce') {
    config.stripeEnabled = true
    config.integrations.push({
      name: 'Product Catalog',
      type: 'catalog',
      config: {
        categories: ['Featured', 'New Arrivals', 'Best Sellers'],
        filters: ['price', 'category', 'rating']
      }
    })
  }

  if (industry === 'Restaurant') {
    config.integrations.push({
      name: 'Menu Management',
      type: 'menu',
      config: {
        categories: ['Appetizers', 'Main Course', 'Desserts', 'Beverages'],
        allergyInfo: true
      }
    })
  }

  if (industry === 'Real Estate') {
    config.integrations.push({
      name: 'Property Listings',
      type: 'listings',
      config: {
        filters: ['price', 'bedrooms', 'bathrooms', 'location'],
        virtualTours: true
      }
    })
  }

  return config
}
