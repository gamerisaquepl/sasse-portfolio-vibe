
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Sobre", href: "#about" },
    { label: "Projetos", href: "#projects" },
    { label: "Experiência", href: "#experience" },
    { label: "Contato", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // For header background
      setScrolled(window.scrollY > 20);

      // For active section highlight
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute("id") || "";

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur",
        scrolled 
          ? "bg-background/80 shadow-md py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <a href="#home" className="text-xl font-display font-bold text-gradient">
          ILS
        </a>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden flex items-center" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <div className="space-y-2">
            <span 
              className={cn(
                "block w-8 h-0.5 bg-foreground transition-all", 
                menuOpen && "translate-y-2.5 rotate-45"
              )}
            ></span>
            <span 
              className={cn(
                "block w-8 h-0.5 bg-foreground transition-all", 
                menuOpen && "opacity-0"
              )}
            ></span>
            <span 
              className={cn(
                "block w-8 h-0.5 bg-foreground transition-all", 
                menuOpen && "-translate-y-2.5 -rotate-45"
              )}
            ></span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-2 py-1 text-sm font-medium hover:text-primary transition-colors animated-border",
                activeSection === item.href.replace("#", "") 
                  ? "text-primary" 
                  : "text-foreground/80"
              )}
            >
              {item.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-sm z-50 lg:hidden transition-transform",
            menuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full justify-center items-center space-y-8 p-8">
            <button 
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 p-2"
              aria-label="Close menu"
            >
              <span className="block w-8 h-0.5 bg-foreground rotate-45"></span>
              <span className="block w-8 h-0.5 bg-foreground -rotate-45 -mt-0.5"></span>
            </button>
            
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "text-2xl font-medium hover:text-primary transition-colors",
                  activeSection === item.href.replace("#", "") 
                    ? "text-primary" 
                    : "text-foreground/80"
                )}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-8">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
