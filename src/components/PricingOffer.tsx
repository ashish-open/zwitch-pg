import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check, Flame, Calculator } from "lucide-react";
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
  
  // Calculate savings (assuming competitors charge 2.5%)
  const competitorRate = 0.025;
  const zwitchRate = 0.015;
  const savings = volume * (competitorRate - zwitchRate);
  
  return (
    <section id="pricing" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] orange-glow -z-10" />
      
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
              Flat <span className="gradient-text">1.5%</span> Transaction Fee
            </h2>
            <p className="text-xl text-muted-foreground">
              Most gateways charge 2–3%. Lock in 1.5% today.
            </p>
          </div>
          
          {/* Comparison Strip */}
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
            {/* Badge */}
            <div className="absolute top-6 right-6">
              <div className="flex items-center space-x-1 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-semibold">
                <Flame className="w-4 h-4" />
                <span>Limited Offer</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10 items-start">
              {/* Left side - Savings Calculator */}
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
                    ₹{(savings * 12).toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Compared to 2.5% industry average
                  </p>
                </div>
                
                <a 
                  href="https://zwitch.open.money/register"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground hover-glow w-full">
                    Claim 1.5% Rate Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                
                {/* Qualification clarity */}
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Available for new merchants. Subject to onboarding approval.
                </p>
              </div>
              
              {/* Right side - Features */}
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
        </motion.div>
      </div>
    </section>
  );
};

export default PricingOffer;
