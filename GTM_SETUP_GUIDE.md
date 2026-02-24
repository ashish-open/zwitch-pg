# Google Tag Manager (GTM) Setup Guide

## 📋 Development Side - What We've Implemented ✅

### 1. GTM Container Scripts Added
- ✅ **GTM Head Script** - Added to `index.html` in `<head>` section
  - Container ID: `GTM-NG4KZHM`
  - Loads asynchronously (non-blocking)
  - Initializes dataLayer before GTM loads

- ✅ **GTM Body Script (noscript)** - Added to `index.html` in `<body>` section
  - Fallback for users without JavaScript enabled

### 2. dataLayer Initialization
- ✅ dataLayer initialized in HTML before GTM loads
- ✅ Safety check added in `analytics.ts` to ensure dataLayer exists

### 3. Event Tracking Infrastructure
- ✅ All events push to `window.dataLayer` automatically
- ✅ Events enriched with:
  - Session ID
  - UTM parameters (source, medium, campaign, term, content)
  - Page URL
  - Timestamp
  - First-touch attribution data

### 4. Tracked Events (Ready for GTM)
All events are automatically pushed to dataLayer. Here's what's being tracked:

| Event Name | Description | Parameters |
|------------|-------------|------------|
| `page_view` | Fires on page load | `page_path`, `page_title`, `session_id`, `utm_*`, `timestamp` |
| `register_click` | User clicks "Get Pricing" CTA | `placement`, `cta_text`, `register_url`, `utm_*`, `session_id` |
| `cta_click` | Generic CTA clicks | `cta_id`, `placement`, `destination`, `utm_*` |
| `docs_click` | API docs link clicks | `cta`, `placement`, `destination`, `utm_*` |
| `form_start` | User starts filling form | `form`, `placement`, `session_id` |
| `form_submit` | Form submission initiated | `form`, `placement`, `session_id`, `utm_*` |
| `form_submit_success` | Form submitted successfully | `form`, `placement`, `session_id` |
| `form_submit_error` | Form submission failed | `form`, `placement`, `error`, `session_id` |
| `scroll_depth` | User scrolls 25%, 50%, 75% | `percent` (25/50/75), `session_id` |
| `hero_scroll_past` | User scrolls past hero section | `interacted` (true/false), `session_id` |
| `faq_expand` | FAQ accordion expanded | `question`, `index`, `session_id` |
| `form_open` | Mobile form opened | `placement`, `session_id` |

### 5. UTM Parameter Tracking
- ✅ Captures UTM params from URL on page load
- ✅ Stores first-touch UTM in localStorage
- ✅ Stores last-touch UTM in sessionStorage
- ✅ All events include UTM attribution data

### 6. Session Tracking
- ✅ Unique session ID generated per session
- ✅ Session ID included in all events
- ✅ Stored in sessionStorage

---

## ✅ Development Side Status: **COMPLETE**

**Nothing pending from development side.** All code is ready and events are firing.

---

## 🔧 GTM Configuration Steps

### Step 1: Verify GTM Container is Active
1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Select your container: `GTM-NG4KZHM`
3. Verify container is published and active

### Step 2: Set Up Google Analytics 4 (GA4) Tag (If Needed)

1. **Create GA4 Configuration Tag:**
   - In GTM, go to **Tags** → **New**
   - Tag Type: **Google Analytics: GA4 Configuration**
   - Measurement ID: Your GA4 Measurement ID (G-XXXXXXXXXX)
   - Trigger: **All Pages**
   - Name: `GA4 - Configuration`
   - Save

2. **Create GA4 Event Tag:**
   - Tag Type: **Google Analytics: GA4 Event**
   - Configuration Tag: Select the GA4 Configuration tag above
   - Event Name: Use dataLayer event name (e.g., `register_click`)
   - Trigger: Create custom trigger (see Step 3)
   - Name: `GA4 - Register Click`
   - Save

### Step 3: Create Custom Triggers for Your Events

For each event, create a Custom Event trigger:

1. **Register Click Trigger:**
   - Go to **Triggers** → **New**
   - Trigger Type: **Custom Event**
   - Event name: `register_click`
   - Name: `Trigger - Register Click`
   - Save

