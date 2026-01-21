# Fix Tazza Pizza Webhook - Quick Guide

## The Problem
Your 315 number is still saying "Uncle Sal's" because the Twilio webhook is pointing to the wrong Railway deployment.

## The Solution

### Step 1: Get Your Tazza Pizza Railway URL

1. Go to your **Tazza Pizza** Railway project
2. Go to **Settings** → **Domains**
3. Copy the Railway URL (should be something like: `https://web-production-f2f4.up.railway.app`)

### Step 2: Update Twilio Webhook for 315 Number

1. Go to [Twilio Console](https://console.twilio.com)
2. Navigate to **Phone Numbers** → **Manage** → **Active Numbers**
3. Find your **315 number** (the one for Tazza Pizza)
4. Click on it
5. Scroll to **"Voice & Fax"** section
6. Under **"A CALL COMES IN"**, set:
   - **Webhook**: `https://web-production-f2f4.up.railway.app/incoming-call` (use YOUR Tazza Pizza Railway URL)
   - **HTTP**: `POST`
7. Click **Save**

### Step 3: Verify Railway Deployment

1. Go to your **Tazza Pizza** Railway project
2. Check **Logs** tab
3. Make sure you see: `🚀 Server running on port 3000` and `🌐 Server listening on all interfaces (0.0.0.0)`
4. If you see errors, the deployment might not be complete yet

### Step 4: Test Again

Call your 315 number - it should now say: "Hi thank you for calling Tazza Pizza what could i get for you today"

## Important Notes

- **You DON'T need a new Twilio auth token** - you can use the same account for multiple numbers
- **Each phone number needs its own webhook URL** pointing to the correct Railway deployment
- **Uncle Sals number** → points to Uncle Sals Railway URL
- **Tazza Pizza 315 number** → should point to Tazza Pizza Railway URL

## Troubleshooting

**Still says "Uncle Sal's"?**
- Double-check the webhook URL in Twilio matches your Tazza Pizza Railway URL exactly
- Make sure Railway has finished deploying (check Logs)
- Wait 1-2 minutes after updating webhook for changes to propagate

**Can't find the 315 number in Twilio?**
- Go to Phone Numbers → Manage → Active Numbers
- Look for the number that ends in your area code (315)

