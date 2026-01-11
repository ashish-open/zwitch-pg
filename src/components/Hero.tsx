import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight, Building2, Clock, CreditCard, Flame, Shield, Smartphone, Zap, FileCode2, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LeadForm } from "@/components/LeadForm";
import { useState, useEffect, useRef } from "react";

const Hero = () => {
  const firstFieldId = useRef<string>("");
  const [mobileFormOpen, setMobileFormOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const hasTrackedScroll = useRef(false);

  const stats = [
    { icon: Building2, value: "42 Lakh+", label: "Businesses" },
    { icon: CreditCard, value: "150+", label: "Payment Methods" },
    { icon: Smartphone, value: "99%+", label: "Success Rate" },
    { icon: Clock, value: "< 1 Day", label: "Go Live" },
  ];

  // Track scroll past hero without interaction
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !hasTrackedScroll.current) {
            hasTrackedScroll.current = true;
            trackEvent("hero_scroll_past", { interacted: "false" });
          }
        });
      },
      { threshold: 0 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMobileFormOpen = () => {
    setMobileFormOpen(true);
    trackEvent("form_open", { placement: "hero_mobile" });
  };

  const handleDocsClick = () => {
    trackEvent("secondary_cta_click", { cta: "api_docs", placement: "hero" });
  };

  return (
    <section ref={heroRef} className="relative overflow-hidden pt-24 pb-10 md:pt-0 md:pb-0">
      {/* Background - reduced glow on mobile */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] orange-glow opacity-50 md:opacity-100 hidden md:block" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        {/* ==================== MOBILE HERO ==================== */}
        <div className="max-w-3xl mx-auto md:hidden">
          {/* 1. Offer Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/15 border border-primary/40 backdrop-blur-sm px-4 py-2 rounded-full mb-5">
            <Flame className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Limited-Time Offer · Flat 1.5% Fee (New Merchants)</span>
          </div>

          {/* 2. Headline - Max 3 lines on mobile */}
          <h1 className="font-display font-bold text-[28px] leading-[1.2] tracking-tight mb-4">
            Accept Payments Faster.{" "}
            <span className="gradient-text">Pay Just 1.5%.</span>
          </h1>

          {/* 3. Subheadline */}
          <p className="text-[15px] leading-relaxed text-muted-foreground mb-5">
            Go live in hours with 150+ payment methods, high success rates, and same-day settlements. Trusted by 42 lakh+ businesses across India.
          </p>

          {/* 5. Trust Strip - ABOVE CTA per PRD */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground mb-5">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-primary" />
              RBI-licensed
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-primary" />
              No setup fees
            </span>
            <span className="flex items-center gap-1.5">
              <FileCode2 className="w-3.5 h-3.5 text-primary" />
              Free sandbox
            </span>
          </div>

          {/* 4. Primary CTA - Full width, triggers form */}
          {!mobileFormOpen && (
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full h-14 text-base font-semibold shadow-lg"
              onClick={handleMobileFormOpen}
            >
              Get Flat 1.5% Pricing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}

          {/* Mobile Form - Collapsed by default, expands on CTA */}
          {mobileFormOpen && (
            <div className="bg-card/80 border border-border/60 rounded-2xl p-5 mb-6 animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between mb-4">
                <p className="font-display font-semibold text-base">
                  Get <span className="gradient-text">Flat 1.5%</span> Pricing
                </p>
                <button
                  type="button"
                  onClick={() => setMobileFormOpen(false)}
                  className="text-muted-foreground hover:text-foreground p-1"
                  aria-label="Close form"
                >
                  <ChevronDown className="w-5 h-5 rotate-180" />
                </button>
              </div>
              <LeadForm
                variant="hero"
                idPrefix="heroLeadMobile"
              />
            </div>
          )}

          {/* Secondary CTA */}
          {!mobileFormOpen && (
            <a
              href="https://developers.zwitch.io/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDocsClick}
              className="block text-center text-sm text-muted-foreground hover:text-foreground mt-4 py-2 transition-colors"
            >
              View API Docs <span className="text-primary/70">(5-min setup)</span>
            </a>
          )}

          {/* 6. Stats - 2×2 grid on mobile per PRD */}
          <div className="pt-6 mt-6 border-t border-border/40">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border/50 bg-card/30 px-4 py-3"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <p className="text-lg font-display font-bold gradient-text">{stat.value}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ==================== DESKTOP HERO ==================== */}
        <div className="hidden md:flex min-h-screen items-center pt-20">
          <div className="w-full max-w-6xl mx-auto">
            {/* 60/40 split per PRD */}
            <div className="grid grid-cols-12 gap-12 items-start">
              {/* Left Column (60%) - Hero Copy */}
              <div className="col-span-7 pt-6">
                {/* Offer Badge - Sharpened */}
                <div className="inline-flex items-center space-x-2 bg-primary/15 border border-primary/40 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8">
                  <Flame className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Limited-Time Offer · Flat 1.5% Fee (New Merchants)</span>
                </div>

                {/* Headline - Max 2 lines desktop per PRD */}
                <h1 className="font-display font-bold text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight mb-6">
                  Accept Payments Faster.{" "}
                  <span className="gradient-text">Pay Just 1.5%.</span>
                </h1>

                {/* Subheadline - Heavy lifting per PRD */}
                <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                  Go live in hours with 150+ payment methods, high success rates, and same-day settlements. Trusted by 42 lakh+ businesses across India.
                </p>

                {/* CTAs */}
                <div className="flex items-center gap-4 mb-6">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground hover-glow h-12 px-6 text-base font-semibold"
                    onClick={() => {
                      trackEvent("hero_cta_click", { placement: "hero_desktop" });
                      if (firstFieldId.current) {
                        const el = document.getElementById(firstFieldId.current) as HTMLInputElement | null;
                        el?.focus();
                        el?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }
                    }}
                  >
                    Get Flat 1.5% Pricing
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <a
                    href="https://developers.zwitch.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleDocsClick}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                  >
                    <FileCode2 className="w-4 h-4" />
                    View API Docs <span className="text-primary/60">(5-min setup)</span>
                  </a>
                </div>

                {/* Trust Strip - Desktop */}
                <div className="flex items-center gap-5 text-sm text-muted-foreground mb-10">
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-primary" />
                    RBI-licensed Payment Aggregator
                  </span>
                  <span className="text-border">•</span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-primary" />
                    No setup fees
                  </span>
                  <span className="text-border">•</span>
                  <span className="flex items-center gap-1.5">
                    <FileCode2 className="w-4 h-4 text-primary" />
                    Free sandbox & test mode
                  </span>
                </div>

                {/* Stats Row */}
                <div className="pt-8 border-t border-border/40 max-w-2xl">
                  <div className="grid grid-cols-4 gap-6">
                    {stats.map((stat) => (
                      <div key={stat.label} className="text-left">
                        <p className="text-2xl lg:text-3xl font-display font-bold gradient-text mb-1">{stat.value}</p>
                        <p className="text-xs lg:text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (40%) - Lead Form */}
              <div className="col-span-5">
                {/* Visually lighter card per PRD: darker bg, softer border */}
                <Card className="bg-card/80 border-border/50 p-6 lg:p-8 shadow-xl">
                  <div className="mb-5">
                    <p className="font-display font-semibold text-lg">
                      Get <span className="gradient-text">Flat 1.5%</span> Pricing
                    </p>
                    <p className="text-xs text-muted-foreground mt-1.5">
                      Available for new merchants. Subject to approval.
                    </p>
                  </div>

                  <LeadForm
                    variant="hero"
                    idPrefix="heroLead"
                    onFirstFieldId={(id) => {
                      firstFieldId.current = id;
                    }}
                  />

                  {/* Trust badges under form */}
                  <div className="mt-5 pt-5 border-t border-border/30 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-primary/70" />
                      RBI-licensed
                    </span>
                    <span className="text-border/50">•</span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-primary/70" />
                      No fees
                    </span>
                    <span className="text-border/50">•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-primary/70" />
                      Free sandbox
                    </span>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative orbs (desktop only, toned down) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl hidden md:block" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl hidden md:block" />
    </section>
  );
};

export default Hero;
