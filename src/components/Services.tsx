import { Card } from "@/components/ui/card";
import { TrendingUp, MonitorSmartphone, Code2, Puzzle, AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GlowingEffect } from "@/components/ui/glowing-effect";

// Reordered by buyer psychology - business outcomes first
const features = [
  {
    icon: TrendingUp,
    title: "High Success Rates",
    description: "Built to maximize transaction success rates with intelligent routing and fallback options.",
    whyItMatters: "More completed payments = more revenue",
  },
  {
    icon: MonitorSmartphone,
    title: "In-Page Payment Experience",
    description: "Keep users on your site without redirects for seamless payments and higher conversions.",
    whyItMatters: "Reduce drop-offs at checkout",
  },
  {
    icon: Code2,
    title: "Developer-Friendly APIs",
    description: "Integrate payments with just a few lines of code using our RESTful APIs and comprehensive SDKs.",
    whyItMatters: "Go live in hours, not weeks",
  },
  {
    icon: Puzzle,
    title: "Platform Plugins",
    description: "Ready-to-use plugins for Shopify, WooCommerce, WordPress, and Magento for quick setup.",
    whyItMatters: "Zero coding required",
  },
  {
    icon: AlertCircle,
    title: "Real-Time Failure Insights",
    description: "Access detailed insights on payment failures to refine your checkout process.",
    whyItMatters: "Fix issues before they cost you",
  },
  {
    icon: RefreshCw,
    title: "Instant Refunds",
    description: "Process refunds quickly and efficiently with automated workflows.",
    whyItMatters: "Keep customers happy",
  }
];

const Services = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="features" className="py-12 bg-secondary/20 md:hidden">
      <div className="container mx-auto px-6" ref={ref}>


        {/* Mobile: accordion */}
        <div className="md:hidden max-w-2xl mx-auto">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AccordionItem key={feature.title} value={`item-${index}`} className="border-border">
                  <AccordionTrigger className="text-left font-display font-semibold text-base hover:text-primary transition-colors">
                    <span className="flex items-center gap-3">
                      <span className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-primary" />
                      </span>
                      {feature.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    <p className="text-sm mb-2">{feature.description}</p>
                    <p className="text-xs font-medium text-primary">→ {feature.whyItMatters}</p>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>


      </div>
    </section>
  );
};

export default Services;
