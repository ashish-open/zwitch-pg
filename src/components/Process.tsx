import { Card } from "@/components/ui/card";
import { Search, Rocket, LineChart, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Strategy & Audit",
    description: "We analyze your data, creatives, funnels, competition & customer behavior.",
    gradient: "from-primary to-blue-500"
  },
  {
    number: "02",
    icon: Rocket,
    title: "Execution",
    description: "Creative + media buying + CRO executed in a unified engine.",
    gradient: "from-blue-500 to-purple-500"
  },
  {
    number: "03",
    icon: LineChart,
    title: "Optimization",
    description: "Daily iteration, ad refresh cycles, testing frameworks.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Scaling",
    description: "Expand into new channels & audiences while maintaining ROAS.",
    gradient: "from-pink-500 to-orange-500"
  }
];

const Process = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="process" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
            Predictable Growth Through a{" "}
            <span className="gradient-text">Proven Framework</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our 4-step execution framework delivers consistent results for every client.
          </p>
        </motion.div>
        
        {/* Process Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <Card className="group relative bg-card border-border p-8 hover:border-primary/50 transition-all duration-300 h-full">
                  {/* Number badge */}
                  <div className={`absolute top-8 right-8 w-12 h-12 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center`}>
                    <span className="font-display font-bold text-background">{step.number}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-display font-bold text-2xl mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
    </section>
  );
};

export default Process;
