# Where to Get Your Environment Variable Values

## Quick Reference

When setting up a new company in Railway, you'll need to copy values from your existing "Uncle Sals" deployment. Here's where to find them:

## From Your Existing Railway Deployment

1. Go to your "Uncle Sals" project in Railway
2. Click on the "web" service
3. Go to **Variables** tab
4. Copy these values (they're the same for all companies):

### Values You Can Reuse (Same for All Companies)

- **TWILIO_ACCOUNT_SID** - Copy from existing deployment
- **TWILIO_AUTH_TOKEN** - Copy from existing deployment  
- **OPENAI_API_KEY** - Copy from existing deployment

### Values You Need to Create New (Different for Each Company)

- **ZAPIER_WEBHOOK_URL** - Create a new Zapier webhook for each company
- **BUSINESS_NAME** - The name of the new company
- **BUSINESS_LOCATION** - City and state of the new company

## Step-by-Step: Getting Your Values

### 1. Get Twilio & OpenAI Values

1. Open your "Uncle Sals" Railway project
2. Click "web" service → "Variables" tab
3. Find and copy:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `OPENAI_API_KEY`

### 2. Create New Zapier Webhook

1. Go to [Zapier.com](https://zapier.com)
2. Create a new Zap
3. Add "Catch Hook" as trigger
4. Copy the webhook URL
5. This is your new `ZAPIER_WEBHOOK_URL`

### 3. Set Business Information

Just type these in:
- `BUSINESS_NAME` = The company name (e.g., "Tony's Pizza")
- `BUSINESS_LOCATION` = City, State (e.g., "Brooklyn, NY")

## Complete Template with Instructions

Open `RAILWAY_ENV_TEMPLATE.txt` and replace:

1. `REPLACE_WITH_YOUR_TWILIO_ACCOUNT_SID` → Copy from Uncle Sals Railway
2. `REPLACE_WITH_YOUR_TWILIO_AUTH_TOKEN` → Copy from Uncle Sals Railway
3. `REPLACE_WITH_YOUR_OPENAI_API_KEY` → Copy from Uncle Sals Railway
4. `REPLACE_WITH_NEW_COMPANY_WEBHOOK` → Create new Zapier webhook
5. `REPLACE_WITH_COMPANY_NAME` → Type the company name
6. `REPLACE_WITH_CITY_STATE` → Type the location

## Example: Setting Up "Mario's Kitchen"

1. Copy from Uncle Sals:
   - TWILIO_ACCOUNT_SID: `ACxxxxxxxxxxxxx` (copy from Railway)
   - TWILIO_AUTH_TOKEN: `xxxxxxxxxxxxx` (copy from Railway)
   - OPENAI_API_KEY: `sk-proj-...` (copy full key from Railway)

2. Create new Zapier webhook:
   - Go to Zapier → New Zap → Catch Hook
   - Copy URL: `https://hooks.zapier.com/hooks/catch/12345678/marios-kitchen`

3. Fill in business info:
   - BUSINESS_NAME: `Mario's Kitchen`
   - BUSINESS_LOCATION: `Chicago, IL`

4. Final variables:
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxx
OPENAI_API_KEY=sk-proj-...your-full-key...
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/12345678/marios-kitchen
PORT=3000
BUSINESS_NAME=Mario's Kitchen
BUSINESS_LOCATION=Chicago, IL
TAX_RATE=0.08
```

## Pro Tip

Keep a secure note (like 1Password or Notes app) with:
- Your Twilio Account SID
- Your Twilio Auth Token  
- Your OpenAI API Key

Then you can quickly copy-paste these for each new company setup!