2. **Form Submit Trigger:**
   - Trigger Type: **Custom Event**
   - Event name: `form_submit`
   - Name: `Trigger - Form Submit`
   - Save

3. **Form Submit Success Trigger:**
   - Trigger Type: **Custom Event**
   - Event name: `form_submit_success`
   - Name: `Trigger - Form Submit Success`
   - Save

4. **Scroll Depth Trigger:**
   - Trigger Type: **Custom Event**
   - Event name: `scroll_depth`
   - Name: `Trigger - Scroll Depth`
   - Save

5. **FAQ Expand Trigger:**
   - Trigger Type: **Custom Event**
   - Event name: `faq_expand`
   - Name: `Trigger - FAQ Expand`
   - Save

6. **Hero Scroll Past Trigger:**
   - Trigger Type: **Custom Event**
   - Event name: `hero_scroll_past`
   - Name: `Trigger - Hero Scroll Past`
   - Save

7. **Docs Click Trigger:**
   - Trigger Type: **Custom Event**
   - Event name: `docs_click`
   - Name: `Trigger - Docs Click`
   - Save

### Step 4: Create Data Layer Variables (Optional but Recommended)

Create variables to capture event parameters:

1. **UTM Source Variable:**
   - Go to **Variables** → **New**
   - Variable Type: **Data Layer Variable**
   - Data Layer Variable Name: `utm_source`
   - Name: `DLV - UTM Source`
   - Save

2. **UTM Campaign Variable:**
   - Variable Type: **Data Layer Variable**
   - Data Layer Variable Name: `utm_campaign`
   - Name: `DLV - UTM Campaign`
   - Save

3. **Session ID Variable:**
   - Variable Type: **Data Layer Variable**
   - Data Layer Variable Name: `session_id`
   - Name: `DLV - Session ID`
   - Save

4. **Placement Variable:**
   - Variable Type: **Data Layer Variable**
   - Data Layer Variable Name: `placement`
   - Name: `DLV - Placement`
   - Save

5. **CTA Text Variable:**
   - Variable Type: **Data Layer Variable**
   - Data Layer Variable Name: `cta_text`
   - Name: `DLV - CTA Text`
   - Save

### Step 5: Set Up Conversion Tracking (If Needed)

1. **Register Click Conversion:**
   - Create GA4 Event tag for `register_click`
   - Mark as conversion in GA4 (Admin → Events → Mark as conversion)

2. **Form Submit Success Conversion:**
   - Create GA4 Event tag for `form_submit_success`
   - Mark as conversion in GA4

### Step 6: Test in Preview Mode

1. **Enable Preview Mode:**
   - In GTM, click **Preview** button
   - Enter your website URL: `http://localhost:8080` (or production URL)
   - Click **Connect**

2. **Test Events:**
   - Open your site in a new tab
   - Perform actions (click CTAs, submit forms, scroll, etc.)
   - Check GTM Preview panel to see events firing
   - Verify dataLayer variables are populated correctly

3. **Verify in Browser Console:**
   ```javascript
   // Check dataLayer
   window.dataLayer
   
   // Should show array of events like:
   // [{event: "page_view", ...}, {event: "register_click", ...}]
   ```

### Step 7: Publish Container

1. After testing, click **Submit** in GTM
2. Add version name: `Initial GTM Setup - [Date]`
3. Add description: `Set up GA4 tracking and custom event triggers`
4. Click **Publish**

---

## ✅ GTM Setup Checklist

### Initial Setup
- [ ] GTM container verified active (GTM-NG4KZHM)
- [ ] GA4 Configuration tag created and tested
- [ ] All custom event triggers created
- [ ] Data layer variables created (UTM, session_id, placement, etc.)

### Event Tracking Setup
- [ ] `page_view` - Tracking page views
- [ ] `register_click` - Tracking CTA clicks
- [ ] `form_submit` - Tracking form submissions
- [ ] `form_submit_success` - Tracking successful submissions
- [ ] `form_submit_error` - Tracking form errors
- [ ] `scroll_depth` - Tracking scroll behavior
- [ ] `hero_scroll_past` - Tracking hero engagement
- [ ] `faq_expand` - Tracking FAQ interactions
- [ ] `docs_click` - Tracking API docs clicks

