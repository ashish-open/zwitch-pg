import { Linkedin, Twitter, Github } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { trackRegisterClick, buildRegisterURL } from "@/lib/analytics";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <svg width="32" height="32" viewBox="0 0 927 1180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M464.606 592.147L462.715 588.491C461.203 589.024 459.824 589.646 457.933 589.991H38.5257C17.9957 589.991 -5.65934 599.426 1.21364 617.03L197.916 1152.88C203.199 1169.09 214.699 1179.92 235.217 1179.92H612.108C637.053 1179.92 655.97 1170.25 649.42 1152.88L474.359 675.976L452.717 617.03C452.717 617.03 445.633 598.215 464.617 592.147H464.606Z" fill="#FF6600"/>
                <path d="M468.52 590.924H887.928C908.458 590.924 932.113 581.5 925.24 563.885L728.537 28.039C723.254 11.8245 711.755 1 691.236 1H314.345C289.4 1 270.483 10.6687 277.033 28.039L452.094 504.94L473.736 563.885C473.736 563.885 480.342 581.389 463.794 588.09C463.215 588.324 462.96 588.991 463.238 589.535L463.949 590.902C464.328 591.624 465.184 591.958 465.94 591.68C466.696 591.402 467.519 591.113 468.509 590.924H468.52Z" stroke="#FF6600" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-display font-bold text-xl tracking-wider">ZWITCH</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm mb-4">
              India's Best Online Payment API Solution. Accept payments, process payouts, and seamlessly onboard clients with our all-in-one platform.
            </p>
            <p className="text-xs text-muted-foreground">
              RBI Licensed Payment Aggregator
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Support:{" "}
              <a href="mailto:support@zwitch.io" className="hover:underline">
                support@zwitch.io
              </a>
            </p>
          </div>
          
          {/* Desktop link columns */}
          <div className="hidden md:block">
            <h4 className="font-display font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li><a href="https://www.zwitch.io/payment-gateway" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Payment Gateway</a></li>
              <li><a href="https://www.zwitch.io/payouts" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Payouts</a></li>
              <li><a href="https://www.zwitch.io/zwitch-bill-connect" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Bill Connect</a></li>
              <li><a href="https://www.zwitch.io/verification-suite" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">API Marketplace</a></li>
            </ul>
          </div>
          
          <div className="hidden md:block">
            <h4 className="font-display font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="https://developers.zwitch.io/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="https://www.zwitch.io/blog" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); trackRegisterClick("footer_desktop", "Sign Up"); window.open(buildRegisterURL({ source: "footer_desktop" }), "_blank", "noopener,noreferrer"); }} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sign Up</a></li>
              <li><a href="https://zwitch.open.money/login" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Login</a></li>
            </ul>
          </div>
        </div>

        {/* Mobile: accordions for link groups */}
        <div className="md:hidden mb-8">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="products" className="border-border">
              <AccordionTrigger className="text-left font-display font-semibold">Products</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  <li><a href="https://www.zwitch.io/payment-gateway" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Payment Gateway</a></li>
                  <li><a href="https://www.zwitch.io/payouts" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Payouts</a></li>
                  <li><a href="https://www.zwitch.io/zwitch-bill-connect" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Bill Connect</a></li>
                  <li><a href="https://www.zwitch.io/verification-suite" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">API Marketplace</a></li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="resources" className="border-border">
              <AccordionTrigger className="text-left font-display font-semibold">Resources</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  <li><a href="https://developers.zwitch.io/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
                  <li><a href="https://www.zwitch.io/blog" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); trackRegisterClick("footer_mobile", "Sign Up"); window.open(buildRegisterURL({ source: "footer_mobile" }), "_blank", "noopener,noreferrer"); }} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sign Up</a></li>
                  <li><a href="https://zwitch.open.money/login" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Login</a></li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Social Icons */}
        <div className="flex items-center space-x-4 mb-8">
          <a href="https://www.linkedin.com/company/zwitch/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://twitter.com/ZwitchHQ" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="https://github.com/openMoney" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors">
            <Github className="w-5 h-5" />
          </a>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2025 Zwitch (by Open Financial Technologies). All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <a href="https://www.zwitch.io/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="https://www.zwitch.io/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;