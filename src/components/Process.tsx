import { Card } from "@/components/ui/card";
import { UserPlus, Code2, FlaskConical, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your Zwitch account in minutes with simple KYC verification.",
  },
  {
    number: "02",
    icon: Code2,
    title: "Integrate",
    description: "Use our APIs or plugins to add payments to your website or app.",
  },
  {
    number: "03",
    icon: FlaskConical,
    title: "Test",
    description: "Verify your integration in our sandbox environment before going live.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Go Live",
    description: "Start accepting payments at just 1.5% and grow your business.",
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
            Integrate Payments{" "}
            <span className="gradient-text">in Hours</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our simple 4-step process gets you accepting payments faster than ever.
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
                    <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-display font-bold text-primary">{step.number}</span>
                    </div>
                    
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
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