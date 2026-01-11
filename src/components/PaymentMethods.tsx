import { Card } from "@/components/ui/card";
import { CreditCard, Building2, Smartphone, Wallet, Calculator } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const paymentMethods = [
  {
    icon: CreditCard,
    title: "Cards",
    description: "Accept payments via credit and debit cards, with EMI options for higher flexibility.",
  },
  {
    icon: Building2,
    title: "Net Banking",
    description: "Enable secure transactions through all major banks across India.",
  },
  {
    icon: Smartphone,
    title: "UPI",
    description: "Accept payments from Google Pay, PhonePe, CRED, Paytm, and more.",
  },
  {
    icon: Wallet,
    title: "Wallets",
    description: "Integrate popular wallets like Amazon Pay, Mobikwik, and more.",
  },
  {
    icon: Calculator,
    title: "EMI Options",
    description: "Offer credit and debit card EMIs to facilitate larger purchases and improve conversions.",
  },
];

const PaymentMethods = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="payment-methods" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
            Supported{" "}
            <span className="gradient-text">Payment Methods</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Zwitch offers a comprehensive range of payment methods, ensuring your customers can choose their preferred option.
          </p>
        </motion.div>
        
        {/* Payment Methods Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {paymentMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              >
                <Card className="group bg-card border-border p-6 hover:border-primary/50 transition-all duration-300 hover-scale h-full text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <h3 className="font-display font-bold text-lg mb-2">{method.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {method.description}
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

export default PaymentMethods;