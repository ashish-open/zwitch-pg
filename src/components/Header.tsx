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
    trackRegisterClick(placement, "Get 1.55%* Pricing");
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
              <svg className="w-10 h-8 shrink-0" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 50 40 L 80 40 L 100 0 L 70 0 Z" fill="#E8A282" />
                <path d="M 20 40 L 50 40 L 30 80 L 0 80 Z" fill="#FA4D1D" />
              </svg>
              <span className="font-display font-bold text-2xl tracking-[0.15em] text-foreground">ZWITCH</span>
            </a>
          </div>


        </div>
      </div>
    </header>
  );
};

export default Header;
