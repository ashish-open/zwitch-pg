import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 600px
      setIsVisible(window.scrollY > 600);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border py-4 md:py-3"
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="font-display font-semibold text-lg">
                  Limited Time: <span className="gradient-text">1.5% Transaction Rate</span>
                </p>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  Save up to ₹1 Lakh per crore processed. No setup fees.
                </p>
              </div>
              
              <a 
                href="https://zwitch.open.money/register"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground hover-glow whitespace-nowrap">
                  Get 1.5% Pricing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
