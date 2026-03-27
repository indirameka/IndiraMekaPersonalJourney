import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { section: "about", label: "About" },
    { section: "passions", label: "Passions" },
    { section: "contact", label: "Connect" },
  ];

  const handleNavClick = (section: string) => {
    setIsOpen(false);
    if (location.pathname === "/") {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${section}`);
    }
  };

  const linkClass = "text-muted-foreground hover:text-primary transition-colors duration-300 font-medium";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="font-serif text-2xl font-bold text-foreground"
          >
            Portfolio
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => handleNavClick(link.section)}
                className={linkClass}
              >
                {link.label}
              </button>
            ))}
            <button onClick={() => navigate("/blog")} className={linkClass}>
              Blog
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 animate-fade-in">
            {navLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => handleNavClick(link.section)}
                className="block w-full text-left py-3 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
            <button
              className="block w-full text-left py-3 text-muted-foreground hover:text-primary transition-colors duration-300"
              onClick={() => { navigate("/blog"); setIsOpen(false); }}
            >
              Blog
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
