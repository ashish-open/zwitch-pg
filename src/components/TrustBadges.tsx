import { Card } from "@/components/ui/card";
import { Shield, Award, Lock, Building } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const trustBadges = [
  {
    icon: Shield,
    title: "PCI DSS Compliance",
    description: "Secure handling of cardholder information with every transaction."
  },
  {
    icon: Award,
    title: "ISO 27001 Certified",
    description: "Global standard for information security management."
  },
  {
    icon: Lock,
    title: "SOC-2 Compliance",
    description: "Data security, availability, processing integrity, and privacy."
  },
  {
    icon: Building,
    title: "RBI Licensed",
    description: "Licensed Payment Aggregator/Payment Gateway by RBI."
  }
];

const TrustBadges = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section className="py-24 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
            Why Clients{" "}
            <span className="gradient-text">Trust Zwitch</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Rigorously compliant with industry standards, making it the right choice for businesses of all sizes.
          </p>
        </motion.div>
        
        {/* Trust Badges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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