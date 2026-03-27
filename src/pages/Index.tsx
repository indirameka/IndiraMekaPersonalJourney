import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Passions from "@/components/Passions";
import Blog from "@/components/Blog";
import Subscribe from "@/components/Subscribe";
import Contact from "@/components/Contact";

const Index = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Passions />
      <Blog />
      <Subscribe />
      <Contact />
    </div>
  );
};

export default Index;
