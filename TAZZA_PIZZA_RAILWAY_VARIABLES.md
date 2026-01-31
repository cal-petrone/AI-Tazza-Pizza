# Tazza Pizza – Railway Variables (Menu + Call Log)

Use this checklist to add **menu** and **call log** support to your Tazza Pizza Railway deployment.

---

## 1. Variables you need in Railway

In **Tazza Pizza** → **Variables**, add or confirm these.

### Already set (keep these)

- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `OPENAI_API_KEY`
- `ZAPIER_WEBHOOK_URL`
- `PORT`
- `BUSINESS_NAME` = `Tazza Pizza`
- `BUSINESS_LOCATION` = `Syracuse, New York` (or your city/state)
- `TAX_RATE` = `0.08`
- `BUSINESS_GREETING` = `Welcome to Tazza Pizza. What could I get for you today?`

### Add for AI menu + call log

| Variable | What to put | Where you get it |
|----------|-------------|-------------------|
| **GOOGLE_SHEETS_MENU_ID** | Sheet ID of **“Tazzas Pizza Menu”** | From the sheet URL: `https://docs.google.com/spreadsheets/d/ **PASTE_THIS_PART** /edit` |
| **GOOGLE_SHEETS_MENU_SHEET** | Tab name that has the **menu items** | Your tab name, e.g. `menu_items` or `Menu Items` (must match exactly) |
| **GOOGLE_SHEETS_ID** | Sheet ID of **“Tazza Pizza Call Log”** | Same idea: ID from the Call Log sheet URL |
| **GOOGLE_SHEETS_CREDENTIALS_BASE64** | Base64 of your Google service account JSON | See “Get base64 credentials” below |

---

## 2. Get the Sheet IDs

### Menu sheet (“Tazzas Pizza Menu”)

1. Open **Tazzas Pizza Menu** in the browser.
2. Look at the URL:  
   `https://docs.google.com/spreadsheets/d/ **1qi18rU-dgRhTTd1F7...** /edit`
3. Copy the part between `/d/` and `/edit`. That is **GOOGLE_SHEETS_MENU_ID**.

### Call log sheet (“Tazza Pizza Call Log”)

1. Open **Tazza Pizza Call Log** in the browser.
2. Copy the ID from the URL the same way. That is **GOOGLE_SHEETS_ID**.

So you will have **two different IDs**: one for the menu spreadsheet, one for the call log spreadsheet.

---

## 3. Menu tab name (GOOGLE_SHEETS_MENU_SHEET)

The app reads the menu from **one tab** inside the menu spreadsheet.

- Your “Tazzas Pizza Menu” has tabs like: `menu_items`, `item_variants`, `pizza_toppings`, etc.
- Set **GOOGLE_SHEETS_MENU_SHEET** to the **exact** name of the tab that has the main menu (e.g. `menu_items` or `Menu Items`).
- **Default layout (Description in column D):**  
  **A = Category, B = Item name, C = IN STOCK (e.g. YES), D = Description, E = Price.**  
  The app reads description from column D and price from column E by default.
- **If your sheet has Description in column E:** set **MENU_DESCRIPTION_COLUMN=E** in Railway (then D = Price, E = Description).

---

## 4. Call log sheet layout

Your **Tazza Pizza Call Log** already has the right columns:

- **A:** Name  
- **B:** Phone Number  
- **C:** Pick Up/Delivery  
- **D:** Delivery Address  
- **E:** Estimated Pick Up Time (EST)  
- **F:** Price  
- **G:** Order Details  

No change needed there. Orders will append new rows under these headers.

---

## 5. Get base64 credentials (GOOGLE_SHEETS_CREDENTIALS_BASE64)

