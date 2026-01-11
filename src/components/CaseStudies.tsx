import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const caseStudies = [
  {
    brand: "GlowWorld",
    industry: "D2C Beauty",
    revenue: "₹1.8 Cr",
    timeframe: "60 days",
    roas: "4.3x",
    metric: "Blended ROAS",
    description: "Scaling through creative testing, funnel optimization & multi-channel expansion.",
    color: "from-pink-500 to-rose-500"
  },
  {
    brand: "Athleto",
    industry: "Sportswear",
    revenue: "₹3.2 Cr",
    timeframe: "90 days",
    roas: "5.6x",
    metric: "ROAS",
    description: "Performance marketing with UGC content strategy and conversion rate optimization.",
    color: "from-primary to-blue-500"
  },
  {
    brand: "Wearloom",
    industry: "Fashion",
    revenue: "₹2.4 Cr",
    timeframe: "45 days",
    roas: "48%",
    metric: "CAC Reduction",
    description: "Full-funnel creative refresh with data-driven audience targeting and retargeting.",
    color: "from-orange-500 to-amber-500"
  }
];

const CaseStudies = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="case-studies" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 bg-secondary/50 px-4 py-2 rounded-full mb-6">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Proven Results</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
            Real Growth. Real Numbers.
          </h2>
          <p className="text-lg text-muted-foreground">
            We've helped hundreds of brands scale profitably with our data-driven approach to growth marketing.
          </p>
        </motion.div>
        
        {/* Case Study Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.brand}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <Card className="group bg-card border-border p-8 hover:border-primary/50 transition-all duration-300 hover-scale h-full">
              {/* Gradient accent */}
              <div className={`w-full h-2 rounded-full bg-gradient-to-r ${study.color} mb-6`} />
              
              {/* Brand Info */}
              <div className="mb-6">
                <h3 className="font-display font-bold text-2xl mb-2">{study.brand}</h3>
                <p className="text-sm text-muted-foreground">{study.industry}</p>
              </div>
              
              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-3xl font-display font-bold gradient-text">{study.roas}</p>
                  <p className="text-sm text-muted-foreground">{study.metric}</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold">{study.revenue}</p>
                  <p className="text-sm text-muted-foreground">in {study.timeframe}</p>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-sm text-muted-foreground mb-6">
                {study.description}
              </p>
              
              {/* CTA */}
              <Button 
                variant="ghost" 
                className="w-full group-hover:bg-secondary/50 transition-colors"
              >
                View Full Case Study
                <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
