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
    <section className="py-24 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
            Secure &{" "}
            <span className="gradient-text">Compliant</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Your money, data, and compliance handled to the highest standards.
          </p>
          <p className="text-sm text-primary font-medium">
            Used by banks & regulated fintechs across India
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
