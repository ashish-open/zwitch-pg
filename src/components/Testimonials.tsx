import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { TestimonialsColumn, type TestimonialsColumnItem } from "@/components/ui/testimonials-columns-1";

const testimonials = [
  {
    quote: "Zwitch made our payment integration incredibly simple. We went live in just 2 days and our payment success rates improved by 15%.",
    author: "Rajesh Sharma",
    role: "CTO",
    company: "B2B SaaS",
    initials: "RS",
    rating: 5
  },
  {
    quote: "The 1.5% rate is a game-changer for our margins. Plus their developer documentation is the best we've seen.",
    author: "Priya Mehta",
    role: "Founder",
    company: "E-commerce",
    initials: "PM",
    rating: 5
  },
  {
    quote: "Excellent support team and rock-solid uptime. Zwitch handles millions in transactions for us every month without issues.",
    author: "Amit Patel",
    role: "Head of Payments",
    company: "Retail",
    initials: "AP",
    rating: 5
  }
];

const testimonialsColumns: TestimonialsColumnItem[] = [
  {
    text: "Zwitch made our payment integration incredibly simple. We went live in just 2 days and our payment success rates improved by 15%.",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=160&h=160&q=80",
    name: "Rajesh Sharma",
    role: "CTO • B2B SaaS",
  },
  {
    text: "The 1.5% rate is a game-changer for our margins. Plus their developer documentation is the best we've seen.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&h=160&q=80",
    name: "Priya Mehta",
    role: "Founder • E-commerce",
  },
  {
    text: "Excellent support team and rock-solid uptime. Zwitch handles millions in transactions for us every month without issues.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80",
    name: "Amit Patel",
    role: "Head of Payments • Retail",
  },
  {
    text: "We saw fewer payment failures after switching. The routing and retries noticeably improved checkout completion.",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=160&h=160&q=80",
    name: "Neha Kapoor",
    role: "Founder • D2C",
  },
  {
    text: "Integration took hours, not weeks. Webhooks and docs were clean, and the sandbox matched production flows well.",
    image: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=160&h=160&q=80",
    name: "Arjun Verma",
    role: "Engineering Lead • SaaS",
  },
  {
    text: "Settlement visibility and reporting are strong. Our finance team reconciles faster and with fewer disputes.",
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=160&h=160&q=80",
    name: "Sanya Iyer",
    role: "Finance Ops • Fintech",
  },
  {
    text: "Support has been proactive during peak sales. We didn’t see the downtime we used to during high traffic.",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=160&h=160&q=80",
    name: "Kunal Singh",
    role: "Growth • Marketplace",
  },
  {
    text: "Card + UPI coverage is solid. We improved conversions especially for first-time mobile buyers.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80",
    name: "Ayesha Khan",
    role: "Product • E-commerce",
  },
  {
    text: "The onboarding was smooth and compliance-ready. We got clarity on RBI requirements quickly.",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&h=160&q=80",
    name: "Vikram Rao",
    role: "Compliance • Lending",
  },
];

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  const firstColumn = testimonialsColumns.slice(0, 3);
  const secondColumn = testimonialsColumns.slice(3, 6);
  const thirdColumn = testimonialsColumns.slice(6, 9);
  
  return (
    <section id="testimonials" className="py-12 md:py-24">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-[24px] md:text-5xl lg:text-6xl mb-3 md:mb-6">
            Trusted by{" "}
            <span className="gradient-text">Growing Businesses</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground">
            See what businesses across India have to say about Zwitch Payment Gateway.
          </p>
        </motion.div>

        {/* Mobile: swipeable (single per view) */}
        <div className="md:hidden -mx-6 px-6 overflow-x-auto snap-x snap-mandatory">
          <div className="flex gap-3 pb-2">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                className="snap-center"
              >
                <Card className="bg-card border-border p-5 w-[85vw] max-w-[420px]">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-foreground mb-4 leading-relaxed text-sm line-clamp-2">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-display font-semibold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role} • {testimonial.company}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: 3-column infinite scroll */}
        <div className="hidden md:flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;