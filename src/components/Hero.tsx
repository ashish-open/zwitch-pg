import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const clients = ["Shopify", "Webflow", "Stripe", "Meta", "Google"];
  
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Hero background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-secondary/50 backdrop-blur-sm px-4 py-2 rounded-full mb-8 animate-fade-in">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium">₹200 Cr+ Revenue Generated for Clients</span>
          </div>
          
          {/* Headline */}
          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            We Help Brands Scale{" "}
            <span className="gradient-text">Profitably</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Data-backed strategy, performance marketing, and powerful creative—designed to grow revenue consistently.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground hover-glow w-full sm:w-auto">
              Get Free Audit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              View Case Studies
            </Button>
          </div>
          
          {/* Client Logos */}
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <p className="text-sm text-muted-foreground mb-6">Trusted by leading brands</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {clients.map((client, index) => (
                <div 
                  key={client}
                  className="text-muted-foreground/60 font-display font-semibold text-lg hover:text-foreground transition-colors cursor-pointer"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  {client}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
    </section>
  );
};

export default Hero;
