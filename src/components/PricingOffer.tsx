import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { trackRegisterClick, buildRegisterURL } from "@/lib/analytics";
import { ArrowRight, Check, Calculator, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useState } from "react";

const includedFeatures = [
  "No setup fees",
  "No hidden charges",
  "150+ payment options",
  "Same-day settlements",
  "24/7 dedicated support",
  "Developer-friendly APIs",
  "Production-grade sandbox",
  "Webhook reliability",
];

const PricingOffer = () => {
  const { ref, isVisible } = useScrollReveal();
  const [volume, setVolume] = useState(10000000); // 1 Cr default
  const [showCalculator, setShowCalculator] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  
  // Calculate savings (assuming competitors charge 2.5%)
  const competitorRate = 0.025;
  const zwitchRate = 0.015;
  const savings = volume * (competitorRate - zwitchRate);
  
  return (
    <section id="pricing" className="py-12 md:py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] orange-glow -z-10 hidden md:block" />
      
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Mobile layout */}
          <div className="md:hidden max-w-3xl mx-auto">
            {/* Title */}
            <div className="text-left mb-6">
              <h2 className="font-display font-bold text-[24px] mb-2">
                Flat <span className="gradient-text">1.5%</span> Transaction Fee
              </h2>
              <p className="text-sm text-muted-foreground">
                Most gateways charge 2–3%. Lock in 1.5% today.
              </p>
            </div>

            {/* Comparison strip */}
            <div className="rounded-xl border border-border bg-card/50 p-4 mb-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Others</p>
                  <p className="text-lg font-display font-bold text-muted-foreground">2% – 3%</p>
                </div>
                <div className="h-10 w-px bg-border" />
                <div className="text-left">
                  <p className="text-xs text-primary font-semibold">Zwitch</p>
                  <p className="text-2xl font-display font-bold gradient-text">1.5%</p>
                </div>
              </div>
            </div>

            {/* Savings calculator (optional toggle) */}
            <Card className="bg-card border-border p-4 mb-4">
              <Collapsible open={showCalculator} onOpenChange={setShowCalculator}>
                <CollapsibleTrigger asChild>
                  <Button type="button" variant="outline" className="w-full justify-between h-12">
                    <span className="flex items-center gap-2">
                      <Calculator className="h-4 w-4" />
                      Savings calculator (optional)
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${showCalculator ? "rotate-180" : ""}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="mb-4">
                    <label className="block text-sm text-muted-foreground mb-2">
                      Monthly Transaction Volume
                    </label>
                    <select 
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-full bg-secondary border border-border rounded-lg p-3 text-foreground h-12"
                    >
                      <option value={1000000}>₹10 Lakh</option>
                      <option value={5000000}>₹50 Lakh</option>
                      <option value={10000000}>₹1 Crore</option>
                      <option value={50000000}>₹5 Crore</option>
                      <option value={100000000}>₹10 Crore</option>
                    </select>
                  </div>
                  
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <p className="text-sm text-muted-foreground mb-1">Estimated annual savings</p>
                    <p className="text-3xl font-display font-bold gradient-text">
                      ₹{(savings * 12).toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Compared to 2.5% industry average
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Included features */}
            <Card className="bg-card border-border p-4 mb-6">
              <h3 className="font-display font-semibold text-base mb-4">Everything included</h3>
              <ul className="space-y-3">
                {includedFeatures.map((feature) => (
                  <li key={feature} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* CTA */}
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                trackRegisterClick("pricing_mobile", "Lock 1.5% Pricing");
                window.open(buildRegisterURL({ source: "pricing_mobile", content: "pricing_cta" }), "_blank", "noopener,noreferrer");
              }}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground hover-glow w-full h-12"
              >
                Lock 1.5% Pricing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>

            {/* Disclaimer (collapsed) */}
            <div className="mt-3">
              <Collapsible open={showDisclaimer} onOpenChange={setShowDisclaimer}>
                <CollapsibleTrigger asChild>
                  <button type="button" className="w-full flex items-center justify-between text-xs text-muted-foreground px-1 py-2">
                    <span>Disclaimer</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${showDisclaimer ? "rotate-180" : ""}`} />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="text-xs text-muted-foreground px-1 pb-2">
                  Available for new merchants. Subject to approval.
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          {/* Desktop layout (restore original richer design) */}
          <div className="hidden md:block">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
                Flat <span className="gradient-text">1.5%</span> Transaction Fee
              </h2>
              <p className="text-xl text-muted-foreground">
                Most gateways charge 2–3%. Lock in 1.5% today.
              </p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card border border-border rounded-xl p-6 mb-8"
            >
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">Others Charge</p>
                  <p className="text-3xl font-display font-bold text-muted-foreground line-through">2% – 3%</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                  <p className="text-sm text-primary mb-1 font-semibold">Zwitch Rate</p>
                  <p className="text-4xl font-display font-bold gradient-text">1.5%</p>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">Your Savings</p>
                  <p className="text-3xl font-display font-bold text-primary">Up to ₹1L/Cr</p>
                </div>
              </div>
            </motion.div>
            
            <Card className="bg-card border-primary/30 p-8 md:p-12 relative overflow-hidden">
              <div className="grid md:grid-cols-2 gap-10 items-start">
                <div>
                  <h3 className="font-display font-bold text-2xl mb-6 flex items-center gap-2">
                    <Calculator className="w-6 h-6 text-primary" />
                    Calculate Your Savings
                  </h3>
                  
                  <div className="mb-6">
                    <label className="block text-sm text-muted-foreground mb-2">
                      Monthly Transaction Volume
                    </label>
                    <select 
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-full bg-secondary border border-border rounded-lg p-3 text-foreground"
                    >
                      <option value={1000000}>₹10 Lakh</option>
                      <option value={5000000}>₹50 Lakh</option>
                      <option value={10000000}>₹1 Crore</option>
                      <option value={50000000}>₹5 Crore</option>
                      <option value={100000000}>₹10 Crore</option>
                    </select>
                  </div>
                  
                  <div className="bg-secondary/50 rounded-xl p-6 mb-6">
                    <p className="text-sm text-muted-foreground mb-2">Annual Savings with Zwitch</p>
                    <p className="text-4xl font-display font-bold gradient-text">
                      ₹{(savings * 12).toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Compared to 2.5% industry average
                    </p>
                  </div>
                  
                  <a 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      trackRegisterClick("pricing_desktop", "Claim 1.5% Rate Now");
                      window.open(buildRegisterURL({ source: "pricing_desktop", content: "pricing_cta" }), "_blank", "noopener,noreferrer");
                    }}
                  >
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground hover-glow w-full"
                    >
                      Claim 1.5% Rate Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                  
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Available for new merchants. Subject to onboarding approval.
                  </p>
                </div>
                
                <div className="bg-secondary/50 rounded-xl p-6 md:p-8">
                  <h3 className="font-display font-semibold text-lg mb-4">Everything Included:</h3>
                  <ul className="space-y-3">
                    {includedFeatures.map((feature) => (
                      <li key={feature} className="flex items-center space-x-3">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingOffer;
