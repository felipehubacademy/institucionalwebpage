# English Night Live Meetup Landing Page - Setup Guide

## Overview

This implementation includes a complete landing page system for the English Night Live meetup event with:

- `/meetup` - Main landing page with registration form
- `/meetup-obrigado` - Thank you page after successful registration
- API endpoints for registration and calendar file generation
- Integrations with HubSpot CRM, WhatsApp, and Microsoft Graph

## Environment Variables

Add the following environment variables to your `.env.local` file:

### HubSpot Configuration

```env
HUBSPOT_API_KEY=your_hubspot_api_key_here
HUBSPOT_MEETUP_PIPELINE=default
HUBSPOT_MEETUP_DEALSTAGE=appointmentscheduled
```

**How to get HubSpot API Key:**
1. Log in to your HubSpot account
2. Go to Settings → Integrations → Private Apps
3. Create a new private app with the following scopes:
   - `crm.objects.contacts.read`
   - `crm.objects.contacts.write`
   - `crm.objects.deals.read`
   - `crm.objects.deals.write`

**Pipeline and Deal Stage:**
- Get your pipeline ID from HubSpot Settings → Objects → Deals → Pipelines
- Get the deal stage ID from the specific pipeline settings

### WhatsApp Cloud API Configuration

```env
WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token_here
WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id_here
```

**How to get WhatsApp credentials:**
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or select existing app
3. Add WhatsApp product
4. Get the Phone Number ID from the WhatsApp dashboard
5. Generate a permanent access token (or use system user token)

### Microsoft Graph API Configuration

```env
MS_GRAPH_ACCESS_TOKEN=your_microsoft_graph_access_token_here
MS_GRAPH_FROM_EMAIL=contato@hubacademybr.com
```

**How to get Microsoft Graph credentials:**
1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to Azure Active Directory → App registrations
3. Create a new registration or use existing
4. Add API permissions: `Mail.Send` (delegated or application)
5. Generate a token using OAuth 2.0 flow
6. For production, implement token refresh logic

## Features Implemented

### Landing Page (`/meetup`)

- ✅ Hero section with event title, date, time, and location
- ✅ CTA button "Garantir minha vaga"
- ✅ Benefits section with 3 key points
- ✅ Event details section
- ✅ Registration form with validation
- ✅ UTM parameter capture from query string
- ✅ Honeypot anti-spam protection
- ✅ LGPD consent checkbox
- ✅ Client-side form validation
- ✅ Loading states during submission
- ✅ Error handling with user-friendly messages
- ✅ Mobile-responsive design
- ✅ Minimalist corporate design

### Thank You Page (`/meetup-obrigado`)

- ✅ Success confirmation message
- ✅ Event details reminder
- ✅ "Add to calendar" button (downloads .ics file)
- ✅ Next steps information
- ✅ Email and WhatsApp confirmation notice
- ✅ Clean design without navigation links

### API Endpoints

#### `/api/register-meetup` (POST)

**Features:**
- ✅ Server-side validation
- ✅ Rate limiting (5 requests per minute per IP)
- ✅ Honeypot spam protection
- ✅ Input sanitization
- ✅ LGPD consent verification
- ✅ HubSpot CRM integration (create/update contact + deal)
- ✅ WhatsApp confirmation message
- ✅ Email confirmation via Microsoft Graph
- ✅ Graceful error handling (partial failures allowed)
- ✅ UTM tracking

**Request body:**
```json
{
  "firstname": "João",
  "lastname": "Silva",
  "email": "joao@example.com",
  "phone": "+5511999999999",
  "company": "Empresa XYZ",
  "jobtitle": "Gerente",
  "lgpdConsent": true,
  "utm_source": "facebook",
  "utm_medium": "cpc",
  "utm_campaign": "meetup_oct",
  "utm_term": "english_networking",
  "utm_content": "ad_variation_1",
  "honeypot": ""
}
```

**Response:**
```json
{
  "ok": true,
  "partial": false,
  "integrationResults": {
    "hubspot": true,
    "whatsapp": true,
    "email": true
  }
}
```

#### `/api/meetup-ics` (GET)

**Features:**
- ✅ Generates .ics calendar file
- ✅ Event details: October 22, 2025, 18:30 (Pinheiros, São Paulo)
- ✅ 2-hour duration
- ✅ Two reminders: 24 hours and 2 hours before
- ✅ Proper timezone handling (America/Sao_Paulo)

### Security Features

- ✅ Rate limiting per IP address
- ✅ Honeypot field for bot detection
- ✅ Input sanitization
- ✅ LGPD consent validation
- ✅ Server-side validation
- ✅ NoIndex/NoFollow meta tags
- ✅ No public navigation links to landing pages

### SEO/Privacy

- ✅ `<meta name="robots" content="noindex, nofollow" />` on both pages
- ✅ No links in site header or footer pointing to `/meetup` or `/meetup-obrigado`
- ✅ Pages only accessible via direct URL

## Testing

### Test the landing page:
```
http://localhost:3000/meetup?utm_source=test&utm_medium=organic&utm_campaign=test_campaign
```

### Test form submission:
1. Fill out the form with valid data
2. Check console for integration results
3. Verify redirect to `/meetup-obrigado`

### Test calendar download:
1. Navigate to `/meetup-obrigado`
2. Click "Adicionar ao calendário"
3. Download should start automatically

## Integration Status

The system is designed to work gracefully even if integrations fail:

- If **HubSpot** fails: Registration continues, but contact/deal won't be created
- If **WhatsApp** fails: Registration continues, but SMS confirmation won't be sent
- If **Email** fails: Registration continues, but email confirmation won't be sent

All failures are logged server-side for monitoring.

## File Structure

```
app/
├── meetup/
│   ├── page.tsx          # Landing page
│   └── layout.tsx        # Metadata with noindex
├── meetup-obrigado/
│   ├── page.tsx          # Thank you page
│   └── layout.tsx        # Metadata with noindex
└── api/
    ├── register-meetup/
    │   └── route.ts      # Registration endpoint
    └── meetup-ics/
        └── route.ts      # Calendar file endpoint

utils/
├── rate-limit.ts         # Rate limiting utility
├── hubspot-crm.ts        # HubSpot CRM integration
├── whatsapp-api.ts       # WhatsApp Cloud API integration
└── microsoft-graph.ts    # Microsoft Graph email integration
```

## Production Checklist

Before deploying to production:

- [ ] Configure all environment variables in production
- [ ] Test HubSpot integration with production account
- [ ] Test WhatsApp integration with production phone number
- [ ] Test Microsoft Graph email sending
- [ ] Verify rate limiting works as expected
- [ ] Test form submission with various inputs
- [ ] Test calendar file download in multiple calendar apps
- [ ] Verify UTM tracking is working
- [ ] Check mobile responsiveness
- [ ] Verify noindex/nofollow meta tags
- [ ] Test error handling scenarios
- [ ] Monitor server logs for any issues

## Notes

- The landing pages are intentionally NOT linked from the main site navigation
- Access is only via direct URL or marketing campaigns
- Rate limiting is in-memory (consider Redis for production at scale)
- For production, implement proper token refresh for Microsoft Graph
- Calendar file uses São Paulo timezone (BRT/BRST UTC-3)
- Event date is set to October 22, 2025, at 18:30


