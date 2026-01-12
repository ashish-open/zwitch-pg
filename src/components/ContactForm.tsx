import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { LeadForm } from "@/components/LeadForm";
import { trackRegisterClick, buildRegisterURL } from "@/lib/analytics";

const ContactForm = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    // Desktop form is now embedded in Hero. Keep this section for mobile only to avoid duplication.
    <section id="contact" className="py-12 md:hidden relative overflow-hidden">
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
            <h2 className="font-display font-bold text-[24px] md:text-5xl lg:text-6xl mb-3 md:mb-6">
              Get <span className="gradient-text">1.5%</span> Pricing Today
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground">
              Join 42 lakh+ businesses using Zwitch for payments.
            </p>
          </motion.div>
          
          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-card border-border p-6 md:p-10">
              {/* Mobile: low-friction form */}
              <div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Fast onboarding • No setup fees</span>
                </div>
                
                <LeadForm variant="section" idPrefix="mobileLead" />
              </div>
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
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  trackRegisterClick("contact_enterprise", "Talk to our enterprise team");
                  window.open(buildRegisterURL({ source: "contact_enterprise", content: "enterprise_cta" }), "_blank", "noopener,noreferrer");
                }}
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
