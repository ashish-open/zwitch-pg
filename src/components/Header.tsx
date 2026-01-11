import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Header = () => {
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Zwitch Logo */}
          <a href="https://www.zwitch.io" className="flex items-center space-x-2">
            <svg width="32" height="32" viewBox="0 0 927 1180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M464.606 592.147L462.715 588.491C461.203 589.024 459.824 589.646 457.933 589.991H38.5257C17.9957 589.991 -5.65934 599.426 1.21364 617.03L197.916 1152.88C203.199 1169.09 214.699 1179.92 235.217 1179.92H612.108C637.053 1179.92 655.97 1170.25 649.42 1152.88L474.359 675.976L452.717 617.03C452.717 617.03 445.633 598.215 464.617 592.147H464.606Z" fill="#FF6600"/>
              <path d="M468.52 590.924H887.928C908.458 590.924 932.113 581.5 925.24 563.885L728.537 28.039C723.254 11.8245 711.755 1 691.236 1H314.345C289.4 1 270.483 10.6687 277.033 28.039L452.094 504.94L473.736 563.885C473.736 563.885 480.342 581.389 463.794 588.09C463.215 588.324 462.96 588.991 463.238 589.535L463.949 590.902C464.328 591.624 465.184 591.958 465.94 591.68C466.696 591.402 467.519 591.113 468.509 590.924H468.52Z" stroke="#FF6600" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-display font-bold text-xl tracking-wider">ZWITCH</span>
          </a>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#features" 
              onClick={(e) => smoothScroll(e, "#features")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a 
              href="#payment-methods" 
              onClick={(e) => smoothScroll(e, "#payment-methods")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Payment Methods
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => smoothScroll(e, "#pricing")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <a 
              href="https://developers.zwitch.io/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Developers
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://zwitch.open.money/login"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden md:inline-flex"
              >
                Login
              </Button>
            </a>
            <a 
              href="https://zwitch.open.money/register"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Get Started
              </Button>
            </a>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;