import { Button } from "@/components/ui/button";
import { ArrowRight, Flame, Shield, Zap, Clock } from "lucide-react";

const Hero = () => {
  const stats = [
    { value: "42 Lakh+", label: "Businesses Powered" },
    { value: "150+", label: "Payment Methods" },
    { value: "99%+", label: "Success Rate" },
    { value: "< 1 Day", label: "Avg. Integration Time" },
  ];
  
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] orange-glow" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Campaign Badge - More Urgent */}
          <div className="inline-flex items-center space-x-2 bg-primary/20 border border-primary/50 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8 animate-fade-in">
            <Flame className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-bold text-primary">Limited Time Offer — Flat 1.5% Transaction Fee</span>
          </div>
          
          {/* Headline - Sharper & Specific */}
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Accept Payments Faster with India's Most{" "}
            <span className="gradient-text">Developer-Friendly</span>{" "}
            Payment Gateway
          </h1>
          
          {/* Subheadline - Clear Value Props */}
          <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Go live in hours. 150+ payment methods. Same-day settlements. Trusted by 42 lakh+ businesses.
          </p>
          <p className="text-xl md:text-2xl font-semibold text-foreground mb-10 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
            Now at a flat <span className="gradient-text">1.5%</span> — limited period only.
          </p>
          
          {/* CTAs - Stronger with Microcopy */}
          <div className="flex flex-col items-center gap-4 mb-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://zwitch.open.money/register"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground hover-glow w-full sm:w-auto text-base px-8 py-6 text-lg">
                  Get 1.5% Pricing Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a 
                href="https://developers.zwitch.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-border hover:bg-secondary text-base px-8">
                  See Integration Docs (5-min setup)
                </Button>
              </a>
            </div>
            
            {/* Trust Microcopy - Immediate Risk Reversal */}
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-primary" />
                RBI-licensed
              </span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-primary" />
                No setup fees
              </span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-primary" />
                Free sandbox
              </span>
            </div>
          </div>
          
          {/* Stats - Moved Up & Enhanced */}
          <div className="animate-fade-in mt-12 pt-8 border-t border-border/50" style={{ animationDelay: "0.4s" }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="text-center"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <p className="text-2xl md:text-3xl font-display font-bold gradient-text mb-1">{stat.value}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
    </section>
  );
};

export default Hero;