1. **Google Cloud Console** → [console.cloud.google.com](https://console.cloud.google.com) → pick your project (or create one).
2. **APIs & Services** → **Library** → search **Google Sheets API** → **Enable**.
3. **APIs & Services** → **Credentials** → **Create credentials** → **Service account**.
4. Name it (e.g. “tazza-pizza-sheets”), finish creation.
5. Open the new service account → **Keys** → **Add key** → **Create new key** → **JSON** → download.
6. **Share both sheets with this service account:**
   - Open “Tazzas Pizza Menu” → **Share** → add the service account email (e.g. `xxx@xxx.iam.gserviceaccount.com`) as **Editor**.
   - Open “Tazza Pizza Call Log” → **Share** → same email, **Editor**.
7. **Encode the JSON key as base64:**
   - **Mac/Linux:**  
     `base64 -i /path/to/your-downloaded-key.json | tr -d '\n' > google-creds-base64.txt`  
     Then open `google-creds-base64.txt` and copy the whole line.
   - **Windows (PowerShell):**  
     `[Convert]::ToBase64String([IO.File]::ReadAllBytes("C:\path\to\key.json"))`  
     Copy the output (one long line).
8. In Railway → **Variables** → **New Variable** → name: `GOOGLE_SHEETS_CREDENTIALS_BASE64`, value: paste that whole line.

---

## 6. Paste into Railway (Raw Editor)

In Tazza Pizza → **Variables** → **Raw Editor**, add lines like these (replace with your real values):

```env
GOOGLE_SHEETS_MENU_ID=1qi18rU-dgRhTTd1F7xxxxxxxxxxxxxxxx
GOOGLE_SHEETS_MENU_SHEET=menu_items
GOOGLE_SHEETS_ID=your-call-log-sheet-id-here
GOOGLE_SHEETS_CREDENTIALS_BASE64=eyJ0eXBlIjoic2VydmljZV9hY2NvdW50Ii...
```

- Use your actual **Tazzas Pizza Menu** URL ID for `GOOGLE_SHEETS_MENU_ID`.
- Use the tab name that has the menu (e.g. `menu_items`) for `GOOGLE_SHEETS_MENU_SHEET`.
- Use your **Tazza Pizza Call Log** URL ID for `GOOGLE_SHEETS_ID`.
- Use the full base64 string from step 7 for `GOOGLE_SHEETS_CREDENTIALS_BASE64`.

Save / **Update Variables**. Railway will redeploy.

---

## 7. Optional: other menu tabs (toppings, wings, sizes)

If your menu spreadsheet has separate tabs for toppings, wings, or sizes, you can optionally set:

- `GOOGLE_SHEETS_TOPPINGS_SHEET` – e.g. `pizza_toppings`
- `GOOGLE_SHEETS_SIZE_GUIDE_SHEET` – e.g. `Size_Guide` or your size tab name
- `GOOGLE_SHEETS_WING_SHEET` – e.g. `wing_sauces` or your wing options tab

Only add these if the app code expects them and your sheet has matching tab names.

---

## 8. Railway variable tips

- **Avoid wrapping values in quotes** in the Raw Editor (e.g. use `GOOGLE_SHEETS_ID=1RB9ur44...`). The app strips quotes if present.
- **GOOGLE_SHEETS_ID** must be the **Call Log** spreadsheet ID. If it's missing, orders will not log.

## 9. Quick checklist

- [ ] **GOOGLE_SHEETS_MENU_ID** = “Tazzas Pizza Menu” spreadsheet ID from URL  
- [ ] **GOOGLE_SHEETS_MENU_SHEET** = exact menu tab name (e.g. `menu_items`)  
- [ ] **GOOGLE_SHEETS_ID** = “Tazza Pizza Call Log” spreadsheet ID from URL  
- [ ] **GOOGLE_SHEETS_CREDENTIALS_BASE64** = full base64 of service account JSON  
- [ ] Both sheets shared with the service account email (Editor)  
- [ ] Variables saved in Railway and deployment finished  

After deployment, the AI will read **Description from column D** and **Price from column E** in menu_items. Orders (including delivery address in column D when it's delivery) will appear as new rows in **Tazza Pizza Call Log**.
