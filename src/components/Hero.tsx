import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  const stats = [
    { value: "42 Lakh+", label: "Businesses Powered" },
    { value: "150+", label: "Payment Methods" },
    { value: "$35B+", label: "Transactions Processed" },
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
          {/* Campaign Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/30 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Limited Offer: Just 1.5% Transaction Rate</span>
          </div>
          
          {/* Headline */}
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Boost Sales and Build Trust with a Secure, Flexible{" "}
            <span className="gradient-text">Payment Gateway</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Trusted by 42 lakh+ businesses to power seamless payments with 150+ options. Start accepting payments at just <strong className="text-foreground">1.5%</strong> – lowest in industry.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <a 
              href="https://zwitch.open.money/register"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground hover-glow w-full sm:w-auto text-base px-8">
                Get Started at 1.5%
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <a 
              href="https://developers.zwitch.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-border hover:bg-secondary text-base px-8">
                View Documentation
              </Button>
            </a>
          </div>
          
          {/* Stats */}
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
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