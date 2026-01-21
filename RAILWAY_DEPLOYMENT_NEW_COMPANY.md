# Railway Deployment Guide - New Company Setup

Complete step-by-step guide to deploy the AI pizza ordering agent to Railway for a new company.

## Prerequisites

Before starting, ensure you have:
- ✅ GitHub account
- ✅ Railway account (sign up at [railway.app](https://railway.app))
- ✅ Twilio account with phone number
- ✅ OpenAI API key with Realtime API access
- ✅ Zapier webhook URL (or create one)

## Step 1: Customize Business Information

### Option A: Using Environment Variables (Recommended)

Add these to your `.env` file or Railway environment variables:

```env
# Business Configuration
BUSINESS_NAME=Your Pizza Company Name
BUSINESS_LOCATION=Your City, State
TAX_RATE=0.08
BUSINESS_PHONE=+1234567890
```

### Option B: Edit Config File Directly

Edit `src/config/business.js` and change the default values:

```javascript
name: process.env.BUSINESS_NAME || 'Your Pizza Company',
location: process.env.BUSINESS_LOCATION || 'Your City, State',
```

## Step 2: Customize Menu (Optional)

Edit `src/config/menu.js` to update menu items, sizes, and prices for your business.

## Step 3: Push Code to GitHub

If you haven't already:

```bash
# Initialize git (if needed)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - AI pizza ordering agent"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 4: Deploy to Railway

### 4.1 Create Railway Project

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"+ New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository
5. Railway will auto-detect Node.js and start deploying

### 4.2 Add Environment Variables

In Railway project → **Variables** tab, click **"Raw Editor"** and add:

```env
# Required - Twilio Configuration
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here

# Required - OpenAI Configuration
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Required - Zapier Webhook
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/xxxxx/xxxxx

# Required - Server Configuration
PORT=3000

# Optional - Business Configuration
BUSINESS_NAME=Your Pizza Company Name
BUSINESS_LOCATION=Your City, State
TAX_RATE=0.08

# Optional - Google Sheets Integration
GOOGLE_SHEETS_CREDENTIALS_PATH=./google-credentials.json
GOOGLE_SHEETS_ID=your-google-sheet-id
```

**Important Notes:**
- Replace all placeholder values with your actual credentials
- `PORT` is usually set automatically by Railway, but include it to be safe
- `BUSINESS_NAME` and `BUSINESS_LOCATION` are optional but recommended

### 4.3 Google Sheets Setup (Optional)

If you want Google Sheets integration:

#### Option A: Base64 Encoding (Recommended for Railway)

1. Get your `google-credentials.json` file
2. Convert to base64:
   ```bash
   base64 -i google-credentials.json -o google-credentials-base64.txt
   ```
3. Copy the contents of `google-credentials-base64.txt`
4. Add to Railway variables:
   ```env
   GOOGLE_SHEETS_CREDENTIALS_BASE64=<paste-base64-content-here>
   ```

#### Option B: File Upload

1. In Railway, go to your service
2. Look for **"Volumes"** or **"Files"** tab
3. Upload `google-credentials.json`
4. Update path in environment variables to match Railway's file system

### 4.4 Wait for Deployment

- Railway will automatically build and deploy
- Check **"Logs"** tab for progress
- Deployment typically takes 2-5 minutes
- Look for: `✓ Environment variables validated` and `🚀 Server running on port 3000`

## Step 5: Get Your Railway URL

After successful deployment:

1. Go to Railway project → **Settings** tab
2. Under **"Domains"**, Railway provides a URL like:
   ```
   https://your-app-name.up.railway.app
   ```
3. Copy this URL

## Step 6: Configure Twilio Webhook

1. Go to [Twilio Console](https://console.twilio.com)
2. Navigate to **Phone Numbers** → **Manage** → **Active Numbers**
3. Click on your phone number
4. Scroll to **"Voice & Fax"** section
5. Under **"A CALL COMES IN"**, set:
   - **Webhook**: `https://your-app-name.up.railway.app/incoming-call`
   - **HTTP**: `POST`
6. Click **Save**

## Step 7: Test Your Deployment

### 7.1 Health Check

Visit in browser or use curl:
```bash
curl https://your-app-name.up.railway.app/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "2024-01-06T21:30:00.000Z",
  "uptime": 3600
}
```

### 7.2 Test Call

1. Call your Twilio phone number
2. You should hear: "Thanks for calling [Your Business Name]! What would you like to order today?"
3. Place a test order
4. Verify order is logged to Zapier

## Step 8: Verify Order Logging

1. Complete a test order through the phone system
2. Check your Zapier webhook logs
3. Verify order data includes:
   - Customer name
   - Items ordered
   - Delivery method
   - Address (if delivery)
   - Totals
   - Store name and location

## Troubleshooting

### Server Won't Start

**Check Railway Logs:**
- Look for error messages
- Verify all required environment variables are set
- Check for missing dependencies

**Common Issues:**
- Missing `OPENAI_API_KEY` → Add to Railway variables
- Missing `TWILIO_ACCOUNT_SID` → Add to Railway variables
- Port binding error → Ensure `PORT=3000` is set

### Calls Not Connecting

**Check:**
1. Railway URL is correct in Twilio webhook
2. Server is running (check Railway logs)
3. Health endpoint responds (test `/health`)
4. Twilio webhook is set to POST method

### OpenAI Connection Fails

**Check:**
1. `OPENAI_API_KEY` is valid
2. API key has Realtime API access
3. Check Railway logs for specific error messages

### Orders Not Logging

**Check:**
1. `ZAPIER_WEBHOOK_URL` is correct
2. Zapier webhook is active
3. Order has customer name (required)
4. Check Railway logs for error messages

## Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `TWILIO_ACCOUNT_SID` | Twilio Account SID | `ACxxxxxxxxxxxxx` |
| `TWILIO_AUTH_TOKEN` | Twilio Auth Token | `your_token_here` |
| `OPENAI_API_KEY` | OpenAI API Key | `sk-proj-xxxxx` |
| `ZAPIER_WEBHOOK_URL` | Zapier webhook URL | `https://hooks.zapier.com/...` |
| `PORT` | Server port | `3000` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `BUSINESS_NAME` | Your business name | `Your Pizza Company` |
| `BUSINESS_LOCATION` | Business location | `Your City, State` |
| `TAX_RATE` | Tax rate (decimal) | `0.08` (8%) |
| `BUSINESS_PHONE` | Business phone number | `null` |
| `GOOGLE_SHEETS_CREDENTIALS_PATH` | Path to Google credentials | `./google-credentials.json` |
| `GOOGLE_SHEETS_ID` | Google Sheet ID | None |

## Post-Deployment Checklist

- [ ] Server starts successfully (check Railway logs)
- [ ] Health endpoint responds (`/health`)
- [ ] Twilio webhook URL is set correctly
- [ ] Test call connects successfully
- [ ] AI greets with correct business name
- [ ] Test order completes successfully
- [ ] Order logs to Zapier
- [ ] Google Sheets integration works (if configured)

## Updating Your Deployment

After making code changes:

1. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```

2. Railway will automatically redeploy
3. Check Railway logs to verify deployment

## Custom Domain (Optional)

To use a custom domain:

1. In Railway → Settings → Domains
2. Click **"Generate Domain"** or **"Add Custom Domain"**
3. Follow Railway's instructions for DNS configuration
4. Update Twilio webhook URL to use custom domain

## Monitoring

### Railway Logs

- View real-time logs in Railway dashboard
- Check for errors, warnings, or connection issues
- Monitor order logging success/failures

### Health Endpoint

Set up monitoring to check `/health` endpoint:
- Uptime monitoring services
- Railway's built-in monitoring
- Custom monitoring scripts

## Support

If you encounter issues:

1. Check Railway logs for error messages
2. Verify all environment variables are set
3. Test health endpoint
4. Review Twilio webhook configuration
5. Check OpenAI API status
6. Verify Zapier webhook is active

## Next Steps

- Customize menu items in `src/config/menu.js`
- Adjust AI instructions in `src/services/openai-service.js`
- Set up monitoring/alerting
- Configure custom domain
- Add additional integrations

