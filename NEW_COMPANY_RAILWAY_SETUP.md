# New Company Railway Setup - Step by Step

## Quick Setup Checklist

### Step 1: Create New Railway Project (2 minutes)

1. Go to [railway.app/dashboard](https://railway.app/dashboard)
2. Click **"+ New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose **"cal-petrone/AI-Tazza-Pizza"**
5. Railway will auto-detect Node.js and start deploying

### Step 2: Add Environment Variables (3 minutes)

1. In Railway project → Click **"Variables"** tab
2. Click **"Raw Editor"** button
3. Copy the template below and paste it
4. **Replace the placeholder values** with actual data for the new company
5. Click **"Update Variables"**

### Step 3: Wait for Deployment (2-5 minutes)

- Railway will automatically deploy
- Check **"Logs"** tab to see progress
- Look for: `✓ Environment variables validated` and `🚀 Server running on port 3000`

### Step 4: Get Your URL and Configure Twilio

1. Go to **Settings** → **Domains**
2. Copy the Railway URL (e.g., `https://new-company.up.railway.app`)
3. Go to [Twilio Console](https://console.twilio.com) → Phone Numbers
4. Click your phone number (or get a new one for this company)
5. Set Voice webhook to: `https://new-company.up.railway.app/incoming-call`
6. Method: **POST**
7. Save

### Step 5: Test!

Call your Twilio number - you should hear: "Thanks for calling [Company Name]! What would you like to order today?"

---

## Environment Variables Template

Copy this into Railway → Variables → Raw Editor:

```env
TWILIO_ACCOUNT_SID=REPLACE_WITH_YOUR_TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN=REPLACE_WITH_YOUR_TWILIO_AUTH_TOKEN
OPENAI_API_KEY=REPLACE_WITH_YOUR_OPENAI_API_KEY
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/REPLACE_WITH_NEW_COMPANY_WEBHOOK
PORT=3000
BUSINESS_NAME=REPLACE_WITH_COMPANY_NAME
BUSINESS_LOCATION=REPLACE_WITH_CITY_STATE
TAX_RATE=0.08
```

### What to Replace:

1. **ZAPIER_WEBHOOK_URL** - Create a new Zapier webhook for this company
   - Go to Zapier → Create new Zap
   - Add "Catch Hook" trigger
   - Copy the webhook URL
   - Replace `REPLACE_WITH_NEW_COMPANY_WEBHOOK` with the actual URL

2. **BUSINESS_NAME** - The company name
   - Example: `Mario's Pizza` or `Tony's Italian Kitchen`
   - This is what the AI will say when greeting customers

3. **BUSINESS_LOCATION** - City and state
   - Example: `New York, NY` or `Los Angeles, CA`
   - Used in order logging

4. **TAX_RATE** - Tax rate as decimal (optional, defaults to 0.08)
   - 8% = `0.08`
   - 10% = `0.10`
   - 6% = `0.06`

### Optional: Google Sheets Integration

If you want Google Sheets logging for this company, uncomment and fill in:

```env
GOOGLE_SHEETS_ID=your-new-sheet-id-here
GOOGLE_SHEETS_MENU_ID=your-menu-sheet-id-here
GOOGLE_SHEETS_MENU_SHEET=Menu Items
GOOGLE_SHEETS_CREDENTIALS_BASE64=your-base64-credentials-here
```

---

## Example: Setting Up "Tony's Pizza"

### Step 1: Create Railway Project
- Project name: `Tonys Pizza`

### Step 2: Add Variables (with actual values)

```env
TWILIO_ACCOUNT_SID=REPLACE_WITH_YOUR_TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN=REPLACE_WITH_YOUR_TWILIO_AUTH_TOKEN
OPENAI_API_KEY=REPLACE_WITH_YOUR_OPENAI_API_KEY
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_TONYS_PIZZA_WEBHOOK_ID
PORT=3000
BUSINESS_NAME=Tony's Pizza
BUSINESS_LOCATION=Brooklyn, NY
TAX_RATE=0.08
```

### Step 3: Get URL
- Railway URL: `https://tonys-pizza.up.railway.app`

### Step 4: Configure Twilio
- Webhook: `https://tonys-pizza.up.railway.app/incoming-call`

### Step 5: Test
- Call the Twilio number
- Should hear: "Thanks for calling Tony's Pizza! What would you like to order today?"

---

## Pro Tips

1. **Reuse Same Twilio Account**: You can use the same `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` for multiple companies, but you'll need different phone numbers for each company.

2. **Separate Zapier Webhooks**: Create a separate Zapier webhook for each company so orders go to the right place.

3. **Naming Convention**: Name your Railway projects clearly (e.g., "Tonys Pizza", "Marios Kitchen") so you can easily identify them.

4. **Test Before Going Live**: Always test with a test order before giving the number to customers.

5. **Monitor Logs**: Check Railway logs regularly to catch any issues early.

---

## Troubleshooting

**Server won't start?**
- Check that all required variables are set
- Look at Railway logs for specific error messages
- Verify `PORT=3000` is set

**Calls not connecting?**
- Verify Twilio webhook URL matches Railway URL exactly
- Check that webhook method is set to POST
- Test health endpoint: `https://your-url.up.railway.app/health`

**Wrong business name in greeting?**
- Double-check `BUSINESS_NAME` variable is set correctly
- No spaces or special characters needed, but make sure it's exactly what you want
- Redeploy if you change it

**Orders not logging?**
- Verify `ZAPIER_WEBHOOK_URL` is correct
- Check Zapier webhook is active
- Ensure order has customer name (required for logging)

