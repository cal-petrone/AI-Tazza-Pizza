# New Company Setup - Summary

This document summarizes the changes made to make the AI pizza ordering agent easily customizable for new companies.

## What Was Changed

### 1. Business Configuration System ✅

Created `src/config/business.js` - A centralized configuration file that allows easy customization of:
- Business name
- Business location
- Tax rate
- Phone number

**How to customize:**
- Set environment variables: `BUSINESS_NAME`, `BUSINESS_LOCATION`, `TAX_RATE`
- Or edit `src/config/business.js` directly

### 2. Updated OpenAI Service ✅

Modified `src/services/openai-service.js` to:
- Use configurable business name instead of hardcoded "Uncle Sal's Pizza"
- Dynamically generate greeting message with business name
- All AI instructions now use the configured business name

### 3. Updated Order Manager ✅

Modified `src/services/order-manager.js` to:
- Include store name and location in logged order data
- Use configurable tax rate from business config
- Automatically add business info to all logged orders

### 4. Railway Deployment Ready ✅

Updated `server-new.js` to:
- Listen on `0.0.0.0` instead of just localhost (required for Railway)
- Added logging to indicate Railway-ready configuration

### 5. Environment Variable Validation ✅

Updated `src/utils/validation.js` to:
- Recognize new optional business configuration variables
- Provide helpful warnings if business name not set

### 6. Documentation Created ✅

- `RAILWAY_DEPLOYMENT_NEW_COMPANY.md` - Complete Railway deployment guide
- `.env.example` - Template for environment variables
- Updated `README.md` with business configuration options

## Quick Start for New Company

### Step 1: Set Business Name

Add to your `.env` file:
```env
BUSINESS_NAME=Your Pizza Company Name
BUSINESS_LOCATION=Your City, State
```

Or edit `src/config/business.js`:
```javascript
name: process.env.BUSINESS_NAME || 'Your Pizza Company',
```

### Step 2: Customize Menu (Optional)

Edit `src/config/menu.js` to update:
- Menu items
- Sizes
- Prices

### Step 3: Deploy to Railway

Follow the guide in `RAILWAY_DEPLOYMENT_NEW_COMPANY.md`:
1. Push code to GitHub
2. Connect Railway to GitHub repo
3. Add environment variables in Railway
4. Deploy
5. Update Twilio webhook URL

## Environment Variables

### Required
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `OPENAI_API_KEY`
- `ZAPIER_WEBHOOK_URL`
- `PORT`

### Optional (Business Configuration)
- `BUSINESS_NAME` - Default: "Your Pizza Company"
- `BUSINESS_LOCATION` - Default: "Your City, State"
- `TAX_RATE` - Default: 0.08 (8%)
- `BUSINESS_PHONE` - Optional phone number

### Optional (Integrations)
- `GOOGLE_SHEETS_CREDENTIALS_PATH`
- `GOOGLE_SHEETS_ID`
- `NGROK_URL` (for local dev)

## Files Modified

1. `src/config/business.js` - **NEW** - Business configuration
2. `src/services/openai-service.js` - Uses business config
3. `src/services/order-manager.js` - Includes business info in orders
4. `server-new.js` - Railway-ready (listens on 0.0.0.0)
5. `src/utils/validation.js` - Validates new env vars
6. `README.md` - Updated with business config
7. `.env.example` - **NEW** - Environment variable template
8. `RAILWAY_DEPLOYMENT_NEW_COMPANY.md` - **NEW** - Deployment guide

## Testing

After setup, test:
1. Health endpoint: `curl https://your-railway-url/health`
2. Make a test call - AI should greet with your business name
3. Complete a test order
4. Verify order logs include your business name and location

## Next Steps

1. **Customize Menu** - Edit `src/config/menu.js`
2. **Adjust AI Instructions** - Edit `src/services/openai-service.js` (instructions section)
3. **Set Up Google Sheets** - Follow `INTEGRATION_SETUP.md`
4. **Deploy to Railway** - Follow `RAILWAY_DEPLOYMENT_NEW_COMPANY.md`

## Support

If you need help:
1. Check Railway logs for errors
2. Verify all environment variables are set
3. Test health endpoint
4. Review deployment guide

