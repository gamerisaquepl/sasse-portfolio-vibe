
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Letter {
  letter: string;
  visible: boolean;
}

export const Hero = () => {
  const particlesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create particles
    const particles = particlesRef.current;
    if (!particles) return;

    // Clear existing particles
    particles.innerHTML = '';

    // Create new particles
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      
      // Random size
      const size = Math.random() * 5 + 2;
      
      // Random opacity
      const opacity = Math.random() * 0.5 + 0.2;
      
      // Random animation duration
      const duration = Math.random() * 10 + 5;
      const delay = Math.random() * 5;
      
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = opacity.toString();
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      
      particles.appendChild(particle);
    }

    // Animate name with staggered entrance
    const nameAnimation = async () => {
      const nameElement = document.getElementById("animated-name");
      if (!nameElement) return;

      // Clear content for animation
      const name = nameElement.textContent || "";
      nameElement.textContent = "";
      
      // Create each letter with delay
      for (let i = 0; i < name.length; i++) {
        const letterSpan = document.createElement("span");
        letterSpan.textContent = name[i];
        letterSpan.style.opacity = "0";
        letterSpan.style.transform = "translateY(20px)";
        letterSpan.style.transition = "all 0.3s ease";
        letterSpan.style.display = "inline-block";
        
        nameElement.appendChild(letterSpan);
        
        // Staggered delay
        await new Promise(resolve => setTimeout(resolve, 80));
        
        letterSpan.style.opacity = "1";
        letterSpan.style.transform = "translateY(0)";
      }
    };

    // Execute animations
    setTimeout(nameAnimation, 300);
    
    // Cleanup function
    return () => {
      if (particles) {
        particles.innerHTML = '';
      }
    };
  }, []);

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Animated background particles */}
      <div ref={particlesRef} className="particles-container"></div>
      
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid"></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm md:text-base text-primary mb-4 opacity-0 animate-fade-in" style={{animationDelay: "0.2s", animationFillMode: "forwards"}}>
            Olá, eu sou
          </p>
          
          <h1 
            id="animated-name"
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 gradient-text"
          >
            Isaque Luís Sasse
          </h1>
          
          <div className="h-16 my-8 flex justify-center">
            <div className="typing-container">
              <p className="typing-text text-xl md:text-2xl text-foreground/90 mb-8">
                Desenvolvendo soluções que conectam tecnologia e propósito.
              </p>
            </div>
          </div>
          
          <div className="mt-8 opacity-0 animate-fade-in" style={{animationDelay: "1s", animationFillMode: "forwards"}}>
            <Button 
              className="text-base px-6 py-6 rounded-full shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all"
              onClick={() => window.open('/cv.pdf', '_blank')}
            >
              Download CV
            </Button>
          </div>
          
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a 
              href="#about" 
              className="text-foreground/60 hover:text-primary transition-colors"
              aria-label="Rolar para baixo"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
