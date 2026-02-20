import { Button } from "@/components/ui/button";
import { trackEvent, trackRegisterClick, buildRegisterURL } from "@/lib/analytics";
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

  const handleDocsClick = (placement: string) => {
    trackEvent("docs_click", {
      cta: "api_docs",
      placement,
      destination: "https://developers.zwitch.io/"
    });
  };

  // Handle CTA click - navigate to register with UTM tracking
  const handleRegisterClick = (e: React.MouseEvent<HTMLElement>, placement: string) => {
    e.preventDefault();
    trackRegisterClick(placement, "Get Flat 1.55%* Pricing");
    const registerUrl = buildRegisterURL({
      source: placement,
      content: "hero_cta"
    });
    window.open(registerUrl, "_blank", "noopener,noreferrer");
  };

  // Handle form submission success - redirect to register
  const handleFormSuccess = () => {
    trackEvent("form_to_register_redirect", { placement: "hero" });
    // Optionally redirect to register after form submission
    // const registerUrl = buildRegisterURL({ source: "hero_form_success" });
    // window.location.href = registerUrl;
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
            <span className="text-sm font-semibold text-primary">Limited-Time Offer · Flat 1.55%* Fee (New Merchants)</span>
          </div>

          {/* 2. Headline - Max 3 lines on mobile */}
          <h1 className="font-display font-bold text-[28px] leading-[1.2] tracking-tight mb-4">
            Accept Payments Faster.{" "}
            <span className="gradient-text">Pay Just 1.55%*.</span>
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

          {/* 4. Primary CTA - Full width, triggers navigation */}
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground w-full h-14 text-base font-semibold shadow-lg mb-6"
            onClick={(e) => handleRegisterClick(e, "hero_mobile_cta")}
          >
            Get Flat 1.55%* Pricing
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {/* Mobile UI Image */}
          <div className="relative group mb-8 perspective-1000">
            <img
              src="/hero-mobile.png"
              alt="Zwitch Mobile App"
              className="w-full h-auto object-contain rounded-2xl shadow-2xl shadow-primary/5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.02]"
            />
          </div>

          {/* Secondary CTA - Link to register */}
          {!mobileFormOpen && (
            <div className="flex flex-col items-center gap-3 mt-4">
              <a
                href="https://developers.zwitch.io/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleDocsClick("hero_mobile")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                View API Docs <span className="text-primary/70">(5-min setup)</span>
              </a>
            </div>
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
            {/* 60/40 split per PRD - Refactored for row alignment */}
            <div className="grid grid-cols-12 gap-x-12">
              {/* Row 1: Offer Badge */}
              <div className="col-span-7 pt-6 pb-8">
                {/* Offer Badge - Sharpened */}
                <div className="inline-flex items-center space-x-2 bg-primary/15 border border-primary/40 backdrop-blur-sm px-5 py-2.5 rounded-full">
                  <Flame className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Limited-Time Offer · Flat 1.55%* Fee (New Merchants)</span>
                </div>
              </div>
              <div className="col-span-5"></div> {/* Empty space right of badge */}

              {/* Row 2: Headline + CTAs (Left) and Image (Right) */}
              <div className="col-span-7 flex flex-col justify-between">
                <div>
                  {/* Headline - Max 2 lines desktop per PRD */}
                  <h1 className="font-display font-bold text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight mb-6">
                    Accept Payments Faster.{" "}
                    <span className="gradient-text">Pay Just 1.55%*.</span>
                  </h1>

                  {/* Subheadline - Heavy lifting per PRD */}
                  <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                    Go live in hours with 150+ payment methods, high success rates, and same-day settlements. Trusted by 42 lakh+ businesses across India.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-4">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground hover-glow h-12 px-6 text-base font-semibold"
                    onClick={(e) => handleRegisterClick(e, "hero_desktop")}
                  >
                    Get Flat 1.55%* Pricing
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <a
                    href="https://developers.zwitch.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleDocsClick("hero_desktop")}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                  >
                    <FileCode2 className="w-4 h-4" />
                    View API Docs <span className="text-primary/60">(5-min setup)</span>
                  </a>
                </div>
              </div>

              {/* Right Column Component (Image) */}
              <div className="col-span-5 relative w-full perspective-1000">
                <div className="absolute inset-y-0 -right-24 left-0 flex items-stretch justify-start group">
                  <img
                    src="/hero-desktop.png"
                    alt="Zwitch Dashboard"
                    className="h-full w-auto max-w-[140%] object-contain object-left rounded-xl shadow-2xl shadow-primary/10 transition-transform duration-500 origin-left group-hover:-translate-y-2 group-hover:scale-[1.03]"
                  />
                </div>
              </div>

              {/* Row 3: Stats */}
              <div className="col-span-7 pt-12 mt-12 border-t border-border/40 max-w-2xl">
                <div className="grid grid-cols-4 gap-6">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-left">
                      <p className="text-2xl lg:text-3xl font-display font-bold gradient-text mb-1">{stat.value}</p>
                      <p className="text-xs lg:text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-5"></div> {/* Empty space right of stats */}
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