### Testing
- [ ] Preview mode tested on localhost
- [ ] Preview mode tested on production
- [ ] All events firing correctly in GTM Preview
- [ ] Data layer variables populated correctly
- [ ] UTM parameters captured correctly
- [ ] Session IDs generated correctly
- [ ] Browser console shows dataLayer events

### Conversion Setup
- [ ] `register_click` marked as conversion in GA4
- [ ] `form_submit_success` marked as conversion in GA4
- [ ] Conversion goals configured in GA4

### Final Steps
- [ ] Container published to production
- [ ] Real-time reports checked in GA4
- [ ] Events appearing in GA4 Events report (may take 24-48 hours)

---

## 🧪 Testing Guide

### Test Each Event Manually

1. **Page View:**
   - Refresh page → Should see `page_view` event in GTM Preview

2. **Register Click:**
   - Click "Get Flat 1.55%* Pricing" button
   - Should see `register_click` event with `placement` parameter

3. **Form Submit:**
   - Fill out lead form and submit
   - Should see `form_submit` → `form_submit_success` events

4. **Scroll Depth:**
   - Scroll down page (mobile viewport)
   - Should see `scroll_depth` events at 25%, 50%, 75%

5. **FAQ Expand:**
   - Click FAQ accordion items
   - Should see `faq_expand` events

6. **Docs Click:**
   - Click "View API Docs" link
   - Should see `docs_click` event

### Browser Console Testing

Open browser console and run:
```javascript
// Check dataLayer
console.log(window.dataLayer);

// Manually push test event
window.dataLayer.push({
  event: 'test_event',
  test_param: 'test_value'
});
```

---

## 📊 Event Parameters Reference

### Common Parameters (All Events)
- `session_id` - Unique session identifier
- `page_url` - Current page URL
- `timestamp` - ISO timestamp of event
- `utm_source` - UTM source parameter
- `utm_medium` - UTM medium parameter
- `utm_campaign` - UTM campaign parameter
- `utm_term` - UTM term parameter
- `utm_content` - UTM content parameter

### Event-Specific Parameters

**register_click:**
- `placement` - Where CTA is located (hero_desktop, hero_mobile, sticky, footer)
- `cta_text` - Text of the CTA button
- `register_url` - Full registration URL with UTM params

**form_submit:**
- `form` - Form identifier (lead_capture)
- `placement` - Form placement (hero, contact, etc.)

**scroll_depth:**
- `percent` - Scroll percentage (25, 50, or 75)

**faq_expand:**
- `question` - FAQ question text
- `index` - FAQ item index

---

## 🚨 Troubleshooting

### Events Not Appearing in GTM Preview

1. **Check dataLayer:**
   ```javascript
   console.log(window.dataLayer);
   ```
   Should show array of events

2. **Check GTM Container ID:**
   - Verify `GTM-NG4KZHM` is correct in `index.html`

3. **Check Browser Console:**
   - Look for GTM errors
   - Check network tab for GTM script loading

### UTM Parameters Not Captured

1. **Test URL:**
   ```
   http://localhost:8080/?utm_source=test&utm_campaign=test_campaign
   ```
2. **Check sessionStorage:**
   ```javascript
   sessionStorage.getItem('zwitch_utm_params');
   ```

### Session ID Issues

1. **Check sessionStorage:**
   ```javascript
   sessionStorage.getItem('zwitch_session_id');
   ```

---

## 📝 Notes

- All events are automatically pushed to dataLayer
- No additional code changes needed
- Events work in both development and production
- UTM parameters persist across page navigation (stored in sessionStorage)
- First-touch UTM stored in localStorage for attribution

---

## 🎯 Next Steps After GTM Setup

1. **Set up GA4 Dashboard:**
   - Create custom reports for key events
   - Set up conversion funnels

2. **Create Audiences:**
   - Users who clicked register but didn't convert
   - Users who scrolled past hero
   - Users who viewed FAQ

3. **Set up Remarketing:**
   - Create remarketing audiences in GA4
   - Use for Google Ads campaigns

4. **Monitor Performance:**
   - Check real-time reports daily
   - Review conversion rates weekly
   - Optimize based on data

---

**Last Updated:** [Current Date]
**GTM Container ID:** GTM-NG4KZHM
**Status:** ✅ Development Complete - Ready for GTM Configuration

