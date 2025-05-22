
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleVisibility);
    
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className={cn(
        "fixed bottom-8 right-8 rounded-full shadow-lg animate-float z-40 transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
};
