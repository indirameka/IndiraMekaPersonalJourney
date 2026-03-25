import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Passions from "@/components/Passions";
import Blog from "@/components/Blog";
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Passions />
      <Blog />
    </div>
  );
};

export default Index;
