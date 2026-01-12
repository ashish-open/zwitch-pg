import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  isMobileViewport, 
  trackEvent, 
  prepareFormSubmission, 
  getStoredUTMParams,
  getSessionId,
  getFirstTouchUTM,
  type FormData,
  type FormTrackingData
} from "@/lib/analytics";
import { ArrowRight, ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export type LeadFormVariant = "hero" | "section";

interface LeadFormProps {
  variant: LeadFormVariant;
  className?: string;
  /** Used to generate unique IDs when the form is rendered more than once. */
  idPrefix?: string;
  /** Optional callback if parent wants to focus the first input. */
  onFirstFieldId?: (id: string) => void;
  /** Optional callback after successful form submission */
  onSubmitSuccess?: (data: FormTrackingData) => void;
}

// HubSpot Portal ID and Form ID - Update these when connecting to HubSpot
const HUBSPOT_PORTAL_ID = "YOUR_PORTAL_ID"; // TODO: Replace with actual HubSpot portal ID
const HUBSPOT_FORM_ID = "YOUR_FORM_ID"; // TODO: Replace with actual HubSpot form ID

/**
 * Submit form data to HubSpot
 * @see https://legacydocs.hubspot.com/docs/methods/forms/submit_form
 */
async function submitToHubSpot(data: FormTrackingData): Promise<boolean> {
  // Skip if HubSpot is not configured
  if (HUBSPOT_PORTAL_ID === "YOUR_PORTAL_ID") {
    console.log("[LeadForm] HubSpot not configured. Form data:", data);
    return true; // Return true in dev mode
  }

  const hubspotEndpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

  const hubspotPayload = {
    fields: [
      { name: "company", value: data.businessName },
      { name: "email", value: data.email },
      { name: "monthly_volume", value: data.monthlyVolume },
      { name: "phone", value: data.phone || "" },
      // UTM Fields (create these as custom properties in HubSpot)
      { name: "utm_source", value: data.utm_source || "" },
      { name: "utm_medium", value: data.utm_medium || "" },
      { name: "utm_campaign", value: data.utm_campaign || "" },
      { name: "utm_content", value: data.utm_content || "" },
      { name: "utm_term", value: data.utm_term || "" },
      // First-touch attribution
      { name: "first_touch_source", value: data.first_touch_source || "" },
      { name: "first_touch_campaign", value: data.first_touch_campaign || "" },
      { name: "first_touch_landing_page", value: data.first_touch_landing_page || "" },
      // Session tracking
      { name: "session_id", value: data.session_id },
      { name: "form_placement", value: data.form_placement },
    ],
    context: {
      pageUri: data.submission_url,
      pageName: document.title,
    },
  };

  try {
    const response = await fetch(hubspotEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hubspotPayload),
    });

    return response.ok;
  } catch (error) {
    console.error("[LeadForm] HubSpot submission error:", error);
    return false;
  }
}

