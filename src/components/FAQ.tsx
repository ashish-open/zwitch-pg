import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Who is eligible for the 1.5% rate?",
    answer: "The 1.5% rate is available for new merchants signing up during our limited-time offer period. All businesses completing our standard onboarding process qualify. Existing merchants can contact support for upgrade options."
  },
  {
    question: "How fast are settlements?",
    answer: "We offer same-day settlements as standard. Funds are typically credited to your bank account within 24 hours of a successful transaction. T+1 settlements are available at no extra cost."
  },
  {
    question: "Is Zwitch RBI compliant?",
    answer: "Yes, absolutely. Zwitch is a licensed Payment Aggregator under the Reserve Bank of India. We're also PCI DSS Level 1 certified, ISO 27001 certified, and SOC-2 Type II compliant — the highest standards in the industry."
  },
  {
    question: "How long does integration take?",
    answer: "Most developers complete integration within a few hours. Our RESTful APIs come with comprehensive SDKs, detailed documentation, and a production-grade sandbox. No-code options via Shopify/WooCommerce plugins take minutes."
  },
  {
    question: "Are there any hidden charges?",
    answer: "No hidden charges, ever. The 1.5% rate includes all payment methods — UPI, cards, net banking, and wallets. No setup fees, no annual fees, no minimum transaction requirements."
  },
  {
    question: "What support is available?",
    answer: "We provide 24/7 dedicated support via email, chat, and phone. Enterprise customers get a dedicated account manager. Our developer support team typically responds within 2 hours during business hours."
  }
];

const FAQ = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              Common{" "}
              <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know before getting started.
            </p>
          </div>
          
          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              >
                <AccordionItem value={`item-${index}`} className="border-border">
                  <AccordionTrigger className="text-left font-display font-semibold text-lg hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
