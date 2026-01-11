import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Shield, Clock, CheckCircle } from "lucide-react";
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
              Get <span className="gradient-text">1.5% Pricing</span> Today
            </h2>
            <p className="text-lg text-muted-foreground">
              Join 42 lakh+ businesses using Zwitch for payments.
            </p>
          </motion.div>
          
          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-card border-border p-8 md:p-10">
              {/* Trust indicators at top */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8 pb-6 border-b border-border">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-primary" />
                  RBI Licensed
                </span>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  Go live in hours
                </span>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  No setup fees
                </span>
              </div>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium mb-2">
                      Business Name *
                    </label>
                    <Input 
                      id="businessName"
                      placeholder="Your Company Name" 
                      className="bg-secondary border-border"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Work Email *
                    </label>
                    <Input 
                      id="email"
                      type="email"
                      placeholder="you@company.com" 
                      className="bg-secondary border-border"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <Input 
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210" 
                      className="bg-secondary border-border"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="volume" className="block text-sm font-medium mb-2">
                      Expected Monthly Volume *
                    </label>
                    <Select>
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue placeholder="Select volume" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="below-1l">Below ₹1 Lakh</SelectItem>
                        <SelectItem value="1l-10l">₹1 Lakh - ₹10 Lakh</SelectItem>
                        <SelectItem value="10l-50l">₹10 Lakh - ₹50 Lakh</SelectItem>
                        <SelectItem value="50l-1cr">₹50 Lakh - ₹1 Crore</SelectItem>
                        <SelectItem value="above-1cr">Above ₹1 Crore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover-glow py-6 text-lg"
                >
                  Get Started with 1.5% Rate
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                {/* Reassurance text */}
                <p className="text-xs text-muted-foreground text-center">
                  No spam. No sales pressure. Our onboarding team will reach out within 24 hours.
                </p>
              </form>
            </Card>
          </motion.div>
          
          {/* Alternative CTA for high volume */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-muted-foreground">
              Processing ₹1 Cr+ monthly?{" "}
              <a 
                href="https://zwitch.open.money/register" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Talk to our enterprise team →
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
