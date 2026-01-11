import { Card } from "@/components/ui/card";
import { Target, Palette, TrendingUp, Code, Share2, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const services = [
  {
    icon: Target,
    title: "Performance Marketing",
    description: "Full-funnel media buying focused on profitable scale and optimized CAC.",
    color: "text-primary"
  },
  {
    icon: Palette,
    title: "Creative Production",
    description: "Eye-catching content that converts—UGC, product ads, lifestyle shoots, reels, and more.",
    color: "text-pink-500"
  },
  {
    icon: TrendingUp,
    title: "Branding & Identity",
    description: "Modern, premium brand identities that customers remember.",
    color: "text-orange-500"
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Fast, modern and conversion-optimized websites on Webflow, Shopify, and custom stacks.",
    color: "text-blue-500"
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description: "Strategic content planning, community engagement, and growth across all platforms.",
    color: "text-green-500"
  },
  {
    icon: Mail,
    title: "Email & SMS Flows",
    description: "Automated sequences that nurture leads and drive repeat purchases.",
    color: "text-purple-500"
  }
];

const Services = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="services" className="py-24 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
            Full-Stack Growth Services
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to scale your brand under one roof—from strategy to execution.
          </p>
        </motion.div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Card className="group bg-card border-border p-8 hover:border-primary/50 transition-all duration-300 hover-scale h-full">
                <div className={`w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-secondary/70 transition-colors ${service.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                
                <h3 className="font-display font-bold text-xl mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
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

export default Services;
