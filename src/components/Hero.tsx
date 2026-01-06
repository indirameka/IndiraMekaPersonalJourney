import heroBg from "@/assets/hero-bg.jpg";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Beautiful landscape with gardens and hills"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent font-medium tracking-widest uppercase mb-4 animate-fade-up opacity-0 [animation-delay:200ms]">
            Welcome to my world
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6 animate-fade-up opacity-0 [animation-delay:400ms]">
            Explorer, Gardener & Storyteller
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-up opacity-0 [animation-delay:600ms]">
            Capturing life's beautiful moments through travel adventures, nurturing gardens, and sharing stories that inspire.
          </p>
          <a
            href="#about"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-all duration-300 animate-fade-up opacity-0 [animation-delay:800ms] hover:scale-105"
          >
            Discover My Story
            <ArrowDown size={18} />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
