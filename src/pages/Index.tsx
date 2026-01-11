import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PaymentMethods from "@/components/PaymentMethods";
import Services from "@/components/Services";
import PricingOffer from "@/components/PricingOffer";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import TrustBadges from "@/components/TrustBadges";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <PaymentMethods />
        <Services />
        <PricingOffer />
        <Process />
        <TrustBadges />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;