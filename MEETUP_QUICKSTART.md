# English Night Live Meetup - Quick Start Guide

## 🚀 Running the Application

### 1. Install Dependencies (if not already done)
```bash
npm install
# or
pnpm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Required for HubSpot integration
HUBSPOT_API_KEY=your_key_here
HUBSPOT_MEETUP_PIPELINE=default
HUBSPOT_MEETUP_DEALSTAGE=appointmentscheduled

# Required for WhatsApp integration
WHATSAPP_ACCESS_TOKEN=your_token_here
WHATSAPP_PHONE_NUMBER_ID=your_phone_id_here

# Required for Email integration
MS_GRAPH_ACCESS_TOKEN=your_token_here
MS_GRAPH_FROM_EMAIL=contato@hubacademybr.com
```

**Note:** The application will run without these variables, but integrations will be skipped. Form submissions will still work, just without the external integrations.

### 3. Start Development Server
```bash
npm run dev
# or
pnpm dev
```

### 4. Access the Pages

- **Landing Page:** http://localhost:3000/meetup
- **With UTM tracking:** http://localhost:3000/meetup?utm_source=test&utm_medium=organic&utm_campaign=meetup_oct
- **Thank You Page:** http://localhost:3000/meetup-obrigado

## 📋 Testing Checklist

### Test Form Submission

1. Navigate to http://localhost:3000/meetup
2. Fill in the form:
   - Nome: Test
   - Sobrenome: User
   - E-mail: test@example.com
   - Telefone: +55 11 99999-9999
   - Empresa: Test Company (optional)
   - Cargo: Test Role (optional)
   - ✅ Check LGPD consent
3. Click "Confirmar inscrição"
4. Should redirect to `/meetup-obrigado` on success

### Test Calendar Download

1. Navigate to http://localhost:3000/meetup-obrigado
2. Click "Adicionar ao calendário (.ics)"
3. File `english-night-live-meetup.ics` should download
4. Import into your calendar app to verify

### Test API Endpoints

#### Test Registration Endpoint
```bash
curl -X POST http://localhost:3000/api/register-meetup \
  -H "Content-Type: application/json" \
  -d '{
    "firstname": "João",
    "lastname": "Silva",
    "email": "joao@test.com",
    "phone": "+5511999999999",
    "company": "Test Company",
    "jobtitle": "Manager",
    "lgpdConsent": true,
    "utm_source": "test"
  }'
```

Expected response:
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

#### Test Calendar Endpoint
```bash
curl http://localhost:3000/api/meetup-ics -o test.ics
```

Should download an .ics file.

### Test Rate Limiting

Submit the same form 6 times in rapid succession. The 6th request should be blocked with a 429 error.

### Test Security Features

1. **Honeypot:** Add a value to the hidden "website" field - should be rejected
2. **LGPD Consent:** Uncheck the consent checkbox - should show error
3. **Required Fields:** Leave fields empty - should show validation errors

## 🔍 Monitoring

Check your terminal/console for logs:
- HubSpot integration status
- WhatsApp message status
- Email sending status
- Rate limiting events
- Validation errors

## 🎨 Design Reference

The landing page follows a minimalist, corporate design inspired by:
https://lps.exame.com/lpl-openday-un2025

Key design elements:
- Clean typography hierarchy
- Focus on conversion (prominent form placement)
- Minimal distractions
- Professional color scheme (dark blue #161533 + lime green #a3ff3c)
- Mobile-first responsive design

## ⚠️ Important Notes

1. **No Navigation Links:** The `/meetup` and `/meetup-obrigado` pages are intentionally NOT linked from the main site. They're only accessible via direct URL.

2. **NoIndex/NoFollow:** Both pages have `<meta name="robots" content="noindex, nofollow" />` to prevent search engine indexing.

3. **Rate Limiting:** The in-memory rate limiter will reset when the server restarts. For production, consider using Redis.

4. **Graceful Degradation:** If any integration fails (HubSpot, WhatsApp, Email), the form submission still succeeds. Failures are logged but don't block the user experience.

5. **UTM Tracking:** Query parameters are automatically captured and sent to HubSpot:
   - utm_source
   - utm_medium
   - utm_campaign
   - utm_term
   - utm_content

## 📱 Mobile Testing

Test on mobile devices or use browser dev tools:
- Form inputs should have proper touch targets
- Phone input should work correctly
- Layout should be responsive
- CTA buttons should be easily tappable

## 🐛 Common Issues

**Issue:** "HubSpot API key not configured"
**Solution:** Add `HUBSPOT_API_KEY` to `.env.local`

**Issue:** Form submits but redirects don't work
**Solution:** Check browser console for errors, verify API endpoint is running

**Issue:** Calendar file doesn't download
**Solution:** Check `/api/meetup-ics` endpoint is accessible

**Issue:** Rate limiting too strict during testing
**Solution:** Restart the dev server to reset in-memory limits

## 📞 Support

For questions or issues, refer to:
- Full documentation: `MEETUP_SETUP.md`
- Code comments in source files
- Project structure in file headers


