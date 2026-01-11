import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const ContactForm = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background -z-10" />
      
      <div className="container mx-auto px-6" ref={ref}>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              Ready to Scale Your Brand?
            </h2>
            <p className="text-lg text-muted-foreground">
              Get a free audit and a tailored growth roadmap.
            </p>
          </motion.div>
          
          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-card border-border p-8 md:p-10">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <Input 
                    id="name"
                    placeholder="John Doe" 
                    className="bg-secondary border-border"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="john@company.com" 
                    className="bg-secondary border-border"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="website" className="block text-sm font-medium mb-2">
                    Website URL
                  </label>
                  <Input 
                    id="website"
                    placeholder="www.yoursite.com" 
                    className="bg-secondary border-border"
                  />
                </div>
                
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium mb-2">
                    Monthly Ad Spend
                  </label>
                  <Input 
                    id="budget"
                    placeholder="₹5,00,000" 
                    className="bg-secondary border-border"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Tell us about your goals
                </label>
                <Textarea 
                  id="message"
                  placeholder="I want to scale my D2C brand profitably..." 
                  className="bg-secondary border-border min-h-32"
                />
              </div>
              
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover-glow"
              >
                Get Free Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                We'll get back to you within 24 hours with a customized growth plan.
              </p>
            </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
