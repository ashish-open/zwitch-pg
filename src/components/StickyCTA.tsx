import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackRegisterClick, buildRegisterURL, isMobileViewport } from "@/lib/analytics";

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Per PRD: Sticky on mobile scroll (first 50% of page)
      // Show after scrolling past hero (~50vh) and hide after 50% of page
      if (isMobileViewport()) {
        const pageHeight = document.documentElement.scrollHeight;
        const fiftyPercentPage = pageHeight * 0.5;
        setIsVisible(scrollY > viewportHeight * 0.5 && scrollY < fiftyPercentPage);
      } else {
        // Desktop: show after scrolling 600px
        setIsVisible(scrollY > 600);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, placement: string) => {
    e.preventDefault();
    trackRegisterClick(placement, "Get Flat 1.5% Pricing");
    const registerUrl = buildRegisterURL({ source: placement, content: "sticky_cta" });
    window.open(registerUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border/60 py-3 md:py-3"
        >
          <div className="container mx-auto px-4 md:px-6">
            {/* Mobile: Full-width CTA per PRD */}
            <div className="md:hidden">
              <a
                href="#"
                className="block"
                onClick={(e) => handleCtaClick(e, "sticky_mobile")}
              >
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold"
                >
                  Get Flat 1.5% Pricing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>

            {/* Desktop: Original layout */}
            <div className="hidden md:flex items-center justify-between gap-4">
              <div className="text-left">
                <p className="font-display font-semibold text-lg">
                  Limited Time: <span className="gradient-text">Flat 1.5% Fee</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Save up to ₹1 Lakh per crore processed. No setup fees.
                </p>
              </div>

              <a
                href="#"
                onClick={(e) => handleCtaClick(e, "sticky_desktop")}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground hover-glow whitespace-nowrap"
                >
                  Get Flat 1.5% Pricing
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
