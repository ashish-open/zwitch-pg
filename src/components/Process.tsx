import { UserPlus, Code2, FlaskConical, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Card } from "@/components/ui/card";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

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

const morphingTexts = ["in Hours", "Seamlessly", "Today", "with Ease"];

const Process = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="process" className="py-12 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-[24px] md:text-5xl lg:text-6xl mb-3 md:mb-6">
            <span className="block">Integrate Payments</span>
            <GooeyText
              texts={morphingTexts}
              morphTime={0.8}
              cooldownTime={1.2}
              className="block"
              textClassName="text-[24px] md:text-5xl lg:text-6xl font-display font-bold gradient-text"
            />
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground">
            Our simple 4-step process gets you accepting payments faster than ever.
          </p>
        </motion.div>
        
        {/* Mobile: Vertical timeline */}
        <div className="max-w-3xl mx-auto md:hidden">
          <div className="relative pl-6">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />
            <div className="space-y-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                    className="relative"
                  >
                    <div className="absolute -left-1 top-1 h-8 w-8 rounded-full bg-background border border-border flex items-center justify-center">
                      <span className="text-xs font-display font-bold text-primary">{step.number}</span>
                    </div>
                    <div className="rounded-xl border border-border bg-card/50 p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-base mb-1">{step.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Desktop: restore 2x2 cards */}
        <div className="hidden md:block max-w-5xl mx-auto">
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
                    <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-display font-bold text-primary">{step.number}</span>
                    </div>
                    
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 hidden md:block" />
    </section>
  );
};

export default Process;
