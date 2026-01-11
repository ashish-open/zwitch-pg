import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { isMobileViewport, trackEvent } from "@/lib/analytics";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export type LeadFormVariant = "hero" | "section";

interface LeadFormProps {
  variant: LeadFormVariant;
  className?: string;
  /** Used to generate unique IDs when the form is rendered more than once. */
  idPrefix?: string;
  /** Optional callback if parent wants to focus the first input. */
  onFirstFieldId?: (id: string) => void;
}

export function LeadForm({ variant, className, idPrefix = "lead", onFirstFieldId }: LeadFormProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const businessNameId = `${idPrefix}-businessName`;
  const emailId = `${idPrefix}-email`;
  const volumeId = `${idPrefix}-volume`;
  const phoneId = `${idPrefix}-phone`;

  const onFormStart = () => {
    if (hasStarted) return;
    setHasStarted(true);
    trackEvent("form_start", { form: "lead_capture", placement: variant });
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trackEvent("form_submit", { form: "lead_capture", placement: variant });
    // Here you would typically send the form data to your backend
  };

  // Let parent know which id to focus (useful for a "focus form" CTA).
  useEffect(() => {
    onFirstFieldId?.(businessNameId);
  }, [onFirstFieldId, businessNameId]);

  return (
    <form
      className={className}
      onSubmit={onFormSubmit}
    >
      <div className={variant === "hero" ? "space-y-4" : "space-y-5"}>
        <div>
          <label
            htmlFor={businessNameId}
            className={variant === "hero" ? "sr-only" : "block text-sm font-medium mb-2"}
          >
            Business Name *
          </label>
          <Input
            id={businessNameId}
            placeholder="Business name"
            className="bg-secondary/80 border-border/60 h-12 focus:border-primary/50 transition-colors"
            required
            onFocus={onFormStart}
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
            id={emailId}
            type="email"
            placeholder={variant === "hero" ? "Work email" : "you@company.com"}
            className="bg-secondary/80 border-border/60 h-12 focus:border-primary/50 transition-colors"
            required
            onFocus={onFormStart}
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
            id={volumeId}
            required
            className="w-full bg-secondary/80 border border-border/60 rounded-lg px-3 text-foreground h-12 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
            onFocus={onFormStart}
            defaultValue=""
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
              className="w-full flex items-center justify-between text-sm text-muted-foreground hover:text-foreground px-1 py-2 transition-colors"
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
                id={phoneId}
                type="tel"
                placeholder="+91 98765 43210"
                className="bg-secondary/80 border-border/60 h-12 focus:border-primary/50 transition-colors"
                onFocus={onFormStart}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Button 
          type="submit" 
          size="lg" 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover-glow h-12 text-base font-semibold"
        >
          Get Flat 1.5% Pricing
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          No spam. Our onboarding team will reach out to help you.
        </p>
      </div>
    </form>
  );
}
