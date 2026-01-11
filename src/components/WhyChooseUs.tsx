import { Card } from "@/components/ui/card";
import { Shield, Zap, Users, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const features = [
  {
    icon: Shield,
    title: "100% Transparent Reporting",
    description: "Full access to campaign data, analytics dashboards, and real-time performance metrics."
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Rapid execution cycles with weekly creative refreshes and continuous optimization."
  },
  {
    icon: Users,
    title: "Dedicated Expert Team",
    description: "Your own team of strategists, designers, and performance marketers."
  },
  {
    icon: BarChart,
    title: "Data-Driven Decisions",
    description: "Every decision backed by analytics, A/B testing, and proven frameworks."
  }
];

const WhyChooseUs = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
            Why Choose Us
          </h2>
          <p className="text-lg text-muted-foreground">
            Transparent. Data-Driven. Creative-Powered.
          </p>
        </motion.div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Card className="bg-card border-border p-6 text-center hover:border-primary/50 transition-all duration-300 hover-scale h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                
                <h3 className="font-display font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
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

export default WhyChooseUs;
