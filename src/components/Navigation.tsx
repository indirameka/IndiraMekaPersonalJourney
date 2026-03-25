import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const anchorLinks = [
    { href: "#about", label: "About" },
    { href: "#passions", label: "Passions" },
  ];

  const linkClass = "text-muted-foreground hover:text-primary transition-colors duration-300 font-medium";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="font-serif text-2xl font-bold text-foreground">
            Portfolio
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {anchorLinks.map((link) => (
              <a key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </a>
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
            {anchorLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-muted-foreground hover:text-primary transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
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
