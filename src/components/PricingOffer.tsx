import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const includedFeatures = [
  "No setup fees",
  "No hidden charges",
  "150+ payment options",
  "Same-day settlements",
  "24/7 dedicated support",
  "Developer-friendly APIs",
];

const PricingOffer = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="pricing" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] orange-glow -z-10" />
      
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-card border-primary/30 p-8 md:p-12 relative overflow-hidden">
            {/* Badge */}
            <div className="absolute top-6 right-6">
              <div className="flex items-center space-x-1 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Limited Offer</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Left side - Pricing */}
              <div>
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
                  Special Offer:{" "}
                  <span className="gradient-text">Industry's Lowest Rate</span>
                </h2>
                
                <div className="mb-6">
                  <div className="flex items-baseline space-x-2 mb-2">
                    <span className="font-display font-bold text-6xl md:text-7xl gradient-text">1.5%</span>
                    <span className="text-muted-foreground text-lg">per transaction</span>
                  </div>
                  <p className="text-muted-foreground">
                    Compared to industry standard 2-3%
                  </p>
                </div>
                
                <p className="text-sm text-muted-foreground mb-6">
                  Limited time offer for new merchants. Get started today and lock in the lowest transaction rates in the industry.
                </p>
                
                <a 
                  href="https://zwitch.open.money/register"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground hover-glow w-full md:w-auto">
                    Claim 1.5% Rate Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
              
              {/* Right side - Features */}
              <div className="bg-secondary/50 rounded-xl p-6 md:p-8">
                <h3 className="font-display font-semibold text-lg mb-4">What's Included:</h3>
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