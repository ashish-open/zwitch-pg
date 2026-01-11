import { Card } from "@/components/ui/card";
import { CreditCard, Building2, Smartphone, Wallet, Calculator, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const paymentMethods = [
  {
    icon: Smartphone,
    title: "UPI",
    description: "Capture India's highest-converting payment method with support for GPay, PhonePe, CRED & more.",
    benefit: "↑ Highest success rate",
  },
  {
    icon: CreditCard,
    title: "Cards",
    description: "Accept domestic & international cards with EMI options to increase average order value.",
    benefit: "↑ Higher AOV",
  },
  {
    icon: Building2,
    title: "Net Banking",
    description: "Enable secure transactions through all major banks across India with instant confirmation.",
    benefit: "↑ Faster checkout",
  },
  {
    icon: Wallet,
    title: "Wallets",
    description: "Integrate Amazon Pay, Mobikwik, and more for customers who prefer wallet payments.",
    benefit: "↑ More completed payments",
  },
  {
    icon: Calculator,
    title: "EMI Options",
    description: "Offer credit and debit card EMIs to facilitate larger purchases and boost conversions.",
    benefit: "↑ Larger transactions",
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
            150+ Ways to{" "}
            <span className="gradient-text">Get Paid</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Every payment method your customers prefer — optimized for maximum conversions.
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
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {method.description}
                  </p>
                  
                  {/* Conversion Impact Label */}
                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    {method.benefit}
                  </div>
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
