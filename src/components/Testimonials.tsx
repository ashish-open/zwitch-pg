import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const testimonials = [
  {
    quote: "Zwitch made our payment integration incredibly simple. We went live in just 2 days and our payment success rates improved by 15%.",
    author: "Rajesh Sharma",
    role: "CTO",
    company: "TechStart India",
    initials: "RS",
    rating: 5
  },
  {
    quote: "The 1.5% rate is a game-changer for our margins. Plus their developer documentation is the best we've seen.",
    author: "Priya Mehta",
    role: "Founder",
    company: "ShopEase",
    initials: "PM",
    rating: 5
  },
  {
    quote: "Excellent support team and rock-solid uptime. Zwitch handles millions in transactions for us every month without issues.",
    author: "Amit Patel",
    role: "Head of Payments",
    company: "RetailMax",
    initials: "AP",
    rating: 5
  }
];

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="testimonials" className="py-24 md:py-32">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
            Trusted by{" "}
            <span className="gradient-text">Growing Businesses</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See what businesses across India have to say about Zwitch Payment Gateway.
          </p>
        </motion.div>
        
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <Card className="bg-card border-border p-8 h-full hover:border-primary/30 transition-colors">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-display font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;