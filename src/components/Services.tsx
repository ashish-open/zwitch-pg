import { Card } from "@/components/ui/card";
import { Code2, MonitorSmartphone, Puzzle, TrendingUp, AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const features = [
  {
    icon: Code2,
    title: "Developer-Friendly APIs",
    description: "Integrate payments with just a few lines of code using our RESTful APIs and comprehensive SDKs.",
  },
  {
    icon: MonitorSmartphone,
    title: "In-Page Payment Experience",
    description: "Keep users on your site without redirects for seamless payments and higher conversions.",
  },
  {
    icon: Puzzle,
    title: "Platform Plugins",
    description: "Ready-to-use plugins for Shopify, WooCommerce, WordPress, and Magento for quick setup.",
  },
  {
    icon: TrendingUp,
    title: "High Success Rates",
    description: "Built to maximize transaction success rates with intelligent routing and fallback options.",
  },
  {
    icon: AlertCircle,
    title: "Real-Time Failure Insights",
    description: "Access detailed insights on payment failures to refine your checkout process.",
  },
  {
    icon: RefreshCw,
    title: "Instant Refunds",
    description: "Process refunds quickly and efficiently with automated workflows.",
  }
];

const Services = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="features" className="py-24 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
            Why Use Zwitch{" "}
            <span className="gradient-text">Payment Gateway</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to accept payments seamlessly—from integration to reconciliation.
          </p>
        </motion.div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Card className="group bg-card border-border p-8 hover:border-primary/50 transition-all duration-300 hover-scale h-full">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <h3 className="font-display font-bold text-xl mb-3">{feature.title}</h3>
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

export default Services;