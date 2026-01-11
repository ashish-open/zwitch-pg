import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import PaymentMethods from "@/components/PaymentMethods";
import Services from "@/components/Services";
import PricingOffer from "@/components/PricingOffer";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        {/* Trust moved up - appears early */}
        <TrustBadges />
        <PaymentMethods />
        <Services />
        <PricingOffer />
        <Process />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default Index;
