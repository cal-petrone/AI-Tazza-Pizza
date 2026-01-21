# Quick Railway Setup - Just Add Variables

## ✅ Code is Already Pushed!

Your code has been pushed to GitHub: `cal-petrone/AI-Tazza-Pizza`

## Next Steps (5 minutes)

### 1. Connect to Railway

1. Go to [railway.app/dashboard](https://railway.app/dashboard)
2. Click **"+ New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose **"cal-petrone/AI-Tazza-Pizza"**
5. Railway will auto-detect Node.js and start deploying

### 2. Add Environment Variables

Once the project is created, go to **Variables** tab → Click **"Raw Editor"** and paste:

```env
TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
OPENAI_API_KEY=your_openai_api_key_here
ZAPIER_WEBHOOK_URL=your_zapier_webhook_url_here
PORT=3000
BUSINESS_NAME=Your Pizza Company Name
BUSINESS_LOCATION=Your City, State
TAX_RATE=0.08
```

**Replace the placeholder values with your actual credentials!**

### 3. Wait for Deployment

- Railway will automatically deploy (2-5 minutes)
- Check **Logs** tab to see progress
- Look for: `✓ Environment variables validated` and `🚀 Server running on port 3000`

### 4. Get Your URL

- Go to **Settings** → **Domains**
- Railway provides a URL like: `https://your-app.up.railway.app`
- Copy this URL

### 5. Update Twilio Webhook

1. Go to [Twilio Console](https://console.twilio.com) → Phone Numbers
2. Click your phone number
3. Set Voice webhook to: `https://your-app.up.railway.app/incoming-call`
4. Method: **POST**
5. Save

### 6. Test!

- Call your Twilio number
- You should hear: "Thanks for calling [Your Business Name]! What would you like to order today?"

## That's It! 🎉

Your new client deployment is ready. The agent will use the business name you set in `BUSINESS_NAME` environment variable.

