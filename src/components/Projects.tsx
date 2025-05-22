
import { useRef, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "Sistema de Gestão WEG",
    description: "Desenvolvimento de módulos para o sistema interno de gestão da WEG, utilizando ServiceNow e JavaScript.",
    tags: ["ServiceNow", "JavaScript", "Workflow"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=60",
    demoUrl: "#",
    codeUrl: "#"
  },
  {
    id: 2,
    title: "Dashboard Analytics",
    description: "Dashboard interativo para visualização de métricas e KPIs com gráficos dinâmicos e filtros avançados.",
    tags: ["React", "TypeScript", "D3.js"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=60",
    demoUrl: "#",
    codeUrl: "#"
  },
  {
    id: 3,
    title: "API REST Microservices",
    description: "Arquitetura de microserviços para integração de sistemas internos e externos.",
    tags: ["Node.js", "Express", "MongoDB"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=60",
    demoUrl: "#",
    codeUrl: "#"
  }
];

export const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardRefs.current;
    
    if (!section || !title || cards.some(el => !el)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          title.classList.add("animate-fade-in");
          
          // Animate cards with staggered delay
          cards.forEach((card, index) => {
            if (card) {
              setTimeout(() => {
                card.classList.add("animate-zoom-in");
                card.style.opacity = "1";
              }, 200 + index * 150);
            }
          });
          
          // Stop observing after animation
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-24"
    >
      <div className="container mx-auto px-4">
        <h2 
          ref={titleRef}
          className="section-title text-center mb-16 opacity-0"
        >
          Projetos
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              ref={el => cardRefs.current[index] = el}
              className="opacity-0"
            >
              <Card className="h-full overflow-hidden border border-border/50 card-hover">
                <div className="overflow-hidden h-48">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="text-xs py-1 px-2 rounded-full bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.demoUrl}>Demo</a>
                  </Button>
                  <Button size="sm" asChild>
                    <a href={project.codeUrl}>Código</a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