export function LeadForm({ 
  variant, 
  className, 
  idPrefix = "lead", 
  onFirstFieldId,
  onSubmitSuccess 
}: LeadFormProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Form refs for controlled submission
  const businessNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const volumeRef = useRef<HTMLSelectElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const businessNameId = `${idPrefix}-businessName`;
  const emailId = `${idPrefix}-email`;
  const volumeId = `${idPrefix}-volume`;
  const phoneId = `${idPrefix}-phone`;

  // Hidden tracking fields IDs
  const sessionIdFieldId = `${idPrefix}-session-id`;
  const utmSourceFieldId = `${idPrefix}-utm-source`;
  const utmMediumFieldId = `${idPrefix}-utm-medium`;
  const utmCampaignFieldId = `${idPrefix}-utm-campaign`;

  const onFormStart = () => {
    if (hasStarted) return;
    setHasStarted(true);
    trackEvent("form_start", { form: "lead_capture", placement: variant });
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Gather form data
    const formData: FormData = {
      businessName: businessNameRef.current?.value || "",
      email: emailRef.current?.value || "",
      monthlyVolume: volumeRef.current?.value || "",
      phone: phoneRef.current?.value || undefined,
    };

    // Prepare full tracking data
    const trackingData = prepareFormSubmission(formData, variant);

    // Track form submission attempt
    trackEvent("form_submit", { 
      form: "lead_capture", 
      placement: variant,
      business_name: formData.businessName,
      email_domain: formData.email.split("@")[1] || "",
      monthly_volume: formData.monthlyVolume,
      has_phone: !!formData.phone,
    });

    try {
      // Submit to HubSpot (or your backend)
      const success = await submitToHubSpot(trackingData);

      if (success) {
        setSubmitSuccess(true);
        trackEvent("form_submit_success", { form: "lead_capture", placement: variant });
        onSubmitSuccess?.(trackingData);
        
        // Reset form after success
        if (businessNameRef.current) businessNameRef.current.value = "";
        if (emailRef.current) emailRef.current.value = "";
        if (volumeRef.current) volumeRef.current.value = "";
        if (phoneRef.current) phoneRef.current.value = "";
      } else {
        setSubmitError("Something went wrong. Please try again.");
        trackEvent("form_submit_error", { form: "lead_capture", placement: variant, error: "hubspot_failed" });
      }
    } catch (error) {
      setSubmitError("Something went wrong. Please try again.");
      trackEvent("form_submit_error", { 
        form: "lead_capture", 
        placement: variant, 
        error: error instanceof Error ? error.message : "unknown" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Let parent know which id to focus (useful for a "focus form" CTA).
  useEffect(() => {
    onFirstFieldId?.(businessNameId);
  }, [onFirstFieldId, businessNameId]);

  // Get stored UTM for hidden fields
  const storedUTM = getStoredUTMParams();
  const firstTouchUTM = getFirstTouchUTM();

  // Success state UI
  if (submitSuccess) {
    return (
      <div className={className}>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-display font-semibold text-lg mb-2">Thank you!</h3>
          <p className="text-sm text-muted-foreground">
            Our onboarding team will reach out within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      className={className}
      onSubmit={onFormSubmit}
    >
      {/* Hidden fields for tracking - These will be captured by HubSpot */}
      <input type="hidden" name="session_id" id={sessionIdFieldId} value={getSessionId()} />
      <input type="hidden" name="utm_source" id={utmSourceFieldId} value={storedUTM.utm_source || ""} />
      <input type="hidden" name="utm_medium" id={utmMediumFieldId} value={storedUTM.utm_medium || ""} />
      <input type="hidden" name="utm_campaign" id={utmCampaignFieldId} value={storedUTM.utm_campaign || ""} />
      <input type="hidden" name="first_touch_source" value={firstTouchUTM.utm_source || ""} />
      <input type="hidden" name="first_touch_landing_page" value={firstTouchUTM.landing_page || ""} />
      <input type="hidden" name="form_placement" value={variant} />
      <input type="hidden" name="page_url" value={typeof window !== "undefined" ? window.location.href : ""} />

      <div className={variant === "hero" ? "space-y-4" : "space-y-5"}>
        <div>
          <label
            htmlFor={businessNameId}
            className={variant === "hero" ? "sr-only" : "block text-sm font-medium mb-2"}
          >
            Business Name *
          </label>
          <Input
            ref={businessNameRef}
            id={businessNameId}
            name="company"
            placeholder="Business name"
            className="bg-secondary/80 border-border/60 h-12 focus:border-primary/50 transition-colors"
            required
            onFocus={onFormStart}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label
            htmlFor={emailId}
            className={variant === "hero" ? "sr-only" : "block text-sm font-medium mb-2"}
          >
            {variant === "hero" ? "Work Email *" : "Email *"}
          </label>
          <Input
            ref={emailRef}
            id={emailId}
            name="email"
            type="email"
            placeholder={variant === "hero" ? "Work email" : "you@company.com"}
            className="bg-secondary/80 border-border/60 h-12 focus:border-primary/50 transition-colors"
            required
            onFocus={onFormStart}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label
            htmlFor={volumeId}
            className={variant === "hero" ? "sr-only" : "block text-sm font-medium mb-2"}
          >
            {variant === "hero" ? "Expected Monthly Volume *" : "Monthly Volume *"}
          </label>
          <select
            ref={volumeRef}
            id={volumeId}
            name="monthly_volume"
            required
            className="w-full bg-secondary/80 border border-border/60 rounded-lg px-3 text-foreground h-12 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors disabled:opacity-50"
            onFocus={onFormStart}
            defaultValue=""
            disabled={isSubmitting}
          >
            <option value="" disabled>
              Monthly volume
            </option>
            <option value="below-1l">Below ₹1 Lakh</option>
            <option value="1l-10l">₹1 Lakh - ₹10 Lakh</option>
            <option value="10l-50l">₹10 Lakh - ₹50 Lakh</option>
            <option value="50l-1cr">₹50 Lakh - ₹1 Crore</option>
            <option value="above-1cr">Above ₹1 Crore</option>
          </select>
        </div>

        <Collapsible open={showPhone} onOpenChange={setShowPhone}>
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="w-full flex items-center justify-between text-sm text-muted-foreground hover:text-foreground px-1 py-2 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              <span>Add phone (optional)</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showPhone ? "rotate-180" : ""}`} />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="animate-in slide-in-from-top-1 duration-200">
            <div className="pt-2">
              <label htmlFor={phoneId} className="block text-sm font-medium mb-2">
                Phone (optional)
              </label>
              <Input
                ref={phoneRef}
                id={phoneId}
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                className="bg-secondary/80 border-border/60 h-12 focus:border-primary/50 transition-colors"
                onFocus={onFormStart}
                disabled={isSubmitting}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {submitError && (
          <p className="text-sm text-red-500 text-center">{submitError}</p>
        )}

        <Button 
          type="submit" 
          size="lg" 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover-glow h-12 text-base font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Get Flat 1.5% Pricing
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          No spam. Our onboarding team will reach out to help you.
        </p>
      </div>
    </form>
  );
}
