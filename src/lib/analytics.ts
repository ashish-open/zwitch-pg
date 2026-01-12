export type AnalyticsEventParams = Record<string, string | number | boolean | undefined | null>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// ========================
// UTM PARAMETER HANDLING
// ========================

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

const UTM_STORAGE_KEY = "zwitch_utm_params";
const FIRST_TOUCH_KEY = "zwitch_first_touch";
const SESSION_ID_KEY = "zwitch_session_id";

/**
 * Generate a unique session ID for tracking
 */
function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get or create session ID
 */
export function getSessionId(): string {
  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

/**
 * Capture UTM parameters from the current URL and store them
 */
export function captureUTMParams(): UTMParams {
  if (typeof window === "undefined") return {};

  const urlParams = new URLSearchParams(window.location.search);
  const utmParams: UTMParams = {};

  const utmKeys: (keyof UTMParams)[] = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  
  utmKeys.forEach((key) => {
    const value = urlParams.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });

  // Store UTM params if any exist
  if (Object.keys(utmParams).length > 0) {
    // Store last-touch UTM
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmParams));
    
    // Store first-touch UTM (only if not already set)
    if (!localStorage.getItem(FIRST_TOUCH_KEY)) {
      localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify({
        ...utmParams,
        timestamp: new Date().toISOString(),
        landing_page: window.location.pathname
      }));
    }
  }

  return utmParams;
}

/**
 * Get stored UTM parameters (last-touch)
 */
export function getStoredUTMParams(): UTMParams {
  if (typeof window === "undefined") return {};
  
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Get first-touch UTM parameters
 */
export function getFirstTouchUTM(): UTMParams & { timestamp?: string; landing_page?: string } {
  if (typeof window === "undefined") return {};
  
  try {
    const stored = localStorage.getItem(FIRST_TOUCH_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

// ========================
// ZWITCH REGISTER URL BUILDER
// ========================

const ZWITCH_REGISTER_URL = "https://dashboard.zwitch.io/register";

export interface RegisterURLOptions {
  source: string;  // Where the CTA is placed (hero, sticky, footer, etc.)
  campaign?: string; // Override campaign if needed
  content?: string; // Specific CTA identifier
}

/**
 * Build Zwitch register URL with UTM tracking
 */
export function buildRegisterURL(options: RegisterURLOptions): string {
  const { source, campaign, content } = options;
  const storedUTM = getStoredUTMParams();
  
  const params = new URLSearchParams();
  
  // Use stored UTM or fallback to landing page values
  params.set("utm_source", storedUTM.utm_source || "zwitch_landing");
  params.set("utm_medium", storedUTM.utm_medium || "website");
  params.set("utm_campaign", campaign || storedUTM.utm_campaign || "pg_landing_jan2026");
  params.set("utm_content", content || `cta_${source}`);
  
  // Add session ID for tracking
  params.set("sid", getSessionId());
  
  // Add landing page reference
  params.set("ref", source);
  
  return `${ZWITCH_REGISTER_URL}?${params.toString()}`;
}

// ========================
// EVENT TRACKING
// ========================

export function trackEvent(eventName: string, params: AnalyticsEventParams = {}) {
  try {
    // Enrich with session and UTM data
    const enrichedParams = {
      ...params,
      session_id: getSessionId(),
      page_url: typeof window !== "undefined" ? window.location.href : undefined,
      timestamp: new Date().toISOString(),
    };

    // Google Tag Manager / dataLayer style
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...enrichedParams });
    }

    // gtag style
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, enrichedParams);
    }

    // Log in development for debugging
    if (import.meta.env.DEV) {
      console.log(`[Analytics] ${eventName}`, enrichedParams);
    }
  } catch {
    // no-op: analytics must never break UX
  }
}

/**
 * Track CTA click with full context
 */
export function trackCTAClick(ctaId: string, placement: string, destination: string) {
  trackEvent("cta_click", {
    cta_id: ctaId,
    placement,
    destination,
    ...getStoredUTMParams()
  });
}

/**
 * Track external link click (to register page)
 */
export function trackRegisterClick(placement: string, ctaText: string) {
  trackEvent("register_click", {
    placement,
    cta_text: ctaText,
    register_url: buildRegisterURL({ source: placement }),
    ...getStoredUTMParams()
  });
}

// ========================
// FORM TRACKING (HubSpot-ready)
// ========================

export interface FormData {
  businessName: string;
  email: string;
  monthlyVolume: string;
  phone?: string;
}

export interface FormTrackingData extends FormData {
  // UTM Attribution
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  
  // First-touch Attribution
  first_touch_source?: string;
  first_touch_campaign?: string;
  first_touch_landing_page?: string;
  first_touch_timestamp?: string;
  
  // Session Info
  session_id: string;
  form_placement: string;
  submission_url: string;
  submission_timestamp: string;
  
  // Page Context
  referrer?: string;
  user_agent?: string;
}

/**
 * Prepare form data with full tracking context for HubSpot/CRM submission
 */
export function prepareFormSubmission(formData: FormData, placement: string): FormTrackingData {
  const storedUTM = getStoredUTMParams();
  const firstTouchUTM = getFirstTouchUTM();
  
  return {
    ...formData,
    
    // Last-touch UTM
    utm_source: storedUTM.utm_source,
    utm_medium: storedUTM.utm_medium,
    utm_campaign: storedUTM.utm_campaign,
    utm_term: storedUTM.utm_term,
    utm_content: storedUTM.utm_content,
    
    // First-touch Attribution
    first_touch_source: firstTouchUTM.utm_source,
    first_touch_campaign: firstTouchUTM.utm_campaign,
    first_touch_landing_page: firstTouchUTM.landing_page,
    first_touch_timestamp: firstTouchUTM.timestamp,
    
    // Session Info
    session_id: getSessionId(),
    form_placement: placement,
    submission_url: typeof window !== "undefined" ? window.location.href : "",
    submission_timestamp: new Date().toISOString(),
    
    // Page Context
    referrer: typeof document !== "undefined" ? document.referrer : undefined,
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
  };
}

// ========================
// UTILITIES
// ========================

export function isMobileViewport() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(max-width: 767px)")?.matches ?? window.innerWidth < 768;
}

/**
 * Initialize analytics on page load
 */
export function initAnalytics() {
  if (typeof window === "undefined") return;
  
  // Capture UTM params from URL
  captureUTMParams();
  
  // Generate session ID
  getSessionId();
  
  // Track page view
  trackEvent("page_view", {
    page_path: window.location.pathname,
    page_title: document.title,
    ...getStoredUTMParams()
  });
}
