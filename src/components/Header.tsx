import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { trackRegisterClick, buildRegisterURL } from "@/lib/analytics";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [showMobileCta, setShowMobileCta] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // On mobile, avoid showing header CTA while hero CTA is still visible (max 1 primary CTA at a time).
      setShowMobileCta(window.scrollY > 140);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const handleRegisterClick = (e: React.MouseEvent<HTMLAnchorElement>, placement: string) => {
    e.preventDefault();
    trackRegisterClick(placement, "Get 1.5% Pricing");
    const registerUrl = buildRegisterURL({ 
      source: placement,
      content: "header_cta"
    });
    window.open(registerUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            {/* Mobile menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12"
                    aria-label="Open menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-6">
                  <SheetHeader className="text-left">
                    <SheetTitle className="font-display">Menu</SheetTitle>
                  </SheetHeader>

                  <nav className="mt-6 flex flex-col gap-2">
                    <SheetClose asChild>
                      <a
                        href="#features"
                        onClick={(e) => smoothScroll(e, "#features")}
                        className="rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary"
                      >
                        Why Zwitch
                      </a>
                    </SheetClose>
                    <SheetClose asChild>
                      <a
                        href="#pricing"
                        onClick={(e) => smoothScroll(e, "#pricing")}
                        className="rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary"
                      >
                        Pricing
                      </a>
                    </SheetClose>
                    <SheetClose asChild>
                      <a
                        href="https://developers.zwitch.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary"
                      >
                        Developers
                      </a>
                    </SheetClose>
                    <SheetClose asChild>
                      <a
                        href="#compliance"
                        onClick={(e) => smoothScroll(e, "#compliance")}
                        className="rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary"
                      >
                        Compliance
                      </a>
                    </SheetClose>
                    <SheetClose asChild>
                      <a
                        href="https://zwitch.open.money/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary"
                      >
                        Login
                      </a>
                    </SheetClose>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* Zwitch Logo */}
            <a href="https://www.zwitch.io" className="flex items-center space-x-2">
              <svg width="32" height="32" viewBox="0 0 927 1180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M464.606 592.147L462.715 588.491C461.203 589.024 459.824 589.646 457.933 589.991H38.5257C17.9957 589.991 -5.65934 599.426 1.21364 617.03L197.916 1152.88C203.199 1169.09 214.699 1179.92 235.217 1179.92H612.108C637.053 1179.92 655.97 1170.25 649.42 1152.88L474.359 675.976L452.717 617.03C452.717 617.03 445.633 598.215 464.617 592.147H464.606Z" fill="#FF6600"/>
                <path d="M468.52 590.924H887.928C908.458 590.924 932.113 581.5 925.24 563.885L728.537 28.039C723.254 11.8245 711.755 1 691.236 1H314.345C289.4 1 270.483 10.6687 277.033 28.039L452.094 504.94L473.736 563.885C473.736 563.885 480.342 581.389 463.794 588.09C463.215 588.324 462.96 588.991 463.238 589.535L463.949 590.902C464.328 591.624 465.184 591.958 465.94 591.68C466.696 591.402 467.519 591.113 468.509 590.924H468.52Z" stroke="#FF6600" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-display font-bold text-xl tracking-wider">ZWITCH</span>
            </a>
          </div>
          
          
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
            {(showMobileCta || typeof window === "undefined") && (
              <a 
                href="#" 
                className="md:hidden"
                onClick={(e) => handleRegisterClick(e, "header_mobile")}
              >
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-4"
                >
                  Get 1.5% Pricing
                </Button>
              </a>
            )}

            <a 
              href="#" 
              className="hidden md:inline-flex"
              onClick={(e) => handleRegisterClick(e, "header_desktop")}
            >
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Get 1.5% Pricing
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
