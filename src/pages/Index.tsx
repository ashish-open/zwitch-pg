import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import { isMobileViewport, trackEvent } from "@/lib/analytics";
import { lazy, Suspense, useEffect } from "react";

// Below-fold: lazy-load to reduce initial JS on mobile
const PaymentMethods = lazy(() => import("@/components/PaymentMethods"));
const Services = lazy(() => import("@/components/Services"));
const PricingOffer = lazy(() => import("@/components/PricingOffer"));
const Process = lazy(() => import("@/components/Process"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const FAQ = lazy(() => import("@/components/FAQ"));
const ContactForm = lazy(() => import("@/components/ContactForm"));

const Index = () => {
  useEffect(() => {
    if (!isMobileViewport()) return;

    const fired = new Set<number>();
    const thresholds = [25, 50, 75];

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
      const percent = Math.round((window.scrollY / scrollable) * 100);

      for (const t of thresholds) {
        if (!fired.has(t) && percent >= t) {
          fired.add(t);
          trackEvent("scroll_depth", { percent: t });
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        {/* Trust moved up - appears early */}
        <TrustBadges />
        <Suspense fallback={null}>
          <PaymentMethods />
          <Services />
          <PricingOffer />
          <Process />
          <Testimonials />
          <FAQ />
          <ContactForm />
        </Suspense>
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default Index;
