import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Passions from "@/components/Passions";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Passions />
      <Blog />
      <Contact />
    </div>
  );
};

export default Index;
