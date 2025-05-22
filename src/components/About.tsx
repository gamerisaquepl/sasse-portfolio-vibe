
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const skills = {
  hard: ["JavaScript", "TypeScript", "ServiceNow", "HTML", "CSS", "React", "Node.js"],
  soft: ["Comunicação", "Colaboração", "Resolução de Problemas", "Pensamento Crítico", "Adaptabilidade"]
};

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const contentElements = contentRefs.current;
    
    if (!section || !title || contentElements.some(el => !el)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          title.classList.add("animate-fade-in");
          
          // Animate content with staggered delay
          contentElements.forEach((element, index) => {
            if (element) {
              setTimeout(() => {
                element.classList.add("animate-fade-in");
                element.style.opacity = "1";
              }, 200 + index * 200);
            }
          });
          
          // Stop observing after animation
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 bg-muted/30"
    >
      <div className="container mx-auto px-4">
        <h2 
          ref={titleRef}
          className="section-title text-center mb-16 opacity-0"
        >
          Sobre Mim
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Avatar/Photo */}
          <div 
            ref={el => contentRefs.current[0] = el} 
            className="flex justify-center lg:justify-end opacity-0"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 blur-xl animate-pulse-glow"></div>
              <div className="absolute inset-4 bg-background rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center text-8xl font-bold text-gradient">
                ILS
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div 
            ref={el => contentRefs.current[1] = el}
            className="opacity-0 space-y-6"
          >
            <p className="text-lg">
              Sou um <span className="font-medium text-primary">Desenvolvedor de Software</span> apaixonado por criar soluções tecnológicas que resolvem problemas reais. Atualmente trabalho na <span className="font-medium text-primary">WEG</span>, onde contribuo para o desenvolvimento de sistemas que conectam tecnologia e propósito.
            </p>
            
            <p>
              Minha trajetória profissional é direcionada pela busca constante de conhecimento e aprimoramento técnico, sempre buscando implementar as melhores práticas de desenvolvimento e design de software.
            </p>
            
            {/* Skills */}
            <div className="mt-8" ref={el => contentRefs.current[2] = el}>
              <h3 className="text-xl font-semibold mb-4 opacity-0 animate-fade-in" style={{animationDelay: "0.6s", animationFillMode: "forwards"}}>
                Hard Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.hard.map((skill, index) => (
                  <Badge 
                    key={skill} 
                    className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1 text-sm"
                    style={{
                      animationDelay: `${0.7 + index * 0.1}s`, 
                      animationFillMode: "forwards",
                      opacity: 0
                    }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mt-6" ref={el => contentRefs.current[3] = el}>
              <h3 className="text-xl font-semibold mb-4 opacity-0 animate-fade-in" style={{animationDelay: "0.9s", animationFillMode: "forwards"}}>
                Soft Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.soft.map((skill, index) => (
                  <Badge 
                    key={skill} 
                    variant="secondary"
                    className="bg-secondary/10 text-secondary hover:bg-secondary/20 px-3 py-1 text-sm"
                    style={{
                      animationDelay: `${1 + index * 0.1}s`, 
                      animationFillMode: "forwards",
                      opacity: 0
                    }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
