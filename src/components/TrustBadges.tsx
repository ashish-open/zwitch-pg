import { Card } from "@/components/ui/card";
import { Shield, Award, Lock, Building } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const trustBadges = [
  {
    icon: Building,
    title: "RBI Licensed",
    description: "Licensed Payment Aggregator by Reserve Bank of India.",
    license: "PA License"
  },
  {
    icon: Shield,
    title: "PCI DSS Level 1",
    description: "Highest level of cardholder data security compliance.",
    license: "Certified"
  },
  {
    icon: Award,
    title: "ISO 27001",
    description: "Global standard for information security management.",
    license: "Certified"
  },
  {
    icon: Lock,
    title: "SOC-2 Type II",
    description: "Verified data security, availability & privacy controls.",
    license: "Compliant"
  }
];

const TrustBadges = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="compliance" className="py-12 md:py-24 bg-secondary/20">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-[24px] md:text-5xl lg:text-6xl mb-3">
            Secure &{" "}
            <span className="gradient-text">Compliant</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground mb-2">
            RBI licensed and certified for enterprise-grade security.
          </p>
          <p className="text-sm text-primary font-medium">
            Used by banks, fintechs & regulated businesses
          </p>
        </motion.div>
        
        {/* Mobile: 2x2 grid, low density */}
        <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto md:hidden">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <div className="rounded-xl border border-border bg-card/50 p-4 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-xs text-primary font-semibold mb-1">{badge.license}</p>
                  <h3 className="font-display font-bold text-sm">{badge.title}</h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop: original detailed cards */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Card className="bg-card border-border p-6 text-center hover:border-primary/50 transition-all duration-300 hover-scale h-full">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <div className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded mb-3">
                    {badge.license}
                  </div>
                  
                  <h3 className="font-display font-bold text-lg mb-2">{badge.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {badge.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
