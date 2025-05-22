
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const experiences = [
  {
    id: 1,
    role: "Senior Software Developer",
    company: "WEG",
    period: "2021 - Atual",
    description: "Desenvolvimento e manutenção de aplicações corporativas, implementação de novas funcionalidades em ServiceNow e integração com sistemas legados."
  },
  {
    id: 2,
    role: "Desenvolvedor Full Stack",
    company: "Tech Solutions",
    period: "2018 - 2021",
    description: "Atuação em projetos web com foco em React e Node.js, desenvolvimento de APIs REST e integração com serviços de terceiros."
  },
  {
    id: 3,
    role: "Desenvolvedor Front-end Jr.",
    company: "Web Innovations",
    period: "2016 - 2018",
    description: "Desenvolvimento de interfaces responsivas com JavaScript, HTML e CSS, implementação de componentes interativos e otimização de performance."
  },
  {
    id: 4,
    role: "Estagiário de TI",
    company: "Digital Solutions",
    period: "2015 - 2016",
    description: "Suporte ao time de desenvolvimento, criação de documentação técnica e manutenção de sistemas internos."
  }
];

export const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const timeline = timelineRef.current;
    const items = itemRefs.current;
    
    if (!section || !title || !timeline || items.some(el => !el)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          title.classList.add("animate-fade-in");
          
          // Show timeline
          setTimeout(() => {
            if (timeline) {
              timeline.classList.add("after:w-full");
            }
            
            // Animate items with staggered delay
            items.forEach((item, index) => {
              if (item) {
                setTimeout(() => {
                  item.classList.add("animate-fade-in");
                  item.style.opacity = "1";
                }, 500 + index * 300);
              }
            });
          }, 300);
          
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
      id="experience" 
      ref={sectionRef}
      className="py-24 bg-muted/30"
    >
      <div className="container mx-auto px-4">
        <h2 
          ref={titleRef}
          className="section-title text-center mb-16 opacity-0"
        >
          Experiência Profissional
        </h2>
        
        <div
          ref={timelineRef}
          className="relative max-w-3xl mx-auto after:absolute after:left-0 after:top-0 after:w-0 after:h-full after:border-l-2 after:border-primary/30 after:transition-all after:duration-1000"
        >
          {experiences.map((exp, index) => (
            <div 
              key={exp.id}
              ref={el => itemRefs.current[index] = el}
              className={cn(
                "relative pl-12 pb-12 opacity-0",
                index === experiences.length - 1 ? "pb-0" : ""
              )}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 z-10 w-5 h-5 rounded-full bg-primary transform -translate-x-1/2 animate-pulse-glow"></div>
              
              {/* Content card */}
              <div className="bg-card border border-border/50 rounded-lg p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <span className="text-sm text-primary font-medium">{exp.period}</span>
                </div>
                <h4 className="text-lg font-medium mb-3">{exp.company}</h4>
                <p className="text-muted-foreground">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
